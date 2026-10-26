import React, { useState, useMemo } from 'react';
import { Product, ProductCategory } from '../types';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from './ProductCard';
import { Search, Filter, Layers } from 'lucide-react';

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
    <section id="products" className="py-16 sm:py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#38B6FF] mb-2">
              <Layers className="w-4 h-4" />
              <span>Certified Medical Supplies & Hospital Equipment</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B2F63] tracking-tight">
              Hospital Consumables & Medical Devices Catalog
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Browse our international hospital inventory: CVP kits, pressure monitoring sets, flexometallic & endotracheal tubes, IV cannulas, closed suction catheters, Foley & dialysis lines, and surgical OT consumables.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by SKU or product..."
              className="w-full pl-10 pr-4 py-2.5 bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 rounded-xl border border-slate-200 focus:outline-none focus:border-[#38B6FF] focus:ring-2 focus:ring-[#38B6FF]/20 transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Tabs & Segmented Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="text-xs font-semibold text-slate-400 mr-2 hidden sm:inline flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Category:
          </span>

          <div className="flex flex-wrap gap-2 p-1.5 bg-slate-200/60 rounded-xl border border-slate-300/50">
            {filterTabs.map((tab) => {
              const isActive = selectedCategory === tab;
              const count = tab === 'All' 
                ? PRODUCTS.length 
                : PRODUCTS.filter((p) => p.category === tab).length;

              return (
                <button
                  key={tab}
                  onClick={() => onSelectCategory(tab)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#0B2F63] text-white shadow-sm'
                      : 'text-slate-600 hover:text-[#0B2F63] hover:bg-white/60'
                  }`}
                >
                  <span>{tab}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? 'bg-[#38B6FF] text-[#071E40]' : 'bg-slate-300/60 text-slate-600'
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
            <h3 className="text-base font-bold text-slate-700">No medical products found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              We couldn't find matches for "{searchQuery}". Try searching for "Spirometer", "Gloves", "Pump", or "Analyzer".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                onSelectCategory('All');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-[#0B2F63] rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* B2B Procurement Notice Banner */}
        <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0B2F63] flex items-center justify-center shrink-0">
              <span className="font-bold text-lg">RFQ</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#0B2F63]">
                Need Custom OEM Labeling, High-Volume Tender, or Specialized Regulatory Dossier?
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Our global regulatory affairs and contract manufacturing team provides full technical file compilation and private branding.
              </p>
            </div>
          </div>
          <button
            onClick={() => onSelectCategory('All')}
            className="shrink-0 px-4 py-2.5 text-xs font-bold text-[#0B2F63] hover:text-white hover:bg-[#0B2F63] border border-[#0B2F63] rounded-xl transition-colors whitespace-nowrap"
          >
            Inquire About Custom OEM Run
          </button>
        </div>

      </div>
    </section>
  );
};
