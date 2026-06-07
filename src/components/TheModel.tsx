import React, { useState } from 'react';
import { Factory, Recycle, ShoppingCart, Check, Info, TrendingUp, Leaf, Users, Layers } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const Tooltip = ({ children, content }: { children: React.ReactNode, content: React.ReactNode }) => (
  <span className="group relative inline-flex items-center cursor-help">
    <span className="font-semibold text-emerald-300 decoration-dashed underline underline-offset-4 decoration-emerald-500/40 hover:decoration-emerald-400 transition-colors">
      {children}
    </span>
    <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[280px] opacity-0 transition-all duration-200 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 z-50">
      <span className="block bg-white text-stone-800 border border-stone-200 text-xs font-normal rounded-lg p-3 shadow-xl text-left leading-relaxed">
        <span className="flex items-center font-bold text-stone-900 mb-1">
          <Info className="w-3 h-3 mr-1 text-emerald-600" />
          Definition
        </span>
        {content}
      </span>
      <svg className="absolute text-white w-full h-2 top-full left-0 -mt-px filter drop-shadow-sm" x="0px" y="0px" viewBox="0 0 255 255" xmlSpace="preserve">
        <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
      </svg>
    </span>
  </span>
);

const modelData = {
  supplier: {
    title: "Scrap Generators (The Supply)",
    color: "text-stone-300",
    checkColor: "text-stone-400",
    points: [
      <React.Fragment key="1"><strong>Their Need:</strong> To get rid of industrial, retail, or household waste efficiently, legally, and ideally profitably.</React.Fragment>,
      <React.Fragment key="2"><strong>Your Value:</strong> You offer a digital dashboard to post bulk scrap, immediate <Tooltip content="The mechanism of automatically determining the true market value of scrap based on real-time supply and demand interactions.">price discovery</Tooltip>, and hassle-free pickup coordination.</React.Fragment>,
      <React.Fragment key="3"><strong>Strategic Action:</strong> Target medium-scale manufacturing units first. They produce consistent, <Tooltip content="Waste separated at the source without contamination, making it much easier to process and inherently more valuable.">clean scrap</Tooltip> (metal offcuts, uniform plastics) which is highly desirable.</React.Fragment>
    ]
  },
  upcycler: {
    title: "The Upcyclers (The Core Engine)",
    color: "text-emerald-400",
    checkColor: "text-emerald-500",
    points: [
      <React.Fragment key="1"><strong>Their Need:</strong> Consistent, categorized supply of raw scrap materials and a dedicated storefront to sell finished goods.</React.Fragment>,
      <React.Fragment key="2"><strong>Your Value:</strong> You solve their sourcing problem by providing a verified marketplace. You solve their sales problem by providing an audience looking specifically for <Tooltip content="The process of transforming by-products, waste materials, and useless or unwanted products into new materials or products of better quality or for better environmental value.">upcycled goods</Tooltip>.</React.Fragment>,
      <React.Fragment key="3"><strong>Strategic Action:</strong> Onboard them first. Offer them lower commission rates initially to build inventory. They are the <Tooltip content="A foundational dilemma for two-sided platforms where you need supply to attract demand, and demand to attract supply. Here, upcyclers bridge both sides.">chicken and egg</Tooltip> solution.</React.Fragment>
    ]
  },
  consumer: {
    title: "Eco-Consumers (The Demand)",
    color: "text-stone-300",
    checkColor: "text-stone-400",
    points: [
      <React.Fragment key="1"><strong>Their Need:</strong> Access to unique, sustainable, and eco-friendly products for lifestyle, home decor, or <Tooltip content="Business-to-Business. In this context, selling upcycled decor or furniture directly to corporate offices or architectural projects rather than individual retail consumers.">B2B interior design</Tooltip>.</React.Fragment>,
      <React.Fragment key="2"><strong>Your Value:</strong> A curated, trustworthy e-commerce experience guaranteeing the 'upcycled' <Tooltip content="Ensuring the materials actually came from waste chains, preventing greenwashing and establishing trust with eco-conscious buyers.">authenticity</Tooltip> of the products they buy.</React.Fragment>,
      <React.Fragment key="3"><strong>Strategic Action:</strong> Utilize social media marketing focusing on the 'story' of the product (e.g., 'From car tire to coffee table'). Focus on <Tooltip content="Expensive merchandise that offers significantly higher profit margins per unit sold, justifying customized processing labor.">high-ticket items</Tooltip> first.</React.Fragment>
    ]
  }
};

