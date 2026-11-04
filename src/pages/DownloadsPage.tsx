import React, { useState } from 'react';
import { 
  Download, 
  FileText, 
  Check, 
  Search, 
  ShieldCheck, 
  ArrowDownToLine, 
  FileCode,
  BookOpen
} from 'lucide-react';
import { DOWNLOADS, DownloadDocument } from '../data/downloads';

export const DownloadsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const categories = [
    'All',
    'Product Catalogues',
    'Company Profiles',
    'Technical Specifications',
    'User Manuals & IFU',
    'Certificates & Quality'
  ];

  const filteredDownloads = DOWNLOADS.filter((doc) => {
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    return (
      matchesCategory &&
      (doc.title.toLowerCase().includes(query) ||
        doc.description.toLowerCase().includes(query) ||
        doc.version.toLowerCase().includes(query) ||
        doc.category.toLowerCase().includes(query))
    );
  });

  const handleDownload = (doc: DownloadDocument) => {
    setDownloadingId(doc.id);

    // Generate a formatted textual file download as simulated official PDF document
    const content = `SECURE MEDITECH GLOBAL - OFFICIAL DOCUMENT RELEASE
Title: ${doc.title}
Category: ${doc.category}
Version: ${doc.version}
Release Date: ${doc.releaseDate}
Format: ${doc.fileFormat} (${doc.fileSize})
Language: ${doc.language}

Description:
${doc.description}

Corporate Headquarters:
Secure MediTech Global Ltd.
30 N Gould St Ste R, Sheridan, WY 82801, USA
Phone: +1 (307) 533-4504 | Email: info@securemeditechglobal.com
Website: https://securemeditechglobal.com

Quality Assurance & Regulatory Scope:
ISO 13485:2016 Certified Medical Device Manufacturer
CE Notified Body Declaration (EU MDR 2017/745)
Ethylene Oxide & Gamma Sterilization Validation (SAL 10^-6)
`;

    const blob = new Blob([content], { type: 'application/pdf;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.id}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setTimeout(() => {
      setDownloadingId(null);
    }, 2000);
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* 1. Page Header */}
      <div className="bg-[#0B2F63] text-white py-14 sm:py-18 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#38B6FF]">
              <ArrowDownToLine className="w-4 h-4" />
              <span>Technical Documentation & Regulatory Files</span>
            </div>
            <h1 className="text-3xl sm:text-4.5xl font-extrabold tracking-tight text-white">
              Download Centre & Technical Library
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Access official master medical catalogues, product specification sheets, clinical instructions for use (IFUs), ISO 13485 declarations, and OEM tooling guidelines.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* 2. Search & Category Filters Bar */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            <div className="relative w-full md:max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search catalogues, spec sheets, IFUs, or certificates..."
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 focus:bg-white border border-slate-300 focus:border-[#0B2F63] rounded-xl outline-none text-slate-800 placeholder-slate-400 transition-colors"
              />
            </div>

            <div className="text-xs text-slate-500 font-mono">
              Available: {filteredDownloads.length} Technical Documents
            </div>

          </div>

          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-[#0B2F63] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Downloads Table / Cards List */}
        <div className="space-y-4">
          {filteredDownloads.map((doc) => {
            const isDownloading = downloadingId === doc.id;

            return (
              <div 
                key={doc.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-5"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0B2F63] flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6 text-[#38B6FF]" />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2 text-[11px]">
                      <span className="font-bold text-[#38B6FF] uppercase">
                        {doc.category}
                      </span>
                      <span className="text-slate-300">·</span>
                      <span className="font-mono text-slate-500">{doc.version}</span>
                      <span className="text-slate-300">·</span>
                      <span className="text-slate-400">{doc.releaseDate}</span>
                      <span className="text-slate-300">·</span>
                      <span className="text-slate-500">{doc.language}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {doc.title}
                    </h3>

                    <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
                      {doc.description}
                    </p>
                  </div>
                </div>

                {/* Right Action: Format Tag & Download Button */}
                <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                  <span className="px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-700">
                    {doc.fileFormat} · {doc.fileSize}
                  </span>

                  <button
                    onClick={() => handleDownload(doc)}
                    disabled={isDownloading}
                    className="px-4 py-2.5 bg-[#0B2F63] hover:bg-[#124185] disabled:opacity-60 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    {isDownloading ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Downloading...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 text-[#38B6FF]" />
                        <span>Download PDF</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* 4. Custom Dossier Request Assistance Strip */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <span className="font-bold text-slate-800 block">Need Notarized Embassy Apostille or Free Sale Certificates (FSC)?</span>
              <span>Our regulatory affairs department prepares certified tenders and local health ministry registration dossiers upon request.</span>
            </div>
          </div>
          <a
            href="mailto:info@securemeditechglobal.com?subject=Regulatory%20Dossier%20Inquiry"
            className="px-4 py-2 bg-white hover:bg-slate-100 text-[#0B2F63] font-bold border border-slate-300 rounded-xl transition-colors shrink-0"
          >
            Email Regulatory Team
          </a>
        </div>

      </div>

    </div>
  );
};
