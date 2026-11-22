import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock,
  Layers,
  Package,
  ShieldCheck,
  Wrench,
} from 'lucide-react';
import { SubpageLayout } from '@/components/SubpageLayout';
import { CategoryConversionButtons } from '@/components/CategoryConversionButtons';
import { PRODUCTS } from '@/data/products';
import { SERVICES } from '@/data/services';
import {
  CATEGORY_BY_SLUG,
  CATEGORY_SEO_PROFILES,
} from '@/lib/seo-strategy';
import {
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
  return CATEGORY_SEO_PROFILES.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const profile = CATEGORY_BY_SLUG[slug];

  if (!profile) {
    return {
      title: 'Category Not Found',
      robots: { index: false, follow: true },
    };
  }

  const canonicalPath = `/products/category/${profile.slug}`;
  const firstProduct = PRODUCTS.find((p) => p.category === profile.name);
  const ogImage = firstProduct?.image || SITE.ogImage;

  return {
    title: { absolute: profile.seoTitle },
    description: profile.metaDescription,
    keywords: [
      profile.primaryKeyword,
      ...profile.secondaryKeywords,
      ...profile.longTailKeywords,
    ],
    alternates: { canonical: canonicalPath },
    openGraph: {
      type: 'website',
      url: canonicalPath,
      siteName: SITE.name,
      title: profile.seoTitle,
      description: profile.metaDescription,
      images: [
        {
          url: ogImage,
          width: 800,
          height: 600,
          alt: `${profile.name} – ${SITE.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: profile.seoTitle,
      description: profile.metaDescription,
      images: [ogImage],
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const profile = CATEGORY_BY_SLUG[slug];

  if (!profile) {
    notFound();
  }

  const categoryProducts = PRODUCTS.filter((p) => p.category === profile.name);
  const relatedServices = SERVICES.filter((s) =>
    profile.relatedServiceIds.includes(s.id)
  );
  const relatedCategories = CATEGORY_SEO_PROFILES.filter((c) =>
    profile.relatedCategorySlugs.includes(c.slug)
  );

  const allStandards = Array.from(
    new Set(categoryProducts.flatMap((p) => p.standards))
  );
  const allCertifications = Array.from(
    new Set(categoryProducts.flatMap((p) => p.certifications))
  );

  const whatsAppUrl = `https://wa.me/13075334504?text=${encodeURIComponent(
    `Hello Secure MediTech Global, I am looking for wholesale pricing, MOQs, and regulatory dossiers for ${profile.name}.`
  )}`;

  const categoryPath = `/products/category/${profile.slug}`;
  const categorySchema = {
    '@context': 'https://schema.org',
    '@graph': [
      ORGANIZATION_SCHEMA,
      WEBSITE_SCHEMA,
      buildWebPageSchema({
        path: categoryPath,
        name: profile.seoTitle,
        description: profile.metaDescription,
        type: 'CollectionPage',
      }),
      buildBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/products' },
        { name: profile.name, path: categoryPath },
      ]),
      {
        '@type': 'ItemList',
        name: `${profile.name} Wholesale Catalog`,
        numberOfItems: categoryProducts.length,
        itemListElement: categoryProducts.map((product, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `${SITE.url}/products/${product.id}`,
          name: product.name,
        })),
      },
    ],
  };

  return (
    <SubpageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(categorySchema),
        }}
      />

      {/* Category Hero */}
      <section className="bg-[#19293F] text-white py-14 sm:py-16 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-xs text-slate-300 mb-5"
          >
            <Link href="/" className="hover:text-[#8CB3D4] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
            <Link href="/products" className="hover:text-[#8CB3D4] transition-colors">
              Products
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
            <span className="text-white font-semibold" aria-current="page">
              {profile.name}
            </span>
          </nav>

          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#8CB3D4]">
            <Layers className="w-4 h-4" />
            <span>
              {profile.heroEyebrow} · {categoryProducts.length}{' '}
              {categoryProducts.length === 1 ? 'Product Line' : 'Product Lines'}
            </span>
          </p>

          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white max-w-4xl">
            {profile.heroHeading}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            {profile.overview}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <CategoryConversionButtons
              primaryLabel="Request Category Bulk Quote"
              whatsAppLabel="WhatsApp Wholesale Desk"
              whatsAppUrl={whatsAppUrl}
              source={`category_${profile.slug}`}
            />
            <Link
              href="/price-calculator"
              className="h-11 px-5 text-sm font-semibold text-[#8CB3D4] hover:underline inline-flex items-center"
            >
              Estimate Volume Pricing →
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        {/* Product Grid */}
        <section aria-labelledby="category-products-heading">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
            <div>
              <h2
                id="category-products-heading"
                className="text-2xl sm:text-3xl font-extrabold text-[#223752] tracking-tight"
              >
                {profile.name} Product Catalog
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-1">
                ISO 13485:2016 verified specifications, minimum order quantities, and export dispatch lead times.
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#223752] hover:text-[#3B6B91] shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>All 8 Clinical Divisions</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryProducts.map((product) => (
              <article
                key={product.id}
                className="group bg-white rounded-2xl border border-slate-200 hover:border-[#94B3CE] shadow-xs hover:shadow-lg transition-all flex flex-col overflow-hidden"
              >
                <Link
                  href={`/products/${product.id}`}
                  className="relative aspect-[4/3] bg-slate-100 overflow-hidden block"
                >
                  <Image
                    src={product.image}
                    alt={`${product.name} (${product.sku}) – ${product.category}`}
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    width={600}
                    height={450}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#223752]/90 text-white text-xs font-semibold px-2.5 py-1 rounded-md">
                    {product.certifications[0]}
                  </span>
                </Link>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs mb-2">
                      <span className="font-mono text-slate-500">{product.sku}</span>
                      <span className="font-medium text-[#2F6153] flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        ISO 13485
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#223752] leading-snug">
                      <Link href={`/products/${product.id}`} className="hover:underline">
                        {product.name}
                      </Link>
                    </h3>

                    <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
                      {product.tagline}
                    </p>

                    <dl className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs">
                      {Object.entries(product.specs)
                        .slice(0, 2)
                        .map(([k, v]) => (
                          <div key={k} className="flex items-baseline justify-between gap-3">
                            <dt className="text-slate-500 shrink-0">{k}</dt>
                            <dd className="text-slate-800 font-medium text-right truncate min-w-0">
                              {v}
                            </dd>
                          </div>
                        ))}
                    </dl>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 space-y-3">
                    <div className="grid grid-cols-2 gap-3 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <Package className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">MOQ: {product.minOrderQty}</span>
                      </div>
                      <div className="flex items-center gap-1.5 min-w-0">
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{product.leadTime}</span>
                      </div>
                    </div>

                    <Link
                      href={`/products/${product.id}`}
                      className="w-full h-10 px-4 text-sm font-bold text-white bg-[#223752] hover:bg-[#2E496B] rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Specifications &amp; Quote</span>
                      <ArrowRight className="w-4 h-4 text-[#8CB3D4]" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Clinical Applications & Standards */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-4">
            <h2 className="text-xl font-extrabold text-[#223752]">
              Hospital &amp; Clinical Applications
            </h2>
            <ul className="space-y-3 text-sm sm:text-base text-slate-700">
              {profile.clinicalApplications.map((app) => (
                <li key={app} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#3F7D6B] shrink-0 mt-1" />
                  <span>{app}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-4">
            <h2 className="text-xl font-extrabold text-[#223752]">
              Verified Division Compliance
            </h2>
            <div className="flex flex-wrap gap-2">
              {allCertifications.map((cert) => (
                <span
                  key={cert}
                  className="bg-[#F1F5F8] text-[#223752] border border-[#DCE4EC] px-3 py-1 rounded-lg text-xs font-bold"
                >
                  {cert}
                </span>
              ))}
            </div>
            <ul className="pt-3 border-t border-slate-100 space-y-2 text-xs sm:text-sm text-slate-600">
              {allStandards.map((std) => (
                <li key={std} className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#3F7D6B] shrink-0" />
                  <span>{std}</span>
                </li>
              ))}
            </ul>
            <div className="pt-3 border-t border-slate-100">
              <Link
                href="/oem-manufacturing"
                className="text-sm font-bold text-[#223752] hover:text-[#3B6B91] inline-flex items-center gap-1.5"
              >
                <span>Need private label or custom OEM packaging?</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Related Services & Sibling Divisions */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
            <h2 className="text-lg font-extrabold text-[#223752] flex items-center gap-2">
              <Wrench className="w-5 h-5 text-[#3B6B91]" />
              <span>Supporting OEM &amp; Logistics Services</span>
            </h2>
            <div className="space-y-3">
              {relatedServices.map((svc) => (
                <Link
                  key={svc.id}
                  href={`/services#${svc.slug}`}
                  className="block p-4 rounded-xl border border-slate-200 hover:border-[#94B3CE] hover:bg-[#F1F5F8]/60 transition-colors"
                >
                  <h3 className="text-sm font-bold text-[#223752]">{svc.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {svc.shortDescription}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
            <h2 className="text-lg font-extrabold text-[#223752] flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#3B6B91]" />
              <span>Related Clinical Product Divisions</span>
            </h2>
            <div className="space-y-3">
              {relatedCategories.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/products/category/${rel.slug}`}
                  className="flex items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 hover:border-[#94B3CE] hover:bg-[#F1F5F8]/60 transition-colors"
                >
                  <div>
                    <h3 className="text-sm font-bold text-[#223752]">{rel.name}</h3>
                    <p className="text-xs text-slate-600 mt-0.5 line-clamp-1">
                      {rel.metaDescription}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#223752] shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </SubpageLayout>
  );
}
