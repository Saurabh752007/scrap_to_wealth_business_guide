import React, { useState } from 'react';
import { Leaf } from 'lucide-react';
import { TabId } from './types';
import TheModel from './components/TheModel';
import Monetization from './components/Monetization';
import Scaling from './components/Scaling';
import GovtSchemes from './components/GovtSchemes';
import AICopilot from './components/AICopilot';
import { cn } from './lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const tabs = [
  { id: 'model', label: 'The Model', special: false },
  { id: 'monetize', label: 'Monetization', special: false },
  { id: 'scale', label: 'Scaling', special: false },
  { id: 'schemes', label: 'Govt Schemes', special: false },
  { id: 'ai-lab', label: '✨ AI Business Co-Pilot', special: true },
] as const;

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('model');

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-emerald-200 selection:text-emerald-900">
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Leaf className="w-6 h-6 mr-2 text-emerald-600" />
              <span className="font-bold text-xl tracking-tight text-emerald-800">
                EcoTrade <span className="text-stone-500 font-normal">Blueprint</span>
              </span>
            </div>
            <div className="flex space-x-1 sm:space-x-8 items-center overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabId)}
                  className={cn(
                    "px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                    activeTab === tab.id
                      ? "border-b-2 border-emerald-600 text-emerald-600 font-semibold"
                      : "text-stone-600 hover:text-emerald-600",
                    tab.special && activeTab !== tab.id && "text-emerald-600 font-bold"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-24">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-4 tracking-tight">
            Architecting the Circular Economy
          </h1>
          <p className="text-lg text-stone-600 max-w-3xl mx-auto">
            A strategic blueprint for building a profitable, scalable marketplace connecting scrap generators, upcyclers, and eco-conscious consumers. Explore the sections below to understand the operational flow, financial strategy, and available government backing.
          </p>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'model' && <TheModel />}
            {activeTab === 'monetize' && <Monetization />}
            {activeTab === 'scale' && <Scaling />}
            {activeTab === 'schemes' && <GovtSchemes />}
            {activeTab === 'ai-lab' && <AICopilot />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
