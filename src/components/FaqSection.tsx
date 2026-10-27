import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ChevronDown, 
  Clock, 
  Globe2, 
  Layers, 
  ShieldCheck, 
  HelpCircle, 
  Sparkles, 
  FileText, 
  PhoneCall, 
  Mail, 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export type FaqCategory = 'All' | 'Lead Times' | 'International Shipping' | 'OEM & MOQs' | 'Quality & Compliance';

interface FaqItem {
  id: string;
  category: 'Lead Times' | 'International Shipping' | 'OEM & MOQs' | 'Quality & Compliance';
  question: string;
  answer: string;
  highlights: string[];
}

const FAQ_DATA: FaqItem[] = [
  // 1. Lead Times
  {
    id: 'lead-time-catalog',
    category: 'Lead Times',
    question: 'What are standard lead times for catalog medical supplies and consumables?',
    answer: 'For in-stock catalog sterile consumables—such as IV Cannulas, CVP Kits, Endotracheal Tubes, and Foley Catheters—standard dispatch occurs within 3 to 5 business days from our logistics hub. For high-volume repeat orders or scheduled bulk replenishments, production and dispatch typically take 7 to 14 business days from purchase order confirmation.',
    highlights: ['3–5 business days for stock items', '7–14 days for bulk replenishments', 'Real-time consignment tracking']
  },
  {
    id: 'lead-time-emergency',
    category: 'Lead Times',
    question: 'Can emergency or expedited hospital consignments be dispatched faster?',
    answer: 'Yes. We maintain emergency reserve buffer stock specifically for critical ICU, trauma, and surgical consumables. Priority air-dispatch can be scheduled within 24 to 48 hours for contracted healthcare institutions, health ministries, and registered hospital groups managing acute shortages.',
    highlights: ['24–48 hour priority dispatch', 'Emergency air cargo allocation', 'Dedicated logistics coordinator']
  },
  {
    id: 'lead-time-oem-tooling',
    category: 'Lead Times',
    question: 'What is the turnaround time for custom OEM tooling and new mold engineering?',
    answer: 'New OEM product development cycles—from CAD review and tooling fabrication in our ISO Class 7/8 cleanrooms to First Article Inspection (FAI) and sterilization validation—typically require 3 to 5 weeks. Rapid 3D prototyping and non-sterile functional evaluation samples can be delivered in as little as 7 to 10 business days.',
    highlights: ['3–5 weeks for full production tooling', '7–10 days for rapid prototypes', 'Complete FAI & biocompatibility testing']
  },

  // 2. International Shipping & Logistics
  {
    id: 'shipping-incoterms',
    category: 'International Shipping',
    question: 'Which Incoterms do you support for international sea and air freight?',
    answer: 'We offer flexible international commercial terms adapted to your national customs framework and institutional preferences. We routinely execute contracts under FOB (Free On Board), CIF (Cost, Insurance & Freight), CFR, EXW, DAP (Delivered at Place), and DDP (Delivered Duty Paid directly to your hospital warehouse or central distributor depot).',
    highlights: ['DDP, DAP, CIF, FOB, and EXW', 'Door-to-door customs clearance', 'Air & Ocean multimodal transport']
  },
  {
    id: 'shipping-packaging-security',
    category: 'International Shipping',
    question: 'How are sterile and fragile medical devices protected during long-haul transit?',
    answer: 'All sterile products are double-sealed in medical-grade Tyvek® / polymer blister packs or tear-resistant pouch barriers equipped with Class 1 chemical sterilization indicators. Outer shippers utilize heavy-duty 5-ply export corrugation with internal moisture barriers, desiccants, and shock-absorption corner blocks. Temperature-controlled refrigerated air containers are utilized for sensitive diagnostic reagents.',
    highlights: ['Medical-grade Tyvek® blister sealing', '5-ply reinforced export corrugation', 'Optional temperature & shock monitoring']
  },
  {
    id: 'shipping-customs-documents',
    category: 'International Shipping',
    question: 'What regulatory and customs clearance documentation is provided with shipments?',
    answer: 'Every consignment is accompanied by a comprehensive regulatory pack: Commercial Invoice, Packing List with batch/lot numbers and expiration dates, Certificate of Origin (COO), Certificate of Analysis (CoA), and Batch Ethylene Oxide (EtO) / Gamma Sterilization Validation Certificates. We also provide consular legalization and embassy stamping when required.',
    highlights: ['Batch-specific Certificates of Analysis', 'Sterilization Validation Certificates', 'Full customs dossier provided ahead of arrival']
  },

  // 3. OEM & Manufacturing Minimums
  {
    id: 'oem-moqs-by-category',
    category: 'OEM & MOQs',
    question: 'What are the Minimum Order Quantities (MOQs) for OEM private labeling and contract manufacturing?',
    answer: 'Our OEM minimums are structured to accommodate both growing medical distributors and large healthcare systems: \n• Catheter & Critical Care Kits (CVP, Dialysis, Pressure Monitoring): 500 to 1,000 units\n• Extruded & Molded Consumables (IV Cannula, Closed Suction, ET Tubes): 2,500 to 5,000 units\n• High-Volume Consumables & Drapes (OT Combos, IV Sets, Gauze): 5,000 to 10,000 units\n• Custom Resin Formulations & Tooling: Project-specific agreements with staggered call-off orders.',
    highlights: ['Low MOQs from 500 units for specialized kits', 'Staggered release schedules for annual contracts', 'Private label branding & custom barcodes']
  },
  {
    id: 'oem-preproduction-samples',
    category: 'OEM & MOQs',
    question: 'Can we evaluate pre-production clinical samples before committing to a full contract?',
    answer: 'Yes. We encourage procurement committees, clinical directors, and biomedical engineers to rigorously evaluate our devices. We provide complimentary or subsidized sample evaluation packs (5 to 10 units) for clinical benchmarking, physical inspection, and tender qualification.',
    highlights: ['5–10 sample units per product line', 'Clinical evaluation documentation', 'Fast courier delivery via DHL/FedEx']
  },
  {
    id: 'oem-custom-combos',
    category: 'OEM & MOQs',
    question: 'Can you manufacture custom surgical procedure packs (OT Combos) with specific component layouts?',
    answer: 'Yes, custom procedural kits are one of our core specialties. You define the exact bill of materials—including drape dimensions, reinforced zones, gowns, suction tubing, bowls, and scalpels. We assemble, seal, and sterilize everything in an ISO Class 7 cleanroom under your hospital or distributor brand name.',
    highlights: ['100% customizable surgical drapes & pack contents', 'Sterile blister or overwrapped packaging', 'Reduces surgical turnover time by up to 35%']
  },

  // 4. Quality & Compliance
  {
    id: 'compliance-cleanroom-standards',
    category: 'Quality & Compliance',
    question: 'What quality certifications and cleanroom standards do your facilities maintain?',
    answer: 'Our manufacturing infrastructure is certified to ISO 13485:2016 (Medical Devices Quality Management Systems) and complies with the European Medical Device Regulation (EU MDR 2017/745). Manufacturing occurs in verified ISO Class 7 (Class 10,000) and ISO Class 8 (Class 100,000) cleanrooms with automated continuous airborne particulate and bioburden monitoring.',
    highlights: ['ISO 13485:2016 certified', 'ISO Class 7 & Class 8 Cleanrooms', 'EU MDR & CE compliance']
  },
  {
    id: 'compliance-sterilization-methods',
    category: 'Quality & Compliance',
    question: 'Which sterilization processes do you utilize, and how is sterility guaranteed?',
    answer: 'Products undergo validated Ethylene Oxide (EtO) sterilization in accordance with ISO 11135 or Gamma Irradiation per ISO 11137. We adhere to a verified Sterility Assurance Level (SAL) of 10⁻⁶. Residual EtO and Ethylene Chlorohydrin levels are tested per ISO 10993-7 to guarantee biocompatibility and patient safety.',
    highlights: ['Validated SAL 10⁻⁶ sterility assurance', 'ISO 11135 & ISO 11137 validated cycles', 'Strict ISO 10993 biocompatibility testing']
  }
];

