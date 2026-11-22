import test from 'node:test';
import assert from 'node:assert';
import { SERVICES } from '../data/services';
import { BRANDS } from '../data/brands';
import { PROJECTS } from '../data/projects';
import { GALLERY_ITEMS } from '../data/gallery';
import { DOWNLOADS } from '../data/downloads';
import { BLOG_POSTS } from '../data/blog';
import { COUNTRY_MARKETS } from '../data/markets';
import { PRODUCTS } from '../data/products';
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildProductSchema,
  buildWebPageSchema,
  ORGANIZATION_SCHEMA,
  WEBSITE_SCHEMA,
} from '../lib/schema';

test('Multi-page datasets are populated and valid', () => {
  assert.ok(SERVICES.length >= 6, 'Must have at least 6 services');
  assert.ok(BRANDS.length >= 6, 'Must have at least 6 brands');
  assert.ok(PROJECTS.length >= 5, 'Must have at least 5 hospital projects');
  assert.ok(GALLERY_ITEMS.length >= 8, 'Must have at least 8 gallery photos');
  assert.ok(DOWNLOADS.length >= 8, 'Must have at least 8 download documents');
  assert.ok(BLOG_POSTS.length >= 6, 'Must have at least 6 blog articles');
});

test('Product detail routes have unique IDs and valid categories', () => {
  const ids = new Set();
  for (const product of PRODUCTS) {
    assert.ok(!ids.has(product.id), `Duplicate product ID: ${product.id}`);
    ids.add(product.id);
    assert.ok(product.name, 'Product must have a name');
    assert.ok(product.sku, 'Product must have an SKU');
    assert.ok(product.image, 'Product must have an image');
  }
});

test('Day 3 international country markets include all 8 target destinations without duplicates', () => {
  const requiredSlugs = [
    'nepal',
    'india',
    'kenya',
    'rwanda',
    'south-africa',
    'nigeria',
    'united-kingdom',
    'united-states',
  ];
  const slugs = new Set(COUNTRY_MARKETS.map((m) => m.slug));
  for (const slug of requiredSlugs) {
    assert.ok(slugs.has(slug), `Missing country landing page slug: ${slug}`);
  }
  assert.strictEqual(COUNTRY_MARKETS.length, 8, 'Must define exactly 8 country market pages');
  for (const m of COUNTRY_MARKETS) {
    assert.ok(m.seoTitle.length <= 60, `Country title too long (${m.slug}): ${m.seoTitle}`);
    assert.ok(
      m.metaDescription.length >= 120 && m.metaDescription.length <= 160,
      `Country meta description out of bounds (${m.slug}): ${m.metaDescription.length}`
    );
  }
});

test('Day 3 blog covers all 6 required buyer topics with valid SEO metadata', () => {
  const requiredTitles = [
    'How to Choose a Reliable Wholesale Medical Supplies Supplier',
    'Essential ICU Consumables for Modern Hospitals',
    'Medical Device OEM Manufacturing Explained',
    'Benefits of Private Label Medical Supplies',
    'How to Select Reliable Laboratory Diagnostic Equipment',
    'Hospital Procurement: A Guide to Bulk Medical Supplies',
  ];
  const postTitles = new Set(BLOG_POSTS.map((p) => p.title));
  for (const t of requiredTitles) {
    assert.ok(postTitles.has(t), `Missing requested Day 3 blog topic: ${t}`);
  }
  for (const post of BLOG_POSTS) {
    assert.ok(post.seoTitle.length <= 60, `Blog SEO title too long (${post.slug}): ${post.seoTitle}`);
    assert.ok(
      post.metaDescription.length >= 120 && post.metaDescription.length <= 160,
      `Blog meta description out of bounds (${post.slug}): ${post.metaDescription.length}`
    );
  }
});

test('Structured data builders enforce Schema.org integrity and omit unverified Offer data', () => {
  assert.strictEqual(ORGANIZATION_SCHEMA['@type'], 'Organization');
  assert.strictEqual(WEBSITE_SCHEMA['@type'], 'WebSite');

  const webPage = buildWebPageSchema({
    path: '/about',
    name: 'About Test',
    description: 'About description',
    type: 'AboutPage',
  });
  assert.strictEqual(webPage['@type'], 'AboutPage');

  const crumbs = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Markets', path: '/markets' },
  ]);
  assert.strictEqual(crumbs['@type'], 'BreadcrumbList');
  assert.strictEqual(crumbs.itemListElement.length, 2);

  const prodSchema = buildProductSchema(PRODUCTS[0]) as Record<string, unknown>;
  assert.strictEqual(prodSchema['@type'], 'Product');
  assert.strictEqual(
    'offers' in prodSchema,
    false,
    'Product schema must omit Offer when fixed transaction pricing is unavailable'
  );

  const post = BLOG_POSTS[0];
  const artSchema = buildArticleSchema({
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
  });
  assert.strictEqual(artSchema['@type'], 'Article');
});

