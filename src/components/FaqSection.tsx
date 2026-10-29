'use client';

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
  CheckCircle2
} from 'lucide-react';
import { FAQ_DATA, FaqCategory } from '../data/faqs';
import { SectionHeader } from './SectionHeader';

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
    <section id="faq" className="py-20 sm:py-24 bg-[#F8FAFC] border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          className="mb-12"
          align="center"
          eyebrow="Procurement & Supply Chain FAQ"
          icon={<HelpCircle />}
          title="Frequently Asked Questions"
          description="Clear answers on production lead times, international freight terms, and OEM contract manufacturing minimums."
        />

        {/* Search & Filter Toolbar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 bg-white p-3 rounded-2xl border border-slate-200/90 shadow-xs">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                aria-label="Search FAQs"
                placeholder="Search lead times, Incoterms, MOQs, cleanrooms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-11 pr-16 text-base sm:text-sm bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#38B6FF] focus:ring-3 focus:ring-[#38B6FF]/15 rounded-xl transition-all outline-none text-slate-800 placeholder-slate-400"
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
              <span className="text-sm text-slate-500 font-medium tabular-nums">
                {filteredFaqs.length} {filteredFaqs.length === 1 ? 'question' : 'questions'}
              </span>
              <button
                onClick={expandAll}
                className="text-sm font-semibold text-[#0B2F63] hover:text-sky-600 transition-colors h-10 px-3 rounded-lg hover:bg-slate-100"
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
                  className={`h-10 px-4 rounded-full text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#0B2F63] text-white shadow-sm'
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
                  className="h-10 px-4 text-sm font-bold text-white bg-[#0B2F63] rounded-xl hover:bg-[#164082] transition-colors inline-flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#38B6FF]" />
                  <span>Ask AI Specialist</span>
                </button>
                <button
                  onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                  className="h-10 px-4 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
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
                    className="w-full text-left p-4 sm:p-6 flex items-start justify-between gap-4"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <div className="mt-0.5 p-1.5 rounded-lg bg-slate-50 border border-slate-100 shrink-0">
                        {getCategoryIcon()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            {faq.category}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-[#0B2F63] leading-snug">
                          {faq.question}
                        </h3>
                      </div>
                    </div>
                    <div className={`p-2 rounded-full bg-slate-50 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 bg-blue-50 text-[#0B2F63]' : 'text-slate-400'}`}>
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-6 pb-6 pt-4 text-slate-600 border-t border-slate-100 sm:pl-[4.25rem]">
                      <div className="text-[15px] sm:text-base leading-relaxed text-slate-700 whitespace-pre-line mb-4 max-w-prose">
                        {faq.answer}
                      </div>

                      {/* Key Highlights Pill Badges */}
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        {faq.highlights.map((h, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium bg-emerald-50 text-emerald-800 border border-emerald-100"
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#38B6FF] text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instant Consultation Available</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-snug text-white">
                Have specific hospital tender or custom OEM specifications?
              </h3>
              <p className="mt-2 text-sm sm:text-base text-slate-200 leading-relaxed">
                Our multi-turn AI Procurement Specialist is trained on our complete ISO 13485 catalog, cleanroom capabilities, and international logistics framework.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 shrink-0 w-full md:w-auto">
              <button
                onClick={onOpenChat}
                className="inline-flex items-center justify-center gap-2 h-12 px-5 rounded-xl text-sm font-bold bg-[#38B6FF] hover:bg-[#5cc4ff] text-[#071E40] shadow-md transition-all active:scale-[0.98] whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 text-[#0B2F63]" />
                <span>Chat with AI Specialist</span>
              </button>

              <button
                onClick={onOpenRfq}
                className="inline-flex items-center justify-center gap-2 h-12 px-5 rounded-xl text-sm font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all active:scale-[0.98] whitespace-nowrap"
              >
                <FileText className="w-4 h-4 text-[#38B6FF]" />
                <span>Request Custom Quote</span>
              </button>
            </div>
          </div>

          {/* Direct Contact Links Strip */}
          <div className="mt-6 pt-5 border-t border-white/15 flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-sm text-slate-300">
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
