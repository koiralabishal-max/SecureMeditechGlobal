'use client';

import React, { useState } from 'react';
import { ShieldCheck, Mail, ArrowRight, CheckCircle2, Globe2, Calculator } from 'lucide-react';
import { PriceEstimationCalculator } from './PriceEstimationCalculator';
import { Product } from '../types';

interface FooterProps {
  onTransferToRfq?: (product: Product, quantity: number, notes: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onTransferToRfq }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail)) return;
    setNewsletterSubscribed(true);
  };

  return (
    <footer className="bg-[#071E40] text-slate-300 border-t border-slate-800">
      
      {/* Newsletter & Global Advisory Strip */}
      <div className="border-b border-slate-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-[#38B6FF]" />
              <span>Regulatory & Global Supply Bulletins</span>
            </h2>
            <p className="text-sm text-slate-400 mt-1.5 max-w-xl leading-relaxed">
              Quarterly briefings on CE MDR amendments, global ocean freight container updates, and new OEM medical device releases.
            </p>
          </div>

          <div className="w-full md:w-auto">
            {newsletterSubscribed ? (
              <div className="flex items-center gap-2 text-sm font-semibold text-[#10B981] bg-emerald-950/40 border border-emerald-800/60 px-4 py-2.5 rounded-xl">
                <CheckCircle2 className="w-4 h-4" />
                <span>Subscription confirmed. Welcome to the procurement bulletin.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2 md:w-[26rem] w-full">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter institutional work email..."
                    aria-label="Work email"
                    className="w-full h-11 pl-9 pr-3 bg-slate-900 text-base sm:text-sm text-white placeholder-slate-500 rounded-xl border border-slate-700 focus:outline-none focus:border-[#38B6FF]"
                  />
                </div>
                <button
                  type="submit"
                  className="h-11 px-4 bg-[#38B6FF] hover:bg-[#5cc4ff] text-[#071E40] text-sm font-bold rounded-xl transition-colors shrink-0 flex items-center gap-1.5"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* B2B Wholesale Price Estimation Calculator Tool Section */}
      <div id="price-calculator" className="border-b border-slate-800 py-12 bg-[#051730]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#38B6FF] mb-1">
                <Calculator className="w-4 h-4" />
                <span>Hospital & Institutional Procurement Tool</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Budgetary Price & Volume Calculator
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                Simulate bulk order volumes across clinical categories to estimate FOB, CIF, or DDP budgetary ranges and volume tier concessions before placing a formal RFQ.
              </p>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Incoterms 2020 · CE MDR & ISO 13485 Verified
            </div>
          </div>

          <PriceEstimationCalculator onTransferToRfq={onTransferToRfq} />
        </div>
      </div>

      {/* Main Navigation Links Grid */}
      <div className="py-14 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info & Socials */}
          <div className="sm:col-span-2 space-y-5">
            <div className="bg-white/95 p-3 rounded-xl border border-white/20 shadow-sm inline-block max-w-[260px]">
              <img
                src="/logo.png"
                alt="Secure MediTech Global"
                width={979}
                height={271}
                className="h-10 w-auto object-contain"
              />
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              International supplier and OEM contract manufacturer for hospital equipment, surgical supplies, and diagnostic systems. Committed to clinical precision, ISO 13485 standards, and uninterrupted global delivery.
            </p>

            {/* Official Social Links */}
            <div className="pt-2 flex items-center gap-3">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/profile.php?id=61591817960540"
                target="_blank"
                rel="noopener noreferrer"
                title="Visit Secure MediTech Global on Facebook"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-[#1877F2] text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-700/60"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/secure-meditech-global"
                target="_blank"
                rel="noopener noreferrer"
                title="Connect on LinkedIn"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-[#0077B5] text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-700/60"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/securedmeditech?utm_source=ig_web_button_share_sheet&mdxt=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                title="Follow Secure MediTech Global on Instagram"
                aria-label="Secure MediTech Global Instagram"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-[#E1306C] text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-700/60"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* Official Website */}
              <a
                href="https://securemeditechglobal.com/"
                target="_blank"
                rel="noopener noreferrer"
                title="Visit Official Web Portal"
                aria-label="Website"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-[#38B6FF] text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-700/60"
              >
                <Globe2 className="w-4 h-4" />
              </a>
            </div>

            {/* Registered Address & Direct Contacts */}
            <address className="not-italic pt-1 text-sm text-slate-400 space-y-1.5">
              <p className="text-slate-300 font-semibold">Registered US Headquarters:</p>
              <p className="text-slate-300">30 N Gould St Ste R, Sheridan, WY 82801, USA</p>
              <p>
                Phone: <a href="tel:+13075334504" className="text-slate-300 hover:text-[#38B6FF]">+1 (307) 533-4504</a>
                </p>
              <p>
                Email: <a href="mailto:info@securemeditechglobal.com" className="text-slate-300 hover:text-[#38B6FF]">info@securemeditechglobal.com</a>
              </p>
            </address>
          </div>

          {/* Product Categories */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-white">
              Medical Divisions
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a href="#products" className="hover:text-[#38B6FF] transition-colors">
                  Anesthesia & Respiratory Care
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-[#38B6FF] transition-colors">
                  Clinical Laboratory Diagnostics
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-[#38B6FF] transition-colors">
                  Surgical & Operating Theater
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-[#38B6FF] transition-colors">
                  ICU & Hospital Ward Equipment
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-[#38B6FF] transition-colors">
                  Sterile Barrier Disposables
                </a>
              </li>
            </ul>
          </div>

          {/* OEM Solutions */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-white">
              OEM & Manufacturing
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a href="#oem" className="hover:text-[#38B6FF] transition-colors">
                  Class 7/8 Cleanroom Molding
                </a>
              </li>
              <li>
                <a href="#oem" className="hover:text-[#38B6FF] transition-colors">
                  CAD Tooling & DFM Prototyping
                </a>
              </li>
              <li>
                <a href="#oem" className="hover:text-[#38B6FF] transition-colors">
                  CE MDR 2017/745 Technical Files
                </a>
              </li>
              <li>
                <a href="#oem" className="hover:text-[#38B6FF] transition-colors">
                  Private Label Medical Packaging
                </a>
              </li>
              <li>
                <a href="#oem" className="hover:text-[#38B6FF] transition-colors">
                  Bonded Warehouse Freight Forwarding
                </a>
              </li>
            </ul>
          </div>

          {/* Compliance & Legal */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-white">
              Accreditation & Standards
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a href="#compliance" className="hover:text-[#38B6FF] transition-colors">
                  ISO 13485:2016 Certified
                </a>
              </li>
              <li>
                <a href="#compliance" className="hover:text-[#38B6FF] transition-colors">
                  CE Notified Body Declaration
                </a>
              </li>
              <li>
                <a href="#compliance" className="hover:text-[#38B6FF] transition-colors">
                  ISO 14971 Risk Management
                </a>
              </li>
              <li>
                <a href="#compliance" className="hover:text-[#38B6FF] transition-colors">
                  AQL 0.65 Pinhole Testing
                </a>
              </li>
              <li>
                <a href="#compliance" className="hover:text-[#38B6FF] transition-colors">
                  Good Distribution Practice (GDP)
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#38B6FF] transition-colors text-[#38B6FF]">
                  Procurement & Logistics FAQ
                </a>
              </li>
              <li>
                <a href="#price-calculator" className="hover:text-[#38B6FF] transition-colors text-[#38B6FF] flex items-center gap-1 font-medium">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Wholesale Price Estimator</span>
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar & Disclosures */}
      <div className="border-t border-slate-800/80 py-6 bg-[#041226] text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} Secure MediTech Global. All rights reserved. Registered medical device manufacturer and global wholesale exporter.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-slate-400">
            <a href="https://securemeditechglobal.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              securemeditechglobal.com
            </a>
            <span>·</span>
            <a href="#compliance" className="hover:text-white">Regulatory Disclosures</a>
            <span>·</span>
            <a href="#contact" className="hover:text-white">Privacy & Quality Pledge</a>
          </div>
        </div>
      </div>

    </footer>
  );
};
