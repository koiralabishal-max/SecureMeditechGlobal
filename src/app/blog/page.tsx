import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen, Calendar, ChevronRight, Clock, User } from 'lucide-react';
import { SubpageLayout } from '@/components/SubpageLayout';
import { BLOG_POSTS } from '@/data/blog';
import {
  buildBreadcrumbSchema,
  buildWebPageSchema,
  ORGANIZATION_SCHEMA,
  serializeJsonLd,
  WEBSITE_SCHEMA,
} from '@/lib/schema';
import { SITE } from '@/lib/site';

export const dynamic = 'force-static';

const PAGE_TITLE = 'Medical Procurement & OEM Blog | Secure MediTech Global';
const PAGE_DESCRIPTION =
  'B2B medical procurement guides, ICU consumables selection, OEM cleanroom manufacturing insights, private-label strategy & EU MDR regulatory analysis.';

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  keywords: [
    'hospital procurement bulk medical supplies',
    'wholesale medical supplies supplier guide',
    'medical device OEM manufacturing explained',
    'private label medical supplies benefits',
    'essential ICU consumables hospital guide',
    'laboratory diagnostic equipment selection',
  ],
  alternates: { canonical: '/blog' },
  openGraph: {
    type: 'website',
    url: '/blog',
    siteName: SITE.name,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: SITE.ogImage,
        width: 1376,
        height: 768,
        alt: 'Secure MediTech Global Medical Procurement & Engineering Blog',
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
      path: '/blog',
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      type: 'CollectionPage',
    }),
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
    ]),
    {
      '@type': 'ItemList',
      name: 'Secure MediTech Global Medical Procurement & Regulatory Articles',
      numberOfItems: BLOG_POSTS.length,
      itemListElement: BLOG_POSTS.map((post, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        url: `${SITE.url}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  ],
};

export default function BlogIndexPage() {
  return (
    <SubpageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
      />

      {/* Blog Hero */}
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
              B2B Medical Supply Blog
            </span>
          </nav>

          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#8CB3D4]">
            <BookOpen className="w-4 h-4" />
            <span>Hospital Procurement, OEM Engineering &amp; Regulatory Insights</span>
          </p>

          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white max-w-4xl">
            Healthcare Procurement &amp; Medical Manufacturing Knowledge Hub
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            In-depth B2B technical guides for hospital materials directors, medical importers, and OEM device brands covering cleanroom quality audits, ICU disposables, diagnostic hardware, and cross-border freight.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {BLOG_POSTS.map((post, idx) => (
            <article
              key={post.id}
              className="group bg-white rounded-2xl border border-slate-200 hover:border-[#94B3CE] shadow-xs hover:shadow-lg transition-all flex flex-col overflow-hidden"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="relative aspect-[16/10] bg-slate-100 overflow-hidden block"
              >
                <Image
                  src={post.featuredImage}
                  alt={`${post.title} – ${SITE.name}`}
                  priority={idx === 0}
                  loading={idx < 3 ? 'eager' : 'lazy'}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  width={600}
                  height={375}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#223752]/90 text-white text-xs font-semibold px-2.5 py-1 rounded-md">
                  {post.category}
                </span>
              </Link>

              <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                <div className="space-y-2.5">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.publishedDate}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-lg font-extrabold text-[#223752] leading-snug">
                    <Link href={`/blog/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-slate-600 min-w-0">
                    <User className="w-3.5 h-3.5 text-[#3B6B91] shrink-0" />
                    <span className="truncate font-medium">{post.author}</span>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs font-bold text-[#223752] hover:text-[#3B6B91] inline-flex items-center gap-1 shrink-0"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Procurement CTA Bridge */}
        <section className="bg-[#223752] text-white rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-2xl font-extrabold">
              Need Sample Technical Files, Batch CoAs, or Custom OEM Pricing?
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Review our 18 certified SKUs across 8 clinical divisions or check regional logistics guides across 8 priority international corridors.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/products"
              className="h-11 px-5 bg-[#DCE7F2] hover:bg-[#CBDCEB] text-[#19293F] text-sm font-bold rounded-xl inline-flex items-center gap-2 transition-colors"
            >
              <span>Browse Medical Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/markets"
              className="h-11 px-5 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-xl inline-flex items-center border border-white/20 transition-colors"
            >
              <span>Explore Export Markets</span>
            </Link>
          </div>
        </section>
      </div>
    </SubpageLayout>
  );
}
