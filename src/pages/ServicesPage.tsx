import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Factory, 
  PenTool, 
  Truck, 
  Building2, 
  Wrench, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  FileText,
  PhoneCall
} from 'lucide-react';
import { SERVICES, MedicalService } from '../data/services';

interface ServicesPageProps {
  onOpenRfq: () => void;
}

const getServiceIcon = (iconName: string) => {
  switch (iconName) {
    case 'Factory':
      return <Factory className="w-6 h-6 text-[#38B6FF]" />;
    case 'PenTool':
      return <PenTool className="w-6 h-6 text-[#38B6FF]" />;
    case 'Truck':
      return <Truck className="w-6 h-6 text-[#38B6FF]" />;
    case 'Building2':
      return <Building2 className="w-6 h-6 text-[#38B6FF]" />;
    case 'Wrench':
      return <Wrench className="w-6 h-6 text-[#38B6FF]" />;
    case 'ShieldCheck':
    default:
      return <ShieldCheck className="w-6 h-6 text-[#38B6FF]" />;
  }
};

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenRfq }) => {
  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. Page Header */}
      <div className="bg-[#0B2F63] text-white py-14 sm:py-18 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#38B6FF]">
              <Factory className="w-4 h-4" />
              <span>Full-Stack Medical Manufacturing & Logistics</span>
            </div>
            <h1 className="text-3xl sm:text-4.5xl font-extrabold tracking-tight text-white">
              Healthcare & Medical Equipment Services
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              From ISO Class 7 cleanroom molding and custom CAD tooling to international cold-chain freight forward and biomedical calibration, we deliver end-to-end clinical solutions.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Services List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {SERVICES.map((service, index) => {
          const isEven = index % 2 === 1;

          return (
            <div 
              key={service.id}
              id={service.slug}
              className="scroll-mt-28 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10">
                
                {/* Content Column */}
                <div className={`lg:col-span-7 space-y-5 ${isEven ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                      {getServiceIcon(service.iconName)}
                    </div>
                    <div>
                      <div className="text-[11px] font-mono text-[#38B6FF] font-bold">
                        SERVICE 0{index + 1}
                      </div>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B2F63] leading-snug">
                        {service.title}
                      </h2>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {service.fullDescription}
                  </p>

                  {/* Capabilities List */}
                  <div className="space-y-2 pt-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Technical Capabilities:
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {service.capabilities.map((cap, i) => (
                        <div key={i} className="text-xs text-slate-600 flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200/60">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Benefits */}
                  <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B2F63]">
                      Institutional Solutions & Benefits:
                    </h3>
                    <div className="space-y-1 text-xs text-slate-700">
                      {service.keyBenefits.map((ben, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-[#38B6FF] font-bold">✓</span>
                          <span>{ben}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Standards & Audience */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 border-t border-slate-100">
                    <div>
                      <span className="text-slate-400">Audited Standards: </span>
                      <strong className="text-slate-700 font-mono">{service.standards.join(' · ')}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400">Target: </span>
                      <strong className="text-slate-700">{service.targetAudience}</strong>
                    </div>
                  </div>

                  {/* Inquiry Button */}
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={onOpenRfq}
                      className="px-5 py-2.5 bg-[#0B2F63] hover:bg-[#124185] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-[#38B6FF]" />
                      <span>Inquire About This Service</span>
                    </button>
                    <Link
                      to="/contact"
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
                    >
                      Contact Team
                    </Link>
                  </div>
                </div>

                {/* Visual Image Column */}
                <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : ''}`}>
                  <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm aspect-4/3 relative group">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071E40]/70 via-transparent to-transparent flex items-end p-4">
                      <div className="text-white text-xs font-semibold">
                        {service.title}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Global Inquiry CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#0B2F63] to-[#071E40] text-white p-8 sm:p-12 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-bold text-white">Have a Custom Medical Device or OEM Requirement?</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Our biomedical engineering and global freight specialists are ready to review your technical drawings and provide a turnkey quotation within 24 hours.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenRfq}
              className="px-6 py-3 bg-[#38B6FF] hover:bg-[#209ee8] text-white text-xs font-bold rounded-xl transition-colors shadow-md cursor-pointer"
            >
              Submit Technical Brief
            </button>
            <a
              href="tel:+13075334504"
              className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold border border-white/20 transition-colors"
            >
              Call +1 (307) 533-4504
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
