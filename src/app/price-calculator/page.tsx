import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calculator, ChevronRight } from 'lucide-react';
import { SubpageLayout } from '@/components/SubpageLayout';
import { PriceCalculatorPageClient } from '@/components/PriceCalculatorPageClient';
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

const PAGE_TITLE = 'Wholesale Medical Price & Volume Calculator | Secure MediTech';
const PAGE_DESCRIPTION =
  'Estimate FOB, CIF, DDP, and EXW wholesale budgets, carton volumes, and volume tier concessions for ISO 13485 medical consumables and OEM packs.';

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  keywords: [
    'wholesale medical supplies price calculator',
    'hospital consumables bulk quote estimator',
    'FOB CIF DDP medical freight estimator',
    'OEM medical device budget calculator',
  ],
  alternates: { canonical: '/price-calculator' },
  openGraph: {
    type: 'website',
    url: '/price-calculator',
    siteName: SITE.name,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: SITE.ogImage,
        width: 1376,
        height: 768,
        alt: 'Secure MediTech Global Budgetary Price & Volume Calculator',
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

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    ORGANIZATION_SCHEMA,
    WEBSITE_SCHEMA,
    buildWebPageSchema({
      path: '/price-calculator',
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      aboutId: ORGANIZATION_ID,
    }),
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Wholesale Price Estimator', path: '/price-calculator' },
    ]),
  ],
};

export default function PriceCalculatorPage() {
  return (
    <SubpageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
      />

      <section className="bg-[#19293F] text-white py-12 sm:py-14 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs text-slate-300 mb-5"
          >
            <Link href="/" className="hover:text-[#8CB3D4] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
            <span className="text-white font-semibold" aria-current="page">
              Wholesale Price Estimator
            </span>
          </nav>

          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#8CB3D4]">
            <Calculator className="w-4 h-4" />
            <span>Hospital &amp; Institutional Procurement Tool · Incoterms 2020</span>
          </p>

          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white max-w-4xl">
            Budgetary Price &amp; Volume Calculator
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Simulate order quantities across our 8 clinical divisions to preview indicative factory export rates, carton CBM logistics, and OEM private-label estimates before submitting an official RFQ.
          </p>
        </div>
      </section>

      <div className="bg-[#152336] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <PriceCalculatorPageClient />

          <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-slate-300 pt-2">
            <span>
              Looking for custom tender specifications or mixed-SKU FCL container pricing?
            </span>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/products"
                className="font-semibold text-[#8CB3D4] hover:underline inline-flex items-center gap-1"
              >
                <span>Browse All 18 Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="font-semibold text-white hover:text-[#8CB3D4] hover:underline inline-flex items-center gap-1"
              >
                <span>Contact Logistics Desk</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SubpageLayout>
  );
}
