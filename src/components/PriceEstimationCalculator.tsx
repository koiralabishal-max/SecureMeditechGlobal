import React, { useState, useId } from 'react';
import { 
  Calculator, 
  TrendingDown, 
  Truck, 
  Package, 
  Clock, 
  ArrowRight, 
  Copy, 
  Check, 
  RotateCcw, 
  FileText, 
  ShieldCheck, 
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';
import { ProductCategory, Product } from '../types';
import { PRODUCTS } from '../data/products';

export interface CategoryPricingConfig {
  id: ProductCategory;
  name: string;
  shortName: string;
  unit: string;
  baseMinPrice: number; // in USD
  baseMaxPrice: number;
  minOrderQty: number;
  recommendedBatch: number;
  sampleProductIds: string[];
  description: string;
  cbmPer1000: number; // cubic meters per 1,000 units
  kgPer1000: number;  // gross weight kg per 1,000 units
}

export const CATEGORY_PRICING_CONFIGS: CategoryPricingConfig[] = [
  {
    id: 'Critical Care & Monitoring',
    name: 'Critical Care & Monitoring',
    shortName: 'Critical Care',
    unit: 'sets',
    baseMinPrice: 3.40,
    baseMaxPrice: 5.80,
    minOrderQty: 100,
    recommendedBatch: 1000,
    sampleProductIds: ['cvp-catheter-kit', 'pressure-monitoring-kit', 'ecg-electrodes'],
    description: 'CVP catheterization kits, invasive arterial pressure transducers, and ECG telemetry monitoring supplies.',
    cbmPer1000: 1.45,
    kgPer1000: 82
  },
  {
    id: 'Anesthesia & Airway Management',
    name: 'Anesthesia & Airway Management',
    shortName: 'Airway & Anesthesia',
    unit: 'pcs',
    baseMinPrice: 1.80,
    baseMaxPrice: 3.90,
    minOrderQty: 100,
    recommendedBatch: 2000,
    sampleProductIds: ['flexometallic-tube', 'endotracheal-tube-normal', 'block-needle'],
    description: 'Armored flexometallic tubes, cuffed/uncuffed endotracheal tubes, and echogenic ultrasound nerve block needles.',
    cbmPer1000: 0.95,
    kgPer1000: 58
  },
  {
    id: 'IV & Infusion Supplies',
    name: 'IV & Infusion Supplies',
    shortName: 'IV & Infusion',
    unit: 'pcs',
    baseMinPrice: 0.28,
    baseMaxPrice: 0.58,
    minOrderQty: 500,
    recommendedBatch: 5000,
    sampleProductIds: ['iv-cannula', 'iv-infusion-set'],
    description: 'PTFE IV cannulas with injection port/wings and precision gravity drip infusion administration giving sets.',
    cbmPer1000: 0.45,
    kgPer1000: 24
  },
  {
    id: 'Respiratory Care',
    name: 'Respiratory Care',
    shortName: 'Respiratory',
    unit: 'pcs',
    baseMinPrice: 2.40,
    baseMaxPrice: 4.60,
    minOrderQty: 100,
    recommendedBatch: 1000,
    sampleProductIds: ['closed-suction-catheter', 'spirometer-3ball'],
    description: '24h/72h closed circuit suction systems and multi-stage 3-ball incentive respiratory spirometers.',
    cbmPer1000: 1.60,
    kgPer1000: 90
  },
  {
    id: 'Urology & Catheters',
    name: 'Urology & Catheters',
    shortName: 'Urology',
    unit: 'pcs',
    baseMinPrice: 1.15,
    baseMaxPrice: 2.35,
    minOrderQty: 200,
    recommendedBatch: 2500,
    sampleProductIds: ['foleys-catheter'],
    description: '100% silicone and hydrophilic latex 2-way/3-way indwelling Foley urinary balloon drainage catheters.',
    cbmPer1000: 0.78,
    kgPer1000: 46
  },
  {
    id: 'Dialysis Supplies',
    name: 'Dialysis Supplies',
    shortName: 'Dialysis',
    unit: 'kits',
    baseMinPrice: 14.20,
    baseMaxPrice: 21.50,
    minOrderQty: 40,
    recommendedBatch: 500,
    sampleProductIds: ['dialysis-catheter'],
    description: 'High-flow acute dual and triple lumen polyurethane hemodialysis vascular access catheterization kits.',
    cbmPer1000: 2.10,
    kgPer1000: 115
  },
  {
    id: 'Surgical & OT Supplies',
    name: 'Surgical & OT Supplies',
    shortName: 'Surgical & OT',
    unit: 'pairs/packs',
    baseMinPrice: 0.55,
    baseMaxPrice: 1.35,
    minOrderQty: 500,
    recommendedBatch: 5000,
    sampleProductIds: ['sterile-latex-gloves', 'ot-combo-pack'],
    description: 'Gamma-irradiated powder-free latex surgical gloves and operating theater disposable packs.',
    cbmPer1000: 0.65,
    kgPer1000: 38
  },
  {
    id: 'Laboratory & Diagnostics',
    name: 'Laboratory & Diagnostics',
    shortName: 'Laboratory',
    unit: 'kits/tests',
    baseMinPrice: 12.00,
    baseMaxPrice: 28.00,
    minOrderQty: 50,
    recommendedBatch: 300,
    sampleProductIds: ['biochem-analyzer-5000'],
    description: 'Clinical biochemistry automated test reagents, calibrators, and hospital diagnostic consumables.',
    cbmPer1000: 2.40,
    kgPer1000: 140
  }
];

export type IncotermType = 'FOB' | 'CIF' | 'DDP' | 'EXW';
export type FreightMode = 'sea' | 'air';

interface PriceEstimationCalculatorProps {
  onTransferToRfq?: (product: Product, quantity: number, notes: string) => void;
  className?: string;
  isCompact?: boolean;
}

export const PriceEstimationCalculator: React.FC<PriceEstimationCalculatorProps> = ({
  onTransferToRfq,
  className = '',
  isCompact = false
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('Critical Care & Monitoring');
  const [volume, setVolume] = useState<number>(2500);
  const [incoterm, setIncoterm] = useState<IncotermType>('CIF');
  const [freightMode, setFreightMode] = useState<FreightMode>('sea');
  const [customPackaging, setCustomPackaging] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const categoryInputId = useId();
  const volumeSliderId = useId();

  const currentConfig = CATEGORY_PRICING_CONFIGS.find((c) => c.id === selectedCategory) || CATEGORY_PRICING_CONFIGS[0];

  // Determine volume tier discount
  let volumeDiscountPct = 0;
  let tierLabel = 'Standard MOQ Tier';

  if (volume >= 25000) {
    volumeDiscountPct = 0.32; // 32% discount
    tierLabel = 'National Tender / Full Container (32% Concession)';
  } else if (volume >= 10000) {
    volumeDiscountPct = 0.25; // 25% discount
    tierLabel = 'Direct Regional Wholesale (25% Concession)';
  } else if (volume >= 2500) {
    volumeDiscountPct = 0.18; // 18% discount
    tierLabel = 'Hospital Network Contract (18% Concession)';
  } else if (volume >= 500) {
    volumeDiscountPct = 0.08; // 8% discount
    tierLabel = 'Standard Bulk Batch (8% Concession)';
  } else {
    volumeDiscountPct = 0.00;
    tierLabel = 'Trial Order (Base Wholesale)';
  }

  // Incoterm adjustment factor
  let incotermMultiplier = 1.0;
  if (incoterm === 'CIF') {
    incotermMultiplier = freightMode === 'air' ? 1.14 : 1.08; // Maritime freight & insurance vs Air cargo
  } else if (incoterm === 'DDP') {
    incotermMultiplier = freightMode === 'air' ? 1.25 : 1.18; // Includes door delivery, destination customs clearance
  } else if (incoterm === 'EXW') {
    incotermMultiplier = 0.96; // Factory gate pickup
  } else {
    incotermMultiplier = 1.00; // FOB Origin
  }

  // Custom private label packaging add-on
  const packagingSurchargePerUnit = customPackaging ? (volume > 5000 ? 0.04 : 0.08) : 0;

  // Final per-unit range calculation
  const unitMin = Math.max(0.05, (currentConfig.baseMinPrice * (1 - volumeDiscountPct) * incotermMultiplier) + packagingSurchargePerUnit);
  const unitMax = Math.max(0.08, (currentConfig.baseMaxPrice * (1 - volumeDiscountPct) * incotermMultiplier) + packagingSurchargePerUnit);

  // Total range
  const totalMin = Math.round(unitMin * volume);
  const totalMax = Math.round(unitMax * volume);

  // Estimated gross weight & volume for container logistics
  const estimatedCbm = ((volume / 1000) * currentConfig.cbmPer1000).toFixed(2);
  const estimatedKg = Math.round((volume / 1000) * currentConfig.kgPer1000);
  const estimatedCartons = Math.ceil(volume / (currentConfig.id === 'IV & Infusion Supplies' ? 500 : currentConfig.id === 'Surgical & OT Supplies' ? 200 : 100));

  // Dynamic dispatch timeline based on volume
  const leadTimeText = volume > 20000 
    ? '12–18 business days (Dedicated OEM cleanroom production run)' 
    : volume > 5000 
      ? '7–10 business days (Export palletized dispatch)' 
      : '3–5 business days (Standard hub warehouse dispatch)';

  // Find a representative product for one-click RFQ transfer
  const sampleProduct = PRODUCTS.find((p) => p.category === selectedCategory) || PRODUCTS[0];

  const handleApplyToRfq = () => {
    if (onTransferToRfq && sampleProduct) {
      const notes = `Budgetary Quote Estimate: ${volume.toLocaleString()} ${currentConfig.unit} of ${currentConfig.name} via ${incoterm} (${freightMode.toUpperCase()} freight). Estimated budgetary range: $${totalMin.toLocaleString()} - $${totalMax.toLocaleString()} USD (~$${unitMin.toFixed(2)} - $${unitMax.toFixed(2)} / ${currentConfig.unit}).`;
      onTransferToRfq(sampleProduct, volume, notes);
    }
  };

  const handleCopySummary = () => {
    const summary = `SECURE MEDITECH GLOBAL - BUDGETARY QUOTE ESTIMATE
Division: ${currentConfig.name}
Volume: ${volume.toLocaleString()} ${currentConfig.unit}
Incoterm: ${incoterm} (${freightMode === 'air' ? 'Air Cargo Transit' : 'Ocean FCL/LCL Freight'})
Volume Tier: ${tierLabel}
Private Labeling: ${customPackaging ? 'Included (Custom Medical Carton & Pouches)' : 'Standard Export Barrier'}
Estimated Unit Price: $${unitMin.toFixed(2)} – $${unitMax.toFixed(2)} USD / ${currentConfig.unit}
Estimated Total Budget Range: $${totalMin.toLocaleString()} – $${totalMax.toLocaleString()} USD
Logistics Footprint: ~${estimatedCartons} Master Cartons | ${estimatedCbm} CBM | ~${estimatedKg} kg Gross Weight
Production & Dispatch Timeline: ${leadTimeText}
Note: Indicative budgetary quotation subject to formal proforma invoice confirmation.
Inquiries: info@securemeditechglobal.com | Phone/WhatsApp: +1 (307) 533-4504`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Secure MediTech Global, I generated a budgetary quote estimate on your web portal:
- Category: ${currentConfig.name}
- Order Volume: ${volume.toLocaleString()} ${currentConfig.unit}
- Incoterm: ${incoterm} (${freightMode.toUpperCase()})
- Estimated Range: $${totalMin.toLocaleString()} - $${totalMax.toLocaleString()} USD
I would like to receive an official formal proforma invoice and technical dossier.`
  );

  return (
    <div className={`bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden ${className}`}>
      
      {/* Header Banner */}
      <div className="bg-[#0B2F63] text-white p-5 sm:p-6 border-b border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#38B6FF] to-blue-400 flex items-center justify-center text-[#0B2F63] font-bold shrink-0 shadow-sm">
              <Calculator className="w-5 h-5 text-[#0B2F63]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold tracking-tight text-white">
                  B2B Wholesale Price & Volume Estimator
                </h3>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Calculate instant indicative budgetary ranges, volume tier concessions, and freight logistics.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto text-xs text-slate-300">
            <span className="inline-flex items-center gap-1.5 font-medium text-emerald-300 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1 rounded-lg">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ISO 13485 Direct Factory Rates</span>
            </span>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-7">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left Column: Parameter Inputs */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* 1. Category Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor={categoryInputId} className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Select Clinical Division / Category
                </label>
                <span className="text-[11px] text-slate-500">
                  {CATEGORY_PRICING_CONFIGS.length} Divisions
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {CATEGORY_PRICING_CONFIGS.map((cfg) => {
                  const isSelected = cfg.id === selectedCategory;
                  return (
                    <button
                      key={cfg.id}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cfg.id);
                        if (volume < cfg.minOrderQty) {
                          setVolume(cfg.minOrderQty);
                        }
                      }}
                      className={`text-left p-2.5 rounded-xl border text-xs transition-all ${
                        isSelected
                          ? 'border-[#0B2F63] bg-blue-50/70 text-[#0B2F63] font-bold shadow-2xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700 font-medium'
                      }`}
                    >
                      <div className="truncate">{cfg.shortName}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        MOQ: {cfg.minOrderQty} {cfg.unit}
                      </div>
                    </button>
                  );
                })}
              </div>

              <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{currentConfig.description}</span>
              </p>
            </div>

            {/* 2. Order Volume Slider & Numeric Input */}
            <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor={volumeSliderId} className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Order Volume ({currentConfig.unit})
                  </label>
                  <p className="text-[11px] text-slate-500">
                    Volume discounts automatically scale with batch size
                  </p>
                </div>

                <div className="flex items-center gap-1.5 bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 focus-within:border-[#0B2F63] focus-within:ring-2 focus-within:ring-[#0B2F63]/15">
                  <input
                    type="number"
                    min={currentConfig.minOrderQty}
                    step={100}
                    value={volume}
                    onChange={(e) => {
                      const val = Math.max(0, parseInt(e.target.value) || 0);
                      setVolume(val);
                    }}
                    className="w-24 text-right text-xs sm:text-sm font-bold font-mono tabular-nums text-slate-900 outline-none"
                  />
                  <span className="text-xs font-medium text-slate-500">{currentConfig.unit}</span>
                </div>
              </div>

              {/* Slider */}
              <input
                id={volumeSliderId}
                type="range"
                min={currentConfig.minOrderQty}
                max={50000}
                step={currentConfig.minOrderQty < 100 ? 50 : 250}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0B2F63]"
              />

              {/* Quick Volume Preset Buttons */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] text-slate-500 mr-1">Presets:</span>
                {[
                  { label: 'MOQ Trial', qty: currentConfig.minOrderQty },
                  { label: '500 units', qty: 500 },
                  { label: '2,500 units', qty: 2500 },
                  { label: '10,000 units', qty: 10000 },
                  { label: '25,000 units', qty: 25000 }
                ].map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setVolume(preset.qty)}
                    className={`px-2.5 py-1 text-[11px] font-medium rounded-lg border transition-colors ${
                      volume === preset.qty
                        ? 'bg-[#0B2F63] text-white border-[#0B2F63]'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Incoterm & Freight Mode Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                  Incoterms 2020 Basis
                </label>
                <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-xl">
                  {(['FOB', 'CIF', 'DDP', 'EXW'] as IncotermType[]).map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setIncoterm(term)}
                      className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                        incoterm === term
                          ? 'bg-white text-[#0B2F63] shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {term}
                    </button>
                  ))}
                </div>
                <div className="text-[10px] text-slate-500 mt-1">
                  {incoterm === 'CIF' && 'Includes ocean/air freight & transit insurance to destination port.'}
                  {incoterm === 'DDP' && 'Full door-to-door delivery with customs tariffs & dock unload.'}
                  {incoterm === 'FOB' && 'Free on Board origin port, client handles maritime freight.'}
                  {incoterm === 'EXW' && 'Ex-Works factory pickup at Secure MediTech loading dock.'}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                  Transit Mode
                </label>
                <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setFreightMode('sea')}
                    className={`py-1.5 text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                      freightMode === 'sea'
                        ? 'bg-white text-[#0B2F63] font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>Ocean FCL/LCL</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFreightMode('air')}
                    className={`py-1.5 text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                      freightMode === 'air'
                        ? 'bg-white text-[#0B2F63] font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Package className="w-3.5 h-3.5" />
                    <span>Air Expedited</span>
                  </button>
                </div>
                <div className="text-[10px] text-slate-500 mt-1">
                  {freightMode === 'sea' ? 'Economic volume transit: ~20–35 calendar days' : 'Rapid dispatch: ~3–7 business days to regional hub'}
                </div>
              </div>
            </div>

            {/* 4. OEM Private Label Option Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="pr-4">
                <span className="text-xs font-bold text-slate-800 block">
                  Custom OEM Private Labeling & Hospital Barcoding
                </span>
                <span className="text-[11px] text-slate-500">
                  Custom inner pouch artwork, multi-language IFU inserts, and GS1-128 master cartons.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setCustomPackaging(!customPackaging)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  customPackaging ? 'bg-[#0B2F63]' : 'bg-slate-300'
                }`}
                role="switch"
                aria-checked={customPackaging}
                aria-label="Toggle OEM Private Labeling"
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    customPackaging ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

          </div>

          {/* Right Column: Live Quotation Summary Card */}
          <div className="lg:col-span-5 bg-[#071E40] text-white p-5 sm:p-6 rounded-2xl border border-slate-700/80 shadow-md flex flex-col justify-between">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#38B6FF]">
                    Indicative Budgetary Quote
                  </span>
                  <div className="text-xs text-slate-300">
                    {currentConfig.shortName} · {incoterm}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-semibold text-emerald-400 font-mono">
                    {volumeDiscountPct > 0 ? `-${Math.round(volumeDiscountPct * 100)}% Volume Discount` : 'Base MOQ Rate'}
                  </span>
                </div>
              </div>

              {/* Big Estimated Total Range */}
              <div>
                <div className="text-xs text-slate-400">Estimated Total Budget Range</div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-white tracking-tight mt-0.5">
                  ${totalMin.toLocaleString()} – ${totalMax.toLocaleString()}
                  <span className="text-xs sm:text-sm font-normal text-slate-300 ml-1.5 font-sans">USD</span>
                </div>
                
                <div className="flex items-center gap-2 text-xs text-[#38B6FF] mt-1 font-mono">
                  <span>Unit Price: ${unitMin.toFixed(2)} – ${unitMax.toFixed(2)} / {currentConfig.unit}</span>
                </div>
              </div>

              {/* Breakdown Specs */}
              <div className="space-y-2 py-3 border-y border-slate-700/80 text-xs text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Target Order Volume:</span>
                  <span className="font-mono tabular-nums font-semibold text-white">
                    {volume.toLocaleString()} {currentConfig.unit}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Incoterm / Transit:</span>
                  <span className="font-semibold text-white">
                    {incoterm} · {freightMode === 'air' ? 'Air Cargo' : 'Ocean Container'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Logistics Volume / Weight:</span>
                  <span className="font-mono tabular-nums text-slate-200">
                    ~{estimatedCbm} CBM ({estimatedKg} kg)
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Carton Packaging:</span>
                  <span className="font-mono tabular-nums text-slate-200">
                    ~{estimatedCartons} Master Shipper Boxes
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Private Label Branding:</span>
                  <span className={customPackaging ? 'text-emerald-400 font-semibold' : 'text-slate-400'}>
                    {customPackaging ? 'Configured (Custom IFU/Pouch)' : 'Standard Export Barrier'}
                  </span>
                </div>
              </div>

              {/* Lead Time & Assurance */}
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-slate-300 font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#38B6FF]" />
                  <span>Estimated Dispatch Timeline</span>
                </div>
                <div className="text-[11px] text-slate-400 leading-relaxed">
                  {leadTimeText}
                </div>
              </div>

            </div>

            {/* Actions */}
            <div className="pt-4 space-y-2.5">
              
              {/* Transfer to RFQ Button */}
              {onTransferToRfq && (
                <button
                  type="button"
                  onClick={handleApplyToRfq}
                  className="w-full py-3 px-4 bg-[#38B6FF] hover:bg-[#209ee8] text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>Transfer to Official RFQ Basket</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              )}

              <div className="grid grid-cols-2 gap-2">
                {/* Copy Estimate */}
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl border border-slate-600 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  title="Copy full quotation breakdown text"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy Breakdown</span>
                    </>
                  )}
                </button>

                {/* WhatsApp Inquiry */}
                <a
                  href={`https://wa.me/13075334504?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer text-center"
                  title="Connect on WhatsApp with this quote estimate"
                >
                  <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span>WhatsApp Quote</span>
                </a>
              </div>

              <p className="text-[10px] text-slate-400 text-center">
                * Indicative budgetary figures based on standard factory export tariffs. Formal proforma provided upon RFQ submission.
              </p>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
