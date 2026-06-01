import React, { useState, useRef } from 'react';
import { Loader2, AlertTriangle, Sparkles, Wand2, TrendingUp, Download, Calculator, Printer, MapPin, Factory, TreePine, Building } from 'lucide-react';
import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, Cell } from 'recharts';
import { useReactToPrint } from 'react-to-print';
import { IdeaResult, PitchResult } from '../types';

export default function AICopilot() {
  const [materialPreset, setMaterialPreset] = useState('coconut-shells');
  const [customMaterial, setCustomMaterial] = useState('');
  const [targetMarket, setTargetMarket] = useState('luxury');
  
  const [loadingMsg, setLoadingMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const [ideaResult, setIdeaResult] = useState<IdeaResult | null>(null);
  const [pitchResult, setPitchResult] = useState<PitchResult | null>(null);
  const [currentTargetProduct, setCurrentTargetProduct] = useState('Sustainable Recycled Goods');
  const [monthlySales, setMonthlySales] = useState<string>('5000');
  const [showScenarios, setShowScenarios] = useState<boolean>(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });


  const runCopilot = async (engineType: 'ideation' | 'pitch') => {
    setErrorMsg('');
    setLoadingMsg(engineType === 'ideation' ? 'Gemini is designing your upcycling blueprint...' : 'Gemini is analyzing market metrics & drafting SWOT...');
    
    let materialName = materialPreset === 'custom' ? customMaterial.trim() : materialPreset; 
    // Human readable map
    if (materialPreset === 'coconut-shells') materialName = "Coconut Shells (Local Agriculture)";
    if (materialPreset === 'torn-denim') materialName = "Torn Denim / Textile Offcuts";
    if (materialPreset === 'used-tires') materialName = "Old Automotive Tires";
    if (materialPreset === 'sugarcane-bagasse') materialName = "Sugarcane Bagasse (Sugar Mill Waste)";

    if (materialPreset === 'custom' && !materialName) {
      setErrorMsg('Please specify a custom waste material!');
      setLoadingMsg('');
      return;
    }

    let marketDesc = 'High-end Sustainable Premium Luxury';
    if (targetMarket === 'budget') marketDesc = 'Everyday Household Utilitarian Goods';
    if (targetMarket === 'commercial') marketDesc = 'Commercial Office & B2B Cafe Decor';

    try {
      const response = await fetch('/api/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          engineType,
          materialName,
          targetMarket: marketDesc,
          currentTargetProduct
        })
      });

      if (!response.ok) {
        let errorData;
        try {
          // Attempt to parse JSON error message from server
          errorData = await response.json();
        } catch (jsonErr) {
          // If the response isn't JSON (e.g. 503 HTML page), throw a generic or text-based error
          const textData = await response.text();
          throw new Error(`API responded with status ${response.status}: ${textData.substring(0, 100)}...`);
        }
        throw new Error(errorData.error || `API responded with status: ${response.status}`);
      }

      let data;
      try {
        data = await response.json();
      } catch (e) {
        const text = await response.text();
        throw new Error(`Invalid response from server: ${text.substring(0, 100)}...`);
      }

      if (engineType === 'ideation') {
        setIdeaResult(data);
        setCurrentTargetProduct(data.productName || 'Upcycled Creation');
      } else {
        setPitchResult(data);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to communicate with AI engines. Please check your network and try again.");
    } finally {
      setLoadingMsg('');
    }
  };

  const exportReport = () => {
    let content = `EcoTrade Circular Business Report\n`;
    content += `=================================\n\n`;
    
    let materialName = materialPreset === 'custom' ? customMaterial.trim() : materialPreset; 
    if (materialPreset === 'coconut-shells') materialName = "Coconut Shells (Local Agriculture)";
    if (materialPreset === 'torn-denim') materialName = "Torn Denim / Textile Offcuts";
    if (materialPreset === 'used-tires') materialName = "Old Automotive Tires";
    if (materialPreset === 'sugarcane-bagasse') materialName = "Sugarcane Bagasse (Sugar Mill Waste)";
    
    content += `Material: ${materialName}\n`;
    content += `Target Market: ${targetMarket}\n\n`;

    if (ideaResult) {
      content += `=== Product Blueprint ===\n`;
      content += `Product Name: ${ideaResult.productName}\n`;
      content += `Difficulty: ${ideaResult.difficulty}\n`;
      content += `Market Segment: ${ideaResult.targetMarket}\n`;
      content += `Startup Estimate: ${ideaResult.estimatedInitialCost}\n`;
      content += `Margin Index: ${ideaResult.profitPotential}\n\n`;
      content += `Step-by-Step Pipeline:\n`;
      ideaResult.process.forEach((step, idx) => {
        content += `${idx + 1}. ${step}\n`;
      });
      content += `\n`;
    }

    if (pitchResult) {
      content += `=== Commercial & SWOT Deck ===\n`;
      content += `Tagline: "${pitchResult.tagline}"\n\n`;
      content += `Elevator Pitch:\n${pitchResult.elevatorPitch}\n\n`;
      content += `SWOT Analysis:\n`;
      content += `Strengths: ${pitchResult.swot.strengths}\n`;
      content += `Weaknesses: ${pitchResult.swot.weaknesses}\n`;
      content += `Opportunities: ${pitchResult.swot.opportunities}\n`;
      content += `Threats: ${pitchResult.swot.threats}\n\n`;
    }

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `EcoTrade_Report_${new Date().getTime()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 md:p-10 mb-8">
      <h2 className="text-3xl font-extrabold text-stone-900 mb-2 flex items-center">
        <Sparkles className="w-8 h-8 text-emerald-500 mr-3" />
        AI Circular Business Co-Pilot
      </h2>
      <p className="text-stone-600 mb-8">
        Develop entire commercial pipelines from raw scrap materials. This tool uses Gemini to discover high-value upcycling products, plan manufacturing steps, and formulate complete elevator pitches along with SWOT analyses for your new business.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 space-y-4">
            <h3 className="font-bold text-stone-800 border-b border-stone-200 pb-2">Step 1: Resource Setup</h3>
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">Input Raw Scrap Material</label>
              <select 
                value={materialPreset}
                onChange={(e) => setMaterialPreset(e.target.value)}
                className="w-full bg-white border border-stone-300 text-stone-800 rounded-lg p-3 outline-none focus:ring-2 focus:ring-emerald-500 mb-2 text-sm"
              >
                <option value="coconut-shells">🥥 Coconut Shells (Local Agriculture)</option>
                <option value="torn-denim">👕 Torn Denim / Textile Offcuts</option>
                <option value="used-tires">🛞 Old Automotive Tires</option>
                <option value="sugarcane-bagasse">🌾 Sugarcane Bagasse (Sugar Mill Waste)</option>
                <option value="custom">✍️ Type Custom Waste Material...</option>
              </select>
              {materialPreset === 'custom' && (
                <input 
                  type="text" 
                  value={customMaterial}
                  onChange={(e) => setCustomMaterial(e.target.value)}
                  placeholder="e.g. Broken Ceramic Tiles" 
                  className="w-full bg-white border border-stone-300 text-stone-800 rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                />
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">Target Market & Class</label>
              <select 
                value={targetMarket}
                onChange={(e) => setTargetMarket(e.target.value)}
                className="w-full bg-white border border-stone-300 text-stone-800 rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="luxury">💎 High-end Sustainable Premium Luxury</option>
                <option value="budget">🏡 Everyday Household Utilitarian Goods</option>
                <option value="commercial">🏢 Commercial Office & B2B Cafe Decor</option>
              </select>
            </div>

            <div className="mt-4 pt-4 border-t border-stone-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3 flex items-center">
                <MapPin className="w-3.5 h-3.5 mr-1.5" />
                Regional Sourcing Hubs
              </h4>
              <div className="bg-white rounded-lg p-3 border border-stone-200 relative overflow-hidden flex items-center justify-center min-h-[140px]">
                {/* Simple mock map background grid */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 10px 10px, #10b981 1.5px, transparent 0)', backgroundSize: '15px 15px' }}></div>
                
                <div className="relative z-10 w-full space-y-2">
                  {materialPreset === 'coconut-shells' && (
                    <div className="flex flex-col space-y-2">
                       <div className="flex justify-between items-center text-[11px] text-stone-600 bg-stone-50/90 p-2 rounded border border-stone-200 backdrop-blur-sm"><span className="flex items-center font-bold"><TreePine className="w-3.5 h-3.5 mr-1.5 text-emerald-600" /> Coastal Plantations</span> <span className="p-1 px-1.5 bg-emerald-100 text-emerald-700 rounded-md font-bold">South</span></div>
                       <div className="flex justify-between items-center text-[11px] text-stone-600 bg-stone-50/90 p-2 rounded border border-stone-200 backdrop-blur-sm"><span className="flex items-center font-bold"><Factory className="w-3.5 h-3.5 mr-1.5 text-amber-600" /> Oil Extraction Mills</span> <span className="p-1 px-1.5 bg-emerald-100 text-emerald-700 rounded-md font-bold">Central</span></div>
                    </div>
                  )}
                  {materialPreset === 'torn-denim' && (
                     <div className="flex flex-col space-y-2">
                       <div className="flex justify-between items-center text-[11px] text-stone-600 bg-stone-50/90 p-2 rounded border border-stone-200 backdrop-blur-sm"><span className="flex items-center font-bold"><Factory className="w-3.5 h-3.5 mr-1.5 text-indigo-600" /> Garment Factories</span> <span className="p-1 px-1.5 bg-indigo-100 text-indigo-700 rounded-md font-bold">East</span></div>
                       <div className="flex justify-between items-center text-[11px] text-stone-600 bg-stone-50/90 p-2 rounded border border-stone-200 backdrop-blur-sm"><span className="flex items-center font-bold"><Building className="w-3.5 h-3.5 mr-1.5 text-blue-600" /> Urban Thrift Centers</span> <span className="p-1 px-1.5 bg-indigo-100 text-indigo-700 rounded-md font-bold">Metro</span></div>
                    </div>
                  )}
                  {materialPreset === 'used-tires' && (
                     <div className="flex flex-col space-y-2">
                       <div className="flex justify-between items-center text-[11px] text-stone-600 bg-stone-50/90 p-2 rounded border border-stone-200 backdrop-blur-sm"><span className="flex items-center font-bold"><Factory className="w-3.5 h-3.5 mr-1.5 text-stone-800" /> Dismantling Yards</span> <span className="p-1 px-1.5 bg-stone-200 text-stone-700 rounded-md font-bold">Suburbs</span></div>
                       <div className="flex justify-between items-center text-[11px] text-stone-600 bg-stone-50/90 p-2 rounded border border-stone-200 backdrop-blur-sm"><span className="flex items-center font-bold"><Building className="w-3.5 h-3.5 mr-1.5 text-stone-600" /> Municipal Landfills</span> <span className="p-1 px-1.5 bg-stone-200 text-stone-700 rounded-md font-bold">Outskirts</span></div>
                    </div>
                  )}
                  {materialPreset === 'sugarcane-bagasse' && (
                     <div className="flex flex-col space-y-2">
                       <div className="flex justify-between items-center text-[11px] text-stone-600 bg-stone-50/90 p-2 rounded border border-stone-200 backdrop-blur-sm"><span className="flex items-center font-bold"><Factory className="w-3.5 h-3.5 mr-1.5 text-emerald-600" /> Sugar Refineries</span> <span className="p-1 px-1.5 bg-lime-100 text-lime-700 rounded-md font-bold">North</span></div>
                       <div className="flex justify-between items-center text-[11px] text-stone-600 bg-stone-50/90 p-2 rounded border border-stone-200 backdrop-blur-sm"><span className="flex items-center font-bold"><TreePine className="w-3.5 h-3.5 mr-1.5 text-lime-600" /> Agri-waste Co-ops</span> <span className="p-1 px-1.5 bg-lime-100 text-lime-700 rounded-md font-bold">Rural</span></div>
                    </div>
                  )}
                  {materialPreset === 'custom' && (
                     <div className="flex flex-col justify-center items-center text-center p-3 relative z-10 bg-stone-50/80 backdrop-blur-sm rounded-lg border border-stone-200 h-full">
                       <MapPin className="w-6 h-6 text-stone-400 mb-2" />
                       <span className="text-xs text-stone-500 font-medium leading-relaxed">Dynamic mapping available after initial blueprint run.</span>
                     </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button 
              onClick={() => runCopilot('ideation')}
              disabled={!!loadingMsg}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold p-3.5 rounded-xl shadow-md transition duration-200 transform active:scale-95 flex justify-center items-center space-x-2 text-sm"
            >
              <Wand2 className="w-4 h-4" />
              <span>Run Upcycling Blueprint Engine</span>
            </button>
            
            <button 
              onClick={() => runCopilot('pitch')}
              disabled={!!loadingMsg}
              className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-bold p-3.5 rounded-xl shadow-md transition duration-200 transform active:scale-95 flex justify-center items-center space-x-2 text-sm"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Generate Market Pitch & SWOT</span>
            </button>
          </div>
        </div>

        <div ref={contentRef} className="lg:col-span-8 bg-stone-900 text-stone-100 rounded-2xl p-6 md:p-8 relative min-h-[450px] flex flex-col justify-between overflow-hidden">
          
          {(ideaResult || pitchResult) && (
            <div className="flex flex-wrap justify-end gap-2 mb-2 w-full z-10">
              <button 
                onClick={() => reactToPrintFn()}
                className="bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold py-2 px-3 rounded-lg flex items-center space-x-2 transition-colors border border-stone-700 shadow-md print:hidden"
              >
                <Printer className="w-4 h-4" />
                <span>Print</span>
              </button>
              <button 
                onClick={exportReport}
                className="bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold py-2 px-3 rounded-lg flex items-center space-x-2 transition-colors border border-stone-700 shadow-md print:hidden"
              >
                <Download className="w-4 h-4" />
                <span>Export Text</span>
              </button>
            </div>
          )}

          {loadingMsg && (
            <div className="absolute inset-0 bg-stone-950/95 rounded-2xl flex flex-col items-center justify-center space-y-4 z-20">
              <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
              <span className="text-stone-300 font-medium">{loadingMsg}</span>
            </div>
          )}

          {!ideaResult && !pitchResult && !errorMsg && !loadingMsg && (
            <div className="text-center py-16 my-auto">
              <Sparkles className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
              <h3 className="font-bold text-2xl text-emerald-400">Circular Co-Pilot Active</h3>
              <p className="text-stone-400 text-sm max-w-lg mx-auto mt-2">
                To start, configure your raw material on the left. Run the <strong>Upcycling Blueprint</strong> first to formulate a baseline product, then compile the <strong>Market Pitch & SWOT</strong> to build marketing assets.
              </p>
            </div>
          )}

          {errorMsg && (
            <div className="p-5 bg-red-950 border border-red-800 rounded-xl text-red-200 mt-auto">
              <h4 className="font-bold flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" /> 
                System Exception
              </h4>
              <p className="text-xs mt-2 font-mono">{errorMsg}</p>
            </div>
          )}
          
          <div className="space-y-8 mt-6">
            {ideaResult && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-stone-800 pb-4">
                  <div>
                    <span className="text-xs font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-950 border border-emerald-800 px-3 py-1 rounded-full break-words">Product Invention</span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-4 break-words">{ideaResult.productName}</h3>
                  </div>
                  <div className="mt-4 sm:mt-0 bg-amber-950 text-amber-300 border border-amber-800 px-3 py-1.5 rounded-lg text-xs font-bold uppercase shrink-0">
                    Process: <span className="ml-1 font-extrabold">{ideaResult.difficulty}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-stone-800 p-4 rounded-xl border border-stone-700">
                    <span className="text-stone-400 text-xs uppercase block mb-1">Market Segment</span>
                    <span className="font-bold text-stone-200 text-sm">{ideaResult.targetMarket}</span>
                  </div>
                  <div className="bg-stone-800 p-4 rounded-xl border border-stone-700">
                    <span className="text-stone-400 text-xs uppercase block mb-1">Startup Estimate</span>
                    <span className="font-bold text-emerald-400 text-sm">{ideaResult.estimatedInitialCost}</span>
                  </div>
                  <div className="bg-stone-800 p-4 rounded-xl border border-stone-700">
                    <span className="text-stone-400 text-xs uppercase block mb-1">Margin Index</span>
                    <span className="font-bold text-emerald-300 text-sm">{ideaResult.profitPotential}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-emerald-400 mb-3 text-sm tracking-wide uppercase">Step-by-Step Processing Pipeline</h4>
                  <ol className="space-y-3 text-sm text-stone-300">
                    {ideaResult.process.map((step, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="font-bold text-emerald-500 mr-2 shrink-0">{idx + 1}.</span> 
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="mt-6 bg-stone-800/80 p-5 rounded-xl border border-stone-700/80">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center">
                      <Calculator className="w-4 h-4 mr-2" />
                      ROI Calculator (Break-even Timeline)
                    </h4>
                    {ideaResult.estimatedInitialCost.match(/\d+/) && (
                      <button
                        onClick={() => setShowScenarios(!showScenarios)}
                        className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-stone-700 hover:bg-stone-600 text-stone-200 rounded-md transition-colors border border-stone-600"
                      >
                        {showScenarios ? 'Hide Scenarios' : 'Compare Scenarios'}
                      </button>
                    )}
                  </div>
                  {(() => {
                    const costStr = ideaResult.estimatedInitialCost;
                    const numbers = costStr.replace(/,/g, '').match(/\d+(\.\d+)?/g);
                    const cost = numbers && numbers.length > 0 
                      ? numbers.map(Number).reduce((a, b) => a + b, 0) / numbers.length 
                      : null;
                      
                    if (cost === null) {
                      return <p className="text-xs text-stone-400">Cannot calculate break-even (cost estimate lacks numerical data).</p>;
                    }
                    
                    const salesValue = parseFloat(monthlySales) || 0;
                    const months = salesValue > 0 ? (cost / salesValue).toFixed(1) : '∞';
                    
                    return (
                      <div className="flex flex-col gap-6">
                        <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                          <div className="w-full sm:w-1/2">
                            <label className="block text-xs font-medium text-stone-300 mb-2">Estimated Avg. Cost: <span className="text-stone-100 font-bold">{cost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></label>
                            <label className="block text-xs font-medium text-stone-400 mb-1">Expected Monthly Sales</label>
                            <input 
                              type="number" 
                              min="0"
                              value={monthlySales}
                              onChange={(e) => setMonthlySales(e.target.value)}
                              className="w-full bg-stone-900 border border-stone-600 text-stone-200 rounded-lg p-2.5 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm"
                              placeholder="Monthly sales amount"
                            />
                          </div>
                          <div className="w-full sm:w-1/2 bg-emerald-950/30 border border-emerald-900/50 rounded-xl p-4 flex flex-col items-center justify-center min-h-[92px]">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-500/80 mb-1">Estimated break-even</span>
                            <div className="text-emerald-400 text-2xl font-extrabold flex items-baseline">
                              {months} <span className="text-xs font-medium text-emerald-500 ml-1">months</span>
                            </div>
                          </div>
                        </div>

                        {showScenarios && (
                          <div className="w-full h-48 mt-2 border-t border-stone-700/50 pt-4">
                            <span className="text-xs text-stone-400 block mb-2 font-medium">Break-even Timeline Comparison (Months)</span>
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart 
                                data={[
                                  { name: 'Aggressive', months: salesValue > 0 ? parseFloat((cost / (salesValue * 1.5)).toFixed(1)) : 0, fill: '#34d399' },
                                  { name: 'Moderate', months: salesValue > 0 ? parseFloat((cost / salesValue).toFixed(1)) : 0, fill: '#10b981' },
                                  { name: 'Conservative', months: salesValue > 0 ? parseFloat((cost / (salesValue * 0.5)).toFixed(1)) : 0, fill: '#059669' },
                                ]} 
                                layout="vertical" 
                                margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" stroke="#444" horizontal={false} />
                                <XAxis type="number" stroke="#888" fontSize={10} axisLine={false} tickLine={false} />
                                <YAxis dataKey="name" type="category" stroke="#888" fontSize={10} axisLine={false} tickLine={false} width={80} />
                                <Tooltip 
                                  cursor={{fill: '#292524'}}
                                  contentStyle={{ backgroundColor: '#1c1917', borderColor: '#403e3b', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                                  formatter={(value: any) => [`${value} months`, 'Break-even']}
                                />
                                <Bar dataKey="months" radius={[0, 4, 4, 0]} maxBarSize={30}>
                                  {[0, 1, 2].map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={['#34d399', '#10b981', '#059669'][index]} />
                                  ))}
                                </Bar>
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>

                <div className="mt-6 bg-stone-800/80 p-5 rounded-xl border border-stone-700/80 print:break-inside-avoid">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-4 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Market Growth Projection
                  </h4>
                  {(() => {
                    const profitStr = ideaResult.profitPotential;
                    const profitMatch = profitStr.match(/\d+/);
                    const baseGrowth = profitMatch ? parseInt(profitMatch[0], 10) : 30; // fallback

                    const chartData = [
                      { month: 'Q1', value: Math.round(baseGrowth * 0.4) },
                      { month: 'Q2', value: Math.round(baseGrowth * 0.7) },
                      { month: 'Q3', value: Math.round(baseGrowth * 1.1) },
                      { month: 'Q4', value: Math.round(baseGrowth * 1.8) },
                      { month: 'Y2', value: Math.round(baseGrowth * 2.8) },
                      { month: 'Y3', value: Math.round(baseGrowth * 4.5) },
                    ];

                    return (
                      <div className="w-full h-48 mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
                            <XAxis 
                              dataKey="month" 
                              stroke="#888" 
                              fontSize={10} 
                              tickLine={false}
                              axisLine={false}
                            />
                            <YAxis 
                              stroke="#888" 
                              fontSize={10} 
                              tickLine={false}
                              axisLine={false}
                              tickFormatter={(value) => `${value}%`}
                            />
                            <Tooltip 
                              contentStyle={{ backgroundColor: '#1c1917', borderColor: '#403e3b', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                              itemStyle={{ color: '#34d399', fontWeight: 'bold' }}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="value" 
                              stroke="#34d399" 
                              strokeWidth={3}
                              dot={{ fill: '#064e3b', stroke: '#34d399', strokeWidth: 2, r: 4 }}
                              activeDot={{ r: 6, fill: '#34d399', stroke: '#fff' }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    );
                  })()}
                </div>
              </motion.div>
            )}

            {pitchResult && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                className="space-y-6 pt-4 border-t border-stone-800/50"
              >
                <div className="border-b border-stone-800 pb-4">
                  <span className="text-xs font-semibold tracking-wider text-teal-400 bg-teal-950 border border-teal-800 px-3 py-1 rounded-full uppercase">Commercial & SWOT Deck</span>
                  <h3 className="text-xl italic font-bold text-white mt-4">"{pitchResult.tagline}"</h3>
                </div>

                <div className="bg-stone-850 p-4 sm:p-5 rounded-xl border border-stone-800">
                  <h4 className="text-xs font-bold text-teal-400 uppercase tracking-widest mb-3 flex items-center break-words">
                    <Sparkles className="w-4 h-4 mr-2 shrink-0" /> Commercial Elevator Pitch
                  </h4>
                  <p className="text-sm text-stone-300 leading-relaxed italic break-words">
                    {pitchResult.elevatorPitch}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3 break-words">Enterprise SWOT Analysis</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-emerald-950/20 border border-emerald-900 p-4 rounded-xl">
                      <span className="text-emerald-400 font-bold text-xs uppercase block mb-2 break-words">💪 Strengths</span>
                      <p className="text-xs text-stone-300 break-words">{pitchResult.swot.strengths}</p>
                    </div>
                    <div className="bg-red-950/20 border border-red-900 p-4 rounded-xl">
                      <span className="text-red-400 font-bold text-xs uppercase block mb-2 break-words">⚠️ Weaknesses</span>
                      <p className="text-xs text-stone-300 break-words">{pitchResult.swot.weaknesses}</p>
                    </div>
                    <div className="bg-teal-950/20 border border-teal-900 p-4 rounded-xl">
                      <span className="text-teal-400 font-bold text-xs uppercase block mb-2 break-words">🚀 Opportunities</span>
                      <p className="text-xs text-stone-300 break-words">{pitchResult.swot.opportunities}</p>
                    </div>
                    <div className="bg-amber-950/20 border border-amber-900 p-4 rounded-xl">
                      <span className="text-amber-400 font-bold text-xs uppercase block mb-2 break-words">🛡️ Threats</span>
                      <p className="text-xs text-stone-300 break-words">{pitchResult.swot.threats}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
