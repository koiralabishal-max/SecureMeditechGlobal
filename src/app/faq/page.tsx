import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, HelpCircle } from 'lucide-react';
import { SubpageLayout } from '@/components/SubpageLayout';
import { FaqPageClient } from '@/components/FaqPageClient';
import { FAQ_DATA } from '@/data/faqs';
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

const PAGE_TITLE = 'Procurement & OEM Logistics FAQ | Secure MediTech Global';
const PAGE_DESCRIPTION =
  'Answers on wholesale medical supply lead times, EXW/FOB/CIF/DDP Incoterms 2020, ISO 13485 cleanroom standards, and OEM private-label MOQs.';

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  keywords: [
    'wholesale medical supplies FAQ',
    'medical OEM MOQ minimums',
    'Incoterms 2020 medical shipping',
    'ISO 13485 cleanroom sterilization FAQ',
  ],
  alternates: { canonical: '/faq' },
  openGraph: {
    type: 'website',
    url: '/faq',
    siteName: SITE.name,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: SITE.ogImage,
        width: 1376,
        height: 768,
        alt: 'Secure MediTech Global Procurement & Logistics FAQ',
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
      path: '/faq',
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      aboutId: ORGANIZATION_ID,
      mainEntityId: `${SITE.url}/faq#questions`,
    }),
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Procurement FAQ', path: '/faq' },
    ]),
    {
      '@type': 'FAQPage',
      '@id': `${SITE.url}/faq#questions`,
      mainEntity: FAQ_DATA.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ],
};

export default function FaqPage() {
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
              Procurement &amp; Logistics FAQ
            </span>
          </nav>

          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#8CB3D4]">
            <HelpCircle className="w-4 h-4" />
            <span>Hospital Tenders · International Freight · OEM Compliance</span>
          </p>

          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white max-w-4xl">
            Medical Supply Procurement &amp; OEM Manufacturing FAQ
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Search verified guidance on wholesale batch dispatch lead times, cold-chain transit, custom OEM MOQs, and regulatory customs clearance documentation.
          </p>
        </div>
      </section>

      <FaqPageClient />
    </SubpageLayout>
  );
}
