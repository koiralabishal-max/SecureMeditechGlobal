'use client';

import React, { useEffect, useState } from 'react';
import { QuoteItem, RfqFormData } from '../types';
import { trackBulkQuoteRequest } from '@/lib/analytics';
import { X, Trash2, Plus, Minus, Send, CheckCircle2, ShieldCheck, FileText, AlertCircle, Copy, Check } from 'lucide-react';

interface RfqModalProps {
  isOpen: boolean;
  onClose: () => void;
  quoteItems: QuoteItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearQuote: () => void;
  defaultBusinessType?: RfqFormData['businessType'];
  defaultCountry?: string;
}

export const RfqModal: React.FC<RfqModalProps> = ({
  isOpen,
  onClose,
  quoteItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearQuote,
  defaultBusinessType,
  defaultCountry,
}) => {
  const [formData, setFormData] = useState<Omit<RfqFormData, 'requestedItems'>>({
    fullName: '',
    companyName: '',
    businessType: defaultBusinessType || 'Hospital / Clinic Network',
    workEmail: '',
    phoneNumber: '',
    country: defaultCountry || '',
    destinationPort: '',
    targetDeliveryDate: '',
    incoterm: 'CIF',
    projectDetails: ''
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setSubmitError(null);
    setFormData((prev) => ({
      ...prev,
      businessType: defaultBusinessType || prev.businessType,
      country: defaultCountry && !prev.country ? defaultCountry : prev.country,
    }));
  }, [isOpen, defaultBusinessType, defaultCountry]);

  if (!isOpen) return null;

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) errors.fullName = 'Contact name is required';
    if (!formData.companyName.trim()) errors.companyName = 'Company / Hospital name is required';
    if (formData.workEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.workEmail)) {
      errors.workEmail = 'Please provide a valid work email';
    }
    if (!formData.phoneNumber.trim()) errors.phoneNumber = 'Phone / WhatsApp is required';
    if (!formData.country.trim()) errors.country = 'Destination country is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'rfq',
          fullName: formData.fullName,
          companyName: formData.companyName,
          businessType: formData.businessType,
          email: formData.workEmail,
          phoneNumber: formData.phoneNumber,
          country: formData.country,
          destinationPort: formData.destinationPort,
          incoterm: formData.incoterm,
          message: formData.projectDetails,
          sourcePath: typeof window !== 'undefined' ? window.location.pathname : '/',
          items: quoteItems.map((item) => ({
            sku: item.product.sku,
            name: item.product.name,
            quantity: item.quantity,
            customNotes: item.customNotes,
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        if (data.fieldErrors) setFormErrors(data.fieldErrors);
        setSubmitError(data.error || 'Unable to submit quotation request. Please check your details.');
        return;
      }

      const totalUnits = quoteItems.reduce((sum, item) => sum + item.quantity, 0);
      trackBulkQuoteRequest({
        stage: 'submit',
        referenceId: data.referenceId,
        sku: quoteItems[0]?.product.sku,
        productName: quoteItems[0]?.product.name,
        itemCount: quoteItems.length,
        totalUnits,
        country: formData.country,
        incoterm: formData.incoterm,
        isOem: Boolean(data.isOem) || formData.businessType === 'OEM / Brand Partner',
      });

      setSubmittedRef(data.referenceId);
      onClearQuote();
    } catch {
      setSubmitError('Network error while contacting the procurement desk. Please retry or use WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyRef = () => {
    if (submittedRef) {
      navigator.clipboard.writeText(submittedRef);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="rfq-modal-title"
        className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        
        {/* Header */}
        <div className="bg-[#223752] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#8CB3D4]" />
            <div>
              <h3 id="rfq-modal-title" className="text-base font-bold">Official Request For Bulk Quotation (RFQ)</h3>
              <p className="text-xs text-slate-300">
                Direct procurement pricing, freight estimation & technical file support
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close RFQ quotation dialog"
            className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {submittedRef ? (
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-16 h-16 bg-[#EFF5F3] text-[#3F7D6B] rounded-2xl flex items-center justify-center mx-auto border border-[#D3E3DD] shadow-xs">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="max-w-md mx-auto space-y-2">
              <h4 className="text-2xl font-extrabold text-[#223752]">
                Quotation Request Submitted Successfully
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Thank you for your inquiry, <strong>{formData.fullName}</strong>. Your tender has been routed directly to our Senior Medical Logistics & Regulatory Desk.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl max-w-sm mx-auto flex items-center justify-between">
              <div className="text-left">
                <div className="text-[11px] text-slate-400 font-bold uppercase">Tracking Reference</div>
                <div className="font-mono text-base font-bold text-[#223752]">{submittedRef}</div>
              </div>
              <button
                onClick={copyRef}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#3F7D6B]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed border-t border-slate-100 pt-4">
              A comprehensive pro-forma quotation including freight estimates, lot batch COA samples, and estimated arrival schedule will be {formData.workEmail ? <>emailed to <strong>{formData.workEmail}</strong></> : 'sent directly to your provided contact details'} within 12–24 business hours.
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setSubmittedRef(null);
                  onClose();
                }}
                className="px-6 py-2.5 text-xs font-bold text-white bg-[#223752] hover:bg-[#2E496B] rounded-xl shadow transition-colors"
              >
                Return to Product Catalog
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-8 max-h-[78vh] overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Selected Items in RFQ Basket */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Requested Items ({quoteItems.length})
                </span>
                {quoteItems.length > 0 && (
                  <button
                    onClick={onClearQuote}
                    className="text-xs text-rose-500 hover:text-rose-700 font-semibold"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {quoteItems.length === 0 ? (
                <div className="p-6 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300 text-xs text-slate-500 space-y-2">
                  <p>Your quote basket is currently empty.</p>
                  <p className="text-xs text-slate-400">
                    You can still submit a general RFQ or custom OEM request using the form on the right!
                  </p>
                </div>
              ) : (
                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {quoteItems.map((item) => (
                    <div 
                      key={item.product.id} 
                      className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-[#223752] truncate" title={item.product.name}>
                          {item.product.name}
                        </div>
                        <div className="font-mono text-[11px] text-slate-500">
                          SKU: {item.product.sku}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 100))}
                          className="w-6 h-6 rounded bg-white border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100"
                          title="Decrease quantity by 100"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-12 text-center font-mono font-bold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 100)}
                          className="w-6 h-6 rounded bg-white border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100"
                          title="Increase quantity by 100"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="p-1 text-slate-400 hover:text-rose-500 transition-colors ml-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Trust Callout */}
              <div className="p-3.5 rounded-xl bg-[#F1F5F8] border border-[#DCE4EC] text-xs text-slate-600 space-y-1.5">
                <div className="font-bold text-[#223752] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#3F7D6B]" />
                  <span>Wholesale Procurement Guarantee</span>
                </div>
                <p>
                  All quotes include factory-direct pricing, certified lot COA documentation, and international shipping options.
                </p>
              </div>
            </div>

            {/* Right Column: Institutional RFQ Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Dr. Arthur Scott"
                    className={`w-full px-3 py-2.5 text-base sm:text-sm rounded-lg border bg-white focus:outline-none focus:ring-1 ${
                      formErrors.fullName ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-300 focus:ring-[#5C89AD]'
                    }`}
                  />
                  {formErrors.fullName && (
                    <span className="text-[11px] text-rose-500 mt-0.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {formErrors.fullName}
                    </span>
                  )}
                </div>

                {/* Company / Hospital */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Hospital / Organization *
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. St. Jude Regional Hospital"
                    className={`w-full px-3 py-2.5 text-base sm:text-sm rounded-lg border bg-white focus:outline-none focus:ring-1 ${
                      formErrors.companyName ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-300 focus:ring-[#5C89AD]'
                    }`}
                  />
                  {formErrors.companyName && (
                    <span className="text-[11px] text-rose-500 mt-0.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {formErrors.companyName}
                    </span>
                  )}
                </div>

                {/* Business Type */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Organization Type
                  </label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value as any })}
                    className="w-full px-3 py-2.5 text-base sm:text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#5C89AD]"
                  >
                    <option value="Hospital / Clinic Network">Hospital / Clinic Network</option>
                    <option value="Medical Equipment Distributor">Medical Equipment Distributor</option>
                    <option value="Government Health Ministry">Government Health Ministry</option>
                    <option value="OEM / Brand Partner">OEM / Brand Partner</option>
                    <option value="Other">Other Institutional Buyer</option>
                  </select>
                </div>

                {/* Work Email */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Institutional Email <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    value={formData.workEmail}
                    onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                    placeholder="purchasing@hospital.org"
                    className={`w-full px-3 py-2.5 text-base sm:text-sm rounded-lg border bg-white focus:outline-none focus:ring-1 ${
                      formErrors.workEmail ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-300 focus:ring-[#5C89AD]'
                    }`}
                  />
                  {formErrors.workEmail && (
                    <span className="text-[11px] text-rose-500 mt-0.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {formErrors.workEmail}
                    </span>
                  )}
                </div>

                {/* Phone / WhatsApp */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Direct Phone / WhatsApp *
                  </label>
                  <input
                    type="text"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    placeholder="+1 (555) 019-2834"
                    className={`w-full px-3 py-2.5 text-base sm:text-sm rounded-lg border bg-white focus:outline-none focus:ring-1 ${
                      formErrors.phoneNumber ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-300 focus:ring-[#5C89AD]'
                    }`}
                  />
                  {formErrors.phoneNumber && (
                    <span className="text-[11px] text-rose-500 mt-0.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {formErrors.phoneNumber}
                    </span>
                  )}
                </div>

                {/* Country */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Destination Country *
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="e.g. United Kingdom, Germany, UAE"
                    className={`w-full px-3 py-2.5 text-base sm:text-sm rounded-lg border bg-white focus:outline-none focus:ring-1 ${
                      formErrors.country ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-300 focus:ring-[#5C89AD]'
                    }`}
                  />
                  {formErrors.country && (
                    <span className="text-[11px] text-rose-500 mt-0.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {formErrors.country}
                    </span>
                  )}
                </div>

                {/* Preferred Incoterm */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Incoterm
                  </label>
                  <select
                    value={formData.incoterm}
                    onChange={(e) => setFormData({ ...formData, incoterm: e.target.value as any })}
                    className="w-full px-3 py-2.5 text-base sm:text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#5C89AD]"
                  >
                    <option value="CIF">CIF (Cost, Insurance & Freight)</option>
                    <option value="FOB">FOB (Free On Board Port)</option>
                    <option value="DDP">DDP (Delivered Duty Paid)</option>
                    <option value="EXW">EXW (Ex Works Factory)</option>
                  </select>
                </div>

                {/* Port / Airport */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Destination Seaport / Airport
                  </label>
                  <input
                    type="text"
                    value={formData.destinationPort}
                    onChange={(e) => setFormData({ ...formData, destinationPort: e.target.value })}
                    placeholder="e.g. Rotterdam / Hamburg / Dubai"
                    className="w-full px-3 py-2.5 text-base sm:text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#5C89AD]"
                  />
                </div>
              </div>

              {/* Project Details / Custom Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Specific Clinical Requirements or OEM Customization Notes
                </label>
                <textarea
                  rows={3}
                  value={formData.projectDetails}
                  onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                  placeholder="Provide volume expectations, sterile packaging requests, private label needs, or target tender delivery schedule..."
                  className="w-full px-3 py-2.5 text-base sm:text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#5C89AD]"
                />
              </div>

              {submitError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Submission Button */}
              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 bg-[#223752] hover:bg-[#2E496B] text-white text-xs sm:text-sm font-extrabold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Transmitting to Medical Logistics Desk...' : 'Submit Official RFQ Quotation Request'}</span>
                </button>
                <p className="text-[11px] text-center text-slate-500">
                  ISO 13485:2016 Confidential NDA Handling · Batch CoA &amp; COO Samples Included
                </p>
              </div>

            </form>

          </div>
        )}

      </div>
    </div>
  );
};
