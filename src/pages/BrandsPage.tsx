import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, ArrowRight, ExternalLink, Building2, ChevronRight } from 'lucide-react';
import { BRANDS } from '../data/brands';
import { PRODUCTS } from '../data/products';
import { getCategorySlug } from './ProductsPage';

interface BrandsPageProps {
  onOpenRfq: () => void;
}

export const BrandsPage: React.FC<BrandsPageProps> = ({ onOpenRfq }) => {
  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. Page Header */}
      <div className="bg-[#0B2F63] text-white py-14 sm:py-18 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#38B6FF]">
              <Award className="w-4 h-4" />
              <span>International Alliances & Manufacturing Lines</span>
            </div>
            <h1 className="text-3xl sm:text-4.5xl font-extrabold tracking-tight text-white">
              Brands & Manufacturing Partners
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Explore the dedicated medical device brands, specialized manufacturing divisions, and technology partners represented and manufactured by Secure MediTech Global worldwide.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* 2. Clean Brand Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BRANDS.map((brand) => {
            const associatedProducts = PRODUCTS.filter((p) => brand.productIds.includes(p.id));

            return (
              <div 
                key={brand.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-[#38B6FF] hover:shadow-md transition-all p-6 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  
                  {/* Brand Header & Logo Mark */}
                  <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                    <div>
                      <div className="text-xl font-extrabold text-[#0B2F63] font-mono tracking-wider group-hover:text-[#38B6FF] transition-colors">
                        {brand.logoText}
                      </div>
                      <h2 className="text-sm font-bold text-slate-900 mt-0.5">
                        {brand.name}
                      </h2>
                    </div>
                    <span className="bg-blue-50 text-[#0B2F63] border border-blue-200 text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">
                      {brand.badge}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {brand.description}
                  </p>

                  {/* Manufacturer Info & Origin */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-[11px] text-slate-600 space-y-1">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Manufacturer / Facilities:</span>
                      <span className="font-semibold text-slate-800">{brand.manufacturerInfo}</span>
                    </div>
                    <div className="pt-1 flex items-center justify-between text-slate-500">
                      <span>Origin: {brand.origin}</span>
                      <span className="font-mono">Est. {brand.establishedYear}</span>
                    </div>
                  </div>

                  {/* Regulatory Scope */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {brand.certifications.map((cert, i) => (
                      <span key={i} className="text-[10px] font-mono font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                        {cert}
                      </span>
                    ))}
                  </div>

                  {/* Associated Products */}
                  {associatedProducts.length > 0 && (
                    <div className="pt-2 border-t border-slate-100 space-y-1.5">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Associated Products in Catalogue:
                      </div>
                      <div className="space-y-1">
                        {associatedProducts.map((prod) => {
                          const catSlug = getCategorySlug(prod.category);
                          return (
                            <Link
                              key={prod.id}
                              to={`/products/${catSlug}/${prod.id}`}
                              className="text-xs text-slate-700 hover:text-[#0B2F63] flex items-center justify-between py-1 px-2 rounded-lg hover:bg-slate-50 transition-colors"
                            >
                              <span className="truncate pr-2">{prod.name}</span>
                              <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}

                </div>

                {/* Footer Action */}
                <div className="pt-5 mt-4 border-t border-slate-100">
                  <Link
                    to={`/products?category=${encodeURIComponent(brand.categories[0])}`}
                    className="w-full py-2 bg-slate-100 hover:bg-[#0B2F63] hover:text-white text-slate-800 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 text-center"
                  >
                    <span>View Brand Products</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            );
          })}
        </div>

        {/* Brand Representation Inquiries Banner */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white">Seeking Global Distribution or OEM Licensing?</h3>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              Secure MediTech Global partners with leading biomedical innovators to manufacture, license, and distribute certified medical devices across Africa, Asia, and North America.
            </p>
          </div>
          <button
            onClick={onOpenRfq}
            className="px-5 py-2.5 bg-[#38B6FF] hover:bg-[#209ee8] text-white text-xs font-bold rounded-xl transition-colors shrink-0 cursor-pointer"
          >
            Inquire About Brand Partnership
          </button>
        </div>

      </div>

    </div>
  );
};
