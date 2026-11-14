import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Cpu,
  Factory,
  FileCheck,
  Layers,
  MessageSquare,
  PackageCheck,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import { SubpageLayout } from '@/components/SubpageLayout';
import { OEM_STEPS } from '@/data/products';
import { CATEGORY_SEO_PROFILES } from '@/lib/seo-strategy';
import { SITE } from '@/lib/site';

export const dynamic = 'force-static';

const PAGE_TITLE = 'OEM Medical Device Manufacturer | Secure MediTech Global';
const PAGE_DESCRIPTION =
  'ISO 13485 OEM medical device manufacturer & private label medical supplies partner. Class 7/8 cleanrooms, DFM tooling, CE MDR dossiers & MOQs from 500 units.';

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  keywords: [
    'OEM medical device manufacturer',
    'private label medical supplies',
    'ISO 13485 contract manufacturing',
    'ISO Class 7 cleanroom medical molding',
    'custom surgical procedure packs OEM',
    'CE MDR 2017/745 technical dossier OEM partner',
  ],
  alternates: { canonical: '/oem-manufacturing' },
  openGraph: {
    type: 'website',
    url: '/oem-manufacturing',
    siteName: SITE.name,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: '/assets/images/oem_cleanroom_facility_1792848782226.jpg',
        width: 1200,
        height: 675,
        alt: 'ISO Class 7 medical device OEM cleanroom manufacturing facility',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ['/assets/images/oem_cleanroom_facility_1792848782226.jpg'],
  },
};

const OEM_MOQ_TIERS = [
  {
    group: 'Catheter & Critical Care Kits',
    examples: 'CVP Kits, Dialysis Catheters, Pressure Monitoring Sets',
    moq: '500 to 1,000 units',
    categorySlug: 'critical-care-monitoring',
  },
  {
    group: 'Extruded & Molded Consumables',
    examples: 'IV Cannulas, Closed Suction Catheters, Endotracheal Tubes',
    moq: '2,500 to 5,000 units',
    categorySlug: 'anesthesia-airway-management',
  },
  {
    group: 'High-Volume Consumables & Procedure Packs',
    examples: 'OT Combo Packs, Gravity IV Sets, Surgical Drapes & Gloves',
    moq: '5,000 to 10,000 units',
    categorySlug: 'surgical-ot-supplies',
  },
];

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${SITE.url}/oem-manufacturing#service`,
      name: PAGE_TITLE,
      serviceType: 'OEM & Private Label Medical Device Contract Manufacturing',
      description: PAGE_DESCRIPTION,
      provider: { '@id': `${SITE.url}/#organization` },
      areaServed: 'Worldwide',
      url: `${SITE.url}/oem-manufacturing`,
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE.url}/` },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE.url}/services` },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'OEM & Private Label Manufacturing',
          item: `${SITE.url}/oem-manufacturing`,
        },
      ],
    },
  ],
};

