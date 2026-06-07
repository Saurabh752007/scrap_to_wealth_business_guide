import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const schemes = [
  {
    id: 'acc-1',
    title: '1. PMEGP (Prime Minister’s Employment Generation Programme)',
    bestFor: 'Initial capital for setting up the digital infrastructure and small warehouse space.',
    benefits: 'Bank-financed subsidy program. You can get up to ₹50 Lakhs for the manufacturing sector (if you process any scrap) or ₹20 Lakhs for the service/platform sector. The government provides a margin money subsidy of 15% to 35% depending on your category and location (urban vs. rural).',
    action: 'Register your business as an MSME on the Udyam portal to become eligible.'
  },
  {
    id: 'acc-2',
    title: '2. CGTMSE (Credit Guarantee Fund Trust for Micro and Small Enterprises)',
    bestFor: 'Getting loans without needing to pledge personal assets or property (Collateral-free).',
    benefits: 'Provides credit guarantee up to ₹5 Crore to banks. If your platform needs significant capital to build logistics networks or software, banks are more willing to lend because the government backs a large percentage of the loan risk.',
    action: 'Prepare a robust, data-backed business plan projecting the tech platform\'s scalability to present to member lending institutions.'
  },
  {
    id: 'acc-3',
    title: '3. Swachh Bharat Mission (Urban) - Waste Management Grants',
    bestFor: 'Funding aspects of the business that directly reduce landfill waste (e.g., mobilizing scrap collection).',
    benefits: 'Local municipal bodies (like Kolhapur Municipal Corporation) often float tenders or offer grants for startups that provide innovative solid waste management solutions. Since your platform facilitates recycling/upcycling, you can partner with Urban Local Bodies (ULBs).',
    action: 'Pitch your platform to local municipal commissioners as a digital extension of their waste management goals.'
  },
  {
    id: 'acc-4',
    title: '4. Maharashtra State Industrial Policy & Subsidies',
    bestFor: 'Location-specific operational benefits.',
    benefits: 'Maharashtra offers schemes under the Package Scheme of Incentives (PSI). If you set up a physical aggregation center for scrap in specific zones (D or D+ areas), you can get Industrial Promotion Subsidy (IPS), exemption from electricity duty, and waiver of stamp duty.',
    action: 'Register with the Directorate of Industries, Maharashtra, and consult a local chartered accountant to map exact zonal benefits.'
  }
];

export default function GovtSchemes() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 md:p-10 mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h2 className="text-2xl font-bold text-stone-800">
          Leveraging Government Schemes (India)
        </h2>
        <a 
          href="https://www.myscheme.gov.in" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold py-2 px-4 rounded-lg flex items-center space-x-2 transition-colors border border-emerald-200 text-sm whitespace-nowrap print:hidden"
        >
          <span>Explore myScheme.gov.in</span>
          <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
      <p className="text-stone-600 mb-8">
        The circular economy is heavily incentivized by the Indian government. This section details the most relevant financial aids, subsidies, and schemes you can leverage to fund your platform's technology, logistics, and initial operations. Click on each scheme to reveal eligibility and benefits.
      </p>
      
      <div className="space-y-4">
        {schemes.map((scheme) => {
          const isOpen = expandedId === scheme.id;
          return (
            <div key={scheme.id} className="border border-stone-200 rounded-lg overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left bg-stone-50 hover:bg-stone-100 transition-colors flex justify-between items-center focus:outline-none"
                onClick={() => toggle(scheme.id)}
              >
                <span className="font-bold text-stone-800">{scheme.title}</span>
                <span className={cn("text-emerald-600 transition-transform duration-300", isOpen ? "rotate-45" : "")}>
                  <Plus className="w-5 h-5" />
                </span>
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 bg-white border-t border-stone-200 text-sm text-stone-700 overflow-hidden"
                  >
                    <div className="py-4 space-y-2">
                      <p><strong>Best for:</strong> {scheme.bestFor}</p>
                      <p><strong>Benefits:</strong> {scheme.benefits}</p>
                      <p><strong>Action:</strong> {scheme.action}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
