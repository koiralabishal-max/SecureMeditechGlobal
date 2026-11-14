import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Anchor,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Factory,
  FileCheck,
  Globe2,
  MapPin,
  MessageSquare,
  Plane,
  ShieldCheck,
  ThermometerSnowflake,
} from 'lucide-react';
import { SubpageLayout } from '@/components/SubpageLayout';
import { BLOG_POST_BY_SLUG } from '@/data/blog';
import { COUNTRY_BY_SLUG, COUNTRY_MARKETS } from '@/data/markets';
import { PRODUCTS } from '@/data/products';
import { CATEGORY_BY_SLUG } from '@/lib/seo-strategy';
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
export const dynamicParams = false;

export function generateStaticParams() {
  return COUNTRY_MARKETS.map((m) => ({ country: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>;
}): Promise<Metadata> {
  const { country } = await params;
  const market = COUNTRY_BY_SLUG[country];

  if (!market) {
    return {
      title: 'Market Not Found',
      robots: { index: false, follow: true },
    };
  }

  const canonicalPath = `/markets/${market.slug}`;

  return {
    title: { absolute: market.seoTitle },
    description: market.metaDescription,
    keywords: [
      `wholesale medical supplies ${market.countryName}`,
      `hospital consumables supplier ${market.countryName}`,
      `OEM medical device manufacturer ${market.countryName}`,
      market.regulatoryAuthority.acronym,
      'ISO 13485 medical supplier',
    ],
    alternates: { canonical: canonicalPath },
    openGraph: {
      type: 'website',
      url: canonicalPath,
      siteName: SITE.name,
      title: market.seoTitle,
      description: market.metaDescription,
      images: [
        {
          url: SITE.ogImage,
          width: 1376,
          height: 768,
          alt: `Secure MediTech Global wholesale medical export to ${market.countryName}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: market.seoTitle,
      description: market.metaDescription,
      images: [SITE.ogImage],
    },
  };
}

export default async function CountryMarketPage({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const { country } = await params;
  const market = COUNTRY_BY_SLUG[country];

  if (!market) {
    notFound();
  }

  const marketPath = `/markets/${market.slug}`;
  const priorityCategories = market.priorityCategorySlugs
    .map((slug) => CATEGORY_BY_SLUG[slug])
    .filter(Boolean);
  const featuredProducts = PRODUCTS.filter((p) =>
    market.featuredProductIds.includes(p.id)
  );
  const relatedPosts = market.relatedBlogSlugs
    .map((slug) => BLOG_POST_BY_SLUG[slug])
    .filter(Boolean);

  const whatsAppUrl = `https://wa.me/13075334504?text=${encodeURIComponent(
    `Hello Secure MediTech Global, we are procuring medical supplies for ${market.countryName} and would like pricing, Incoterms, and export documentation.`
  )}`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      ORGANIZATION_SCHEMA,
      WEBSITE_SCHEMA,
      buildWebPageSchema({
        path: marketPath,
        name: market.seoTitle,
        description: market.metaDescription,
        aboutId: ORGANIZATION_ID,
      }),
      buildBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Global Markets', path: '/markets' },
        { name: market.countryName, path: marketPath },
      ]),
      {
        '@type': 'FAQPage',
        '@id': `${SITE.url}${marketPath}#faq`,
        mainEntity: market.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  };

  return (
    <SubpageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
      />

      {/* Country Hero */}
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
            <Link href="/markets" className="hover:text-[#38B6FF] transition-colors">
              Global Markets
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
            <span className="text-white font-semibold" aria-current="page">
              {market.countryName}
            </span>
          </nav>

          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#38B6FF]">
            <Globe2 className="w-4 h-4" />
            <span>{market.heroEyebrow}</span>
          </p>

          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white max-w-4xl">
            {market.h1}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            {market.heroSummary}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="h-11 px-5 bg-[#38B6FF] hover:bg-[#5cc4ff] text-[#071E40] text-sm font-bold rounded-xl transition-colors inline-flex items-center gap-2"
            >
              <span>Request {market.countryName} Wholesale Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 px-5 bg-white/10 hover:bg-white/15 text-white border border-white/20 text-sm font-semibold rounded-xl transition-colors inline-flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-[#10B981]" />
              <span>WhatsApp Export Desk</span>
            </a>
            <Link
              href="/#price-calculator"
              className="h-11 px-5 text-sm font-semibold text-[#38B6FF] hover:underline inline-flex items-center"
            >
              Estimate Landed Budget →
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-14">
        {/* Freight Corridor & Lead-Time Specs */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-5">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B2F63]">
              Logistics Architecture &amp; Entry Gateways for {market.countryName}
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {market.corridorOverview}
            </p>

            <div className="space-y-2.5 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Primary Destination Airports &amp; Seaports
              </h3>
              <ul className="space-y-2 text-sm text-slate-800">
                {market.portsAndAirports.map((port) => (
                  <li key={port} className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#38B6FF] shrink-0 mt-0.5" />
                    <span className="font-medium">{port}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                Key Procurement Considerations
              </h3>
              <ul className="space-y-2 text-sm text-slate-700">
                {market.procurementConsiderations.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0B2F63] text-white rounded-2xl p-6 sm:p-7 space-y-4">
              <h2 className="text-lg font-extrabold text-white">
                {market.countryName} Freight &amp; Incoterms 2020
              </h2>
              <div className="space-y-3 text-sm text-slate-200">
                <div className="flex items-start gap-3">
                  <Plane className="w-4 h-4 text-[#38B6FF] shrink-0 mt-1" />
                  <div>
                    <div className="text-xs uppercase tracking-wider text-[#38B6FF] font-bold">
                      Air Priority Lead Time
                    </div>
                    <p>{market.airLeadTime}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Anchor className="w-4 h-4 text-[#10B981] shrink-0 mt-1" />
                  <div>
                    <div className="text-xs uppercase tracking-wider text-[#10B981] font-bold">
                      Ocean / Overland Transit
                    </div>
                    <p>{market.oceanOrOverlandLeadTime}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ThermometerSnowflake className="w-4 h-4 text-[#38B6FF] shrink-0 mt-1" />
                  <div>
                    <div className="text-xs uppercase tracking-wider text-[#38B6FF] font-bold">
                      Cold-Chain Integrity
                    </div>
                    <p>{market.coldChainSpec}</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Supported Trade Terms
                </div>
                <div className="flex flex-wrap gap-2">
                  {market.incoterms.map((term) => (
                    <span
                      key={term}
                      className="text-xs font-semibold bg-white/10 border border-white/15 px-2.5 py-1 rounded-md text-white"
                    >
                      {term}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Regulatory & Importer Documentation */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-2xs">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-base font-extrabold text-[#0B2F63] flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-[#10B981]" />
                  <span>{market.regulatoryAuthority.acronym} Clearance Pack</span>
                </h2>
                <a
                  href={market.regulatoryAuthority.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-sky-700 hover:underline inline-flex items-center gap-1"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {market.regulatoryAuthority.frameworkSummary}
              </p>
              <ul className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                {market.regulatoryAuthority.documentationProvided.map((doc) => (
                  <li key={doc} className="flex items-start gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Recommended Product Divisions & SKUs */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-extrabold text-[#0B2F63]">
                Priority Medical Supplies &amp; Clinical Divisions for {market.countryName}
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Core ISO 13485:2016 and CE-marked items frequently consolidated for hospitals and licensed distributors in {market.countryName}.
              </p>
            </div>
            <Link href="/products" className="text-sm font-bold text-sky-700 hover:underline">
              View All 18 Products →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group bg-white rounded-2xl border border-slate-200 hover:border-[#38B6FF] shadow-2xs hover:shadow-md transition-all overflow-hidden flex flex-col"
              >
                <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={`${product.name} (${product.sku}) – Export to ${market.countryName}`}
                    loading="lazy"
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-mono text-slate-500">{product.sku}</span>
                    <h3 className="text-sm font-bold text-[#0B2F63] group-hover:underline mt-0.5">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">{product.tagline}</p>
                  </div>
                  <span className="text-xs font-bold text-sky-700 inline-flex items-center gap-1 pt-2">
                    <span>Specs &amp; MOQ ({product.minOrderQty})</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {priorityCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/products/category/${cat.slug}`}
                className="bg-white rounded-xl border border-slate-200 hover:border-[#38B6FF] p-4 flex items-center justify-between gap-2 transition-colors"
              >
                <span className="text-sm font-bold text-[#0B2F63]">{cat.name}</span>
                <ArrowRight className="w-4 h-4 text-[#38B6FF] shrink-0" />
              </Link>
            ))}
          </div>
        </section>

        {/* OEM & Private Label + Country FAQs */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 bg-sky-50/70 rounded-2xl border border-sky-200/80 p-6 sm:p-8 space-y-4">
            <h2 className="text-lg font-extrabold text-[#0B2F63] flex items-center gap-2">
              <Factory className="w-5 h-5 text-[#38B6FF]" />
              <span>OEM &amp; Private Label Supply for {market.countryName}</span>
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">{market.oemExportNote}</p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/oem-manufacturing"
                className="text-sm font-bold text-[#0B2F63] hover:text-sky-700 inline-flex items-center gap-1"
              >
                <span>Explore OEM Cleanroom Facility</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services"
                className="text-sm font-semibold text-slate-700 hover:text-[#0B2F63] inline-flex items-center gap-1"
              >
                <span>Regulatory Dossier Services</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
            <h2 className="text-lg font-extrabold text-[#0B2F63]">
              {market.countryName} Procurement &amp; Import FAQs
            </h2>
            <div className="space-y-4">
              {market.faqs.map((faq) => (
                <div key={faq.question} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <h3 className="text-sm font-bold text-[#0B2F63]">{faq.question}</h3>
                  <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Procurement Guides */}
        {relatedPosts.length > 0 && (
          <section className="space-y-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-extrabold text-[#0B2F63] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#38B6FF]" />
                <span>Recommended B2B Buyer Guides</span>
              </h2>
              <Link href="/blog" className="text-sm font-bold text-sky-700 hover:underline">
                View All Articles →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-[#38B6FF] p-5 flex items-center justify-between gap-4 transition-colors"
                >
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
                      {post.category}
                    </span>
                    <h3 className="text-base font-bold text-[#0B2F63] mt-1">{post.title}</h3>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">{post.summary}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#0B2F63] shrink-0" />
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="pt-2">
          <Link
            href="/markets"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B2F63] hover:text-[#38B6FF]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All 8 Global Export Markets</span>
          </Link>
        </div>
      </div>
    </SubpageLayout>
  );
}
