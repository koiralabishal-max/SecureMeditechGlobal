import type { MetadataRoute } from 'next';
import { PRODUCTS } from '@/data/products';
import { SITE } from '@/lib/site';

const LAST_UPDATED = new Date('2026-11-14T00:00:00Z');

export default function sitemap(): MetadataRoute.Sitemap {
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
      priority: 0.9,
    },
    ...productEntries,
  ];
}
