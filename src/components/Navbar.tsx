'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, ChevronDown, ClipboardList } from 'lucide-react';
import { NavbarSearch } from './NavbarSearch';
import { ProductCategory } from '../types';
import { toCategorySlug } from '../lib/site';

interface NavbarProps {
  onOpenRfq?: () => void;
  quoteCount?: number;
  onSelectCategory?: (category: ProductCategory) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenRfq,
  quoteCount = 0,
  onSelectCategory
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const router = useRouter();

  const handleCategoryClick = (category: ProductCategory) => {
    setCategoriesDropdownOpen(false);
    setMobileMenuOpen(false);
    const catalogElement = typeof document !== 'undefined' ? document.getElementById('products') : null;
    if (catalogElement && onSelectCategory) {
      onSelectCategory(category);
      catalogElement.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (category === 'All') {
      router.push('/products');
    } else {
      router.push(`/products/category/${toCategorySlug(category)}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo Zone with Official Logo */}
          <Link href="/" className="flex items-center group shrink-0" aria-label="Secure MediTech Global home">
            <Image
              src="/assets/webp/logo.webp"
              alt="Secure MediTech Global — Medical Equipment & OEM Manufacturer Logo"
              className="h-10 sm:h-11 w-auto object-contain"
              width={260}
              height={72}
              priority
              referrerPolicy="no-referrer"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-[14px] xl:text-[15px] font-medium text-slate-700" aria-label="Primary">
            <Link 
              href="/" 
              className="hover:text-[#223752] transition-colors py-2 whitespace-nowrap"
            >
              Home
            </Link>

            {/* Categories Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setCategoriesDropdownOpen(true)}
              onMouseLeave={() => setCategoriesDropdownOpen(false)}
            >
              <button 
                onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                className="flex items-center gap-1 hover:text-[#223752] transition-colors py-2"
                aria-expanded={categoriesDropdownOpen}
                aria-haspopup="true"
              >
                <span>Categories</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${categoriesDropdownOpen ? 'rotate-180 text-[#3B6B91]' : 'text-slate-400'}`} />
              </button>

              {categoriesDropdownOpen && (
                <div className="absolute top-full -left-4 w-80 bg-white rounded-2xl shadow-xl ring-1 ring-slate-900/5 p-2 z-50">
                  <div className="px-3 pt-2 pb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
                    Clinical Divisions
                  </div>
                  <button
                    onClick={() => handleCategoryClick('Critical Care & Monitoring')}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#223752] transition-colors flex items-center justify-between gap-3"
                  >
                    <span>Critical Care & Monitoring</span>
                    <span className="text-xs text-slate-400 whitespace-nowrap">CVP, Monitors</span>
                  </button>
                  <button
                    onClick={() => handleCategoryClick('Anesthesia & Airway Management')}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#223752] transition-colors flex items-center justify-between gap-3"
                  >
                    <span>Anesthesia & Airway</span>
                    <span className="text-xs text-slate-400 whitespace-nowrap">ET Tubes, Needles</span>
                  </button>
                  <button
                    onClick={() => handleCategoryClick('IV & Infusion Supplies')}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#223752] transition-colors flex items-center justify-between gap-3"
                  >
                    <span>IV & Infusion Supplies</span>
                    <span className="text-xs text-slate-400 whitespace-nowrap">Cannula, IV Sets</span>
                  </button>
                  <button
                    onClick={() => handleCategoryClick('Respiratory Care')}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#223752] transition-colors flex items-center justify-between gap-3"
                  >
                    <span>Respiratory Care</span>
                    <span className="text-xs text-slate-400 whitespace-nowrap">NIV, Suction</span>
                  </button>
                  <button
                    onClick={() => handleCategoryClick('Urology & Catheters')}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#223752] transition-colors flex items-center justify-between gap-3"
                  >
                    <span>Urology & Catheters</span>
                    <span className="text-xs text-slate-400 whitespace-nowrap">Foley Silicone</span>
                  </button>
                  <button
                    onClick={() => handleCategoryClick('Dialysis Supplies')}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#223752] transition-colors flex items-center justify-between gap-3"
                  >
                    <span>Dialysis Supplies</span>
                    <span className="text-xs text-slate-400 whitespace-nowrap">Dual/Triple Lumen</span>
                  </button>
                  <button
                    onClick={() => handleCategoryClick('Surgical & OT Supplies')}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#223752] transition-colors flex items-center justify-between gap-3"
                  >
                    <span>Surgical & OT Supplies</span>
                    <span className="text-xs text-slate-400 whitespace-nowrap">OT Combos, Gloves</span>
                  </button>
                  <button
                    onClick={() => handleCategoryClick('Laboratory & Diagnostics')}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#223752] transition-colors flex items-center justify-between gap-3"
                  >
                    <span>Laboratory & Diagnostics</span>
                    <span className="text-xs text-slate-400 whitespace-nowrap">Analyzers, Reagents</span>
                  </button>
                  <div className="border-t border-slate-100 mt-2 pt-2 space-y-1">
                    <Link
                      href="/products"
                      onClick={() => setCategoriesDropdownOpen(false)}
                      className="block w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-[#223752] hover:bg-[#F1F5F8] transition-colors"
                    >
                      View All Products →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link 
              href="/oem-manufacturing" 
              className="hover:text-[#223752] transition-colors py-2 whitespace-nowrap"
            >
              OEM Manufacturing
            </Link>

            <Link 
              href="/services" 
              className="hover:text-[#223752] transition-colors py-2 whitespace-nowrap"
            >
              Services
            </Link>

            <Link 
              href="/about" 
              className="hover:text-[#223752] transition-colors py-2 whitespace-nowrap"
            >
              About Us
            </Link>

            <Link 
              href="/blog" 
              className="hover:text-[#223752] transition-colors py-2 whitespace-nowrap"
            >
              Blog
            </Link>

            <Link 
              href="/contact" 
              className="hover:text-[#223752] transition-colors py-2 whitespace-nowrap"
            >
              Contact Us
            </Link>
          </nav>

          {/* Right Action Cluster: Full-Site Search + RFQ items count + LinkedIn + Mobile Menu */}
          <div className="flex items-center gap-2.5 flex-1 md:flex-initial justify-end">
            <div className="hidden md:block flex-1 lg:flex-none md:w-64 lg:w-48 xl:w-60">
              <NavbarSearch variant="desktop" />
            </div>
            {quoteCount > 0 && (
              <button
                onClick={onOpenRfq}
                className="relative inline-flex items-center gap-1.5 h-10 px-3 text-xs font-bold text-white bg-[#223752] hover:bg-[#2E496B] rounded-xl transition-colors shadow-xs"
                aria-label={`Open quotation request (${quoteCount} items)`}
                title="View quotation items"
              >
                <ClipboardList className="w-4 h-4 text-[#8CB3D4]" />
                <span className="min-w-5 h-5 px-1.5 rounded-full bg-[#DCE7F2] text-[#19293F] text-xs font-bold leading-5 text-center tabular-nums">
                  {quoteCount}
                </span>
              </button>
            )}

            {/* LinkedIn Icon Button */}
            <a
              href="https://www.linkedin.com/company/144075515/admin/dashboard/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Secure MediTech Global LinkedIn"
              title="Connect with Secure MediTech Global on LinkedIn"
              className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-[#0077B5] text-slate-700 hover:text-white flex items-center justify-center transition-all border border-slate-200/80 shadow-2xs group"
            >
              <svg className="w-4 h-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-[#223752] hover:bg-slate-100 rounded-lg"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Full-Site Search Bar */}
        <div className="md:hidden pb-2.5">
          <NavbarSearch variant="mobile" onNavigate={() => setMobileMenuOpen(false)} />
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-4 pt-3 pb-6 shadow-xl max-h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="flex flex-col gap-1 text-base font-medium text-slate-800">
            <Link 
              href="/" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-3 rounded-lg hover:bg-slate-50 hover:text-[#223752]"
            >
              Home
            </Link>
            <Link 
              href="/products" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-3 rounded-lg hover:bg-slate-50 hover:text-[#223752]"
            >
              All Products Catalog
            </Link>

            <div className="px-3 pt-3 pb-1 text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
              Product Categories
            </div>
            <div className="grid grid-cols-2 gap-1 pb-2">
              <button
                onClick={() => handleCategoryClick('Critical Care & Monitoring')}
                className="text-left px-3 py-2.5 text-sm text-slate-600 hover:text-[#223752] hover:bg-slate-50 rounded-lg"
              >
                Critical Care
              </button>
              <button
                onClick={() => handleCategoryClick('Anesthesia & Airway Management')}
                className="text-left px-3 py-2.5 text-sm text-slate-600 hover:text-[#223752] hover:bg-slate-50 rounded-lg"
              >
                Anesthesia & Airway
              </button>
              <button
                onClick={() => handleCategoryClick('IV & Infusion Supplies')}
                className="text-left px-3 py-2.5 text-sm text-slate-600 hover:text-[#223752] hover:bg-slate-50 rounded-lg"
              >
                IV & Infusion
              </button>
              <button
                onClick={() => handleCategoryClick('Respiratory Care')}
                className="text-left px-3 py-2.5 text-sm text-slate-600 hover:text-[#223752] hover:bg-slate-50 rounded-lg"
              >
                Respiratory Care
              </button>
              <button
                onClick={() => handleCategoryClick('Urology & Catheters')}
                className="text-left px-3 py-2.5 text-sm text-slate-600 hover:text-[#223752] hover:bg-slate-50 rounded-lg"
              >
                Urology & Catheters
              </button>
              <button
                onClick={() => handleCategoryClick('Dialysis Supplies')}
                className="text-left px-3 py-2.5 text-sm text-slate-600 hover:text-[#223752] hover:bg-slate-50 rounded-lg"
              >
                Dialysis Supplies
              </button>
              <button
                onClick={() => handleCategoryClick('Surgical & OT Supplies')}
                className="text-left px-3 py-2.5 text-sm text-slate-600 hover:text-[#223752] hover:bg-slate-50 rounded-lg"
              >
                Surgical & OT
              </button>
              <button
                onClick={() => handleCategoryClick('Laboratory & Diagnostics')}
                className="text-left px-3 py-2.5 text-sm text-slate-600 hover:text-[#223752] hover:bg-slate-50 rounded-lg"
              >
                Lab & Diagnostics
              </button>
            </div>

            <Link 
              href="/oem-manufacturing" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-3 rounded-lg hover:bg-slate-50 hover:text-[#223752]"
            >
              OEM Manufacturing
            </Link>

            <Link 
              href="/services" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-3 rounded-lg hover:bg-slate-50 hover:text-[#223752]"
            >
              Services
            </Link>

            <Link 
              href="/about" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-3 rounded-lg hover:bg-slate-50 hover:text-[#223752]"
            >
              About Us
            </Link>

            <Link 
              href="/blog" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-3 rounded-lg hover:bg-slate-50 hover:text-[#223752]"
            >
              Procurement Blog
            </Link>

            <Link 
              href="/markets" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-3 rounded-lg hover:bg-slate-50 hover:text-[#223752]"
            >
              Global Export Markets
            </Link>

            <Link 
              href="/contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-3 rounded-lg hover:bg-slate-50 hover:text-[#223752]"
            >
              Contact Us
            </Link>

            {/* Mobile LinkedIn Action */}
            <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between px-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Official Network</span>
              <a
                href="https://www.linkedin.com/company/144075515/admin/dashboard/"
                target="_blank"
                rel="noopener noreferrer"
                title="Connect with Secure MediTech Global on LinkedIn"
                aria-label="Secure MediTech Global LinkedIn"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0077B5] text-white text-xs font-semibold hover:bg-[#005f93] transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
