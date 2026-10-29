'use client';

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
        className="relative aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer"
        onClick={() => onOpenDetails(product)}
      >
        {!imgError ? (
          <img
            src={product.image}
            alt={`${product.name} – ${product.tagline}`}
            loading="lazy"
            decoding="async"
            width={400}
            height={300}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-slate-50 text-slate-400">
            <Package className="w-12 h-12 mb-2 text-slate-300" />
            <span className="text-sm font-semibold text-center">{product.name}</span>
          </div>
        )}

        {/* Top Badges: CE / Regulatory Indicator & Category */}
        <div className="absolute top-3 left-3 flex items-center pointer-events-none">
          <div className="flex items-center gap-1.5 bg-[#0B2F63]/90 backdrop-blur-xs text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow-xs">
            <Shield className="w-3 h-3 text-[#38B6FF]" />
            <span>{product.certifications[0]}</span>
          </div>

        </div>

        {/* Hover Quick View Overlay */}
        <div className="absolute inset-0 bg-[#0B2F63]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
          <span className="bg-white text-[#0B2F63] text-sm font-bold py-2 px-4 rounded-lg shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5 text-[#38B6FF]" />
            View Details
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* SKU & Category Kicker */}
          <p className="text-xs font-semibold uppercase tracking-wider text-sky-600 mb-2 line-clamp-1">
            {product.category}
          </p>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="font-mono text-slate-500 text-xs">
              {product.sku}
            </span>
            <span className="text-xs font-medium text-emerald-600 flex items-center gap-1 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              ISO 13485
            </span>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onOpenDetails(product)}
            className="text-base font-bold text-[#0B2F63] group-hover:text-[#164082] transition-colors cursor-pointer leading-snug line-clamp-2 min-h-[2.75rem]"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Tagline / Subtitle */}
          <p className="text-sm text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>

          {/* Key Specs Preview Pill-Free List */}
          <dl className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs">
            {Object.entries(product.specs).slice(0, 2).map(([key, val]) => (
              <div key={key} className="flex items-baseline justify-between gap-3">
                <dt className="text-slate-500 shrink-0">{key}</dt>
                <dd className="text-slate-800 font-medium text-right truncate min-w-0" title={val}>
                  {val}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Card Footer Logistics & Actions */}
        <div className="mt-5 pt-4 border-t border-slate-100 space-y-3">
          {/* Packaging & Lead Time Micro-Info */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="min-w-0">
              <div className="flex items-center gap-1 text-slate-500">
                <Package className="w-3.5 h-3.5 text-slate-400" />
                <span>Min. order</span>
              </div>
              <div className="mt-0.5 font-semibold text-slate-800 truncate" title={product.minOrderQty}>{product.minOrderQty}</div>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1 text-slate-500">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Lead time</span>
              </div>
              <div className="mt-0.5 font-semibold text-slate-800 truncate" title={product.leadTime}>{product.leadTime}</div>
            </div>
          </div>

          {/* Primary Action Buttons: View Details & Request a Quote */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onOpenDetails(product)}
              className="h-10 px-2.5 text-sm font-semibold text-[#0B2F63] hover:text-[#164082] bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200/80 transition-colors flex items-center justify-center gap-1.5"
              title="View complete specifications, packaging, and sizing"
            >
              <Eye className="w-4 h-4 text-sky-500" />
              <span className="whitespace-nowrap">Details</span>
            </button>

            <button
              onClick={handleAddClick}
              className={`h-10 px-3 text-sm font-bold rounded-lg whitespace-nowrap transition-all flex items-center justify-center gap-1.5 ${
                justAdded 
                  ? 'bg-[#10B981] text-white' 
                  : isItemInQuote 
                    ? 'bg-[#0B2F63] text-white hover:bg-[#164082]' 
                    : 'bg-[#38B6FF] hover:bg-[#5cc4ff] text-[#071E40] shadow-xs'
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
                  <span>Add to Quote</span>
                </>
              )}
            </button>
          </div>

          {/* Secondary Quick Actions: WhatsApp Direct Enquiry & Spec Sheet */}
          <div className="flex items-center justify-between pt-1 text-xs">
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
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
              <FileDown className="w-3.5 h-3.5 text-sky-500" />
              <span>Spec Sheet</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
