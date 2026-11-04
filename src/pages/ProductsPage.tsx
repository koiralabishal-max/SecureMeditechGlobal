import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  FileText, 
  ShieldCheck, 
  ArrowRight, 
  Check, 
  ExternalLink,
  ChevronRight,
  Package,
  Layers
} from 'lucide-react';
import { ProductCategory, Product } from '../types';
import { PRODUCTS } from '../data/products';
import { CATEGORY_PRICING_CONFIGS } from '../components/PriceEstimationCalculator';

interface ProductsPageProps {
  onAddToQuote: (product: Product, quantity?: number) => void;
  quoteItemIds: string[];
}

export const getCategorySlug = (category: string): string => {
  return category
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

export const ProductsPage: React.FC<ProductsPageProps> = ({
  onAddToQuote,
  quoteItemIds
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(
    (categoryParam as ProductCategory) || 'All'
  );
  const [searchQuery, setSearchQuery] = useState('');

  // Update selectedCategory if URL search param changes
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam as ProductCategory);
    }
  }, [categoryParam]);

  const handleCategorySelect = (cat: ProductCategory) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesSearch = 
        product.name.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query) ||
        product.tagline.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.standards.some((s) => s.toLowerCase().includes(query)) ||
        Object.values(product.specs).some((v) => v.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-10 sm:space-y-12 pb-16">
      
      {/* 1. Page Header */}
      <div className="bg-[#0B2F63] text-white py-12 sm:py-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#38B6FF]">
              <Layers className="w-4 h-4" />
              <span>International Medical Inventory</span>
            </div>
            <h1 className="text-3xl sm:text-4.5xl font-extrabold tracking-tight text-white">
              Medical Equipment & Consumables Catalogue
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Explore CE MDR and ISO 13485 certified critical care lines, anesthesia tubes, vascular dialysis kits, and surgical procedure supplies manufactured for global healthcare procurement.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* 2. Search & Category Filters Bar */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by SKU, name, or clinical standard..."
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 focus:bg-white border border-slate-300 focus:border-[#0B2F63] rounded-xl outline-none text-slate-800 placeholder-slate-400 transition-colors"
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

            {/* Results Counter & Fast Link */}
            <div className="flex items-center justify-between w-full md:w-auto gap-4 text-xs text-slate-500">
              <span className="font-mono tabular-nums">
                Showing <strong className="text-slate-800">{filteredProducts.length}</strong> products
              </span>
              <a 
                href="#price-calculator" 
                className="text-[#0B2F63] hover:text-[#38B6FF] font-semibold flex items-center gap-1"
              >
                <span>Budget Calculator ↓</span>
              </a>
            </div>

          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar">
            <button
              onClick={() => handleCategorySelect('All')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                selectedCategory === 'All'
                  ? 'bg-[#0B2F63] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              All Categories ({PRODUCTS.length})
            </button>

            {CATEGORY_PRICING_CONFIGS.map((cfg) => {
              const count = PRODUCTS.filter((p) => p.category === cfg.id).length;
              const isSelected = selectedCategory === cfg.id;
              return (
                <button
                  key={cfg.id}
                  onClick={() => handleCategorySelect(cfg.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                    isSelected
                      ? 'bg-[#0B2F63] text-white font-bold shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {cfg.shortName} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
            <Package className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No medical products found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              We couldn't find any products matching your filter criteria. Try resetting the search or category filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setSearchParams({});
              }}
              className="px-4 py-2 bg-[#0B2F63] text-white text-xs font-bold rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const isInQuote = quoteItemIds.includes(product.id);
              const categorySlug = getCategorySlug(product.category);

              return (
                <div 
                  key={product.id}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-[#38B6FF]/80 hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    {/* Image Area */}
                    <Link
                      to={`/products/${categorySlug}/${product.id}`}
                      className="block h-52 bg-slate-50 relative p-4 overflow-hidden border-b border-slate-100"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[10px]">
                        <span className="font-mono bg-white/95 px-2 py-0.5 rounded text-slate-700 border border-slate-200 font-semibold shadow-2xs">
                          {product.sku}
                        </span>
                        <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-semibold border border-emerald-200">
                          {product.certifications[0]}
                        </span>
                      </div>
                    </Link>

                    {/* Content Area */}
                    <div className="p-5 space-y-2.5">
                      <div className="text-[11px] font-semibold text-[#38B6FF] uppercase tracking-wide">
                        {product.category}
                      </div>

                      <Link 
                        to={`/products/${categorySlug}/${product.id}`}
                        className="block group-hover:text-[#0B2F63] transition-colors"
                      >
                        <h3 className="text-base font-bold text-slate-900 leading-snug">
                          {product.name}
                        </h3>
                      </Link>

                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {product.tagline}
                      </p>

                      {/* Technical Specs Preview */}
                      <div className="pt-2 border-t border-slate-100 space-y-1 text-[11px]">
                        {Object.entries(product.specs).slice(0, 2).map(([key, value]) => (
                          <div key={key} className="flex items-baseline justify-between text-slate-600">
                            <span className="text-slate-400 truncate max-w-[120px]">{key}:</span>
                            <span className="font-medium text-slate-800 text-right truncate max-w-[160px]">{value}</span>
                          </div>
                        ))}
                      </div>

                      {/* Packaging & MOQ */}
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/70 text-[11px] text-slate-600 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Packaging:</span>
                          <span className="font-mono truncate max-w-[160px] text-right">{product.packaging.split(',')[0]}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Min. Order:</span>
                          <span className="font-mono font-semibold text-[#0B2F63]">{product.minOrderQty}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                    <Link
                      to={`/products/${categorySlug}/${product.id}`}
                      className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors text-center flex items-center justify-center gap-1"
                    >
                      <span>Specifications</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => onAddToQuote(product, 500)}
                      className={`py-2.5 px-3 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                        isInQuote
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          : 'bg-[#0B2F63] hover:bg-[#124185] text-white'
                      }`}
                    >
                      {isInQuote ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>In Quote</span>
                        </>
                      ) : (
                        <>
                          <FileText className="w-3.5 h-3.5" />
                          <span>Add to Quote</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

    </div>
  );
};
