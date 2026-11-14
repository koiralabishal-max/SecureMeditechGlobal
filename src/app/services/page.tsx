import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronRight,
  Factory,
  PenTool,
  ShieldCheck,
  Truck,
  Wrench,
} from 'lucide-react';
import { SubpageLayout } from '@/components/SubpageLayout';
import { SERVICES } from '@/data/services';
import { SITE } from '@/lib/site';

export const dynamic = 'force-static';

const PAGE_TITLE = 'Medical Contract Manufacturing & Logistics Services';
const PAGE_DESCRIPTION =
  'Private label medical supplies, ISO Class 7/8 contract manufacturing, CAD tooling, 2°C-8°C cold-chain freight, calibration & CE MDR regulatory dossiers.';

export const metadata: Metadata = {
  title: { absolute: 'Private Label Medical & OEM Services | Secure MediTech' },
  description: PAGE_DESCRIPTION,
  keywords: [
    'private label medical supplies',
    'medical contract manufacturing services',
    'CAD tooling DFM medical engineering',
    'cold-chain medical logistics forwarding',
    'turnkey hospital ward ICU equipment',
    'biomedical equipment calibration',
    'CE MDR regulatory technical dossier support',
  ],
  alternates: { canonical: '/services' },
  openGraph: {
    type: 'website',
    url: '/services',
    siteName: SITE.name,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: '/assets/images/oem_cleanroom_facility_1792848782226.jpg',
        width: 1200,
        height: 675,
        alt: 'Secure MediTech Global medical manufacturing and regulatory services',
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

const ICON_MAP: Record<string, React.ReactNode> = {
  Factory: <Factory className="w-5 h-5 text-[#38B6FF]" />,
  PenTool: <PenTool className="w-5 h-5 text-[#38B6FF]" />,
  Truck: <Truck className="w-5 h-5 text-[#10B981]" />,
  Building2: <Building2 className="w-5 h-5 text-[#38B6FF]" />,
  Wrench: <Wrench className="w-5 h-5 text-[#10B981]" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-[#38B6FF]" />,
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${SITE.url}/services#webpage`,
      url: `${SITE.url}/services`,
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      isPartOf: { '@id': `${SITE.url}/#website` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE.url}/` },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE.url}/services` },
      ],
    },
    {
      '@type': 'ItemList',
      name: 'Secure MediTech Global B2B Services',
      numberOfItems: SERVICES.length,
      itemListElement: SERVICES.map((svc, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        url: `${SITE.url}/services#${svc.slug}`,
        name: svc.title,
      })),
    },
  ],
};

export default function ServicesPage() {
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
            className="flex items-center gap-2 text-xs text-slate-300 mb-5"
          >
            <Link href="/" className="hover:text-[#38B6FF] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
            <span className="text-white font-semibold" aria-current="page">
              Medical Supply &amp; OEM Services
            </span>
          </nav>

          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#38B6FF]">
            <Wrench className="w-4 h-4" />
            <span>End-to-End Cleanroom, Regulatory &amp; Freight Execution</span>
          </p>

          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white max-w-4xl">
            Private Label Medical Supplies &amp; Contract Manufacturing Services
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Six integrated B2B service divisions supporting international medical equipment distributors, brand owners, and ministries of health—from DFM mold tooling and ISO Class 7/8 cleanroom production to cold-chain freight and CE MDR dossiers.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="/oem-manufacturing"
              className="h-11 px-5 bg-[#38B6FF] hover:bg-[#5cc4ff] text-[#071E40] text-sm font-bold rounded-xl transition-colors inline-flex items-center gap-2"
            >
              <span>Explore OEM Workflow &amp; MOQs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="h-11 px-5 bg-white/10 hover:bg-white/15 text-white border border-white/20 text-sm font-semibold rounded-xl transition-colors inline-flex items-center gap-2"
            >
              <span>Request Service Proposal</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6 Services Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
        {SERVICES.map((svc, index) => (
          <article
            key={svc.id}
            id={svc.slug}
            className="scroll-mt-24 bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden grid grid-cols-1 lg:grid-cols-12"
          >
            <div className="lg:col-span-5 relative min-h-[240px] bg-slate-100">
              <img
                src={svc.image}
                alt={`${svc.title} – ${SITE.name}`}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                width={600}
                height={420}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="lg:col-span-7 p-6 sm:p-8 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="p-2 rounded-xl bg-sky-50 border border-sky-100">
                    {ICON_MAP[svc.iconName] || <ShieldCheck className="w-5 h-5 text-[#38B6FF]" />}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {svc.targetAudience}
                  </span>
                </div>
              </div>

              <h2 className="text-2xl font-extrabold text-[#0B2F63] tracking-tight">
                {svc.title}
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {svc.fullDescription}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                    Verified Capabilities
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                    {svc.capabilities.map((cap) => (
                      <li key={cap} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#38B6FF] shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                    Key Institutional Benefits
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                    {svc.keyBenefits.map((ben) => (
                      <li key={ben} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                        <span>{ben}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {svc.standards.map((std) => (
                    <span
                      key={std}
                      className="text-xs font-semibold bg-slate-100 text-[#0B2F63] px-2.5 py-1 rounded-md"
                    >
                      {std}
                    </span>
                  ))}
                </div>
                <Link
                  href="/contact"
                  className="text-sm font-bold text-[#0B2F63] hover:text-[#38B6FF] inline-flex items-center gap-1.5"
                >
                  <span>Inquire for This Service</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </article>
        ))}

        {/* Bottom Navigation Bridge */}
        <section className="bg-[#0B2F63] text-white rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-2xl font-extrabold">
              Ready to Source Wholesale Hospital Supplies or Launch an OEM Line?
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Browse all 8 clinical divisions, simulate landed order costs in our calculator, or contact our 24/7 procurement desk for tender quotations.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/products"
              className="h-11 px-5 bg-[#38B6FF] hover:bg-[#5cc4ff] text-[#071E40] text-sm font-bold rounded-xl inline-flex items-center gap-2 transition-colors"
            >
              <span>Browse Medical Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/about"
              className="h-11 px-5 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-xl inline-flex items-center border border-white/20 transition-colors"
            >
              <span>About Our Quality Standards</span>
            </Link>
          </div>
        </section>
      </div>
    </SubpageLayout>
  );
}
