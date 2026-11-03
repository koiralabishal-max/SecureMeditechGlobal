import React, { useState } from 'react';
import { Calculator, X, Maximize2, Minimize2, ArrowDownRight } from 'lucide-react';
import { PriceEstimationCalculator } from './PriceEstimationCalculator';
import { Product } from '../types';

interface FloatingPriceCalculatorWidgetProps {
  onTransferToRfq: (product: Product, quantity: number, notes: string) => void;
}

export const FloatingPriceCalculatorWidget: React.FC<FloatingPriceCalculatorWidgetProps> = ({
  onTransferToRfq
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const handleScrollToFooterCalculator = () => {
    setIsOpen(false);
    const el = document.getElementById('price-calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTransferAndClose = (product: Product, quantity: number, notes: string) => {
    onTransferToRfq(product, quantity, notes);
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Launcher Button on Bottom-Left */}
      {!isOpen && (
        <div className="fixed bottom-6 left-6 z-40">
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-2.5 px-4 py-3 bg-[#071E40] hover:bg-[#0B2F63] text-white rounded-full shadow-2xl hover:shadow-[#38B6FF]/20 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 border border-slate-700/80 cursor-pointer"
            aria-label="Open Price Estimation Calculator"
          >
            <div className="w-7 h-7 rounded-full bg-[#38B6FF]/20 text-[#38B6FF] flex items-center justify-center shrink-0 group-hover:bg-[#38B6FF] group-hover:text-[#0B2F63] transition-colors">
              <Calculator className="w-4 h-4" />
            </div>

            <div className="text-left pr-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#38B6FF]">
                Wholesale Tool
              </div>
              <div className="text-xs font-semibold text-white">
                Price Estimator
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Floating Modal / Drawer when Open */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="bg-white w-full max-w-4xl max-h-[92vh] rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-150"
            role="dialog"
            aria-modal="true"
            aria-label="Price Estimation Calculator"
          >
            {/* Top Bar Controls */}
            <div className="bg-[#0B2F63] px-5 py-3 text-white flex items-center justify-between border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#38B6FF] text-[#0B2F63] flex items-center justify-center font-bold">
                  <Calculator className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-tight">
                    Budgetary Price & Volume Calculator
                  </h3>
                  <p className="text-[11px] text-slate-300">
                    Live wholesale estimates based on volume tiers & Incoterms
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleScrollToFooterCalculator}
                  className="hidden sm:flex items-center gap-1 px-2.5 py-1 text-xs text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  title="Jump down to full footer calculator"
                >
                  <ArrowDownRight className="w-3.5 h-3.5" />
                  <span>View in Footer</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                  aria-label="Close calculator"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Calculator Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/60">
              <PriceEstimationCalculator
                onTransferToRfq={handleTransferAndClose}
                className="shadow-none border border-slate-200"
              />
            </div>

          </div>
        </div>
      )}
    </>
  );
};
