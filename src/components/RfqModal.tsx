import React, { useState } from 'react';
import { QuoteItem, RfqFormData } from '../types';
import { X, Trash2, Plus, Minus, Send, CheckCircle2, ShieldCheck, FileText, AlertCircle, Copy, Check } from 'lucide-react';

interface RfqModalProps {
  isOpen: boolean;
  onClose: () => void;
  quoteItems: QuoteItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearQuote: () => void;
}

export const RfqModal: React.FC<RfqModalProps> = ({
  isOpen,
  onClose,
  quoteItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearQuote
}) => {
  const [formData, setFormData] = useState<Omit<RfqFormData, 'requestedItems'>>({
    fullName: '',
    companyName: '',
    businessType: 'Hospital / Clinic Network',
    workEmail: '',
    phoneNumber: '',
    country: '',
    destinationPort: '',
    targetDeliveryDate: '',
    incoterm: 'CIF',
    projectDetails: ''
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) errors.fullName = 'Contact name is required';
    if (!formData.companyName.trim()) errors.companyName = 'Company / Hospital name is required';
    if (!formData.workEmail.trim()) {
      errors.workEmail = 'Work email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.workEmail)) {
      errors.workEmail = 'Please provide a valid work email';
    }
    if (!formData.phoneNumber.trim()) errors.phoneNumber = 'Phone / WhatsApp is required';
    if (!formData.country.trim()) errors.country = 'Destination country is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate real enterprise dispatch to sales desk
    setTimeout(() => {
      const generatedRef = `RFQ-SMT-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedRef(generatedRef);
      setIsSubmitting(false);
      onClearQuote();
    }, 600);
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
      <div className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#0B2F63] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#38B6FF]" />
            <div>
              <h3 className="text-base font-bold">Official Request For Bulk Quotation (RFQ)</h3>
              <p className="text-[11px] text-slate-300">
                Direct procurement pricing, freight estimation & technical file support
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {submittedRef ? (
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-50 text-[#10B981] rounded-2xl flex items-center justify-center mx-auto border border-emerald-200 shadow-xs">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="max-w-md mx-auto space-y-2">
              <h4 className="text-2xl font-extrabold text-[#0B2F63]">
                Quotation Request Submitted Successfully
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Thank you for your inquiry, <strong>{formData.fullName}</strong>. Your tender has been routed directly to our Senior Medical Logistics & Regulatory Desk.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl max-w-sm mx-auto flex items-center justify-between">
              <div className="text-left">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Tracking Reference</div>
                <div className="font-mono text-base font-bold text-[#0B2F63]">{submittedRef}</div>
              </div>
              <button
                onClick={copyRef}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed border-t border-slate-100 pt-4">
              A comprehensive pro-forma quotation including freight estimates, lot batch COA samples, and estimated arrival schedule will be emailed to <strong>{formData.workEmail}</strong> within 12–24 business hours.
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setSubmittedRef(null);
                  onClose();
                }}
                className="px-6 py-2.5 text-xs font-bold text-white bg-[#0B2F63] hover:bg-[#164082] rounded-xl shadow transition-colors"
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
                    className="text-[11px] text-rose-500 hover:text-rose-700 font-semibold"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {quoteItems.length === 0 ? (
                <div className="p-6 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300 text-xs text-slate-500 space-y-2">
                  <p>Your quote basket is currently empty.</p>
                  <p className="text-[11px] text-slate-400">
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
                        <div className="font-bold text-[#0B2F63] truncate" title={item.product.name}>
                          {item.product.name}
                        </div>
                        <div className="font-mono text-[10px] text-slate-500">
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
              <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 text-[11px] text-slate-600 space-y-1.5">
                <div className="font-bold text-[#0B2F63] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#10B981]" />
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
                    className={`w-full px-3 py-2 text-xs rounded-lg border bg-white focus:outline-none focus:ring-1 ${
                      formErrors.fullName ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-300 focus:ring-[#38B6FF]'
                    }`}
                  />
                  {formErrors.fullName && (
                    <span className="text-[10px] text-rose-500 mt-0.5 flex items-center gap-1">
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
                    className={`w-full px-3 py-2 text-xs rounded-lg border bg-white focus:outline-none focus:ring-1 ${
                      formErrors.companyName ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-300 focus:ring-[#38B6FF]'
                    }`}
                  />
                  {formErrors.companyName && (
                    <span className="text-[10px] text-rose-500 mt-0.5 flex items-center gap-1">
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
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#38B6FF]"
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
                    Institutional Email *
                  </label>
                  <input
                    type="email"
                    value={formData.workEmail}
                    onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                    placeholder="purchasing@hospital.org"
                    className={`w-full px-3 py-2 text-xs rounded-lg border bg-white focus:outline-none focus:ring-1 ${
                      formErrors.workEmail ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-300 focus:ring-[#38B6FF]'
                    }`}
                  />
                  {formErrors.workEmail && (
                    <span className="text-[10px] text-rose-500 mt-0.5 flex items-center gap-1">
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
                    className={`w-full px-3 py-2 text-xs rounded-lg border bg-white focus:outline-none focus:ring-1 ${
                      formErrors.phoneNumber ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-300 focus:ring-[#38B6FF]'
                    }`}
                  />
                  {formErrors.phoneNumber && (
                    <span className="text-[10px] text-rose-500 mt-0.5 flex items-center gap-1">
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
                    className={`w-full px-3 py-2 text-xs rounded-lg border bg-white focus:outline-none focus:ring-1 ${
                      formErrors.country ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-300 focus:ring-[#38B6FF]'
                    }`}
                  />
                  {formErrors.country && (
                    <span className="text-[10px] text-rose-500 mt-0.5 flex items-center gap-1">
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
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#38B6FF]"
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
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#38B6FF]"
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
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#38B6FF]"
                />
              </div>

              {/* Submission Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 bg-[#38B6FF] hover:bg-[#209ee8] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Transmitting to Medical Logistics Desk...' : 'Submit Official RFQ Quotation Request'}</span>
                </button>
              </div>

            </form>

          </div>
        )}

      </div>
    </div>
  );
};
