import React, { useState } from 'react';
import { X, Lock, Building, CheckCircle2, Shield, User, ArrowRight } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [licenseNo, setLicenseNo] = useState('');
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please fill in your work email and password.');
      return;
    }
    setErrorMessage('');
    // Simulate portal authentication
    setLoggedInUser(email.split('@')[0] || 'Procurement Officer');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !company || !licenseNo) {
      setErrorMessage('Please complete all regulatory registration fields.');
      return;
    }
    setErrorMessage('');
    setLoggedInUser(`${company} (Pending Verification)`);
  };

  const handleSignOut = () => {
    setLoggedInUser(null);
    setEmail('');
    setPassword('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#0B2F63] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#38B6FF]" />
            <h3 className="text-sm font-bold tracking-tight">
              {loggedInUser ? 'B2B Client Dashboard' : 'B2B Procurement & Distributor Portal'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {loggedInUser ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-12 h-12 bg-blue-50 text-[#0B2F63] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6 text-[#10B981]" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#0B2F63]">Welcome, {loggedInUser}</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Active Wholesale Procurement Account · Tier 1 Preferred Partner
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-left space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Account Status:</span>
                  <span className="font-bold text-emerald-600">Active · ISO 13485 Verified</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Contract Credit:</span>
                  <span className="font-mono font-bold text-slate-800">$250,000 USD (Net 60)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Assigned Logistics Lead:</span>
                  <span className="font-semibold text-slate-800">Marcus Sterling (Hamburg Desk)</span>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-2 text-xs font-bold text-white bg-[#0B2F63] hover:bg-[#164082] rounded-lg"
                >
                  Return to Catalog
                </button>
                <button
                  onClick={handleSignOut}
                  className="py-2 px-4 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Official Brand Logo */}
              <div className="flex justify-center mb-5">
                <img
                  src="/assets/aistudio/2026-10-24_7-15-55_PM_1fbce34f.png"
                  alt="Secure MediTech Global"
                  className="h-10 w-auto object-contain"
                />
              </div>

              {/* Tab Selector */}
              <div className="flex p-1 bg-slate-100 rounded-xl mb-6">
                <button
                  onClick={() => { setMode('login'); setErrorMessage(''); }}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    mode === 'login' ? 'bg-white text-[#0B2F63] shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Authorized Sign In
                </button>
                <button
                  onClick={() => { setMode('register'); setErrorMessage(''); }}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    mode === 'register' ? 'bg-white text-[#0B2F63] shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Apply for Distributor Account
                </button>
              </div>

              {errorMessage && (
                <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
                  {errorMessage}
                </div>
              )}

              {mode === 'login' ? (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Institutional Work Email
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="procurement@healthcare-system.org"
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#38B6FF]"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-semibold text-slate-700">
                        Password
                      </label>
                      <a href="#" className="text-[11px] text-[#38B6FF] hover:underline">
                        Forgot Password?
                      </a>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#38B6FF]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#0B2F63] hover:bg-[#164082] text-white text-xs font-bold rounded-lg shadow transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Sign In to Hospital Portal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleRegister} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Organization / Hospital Name
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. Apex Medical Wholesale GmbH"
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#38B6FF]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Medical Device Import / Wholesale License No.
                    </label>
                    <input
                      type="text"
                      value={licenseNo}
                      onChange={(e) => setLicenseNo(e.target.value)}
                      placeholder="e.g. MD-DIST-2026-EU"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#38B6FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Business Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="contact@distributor.com"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#38B6FF]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#38B6FF] hover:bg-[#209ee8] text-white text-xs font-bold rounded-lg shadow transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Submit Distributor Accreditation Application</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}

              <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-400 text-center">
                Access restricted to authenticated healthcare professionals and authorized medical device resellers.
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
