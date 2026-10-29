import { HomePage } from '@/components/HomePage';
import { FAQ_DATA } from '@/data/faqs';
import { PRODUCTS } from '@/data/products';
import { SITE } from '@/lib/site';

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE.url}/#organization`,
      name: SITE.name,
      url: SITE.url,
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
      url: SITE.url,
      name: SITE.name,
      publisher: { '@id': `${SITE.url}/#organization` },
      inLanguage: 'en',
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
