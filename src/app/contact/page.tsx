import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ChevronRight, FileText, Globe2, ShieldCheck } from 'lucide-react';
import { SubpageLayout } from '@/components/SubpageLayout';
import { ContactSection } from '@/components/ContactSection';
import {
  buildBreadcrumbSchema,
  buildWebPageSchema,
  ORGANIZATION_ID,
  ORGANIZATION_SCHEMA,
  serializeJsonLd,
  WEBSITE_SCHEMA,
} from '@/lib/schema';
import { SITE } from '@/lib/site';

export const dynamic = 'force-static';

const PAGE_TITLE = 'Contact Wholesale Medical Supplies Desk | Secure MediTech';
const PAGE_DESCRIPTION =
  'Request wholesale medical quotes, OEM manufacturing consultations & hospital RFQs. Call +1-307-533-4504 or email info@securemeditechglobal.com (24/7 Mon–Sat).';

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  keywords: [
    'wholesale medical supplies inquiry',
    'hospital procurement RFQ desk',
    'OEM medical manufacturing consultation',
    'medical distributor partnership application',
    'Incoterms 2020 medical freight quote',
  ],
  alternates: { canonical: '/contact' },
  openGraph: {
    type: 'website',
    url: '/contact',
    siteName: SITE.name,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: SITE.ogImage,
        width: 1376,
        height: 768,
        alt: 'Contact Secure MediTech Global Wholesale Medical Procurement Desk',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [SITE.ogImage],
  },
};

const INCOTERMS = [
  { code: 'EXW', label: 'Ex Works — Factory cleanroom pickup' },
  { code: 'FOB', label: 'Free On Board — Export port loading' },
  { code: 'CIF / CFR', label: 'Cost, Insurance & Freight — Destination seaport' },
  { code: 'DAP / DDP', label: 'Delivered Duty Paid — Hospital or distributor depot' },
];

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    ORGANIZATION_SCHEMA,
    WEBSITE_SCHEMA,
    buildWebPageSchema({
      path: '/contact',
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      type: 'ContactPage',
      mainEntityId: ORGANIZATION_ID,
    }),
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Contact Us', path: '/contact' },
    ]),
  ],
};

export default function ContactPage() {
  return (
    <SubpageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(structuredData),
        }}
      />

      {/* Hero Strip */}
      <section className="bg-[#071E40] text-white py-12 sm:py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs text-slate-300 mb-5"
          >
            <Link href="/" className="hover:text-[#38B6FF] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
            <span className="text-white font-semibold" aria-current="page">
              Contact Us
            </span>
          </nav>

          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#38B6FF]">
            <Globe2 className="w-4 h-4" />
            <span>24/7 Global Tender &amp; Distributor Support · 12-Hour Response SLA</span>
          </p>

          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white max-w-4xl">
            Wholesale Medical Supplies Inquiry &amp; OEM Procurement Desk
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Connect directly with our international logistics coordinators for bulk hospital quotations, private-label OEM tooling, sample evaluation kits, or EU MDR technical dossier packages.
          </p>
        </div>
      </section>

      {/* Main Interactive Contact Section */}
      <ContactSection />

      {/* Incoterms & Documentation Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B2F63] flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#38B6FF]" />
              <span>Supported Incoterms 2020 &amp; Export Clearance Packs</span>
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every export order includes Commercial Invoice, batch-serialized Packing List, Certificate of Origin (COO), Certificate of Analysis (CoA), and EtO / Gamma Sterilization Validation Certificates tailored for SAHPRA, Kenya PPB, Rwanda FDA, NAFDAC, CDSCO, and Nepal DDA.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {INCOTERMS.map((term) => (
                <div
                  key={term.code}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm"
                >
                  <span className="font-bold text-[#0B2F63]">{term.code}: </span>
                  <span className="text-slate-600">{term.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#F8FAFC] rounded-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
              <ShieldCheck className="w-4 h-4" />
              <span>Self-Service Procurement Resources</span>
            </div>
            <h3 className="text-lg font-bold text-[#0B2F63]">
              Need a quick budget check before submitting an RFQ?
            </h3>
            <div className="space-y-2.5">
              <Link
                href="/#price-calculator"
                className="w-full h-11 px-4 bg-[#38B6FF] hover:bg-[#5cc4ff] text-[#071E40] text-sm font-bold rounded-xl inline-flex items-center justify-between transition-colors"
              >
                <span>Open Wholesale Price Estimator</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/products"
                className="w-full h-11 px-4 bg-white hover:bg-slate-100 text-[#0B2F63] border border-slate-200 text-sm font-semibold rounded-xl inline-flex items-center justify-between transition-colors"
              >
                <span>Browse All 18 Certified Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/oem-manufacturing"
                className="w-full h-11 px-4 bg-white hover:bg-slate-100 text-[#0B2F63] border border-slate-200 text-sm font-semibold rounded-xl inline-flex items-center justify-between transition-colors"
              >
                <span>Review OEM &amp; Private Label MOQs</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SubpageLayout>
  );
}