export default function OemManufacturingPage() {
  const stepIcons = [
    <Cpu key="0" className="w-5 h-5 text-[#38B6FF]" />,
    <ShieldCheck key="1" className="w-5 h-5 text-[#10B981]" />,
    <FileCheck key="2" className="w-5 h-5 text-[#38B6FF]" />,
    <Truck key="3" className="w-5 h-5 text-[#10B981]" />,
  ];

  const whatsAppUrl = `https://wa.me/13075334504?text=${encodeURIComponent(
    'Hello Secure MediTech Global, I would like to discuss OEM contract manufacturing or private-label medical supplies.'
  )}`;

  return (
    <SubpageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />

      {/* Hero Section */}
      <section className="bg-[#071E40] text-white py-14 sm:py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-xs text-slate-300 mb-5"
          >
            <Link href="/" className="hover:text-[#38B6FF] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
            <Link href="/services" className="hover:text-[#38B6FF] transition-colors">
              Services
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
            <span className="text-white font-semibold" aria-current="page">
              OEM &amp; Private Label Manufacturing
            </span>
          </nav>

          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#38B6FF]">
            <Factory className="w-4 h-4" />
            <span>ISO 13485:2016 · ISO Class 7 &amp; Class 8 Cleanrooms</span>
          </p>

          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white max-w-4xl">
            OEM Medical Device Manufacturer &amp; Private Label Medical Supplies
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Partner with an accredited medical contract manufacturer for custom CAD tooling, HEPA-filtered cleanroom injection molding, spiral wire catheter extrusion, custom surgical OT procedure packs, and complete EU MDR (EU) 2017/745 regulatory dossiers.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="h-11 px-5 bg-[#38B6FF] hover:bg-[#5cc4ff] text-[#071E40] text-sm font-bold rounded-xl transition-colors inline-flex items-center gap-2"
            >
              <span>Request OEM Technical Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 px-5 bg-white/10 hover:bg-white/15 text-white border border-white/20 text-sm font-semibold rounded-xl transition-colors inline-flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-[#10B981]" />
              <span>Discuss Private Label MOQs</span>
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        {/* Cleanroom Facility Overview */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-2xs">
          <div className="lg:col-span-6 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2F63] tracking-tight">
              Turnkey Contract Manufacturing from Prototype to Port Clearance
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Our biomedical engineering and regulatory teams support medical device brand owners, hospital alliances, and national distributors with confidential NDA execution, rapid 7–10 business day prototypes, and validated SAL 10⁻⁶ Ethylene Oxide (ISO 11135) or Gamma (ISO 11137) sterilization.
            </p>
            <ul className="space-y-2.5 text-sm text-slate-700 pt-2">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                <span>Multi-cavity medical-grade USP Class VI polymer injection molding &amp; spiral catheter extrusion</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                <span>Custom Tyvek® sterile blister trays, dual-language IFUs &amp; GS1 barcode serialization</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                <span>Pre-production clinical evaluation samples (5–10 units) shipped globally via courier</span>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm aspect-[16/10]">
              <img
                src="/assets/images/oem_cleanroom_facility_1792848782226.jpg"
                alt="Secure MediTech Global ISO Class 7 and Class 8 cleanroom medical device contract manufacturing facility"
                width={800}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* 4-Stage OEM Lifecycle */}
        <section>
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2F63] tracking-tight">
              4-Stage OEM &amp; ODM Production Workflow
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1.5 max-w-3xl">
              Full engineering traceability from Design for Manufacturability (DFM) through EU MDR technical documentation and bonded international freight.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OEM_STEPS.map((item, idx) => (
              <div
                key={item.step}
                className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-2xs space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0B2F63] text-[#38B6FF] font-extrabold text-sm flex items-center justify-center">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#0B2F63]">{item.title}</h3>
                      <p className="text-xs text-slate-500 font-medium">{item.subtitle}</p>
                    </div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    {stepIcons[idx]}
                  </div>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed">{item.description}</p>

                <ul className="space-y-2 pt-1">
                  {item.deliverables.map((deliv) => (
                    <li
                      key={deliv}
                      className="flex items-center gap-2 text-xs sm:text-sm text-slate-800 font-medium bg-slate-50 px-3 py-2 rounded-lg border border-slate-100"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                      <span>{deliv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Private Label MOQ Matrix */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B2F63] flex items-center gap-2">
                <PackageCheck className="w-5 h-5 text-[#38B6FF]" />
                <span>Private Label Minimum Order Quantities (MOQs)</span>
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Flexible OEM volume thresholds designed for both regional distributors and national hospital tenders.
              </p>
            </div>
            <Link
              href="/#price-calculator"
              className="text-sm font-bold text-sky-700 hover:underline shrink-0"
            >
              Open Wholesale Price Estimator →
            </Link>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#0B2F63]/5 text-[#0B2F63] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 font-semibold">OEM Product Group</th>
                  <th className="py-3 px-4 font-semibold">Verified Product Lines</th>
                  <th className="py-3 px-4 font-semibold">Standard OEM MOQ</th>
                  <th className="py-3 px-4 font-semibold text-right">Browse Division</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {OEM_MOQ_TIERS.map((tier) => (
                  <tr key={tier.group} className="bg-white">
                    <td className="py-3.5 px-4 font-bold text-[#0B2F63]">{tier.group}</td>
                    <td className="py-3.5 px-4 text-slate-600">{tier.examples}</td>
                    <td className="py-3.5 px-4 font-semibold text-emerald-700">{tier.moq}</td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/products/category/${tier.categorySlug}`}
                        className="text-sky-700 font-semibold hover:underline inline-flex items-center gap-1"
                      >
                        <span>View Division</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Cross-Links to Product Divisions & Services */}
        <section className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B2F63] flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#38B6FF]" />
              <span>OEM-Eligible Clinical Divisions</span>
            </h2>
            <Link href="/services" className="text-sm font-bold text-sky-700 hover:underline">
              Explore All 6 Medical Supply Services →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CATEGORY_SEO_PROFILES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/products/category/${cat.slug}`}
                className="bg-white rounded-xl border border-slate-200 hover:border-[#38B6FF] p-4 transition-all shadow-2xs hover:shadow-md flex flex-col justify-between gap-2"
              >
                <h3 className="text-sm font-bold text-[#0B2F63]">{cat.name}</h3>
                <span className="text-xs text-sky-700 font-semibold inline-flex items-center gap-1">
                  <span>View Division Specs</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </SubpageLayout>
  );
}
