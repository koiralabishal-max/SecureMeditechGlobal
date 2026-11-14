import type { MetadataRoute } from 'next';
import { PRODUCTS } from '@/data/products';
import { CATEGORY_SEO_PROFILES } from '@/lib/seo-strategy';
import { SITE } from '@/lib/site';

const LAST_UPDATED = new Date('2026-11-14T00:00:00Z');

export default function sitemap(): MetadataRoute.Sitemap {
  const categoryEntries: MetadataRoute.Sitemap = CATEGORY_SEO_PROFILES.map((cat) => ({
    url: `${SITE.url}/products/category/${cat.slug}`,
    lastModified: LAST_UPDATED,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  const productEntries: MetadataRoute.Sitemap = PRODUCTS.map((product) => ({
    url: `${SITE.url}/products/${product.id}`,
    lastModified: LAST_UPDATED,
    changeFrequency: 'monthly',
    priority: 0.8,
    images: [`${SITE.url}${product.image}`],
  }));

  return [
    {
      url: `${SITE.url}/`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 1,
      images: [`${SITE.url}${SITE.ogImage}`],
    },
    {
      url: `${SITE.url}/products`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${SITE.url}/oem-manufacturing`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.9,
      images: [`${SITE.url}/assets/images/oem_cleanroom_facility_1792848782226.jpg`],
    },
    {
      url: `${SITE.url}/services`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${SITE.url}/about`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE.url}/contact`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    ...categoryEntries,
    ...productEntries,
  ];
}
