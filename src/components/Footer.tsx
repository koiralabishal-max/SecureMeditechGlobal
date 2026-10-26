import React, { useState } from 'react';
import { ShieldCheck, Mail, ArrowRight, CheckCircle2, Globe2 } from 'lucide-react';

export const Footer: React.FC = () => {
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
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-[#38B6FF]" />
              <span>Subscribe to Medical Regulatory & Global Supply Bulletins</span>
            </h4>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Quarterly briefings on CE MDR amendments, global ocean freight container updates, and new OEM medical device releases.
            </p>
          </div>

          <div className="w-full md:w-auto">
            {newsletterSubscribed ? (
              <div className="flex items-center gap-2 text-xs font-semibold text-[#10B981] bg-emerald-950/40 border border-emerald-800/60 px-4 py-2.5 rounded-xl">
                <CheckCircle2 className="w-4 h-4" />
                <span>Subscription confirmed. Welcome to the procurement bulletin.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2 max-w-md w-full">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter institutional work email..."
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-900 text-xs text-white placeholder-slate-500 rounded-xl border border-slate-700 focus:outline-none focus:border-[#38B6FF]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#38B6FF] hover:bg-[#209ee8] text-white text-xs font-bold rounded-xl transition-colors shrink-0 flex items-center gap-1.5"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Links Grid */}
      <div className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info & Socials */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white/95 p-3 rounded-xl border border-white/20 shadow-sm inline-block max-w-[260px]">
              <img
                src="/assets/aistudio/2026-10-24_7-15-55_PM_1fbce34f.png"
                alt="Secure MediTech Global"
                className="h-10 w-auto object-contain"
              />
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
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
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-[#0077B5] text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-700/60"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>

              {/* Official Website */}
              <a
                href="https://securemeditechglobal.com/"
                target="_blank"
                rel="noopener noreferrer"
                title="Visit Official Web Portal"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-[#38B6FF] text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-700/60"
              >
                <Globe2 className="w-4 h-4" />
              </a>
            </div>

            {/* Registered Address & Direct Contacts */}
            <div className="pt-2 text-[11px] text-slate-400 space-y-1">
              <p className="text-slate-300 font-semibold">Registered US Headquarters:</p>
              <p className="text-slate-300">30 N GOULD ST STE R SHERIDAN, WY 82801, USA</p>
              <p>
                Phone: <a href="tel:+13075334504" className="text-slate-300 hover:text-[#38B6FF] font-mono">+1 (307) 533-4504</a>
                <span className="mx-1.5 text-slate-600">·</span>
                Email: <a href="mailto:info@securemeditechglobal.com" className="text-slate-300 hover:text-[#38B6FF]">info@securemeditechglobal.com</a>
              </p>
            </div>
          </div>

          {/* Product Categories */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">
              Medical Divisions
            </h5>
            <ul className="space-y-2 text-xs text-slate-400">
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
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">
              OEM & Manufacturing
            </h5>
            <ul className="space-y-2 text-xs text-slate-400">
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
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">
              Accreditation & Standards
            </h5>
            <ul className="space-y-2 text-xs text-slate-400">
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
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar & Disclosures */}
      <div className="border-t border-slate-800/80 py-6 bg-[#041226] text-[11px] text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            © {new Date().getFullYear()} Secure MediTech Global. All rights reserved. Registered medical device manufacturer and global wholesale exporter.
          </p>
          <div className="flex items-center gap-4 text-slate-400">
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
