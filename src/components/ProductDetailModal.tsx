import React from 'react';
import { Product } from '../types';
import { X, ShieldCheck, Check, Plus, FileDown, Package, Clock, Globe, MessageSquare, Layers } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToQuote: (product: Product) => void;
  onOpenSpecSheet: (product: Product) => void;
  isInQuote: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToQuote,
  onOpenSpecSheet,
  isInQuote
}) => {
  if (!product) return null;

  const whatsAppUrl = `https://wa.me/13075334504?text=${encodeURIComponent(
    `Hello Secure MediTech Global, I am inquiring about product specifications, available sizes, and bulk pricing for ${product.name} (SKU: ${product.sku}).`
  )}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Bar */}
        <div className="bg-[#0B2F63] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono bg-[#38B6FF] text-[#071E40] font-bold px-2 py-0.5 rounded">
              {product.sku}
            </span>
            <span className="text-xs text-slate-300">· {product.category}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Layout */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left Column: Image, Regulatory & Logistics Profile */}
          <div className="md:col-span-5 space-y-4">
            <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 aspect-4/3 shadow-2xs">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="font-bold text-[#0B2F63] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                <span>Regulatory Credentials</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {product.certifications.map((c, i) => (
                  <span key={i} className="bg-white border border-slate-200 px-2 py-1 rounded text-slate-700 font-semibold text-[11px]">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs text-slate-600">
              <div className="font-bold text-[#0B2F63]">Procurement Profile</div>
              <p className="flex items-center gap-2">
                <Package className="w-3.5 h-3.5 text-slate-400" />
                <span>MOQ: <strong>{product.minOrderQty}</strong></span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Standard Dispatch: <strong>{product.leadTime}</strong></span>
              </p>
              <p className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span>Freight: Air / Ocean Cargo Ready</span>
              </p>
            </div>
          </div>

          {/* Right Column: Descriptions, Sizes, Technical Specs & Enquiries */}
          <div className="md:col-span-7 space-y-5">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B2F63]">
                {product.name}
              </h2>
              <p className="text-xs sm:text-sm text-[#38B6FF] font-semibold mt-1">
                {product.tagline}
              </p>
            </div>

            <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2">
              <p>{product.description}</p>
            </div>

            {/* Available Sizes / Variants Section */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#38B6FF]" />
                  <span>Available Gauges, Lengths & Sizes</span>
                </h4>
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-1.5">
                  {product.sizes.map((size, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#38B6FF]" />
                      <span className="font-medium">{size}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Parameter Table */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Technical Attributes & Materials
              </h4>
              <div className="rounded-xl border border-slate-200 overflow-hidden text-xs">
                {Object.entries(product.specs).map(([key, value], idx) => (
                  <div 
                    key={key} 
                    className={`flex items-start justify-between p-2.5 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
                  >
                    <span className="font-medium text-slate-600">{key}</span>
                    <span className="font-semibold text-slate-900 text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Packaging Specification */}
            <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-100 text-xs text-slate-700">
              <span className="font-bold text-[#0B2F63]">Packaging Standard: </span>
              {product.packaging}
            </div>

            {/* Enquiry & Procurement Callout */}
            <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100 flex items-center justify-between gap-3 text-xs">
              <div>
                <div className="font-bold text-[#0B2F63]">Looking for Hospital Pricing or Custom OEM?</div>
                <div className="text-[11px] text-slate-600 mt-0.5">
                  Chat directly with our medical procurement officer on WhatsApp or add to your official RFQ tender.
                </div>
              </div>
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-[#10B981] hover:bg-[#059669] text-white font-bold rounded-lg shrink-0 flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Enquire</span>
              </a>
            </div>

            {/* Main Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onAddToQuote(product)}
                className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  isInQuote 
                    ? 'bg-[#0B2F63] text-white hover:bg-[#164082]' 
                    : 'bg-[#38B6FF] hover:bg-[#209ee8] text-white shadow-md'
                }`}
              >
                {isInQuote ? (
                  <>
                    <Check className="w-4 h-4 text-[#10B981]" />
                    <span>In Quote Request</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Add to Quotation (RFQ)</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenSpecSheet(product);
                }}
                className="py-3 px-4 rounded-xl text-xs font-bold text-[#0B2F63] bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <FileDown className="w-4 h-4 text-[#38B6FF]" />
                <span>View Full Spec Sheet</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
