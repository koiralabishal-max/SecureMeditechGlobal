import type { Metadata } from 'next';
import { HomePage } from '@/components/HomePage';
import { FAQ_DATA } from '@/data/faqs';
import { PRODUCTS } from '@/data/products';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: SITE.title },
  description: SITE.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    images: [{ url: SITE.ogImage, width: 1376, height: 768, alt: 'Secure MediTech Global medical manufacturing and logistics' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.title,
    description: SITE.description,
    images: [SITE.ogImage],
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE.url}/#organization`,
      name: SITE.name,
      url: `${SITE.url}/`,
      logo: `${SITE.url}/logo.png`,
      email: SITE.email,
      telephone: SITE.phone,
      description: SITE.description,
      address: { '@type': 'PostalAddress', ...SITE.address },
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
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE.url}/#website`,
      url: `${SITE.url}/`,
      name: SITE.name,
      publisher: { '@id': `${SITE.url}/#organization` },
      inLanguage: 'en',
    },
    {
      '@type': 'ItemList',
      '@id': `${SITE.url}/#catalog`,
      name: 'Secure MediTech Global Medical Devices & Consumables Catalog',
      numberOfItems: PRODUCTS.length,
      itemListElement: PRODUCTS.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${SITE.url}/products/${product.id}`,
        name: product.name,
      })),
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE.url}/#faq`,
      mainEntity: FAQ_DATA.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />
      <HomePage />
    </>
  );
}
