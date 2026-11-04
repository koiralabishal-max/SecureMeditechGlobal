import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowLeft, Home, FileText, Phone } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#0B2F63] flex items-center justify-center mx-auto">
        <AlertCircle className="w-8 h-8 text-[#38B6FF]" />
      </div>

      <div className="space-y-2">
        <div className="text-4xl sm:text-6xl font-extrabold text-[#0B2F63] font-mono">
          404
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
          Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
          The requested page or technical document does not exist or has been relocated to another section of the Secure MediTech Global web portal.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0B2F63] text-white text-xs font-bold rounded-xl hover:bg-[#124185] transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 text-slate-800 text-xs font-bold rounded-xl hover:bg-slate-200 transition-colors"
        >
          <FileText className="w-4 h-4" />
          <span>Browse Products Catalogue</span>
        </Link>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 text-slate-800 text-xs font-bold rounded-xl hover:bg-slate-200 transition-colors"
        >
          <Phone className="w-4 h-4" />
          <span>Contact Us</span>
        </Link>
      </div>
    </div>
  );
};
