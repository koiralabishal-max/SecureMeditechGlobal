'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Calculator,
  FileText,
  HelpCircle,
  Mail,
  MessageSquare,
  PhoneCall,
} from 'lucide-react';
import { trackBulkQuoteRequest, trackWhatsAppInquiry } from '@/lib/analytics';

interface HomeProcurementCtaProps {
  onOpenRfq: () => void;
}

export const HomeProcurementCta: React.FC<HomeProcurementCtaProps> = ({
  onOpenRfq,
}) => {
  return (
    <section
      id="contact"
      className="py-14 sm:py-16 bg-[#F7F8FA] border-t border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#223752] text-white rounded-3xl p-6 sm:p-10 shadow-lg flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8CB3D4]">
              Direct Procurement &amp; Logistics Support
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
              Ready for Bulk Hospital Pricing, Sample Kits, or OEM Runs?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Submit your SKUs and destination port for a 12-hour formal proforma invoice under EXW, FOB, CIF, or DDP Incoterms, or estimate order budgets online.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-slate-300">
              <a
                href="tel:+13075334504"
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors font-medium"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#8CB3D4]" />
                <span>+1 (307) 533-4504</span>
              </a>
              <a
                href="mailto:info@securemeditechglobal.com"
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors font-medium"
              >
                <Mail className="w-3.5 h-3.5 text-[#8CB3D4]" />
                <span>info@securemeditechglobal.com</span>
              </a>
              <a
                href="https://wa.me/13075334504"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppInquiry({ source: 'home_cta_strip' })}
                className="inline-flex items-center gap-1.5 text-[#9DC5B8] hover:text-white transition-colors font-semibold"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Desk</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 shrink-0 lg:w-[26rem]">
            <button
              type="button"
              onClick={() => {
                trackBulkQuoteRequest({ stage: 'open' });
                onOpenRfq();
              }}
              className="h-12 px-5 bg-[#DCE7F2] hover:bg-[#CBDCEB] text-[#19293F] text-sm font-bold rounded-xl transition-colors inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Request Bulk Quote</span>
            </button>

            <Link
              href="/price-calculator"
              className="h-12 px-5 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-sm font-semibold rounded-xl transition-colors inline-flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Calculator className="w-4 h-4 text-[#8CB3D4]" />
              <span>Price Estimator</span>
            </Link>

            <Link
              href="/faq"
              className="h-12 px-5 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-sm font-semibold rounded-xl transition-colors inline-flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <HelpCircle className="w-4 h-4 text-[#8CB3D4]" />
              <span>Procurement FAQ</span>
            </Link>

            <Link
              href="/contact"
              className="h-12 px-5 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-sm font-semibold rounded-xl transition-colors inline-flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <span>Contact Form</span>
              <ArrowRight className="w-4 h-4 text-[#8CB3D4]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
