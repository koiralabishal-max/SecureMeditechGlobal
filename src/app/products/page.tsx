import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ChevronRight, Layers, Package, ShieldCheck, Clock } from 'lucide-react';
import { SubpageLayout } from '@/components/SubpageLayout';
import { CATEGORIES, PRODUCTS } from '@/data/products';
import { SITE, toCategorySlug } from '@/lib/site';

export const dynamic = 'force-static';

const PAGE_TITLE = 'Medical Consumables & Hospital Supplies | Secure MediTech';
const PAGE_DESCRIPTION =
  'Wholesale medical consumables supplier & surgical equipment catalog: 18 ISO 13485 & CE-marked CVP kits, IV cannulas, ET tubes, catheters, OT packs & analyzers.';

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  keywords: [
    'medical consumables supplier',
    'hospital supplies wholesale',
    'wholesale medical supplies catalog',
    'surgical equipment supplier',
    'CE marked medical devices',
  ],
  alternates: { canonical: '/products' },
  openGraph: {
    type: 'website',
    url: '/products',
    siteName: SITE.name,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [{ url: SITE.ogImage, width: 1376, height: 768, alt: 'Secure MediTech Global medical supplies catalog' }],
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
    {
      '@type': 'CollectionPage',
      '@id': `${SITE.url}/products#webpage`,
      url: `${SITE.url}/products`,
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      isPartOf: { '@id': `${SITE.url}/#website` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE.url}/` },
        { '@type': 'ListItem', position: 2, name: 'Products', item: `${SITE.url}/products` },
      ],
    },
    {
      '@type': 'ItemList',
      name: 'Certified Medical Devices & Hospital Consumables',
      numberOfItems: PRODUCTS.length,
      itemListElement: PRODUCTS.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${SITE.url}/products/${product.id}`,
        name: product.name,
      })),
    },
  ],
};

export default function ProductsPage() {
  return (
    <SubpageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />

      {/* Page Hero */}
      <section className="bg-[#071E40] text-white py-14 sm:py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-300 mb-5">
            <Link href="/" className="hover:text-[#38B6FF] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
            <span className="text-white font-semibold" aria-current="page">
              Medical Product Catalog
            </span>
          </nav>

          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#38B6FF]">
            <Layers className="w-4 h-4" />
            <span>8 Clinical Divisions · {PRODUCTS.length} Certified Products</span>
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Wholesale Medical Consumables &amp; Hospital Equipment Catalog
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Direct factory-source medical consumables, surgical equipment, critical care catheters, airway management tubes, surgical OT barrier packs, and clinical laboratory systems manufactured under ISO 13485:2016 and EU MDR 2017/745.
          </p>

          {/* Direct Links to Dedicated Category Pages */}
          <div className="mt-8 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                href={`/products/category/${toCategorySlug(cat.name)}`}
                className="px-3.5 py-2 rounded-full bg-white/10 hover:bg-[#38B6FF] text-slate-200 hover:text-[#071E40] text-xs font-semibold transition-colors border border-white/15"
              >
                {cat.name} ({cat.count})
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grouped by Clinical Division */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 space-y-16">
        {CATEGORIES.map((category) => {
          const items = PRODUCTS.filter((p) => p.category === category.name);
          const slug = toCategorySlug(category.name);

          return (
            <section key={category.name} id={slug} className="scroll-mt-24">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-5 border-b border-slate-200 mb-7">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2F63] tracking-tight">
                    <Link href={`/products/category/${slug}`} className="hover:text-sky-700 transition-colors">
                      {category.name}
                    </Link>
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 mt-1">{category.desc}</p>
                </div>
                <Link
                  href={`/products/category/${slug}`}
                  className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 px-3.5 py-1.5 rounded-full self-start sm:self-auto inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Explore {items.length} {items.length === 1 ? 'Product' : 'Products'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((product) => (
                  <article
                    key={product.id}
                    className="group bg-white rounded-2xl border border-slate-200 hover:border-[#38B6FF]/70 shadow-xs hover:shadow-lg transition-all flex flex-col overflow-hidden"
                  >
                    <Link href={`/products/${product.id}`} className="relative aspect-[4/3] bg-slate-100 overflow-hidden block">
                      <img
                        src={product.image}
                        alt={`${product.name} (${product.sku}) – ${product.tagline}`}
                        loading="lazy"
                        decoding="async"
                        width={400}
                        height={300}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-[#0B2F63]/90 text-white text-xs font-semibold px-2.5 py-1 rounded-md">
                        {product.certifications[0]}
                      </span>
                    </Link>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 text-xs mb-2">
                          <span className="font-mono text-slate-500">{product.sku}</span>
                          <span className="font-medium text-emerald-700 flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            ISO 13485
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-[#0B2F63] leading-snug">
                          <Link href={`/products/${product.id}`} className="hover:underline">
                            {product.name}
                          </Link>
                        </h3>
                        <p className="text-sm text-slate-600 mt-1.5 leading-relaxed line-clamp-2">
                          {product.tagline}
                        </p>
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
                          className="w-full h-10 px-4 text-sm font-bold text-white bg-[#0B2F63] hover:bg-[#164082] rounded-xl transition-colors flex items-center justify-center gap-2"
                        >
                          <span>View Full Specifications</span>
                          <ArrowRight className="w-4 h-4 text-[#38B6FF]" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}

        {/* OEM & Wholesale Quotation Bridge */}
        <section className="bg-[#0B2F63] text-white rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-2xl font-extrabold">
              Require Private Label Packaging or Multi-SKU Hospital Quotations?
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Our ISO 13485 OEM contract manufacturing division supports custom branding, CE MDR technical documentation, and consolidated container shipments across 65+ countries.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/oem-manufacturing"
              className="h-11 px-5 bg-[#38B6FF] hover:bg-[#5cc4ff] text-[#071E40] text-sm font-bold rounded-xl inline-flex items-center gap-2 transition-colors"
            >
              <span>OEM &amp; Private Label</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="h-11 px-5 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-xl inline-flex items-center border border-white/20 transition-colors"
            >
              <span>Request Wholesale RFQ</span>
            </Link>
          </div>
        </section>
      </div>
    </SubpageLayout>
  );
}
