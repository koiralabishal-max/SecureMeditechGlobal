'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Factory,
  Globe2,
  ShieldCheck,
} from 'lucide-react';
import { SectionHeader } from './SectionHeader';

interface HomeCapabilitiesOverviewProps {
  onStartOemInquiry: () => void;
}

const COMPLIANCE_BADGES = [
  { code: 'ISO 13485:2016', label: 'Medical QMS Certified' },
  { code: 'CE MDR 2017/745', label: 'Notified Body Audited' },
  { code: 'ISO 14971:2019', label: 'Lifecycle Risk Control' },
  { code: 'AQL 0.65 & SAL 10⁻⁶', label: 'EtO & Gamma Validated' },
];

export const HomeCapabilitiesOverview: React.FC<HomeCapabilitiesOverviewProps> = ({
  onStartOemInquiry,
}) => {
  return (
    <section
      id="capabilities"
      className="py-14 sm:py-16 bg-white border-y border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <SectionHeader
            eyebrow="OEM Manufacturing & Global Compliance"
            icon={<Award />}
            title="Cleanroom Production & International Logistics"
            description="Turnkey contract manufacturing, ISO 13485 quality governance, and export documentation across 65+ healthcare markets."
          />
          <Link
            href="/about"
            className="text-sm font-bold text-[#3B6B91] hover:text-[#223752] hover:underline inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap"
          >
            <span>Quality &amp; Facility Overview</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Card: OEM & Private Label Manufacturing */}
          <div className="lg:col-span-7 bg-[#F7F8FA] rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between">
            <div className="relative h-52 sm:h-56 overflow-hidden">
              <Image
                src="/assets/webp/oem_cleanroom_facility_1792848782226.webp"
                alt="ISO Class 7 medical device cleanroom manufacturing and automated injection molding facility"
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 700px"
                width={1000}
                height={520}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#19293F]/85 via-[#19293F]/30 to-transparent flex items-end p-5">
                <div className="text-white">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#8CB3D4]">
                    ISO Class 7 &amp; Class 8 Cleanrooms
                  </div>
                  <h3 className="text-xl font-bold tracking-tight mt-0.5">
                    OEM Contract Manufacturing &amp; Private Label
                  </h3>
                </div>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between gap-5">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#3F7D6B] shrink-0 mt-0.5" />
                  <span>DFM tooling &amp; medical polymer molding</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#3F7D6B] shrink-0 mt-0.5" />
                  <span>Private-label packaging from 500 units</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#3F7D6B] shrink-0 mt-0.5" />
                  <span>CE MDR technical files &amp; CoA dossiers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#3F7D6B] shrink-0 mt-0.5" />
                  <span>24–48h priority air &amp; ocean FCL/LCL</span>
                </li>
              </ul>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onStartOemInquiry}
                  className="h-10 px-4 bg-[#223752] hover:bg-[#2E496B] text-white text-sm font-bold rounded-xl transition-colors inline-flex items-center gap-2 whitespace-nowrap"
                >
                  <Factory className="w-4 h-4 text-[#8CB3D4]" />
                  <span>Request OEM Quote</span>
                </button>
                <Link
                  href="/oem-manufacturing"
                  className="h-10 px-4 bg-white hover:bg-slate-100 text-[#223752] border border-slate-200 text-sm font-semibold rounded-xl transition-colors inline-flex items-center gap-1.5 whitespace-nowrap"
                >
                  <span>OEM Workflow &amp; MOQs</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Card: Global Regulatory Compliance & Logistics Corridors */}
          <div className="lg:col-span-5 bg-[#223752] text-white rounded-2xl p-6 sm:p-7 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8CB3D4]">
                <Globe2 className="w-4 h-4" />
                <span>65+ Countries · Pre-Cleared Freight</span>
              </div>
              <h3 className="text-xl font-extrabold tracking-tight leading-snug">
                Verified Quality &amp; Global Export Corridors
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Complete customs clearance packets (COO, FSC, CoA, Sterilization Logs) supporting hospital procurement across South Asia, East &amp; West Africa, Europe, and North America.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {COMPLIANCE_BADGES.map((item) => (
                  <div
                    key={item.code}
                    className="p-3 rounded-xl bg-white/[0.06] border border-white/10"
                  >
                    <div className="text-xs font-bold text-[#DCE7F2] flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#7DB5A4] shrink-0" />
                      <span>{item.code}</span>
                    </div>
                    <div className="text-xs text-slate-300 mt-0.5">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <Link
                href="/markets#distribution-map"
                className="h-10 px-4 bg-[#DCE7F2] hover:bg-[#CBDCEB] text-[#19293F] text-sm font-bold rounded-xl transition-colors inline-flex items-center gap-2 whitespace-nowrap"
              >
                <span>Explore Export Map &amp; Corridors</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services"
                className="text-sm font-semibold text-[#8CB3D4] hover:underline whitespace-nowrap"
              >
                Regulatory Services →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
