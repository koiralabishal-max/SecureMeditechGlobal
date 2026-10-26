import React from 'react';
import { Building2, Stethoscope, Briefcase, ThumbsUp } from 'lucide-react';

export const SocialProof: React.FC = () => {
  const testimonials = [
    {
      quote: "Secure MediTech Global replaced our critical anesthesia consumables supply during severe global stock-outs. The 3-ball spirometers and video laryngoscopes exceeded our hospital clinical benchmarks while reducing supply friction.",
      author: "Dr. Marianne Vance, MD",
      role: "Head of Anesthesiology & Surgical Logistics",
      institution: "Metropolitan Academic Health Network (EU)",
      outcome: "Zero clinical delays across 14,000 surgical procedures in 2025"
    },
    {
      quote: "As an authorized national distributor, having predictable lead times and CE MDR dossiers ready for ministry inspection is paramount. Secure MediTech's batch testing and AQL 0.65 surgical gloves have been flawless.",
      author: "Julian Reynolds",
      role: "VP of Medical Distribution & Procurement",
      institution: "Apex BioHealth Distribution Group (North America)",
      outcome: "+42% year-over-year fulfillment stability with under 48h dispatch"
    },
    {
      quote: "We partnered with Secure MediTech for OEM contract assembly of our pediatric infusion consumables. Their ISO Class 7 cleanrooms and bioburden validation made regulatory filing seamless.",
      author: "Elena Rostova",
      role: "Director of Biomedical Engineering & OEM Products",
      institution: "InnoVance Diagnostics & Medical Systems (APAC)",
      outcome: "CE IVD clearance approved within 4 months with full technical dossier"
    }
  ];

  return (
    <section className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#38B6FF] mb-2">
              <Building2 className="w-4 h-4" />
              <span>Institutional Trust & Case Proof</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B2F63] tracking-tight">
              Trusted by Leading Hospital Networks & Global Distributors
            </h2>
          </div>

          {/* Social Proof Facebook Callout */}
          <div className="flex items-center gap-3 bg-[#F8FAFC] border border-slate-200 px-4 py-3 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-[#1877F2]/10 text-[#1877F2] flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>
            <div className="text-xs">
              <div className="font-bold text-slate-800 flex items-center gap-1.5">
                <span>Follow Secure MediTech Global</span>
                <ThumbsUp className="w-3.5 h-3.5 text-[#1877F2]" />
              </div>
              <a
                href="https://www.facebook.com/profile.php?id=61591817960540"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#38B6FF] hover:underline font-semibold"
              >
                Join our Facebook Community →
              </a>
            </div>
          </div>
        </div>

        {/* Testimonials 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-[#F8FAFC] p-6 sm:p-7 rounded-2xl border border-slate-200/90 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                {/* Clean quote mark */}
                <div className="text-3xl font-serif text-[#38B6FF] leading-none mb-3">“</div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
                  {t.quote}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 space-y-2">
                <div>
                  <h4 className="text-xs font-bold text-[#0B2F63] flex items-center gap-1.5">
                    {idx === 0 ? <Stethoscope className="w-3.5 h-3.5 text-[#38B6FF]" /> : <Briefcase className="w-3.5 h-3.5 text-[#38B6FF]" />}
                    <span>{t.author}</span>
                  </h4>
                  <div className="text-[11px] text-slate-500 font-medium">{t.role}</div>
                  <div className="text-[11px] text-slate-400">{t.institution}</div>
                </div>

                <div className="mt-2 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-100">
                  Impact: {t.outcome}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
