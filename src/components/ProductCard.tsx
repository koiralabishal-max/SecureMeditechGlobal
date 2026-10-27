import React, { useState } from 'react';
import { Product } from '../types';
import { FileDown, Plus, Check, Eye, Shield, Package, Clock, MessageSquare } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToQuote: (product: Product) => void;
  onOpenSpecSheet: (product: Product) => void;
  onOpenDetails: (product: Product) => void;
  isItemInQuote: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToQuote,
  onOpenSpecSheet,
  onOpenDetails,
  isItemInQuote
}) => {
  const [imgError, setImgError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToQuote(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  const whatsAppUrl = `https://wa.me/13075334504?text=${encodeURIComponent(
    `Hello Secure MediTech Global, I would like to enquire about ${product.name} (SKU: ${product.sku}) regarding bulk availability, sizing, and pricing.`
  )}`;

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 hover:border-[#38B6FF]/60 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Product Image Area with quick-action hover */}
      <div 
        className="relative h-52 bg-slate-100 overflow-hidden cursor-pointer"
        onClick={() => onOpenDetails(product)}
      >
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            width={400}
            height={208}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-slate-50 text-slate-400">
            <Package className="w-12 h-12 mb-2 text-slate-300" />
            <span className="text-xs font-semibold">{product.name}</span>
          </div>
        )}

        {/* Top Badges: CE / Regulatory Indicator & Category */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5 bg-[#0B2F63]/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs">
            <Shield className="w-3 h-3 text-[#38B6FF]" />
            <span>{product.certifications[0]}</span>
          </div>

          <span className="bg-white/95 backdrop-blur-xs text-slate-700 text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded shadow-xs border border-slate-200">
            {product.category}
          </span>
        </div>

        {/* Hover Quick View Overlay */}
        <div className="absolute inset-0 bg-[#0B2F63]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
          <span className="bg-white text-[#0B2F63] text-xs font-bold py-1.5 px-3.5 rounded-lg shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5 text-[#38B6FF]" />
            View Details
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* SKU & Category Kicker */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="font-mono text-slate-500 font-semibold tracking-tight text-[11px]">
              SKU: {product.sku}
            </span>
            <span className="text-[10px] font-medium text-emerald-600 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              ISO 13485
            </span>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onOpenDetails(product)}
            className="text-sm font-bold text-[#0B2F63] group-hover:text-[#164082] transition-colors cursor-pointer leading-snug line-clamp-2 min-h-[40px]"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Tagline / Subtitle */}
          <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>

          {/* Key Specs Preview Pill-Free List */}
          <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5 text-[11px] text-slate-600">
            {Object.entries(product.specs).slice(0, 2).map(([key, val]) => (
              <div key={key} className="flex items-start justify-between gap-2">
                <span className="text-slate-500 font-medium">{key}:</span>
                <span className="text-slate-800 font-semibold text-right truncate max-w-[170px]" title={val}>
                  {val}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Card Footer Logistics & Actions */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 space-y-3">
          {/* Packaging & Lead Time Micro-Info */}
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <Package className="w-3 h-3 text-slate-400" />
              <span>MOQ: {product.minOrderQty}</span>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>Lead: {product.leadTime}</span>
            </span>
          </div>

          {/* Primary Action Buttons: View Details & Request a Quote */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onOpenDetails(product)}
              className="px-2.5 py-2 text-xs font-semibold text-[#0B2F63] hover:text-[#164082] bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200/80 transition-colors flex items-center justify-center gap-1.5"
              title="View complete specifications, packaging, and sizing"
            >
              <Eye className="w-3.5 h-3.5 text-[#38B6FF]" />
              <span className="whitespace-nowrap">View Details</span>
            </button>

            <button
              onClick={handleAddClick}
              className={`px-3 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                justAdded 
                  ? 'bg-[#10B981] text-white' 
                  : isItemInQuote 
                    ? 'bg-[#0B2F63] text-white hover:bg-[#164082]' 
                    : 'bg-[#38B6FF] hover:bg-[#209ee8] text-white shadow-xs'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : isItemInQuote ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>In Quote</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Enquire / Quote</span>
                </>
              )}
            </button>
          </div>

          {/* Secondary Quick Actions: WhatsApp Direct Enquiry & Spec Sheet */}
          <div className="flex items-center justify-between pt-1 text-[11px]">
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#10B981] hover:text-[#059669] font-semibold transition-colors"
              title="Instant WhatsApp Product Enquiry"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Enquiry</span>
            </a>

            <button
              onClick={() => onOpenSpecSheet(product)}
              className="inline-flex items-center gap-1 text-slate-500 hover:text-[#0B2F63] transition-colors"
              title="Download Engineering Spec Sheet"
            >
              <FileDown className="w-3 h-3 text-[#38B6FF]" />
              <span>Spec Sheet</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
