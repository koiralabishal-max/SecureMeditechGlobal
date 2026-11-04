'use client';

import React, { useState } from 'react';
import { Menu, X, ChevronDown, ClipboardList } from 'lucide-react';
import { ProductCategory } from '../types';

interface NavbarProps {
  onOpenRfq?: () => void;
  quoteCount?: number;
  onSelectCategory: (category: ProductCategory) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenRfq,
  quoteCount = 0,
  onSelectCategory
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);

  const handleCategoryClick = (category: ProductCategory) => {
    onSelectCategory(category);
    setCategoriesDropdownOpen(false);
    setMobileMenuOpen(false);
    const catalogElement = document.getElementById('products');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo Zone with Official Logo */}
          <a href="#home" className="flex items-center group shrink-0" aria-label="Secure MediTech Global home">
            <img
              src="/logo.png"
              alt="Secure MediTech Global"
              className="h-10 sm:h-11 w-auto object-contain"
              width={979}
              height={271}
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[15px] font-medium text-slate-700" aria-label="Primary">
            <a 
              href="#home" 
              className="hover:text-[#0B2F63] transition-colors py-2"
            >
              Home
            </a>

            {/* Categories Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setCategoriesDropdownOpen(true)}
              onMouseLeave={() => setCategoriesDropdownOpen(false)}
            >
              <button 
                onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                className="flex items-center gap-1 hover:text-[#0B2F63] transition-colors py-2"
                aria-expanded={categoriesDropdownOpen}
                aria-haspopup="true"
              >
                <span>Categories</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${categoriesDropdownOpen ? 'rotate-180 text-[#38B6FF]' : 'text-slate-400'}`} />
              </button>

              {categoriesDropdownOpen && (
                <div className="absolute top-full -left-4 w-80 bg-white rounded-2xl shadow-xl ring-1 ring-slate-900/5 p-2 z-50">
                  <div className="px-3 pt-2 pb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
                    Clinical Divisions
                  </div>
                  <button
                    onClick={() => handleCategoryClick('Critical Care & Monitoring')}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#0B2F63] transition-colors flex items-center justify-between gap-3"
                  >
                    <span>Critical Care & Monitoring</span>
                    <span className="text-xs text-slate-400 whitespace-nowrap">CVP, Monitors</span>
                  </button>
                  <button
                    onClick={() => handleCategoryClick('Anesthesia & Airway Management')}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#0B2F63] transition-colors flex items-center justify-between gap-3"
                  >
                    <span>Anesthesia & Airway</span>
                    <span className="text-xs text-slate-400 whitespace-nowrap">ET Tubes, Needles</span>
                  </button>
                  <button
                    onClick={() => handleCategoryClick('IV & Infusion Supplies')}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#0B2F63] transition-colors flex items-center justify-between gap-3"
                  >
                    <span>IV & Infusion Supplies</span>
                    <span className="text-xs text-slate-400 whitespace-nowrap">Cannula, IV Sets</span>
                  </button>
                  <button
                    onClick={() => handleCategoryClick('Respiratory Care')}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#0B2F63] transition-colors flex items-center justify-between gap-3"
                  >
                    <span>Respiratory Care</span>
                    <span className="text-xs text-slate-400 whitespace-nowrap">NIV, Suction</span>
                  </button>
                  <button
                    onClick={() => handleCategoryClick('Urology & Catheters')}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#0B2F63] transition-colors flex items-center justify-between gap-3"
                  >
                    <span>Urology & Catheters</span>
                    <span className="text-xs text-slate-400 whitespace-nowrap">Foley Silicone</span>
                  </button>
                  <button
                    onClick={() => handleCategoryClick('Dialysis Supplies')}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#0B2F63] transition-colors flex items-center justify-between gap-3"
                  >
                    <span>Dialysis Supplies</span>
                    <span className="text-xs text-slate-400 whitespace-nowrap">Dual/Triple Lumen</span>
                  </button>
                  <button
                    onClick={() => handleCategoryClick('Surgical & OT Supplies')}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#0B2F63] transition-colors flex items-center justify-between gap-3"
                  >
                    <span>Surgical & OT Supplies</span>
                    <span className="text-xs text-slate-400 whitespace-nowrap">OT Combos, Gloves</span>
                  </button>
                  <button
                    onClick={() => handleCategoryClick('Laboratory & Diagnostics')}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#0B2F63] transition-colors flex items-center justify-between gap-3"
                  >
                    <span>Laboratory & Diagnostics</span>
                    <span className="text-xs text-slate-400 whitespace-nowrap">Analyzers, Reagents</span>
                  </button>
                  <div className="border-t border-slate-100 mt-2 pt-2">
                    <button
                      onClick={() => handleCategoryClick('All')}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-[#0B2F63] hover:bg-sky-50 transition-colors"
                    >
                      View All Products →
                    </button>
                  </div>
                </div>
              )}
            </div>

            <a 
              href="#oem" 
              className="hover:text-[#0B2F63] transition-colors py-2 whitespace-nowrap"
            >
              OEM & Manufacturing
            </a>

            <a 
              href="#compliance" 
              className="hover:text-[#0B2F63] transition-colors py-2 whitespace-nowrap"
            >
              Quality & Compliance
            </a>

            <a 
              href="#faq" 
              className="hover:text-[#0B2F63] transition-colors py-2 whitespace-nowrap"
            >
              FAQ
            </a>

            <a 
              href="#price-calculator" 
              className="hover:text-[#0B2F63] text-[#0B2F63] font-semibold transition-colors py-2 whitespace-nowrap flex items-center gap-1"
            >
              <span>Price Calculator</span>
            </a>

            <a 
              href="#contact" 
              className="hover:text-[#0B2F63] transition-colors py-2 whitespace-nowrap"
            >
              Contact Us
            </a>
          </nav>

          {/* RFQ basket + mobile menu */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenRfq}
              className="relative inline-flex items-center gap-2 h-10 sm:h-11 px-3.5 sm:px-5 text-sm font-bold text-white bg-[#0B2F63] hover:bg-[#164082] rounded-xl transition-colors"
              aria-label={`Open quotation request${quoteCount ? ` (${quoteCount} items)` : ''}`}
            >
              <ClipboardList className="w-4 h-4 text-[#38B6FF]" />
              <span className="hidden sm:inline">Request Quote</span>
              {quoteCount > 0 && (
                <span className="min-w-5 h-5 px-1.5 rounded-full bg-[#38B6FF] text-[#071E40] text-xs font-bold leading-5 text-center tabular-nums">
                  {quoteCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-[#0B2F63] hover:bg-slate-100 rounded-lg"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-4 pt-3 pb-6 shadow-xl max-h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="flex flex-col gap-1 text-base font-medium text-slate-800">
            <a 
              href="#home" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-3 rounded-lg hover:bg-slate-50 hover:text-[#0B2F63]"
            >
              Home
            </a>

            <div className="px-3 pt-3 pb-1 text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
              Product Categories
            </div>
            <div className="grid grid-cols-2 gap-1 pb-2">
              <button
                onClick={() => handleCategoryClick('Critical Care & Monitoring')}
                className="text-left px-3 py-2.5 text-sm text-slate-600 hover:text-[#0B2F63] hover:bg-slate-50 rounded-lg"
              >
                Critical Care
              </button>
              <button
                onClick={() => handleCategoryClick('Anesthesia & Airway Management')}
                className="text-left px-3 py-2.5 text-sm text-slate-600 hover:text-[#0B2F63] hover:bg-slate-50 rounded-lg"
              >
                Anesthesia & Airway
              </button>
              <button
                onClick={() => handleCategoryClick('IV & Infusion Supplies')}
                className="text-left px-3 py-2.5 text-sm text-slate-600 hover:text-[#0B2F63] hover:bg-slate-50 rounded-lg"
              >
                IV & Infusion
              </button>
              <button
                onClick={() => handleCategoryClick('Respiratory Care')}
                className="text-left px-3 py-2.5 text-sm text-slate-600 hover:text-[#0B2F63] hover:bg-slate-50 rounded-lg"
              >
                Respiratory Care
              </button>
              <button
                onClick={() => handleCategoryClick('Urology & Catheters')}
                className="text-left px-3 py-2.5 text-sm text-slate-600 hover:text-[#0B2F63] hover:bg-slate-50 rounded-lg"
              >
                Urology & Catheters
              </button>
              <button
                onClick={() => handleCategoryClick('Dialysis Supplies')}
                className="text-left px-3 py-2.5 text-sm text-slate-600 hover:text-[#0B2F63] hover:bg-slate-50 rounded-lg"
              >
                Dialysis Supplies
              </button>
              <button
                onClick={() => handleCategoryClick('Surgical & OT Supplies')}
                className="text-left px-3 py-2.5 text-sm text-slate-600 hover:text-[#0B2F63] hover:bg-slate-50 rounded-lg"
              >
                Surgical & OT
              </button>
              <button
                onClick={() => handleCategoryClick('Laboratory & Diagnostics')}
                className="text-left px-3 py-2.5 text-sm text-slate-600 hover:text-[#0B2F63] hover:bg-slate-50 rounded-lg"
              >
                Lab & Diagnostics
              </button>
            </div>

            <a 
              href="#oem" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-3 rounded-lg hover:bg-slate-50 hover:text-[#0B2F63]"
            >
              OEM & Manufacturing
            </a>

            <a 
              href="#compliance" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-3 rounded-lg hover:bg-slate-50 hover:text-[#0B2F63]"
            >
              Quality & Compliance
            </a>

            <a 
              href="#faq" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-3 rounded-lg hover:bg-slate-50 hover:text-[#0B2F63]"
            >
              FAQ
            </a>

            <a 
              href="#price-calculator" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg bg-blue-50/70 text-[#0B2F63] font-bold hover:bg-blue-100"
            >
              Wholesale Price Calculator
            </a>

            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-3 rounded-lg hover:bg-slate-50 hover:text-[#0B2F63]"
            >
              Contact Us
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
