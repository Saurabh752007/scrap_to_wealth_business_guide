export type TabId = 'model' | 'monetize' | 'scale' | 'schemes' | 'ai-lab';

export interface IdeaResult {
  productName: string;
  difficulty: "Easy" | "Medium" | "Hard";
  targetMarket: string;
  estimatedInitialCost: string;
  profitPotential: string;
  process: string[];
}

export interface PitchResult {
  tagline: string;
  elevatorPitch: string;
  swot: {
    strengths: string;
    weaknesses: string;
    opportunities: string;
    threats: string;
  };
}
