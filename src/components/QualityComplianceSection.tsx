import React from 'react';
import { ShieldCheck, CheckCircle2, Award, FileSpreadsheet, Globe, ThermometerSnowflake, Anchor, Plane } from 'lucide-react';
import { GlobalDistributionMap } from './GlobalDistributionMap';

interface QualityComplianceSectionProps {
  onSelectHubForInquiry?: (hubName: string) => void;
}

export const QualityComplianceSection: React.FC<QualityComplianceSectionProps> = ({
  onSelectHubForInquiry
}) => {
  const certificationsList = [
    {
      code: 'ISO 13485:2016',
      title: 'Medical Devices Quality Management System',
      description: 'Comprehensive quality management across all stages of medical device design, manufacturing, sterilization, and traceability.'
    },
    {
      code: 'CE MDR 2017/745',
      title: 'European Medical Device Regulation Compliance',
      description: 'Rigorous notified-body conformity assessment audits covering Class I, Class IIa, and In Vitro Diagnostic (IVD) systems.'
    },
    {
      code: 'ISO 14971:2019',
      title: 'Application of Risk Management to Medical Devices',
      description: 'Lifecycle safety monitoring, clinical evaluation assessment, and post-market clinical follow-up (PMCF).'
    },
    {
      code: 'AQL 0.65 Standard',
      title: 'Multi-Tier Water-Leak & Particulate Inspection',
      description: 'Zero-defect tolerance policy for surgical barrier latex gloves and respiratory fluidic systems.'
    }
  ];

  const logisticsFeatures = [
    {
      icon: <ThermometerSnowflake className="w-5 h-5 text-[#38B6FF]" />,
      title: 'Validated Cold-Chain & Temp Integrity',
      desc: 'Active 2°C–8°C and -20°C temperature monitoring dataloggers installed in every IVD reagent consignment.'
    },
    {
      icon: <Plane className="w-5 h-5 text-[#10B981]" />,
      title: 'Priority Air Freight Dispatch',
      desc: 'Daily departures from international hubs with direct customs bonded transit to 65+ countries.'
    },
    {
      icon: <Anchor className="w-5 h-5 text-[#38B6FF]" />,
      title: 'Containerized Ocean Freight',
      desc: 'Full Container Load (FCL) and Less than Container Load (LCL) palletized shipping with moisture barrier wrapping.'
    },
    {
      icon: <FileSpreadsheet className="w-5 h-5 text-[#10B981]" />,
      title: 'Turnkey Commercial Documentation',
      desc: 'Complete issuance of Certificate of Origin (COO), Certificate of Free Sale (CFS), and Fumigation certificates.'
    }
  ];

  return (
    <section id="compliance" className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#38B6FF] mb-2">
            <Award className="w-4 h-4" />
            <span>International Regulatory Rigor</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B2F63] tracking-tight">
            Quality Assurance & Global Regulatory Compliance
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Secure MediTech Global adheres to world-class manufacturing, clinical safety, and documentation standards to ensure effortless hospital procurement and regulatory clearance.
          </p>
        </div>

        {/* 4-Column Certification Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificationsList.map((cert, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs hover:border-[#38B6FF]/60 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-[#0B2F63] border border-blue-100">
                    {cert.code}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                </div>
                <h4 className="text-sm font-bold text-[#0B2F63] leading-snug">
                  {cert.title}
                </h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {cert.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Audited & Validated</span>
              </div>
            </div>
          ))}
        </div>

        {/* Global Logistics Architecture Sub-Section */}
        <div className="bg-[#0B2F63] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#38B6FF]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl mb-10">
            <div className="flex items-center gap-2 text-xs font-bold text-[#38B6FF] tracking-wider uppercase mb-2">
              <Globe className="w-4 h-4" />
              <span>International Medical Supply & Logistics Network</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-extrabold text-white">
              Direct Hospital Distribution Across Nepal, Kenya, Rwanda, South Africa, Nigeria, India & 65+ Global Markets
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              From our global gateways and African/South Asian transit corridors, we supply tertiary hospitals and ministries of health with active 2°C–8°C cold-chain verification, customs pre-clearance (SAHPRA, Kenya PPB, Rwanda FDA, NAFDAC, CDSCO, Nepal DDA), and guaranteed 24–48 hour priority air dispatch.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {logisticsFeatures.map((item, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-xs p-5 rounded-xl border border-white/15">
                <div className="p-2 bg-white/10 rounded-lg w-fit mb-3">
                  {item.icon}
                </div>
                <h4 className="text-sm font-bold text-white mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* Interactive D3 Global Distribution Map */}
        <div id="distribution-map" className="scroll-mt-24">
          <GlobalDistributionMap onSelectHubForInquiry={onSelectHubForInquiry} />
        </div>

      </div>
    </section>
  );
};

