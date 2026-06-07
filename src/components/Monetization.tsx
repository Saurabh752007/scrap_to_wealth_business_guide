import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

const data = [
  { name: 'Commissions', value: 45, color: '#10b981' },
  { name: 'Logistics', value: 25, color: '#14b8a6' },
  { name: 'Subscriptions', value: 20, color: '#f59e0b' },
  { name: 'Ads/Premium', value: 10, color: '#78716c' },
];

const faqs = [
  {
    question: "How do we make logistics profitable with heavy, low-value scrap?",
    answer: "The key is route density and localized matching. Instead of long-haul transport, the platform algorithms should match scrap generators with upcyclers within a 20-50km radius. You monetize by aggregating demand and negotiating bulk rates with local fleet operators, then adding a 15-20% margin to the end-user delivery fee."
  },
  {
    question: "Who pays for the scrap sorting and cleaning?",
    answer: "Initially, the scrap generator (seller) is incentivized to sort. Premium pricing in the marketplace is algorithmically tied to material purity. Unsorted, mixed waste sells at a steep discount. Over time, you can introduce 'Sorting-as-a-Service' nodes where local micro-entrepreneurs clean scrap for a share of the final sale price."
  },
  {
    question: "Why would upcyclers pay a subscription if they already pay commissions?",
    answer: "Subscriptions offer predictability. A 'Pro' tier provides upcyclers with early access to premium scrap drops, waived commissions on their first ₹50,000 of monthly sales, and advanced analytics on consumer trends (e.g., 'Glass terrariums are trending up 40%'). This turns variable costs into fixed, manageable overhead."
  },
  {
    question: "How do we solve the 'chicken and egg' marketplace dilemma without burning cash?",
    answer: "Start with a hyper-niche, constrained supply approach. Master ONE material first (e.g., industrial textile offcuts). Onboard 5-10 reliable suppliers manually, then heavily recruit upcyclers specific to that niche. Once liquidity is established in one vertical, expand horizontally to plastics or metals using the revenue generated."
  }
];

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-stone-200 rounded-xl overflow-hidden mb-3 bg-white hover:border-emerald-200 transition-colors">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-5 py-4 flex justify-between items-center focus:outline-none"
      >
        <span className="font-semibold text-stone-800">{question}</span>
        <ChevronDown className={cn("w-5 h-5 text-stone-400 transition-transform duration-300", isOpen && "transform rotate-180")} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1 text-stone-600 leading-relaxed text-sm border-t border-stone-100 mt-2">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Monetization() {
  return (
    <div className="space-y-8 mb-8">
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 md:p-10">
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

      <div className="bg-stone-50 rounded-2xl shadow-sm border border-stone-200 p-6 md:p-10">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-stone-800 mb-2">
            Frequently Asked Logistics & Profitability Questions
          </h3>
          <p className="text-stone-500 mb-8 max-w-2xl">
            Unpack the tactical complexities of building a sustainable, profitable circular economy marketplace.
          </p>
          
          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
