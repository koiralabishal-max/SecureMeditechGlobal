import React from 'react';
import { Product } from '../types';
import { X, Printer, Download, ShieldCheck, CheckCircle2, FileText } from 'lucide-react';

interface SpecSheetModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToQuote: (product: Product) => void;
}

export const SpecSheetModal: React.FC<SpecSheetModalProps> = ({
  product,
  onClose,
  onAddToQuote
}) => {
  if (!product) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Generate clean text/data blob and trigger download
    const content = `SECURE MEDITECH GLOBAL - ENGINEERING TECHNICAL SPECIFICATION SHEET
========================================================================
Document No: SMT-TDS-${product.sku}
Product: ${product.name}
SKU: ${product.sku}
Category: ${product.category}
Regulatory Standard: ${product.certifications.join(', ')}
Standards Reference: ${product.standards.join(', ')}

CLINICAL DESCRIPTION:
${product.description}

TECHNICAL SPECIFICATIONS:
${Object.entries(product.specs).map(([k, v]) => `- ${k}: ${v}`).join('\n')}

PACKAGING & LOGISTICS:
- Minimum Order Quantity: ${product.minOrderQty}
- Lead Time: ${product.leadTime}
- Packaging Protocol: ${product.packaging}

QUALITY & REGULATORY COMPLIANCE:
All products are manufactured under ISO 13485:2016 Certified Quality Management Systems and comply with EU MDR 2017/745.
Contact: info@securemeditechglobal.com | +1 (307) 533-4504 | 30 N Gould St Ste R, Sheridan, WY 82801, USA | www.securemeditechglobal.com
========================================================================`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SpecSheet_${product.sku}_SecureMediTechGlobal.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Modal Controls */}
        <div className="bg-[#0B2F63] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#38B6FF]" />
            <div>
              <h3 className="text-sm font-bold tracking-tight">Engineering Specification Sheet</h3>
              <p className="text-[11px] text-slate-300 font-mono">TDS Ref: SMT-{product.sku}-V4</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              title="Print Specification Sheet"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#38B6FF] hover:bg-[#209ee8] text-white text-xs font-bold rounded-lg transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Technical Document Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Document Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
            <div className="space-y-2">
              <img
                src="/assets/aistudio/2026-10-24_7-15-55_PM_1fbce34f.png"
                alt="Secure MediTech Global"
                className="h-9 w-auto object-contain"
              />
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B2F63]">
                  {product.name}
                </h2>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  Model SKU: {product.sku} · Class {product.category}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl text-right">
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase">Compliance Standard</div>
                <div className="text-xs font-bold text-[#0B2F63]">{product.certifications[0]}</div>
              </div>
              <ShieldCheck className="w-6 h-6 text-[#10B981] ml-1" />
            </div>
          </div>

          {/* Product Overview & Clinical Profile */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Clinical Indications & Profile
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              {product.description}
            </p>
          </div>

          {/* Technical Parameter Matrix */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Technical Parameter Specifications
            </h4>
            <div className="overflow-hidden border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0B2F63]/5 text-[#0B2F63] font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-4 font-semibold w-1/3">Parameter</th>
                    <th className="py-2.5 px-4 font-semibold">Engineering Value / Specification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {Object.entries(product.specs).map(([key, val], idx) => (
                    <tr key={key} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                      <td className="py-2.5 px-4 font-medium text-slate-600">{key}</td>
                      <td className="py-2.5 px-4 font-semibold text-slate-900 font-mono">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Regulatory & Packaging Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <h5 className="text-xs font-bold text-[#0B2F63] mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                <span>Applicable Standards</span>
              </h5>
              <ul className="text-xs text-slate-600 space-y-1">
                {product.standards.map((st, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-slate-400" />
                    <span>{st}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <h5 className="text-xs font-bold text-[#0B2F63] mb-2">Packaging & Logistics</h5>
              <div className="text-xs text-slate-600 space-y-1">
                <p><strong className="text-slate-800">Export Packaging:</strong> {product.packaging}</p>
                <p><strong className="text-slate-800">Minimum Order Qty:</strong> {product.minOrderQty}</p>
                <p><strong className="text-slate-800">Dispatch Lead Time:</strong> {product.leadTime}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Official technical dossier property of Secure MediTech Global.
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-300 rounded-lg"
            >
              Close
            </button>
            <button
              onClick={() => {
                onAddToQuote(product);
                onClose();
              }}
              className="px-4 py-2 text-xs font-bold text-white bg-[#0B2F63] hover:bg-[#164082] rounded-lg shadow-xs"
            >
              Add Item to RFQ Quote
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
