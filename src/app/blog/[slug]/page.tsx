import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  ExternalLink,
  ShieldCheck,
  User,
} from 'lucide-react';
import { SubpageLayout } from '@/components/SubpageLayout';
import { BLOG_POST_BY_SLUG, BLOG_POSTS } from '@/data/blog';
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildWebPageSchema,
  ORGANIZATION_SCHEMA,
  serializeJsonLd,
  WEBSITE_SCHEMA,
} from '@/lib/schema';
import { SITE } from '@/lib/site';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POST_BY_SLUG[slug];

  if (!post) {
    return {
      title: 'Article Not Found',
      robots: { index: false, follow: true },
    };
  }

  const canonicalPath = `/blog/${post.slug}`;

  return {
    title: { absolute: post.seoTitle },
    description: post.metaDescription,
    keywords: [post.primaryKeyword, ...post.tags],
    authors: [{ name: post.author }],
    alternates: { canonical: canonicalPath },
    openGraph: {
      type: 'article',
      url: canonicalPath,
      siteName: SITE.name,
      title: post.seoTitle,
      description: post.metaDescription,
      publishedTime: post.isoDate,
      authors: [post.author],
      images: [
        {
          url: post.featuredImage,
          width: 1200,
          height: 675,
          alt: `${post.title} – ${SITE.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle,
      description: post.metaDescription,
      images: [post.featuredImage],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POST_BY_SLUG[slug];

  if (!post) {
    notFound();
  }

  const articlePath = `/blog/${post.slug}`;
  const relatedArticles = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      ORGANIZATION_SCHEMA,
      WEBSITE_SCHEMA,
      buildWebPageSchema({
        path: articlePath,
        name: post.seoTitle,
        description: post.metaDescription,
        mainEntityId: `${SITE.url}${articlePath}#article`,
      }),
      buildArticleSchema({
        slug: post.slug,
        headline: post.title,
        description: post.metaDescription,
        image: post.featuredImage,
        datePublished: post.isoDate,
        dateModified: post.isoDate,
        authorName: post.author,
        authorRole: post.authorRole,
        articleSection: post.category,
        keywords: post.tags,
        citations: post.externalReferences?.map((r) => r.url),
      }),
      buildBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: post.title, path: articlePath },
      ]),
    ],
  };

  return (
    <SubpageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
      />

      {/* Article Hero */}
      <section className="bg-[#071E40] text-white py-12 sm:py-16 border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-xs text-slate-300 mb-5"
          >
            <Link href="/" className="hover:text-[#38B6FF] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
            <Link href="/blog" className="hover:text-[#38B6FF] transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
            <span className="text-white font-semibold line-clamp-1" aria-current="page">
              {post.category}
            </span>
          </nav>

          <span className="inline-block text-xs font-bold uppercase tracking-[0.12em] text-[#38B6FF] mb-3">
            {post.category}
          </span>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {post.title}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            {post.summary}
          </p>

          <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center gap-5 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#38B6FF]" />
              <span>
                <strong className="text-white">{post.author}</strong> · {post.authorRole}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#10B981]" />
              <time dateTime={post.isoDate}>{post.publishedDate}</time>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#38B6FF]" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Body + Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Content */}
          <article className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-2xs space-y-8">
            <div className="rounded-2xl overflow-hidden border border-slate-200 aspect-[16/9] bg-slate-100">
              <img
                src={post.featuredImage}
                alt={`${post.title} – ${SITE.name}`}
                width={960}
                height={540}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Lead Paragraphs */}
            <div className="space-y-4 text-base text-slate-700 leading-relaxed">
              {post.content.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* Structured H2 Sections */}
            {post.sections &&
              post.sections.map((section) => (
                <section key={section.heading} className="space-y-4 pt-4 border-t border-slate-100">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B2F63] tracking-tight">
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((p, idx) => (
                    <p key={idx} className="text-base text-slate-700 leading-relaxed">
                      {p}
                    </p>
                  ))}
                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="space-y-2.5 pt-1 text-sm sm:text-base text-slate-700">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-1" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

            {/* External Authoritative References */}
            {post.externalReferences && post.externalReferences.length > 0 && (
              <section className="pt-6 border-t border-slate-200 space-y-3">
                <h2 className="text-base font-extrabold text-[#0B2F63]">
                  Regulatory &amp; Standards References
                </h2>
                <ul className="space-y-2 text-sm">
                  {post.externalReferences.map((ref) => (
                    <li key={ref.url} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[#0B2F63] hover:text-sky-700 hover:underline inline-flex items-center gap-1.5"
                      >
                        <span>{ref.title}</span>
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                      </a>
                      <div className="text-xs text-slate-500 mt-0.5">{ref.organization}</div>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Tags */}
            <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-semibold bg-sky-50 text-[#0B2F63] border border-sky-100 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>

          {/* Sticky Sidebar: Internal Links & Quote CTA */}
          <aside className="lg:col-span-4 space-y-6">
            {post.internalLinks && post.internalLinks.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xs">
                <h2 className="text-base font-extrabold text-[#0B2F63] flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#38B6FF]" />
                  <span>Related Catalog &amp; Corridor Links</span>
                </h2>
                <div className="space-y-2.5">
                  {post.internalLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block p-3 rounded-xl border border-slate-200 hover:border-[#38B6FF] hover:bg-sky-50/40 transition-colors"
                    >
                      <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700">
                        {link.type}
                      </span>
                      <div className="text-sm font-bold text-[#0B2F63] flex items-center justify-between gap-2 mt-0.5">
                        <span>{link.label}</span>
                        <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-[#0B2F63] text-white rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#38B6FF]">
                <ShieldCheck className="w-4 h-4" />
                <span>ISO 13485 &amp; CE MDR Verified</span>
              </div>
              <h2 className="text-lg font-extrabold leading-snug">
                Request Wholesale Pricing or OEM Technical Dossiers
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Receive itemized proforma quotes under EXW, FOB, CIF, or DDP Incoterms along with sample CoA and Free Sale Certificates.
              </p>
              <div className="space-y-2.5 pt-1">
                <Link
                  href="/contact"
                  className="w-full h-11 px-4 bg-[#38B6FF] hover:bg-[#5cc4ff] text-[#071E40] text-sm font-bold rounded-xl inline-flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Contact Procurement Desk</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/#price-calculator"
                  className="w-full h-11 px-4 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-xl inline-flex items-center justify-center border border-white/20 transition-colors"
                >
                  <span>Open Price Estimator</span>
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Guides */}
        <section className="mt-14 pt-12 border-t border-slate-200 space-y-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-2xl font-extrabold text-[#0B2F63]">
              More B2B Procurement &amp; Regulatory Guides
            </h2>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B2F63] hover:text-[#38B6FF]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>All Articles</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.slug}
                href={`/blog/${rel.slug}`}
                className="group bg-white rounded-2xl border border-slate-200 hover:border-[#38B6FF] p-5 flex flex-col justify-between gap-3 transition-all shadow-2xs hover:shadow-md"
              >
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
                    {rel.category}
                  </span>
                  <h3 className="text-base font-bold text-[#0B2F63] group-hover:underline mt-1">
                    {rel.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 line-clamp-2">{rel.summary}</p>
                </div>
                <span className="text-xs font-bold text-[#0B2F63] inline-flex items-center gap-1">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </SubpageLayout>
  );
}
