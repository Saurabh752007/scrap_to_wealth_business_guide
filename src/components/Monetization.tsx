import React from 'react';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Commissions', value: 45, color: '#10b981' },
  { name: 'Logistics', value: 25, color: '#14b8a6' },
  { name: 'Subscriptions', value: 20, color: '#f59e0b' },
  { name: 'Ads/Premium', value: 10, color: '#78716c' },
];

export default function Monetization() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 md:p-10 mb-8">
      <h2 className="text-2xl font-bold text-stone-800 mb-4">
        Profitability & Revenue Strategy
      </h2>
      <p className="text-stone-600 mb-8">
        A multi-sided marketplace cannot rely on a single revenue stream. This section visualizes the recommended diversified monetization strategy. The chart below illustrates the optimal revenue mix to target by Year 2 of your operations, ensuring stability and high margins.
      </p>

      <div className="flex flex-col lg:flex-row items-center gap-10">
        <div className="w-full lg:w-1/2 h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTooltip 
                formatter={(value: number) => [`${value}%`, 'Share']}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="w-full lg:w-1/2 space-y-6">
          <div className="p-4 border-l-4 border-emerald-500 bg-emerald-50 rounded-r-lg">
            <h4 className="font-bold text-emerald-900">1. Transaction Commissions (45%)</h4>
            <p className="text-sm text-stone-700 mt-1">
              Take a 5-10% cut on every B2B scrap sale and a 10-15% cut on B2C upcycled product sales. This is your primary growth engine.
            </p>
          </div>
          <div className="p-4 border-l-4 border-teal-500 bg-teal-50 rounded-r-lg">
            <h4 className="font-bold text-teal-900">2. Integrated Logistics Markup (25%)</h4>
            <p className="text-sm text-stone-700 mt-1">
              Scrap is heavy. Partner with local transporters. Charge users a delivery fee that includes a 15% margin for your platform.
            </p>
          </div>
          <div className="p-4 border-l-4 border-amber-500 bg-amber-50 rounded-r-lg">
            <h4 className="font-bold text-amber-900">3. Premium Subscriptions (20%)</h4>
            <p className="text-sm text-stone-700 mt-1">
              Charge upcyclers a monthly fee for "Pro" accounts (better analytics, priority listing, zero-commission limits).
            </p>
          </div>
          <div className="p-4 border-l-4 border-stone-500 bg-stone-100 rounded-r-lg">
            <h4 className="font-bold text-stone-900">4. Featured Listings & Ads (10%)</h4>
            <p className="text-sm text-stone-700 mt-1">
              Allow scrap sellers with bulk inventory to pay for top placement in search results.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
