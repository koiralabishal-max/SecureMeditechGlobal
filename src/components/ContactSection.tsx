'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SectionHeader } from './SectionHeader';
import { trackContactSubmission, trackWhatsAppInquiry } from '@/lib/analytics';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle2, Globe2, Compass, ArrowUpRight, AlertCircle, ShieldCheck } from 'lucide-react';

interface ContactSectionProps {
  prefilledHub?: string | null;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ prefilledHub }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Bulk Procurement Inquiry',
    message: ''
  });
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const queryHub =
      typeof window !== 'undefined'
        ? new URLSearchParams(window.location.search).get('hub')
        : null;
    const hub = prefilledHub || queryHub;
    if (hub) {
      setFormData((prev) => ({
        ...prev,
        subject: 'Bulk Procurement Inquiry',
        message: prev.message || `Inquiry regarding dispatch capacity, customs clearance, and lead times from: ${hub}.\n\nTarget Delivery Destination: \nEstimated Monthly Consignment: `
      }));
    }
  }, [prefilledHub]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          fullName: formData.name,
          email: formData.email,
          phoneNumber: formData.phone,
          subject: formData.subject,
          message: formData.message,
          sourcePath: typeof window !== 'undefined' ? window.location.pathname : '/',
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setSubmitError(data.error || 'Please check the required inquiry fields.');
        return;
      }
      trackContactSubmission({
        referenceId: data.referenceId,
        subject: formData.subject,
        isOem: Boolean(data.isOem),
        source: 'contact_section',
      });
      setSubmittedRef(data.referenceId);
    } catch {
      setSubmitError('Network error submitting inquiry. Please try again or reach us via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-24 bg-[#F7F8FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Left Column: Direct Corporate Contacts */}
          <div className="lg:col-span-5 space-y-6">
            <SectionHeader
              eyebrow="Contact & Logistics Desk"
              icon={<Globe2 />}
              title="Talk to our Medical Procurement Team"
              description="Volume container allocation, OEM tooling, or regulatory dossiers — our logistics officers respond around the clock."
            />

            <div className="space-y-3 pt-2">
              {/* Phone & WhatsApp */}
              <div className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-[#F1F5F8] text-[#223752] shrink-0">
                  <Phone className="w-5 h-5 text-[#3B6B91]" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#223752]">Procurement Hotline & WhatsApp</div>
                  <a href="tel:+13075334504" className="text-sm text-slate-700 hover:text-[#223752] block mt-1 font-semibold">
                    +1 (307) 533-4504
                  </a>
                  <a 
                    href="https://wa.me/13075334504" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={() => trackWhatsAppInquiry({ source: 'contact_section_card' })}
                    className="text-sm text-[#3F7D6B] font-semibold hover:underline inline-flex items-center gap-1.5 mt-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Chat via WhatsApp Instant Desk
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-[#F1F5F8] text-[#223752] shrink-0">
                  <Mail className="w-5 h-5 text-[#3B6B91]" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#223752]">Official Corporate & Procurement Desk</div>
                  <a href="mailto:info@securemeditechglobal.com" className="text-sm text-slate-700 hover:text-[#223752] block mt-1 font-semibold">
                    info@securemeditechglobal.com
                  </a>
                  <span className="text-xs text-slate-500 block mt-1">Guaranteed 12-hour response SLA</span>
                </div>
              </div>

              {/* Head Offices / Registered Address */}
              <div className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-[#F1F5F8] text-[#223752] shrink-0">
                  <MapPin className="w-5 h-5 text-[#3B6B91]" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#223752]">Registered Corporate Headquarters</div>
                  <p className="text-sm text-slate-700 mt-1 font-medium leading-relaxed">
                    30 N Gould St Ste R, Sheridan, WY 82801, USA
                  </p>
                  <p className="text-xs text-slate-500 mt-1.5 flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    Operating 24/7 Mon–Sat (Global dispatch & support)
                  </p>
                </div>
              </div>

              {/* Global Distribution Hubs Map Quick Link */}
              <div className="p-4 sm:p-5 bg-[#223752] rounded-2xl text-white shadow-sm flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-white/10 text-[#8CB3D4] shrink-0">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Global Distribution Hubs & 65+ Country Network</div>
                  <p className="text-sm text-slate-300 mt-1 leading-relaxed">
                    Check lead times, bonded warehouse facilities, and cold-chain corridors on our interactive D3 map.
                  </p>
                  <Link
                    href="/markets#distribution-map"
                    className="text-sm text-[#8CB3D4] font-semibold hover:underline inline-flex items-center gap-1 mt-2 group"
                  >
                    <span>View Interactive Distribution Map</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
            {submittedRef ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 bg-[#EFF5F3] text-[#3F7D6B] rounded-2xl flex items-center justify-center mx-auto border border-[#D3E3DD]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#223752]">Inquiry Dispatched Successfully</h3>
                <p className="text-xs font-mono font-bold text-[#3B6B91] bg-[#F1F5F8] border border-[#DCE4EC] inline-block px-3 py-1 rounded-lg">
                  Reference: {submittedRef}
                </p>
                <p className="text-sm sm:text-base text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. Your inquiry has been logged for our Regional Logistics &amp; OEM Desk. Expect a response within 12 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmittedRef(null);
                    setFormData({ name: '', email: '', phone: '', subject: 'Bulk Procurement Inquiry', message: '' });
                  }}
                  className="h-11 px-5 text-sm font-semibold text-white bg-[#223752] hover:bg-[#2E496B] rounded-xl mt-2 transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-bold text-[#223752] mb-1">
                  Send Direct Enterprise Inquiry
                </h3>
                <p className="text-sm text-slate-500 mb-6">
                  Fill in your specifications and our medical device logistics specialists will respond promptly.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-semibold text-slate-700 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Dr. / Mr. / Ms."
                        className="w-full px-3.5 py-2.5 text-base sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-[#5C89AD] focus:ring-2 focus:ring-[#5C89AD]/20 transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-semibold text-slate-700 mb-1.5">
                        Institutional Email <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="procurement@hospital.org"
                        className="w-full px-3.5 py-2.5 text-base sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-[#5C89AD] focus:ring-2 focus:ring-[#5C89AD]/20 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-phone" className="block text-sm font-semibold text-slate-700 mb-1.5">
                        Direct Phone / WhatsApp
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (000) 000-0000"
                        className="w-full px-3.5 py-2.5 text-base sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-[#5C89AD] focus:ring-2 focus:ring-[#5C89AD]/20 transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-subject" className="block text-sm font-semibold text-slate-700 mb-1.5">
                        Inquiry Category
                      </label>
                      <select
                        id="contact-subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-base sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-[#5C89AD] focus:ring-2 focus:ring-[#5C89AD]/20 transition-colors bg-white"
                      >
                        <option value="Bulk Procurement Inquiry">Bulk Procurement Inquiry</option>
                        <option value="OEM / Contract Manufacturing">OEM / Contract Manufacturing</option>
                        <option value="Distributor Partnership Application">Distributor Partnership Application</option>
                        <option value="Regulatory / Certificate Verification">Regulatory / Certificate Verification</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Message / Product Requirements *
                    </label>
                    <textarea
                        id="contact-message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please mention target product SKU, estimated volume, target destination seaport, and compliance standards needed..."
                      className="w-full px-3.5 py-2.5 text-base sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-[#5C89AD] focus:ring-2 focus:ring-[#5C89AD]/20 transition-colors"
                    />
                  </div>

                  {submitError && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-[#223752] hover:bg-[#2E496B] disabled:opacity-60 text-white text-sm font-bold rounded-xl shadow transition-colors flex items-center justify-center gap-2 active:scale-[0.99]"
                  >
                    <Send className="w-4 h-4 text-[#8CB3D4]" />
                    <span>{isSubmitting ? 'Dispatching Inquiry...' : 'Send Inquiry to Regional Desk'}</span>
                  </button>

                  <p className="text-xs text-slate-500 flex items-center justify-center gap-1.5 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#3F7D6B]" />
                    <span>ISO 13485:2016 verified desk · Batch CoA &amp; CE MDR dossiers ready</span>
                  </p>
                </form>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
