import React, { useState } from 'react';
import { Menu, X, ChevronDown, FileText } from 'lucide-react';
import { ProductCategory } from '../types';

interface NavbarProps {
  onOpenRfq: () => void;
  quoteCount: number;
  onSelectCategory: (category: ProductCategory) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenRfq,
  quoteCount,
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
          <a href="#" className="flex items-center group shrink-0">
            <img
              src="/assets/aistudio/2026-10-24_7-15-55_PM_1fbce34f.png"
              alt="Secure MediTech Global"
              className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">
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
                className="flex items-center gap-1 hover:text-[#0B2F63] transition-colors py-2 focus:outline-none"
              >
                <span>Categories</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${categoriesDropdownOpen ? 'rotate-180 text-[#38B6FF]' : 'text-slate-400'}`} />
              </button>

              {categoriesDropdownOpen && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-2.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
                    Clinical Divisions
                  </div>
                  <button
                    onClick={() => handleCategoryClick('Critical Care & Monitoring')}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-[#0B2F63] transition-colors flex items-center justify-between"
                  >
                    <span>Critical Care & Monitoring</span>
                    <span className="text-[10px] text-slate-400">CVP, Monitors</span>
                  </button>
                  <button
                    onClick={() => handleCategoryClick('Anesthesia & Airway Management')}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-[#0B2F63] transition-colors flex items-center justify-between"
                  >
                    <span>Anesthesia & Airway</span>
                    <span className="text-[10px] text-slate-400">ET Tubes, Needles</span>
                  </button>
                  <button
                    onClick={() => handleCategoryClick('IV & Infusion Supplies')}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-[#0B2F63] transition-colors flex items-center justify-between"
                  >
                    <span>IV & Infusion Supplies</span>
                    <span className="text-[10px] text-slate-400">Cannula, IV Sets</span>
                  </button>
                  <button
                    onClick={() => handleCategoryClick('Respiratory Care')}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-[#0B2F63] transition-colors flex items-center justify-between"
                  >
                    <span>Respiratory Care</span>
                    <span className="text-[10px] text-slate-400">NIV, Suction</span>
                  </button>
                  <button
                    onClick={() => handleCategoryClick('Urology & Catheters')}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-[#0B2F63] transition-colors flex items-center justify-between"
                  >
                    <span>Urology & Catheters</span>
                    <span className="text-[10px] text-slate-400">Foley Silicone</span>
                  </button>
                  <button
                    onClick={() => handleCategoryClick('Dialysis Supplies')}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-[#0B2F63] transition-colors flex items-center justify-between"
                  >
                    <span>Dialysis Supplies</span>
                    <span className="text-[10px] text-slate-400">Dual/Triple Lumen</span>
                  </button>
                  <button
                    onClick={() => handleCategoryClick('Surgical & OT Supplies')}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-[#0B2F63] transition-colors flex items-center justify-between"
                  >
                    <span>Surgical & OT Supplies</span>
                    <span className="text-[10px] text-slate-400">OT Combos, Gloves</span>
                  </button>
                  <button
                    onClick={() => handleCategoryClick('Laboratory & Diagnostics')}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-[#0B2F63] transition-colors flex items-center justify-between"
                  >
                    <span>Laboratory & Diagnostics</span>
                    <span className="text-[10px] text-slate-400">Analyzers, Reagents</span>
                  </button>
                  <div className="border-t border-slate-100 mt-1 pt-1">
                    <button
                      onClick={() => handleCategoryClick('All')}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-[#0B2F63] hover:bg-blue-50/50 transition-colors"
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
              href="#contact" 
              className="hover:text-[#0B2F63] transition-colors py-2 whitespace-nowrap"
            >
              Contact Us
            </a>
          </nav>

          {/* Action Buttons Zone */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {/* Request a Quote (RFQ) - Tech Blue */}
            <button
              onClick={onOpenRfq}
              className="relative inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#0B2F63] hover:bg-[#164082] rounded-lg shadow-sm hover:shadow-md transition-all active:scale-95 group"
            >
              <FileText className="w-4 h-4 text-[#38B6FF]" />
              <span>Request a Quote (RFQ)</span>
              {quoteCount > 0 && (
                <span className="flex items-center justify-center w-5 h-5 text-[11px] font-bold text-white bg-[#10B981] rounded-full ring-2 ring-white animate-pulse">
                  {quoteCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenRfq}
              className="p-2 text-[#0B2F63] hover:bg-slate-100 rounded-lg relative"
              aria-label="View RFQ items"
            >
              <FileText className="w-5 h-5" />
              {quoteCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 text-[9px] font-bold text-white bg-[#10B981] rounded-full flex items-center justify-center">
                  {quoteCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-[#0B2F63] hover:bg-slate-100 rounded-lg focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-3 text-sm font-medium text-slate-800">
            <a 
              href="#home" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-[#0B2F63]"
            >
              Home
            </a>

            <div className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Product Categories
            </div>
            <div className="grid grid-cols-2 gap-2 pl-2">
              <button
                onClick={() => handleCategoryClick('Critical Care & Monitoring')}
                className="text-left px-3 py-1.5 text-xs text-slate-600 hover:text-[#0B2F63] hover:bg-slate-50 rounded"
              >
                Critical Care
              </button>
              <button
                onClick={() => handleCategoryClick('Anesthesia & Airway Management')}
                className="text-left px-3 py-1.5 text-xs text-slate-600 hover:text-[#0B2F63] hover:bg-slate-50 rounded"
              >
                Anesthesia & Airway
              </button>
              <button
                onClick={() => handleCategoryClick('IV & Infusion Supplies')}
                className="text-left px-3 py-1.5 text-xs text-slate-600 hover:text-[#0B2F63] hover:bg-slate-50 rounded"
              >
                IV & Infusion
              </button>
              <button
                onClick={() => handleCategoryClick('Respiratory Care')}
                className="text-left px-3 py-1.5 text-xs text-slate-600 hover:text-[#0B2F63] hover:bg-slate-50 rounded"
              >
                Respiratory Care
              </button>
              <button
                onClick={() => handleCategoryClick('Urology & Catheters')}
                className="text-left px-3 py-1.5 text-xs text-slate-600 hover:text-[#0B2F63] hover:bg-slate-50 rounded"
              >
                Urology & Catheters
              </button>
              <button
                onClick={() => handleCategoryClick('Dialysis Supplies')}
                className="text-left px-3 py-1.5 text-xs text-slate-600 hover:text-[#0B2F63] hover:bg-slate-50 rounded"
              >
                Dialysis Supplies
              </button>
              <button
                onClick={() => handleCategoryClick('Surgical & OT Supplies')}
                className="text-left px-3 py-1.5 text-xs text-slate-600 hover:text-[#0B2F63] hover:bg-slate-50 rounded"
              >
                Surgical & OT
              </button>
              <button
                onClick={() => handleCategoryClick('Laboratory & Diagnostics')}
                className="text-left px-3 py-1.5 text-xs text-slate-600 hover:text-[#0B2F63] hover:bg-slate-50 rounded"
              >
                Lab & Diagnostics
              </button>
            </div>

            <a 
              href="#oem" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-[#0B2F63]"
            >
              OEM & Manufacturing
            </a>

            <a 
              href="#compliance" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-[#0B2F63]"
            >
              Quality & Compliance
            </a>

            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-[#0B2F63]"
            >
              Contact Us
            </a>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRfq();
                }}
                className="w-full py-2.5 text-xs font-bold text-center text-white bg-[#0B2F63] rounded-lg shadow-sm flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4 text-[#38B6FF]" />
                <span>Request a Quote (RFQ)</span>
                {quoteCount > 0 && (
                  <span className="w-5 h-5 text-[11px] font-bold text-white bg-[#10B981] rounded-full flex items-center justify-center">
                    {quoteCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
