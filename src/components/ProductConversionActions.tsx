'use client';

import React from 'react';
import { Factory, FileText, MessageSquare, ShieldCheck } from 'lucide-react';
import { Product } from '@/types';
import { useRfq } from './RfqContext';
import { trackBulkQuoteRequest, trackOemInquiry, trackWhatsAppInquiry } from '@/lib/analytics';

function parseDefaultQuantity(minOrderQty: string): number {
  const numeric = Number((minOrderQty || '').replace(/[^0-9]/g, ''));
  return numeric >= 1 ? Math.min(numeric, 100000) : 500;
}

export function ProductConversionActions({ product }: { product: Product }) {
  const rfq = useRfq();
  const defaultQty = parseDefaultQuantity(product.minOrderQty);

  const whatsAppUrl = `https://wa.me/13075334504?text=${encodeURIComponent(
    `Hello Secure MediTech Global, I am inquiring about specifications, sizes, and bulk pricing for ${product.name} (SKU: ${product.sku}).`
  )}`;

  const handleBulkRfq = () => {
    trackBulkQuoteRequest({
      stage: 'open',
      sku: product.sku,
      productName: product.name,
      itemCount: 1,
      totalUnits: defaultQty,
    });
    rfq?.openRfqModal({ product, quantity: defaultQty });
  };

  const handleOemRfq = () => {
    trackOemInquiry({
      source: 'product_detail_oem_cta',
      productName: product.name,
    });
    rfq?.openRfqModal({
      product,
      quantity: Math.max(defaultQty, 1000),
      isOem: true,
    });
  };

  return (
    <div className="pt-4 border-t border-slate-100 space-y-4">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#2F6153] bg-[#EFF5F3] border border-[#D3E3DD] rounded-xl px-4 py-2.5">
        <span className="inline-flex items-center gap-1.5 font-semibold">
          <ShieldCheck className="w-4 h-4 text-[#3F7D6B] shrink-0" />
          <span>ISO 13485:2016 Audited</span>
        </span>
        <span className="text-[#3A6F60] font-medium">
          Batch CoA &amp; Certificate of Origin Included
        </span>
        <span className="text-[#3A6F60] font-medium">12-Hour Pro-Forma SLA</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={handleBulkRfq}
          className="flex-1 h-12 px-5 bg-[#356386] hover:bg-[#2A5170] text-white text-sm font-bold rounded-xl shadow-2xs transition-colors inline-flex items-center justify-center gap-2"
        >
          <FileText className="w-4 h-4" />
          <span>Request Bulk Quote ({product.sku})</span>
        </button>

        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackWhatsAppInquiry({
              source: 'product_detail_page',
              sku: product.sku,
              productName: product.name,
              category: product.category,
            })
          }
          className="flex-1 h-12 px-5 bg-[#3F7D6B] hover:bg-[#336859] text-white text-sm font-bold rounded-xl transition-colors inline-flex items-center justify-center gap-2"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Enquire via WhatsApp Desk</span>
        </a>
      </div>

      <button
        type="button"
        onClick={handleOemRfq}
        className="w-full h-11 px-4 bg-[#223752]/5 hover:bg-[#223752] text-[#223752] hover:text-white border border-[#223752]/20 text-xs sm:text-sm font-bold rounded-xl transition-colors inline-flex items-center justify-center gap-2"
      >
        <Factory className="w-4 h-4 text-[#3B6B91]" />
        <span>Request Private-Label / OEM Custom Production for {product.sku}</span>
      </button>
    </div>
  );
}
