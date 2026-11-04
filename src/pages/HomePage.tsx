import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  FileText, 
  Globe2, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Truck, 
  Activity, 
  Building2, 
  ChevronRight,
  PhoneCall
} from 'lucide-react';
import { CATEGORY_PRICING_CONFIGS } from '../components/PriceEstimationCalculator';
import { SERVICES } from '../data/services';
import { BRANDS } from '../data/brands';
import { PRODUCTS } from '../data/products';

interface HomePageProps {
  onOpenRfq: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenRfq }) => {
  // Selected 6 featured categories for the homepage
  const featuredCategories = CATEGORY_PRICING_CONFIGS.slice(0, 6);
  // Selected 3 major services for the homepage overview
  const featuredServices = SERVICES.slice(0, 3);
  // Selected 4 partner brands
  const featuredBrands = BRANDS.slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24 pb-12">
      
      {/* 1. Hero Section with Medical Logistics Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0B2F63] to-[#071E40] text-white pt-12 pb-20 sm:pt-16 sm:pb-28">
        {/* Subtle grid pattern backdrop */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38B6FF_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#38B6FF] text-xs font-semibold backdrop-blur-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>ISO 13485:2016 Certified & CE Marked Manufacturer</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-5.5xl font-extrabold tracking-tight text-white leading-tight">
                Precision Medical Consumables & Resilient Global Supply
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Secure MediTech Global manufactures and distributes hospital-grade critical care, airway, dialysis, and surgical supplies with guaranteed international dispatch to healthcare networks across North America, Africa, and South Asia.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={onOpenRfq}
                  className="w-full sm:w-auto px-6 py-3.5 bg-[#38B6FF] hover:bg-[#209ee8] text-white text-sm font-bold rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <FileText className="w-4 h-4" />
                  <span>Request a Fast Quotation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  to="/products"
                  className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-sm font-semibold rounded-xl backdrop-blur-xs transition-colors text-center"
                >
                  Browse Catalogue
                </Link>
              </div>

              {/* Key Highlights */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/15 max-w-lg mx-auto lg:mx-0 text-left">
                <div>
                  <div className="text-lg sm:text-xl font-bold font-mono text-white">3–5 Days</div>
                  <div className="text-[11px] text-slate-400">Warehouse Dispatch</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold font-mono text-[#38B6FF]">ISO 13485</div>
                  <div className="text-[11px] text-slate-400">Cleanroom Audited</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold font-mono text-emerald-400">6+ Hubs</div>
                  <div className="text-[11px] text-slate-400">Global Forwarding</div>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Banner Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-slate-900 aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 group">
                <img
                  src="/assets/images/hero_medical_logistics_1792848779603.jpg"
                  alt="Medical Equipment Logistics & Global Supply"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071E40]/90 via-transparent to-transparent" />
                
                {/* Floating Trust Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-white/30 text-slate-800 shadow-lg">
                  <div className="flex items-center justify-between text-xs font-bold text-[#0B2F63] mb-1">
                    <span>Bonded Global Air & Sea Consignments</span>
                    <span className="text-emerald-600 font-mono">FOB / CIF / DDP</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-tight">
                    Pre-cleared regulatory paperwork and temperature-monitored shipping containers for immediate hospital dock delivery.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Brief Company Introduction */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#38B6FF]">
                Company Overview
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2F63] tracking-tight">
                Empowering Clinical Excellence with Aseptic Manufacturing
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Headquartered in Wyoming, USA, with dedicated cleanroom facilities and regional logistics hubs across South Asia and Africa, <strong>Secure MediTech Global</strong> is an international manufacturer and wholesale exporter of single-use clinical consumables, diagnostic systems, and surgical packs.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-700 pt-1">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Class 10,000 (ISO 7) Cleanrooms</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Continuous 304 Stainless Wire Reinforcement</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>CE MDR 2017/745 Technical Dossiers</span>
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Link
                to="/about"
                className="px-5 py-3 bg-[#0B2F63] hover:bg-[#124185] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 text-center"
              >
                <span>Read Full Company Profile</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors text-center"
              >
                Connect with Procurement
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Product Categories (Max 6) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#38B6FF]">
              Clinical Divisions
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2F63] tracking-tight mt-1">
              Featured Product Categories
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Select a clinical category to view specifications or explore the complete catalogue.
            </p>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B2F63] hover:text-[#38B6FF] transition-colors shrink-0"
          >
            <span>View All Products</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredCategories.map((category) => {
            const sampleProd = PRODUCTS.find((p) => p.category === category.id) || PRODUCTS[0];
            return (
              <div 
                key={category.id}
                className="group bg-white rounded-2xl border border-slate-200 hover:border-[#38B6FF]/60 hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
              >
                <div className="p-5">
                  <div className="h-44 rounded-xl bg-slate-50 overflow-hidden mb-4 relative flex items-center justify-center p-2">
                    <img
                      src={sampleProd.image}
                      alt={category.name}
                      className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-xs text-[10px] font-mono text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                      MOQ: {category.minOrderQty} {category.unit}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0B2F63] transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                <div className="px-5 pb-5 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">
                    {category.sampleProductIds.length}+ Certified Lines
                  </span>
                  <Link
                    to={`/products?category=${encodeURIComponent(category.id)}`}
                    className="text-xs font-bold text-[#0B2F63] group-hover:text-[#38B6FF] flex items-center gap-1 transition-colors"
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Short Overview of Major Services */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#38B6FF]">
                OEM & Healthcare Capabilities
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2F63] tracking-tight mt-1">
                Specialized Services
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Contract manufacturing, DFM tooling, global cold chain, and turnkey hospital packages.
              </p>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B2F63] hover:text-[#38B6FF] transition-colors shrink-0"
            >
              <span>View All Services</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredServices.map((service, index) => (
              <div 
                key={service.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="text-[11px] font-mono text-[#38B6FF] font-bold mb-2">
                    0{index + 1}. SERVICE
                  </div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                    {service.shortDescription}
                  </p>
                  
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                    {service.capabilities.slice(0, 2).map((cap, i) => (
                      <div key={i} className="text-[11px] text-slate-600 flex items-start gap-1.5">
                        <span className="text-[#38B6FF] font-bold">·</span>
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 mt-4">
                  <Link
                    to={`/services#${service.slug}`}
                    className="text-xs font-bold text-[#0B2F63] hover:text-[#38B6FF] flex items-center gap-1.5 transition-colors"
                  >
                    <span>View Service Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Selected Partner Brands (Clean Logo Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#38B6FF]">
              Manufacturing Alliances
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2F63] tracking-tight mt-1">
              Partner Brands & Divisions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Manufactured under strict ISO 13485:2016 quality agreements and international distribution rights.
            </p>
          </div>
          <Link
            to="/brands"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B2F63] hover:text-[#38B6FF] transition-colors shrink-0"
          >
            <span>All Partner Brands</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featuredBrands.map((brand) => (
            <Link
              key={brand.id}
              to="/brands"
              className="bg-white p-5 rounded-xl border border-slate-200 hover:border-[#0B2F63] hover:shadow-xs transition-all text-center group"
            >
              <div className="h-10 flex items-center justify-center font-extrabold tracking-wider text-sm sm:text-base text-[#0B2F63] group-hover:text-[#38B6FF] transition-colors font-mono">
                {brand.logoText}
              </div>
              <div className="text-[11px] font-medium text-slate-700 mt-1 truncate">
                {brand.name}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                {brand.badge}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. Key Statistics & Achievements */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B2F63] text-white rounded-2xl p-8 sm:p-12 shadow-md">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-[#38B6FF]">
                100%
              </div>
              <div className="text-xs sm:text-sm font-semibold text-white mt-1">
                Lot Traceability
              </div>
              <div className="text-[11px] text-slate-300 mt-0.5">
                ISO 13485 & CE MDR CoAs
              </div>
            </div>

            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white">
                3–5 Days
              </div>
              <div className="text-xs sm:text-sm font-semibold text-white mt-1">
                Standard Dispatch
              </div>
              <div className="text-[11px] text-slate-300 mt-0.5">
                Warehouse inventory stock
              </div>
            </div>

            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400">
                AQL 0.65
              </div>
              <div className="text-xs sm:text-sm font-semibold text-white mt-1">
                Rigorous Water-Leak Test
              </div>
              <div className="text-[11px] text-slate-300 mt-0.5">
                Surpassing ASTM standards
              </div>
            </div>

            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white">
                6+ Hubs
              </div>
              <div className="text-xs sm:text-sm font-semibold text-white mt-1">
                Global Forwarding
              </div>
              <div className="text-[11px] text-slate-300 mt-0.5">
                Africa, South Asia & US
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Compact Contact / Quotation CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 to-[#071E40] text-white rounded-2xl p-8 sm:p-10 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Ready to Secure Institutional Medical Inventory?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Connect with our international procurement desk for formal proforma invoices, custom OEM tooling proposals, and CIF/DDP freight rates.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={onOpenRfq}
              className="w-full sm:w-auto px-5 py-3 bg-[#38B6FF] hover:bg-[#209ee8] text-white text-xs font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Open RFQ Form</span>
            </button>
            <Link
              to="/contact"
              className="w-full sm:w-auto px-5 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold rounded-xl transition-colors text-center"
            >
              Contact Offices
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
