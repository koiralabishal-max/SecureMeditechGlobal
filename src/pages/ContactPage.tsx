import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  Globe2, 
  ShieldCheck, 
  Building2,
  FileText
} from 'lucide-react';

interface ContactPageProps {
  onOpenRfq: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenRfq }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    institution: '',
    email: '',
    phone: '',
    country: '',
    inquiryType: 'Wholesale Hospital Procurement',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const regionalHubs = [
    { country: 'Nepal', hub: 'Kathmandu Regional Logistics Hub', focus: 'Himalayan & South Asia Hospital Consignments' },
    { country: 'Kenya', hub: 'Nairobi Bonded Warehouse Desk', focus: 'East Africa Air Cargo & Consignment Stocking' },
    { country: 'Rwanda', hub: 'Kigali Free Zone Distribution Center', focus: 'Central Africa & Great Lakes Clinical Network' },
    { country: 'South Africa', hub: 'Johannesburg & Durban Maritime Hub', focus: 'Southern Africa SADC Bulk FCL Supply' },
    { country: 'Nigeria', hub: 'Lagos Port & Air Cargo Desk', focus: 'West Africa Teaching Hospitals & Private Clinics' },
    { country: 'India', hub: 'New Delhi & Mumbai Export Forwarding', focus: 'Bio-Polymer Extrusion & High-Throughput Diagnostics' }
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. Page Header */}
      <div className="bg-[#0B2F63] text-white py-14 sm:py-18 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#38B6FF]">
              <Phone className="w-4 h-4" />
              <span>International Procurement & Support Desk</span>
            </div>
            <h1 className="text-3xl sm:text-4.5xl font-extrabold tracking-tight text-white">
              Contact Secure MediTech Global
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Connect directly with our registered US headquarters, regional forwarding hubs, or dedicated clinical specialist desk for proforma quotations, regulatory files, and contract manufacturing proposals.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* 2. Primary Contact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Corporate Address */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0B2F63] flex items-center justify-center">
              <MapPin className="w-5 h-5 text-[#38B6FF]" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              US Headquarters
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-mono">
              30 N GOULD ST STE R<br />
              SHERIDAN, WY 82801<br />
              UNITED STATES
            </p>
          </div>

          {/* Direct Telephone */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0B2F63] flex items-center justify-center">
              <Phone className="w-5 h-5 text-emerald-500" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Procurement Hotline
            </h3>
            <div className="space-y-1 text-xs text-slate-600">
              <a href="tel:+13075334504" className="block font-mono font-bold text-slate-900 hover:text-[#38B6FF]">
                +1 (307) 533-4504
              </a>
              <span className="text-[11px] text-slate-400">Direct voice & WhatsApp desk</span>
            </div>
          </div>

          {/* Email Support */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0B2F63] flex items-center justify-center">
              <Mail className="w-5 h-5 text-[#38B6FF]" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Official Email
            </h3>
            <div className="space-y-1 text-xs text-slate-600">
              <a href="mailto:info@securemeditechglobal.com" className="block font-semibold text-slate-900 hover:text-[#38B6FF]">
                info@securemeditechglobal.com
              </a>
              <span className="text-[11px] text-slate-400">Responses within 24 business hours</span>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0B2F63] flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-500" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Business Hours
            </h3>
            <div className="space-y-1 text-xs text-slate-600">
              <div className="font-semibold text-slate-800">Mon – Fri: 08:00 – 18:00 MST</div>
              <div className="text-[11px] text-emerald-600 font-semibold">24/7 Trauma Emergency Dispatch</div>
            </div>
          </div>

        </div>

        {/* 3. Inquiry Form + Live Interactive Map Integration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="mb-6 space-y-1">
              <h2 className="text-xl font-bold text-[#0B2F63]">
                Send Direct Procurement Inquiry
              </h2>
              <p className="text-xs text-slate-500">
                Please complete the form below. A senior medical sales engineer will reach out with technical datasheets and pricing within 24 hours.
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-8 text-center space-y-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-base font-bold text-slate-900">Inquiry Transmitted Successfully</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Thank you for contacting Secure MediTech Global. Reference inquiry <strong>#SMT-{Math.floor(100000 + Math.random() * 900000)}</strong> has been registered with our international procurement team.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-2 px-4 py-2 bg-[#0B2F63] text-white text-xs font-bold rounded-xl"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Dr. / Mr. / Ms. Full Name"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-[#0B2F63] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Hospital / Institution Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      placeholder="Metropolitan Hospital / Ministry"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-[#0B2F63] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Institutional Email (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="procurement@hospital.org"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-[#0B2F63] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (xxx) xxx-xxxx"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-[#0B2F63] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Destination Country / Port *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder="e.g. Kenya, Nepal, South Africa"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-[#0B2F63] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-[#0B2F63] outline-none"
                    >
                      <option>Wholesale Hospital Procurement</option>
                      <option>OEM & Private Label Manufacturing</option>
                      <option>Tender & Ministry Supply Contract</option>
                      <option>Technical Dossier & CE Certifications</option>
                      <option>Biomedical Calibration & Servicing</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Requirements, Product SKUs & Order Quantities *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Specify required catheter sizes, target batch quantities, preferred Incoterm (FOB/CIF/DDP), and delivery timeline..."
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-[#0B2F63] outline-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 py-3 bg-[#0B2F63] hover:bg-[#124185] disabled:opacity-60 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Send className="w-4 h-4 text-[#38B6FF]" />
                    <span>{isSubmitting ? 'Transmitting...' : 'Send Inquiry'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={onOpenRfq}
                    className="w-full sm:w-auto px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <FileText className="w-4 h-4 text-[#0B2F63]" />
                    <span>Use Formal Multi-Item RFQ Builder</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Interactive Google Maps View & Corporate Profile */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Google Maps Interactive Frame */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="bg-[#0B2F63] text-white p-3.5 flex items-center justify-between">
                <span className="text-xs font-bold flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#38B6FF]" />
                  <span>US Corporate Location (Sheridan, WY)</span>
                </span>
                <span className="text-[10px] text-slate-300 font-mono">44.7972° N, 106.9562° W</span>
              </div>

              {/* Embedded Google Maps iFrame for 30 N Gould St, Sheridan, WY */}
              <div className="h-64 sm:h-72 w-full bg-slate-100 relative">
                <iframe
                  title="Secure MediTech Global Headquarters Map"
                  src="https://maps.google.com/maps?q=30%20N%20Gould%20St%20Ste%20R,%20Sheridan,%20WY%2082801&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="p-4 bg-slate-50 text-[11px] text-slate-600 flex items-center justify-between border-t border-slate-200">
                <span>30 N Gould St Ste R, Sheridan, WY 82801</span>
                <a
                  href="https://maps.google.com/?q=30+N+Gould+St+Ste+R+Sheridan+WY+82801"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0B2F63] font-bold hover:text-[#38B6FF]"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>

            {/* Direct WhatsApp Quick Connect Card */}
            <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-emerald-950">Instant Procurement Desk on WhatsApp</h4>
                  <p className="text-[11px] text-emerald-800">
                    Connect directly with an international sales engineer (+1 307 533-4504)
                  </p>
                </div>
              </div>
              <a
                href="https://wa.me/13075334504?text=Hello%20Secure%20MediTech%20Global,%20I%20am%20inquiring%20about%20hospital%20medical%20consumables%20procurement."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Launch WhatsApp Chat</span>
              </a>
            </div>

          </div>

        </div>

        {/* 4. Global Distribution Hub Network (Nepal, Kenya, Rwanda, South Africa, Nigeria, India) */}
        <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#38B6FF]">
                Regional Hubs & Forward Desks
              </div>
              <h3 className="text-lg font-bold text-[#0B2F63] mt-0.5">
                Global Forwarding & Bonded Storage Network
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-500">6 Strategic Nodes</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {regionalHubs.map((hub, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{hub.country}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <div className="text-xs font-semibold text-[#0B2F63]">{hub.hub}</div>
                <p className="text-[11px] text-slate-500 leading-tight">{hub.focus}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
