import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Month 3', scrap: 10, upcycled: 50 },
  { name: 'Month 6', scrap: 35, upcycled: 200 },
  { name: 'Month 9', scrap: 80, upcycled: 500 },
  { name: 'Month 12', scrap: 150, upcycled: 1200 },
  { name: 'Month 18', scrap: 300, upcycled: 2500 },
  { name: 'Year 2', scrap: 600, upcycled: 5000 },
];

export default function Scaling() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 md:p-10 mb-8">
      <h2 className="text-2xl font-bold text-stone-800 mb-4">
        The Expansion Roadmap
      </h2>
      <p className="text-stone-600 mb-8">
        Expanding too fast is a common marketplace failure. This section outlines a localized, phased approach. Starting in a specific hub (like Kolhapur/Maharashtra) allows you to control logistics and build dense network effects before scaling geographically. The chart shows expected transaction volume growth across phases.
      </p>
      
      <div className="w-full h-[400px] mb-10">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f4" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#78716c'}} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#78716c'}} />
            <RechartsTooltip 
              cursor={{fill: '#fafaf9'}}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
            <Bar dataKey="scrap" name="Scrap Tonnage Traded" fill="#059669" radius={[4, 4, 0, 0]} barSize={32} />
            <Bar dataKey="upcycled" name="Upcycled Products Sold" fill="#d6d3d1" radius={[4, 4, 0, 0]} barSize={32} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-stone-50 p-6 rounded-xl border border-stone-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-lg text-stone-800">Phase 1: Hyper-Local</h4>
            <span className="text-xs font-bold px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full">Months 1-8</span>
          </div>
          <ul className="text-sm text-stone-600 space-y-2">
            <li>&bull; Focus strictly on your immediate city (e.g., Kolhapur).</li>
            <li>&bull; Target highly liquid scrap (metal, paper, specific plastics).</li>
            <li>&bull; Manually match buyers and sellers if necessary to fake liquidity.</li>
            <li>&bull; Subsidize logistics to guarantee user retention.</li>
          </ul>
        </div>
        <div className="bg-stone-50 p-6 rounded-xl border border-stone-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-lg text-stone-800">Phase 2: Regional Hubs</h4>
            <span className="text-xs font-bold px-2 py-1 bg-teal-100 text-teal-800 rounded-full">Months 9-18</span>
          </div>
          <ul className="text-sm text-stone-600 space-y-2">
            <li>&bull; Expand to neighboring industrial corridors (Pune, Mumbai).</li>
            <li>&bull; Introduce the B2C Upcycled marketplace fully.</li>
            <li>&bull; Launch the Premium Subscription tier.</li>
            <li>&bull; Automate logistics API integrations with regional carriers.</li>
          </ul>
        </div>
        <div className="bg-stone-50 p-6 rounded-xl border border-stone-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-lg text-stone-800">Phase 3: National / B2B Scale</h4>
            <span className="text-xs font-bold px-2 py-1 bg-stone-200 text-stone-800 rounded-full">Year 2+</span>
          </div>
          <ul className="text-sm text-stone-600 space-y-2">
            <li>&bull; Open up national shipping for upcycled products.</li>
            <li>&bull; Introduce heavy industrial scrap auctions.</li>
            <li>&bull; Enterprise tools for ESG reporting for scrap generators.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
