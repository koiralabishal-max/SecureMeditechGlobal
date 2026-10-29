'use client';

import React, { useState } from 'react';
import { OEM_STEPS } from '../data/products';
import { SectionHeader } from './SectionHeader';
import { CheckCircle2, ChevronRight, Cpu, ShieldCheck, FileCheck, Truck, ArrowRight } from 'lucide-react';

interface OemSectionProps {
  onStartOemInquiry: () => void;
}

export const OemSection: React.FC<OemSectionProps> = ({ onStartOemInquiry }) => {
  const [activeStep, setActiveStep] = useState(0);

  const stepIcons = [
    <Cpu key="0" className="w-5 h-5 text-[#38B6FF]" />,
    <ShieldCheck key="1" className="w-5 h-5 text-[#10B981]" />,
    <FileCheck key="2" className="w-5 h-5 text-[#38B6FF]" />,
    <Truck key="3" className="w-5 h-5 text-[#10B981]" />
  ];

  return (
    <section id="oem" className="py-20 sm:py-24 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          className="mb-12"
          eyebrow="OEM / ODM Contract Manufacturing"
          title="Turnkey Medical Device OEM, from Prototype to Port Clearance"
          description="Partner with an accredited manufacturer for custom tooling, ISO 13485 cleanroom injection molding, regulatory technical dossiers, and bonded supply chain distribution."
        />

        {/* Cleanroom Facility Showcase Banner */}
        <div className="relative rounded-3xl overflow-hidden mb-14 border border-slate-200 shadow-lg">
          <img
            src="/assets/images/oem_cleanroom_facility_1792848782226.jpg"
            alt="ISO Class 7 Medical Device Cleanroom Manufacturing Facility"
            className="w-full h-[26rem] sm:h-80 lg:h-96 object-cover"
            loading="lazy"
            decoding="async"
            width={1200}
            height={384}
          />
          <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#071E40]/95 via-[#071E40]/70 to-[#071E40]/10 flex items-end sm:items-center">
            <div className="p-6 sm:p-10 lg:p-12 max-w-xl text-white space-y-4">
              <span className="inline-block bg-[#10B981] text-white text-xs font-bold px-2.5 py-1 rounded-md">
                ISO Class 7 & Class 8 Certified Cleanrooms
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight">
                Automated Medical Cleanroom Production Lines
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Operating 24/7 HEPA-filtered cleanrooms equipped with automated multi-cavity injection molding, ultrasonic welding, laser marking, and robotic packaging.
              </p>
              <div className="pt-2">
                <button
                  onClick={onStartOemInquiry}
                  className="h-11 px-5 bg-[#38B6FF] hover:bg-[#5cc4ff] text-[#071E40] text-sm font-bold rounded-xl shadow transition-colors inline-flex items-center gap-2"
                >
                  <span>Request OEM Technical Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
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
                      ? 'bg-[#0B2F63] text-white border-[#0B2F63] shadow-md'
                      : 'bg-[#F8FAFC] hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 shrink-0 rounded-lg flex items-center justify-center font-bold text-sm tabular-nums ${
                        isCurrent ? 'bg-[#38B6FF] text-[#071E40]' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {item.step}
                      </div>
                      <div>
                        <div className={`text-sm font-bold leading-snug ${isCurrent ? 'text-white' : 'text-[#0B2F63]'}`}>
                          {item.title}
                        </div>
                        <div className={`text-xs mt-0.5 ${isCurrent ? 'text-slate-300' : 'text-slate-500'}`}>
                          {item.subtitle}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 ${isCurrent ? 'text-[#38B6FF]' : 'text-slate-400'}`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Details Column */}
          <div className="lg:col-span-7 bg-[#F8FAFC] rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  {stepIcons[activeStep]}
                </div>
                <div>
                  <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                    Stage {OEM_STEPS[activeStep].step} of 04
                  </span>
                  <h3 className="text-xl font-bold text-[#0B2F63] leading-snug">
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
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-[#10B981] shrink-0" />
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
                className="shrink-0 h-10 px-4 text-sm font-bold text-[#0B2F63] hover:text-[#164082] bg-white border border-slate-300 rounded-xl hover:border-[#38B6FF] transition-all"
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
