import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Target, 
  Compass, 
  Award, 
  CheckCircle2, 
  Clock, 
  Building2, 
  Globe2, 
  HeartHandshake, 
  Microscope,
  FileText,
  ArrowRight
} from 'lucide-react';

interface AboutPageProps {
  onOpenRfq: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenRfq }) => {
  return (
    <div className="space-y-16 sm:space-y-20 pb-16">
      
      {/* 1. Page Header */}
      <div className="bg-[#0B2F63] text-white py-14 sm:py-18 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#38B6FF]">
              <Building2 className="w-4 h-4" />
              <span>Corporate Profile & History</span>
            </div>
            <h1 className="text-3xl sm:text-4.5xl font-extrabold tracking-tight text-white">
              About Secure MediTech Global
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              A trusted international manufacturer and global healthcare solutions provider dedicated to zero-defect medical consumables, sterile cleanroom engineering, and resilient hospital supply chains.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Company Introduction & Background */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="text-xs font-bold uppercase tracking-wider text-[#38B6FF]">
              Our Background & History
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2F63] tracking-tight">
              From Precision Molding to a Multinational Medical Supply Chain
            </h2>
            <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
              <p>
                Founded to bridge the critical gap between precision biomedical manufacturing and frontline hospital delivery, <strong>Secure MediTech Global</strong> has grown into an international medical device manufacturing and procurement partner serving hospitals, national health ministries, and commercial distributors.
              </p>
              <p>
                Registered in Wyoming, USA, with dedicated ISO Class 7 and Class 8 cleanroom facilities and regional forward hubs across South Asia (Nepal, India) and Africa (Kenya, Rwanda, South Africa, Nigeria), we specialize in critical care catheter kits, anesthesia airway tubes, renal dialysis lines, and surgical barrier consumables.
              </p>
              <p>
                Every product bearing our lot number is produced in audited cleanrooms, subjected to 100% pinhole and bioburden testing, and backed by verifiable CE MDR and ISO 13485:2016 technical documentation.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="text-lg font-bold font-mono text-[#0B2F63]">ISO 13485</div>
                <div className="text-[11px] text-slate-500">Certified QMS Scope</div>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="text-lg font-bold font-mono text-[#0B2F63]">CE 0123</div>
                <div className="text-[11px] text-slate-500">Notified Body Audited</div>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="text-lg font-bold font-mono text-[#0B2F63]">Class 7 / 8</div>
                <div className="text-[11px] text-slate-500">Certified Cleanrooms</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md aspect-4/3 relative group">
              <img
                src="/assets/images/oem_cleanroom_facility_1792848782226.jpg"
                alt="Secure MediTech Global Cleanroom Manufacturing"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071E40]/80 via-transparent to-transparent flex items-end p-5">
                <div className="text-white text-xs">
                  <div className="font-bold">Automated Cleanroom Extrusion Suite</div>
                  <div className="text-slate-300 text-[11px]">ISO 14644-1 Compliant Medical Polymer Fabrication</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Vision & Mission */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Vision */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-2xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0B2F63] flex items-center justify-center">
                <Compass className="w-6 h-6 text-[#38B6FF]" />
              </div>
              <h3 className="text-xl font-bold text-[#0B2F63]">Our Vision</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                To be the world’s most dependable, clinically trusted medical consumable and healthcare manufacturing partner—ensuring that hospitals, clinics, and surgical centers in every corner of the globe have immediate, uninterrupted access to sterile, precision-engineered medical supplies.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-2xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0B2F63] flex items-center justify-center">
                <Target className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold text-[#0B2F63]">Our Mission</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                To engineer zero-defect medical devices that empower clinicians and safeguard patients. We achieve this through relentless cleanroom quality control, ISO 13485 standard adherence, localized forward warehouse networks, and honest, competitive wholesale pricing.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Core Values & Objectives */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-[#38B6FF]">
            Ethos & Principles
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2F63] tracking-tight mt-1">
            Core Values & Company Objectives
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            The foundation behind every catheter, syringe, glove, and surgical pack we ship.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Clinical Precision',
              desc: 'We treat every disposable line as life-critical. Our components feature 100% optical dimension verification and pressure decay leak audits.',
              icon: Microscope
            },
            {
              title: 'Regulatory Transparency',
              desc: 'Full batch traceability from raw polymer pellet to master carton, complete with Certificates of Analysis and verifiable CE conformity.',
              icon: ShieldCheck
            },
            {
              title: 'Supply Chain Resilience',
              desc: 'Eliminating stockout vulnerabilities through strategic bonded buffer reserves in Nairobi, Kigali, Kathmandu, and Johannesburg.',
              icon: Globe2
            },
            {
              title: 'Institutional Integrity',
              desc: 'Transparent pricing, firm contract delivery timelines, and direct engineering access for custom OEM private labeling clients.',
              icon: HeartHandshake
            }
          ].map((val, i) => {
            const Icon = val.icon;
            return (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#0B2F63]">
                  <Icon className="w-5 h-5 text-[#38B6FF]" />
                </div>
                <h4 className="text-base font-bold text-slate-900">{val.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{val.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Why Choose Us? */}
      <section className="bg-gradient-to-b from-[#0B2F63] to-[#071E40] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-[#38B6FF]">
              Competitive Advantage
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              Why Global Hospital Networks Choose Secure MediTech
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Engineered to meet the procurement demands of premier health systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 space-y-3">
              <div className="text-2xl font-bold font-mono text-[#38B6FF]">01</div>
              <h4 className="text-base font-bold text-white">Direct Factory Wholesaler</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                By eliminating tertiary trading layers, hospital networks save 25% to 40% on recurring clinical consumable budgets while enjoying direct technical support.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 space-y-3">
              <div className="text-2xl font-bold font-mono text-emerald-400">02</div>
              <h4 className="text-base font-bold text-white">Rapid Emergency Stocking</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Standard warehouse consignments ship within 3–5 business days, with our 24-to-48-hour trauma emergency air freight response protocol for acute shortages.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 space-y-3">
              <div className="text-2xl font-bold font-mono text-[#38B6FF]">03</div>
              <h4 className="text-base font-bold text-white">Turnkey OEM Flexibility</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                From proprietary brand packaging to custom length catheters and custom procedure packs, our engineering team accommodates MOQs from just 2,500 units.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Company Achievements & Milestones Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-[#38B6FF]">
            Track Record
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2F63] tracking-tight mt-1">
            Company Milestones & Growth
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            A decade of deliberate clinical expansion and regulatory accreditations.
          </p>
        </div>

        <div className="relative border-l-2 border-slate-200 ml-4 md:ml-32 space-y-10 pl-6 sm:pl-8">
          {[
            {
              year: '2012',
              title: 'Inception of Medical Cleanroom Molding Operations',
              desc: 'Established precision medical grade polymer injection molding and catheter extrusion cleanrooms certified to ISO 13485.'
            },
            {
              year: '2016',
              title: 'European CE 0123 Notified Body Accreditation',
              desc: 'Received CE Mark approval for Class IIa/IIb cardiovascular and airway product lines under TÜV SÜD audit.'
            },
            {
              year: '2020',
              title: 'Emergency ICU Resuscitation Response Network',
              desc: 'Supplied over 15 million sterile airway and suction consumables during international pandemic supply disruptions.'
            },
            {
              year: '2023',
              title: 'East & Southern Africa Distribution Hub Expansion',
              desc: 'Inaugurated dedicated bonded fulfillment hubs in Nairobi, Kigali, and Johannesburg for fast regional hospital replenishment.'
            },
            {
              year: '2026',
              title: 'EU MDR 2017/745 Recertification & Digital Procurement Portal',
              desc: 'Successfully migrated full product line technical files to MDR Class IIa/IIb/III and deployed instant algorithmic B2B quotation services.'
            }
          ].map((item, idx) => (
            <div key={idx} className="relative group">
              <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-[#0B2F63] group-hover:border-[#38B6FF] transition-colors" />
              <div className="inline-block px-2.5 py-0.5 rounded bg-blue-50 text-[#0B2F63] text-xs font-bold font-mono mb-1">
                {item.year}
              </div>
              <h4 className="text-base font-bold text-slate-900">{item.title}</h4>
              <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Action CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white">Partner with Secure MediTech Global</h3>
            <p className="text-xs text-slate-300 mt-1">
              Explore our catalogue or submit custom technical specifications for OEM contract manufacturing.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenRfq}
              className="px-5 py-2.5 bg-[#38B6FF] hover:bg-[#209ee8] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Request a Quotation
            </button>
            <Link
              to="/products"
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
