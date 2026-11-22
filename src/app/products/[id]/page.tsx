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
  Factory,
  Globe,
  Layers,
  Package,
  ShieldCheck,
} from 'lucide-react';
import { SubpageLayout } from '@/components/SubpageLayout';
import { ProductConversionActions } from '@/components/ProductConversionActions';
import { ProductViewTracker } from '@/components/TrackedLinks';
import { PRODUCTS } from '@/data/products';
import { SERVICES } from '@/data/services';
import { CATEGORY_BY_NAME, PRODUCT_SEO_MAP } from '@/lib/seo-strategy';
import {
  buildBreadcrumbSchema,
  buildProductSchema,
  buildWebPageSchema,
  ORGANIZATION_SCHEMA,
  serializeJsonLd,
  WEBSITE_SCHEMA,
} from '@/lib/schema';
import { SITE, toCategorySlug } from '@/lib/site';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ id: product.id }));
}

function buildProductTitle(name: string): string {
  const baseName = name.replace(/\s*\([^)]*\)/g, '').trim();
  const fullBrand = `${baseName} | ${SITE.name}`;
  if (fullBrand.length <= 60) return fullBrand;
  const shortBrand = `${baseName} | Secure MediTech`;
  if (shortBrand.length <= 60) return shortBrand;
  return `${baseName.slice(0, 40).trimEnd()} | Secure MediTech`;
}

