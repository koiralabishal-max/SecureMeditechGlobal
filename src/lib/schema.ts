import { PRODUCTS } from '@/data/products';
import { Product } from '@/types';
import { SITE } from './site';

export const ORGANIZATION_ID = `${SITE.url}/#organization`;
export const WEBSITE_ID = `${SITE.url}/#website`;

export const ORGANIZATION_SCHEMA = {
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: SITE.name,
  url: `${SITE.url}/`,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE.url}/logo.png`,
    width: 979,
    height: 271,
  },
  email: SITE.email,
  telephone: SITE.phone,
  description: SITE.description,
  address: {
    '@type': 'PostalAddress',
    ...SITE.address,
  },
  sameAs: SITE.social,
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: SITE.phone,
      email: SITE.email,
      contactType: 'sales',
      areaServed: 'Worldwide',
      availableLanguage: ['English'],
    },
  ],
  knowsAbout: Array.from(new Set(PRODUCTS.map((p) => p.category))),
};

export const WEBSITE_SCHEMA = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${SITE.url}/`,
  name: SITE.name,
  publisher: { '@id': ORGANIZATION_ID },
  inLanguage: 'en',
};

export function toAbsoluteUrl(path: string): string {
  if (!path) return `${SITE.url}/`;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  if (path === '/') return `${SITE.url}/`;
  return `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`;
}

export function buildWebPageSchema({
  path,
  name,
  description,
  type = 'WebPage',
  mainEntityId,
  aboutId,
}: {
  path: string;
  name: string;
  description: string;
  type?: 'WebPage' | 'CollectionPage' | 'AboutPage' | 'ContactPage' | 'ItemPage';
  mainEntityId?: string;
  aboutId?: string;
}) {
  const pageUrl = toAbsoluteUrl(path);
  return {
    '@type': type,
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name,
    description,
    inLanguage: 'en',
    isPartOf: { '@id': WEBSITE_ID },
    publisher: { '@id': ORGANIZATION_ID },
    breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
    ...(mainEntityId ? { mainEntity: { '@id': mainEntityId } } : {}),
    ...(aboutId ? { about: { '@id': aboutId } } : {}),
  };
}

export function buildBreadcrumbSchema(
  items: { name: string; path: string }[],
  pagePath?: string
) {
  const pageUrl = toAbsoluteUrl(pagePath || items[items.length - 1]?.path || '/');
  return {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: items.map((entry, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: entry.name,
      item: toAbsoluteUrl(entry.path),
    })),
  };
}

/**
 * Generates Schema.org Product JSON-LD for individual B2B medical devices/consumables.
 * Per Google/Schema.org B2B guidelines, Offer schema is intentionally omitted when fixed
 * public e-commerce pricing is not offered (wholesale pricing depends on MOQ, specs & Incoterms).
 */
export function buildProductSchema(product: Product) {
  const productUrl = `${SITE.url}/products/${product.id}`;
  return {
    '@type': 'Product',
    '@id': `${productUrl}#product`,
    name: product.name,
    sku: product.sku,
    mpn: product.sku,
    category: product.category,
    description: product.description,
    image: `${SITE.url}${product.image}`,
    url: productUrl,
    brand: {
      '@type': 'Brand',
      name: SITE.name,
    },
    manufacturer: {
      '@type': 'Organization',
      '@id': ORGANIZATION_ID,
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
  };
}

export function buildArticleSchema({
  slug,
  headline,
  description,
  image,
  datePublished,
  dateModified,
  authorName,
  authorRole,
  articleSection,
  keywords,
  citations,
}: {
  slug: string;
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
  authorRole: string;
  articleSection: string;
  keywords: string[];
  citations?: string[];
}) {
  const articleUrl = `${SITE.url}/blog/${slug}`;
  return {
    '@type': 'Article',
    '@id': `${articleUrl}#article`,
    headline,
    description,
    image: toAbsoluteUrl(image),
    url: articleUrl,
    datePublished,
    dateModified,
    author: {
      '@type': 'Person',
      name: authorName,
      jobTitle: authorRole,
    },
    publisher: { '@id': ORGANIZATION_ID },
    mainEntityOfPage: { '@id': `${articleUrl}#webpage` },
    articleSection,
    keywords: keywords.join(', '),
    inLanguage: 'en',
    ...(citations && citations.length > 0 ? { citation: citations } : {}),
  };
}

export function serializeJsonLd(schema: unknown): string {
  return JSON.stringify(schema).replace(/</g, '\\u003c');
}
