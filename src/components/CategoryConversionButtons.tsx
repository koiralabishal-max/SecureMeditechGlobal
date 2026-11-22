'use client';

import React from 'react';
import { ArrowRight, Factory, MessageSquare } from 'lucide-react';
import { useRfq } from './RfqContext';
import { trackBulkQuoteRequest, trackOemInquiry, trackWhatsAppInquiry } from '@/lib/analytics';

interface CategoryConversionButtonsProps {
  primaryLabel: string;
  whatsAppLabel: string;
  whatsAppUrl: string;
  source: string;
  isOem?: boolean;
  country?: string;
}

export function CategoryConversionButtons({
  primaryLabel,
  whatsAppLabel,
  whatsAppUrl,
  source,
  isOem = false,
  country,
}: CategoryConversionButtonsProps) {
  const rfq = useRfq();

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={() => {
          if (isOem) {
            trackOemInquiry({ source });
          } else {
            trackBulkQuoteRequest({ stage: 'open', country });
          }
          rfq?.openRfqModal({ isOem, defaultCountry: country });
        }}
        className="h-11 px-5 bg-[#DCE7F2] hover:bg-[#CBDCEB] text-[#19293F] text-sm font-extrabold rounded-xl transition-colors inline-flex items-center gap-2 shadow-sm"
      >
        {isOem && <Factory className="w-4 h-4" />}
        <span>{primaryLabel}</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      <a
        href={whatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppInquiry({ source, country })}
        className="h-11 px-5 bg-white/10 hover:bg-white/15 text-white border border-white/20 text-sm font-semibold rounded-xl transition-colors inline-flex items-center gap-2"
      >
        <MessageSquare className="w-4 h-4 text-[#7DB5A4]" />
        <span>{whatsAppLabel}</span>
      </a>
    </div>
  );
}
