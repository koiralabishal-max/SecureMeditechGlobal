'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Product, ProductCategory } from '../types';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { SectionHeader } from './SectionHeader';
import { toCategorySlug } from '../lib/site';
import { Search, Layers, ArrowRight } from 'lucide-react';

interface ProductCatalogProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  onAddToQuote: (product: Product) => void;
  onOpenSpecSheet: (product: Product) => void;
  onOpenDetails: (product: Product) => void;
  quoteItemIds: string[];
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  selectedCategory,
  onSelectCategory,
  onAddToQuote,
  onOpenSpecSheet,
  onOpenDetails,
  quoteItemIds
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs: ProductCategory[] = [
    'All',
    'Critical Care & Monitoring',
    'Anesthesia & Airway Management',
    'IV & Infusion Supplies',
    'Respiratory Care',
    'Urology & Catheters',
    'Dialysis Supplies',
    'Surgical & OT Supplies',
    'Laboratory & Diagnostics'
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesSearch =
        item.name.toLowerCase().includes(query) ||
        item.sku.toLowerCase().includes(query) ||
        item.tagline.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        (item.sizes && item.sizes.some(s => s.toLowerCase().includes(query)));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="products" className="py-20 sm:py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <SectionHeader
            eyebrow="Wholesale Medical & Surgical Supplies"
            icon={<Layers />}
            title="Hospital Supplies & Medical Consumables Catalog"
            description="Factory-direct CVP kits, pressure monitoring transducers, endotracheal tubes, IV cannulas, closed suction systems, Foley & dialysis catheters, surgical OT packs, and diagnostic analyzers."
          />

          {/* Search Box */}
          <div className="relative w-full lg:w-80 shrink-0">
            <label htmlFor="catalog-search" className="sr-only">Search products</label>
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="catalog-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by SKU or product..."
              className="w-full h-12 pl-10 pr-16 bg-white text-base sm:text-sm text-slate-800 placeholder-slate-400 rounded-xl border border-slate-200 focus:outline-none focus:border-[#38B6FF] focus:ring-2 focus:ring-[#38B6FF]/20 transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500 hover:text-slate-700"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Tabs & Segmented Bar */}
        <div className="-mx-4 px-4 sm:mx-0 sm:px-0 mb-10 overflow-x-auto no-scrollbar">
          <div className="flex sm:flex-wrap gap-2 w-max sm:w-auto" role="tablist" aria-label="Product categories">
            {filterTabs.map((tab) => {
              const isActive = selectedCategory === tab;
              const count = tab === 'All' 
                ? PRODUCTS.length 
                : PRODUCTS.filter((p) => p.category === tab).length;

              return (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onSelectCategory(tab)}
                  className={`h-10 px-4 rounded-full text-sm font-semibold transition-colors whitespace-nowrap inline-flex items-center gap-2 border ${
                    isActive
                      ? 'bg-[#0B2F63] border-[#0B2F63] text-white shadow-sm'
                      : 'bg-white border-slate-200 text-slate-600 hover:text-[#0B2F63] hover:border-slate-300'
                  }`}
                >
                  <span>{tab === 'All' ? 'All Products' : tab}</span>
                  <span className={`text-xs min-w-5 px-1.5 rounded-full tabular-nums ${
                    isActive ? 'bg-[#38B6FF] text-[#071E40]' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToQuote={onAddToQuote}
                onOpenSpecSheet={onOpenSpecSheet}
                onOpenDetails={onOpenDetails}
                isItemInQuote={quoteItemIds.includes(product.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
            <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-700">No medical products found</h3>
            <p className="text-sm text-slate-500 mt-2 max-w-sm mx-auto">
              We couldn't find matches for "{searchQuery}". Try searching for "Spirometer", "Gloves", "Pump", or "Analyzer".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                onSelectCategory('All');
              }}
              className="mt-5 px-5 py-2.5 text-sm font-semibold text-white bg-[#0B2F63] hover:bg-[#164082] rounded-xl transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Dedicated Category Page Bridge (when a category filter is active) */}
        {selectedCategory !== 'All' && (
          <div className="mt-8 flex items-center justify-between bg-sky-50/70 border border-sky-200/80 rounded-xl px-5 py-3.5 text-sm">
            <span className="text-slate-700 font-medium">
              Viewing wholesale filter: <strong className="text-[#0B2F63]">{selectedCategory}</strong>
            </span>
            <Link
              href={`/products/category/${toCategorySlug(selectedCategory)}`}
              className="font-bold text-[#0B2F63] hover:text-sky-700 inline-flex items-center gap-1.5"
            >
              <span>Open Full {selectedCategory} Division Page</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* B2B Procurement Notice Banner */}
        <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-[#0B2F63] flex items-center justify-center shrink-0">
              <span className="font-bold text-sm tracking-wide">RFQ</span>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#0B2F63] leading-snug">
                Need private-label medical packaging, custom OEM runs, or a regulatory dossier?
              </h3>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                Explore our{' '}
                <Link href="/oem-manufacturing" className="text-sky-700 font-semibold hover:underline">
                  OEM manufacturing workflows
                </Link>{' '}
                and{' '}
                <Link href="/products" className="text-sky-700 font-semibold hover:underline">
                  full wholesale medical catalog
                </Link>{' '}
                with MOQs and lead times.
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            className="shrink-0 inline-flex items-center justify-center h-11 px-5 text-sm font-bold text-[#0B2F63] hover:text-white hover:bg-[#0B2F63] border border-[#0B2F63] rounded-xl transition-colors whitespace-nowrap"
          >
            Inquire About Custom OEM Run
          </Link>
        </div>

      </div>
    </section>
  );
};
