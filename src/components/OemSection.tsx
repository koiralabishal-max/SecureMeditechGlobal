'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { OEM_STEPS } from '../data/products';
import { SectionHeader } from './SectionHeader';
import { CheckCircle2, ChevronRight, Cpu, ShieldCheck, FileCheck, Truck, ArrowRight } from 'lucide-react';

interface OemSectionProps {
  onStartOemInquiry: () => void;
}

export const OemSection: React.FC<OemSectionProps> = ({ onStartOemInquiry }) => {
  const [activeStep, setActiveStep] = useState(0);

  const stepIcons = [
    <Cpu key="0" className="w-5 h-5 text-[#3B6B91]" />,
    <ShieldCheck key="1" className="w-5 h-5 text-[#3F7D6B]" />,
    <FileCheck key="2" className="w-5 h-5 text-[#3B6B91]" />,
    <Truck key="3" className="w-5 h-5 text-[#3F7D6B]" />
  ];

  return (
    <section id="oem" className="py-20 sm:py-24 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          className="mb-12"
          eyebrow="OEM Medical Device & Private Label Manufacturer"
          title="Turnkey OEM Contract Manufacturing & Private Label Medical Supplies"
          description="Partner with an ISO 13485 manufacturer for custom tooling, cleanroom injection molding, private-label packaging, regulatory technical dossiers, and bonded supply chain distribution."
        />

        {/* Cleanroom Facility Showcase Banner */}
        <div className="relative rounded-3xl overflow-hidden mb-14 border border-slate-200 shadow-lg">
          <Image
            src="/assets/webp/oem_cleanroom_facility_1792848782226.webp"
            alt="ISO Class 7 HEPA-filtered medical device cleanroom manufacturing and automated injection molding facility"
            className="w-full h-[26rem] sm:h-80 lg:h-96 object-cover"
            loading="lazy"
            sizes="(max-width: 1280px) 100vw, 1216px"
            width={1200}
            height={520}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#19293F]/95 via-[#19293F]/75 to-[#19293F]/15 flex items-end sm:items-center">
            <div className="p-6 sm:p-10 lg:p-12 max-w-xl text-white space-y-4">
              <span className="inline-block bg-[#3F7D6B] text-white text-xs font-bold px-2.5 py-1 rounded-md">
                ISO Class 7 & Class 8 Certified Cleanrooms
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight">
                Automated Medical Cleanroom Production Lines
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Operating 24/7 HEPA-filtered cleanrooms equipped with automated multi-cavity injection molding, ultrasonic welding, laser marking, and robotic packaging.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={onStartOemInquiry}
                  className="h-11 px-5 bg-[#DCE7F2] hover:bg-[#CBDCEB] text-[#19293F] text-sm font-bold rounded-xl shadow transition-colors inline-flex items-center gap-2"
                >
                  <span>Request OEM Technical Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  href="/oem-manufacturing"
                  className="h-11 px-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-sm font-semibold rounded-xl transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Explore OEM MOQs &amp; Specs</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Step Interactive Workflow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Step Selector Column */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500 mb-3">
              Manufacturing Lifecycle Stages
            </h3>
            {OEM_STEPS.map((item, index) => {
              const isCurrent = activeStep === index;
              return (
                <button
                  type="button"
                  key={index}
                  onClick={() => setActiveStep(index)}
                  aria-pressed={isCurrent}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    isCurrent
                      ? 'bg-[#223752] text-white border-[#223752] shadow-md'
                      : 'bg-[#F7F8FA] hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 shrink-0 rounded-lg flex items-center justify-center font-bold text-sm tabular-nums ${
                        isCurrent ? 'bg-[#DCE7F2] text-[#19293F]' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {item.step}
                      </div>
                      <div>
                        <div className={`text-sm font-bold leading-snug ${isCurrent ? 'text-white' : 'text-[#223752]'}`}>
                          {item.title}
                        </div>
                        <div className={`text-xs mt-0.5 ${isCurrent ? 'text-slate-300' : 'text-slate-500'}`}>
                          {item.subtitle}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 ${isCurrent ? 'text-[#8CB3D4]' : 'text-slate-400'}`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Details Column */}
          <div className="lg:col-span-7 bg-[#F7F8FA] rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  {stepIcons[activeStep]}
                </div>
                <div>
                  <span className="text-xs font-bold text-[#3B6B91] uppercase tracking-wider">
                    Stage {OEM_STEPS[activeStep].step} of 04
                  </span>
                  <h3 className="text-xl font-bold text-[#223752] leading-snug">
                    {OEM_STEPS[activeStep].title}
                  </h3>
                </div>
              </div>
            </div>

            <p className="text-slate-700 text-base leading-relaxed">
              {OEM_STEPS[activeStep].description}
            </p>

            {/* Deliverables Checklist */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500 mb-3">
                Validated deliverables & audit trail
              </h4>
              <div className="space-y-2">
                {OEM_STEPS[activeStep].deliverables.map((deliv, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-800 bg-white p-3.5 rounded-xl border border-slate-200/80">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-[#3F7D6B] shrink-0" />
                    <span className="font-medium">{deliv}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step Action Callout */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-sm text-slate-500">
                Need proprietary custom branding & sterile blister packaging?
              </span>
              <button
                onClick={onStartOemInquiry}
                className="shrink-0 h-10 px-4 text-sm font-bold text-[#223752] hover:text-[#2E496B] bg-white border border-slate-300 rounded-xl hover:border-[#7BA3C4] transition-all"
              >
                Inquire for this Phase
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
