import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Package, 
  Clock, 
  FileText, 
  Check, 
  Share2, 
  ChevronRight,
  Layers,
  Award,
  AlertCircle
} from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { getCategorySlug } from './ProductsPage';

interface ProductDetailPageProps {
  onAddToQuote: (product: Product, quantity?: number) => void;
  onOpenRfq: () => void;
  quoteItemIds: string[];
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  onAddToQuote,
  onOpenRfq,
  quoteItemIds
}) => {
  const { productId } = useParams<{ categorySlug: string; productId: string }>();
  const navigate = useNavigate();

  const product = PRODUCTS.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-slate-400 mx-auto" />
        <h2 className="text-xl font-bold text-slate-800">Product Not Found</h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          The requested medical device could not be located in our active catalogue.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#0B2F63] text-white text-xs font-bold rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Product Catalogue</span>
        </Link>
      </div>
    );
  }

  const isInQuote = quoteItemIds.includes(product.id);
  const categorySlug = getCategorySlug(product.category);

  // Related products from the same category
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  const whatsappMessage = encodeURIComponent(
    `Hello Secure MediTech Global, I am inquiring about product ${product.name} (SKU: ${product.sku}). Please provide clinical spec sheets and wholesale pricing.`
  );

  return (
    <div className="space-y-12 pb-16">
      
      {/* Breadcrumb Navigation */}
      <div className="bg-slate-100/80 border-b border-slate-200 py-3 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1.5 flex-wrap">
          <Link to="/" className="hover:text-[#0B2F63] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/products" className="hover:text-[#0B2F63] transition-colors">Products</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-[#0B2F63] transition-colors">
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-medium truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Product Showcase Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Product Image Gallery / View */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs flex items-center justify-center aspect-4/3 relative overflow-hidden group">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-4 left-4 bg-[#0B2F63] text-white text-xs font-mono font-bold px-2.5 py-1 rounded-lg">
                {product.sku}
              </span>
              <span className="absolute top-4 right-4 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{product.certifications[0]}</span>
              </span>
            </div>

            {/* Regulatory and Standards Strip */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Standard Harmonization:</span>
                <span className="font-semibold text-slate-800">{product.standards.join(' · ')}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Compliance Scope:</span>
                <span className="font-semibold text-[#0B2F63]">{product.certifications.join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Key Details & Purchasing Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-block text-xs font-bold uppercase tracking-wider text-[#38B6FF] mb-1">
                {product.category}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2F63] tracking-tight">
                {product.name}
              </h1>
              <p className="text-sm font-medium text-slate-600 mt-2 leading-relaxed">
                {product.tagline}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
              {product.description}
            </p>

            {/* Procurement Terms Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Min. Order Qty (MOQ)</div>
                <div className="text-xs font-bold text-[#0B2F63] font-mono mt-0.5">{product.minOrderQty}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Warehouse Dispatch</div>
                <div className="text-xs font-bold text-slate-800 font-mono mt-0.5">{product.leadTime}</div>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <div className="text-[10px] uppercase font-bold text-slate-400">Sterility Assurance</div>
                <div className="text-xs font-bold text-emerald-600 font-mono mt-0.5">SAL 10⁻⁶ Validated</div>
              </div>
            </div>

            {/* Packaging Specification */}
            <div className="space-y-1.5 text-xs text-slate-600">
              <span className="font-bold text-slate-700">Packaging Format:</span>
              <p className="bg-white p-3 rounded-xl border border-slate-200 font-mono text-[11px] text-slate-700">
                {product.packaging}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => onAddToQuote(product, 500)}
                  className={`py-3 px-4 text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer ${
                    isInQuote
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-[#0B2F63] hover:bg-[#124185] text-white'
                  }`}
                >
                  {isInQuote ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to RFQ Basket</span>
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4" />
                      <span>Add to RFQ Basket (500 MOQ)</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={onOpenRfq}
                  className="py-3 px-4 bg-[#38B6FF] hover:bg-[#209ee8] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Open RFQ Form</span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={`https://wa.me/13075334504?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Inquire on WhatsApp (+1 307 533-4504)</span>
                </a>

                <a
                  href="#price-calculator"
                  className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
                >
                  Estimate Volume Rate
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Technical Specifications Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="bg-[#0B2F63] text-white px-6 py-4">
            <h3 className="text-base font-bold">Comprehensive Engineering & Clinical Specifications</h3>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="py-2.5 border-b border-slate-100 flex items-start justify-between text-xs">
                  <span className="font-semibold text-slate-500 w-1/3">{key}</span>
                  <span className="font-mono text-slate-800 text-right w-2/3">{value}</span>
                </div>
              ))}
            </div>

            {/* Available Sizes Matrix if present */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Available Clinical Sizing Matrix
                </h4>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size, idx) => (
                    <span 
                      key={idx} 
                      className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-700"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6 pt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#0B2F63]">
                Related {product.category} Products
              </h3>
              <Link to="/products" className="text-xs font-bold text-[#0B2F63] hover:text-[#38B6FF]">
                View All Categories →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {relatedProducts.map((rel) => {
                const relCatSlug = getCategorySlug(rel.category);
                return (
                  <div key={rel.id} className="bg-white rounded-xl border border-slate-200 p-4 hover:border-[#38B6FF] transition-all flex flex-col justify-between group">
                    <div>
                      <div className="h-36 bg-slate-50 rounded-lg p-2 mb-3 flex items-center justify-center">
                        <img src={rel.image} alt={rel.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" />
                      </div>
                      <div className="text-[10px] font-mono text-slate-400">{rel.sku}</div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#0B2F63] transition-colors mt-0.5 line-clamp-2">
                        {rel.name}
                      </h4>
                    </div>
                    <Link
                      to={`/products/${relCatSlug}/${rel.id}`}
                      className="mt-3 text-xs font-bold text-[#0B2F63] group-hover:text-[#38B6FF] flex items-center gap-1"
                    >
                      <span>Specifications</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
