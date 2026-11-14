import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Clock,
  Globe,
  Layers,
  MessageSquare,
  Package,
  ShieldCheck,
} from 'lucide-react';
import { SubpageLayout } from '@/components/SubpageLayout';
import { PRODUCTS } from '@/data/products';
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

  return {
    title: { absolute: title },
    description,
    keywords: [product.name, product.sku, product.category, ...product.certifications, ...product.standards],
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
      title: `${product.name} | ${SITE.name}`,
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

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  const whatsAppUrl = `https://wa.me/13075334504?text=${encodeURIComponent(
    `Hello Secure MediTech Global, I am inquiring about specifications, sizes, and bulk pricing for ${product.name} (SKU: ${product.sku}).`
  )}`;

  const productSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        '@id': `${SITE.url}/products/${product.id}#product`,
        name: product.name,
        sku: product.sku,
        mpn: product.sku,
        category: product.category,
        description: product.description,
        image: `${SITE.url}${product.image}`,
        url: `${SITE.url}/products/${product.id}`,
        brand: {
          '@type': 'Brand',
          name: SITE.name,
        },
        manufacturer: {
          '@type': 'Organization',
          '@id': `${SITE.url}/#organization`,
          name: SITE.name,
          url: `${SITE.url}/`,
        },
        additionalProperty: [
          ...Object.entries(product.specs).map(([name, value]) => ({
            '@type': 'PropertyValue',
            name,
            value,
          })),
          { '@type': 'PropertyValue', name: 'Minimum Order Quantity', value: product.minOrderQty },
          { '@type': 'PropertyValue', name: 'Lead Time', value: product.leadTime },
          { '@type': 'PropertyValue', name: 'Standards', value: product.standards.join(', ') },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE.url}/` },
          { '@type': 'ListItem', position: 2, name: 'Products', item: `${SITE.url}/products` },
          {
            '@type': 'ListItem',
            position: 3,
            name: product.category,
            item: `${SITE.url}/products#${toCategorySlug(product.category)}`,
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: product.name,
            item: `${SITE.url}/products/${product.id}`,
          },
        ],
      },
    ],
  };

  return (
    <SubpageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema).replace(/</g, '\\u003c') }}
      />

      {/* Breadcrumb & Header Strip */}
      <section className="bg-[#071E40] text-white py-10 sm:py-12 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-slate-300 mb-5">
            <Link href="/" className="hover:text-[#38B6FF] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
            <Link href="/products" className="hover:text-[#38B6FF] transition-colors">
              Products
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
            <Link
              href={`/products#${toCategorySlug(product.category)}`}
              className="hover:text-[#38B6FF] transition-colors"
            >
              {product.category}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
            <span className="text-white font-semibold" aria-current="page">
              {product.sku}
            </span>
          </nav>

          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <span className="text-xs font-mono bg-[#38B6FF] text-[#071E40] font-bold px-2.5 py-1 rounded-md">
              {product.sku}
            </span>
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              {product.category}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white max-w-4xl">
            {product.name}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[#38B6FF] font-medium max-w-3xl">
            {product.tagline}
          </p>
        </div>
      </section>

      {/* Main Product Specification Body */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Image, Certifications, Logistics */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm aspect-[4/3]">
              <img
                src={product.image}
                alt={`${product.name} (${product.sku}) – ${product.category}`}
                width={640}
                height={480}
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
              <h2 className="text-sm font-bold text-[#0B2F63] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                <span>Regulatory Certifications &amp; Standards</span>
              </h2>
              <div className="flex flex-wrap gap-2">
                {product.certifications.map((cert) => (
                  <span
                    key={cert}
                    className="bg-sky-50 text-[#0B2F63] border border-sky-200 px-3 py-1 rounded-lg text-xs font-bold"
                  >
                    {cert}
                  </span>
                ))}
              </div>
              <ul className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                {product.standards.map((std) => (
                  <li key={std} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                    <span>{std}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 text-sm text-slate-700">
              <h2 className="text-sm font-bold text-[#0B2F63]">Procurement &amp; Logistics Profile</h2>
              <div className="flex items-center gap-2.5">
                <Package className="w-4 h-4 text-[#38B6FF] shrink-0" />
                <span>
                  Minimum Order Quantity: <strong className="text-slate-900">{product.minOrderQty}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#38B6FF] shrink-0" />
                <span>
                  Standard Dispatch Lead Time: <strong className="text-slate-900">{product.leadTime}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#38B6FF] shrink-0" />
                <span>Export Packaging: {product.packaging}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Description, Sizes, Technical Specs, Actions */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
              <div>
                <h2 className="text-lg font-bold text-[#0B2F63] mb-2">
                  Clinical Overview &amp; Indications
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#38B6FF]" />
                    <span>Available Gauges, Lengths &amp; Configurations</span>
                  </h2>
                  <ul className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2">
                    {product.sizes.map((size) => (
                      <li key={size} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#38B6FF] mt-2 shrink-0" />
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
                    <thead className="bg-[#0B2F63]/5 text-[#0B2F63] border-b border-slate-200">
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
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 h-12 px-5 bg-[#10B981] hover:bg-[#059669] text-white text-sm font-bold rounded-xl transition-colors inline-flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Enquire via WhatsApp Desk</span>
                </a>
                <Link
                  href="/#contact"
                  className="flex-1 h-12 px-5 bg-[#0B2F63] hover:bg-[#164082] text-white text-sm font-bold rounded-xl transition-colors inline-flex items-center justify-center gap-2"
                >
                  <span>Request Bulk RFQ / Dossier</span>
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B2F63] hover:text-[#38B6FF] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to All Medical Products</span>
              </Link>
              <Link
                href="/#price-calculator"
                className="text-sm font-semibold text-sky-700 hover:underline"
              >
                Estimate Order Budget →
              </Link>
            </div>
          </div>
        </div>

        {/* Related Products in Category */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-slate-200">
            <h2 className="text-2xl font-extrabold text-[#0B2F63] mb-6">
              Related {product.category} Supplies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/products/${rel.id}`}
                  className="group bg-white rounded-2xl border border-slate-200 hover:border-[#38B6FF] p-4 flex items-center gap-4 transition-all shadow-2xs hover:shadow-md"
                >
                  <img
                    src={rel.image}
                    alt={`${rel.name} (${rel.sku})`}
                    loading="lazy"
                    width={96}
                    height={72}
                    className="w-24 h-18 object-cover rounded-xl border border-slate-100 shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[11px] font-mono text-slate-500 block">{rel.sku}</span>
                    <h3 className="text-sm font-bold text-[#0B2F63] group-hover:underline line-clamp-2 mt-0.5">
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
