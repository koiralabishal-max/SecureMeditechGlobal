import React, { useState } from 'react';
import { OEM_STEPS } from '../data/products';
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
    <section id="oem" className="py-20 bg-white border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#38B6FF] mb-2">
            <span>B2B Contract Manufacturing & OEM / ODM Services</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B2F63] tracking-tight">
            Turnkey Medical Device OEM: From Prototyping to Global Port Clearance
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Partner with an accredited manufacturer capable of delivering custom tooling, ISO 13485 cleanroom injection molding, regulatory technical dossier preparation, and bonded supply chain distribution.
          </p>
        </div>

        {/* Cleanroom Facility Showcase Banner */}
        <div className="relative rounded-2xl overflow-hidden mb-12 border border-slate-200 shadow-lg">
          <img
            src="/assets/images/oem_cleanroom_facility_1792848782226.jpg"
            alt="ISO Class 7 Medical Device Cleanroom Manufacturing Facility"
            className="w-full h-64 sm:h-80 lg:h-96 object-cover"
            loading="lazy"
            decoding="async"
            width={1200}
            height={384}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071E40]/90 via-[#071E40]/60 to-transparent flex items-center">
            <div className="p-6 sm:p-10 max-w-xl text-white space-y-3">
              <span className="bg-[#10B981] text-white text-[11px] font-bold px-2.5 py-1 rounded">
                ISO Class 7 & Class 8 Certified Cleanrooms
              </span>
              <h3 className="text-xl sm:text-2xl font-bold">
                Automated Medical Cleanroom Production Lines
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Operating 24/7 HEPA-filtered cleanrooms equipped with automated multi-cavity injection molding, ultrasonic welding, laser marking, and robotic packaging.
              </p>
              <div className="pt-2">
                <button
                  onClick={onStartOemInquiry}
                  className="px-5 py-2.5 bg-[#38B6FF] hover:bg-[#209ee8] text-white text-xs font-bold rounded-lg shadow transition-colors flex items-center gap-2"
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
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Manufacturing Lifecycle Stages
            </h4>
            {OEM_STEPS.map((item, index) => {
              const isCurrent = activeStep === index;
              return (
                <div
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-[#0B2F63] text-white border-[#0B2F63] shadow-md'
                      : 'bg-[#F8FAFC] hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${
                        isCurrent ? 'bg-[#38B6FF] text-[#071E40]' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {item.step}
                      </div>
                      <div>
                        <div className={`text-xs font-bold leading-tight ${isCurrent ? 'text-white' : 'text-[#0B2F63]'}`}>
                          {item.title}
                        </div>
                        <div className={`text-[11px] ${isCurrent ? 'text-slate-300' : 'text-slate-500'}`}>
                          {item.subtitle}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${isCurrent ? 'text-[#38B6FF]' : 'text-slate-400'}`} />
                  </div>
                </div>
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
                  <span className="text-[10px] font-mono font-bold text-[#38B6FF] uppercase">
                    Stage {OEM_STEPS[activeStep].step} of 04
                  </span>
                  <h3 className="text-lg font-bold text-[#0B2F63]">
                    {OEM_STEPS[activeStep].title}
                  </h3>
                </div>
              </div>
            </div>

            <p className="text-slate-700 text-sm leading-relaxed">
              {OEM_STEPS[activeStep].description}
            </p>

            {/* Deliverables Checklist */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Validated Stage Deliverables & Audit Trails:
              </h5>
              <div className="space-y-2">
                {OEM_STEPS[activeStep].deliverables.map((deliv, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-800 bg-white p-3 rounded-xl border border-slate-200/80">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                    <span className="font-semibold">{deliv}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step Action Callout */}
            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Need proprietary custom branding & sterile blister packaging?
              </span>
              <button
                onClick={onStartOemInquiry}
                className="px-4 py-2 text-xs font-bold text-[#0B2F63] hover:text-[#164082] bg-white border border-slate-300 rounded-lg hover:border-[#38B6FF] transition-all"
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
