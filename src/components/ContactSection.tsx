import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle2, Globe2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Bulk Procurement Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      // kept in submitted state
    }, 400);
  };

  return (
    <section id="contact" className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Corporate Contacts */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#38B6FF] mb-2">
                <Globe2 className="w-4 h-4" />
                <span>Global Head Offices & Logistics Desks</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2F63] tracking-tight">
                Connect Directly with our Medical Procurement Team
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Whether requesting volume container allocation, OEM tooling discussions, or regulatory certification dossiers, our multilingual logistics officers are available 24/7.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              {/* Phone & WhatsApp */}
              <div className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-2xs flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-blue-50 text-[#0B2F63] shrink-0">
                  <Phone className="w-5 h-5 text-[#38B6FF]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0B2F63]">Procurement Hotline & WhatsApp</div>
                  <a href="tel:+13075334504" className="text-xs text-slate-600 hover:text-[#0B2F63] block font-mono mt-0.5 font-semibold">
                    +1 (307) 533-4504
                  </a>
                  <a 
                    href="https://wa.me/13075334504" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[11px] text-[#10B981] font-semibold hover:underline inline-flex items-center gap-1 mt-1"
                  >
                    <MessageSquare className="w-3 h-3" />
                    Chat via WhatsApp Instant Desk
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-2xs flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-blue-50 text-[#0B2F63] shrink-0">
                  <Mail className="w-5 h-5 text-[#38B6FF]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0B2F63]">Official Corporate & Procurement Desk</div>
                  <a href="mailto:info@securemeditechglobal.com" className="text-xs text-slate-600 hover:text-[#0B2F63] block font-mono mt-0.5 font-semibold">
                    info@securemeditechglobal.com
                  </a>
                  <span className="text-[11px] text-slate-400">Guaranteed 12-hour response SLA</span>
                </div>
              </div>

              {/* Head Offices / Registered Address */}
              <div className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-2xs flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-blue-50 text-[#0B2F63] shrink-0">
                  <MapPin className="w-5 h-5 text-[#38B6FF]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0B2F63]">Registered Corporate Headquarters</div>
                  <p className="text-xs text-slate-700 mt-0.5 font-medium leading-relaxed">
                    30 N GOULD ST STE R SHERIDAN, WY 82801, USA
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Operating 24/7 Mon–Sat (Global dispatch & support)
                  </p>
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
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. Your message has been logged under priority ticket. Our regional sales director will reach out within 12 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', subject: 'Bulk Procurement Inquiry', message: '' });
                  }}
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#0B2F63] rounded-lg mt-2"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-bold text-[#0B2F63] mb-1">
                  Send Direct Enterprise Inquiry
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  Fill in your specifications and our medical device logistics specialists will respond promptly.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Dr. / Mr. / Ms."
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#38B6FF]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Institutional Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="procurement@hospital.org"
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#38B6FF]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Direct Phone / WhatsApp
                      </label>
                      <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (000) 000-0000"
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#38B6FF]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Inquiry Category
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#38B6FF] bg-white"
                      >
                        <option value="Bulk Procurement Inquiry">Bulk Procurement Inquiry</option>
                        <option value="OEM / Contract Manufacturing">OEM / Contract Manufacturing</option>
                        <option value="Distributor Partnership Application">Distributor Partnership Application</option>
                        <option value="Regulatory / Certificate Verification">Regulatory / Certificate Verification</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Message / Product Requirements *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please mention target product SKU, estimated volume, target destination seaport, and compliance standards needed..."
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#38B6FF]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#0B2F63] hover:bg-[#164082] text-white text-xs font-bold rounded-xl shadow transition-colors flex items-center justify-center gap-2 active:scale-98"
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
