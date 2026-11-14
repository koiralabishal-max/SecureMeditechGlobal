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