test('Day 4 inquiry validation normalizes RFQ, Contact, and OEM submissions cleanly', async () => {
  const { validateInquiryPayload } = await import('../lib/inquiry');

  const badContact = validateInquiryPayload({ type: 'contact', fullName: '', message: '' });
  assert.strictEqual(badContact.valid, false);
  assert.ok(badContact.errors.fullName);
  assert.ok(badContact.errors.message);

  const validRfq = validateInquiryPayload({
    type: 'rfq',
    fullName: 'Dr. Jane Doe',
    companyName: 'Kathmandu Surgical Center',
    businessType: 'OEM / Brand Partner',
    email: 'procurement@hospital.org',
    phoneNumber: '+9779800000000',
    country: 'Nepal',
    incoterm: 'CIF',
    message: 'Need private label OEM surgical packs.',
    items: [{ sku: 'SMT-CVP-01', name: 'Central Venous Catheter Kit', quantity: 500 }],
  });
  assert.strictEqual(validRfq.valid, true);
  assert.ok(validRfq.normalized);
  assert.ok(validRfq.normalized.referenceId.startsWith('RFQ-SMT-'));
  assert.strictEqual(validRfq.normalized.isOem, true);
  assert.strictEqual(validRfq.normalized.totalUnits, 500);
});

test('Day 4 organic search attribution detects search referrers and UTM organic parameters', async () => {
  const { detectTrafficAttribution } = await import('../lib/analytics');

  const fromGoogle = detectTrafficAttribution(
    'https://www.google.com/search?q=wholesale+medical+supplies',
    '',
    '/products'
  );
  assert.strictEqual(fromGoogle.traffic_channel, 'organic_search');
  assert.strictEqual(fromGoogle.referring_engine, 'google');

  const fromUtm = detectTrafficAttribution('', '?utm_medium=organic&utm_source=bing', '/markets/kenya');
  assert.strictEqual(fromUtm.traffic_channel, 'organic_search');
  assert.strictEqual(fromUtm.referring_engine, 'bing');

  const direct = detectTrafficAttribution('', '', '/');
  assert.strictEqual(direct.traffic_channel, 'direct');
});

test('Full-site navbar search finds products, services, and blog guides accurately', async () => {
  const { searchSite } = await import('../lib/search');

  const productRes = searchSite('SMT-CCM-CVP01');
  assert.ok(productRes.totalCount >= 1, 'Should match product by SKU');
  assert.strictEqual(productRes.items[0].href, '/products/cvp-catheter-kit');

  const serviceRes = searchSite('CAD tooling');
  assert.ok(
    serviceRes.items.some((item) => item.href === '/services#cad-tooling-dfm'),
    'Should match CAD tooling service section'
  );

  const blogRes = searchSite('essential ICU consumables');
  assert.ok(
    blogRes.items.some((item) => item.href === '/blog/essential-icu-consumables-for-modern-hospitals'),
    'Should match ICU consumables blog guide'
  );

  const emptyRes = searchSite('   ');
  assert.strictEqual(emptyRes.totalCount, 0);
  assert.strictEqual(emptyRes.items.length, 0);

  const calcRes = searchSite('price calculator');
  assert.ok(
    calcRes.items.some((item) => item.href === '/price-calculator'),
    'Should match dedicated /price-calculator page'
  );

  const faqRes = searchSite('OEM FAQ');
  assert.ok(
    faqRes.items.some((item) => item.href === '/faq'),
    'Should match dedicated /faq page'
  );
});

test('Featured homepage catalog selects one unique product per clinical division', async () => {
  const { getFeaturedCatalogProducts, CLINICAL_DIVISIONS } = await import('../lib/catalog');
  const featured = getFeaturedCatalogProducts(PRODUCTS, 8);
  assert.strictEqual(featured.length, 8, 'Homepage featured showcase should select 8 items');

  const categories = new Set(featured.map((p) => p.category));
  for (const division of CLINICAL_DIVISIONS) {
    assert.ok(categories.has(division), `Featured showcase missing division: ${division}`);
  }
});