type NodeType = 'supplier' | 'upcycler' | 'consumer';

export default function TheModel() {
  const [activeNode, setActiveNode] = useState<NodeType>('upcycler');

  const activeData = modelData[activeNode];

  return (
    <div className="space-y-8">
      {/* Executive Summary Metrics Card */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex flex-col justify-center">
          <div className="flex items-center mb-1">
            <Leaf className="w-4 h-4 text-emerald-600 mr-2" />
            <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">Projected Diversion</span>
          </div>
          <p className="text-2xl font-bold text-emerald-600 tracking-tight">1,200 <span className="text-sm font-normal text-emerald-700 -ml-1">Tons/yr</span></p>
        </div>
        
        <div className="bg-stone-50 border border-stone-200 p-4 rounded-xl flex flex-col justify-center">
          <div className="flex items-center mb-1">
            <TrendingUp className="w-4 h-4 text-stone-500 mr-2" />
            <span className="text-[10px] uppercase font-bold text-stone-600 tracking-wider">Total Est. Profit</span>
          </div>
          <p className="text-2xl font-bold text-stone-800 tracking-tight">₹15.5 <span className="text-sm font-normal text-stone-500 -ml-1">Lakhs/yr</span></p>
        </div>

        <div className="bg-stone-50 border border-stone-200 p-4 rounded-xl flex flex-col justify-center">
          <div className="flex items-center mb-1">
            <Users className="w-4 h-4 text-stone-500 mr-2" />
            <span className="text-[10px] uppercase font-bold text-stone-600 tracking-wider">Active Upcyclers</span>
          </div>
          <p className="text-2xl font-bold text-stone-800 tracking-tight">45+</p>
        </div>

        <div className="bg-stone-50 border border-stone-200 p-4 rounded-xl flex flex-col justify-center">
          <div className="flex items-center mb-1">
            <Layers className="w-4 h-4 text-stone-500 mr-2" />
            <span className="text-[10px] uppercase font-bold text-stone-600 tracking-wider">Core Supply Chain</span>
          </div>
          <p className="text-2xl font-bold text-stone-800 tracking-tight">3 <span className="text-sm font-normal text-stone-500 -ml-1">Nodes</span></p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 md:p-10">
        <h2 className="text-2xl font-bold text-stone-800 mb-4">
          The 3-Sided Marketplace Ecosystem
        </h2>
      <p className="text-stone-600 mb-8">
        This section breaks down your core operational flow. As the middleman, your platform connects three distinct user groups. Click on each ecosystem node below to understand their role, what they bring to the platform, and how you provide value to them. Hover over <span className="text-emerald-500 font-medium decoration-dashed underline underline-offset-4 decoration-emerald-500/40">highlighted terms</span> to learn more.
      </p>

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
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
            <ul className="space-y-4 text-stone-300">
              {activeData.points.map((pt, idx) => (
                <li key={idx} className="flex items-start">
                  <Check className={cn("w-5 h-5 mr-3 mt-1 shrink-0", activeData.checkColor)} />
                  <span className="leading-relaxed">
                    {pt}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
      </div>
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
          ? "border-emerald-500 bg-emerald-50 shadow-md transform -translate-y-1"
          : "border-transparent bg-stone-50 hover:bg-emerald-50/50 hover:border-emerald-100"
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