interface FaqSectionProps {
  onOpenChat: () => void;
  onOpenRfq: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenChat, onOpenRfq }) => {
  const [activeCategory, setActiveCategory] = useState<FaqCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>('lead-time-catalog');

  const categories: FaqCategory[] = [
    'All',
    'Lead Times',
    'International Shipping',
    'OEM & MOQs',
    'Quality & Compliance'
  ];

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.highlights.some(h => h.toLowerCase().includes(q))
      );
    });
  }, [activeCategory, searchQuery]);

  const toggleAccordion = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const expandAll = () => {
    // If all are open or some are open, toggle
    if (expandedId === 'all') {
      setExpandedId(null);
    } else {
      setExpandedId('all');
    }
  };

  return (
    <section id="faq" className="py-20 bg-slate-50 border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-[#0B2F63] text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
            <HelpCircle className="w-4 h-4 text-[#38B6FF]" />
            <span>Procurement & Supply Chain FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Clear, transparent answers regarding production lead times, international freight terms, and OEM contract manufacturing minimums.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 bg-white p-3 rounded-2xl border border-slate-200/90 shadow-xs">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search lead times, Incoterms, MOQs, cleanrooms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 text-sm bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#38B6FF] focus:ring-3 focus:ring-[#38B6FF]/15 rounded-xl transition-all outline-none text-slate-800 placeholder-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Expand / Collapse All */}
            <div className="flex items-center justify-between md:justify-end gap-2 px-1">
              <span className="text-xs text-slate-500 font-medium">
                {filteredFaqs.length} {filteredFaqs.length === 1 ? 'question' : 'questions'}
              </span>
              <button
                onClick={expandAll}
                className="text-xs font-semibold text-[#0B2F63] hover:text-[#38B6FF] transition-colors py-1.5 px-3 rounded-lg hover:bg-slate-100"
              >
                {expandedId === 'all' ? 'Collapse all' : 'Expand all'}
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 mt-4 justify-center">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-[#0B2F63] text-white shadow-sm ring-2 ring-[#0B2F63]/20'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-4xl mx-auto space-y-3.5">
          {filteredFaqs.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
              <HelpCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">No matching questions found</h3>
              <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
                We couldn&apos;t find answers matching &ldquo;{searchQuery}&rdquo;. Ask our AI Procurement Specialist directly or contact our supply team.
              </p>
              <div className="flex items-center justify-center gap-3 mt-4">
                <button
                  onClick={onOpenChat}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#0B2F63] rounded-lg hover:bg-[#164082] transition-colors flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#38B6FF]" />
                  <span>Ask AI Specialist</span>
                </button>
                <button
                  onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  Reset Search
                </button>
              </div>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = expandedId === 'all' || expandedId === faq.id;
              
              // Category icon
              const getCategoryIcon = () => {
                switch (faq.category) {
                  case 'Lead Times':
                    return <Clock className="w-4 h-4 text-amber-500" />;
                  case 'International Shipping':
                    return <Globe2 className="w-4 h-4 text-[#38B6FF]" />;
                  case 'OEM & MOQs':
                    return <Layers className="w-4 h-4 text-emerald-500" />;
                  case 'Quality & Compliance':
                    return <ShieldCheck className="w-4 h-4 text-indigo-500" />;
                  default:
                    return <HelpCircle className="w-4 h-4 text-slate-400" />;
                }
              };

              return (
                <div
                  key={faq.id}
                  className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen 
                      ? 'border-[#38B6FF]/60 shadow-md ring-1 ring-[#38B6FF]/20' 
                      : 'border-slate-200/90 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <div className="mt-0.5 p-1.5 rounded-lg bg-slate-50 border border-slate-100 shrink-0">
                        {getCategoryIcon()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                            {faq.category}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                          {faq.question}
                        </h3>
                      </div>
                    </div>
                    <div className={`p-2 rounded-full bg-slate-50 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 bg-blue-50 text-[#0B2F63]' : 'text-slate-400'}`}>
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-slate-600 border-t border-slate-100 sm:pl-14">
                      <div className="text-sm sm:text-base leading-relaxed text-slate-700 whitespace-pre-line mb-4">
                        {faq.answer}
                      </div>

                      {/* Key Highlights Pill Badges */}
                      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1">
                          Key Points:
                        </span>
                        {faq.highlights.map((h, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200/60"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{h}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Live Help & AI Assistance Card */}
        <div className="max-w-4xl mx-auto mt-12 bg-gradient-to-br from-[#0B2F63] via-[#0E3A7B] to-[#164A96] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-[#38B6FF]/15 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#38B6FF] text-xs font-bold uppercase tracking-wider mb-2 backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instant Consultation Available</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                Have specific hospital tender or custom OEM specifications?
              </h3>
              <p className="mt-2 text-sm text-slate-200 leading-relaxed">
                Our multi-turn AI Procurement Specialist is trained on our complete ISO 13485 catalog, cleanroom capabilities, and international logistics framework.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 shrink-0 w-full md:w-auto">
              <button
                onClick={onOpenChat}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-[#38B6FF] hover:bg-[#20a4f5] text-[#0B2F63] shadow-md transition-all active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-[#0B2F63]" />
                <span>Chat with AI Specialist</span>
              </button>

              <button
                onClick={onOpenRfq}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all active:scale-95"
              >
                <FileText className="w-4 h-4 text-[#38B6FF]" />
                <span>Request Custom Quote</span>
              </button>
            </div>
          </div>

          {/* Direct Contact Links Strip */}
          <div className="mt-6 pt-5 border-t border-white/15 flex flex-wrap items-center justify-center md:justify-start gap-6 text-xs text-slate-300">
            <span className="font-semibold text-white">Direct Contacts:</span>
            <a 
              href="tel:+13075334504" 
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#38B6FF]" />
              <span>+1 (307) 533-4504</span>
            </a>
            <a 
              href="mailto:info@securemeditechglobal.com" 
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#38B6FF]" />
              <span>info@securemeditechglobal.com</span>
            </a>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span className="text-slate-300">Sheridan, WY 82801, USA</span>
          </div>
        </div>

      </div>
    </section>
  );
};
