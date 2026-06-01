import React, { useState } from 'react';
import { Factory, Recycle, ShoppingCart, Check } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const modelData = {
  supplier: {
    title: "Scrap Generators (The Supply)",
    color: "text-stone-300",
    checkColor: "text-stone-400",
    points: [
      "**Their Need:** To get rid of industrial, retail, or household waste efficiently, legally, and ideally profitably.",
      "**Your Value:** You offer a digital dashboard to post bulk scrap, immediate price discovery, and hassle-free pickup coordination.",
      "**Strategic Action:** Target medium-scale manufacturing units first. They produce consistent, clean scrap (metal offcuts, uniform plastics) which is highly desirable for upcyclers."
    ]
  },
  upcycler: {
    title: "The Upcyclers (The Core Engine)",
    color: "text-emerald-400",
    checkColor: "text-emerald-500",
    points: [
      "**Their Need:** Consistent, categorized supply of raw scrap materials and a dedicated storefront to sell finished goods.",
      "**Your Value:** You solve their sourcing problem by providing a verified marketplace of scrap. You solve their sales problem by providing an audience looking specifically for upcycled goods.",
      "**Strategic Action:** Onboard them first. Offer them lower commission rates initially to build inventory. They are the 'chicken and egg' solution."
    ]
  },
  consumer: {
    title: "Eco-Consumers (The Demand)",
    color: "text-stone-300",
    checkColor: "text-stone-400",
    points: [
      "**Their Need:** Access to unique, sustainable, and eco-friendly products for lifestyle, home decor, or B2B interior design.",
      "**Your Value:** A curated, trustworthy e-commerce experience guaranteeing the 'upcycled' authenticity of the products they buy.",
      "**Strategic Action:** Utilize social media marketing focusing on the 'story' of the product (e.g., 'From car tire to coffee table'). Focus on high-ticket items first."
    ]
  }
};

type NodeType = 'supplier' | 'upcycler' | 'consumer';

export default function TheModel() {
  const [activeNode, setActiveNode] = useState<NodeType>('upcycler');

  const activeData = modelData[activeNode];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 md:p-10">
      <h2 className="text-2xl font-bold text-stone-800 mb-4">
        The 3-Sided Marketplace Ecosystem
      </h2>
      <p className="text-stone-600 mb-8">
        This section breaks down your core operational flow. As the middleman, your platform connects three distinct user groups. Click on each ecosystem node below to understand their role, what they bring to the platform, and how you provide value to them.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-center">
        <NodeCard
          id="supplier"
          title="Scrap Generators"
          subtitle="Industries, Households, Retail"
          icon={<Factory className="w-12 h-12 mb-3 mx-auto" />}
          active={activeNode === 'supplier'}
          onClick={() => setActiveNode('supplier')}
        />
        <NodeCard
          id="upcycler"
          title="The Upcyclers"
          subtitle="Artists, SME Manufacturers"
          icon={<Recycle className="w-12 h-12 mb-3 mx-auto" />}
          active={activeNode === 'upcycler'}
          onClick={() => setActiveNode('upcycler')}
        />
        <NodeCard
          id="consumer"
          title="Eco-Consumers"
          subtitle="Retail Buyers, B2B Decor"
          icon={<ShoppingCart className="w-12 h-12 mb-3 mx-auto" />}
          active={activeNode === 'consumer'}
          onClick={() => setActiveNode('consumer')}
        />
      </div>

      <div className="bg-stone-800 text-stone-100 rounded-xl p-6 md:p-8 relative overflow-hidden min-h-[250px]">
        <div className="absolute -right-10 -top-10 text-9xl opacity-5 pointer-events-none select-none">
          <Recycle className="w-64 h-64" />
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNode}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <h4 className={cn("text-xl font-bold mb-4", activeData.color)}>
              {activeData.title}
            </h4>
            <ul className="space-y-3 text-stone-300">
              {activeData.points.map((pt, idx) => {
                const parts = pt.split('**');
                return (
                  <li key={idx} className="flex items-start">
                    <Check className={cn("w-5 h-5 mr-2 mt-0.5 shrink-0", activeData.checkColor)} />
                    <span>
                      {parts.map((p, i) => (i % 2 === 1 ? <strong key={i} className="text-white">{p}</strong> : p))}
                    </span>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function NodeCard({ title, subtitle, icon, active, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "cursor-pointer group p-6 rounded-xl border-2 transition-all duration-300",
        active
          ? "border-emerald-500 bg-emerald-50 shadow-md"
          : "border-transparent bg-stone-50 hover:bg-emerald-50 hover:border-emerald-100"
      )}
    >
      <div 
        className={cn(
          "transition-transform group-hover:scale-110",
          active ? "text-emerald-700" : "text-stone-700"
        )}
      >
        {icon}
      </div>
      <h3
        className={cn(
          "font-bold text-lg mt-2",
          active ? "text-emerald-800" : "text-stone-800"
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          "text-sm mt-1",
          active ? "text-emerald-600" : "text-stone-500"
        )}
      >
        {subtitle}
      </p>
    </div>
  );
}
