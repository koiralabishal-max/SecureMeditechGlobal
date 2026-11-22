'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, CheckCircle2, Globe2, Truck, Award } from 'lucide-react';
import { STATS } from '../data/products';
import { trackBulkQuoteRequest } from '@/lib/analytics';

interface HeroProps {
  onExploreCatalog: () => void;
  onRequestBulkRfq: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCatalog, onRequestBulkRfq }) => {
  return (
    <section id="home" className="relative bg-[#19293F] text-white overflow-hidden pt-10 pb-12 sm:pt-14 lg:pt-16 lg:pb-14">
      {/* Subtle architectural grid */}
      <div className="absolute inset-0 opacity-[0.07] bg-pattern-grid pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 flex flex-col justify-center gap-6">
            
            {/* Trust Kicker - Clean unboxed text */}
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold text-[#8CB3D4] tracking-[0.1em] uppercase">
              <span>International Medical Equipment Supplier &amp; OEM Manufacturer</span>
              <span className="text-slate-500" aria-hidden="true">·</span>
              <span className="text-slate-300">ISO 13485 &amp; MDR 2017/745</span>
            </p>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-white leading-[1.08] text-balance">
              Wholesale Medical Supplies &amp; Precision OEM Manufacturing
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
              Certified medical consumables supplier and surgical equipment manufacturer delivering wholesale hospital supplies, critical care catheters, diagnostic systems, and private-label medical products across 65+ countries.
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3">
              <button
                onClick={() => {
                  trackBulkQuoteRequest({ stage: 'open' });
                  onRequestBulkRfq();
                }}
                className="h-12 px-6 text-[15px] font-bold text-[#19293F] bg-[#DCE7F2] hover:bg-[#CBDCEB] rounded-xl shadow-sm transition-colors duration-200 active:scale-[0.98] inline-flex items-center justify-center gap-2"
              >
                <span>Request Bulk Quotation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreCatalog}
                className="h-12 px-6 text-[15px] font-semibold text-white bg-white/[0.06] hover:bg-white/[0.12] rounded-xl border border-white/20 transition-colors duration-200 active:scale-[0.98] inline-flex items-center justify-center gap-2"
              >
                <span>Explore Product Catalog</span>
              </button>
            </div>

            {/* Badges Matrix */}
            <div className="mt-2 pt-6 border-t border-slate-700/60 flex flex-wrap gap-x-6 gap-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#7DB5A4] shrink-0" />
                <span className="text-sm font-medium text-slate-200">CE Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#8CB3D4] shrink-0" />
                <span className="text-sm font-medium text-slate-200">ISO 13485:2016</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#8CB3D4] shrink-0" />
                <span className="text-sm font-medium text-slate-200">Global Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#7DB5A4] shrink-0" />
                <span className="text-sm font-medium text-slate-200 whitespace-nowrap">100% Quality Assurance</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Focal Carrier with Overlay Data Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/60 shadow-xl bg-[#152336] group">
              <Image
                src="/assets/webp/hero_medical_logistics_1792848779603.webp"
                alt="Secure MediTech Global high-tech clinical manufacturing and global medical supply facility"
                className="w-full h-64 sm:h-80 lg:h-[380px] object-cover transition-transform duration-700 group-hover:scale-105"
                priority
                fetchPriority="high"
                sizes="(max-width: 1024px) 100vw, 45vw"
                width={1200}
                height={840}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#19293F]/85 via-[#19293F]/25 to-transparent" />

              {/* Floating Dispatch Info Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#19293F]/90 backdrop-blur-md rounded-xl p-4 border border-white/15 text-sm">
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/10">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <Globe2 className="w-4 h-4 text-[#8CB3D4]" />
                    <span>Global Distribution Hub Network</span>
                  </div>
                  <span className="text-[11px] font-medium text-[#9AC6B8]">
                    65+ Countries
                  </span>
                </div>
                <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
                  Consolidated containerized and express air shipments dispatching daily to Europe, the Americas, Asia-Pacific, and the Middle East.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Full-Width 4-Column KPI Strip */}
        <div className="mt-10 lg:mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {STATS.map((stat, idx) => (
            <div key={idx} className="p-4 sm:p-5 bg-white/[0.04] rounded-2xl border border-white/10">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#9DC0DE] tracking-tight tabular-nums">
                {stat.value}
              </div>
              <div className="text-sm font-bold text-white mt-1">
                {stat.label}
              </div>
              <div className="text-xs text-slate-300 mt-1 leading-snug">
                {stat.subtext}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
