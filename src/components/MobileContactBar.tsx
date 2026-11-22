'use client';

import React from 'react';
import { FileText, MessageSquare, Phone } from 'lucide-react';
import { trackBulkQuoteRequest, trackWhatsAppInquiry } from '@/lib/analytics';

interface MobileContactBarProps {
  onOpenQuote: () => void;
}

export function MobileContactBar({ onOpenQuote }: MobileContactBarProps) {
  return (
    <div
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#19293F]/95 backdrop-blur-md border-t border-slate-700/80 px-3 py-2 shadow-xl"
      role="region"
      aria-label="Quick procurement contact bar"
    >
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        <a
          href="tel:+13075334504"
          className="h-10 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center justify-center gap-1.5 border border-white/15 transition-colors"
        >
          <Phone className="w-3.5 h-3.5 text-[#8CB3D4]" />
          <span>Call Desk</span>
        </a>

        <a
          href="https://wa.me/13075334504?text=Hello%20Secure%20MediTech%20Global%2C%20I%20would%20like%20to%20request%20wholesale%20medical%20supply%20pricing."
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppInquiry({ source: 'mobile_sticky_bar' })}
          className="h-10 rounded-xl bg-[#3F7D6B] hover:bg-[#336859] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>

        <button
          type="button"
          onClick={() => {
            trackBulkQuoteRequest({ stage: 'open' });
            onOpenQuote();
          }}
          className="h-10 rounded-xl bg-[#DCE7F2] hover:bg-[#CBDCEB] text-[#19293F] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Quick RFQ</span>
        </button>
      </div>
    </div>
  );
}
