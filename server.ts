import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Copilot API Route
app.post("/api/copilot", async (req, res) => {
  try {
    const { engineType, materialName, targetMarket, currentTargetProduct } = req.body;

    const apiKey = process.env.GEMINI_API_KEY || process.env.G_API_KEY || process.env.API_KEY;

    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set.");
    }

    const ai = new GoogleGenAI({ apiKey });

    let systemInstruction = "";
    let userQuery = "";
    let responseSchema: any = null;

    if (engineType === "ideation") {
      systemInstruction = `You are an expert Circular Economy Business Consultant and Industrial Upcycler.
Your goal is to propose a profitable, scalable upcycled product concept using a specific waste material.
You must return only a valid, single structured JSON object conforming strictly to the requested schema.`;
      
      userQuery = `Produce an upcycling strategy for: "${materialName}" targeting the "${targetMarket}" market. Ensure steps are detailed, practical, and highly creative.`;
      
      responseSchema = {
        type: Type.OBJECT,
        properties: {
          productName: { type: Type.STRING },
          difficulty: { type: Type.STRING },
          targetMarket: { type: Type.STRING },
          estimatedInitialCost: { type: Type.STRING },
          profitPotential: { type: Type.STRING },
          process: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: [
          "productName",
          "difficulty",
          "targetMarket",
          "estimatedInitialCost",
          "profitPotential",
          "process",
        ],
      };
    } else if (engineType === "pitch") {
      systemInstruction = `You are a brilliant venture builder and sustainability pitch designer.
Your goal is to take a circular business product and draft an attractive tag line, a professional 60-second elevator pitch targeting partners/investors, and a critical SWOT analysis.
You must return only a valid, single structured JSON object conforming strictly to the requested schema.`;

      userQuery = `Draft a strategic commercial toolkit for an upcycling business producing: "${currentTargetProduct}" using "${materialName}". Target Demographic is "${targetMarket}". Make it professional and investor-ready.`;

      responseSchema = {
        type: Type.OBJECT,
        properties: {
          tagline: { type: Type.STRING },
          elevatorPitch: { type: Type.STRING },
          swot: {
            type: Type.OBJECT,
            properties: {
              strengths: { type: Type.STRING },
              weaknesses: { type: Type.STRING },
              opportunities: { type: Type.STRING },
              threats: { type: Type.STRING },
            },
            required: ["strengths", "weaknesses", "opportunities", "threats"],
          },
        },
        required: ["tagline", "elevatorPitch", "swot"],
      };
    } else {
      return res.status(400).json({ success: false, error: "Invalid engineType provided." });
    }

    let response;
    let retries = 3;
    let delay = 5000;
    const model = "gemini-2.5-flash";
    
    while (retries > 0) {
      try {
        response = await ai.models.generateContent({
          model: model,
          contents: [{ role: "user", parts: [{ text: userQuery }] }],
          config: {
            systemInstruction,
            responseMimeType: "application/json",
            responseSchema,
          },
        });
        break; // Success
      } catch (error: any) {
        retries--;
        if (retries === 0) {
          // If we run out of retries and it's a quota/rate-limiting issue, return a mock response
          if (error.message?.includes('429') || error.message?.includes('quota') || error.message?.includes('503') || error.status === 429 || error.status === 503) {
            console.log("API Quota exceeded, returning simulated response.");
            if (engineType === "ideation") {
              return res.json({
                success: true,
                data: {
                  productName: "Sustainable Product (Simulated - Quota Exceeded)",
                  difficulty: "Medium",
                  targetMarket: targetMarket,
                  estimatedInitialCost: "₹10,000 - ₹20,000",
                  profitPotential: "High (70%+)",
                  process: [
                    "API Quota exceeded. This is a simulated fallback response.",
                    `Collect and sort the ${materialName}.`,
                    "Process and clean the raw materials.",
                    "Manufacture the upcycled goods.",
                    `Distribute to the ${targetMarket} market.`
                  ]
                }
              });
            } else {
              return res.json({
                success: true,
                data: {
                  tagline: "Value from waste. (Simulated Demo)",
                  elevatorPitch: `We are currently experiencing high API demand and have exceeded our free quota. This is a simulated pitch for ${currentTargetProduct}. We turn ${materialName} into high-value assets for the ${targetMarket} market.`,
                  swot: {
                    strengths: "Strong eco-friendly branding (Simulated)",
                    weaknesses: "API rate limits on the free tier (Simulated)",
                    opportunities: "Massive market for sustainable goods (Simulated)",
                    threats: "Fluctuating raw material availability (Simulated)"
                  }
                }
              });
            }
          }
          throw error;
        }
        
        // Try to extract retry time from error message, otherwise use backoff delay
        const match = error.message?.match(/retry in (\d+(?:\.\d+)?)/i);
        const waitTime = match ? (Math.ceil(parseFloat(match[1])) * 1000 + 1000) : delay;
        
        await new Promise((resolve) => setTimeout(resolve, waitTime));
        delay *= 1.5;
      }
    }

    const textResult = response?.text;
    if (!textResult) {
      throw new Error("No response generated from Gemini.");
    }

    // Try to extract JSON from the text, ignoring any surrounding conversational text
    let cleanedResult = textResult.trim();
    const jsonMatch = cleanedResult.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
    if (jsonMatch) {
      cleanedResult = jsonMatch[0];
    } else {
      // Fallback: If no JSON-like structure is found, wrap it in a mock response
      if (engineType === "ideation") {
        cleanedResult = JSON.stringify({
          productName: "Extracted Product Concept",
          difficulty: "Medium",
          targetMarket,
          estimatedInitialCost: "N/A",
          profitPotential: "Not specified",
          process: [cleanedResult]
        });
      } else {
        cleanedResult = JSON.stringify({
          tagline: "Commercial Concept Summary",
          elevatorPitch: cleanedResult,
          swot: {
            strengths: "Information provided in pitch",
            weaknesses: "Requires further refinement",
            opportunities: "High potential",
            threats: "Market competition"
          }
        });
      }
    }

    const parsedResult = JSON.parse(cleanedResult);
    res.json({ success: true, data: parsedResult });
  } catch (error: any) {
    console.log("Gemini API Error (handled via UI):", error.message);
    res.status(500).json({ success: false, error: error.message || "Failed to process AI request" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
