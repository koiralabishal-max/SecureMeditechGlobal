import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  ChevronRight,
  Clock,
  Globe2,
  MapPin,
  Plane,
  ShieldCheck,
} from 'lucide-react';
import { SubpageLayout } from '@/components/SubpageLayout';
import { MarketsMapSection } from '@/components/MarketsMapSection';
import { COUNTRY_MARKETS } from '@/data/markets';
import {
  buildBreadcrumbSchema,
  buildWebPageSchema,
  ORGANIZATION_SCHEMA,
  serializeJsonLd,
  WEBSITE_SCHEMA,
} from '@/lib/schema';
import { SITE } from '@/lib/site';

export const dynamic = 'force-static';

const PAGE_TITLE = 'Global Medical Supply Markets | Secure MediTech Global';
const PAGE_DESCRIPTION =
  'Direct ISO 13485 medical supplies export corridors to Nepal, India, Kenya, Rwanda, South Africa, Nigeria, UK & USA with Incoterms 2020 & CE MDR dossiers.';

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  keywords: [
    'international medical equipment supplier',
    'wholesale medical supplies export',
    'hospital supplies Kenya Rwanda Nigeria South Africa',
    'medical consumables exporter Nepal India',
    'OEM medical manufacturing UK USA',
  ],
  alternates: { canonical: '/markets' },
  openGraph: {
    type: 'website',
    url: '/markets',
    siteName: SITE.name,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: SITE.ogImage,
        width: 1376,
        height: 768,
        alt: 'Secure MediTech Global International Medical Export Corridors',
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
      path: '/markets',
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      type: 'CollectionPage',
    }),
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Global Markets', path: '/markets' },
    ]),
    {
      '@type': 'ItemList',
      name: 'Secure MediTech Global Country Export Corridors',
      numberOfItems: COUNTRY_MARKETS.length,
      itemListElement: COUNTRY_MARKETS.map((market, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${SITE.url}/markets/${market.slug}`,
        name: market.h1,
      })),
    },
  ],
};

export default function MarketsHubPage() {
  return (
    <SubpageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
      />

      {/* Hero */}
      <section className="bg-[#19293F] text-white py-14 sm:py-16 border-b border-slate-800/80">
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
              Global Supply Markets
            </span>
          </nav>

          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#8CB3D4]">
            <Globe2 className="w-4 h-4" />
            <span>Direct Export Corridors · Incoterms 2020 · 65+ Countries Served</span>
          </p>

          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white max-w-4xl">
            International Medical Supply Corridors &amp; Country Export Guides
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Explore dedicated airport, seaport, and customs documentation frameworks for our 8 primary B2B export destinations—prepared directly for licensed national importers, hospital procurement boards, and regional medical distributors.
          </p>
        </div>
      </section>

      {/* Country Corridor Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COUNTRY_MARKETS.map((market) => (
            <article
              key={market.slug}
              className="bg-white rounded-2xl border border-slate-200 hover:border-[#94B3CE] shadow-2xs hover:shadow-lg transition-all p-6 flex flex-col justify-between gap-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#3B6B91] bg-[#F1F5F8] border border-[#DCE4EC] px-2.5 py-1 rounded-md">
                    {market.regionLabel}
                  </span>
                  <span className="text-xs font-semibold text-[#2F6153]">
                    {market.regulatoryAuthority.acronym}
                  </span>
                </div>

                <h2 className="text-xl font-extrabold text-[#223752] tracking-tight">
                  <Link href={`/markets/${market.slug}`} className="hover:text-[#3B6B91]">
                    {market.countryName} Medical Supply Corridor
                  </Link>
                </h2>

                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {market.heroSummary}
                </p>

                <dl className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-700">
                  <div className="flex items-start gap-2">
                    <Plane className="w-3.5 h-3.5 text-[#3B6B91] shrink-0 mt-0.5" />
                    <div>
                      <dt className="sr-only">Air Freight Lead Time</dt>
                      <dd className="font-medium">{market.airLeadTime}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#3F7D6B] shrink-0 mt-0.5" />
                    <div>
                      <dt className="sr-only">Primary Entry Port</dt>
                      <dd className="line-clamp-1 text-slate-600">{market.portsAndAirports[0]}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <dt className="sr-only">Ocean/Inland Transit</dt>
                      <dd className="text-slate-600">{market.oceanOrOverlandLeadTime}</dd>
                    </div>
                  </div>
                </dl>
              </div>

              <Link
                href={`/markets/${market.slug}`}
                className="w-full h-10 px-4 bg-[#223752] hover:bg-[#2E496B] text-white text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <span>View {market.countryName} Export Guide</span>
                <ArrowRight className="w-4 h-4 text-[#8CB3D4]" />
              </Link>
            </article>
          ))}
        </div>

        {/* Corporate Disclosure Banner */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2F6153]">
              <ShieldCheck className="w-4 h-4" />
              <span>Export &amp; Corporate Transparency</span>
            </div>
            <h2 className="text-xl font-extrabold text-[#223752]">
              US Corporate HQ Dispatching Globally via Licensed Importers
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Secure MediTech Global is headquartered at 30 N Gould St Ste R, Sheridan, WY 82801, USA. We coordinate export freight through regional hubs to authorized hospitals and country-licensed medical importers under Incoterms 2020.
            </p>
          </div>
          <Link
            href="/contact"
            className="h-11 px-5 bg-[#223752] hover:bg-[#19293F] text-white text-sm font-bold rounded-xl inline-flex items-center gap-2 shrink-0 transition-colors"
          >
            <span>Request Country Freight Quote</span>
            <ArrowRight className="w-4 h-4 text-[#8CB3D4]" />
          </Link>
        </section>

        {/* Interactive D3 Global Distribution Map */}
        <MarketsMapSection />
      </div>
    </SubpageLayout>
  );
}
