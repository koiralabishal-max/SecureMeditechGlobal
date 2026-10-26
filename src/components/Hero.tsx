import React from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2, Globe2, Truck, Award } from 'lucide-react';
import { STATS } from '../data/products';

interface HeroProps {
  onExploreCatalog: () => void;
  onRequestBulkRfq: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCatalog, onRequestBulkRfq }) => {
  return (
    <section id="home" className="relative bg-[#071E40] text-white overflow-hidden py-16 lg:py-24">
      {/* Background Subtle Tech Matrix & Supply Grid */}
      <div className="absolute inset-0 opacity-10 bg-pattern-grid pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#38B6FF]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            {/* Trust Kicker - Clean unboxed text */}
            <div className="flex items-center gap-2 text-xs font-semibold text-[#38B6FF] tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              <span>International Medical Supplier & OEM Contract Manufacturer</span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-300">MDR 2017/745</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15] text-balance">
              Precision Healthcare Solutions & Resilient Global Supply Chains
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
              Leading international supplier and OEM contract manufacturer for hospital equipment, surgical supplies, and diagnostic systems. Engineered with rigorous clinical accuracy, certified regulatory compliance, and multi-hub logistics.
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              {/* Tech Blue CTA */}
              <button
                onClick={onRequestBulkRfq}
                className="px-6 py-3.5 text-sm font-bold text-white bg-[#38B6FF] hover:bg-[#209ee8] rounded-xl shadow-lg shadow-[#38B6FF]/25 hover:shadow-xl hover:shadow-[#38B6FF]/35 transition-all duration-200 active:scale-95 flex items-center gap-2"
              >
                <span>Request Bulk Quotation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Secondary CTA */}
              <button
                onClick={onExploreCatalog}
                className="px-6 py-3.5 text-sm font-semibold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 rounded-xl border border-slate-600/60 transition-all duration-200 active:scale-95 flex items-center gap-2"
              >
                <span>Explore Product Catalog</span>
              </button>
            </div>

            {/* Badges Matrix */}
            <div className="pt-6 border-t border-slate-700/60 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                <span className="text-xs font-medium text-slate-200">CE Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#38B6FF] shrink-0" />
                <span className="text-xs font-medium text-slate-200">ISO 13485:2016</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#38B6FF] shrink-0" />
                <span className="text-xs font-medium text-slate-200">Global Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#10B981] shrink-0" />
                <span className="text-xs font-medium text-slate-200">100% Quality Assurance</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Focal Carrier with Overlay Data Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-900 group">
              <img
                src="/src/assets/images/hero_medical_logistics_1792848779603.jpg"
                alt="Secure MediTech Global high-tech clinical manufacturing and global medical supply facility"
                className="w-full h-80 sm:h-96 lg:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071E40]/90 via-[#071E40]/30 to-transparent" />

              {/* Floating Live Dispatch Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#0B2F63]/90 backdrop-blur-md rounded-xl p-4 border border-slate-600/70 text-xs">
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-700/80">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <Globe2 className="w-4 h-4 text-[#38B6FF]" />
                    <span>Global Distribution Hub Network</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#10B981] font-semibold bg-[#10B981]/15 px-2 py-0.5 rounded">
                    ONLINE
                  </span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Consolidated containerized and express air shipments dispatching daily to Europe, the Americas, Asia-Pacific, and the Middle East.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Full-Width 4-Column KPI Strip */}
        <div className="mt-14 pt-8 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
          {STATS.map((stat, idx) => (
            <div key={idx} className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/40">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#38B6FF] tracking-tight font-mono tabular-nums">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-white mt-0.5">
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {stat.subtext}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
