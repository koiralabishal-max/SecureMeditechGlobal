'use client';

import React, { useState, useEffect } from 'react';
import { SectionHeader } from './SectionHeader';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle2, Globe2, Compass, ArrowUpRight } from 'lucide-react';

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
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (prefilledHub) {
      setFormData((prev) => ({
        ...prev,
        subject: 'Bulk Procurement Inquiry',
        message: prev.message || `Inquiry regarding dispatch capacity, customs clearance, and lead times from: ${prefilledHub}.\n\nTarget Delivery Destination: \nEstimated Monthly Consignment: `
      }));
    }
  }, [prefilledHub]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      // kept in submitted state
    }, 400);
  };

  return (
    <section id="contact" className="py-20 sm:py-24 bg-[#F8FAFC]">
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
                <div className="p-2.5 rounded-lg bg-blue-50 text-[#0B2F63] shrink-0">
                  <Phone className="w-5 h-5 text-[#38B6FF]" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#0B2F63]">Procurement Hotline & WhatsApp</div>
                  <a href="tel:+13075334504" className="text-sm text-slate-700 hover:text-[#0B2F63] block mt-1 font-semibold">
                    +1 (307) 533-4504
                  </a>
                  <a 
                    href="https://wa.me/13075334504" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm text-emerald-600 font-semibold hover:underline inline-flex items-center gap-1.5 mt-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Chat via WhatsApp Instant Desk
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-blue-50 text-[#0B2F63] shrink-0">
                  <Mail className="w-5 h-5 text-[#38B6FF]" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#0B2F63]">Official Corporate & Procurement Desk</div>
                  <a href="mailto:info@securemeditechglobal.com" className="text-sm text-slate-700 hover:text-[#0B2F63] block mt-1 font-semibold">
                    info@securemeditechglobal.com
                  </a>
                  <span className="text-xs text-slate-500 block mt-1">Guaranteed 12-hour response SLA</span>
                </div>
              </div>

              {/* Head Offices / Registered Address */}
              <div className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-blue-50 text-[#0B2F63] shrink-0">
                  <MapPin className="w-5 h-5 text-[#38B6FF]" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#0B2F63]">Registered Corporate Headquarters</div>
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
              <div className="p-4 sm:p-5 bg-gradient-to-br from-[#0B2F63] to-[#071E40] rounded-2xl text-white shadow-sm flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-white/10 text-[#38B6FF] shrink-0">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Global Distribution Hubs & 65+ Country Network</div>
                  <p className="text-sm text-slate-300 mt-1 leading-relaxed">
                    Check lead times, bonded warehouse facilities, and cold-chain corridors on our interactive D3 map.
                  </p>
                  <a
                    href="#distribution-map"
                    className="text-sm text-[#38B6FF] font-semibold hover:underline inline-flex items-center gap-1 mt-2 group"
                  >
                    <span>View Interactive Distribution Map</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-50 text-[#10B981] rounded-2xl flex items-center justify-center mx-auto border border-emerald-100">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#0B2F63]">Inquiry Dispatched Successfully</h3>
                <p className="text-sm sm:text-base text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. Your message has been logged under priority ticket. Our regional sales director will reach out within 12 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', subject: 'Bulk Procurement Inquiry', message: '' });
                  }}
                  className="h-11 px-5 text-sm font-semibold text-white bg-[#0B2F63] hover:bg-[#164082] rounded-xl mt-2 transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-bold text-[#0B2F63] mb-1">
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
                        className="w-full px-3.5 py-2.5 text-base sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-[#38B6FF] focus:ring-2 focus:ring-[#38B6FF]/20 transition-colors"
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
                        className="w-full px-3.5 py-2.5 text-base sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-[#38B6FF] focus:ring-2 focus:ring-[#38B6FF]/20 transition-colors"
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
                        className="w-full px-3.5 py-2.5 text-base sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-[#38B6FF] focus:ring-2 focus:ring-[#38B6FF]/20 transition-colors"
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
                        className="w-full px-3.5 py-2.5 text-base sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-[#38B6FF] focus:ring-2 focus:ring-[#38B6FF]/20 transition-colors bg-white"
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
                      className="w-full px-3.5 py-2.5 text-base sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-[#38B6FF] focus:ring-2 focus:ring-[#38B6FF]/20 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full h-12 bg-[#0B2F63] hover:bg-[#164082] text-white text-sm font-bold rounded-xl shadow transition-colors flex items-center justify-center gap-2 active:scale-[0.99]"
                  >
                    <Send className="w-4 h-4 text-[#38B6FF]" />
                    <span>Send Inquiry to Regional Desk</span>
                  </button>
                </form>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