function buildProductDescription(product: (typeof PRODUCTS)[number]): string {
  const raw = `${product.name} (${product.sku}) – ${product.tagline}. ${product.certifications.join(', ')} certified. MOQ ${product.minOrderQty}, dispatch ${product.leadTime}.`;
  if (raw.length <= 160) return raw;
  return `${raw.slice(0, 157).trimEnd()}...`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return {
      title: 'Product Not Found',
      robots: { index: false, follow: true },
    };
  }

  const title = buildProductTitle(product.name);
  const description = buildProductDescription(product);
  const canonicalPath = `/products/${product.id}`;
  const productSeo = PRODUCT_SEO_MAP[product.id];

  return {
    title: { absolute: title },
    description,
    keywords: [
      ...(productSeo ? [productSeo.primaryKeyword, ...productSeo.secondaryKeywords] : []),
      product.name,
      product.sku,
      product.category,
      ...product.certifications,
      ...product.standards,
    ],
    alternates: { canonical: canonicalPath },
    openGraph: {
      type: 'website',
      url: canonicalPath,
      siteName: SITE.name,
      title,
      description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: `${product.name} (${product.sku}) – ${product.category}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  const categorySlug = toCategorySlug(product.category);
  const categoryProfile = CATEGORY_BY_NAME[product.category];
  const productSeo = PRODUCT_SEO_MAP[product.id];
  const relatedServices = categoryProfile
    ? SERVICES.filter((s) => categoryProfile.relatedServiceIds.includes(s.id)).slice(0, 2)
    : SERVICES.slice(0, 2);

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  const productPath = `/products/${product.id}`;
  const productSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      ORGANIZATION_SCHEMA,
      WEBSITE_SCHEMA,
      buildWebPageSchema({
        path: productPath,
        name: buildProductTitle(product.name),
        description: buildProductDescription(product),
        type: 'ItemPage',
        mainEntityId: `${SITE.url}${productPath}#product`,
      }),
      buildProductSchema(product),
      buildBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/products' },
        { name: product.category, path: `/products/category/${categorySlug}` },
        { name: product.name, path: productPath },
      ]),
    ],
  };

  return (
    <SubpageLayout>
      <ProductViewTracker
        id={product.id}
        sku={product.sku}
        name={product.name}
        category={product.category}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(productSchema) }}
      />

      {/* Breadcrumb & Header Strip */}
      <section className="bg-[#19293F] text-white py-10 sm:py-12 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-slate-300 mb-5">
            <Link href="/" className="hover:text-[#8CB3D4] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
            <Link href="/products" className="hover:text-[#8CB3D4] transition-colors">
              Products
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
            <Link
              href={`/products/category/${categorySlug}`}
              className="hover:text-[#8CB3D4] transition-colors"
            >
              {product.category}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
            <span className="text-white font-semibold" aria-current="page">
              {product.sku}
            </span>
          </nav>

          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <span className="text-xs font-mono bg-[#DCE7F2] text-[#19293F] font-bold px-2.5 py-1 rounded-md">
              {product.sku}
            </span>
            <Link
              href={`/products/category/${categorySlug}`}
              className="text-xs font-semibold text-slate-300 hover:text-[#8CB3D4] uppercase tracking-wider transition-colors"
            >
              {product.category}
            </Link>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white max-w-4xl">
            {product.name}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[#8CB3D4] font-medium max-w-3xl">
            {product.tagline}
          </p>
        </div>
      </section>

      {/* Main Product Specification Body */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Image, Certifications, Logistics, OEM */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm aspect-[4/3]">
              <Image
                src={product.image}
                alt={`${product.name} (${product.sku}) – ${product.category}`}
                priority
                fetchPriority="high"
                sizes="(max-width: 1024px) 100vw, 480px"
                width={800}
                height={600}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
              <h2 className="text-sm font-bold text-[#223752] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#3F7D6B]" />
                <span>Regulatory Certifications &amp; Standards</span>
              </h2>
              <div className="flex flex-wrap gap-2">
                {product.certifications.map((cert) => (
                  <span
                    key={cert}
                    className="bg-[#F1F5F8] text-[#223752] border border-[#DCE4EC] px-3 py-1 rounded-lg text-xs font-bold"
                  >
                    {cert}
                  </span>
                ))}
              </div>
              <ul className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                {product.standards.map((std) => (
                  <li key={std} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#3F7D6B] shrink-0" />
                    <span>{std}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 text-sm text-slate-700">
              <h2 className="text-sm font-bold text-[#223752]">Procurement &amp; Logistics Profile</h2>
              <div className="flex items-center gap-2.5">
                <Package className="w-4 h-4 text-[#3B6B91] shrink-0" />
                <span>
                  Minimum Order Quantity: <strong className="text-slate-900">{product.minOrderQty}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#3B6B91] shrink-0" />
                <span>
                  Standard Dispatch Lead Time: <strong className="text-slate-900">{product.leadTime}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#3B6B91] shrink-0" />
                <span>Export Packaging: {product.packaging}</span>
              </div>
            </div>

            {/* OEM & Private Label Callout */}
            <div className="bg-[#F1F5F8] p-5 rounded-2xl border border-[#DCE4EC] space-y-2.5">
              <h2 className="text-sm font-bold text-[#223752] flex items-center gap-2">
                <Factory className="w-4 h-4 text-[#3B6B91]" />
                <span>OEM &amp; Private-Label Availability</span>
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed">
                Available for private-label packaging, custom pouch artwork, and tender dossier compilation under ISO 13485:2016.
              </p>
              <Link
                href="/oem-manufacturing"
                className="text-xs font-bold text-[#223752] hover:text-[#3B6B91] inline-flex items-center gap-1"
              >
                <span>Explore OEM Contract Manufacturing</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Description, Applications, Sizes, Technical Specs, Actions */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
              <div>
                <h2 className="text-lg font-bold text-[#223752] mb-2">
                  Clinical Overview &amp; Technical Profile
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {productSeo?.applications && productSeo.applications.length > 0 && (
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
                    Verified Clinical Applications
                  </h2>
                  <ul className="space-y-2 text-sm text-slate-700">
                    {productSeo.applications.map((app) => (
                      <li key={app} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#3F7D6B] shrink-0 mt-0.5" />
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#3B6B91]" />
                    <span>Available Gauges, Lengths &amp; Configurations</span>
                  </h2>
                  <ul className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2">
                    {product.sizes.map((size) => (
                      <li key={size} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3B6B91] mt-2 shrink-0" />
                        <span className="font-medium">{size}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Technical Engineering Specifications
                </h2>
                <div className="overflow-hidden rounded-xl border border-slate-200">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-[#223752]/5 text-[#223752] border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4 font-semibold w-1/3">Parameter</th>
                        <th className="py-3 px-4 font-semibold">Specification</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {Object.entries(product.specs).map(([key, value], idx) => (
                        <tr key={key} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                          <td className="py-3 px-4 font-medium text-slate-600 align-top">{key}</td>
                          <td className="py-3 px-4 font-semibold text-slate-900">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Procurement Actions */}
              <ProductConversionActions product={product} />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <Link
                href={`/products/category/${categorySlug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#223752] hover:text-[#3B6B91] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>All {product.category} Supplies</span>
              </Link>
              <Link
                href="/price-calculator"
                className="text-sm font-semibold text-[#3B6B91] hover:underline"
              >
                Estimate Order Budget →
              </Link>
            </div>
          </div>
        </div>

        {/* Supporting Services Links */}
        {relatedServices.length > 0 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
            {relatedServices.map((svc) => (
              <Link
                key={svc.id}
                href={`/services#${svc.slug}`}
                className="bg-white rounded-2xl border border-slate-200 hover:border-[#94B3CE] p-5 flex items-center justify-between gap-4 transition-colors shadow-2xs"
              >
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#3B6B91]">
                    Supporting B2B Service
                  </span>
                  <h2 className="text-base font-bold text-[#223752] mt-0.5">{svc.title}</h2>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">{svc.shortDescription}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#223752] shrink-0" />
              </Link>
            ))}
          </div>
        )}

        {/* Related Products in Category */}
        {relatedProducts.length > 0 && (
          <div className="mt-14 pt-12 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
              <h2 className="text-2xl font-extrabold text-[#223752]">
                Related {product.category} Supplies
              </h2>
              <Link
                href={`/products/category/${categorySlug}`}
                className="text-sm font-bold text-[#3B6B91] hover:underline"
              >
                View Entire Division →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/products/${rel.id}`}
                  className="group bg-white rounded-2xl border border-slate-200 hover:border-[#94B3CE] p-4 flex items-center gap-4 transition-all shadow-2xs hover:shadow-md"
                >
                  <Image
                    src={rel.image}
                    alt={`${rel.name} (${rel.sku})`}
                    loading="lazy"
                    width={96}
                    height={72}
                    referrerPolicy="no-referrer"
                    className="w-24 h-18 object-cover rounded-xl border border-slate-100 shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[11px] font-mono text-slate-500 block">{rel.sku}</span>
                    <h3 className="text-sm font-bold text-[#223752] group-hover:underline line-clamp-2 mt-0.5">
                      {rel.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </SubpageLayout>
  );
}
