'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Plus, Search, X } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { useRfq } from './RfqContext';
import { trackBulkQuoteRequest } from '@/lib/analytics';

export function CatalogQuickSearch() {
  const [query, setQuery] = useState('');
  const rfq = useRfq();

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.certifications.some((c) => c.toLowerCase().includes(q)) ||
        (p.sizes && p.sizes.some((s) => s.toLowerCase().includes(q)))
    ).slice(0, 8);
  }, [query]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="relative flex-1">
          <label htmlFor="products-page-search" className="sr-only">
            Search all 18 wholesale medical products by SKU, name, size, or certification
          </label>
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="products-page-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Quick-filter by SKU (e.g. SMT-CVP-01), device name, French gauge, or CE/ISO..."
            className="w-full h-11 pl-10 pr-10 text-sm bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#5C89AD] focus:ring-2 focus:ring-[#5C89AD]/20 rounded-xl outline-none text-slate-800"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear product search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => {
            trackBulkQuoteRequest({ stage: 'open' });
            rfq?.openRfqModal();
          }}
          className="h-11 px-5 bg-[#223752] hover:bg-[#2E496B] text-white text-sm font-extrabold rounded-xl transition-colors inline-flex items-center justify-center gap-2 shrink-0"
        >
          <span>Open Multi-SKU RFQ Form</span>
          <ArrowRight className="w-4 h-4 text-[#8CB3D4]" />
        </button>
      </div>

      {query.trim().length > 0 && (
        <div className="pt-2 border-t border-slate-100">
          {matches.length === 0 ? (
            <p className="text-sm text-slate-500 py-2">
              No matching medical SKUs found for &ldquo;{query}&rdquo;. Try &ldquo;Catheter&rdquo;, &ldquo;Gloves&rdquo;, &ldquo;Cannula&rdquo;, or &ldquo;Analyzer&rdquo;.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {matches.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <span className="font-mono text-[11px] text-slate-500">{item.sku}</span>
                    <Link
                      href={`/products/${item.id}`}
                      className="block text-sm font-bold text-[#223752] hover:underline truncate"
                    >
                      {item.name}
                    </Link>
                    <span className="text-xs text-slate-500">MOQ: {item.minOrderQty}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => rfq?.openRfqModal({ product: item, quantity: 500 })}
                    className="h-9 px-3 rounded-lg bg-[#223752] hover:bg-[#2E496B] text-white text-xs font-bold inline-flex items-center gap-1 shrink-0 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#8CB3D4]" />
                    <span>Quote</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
