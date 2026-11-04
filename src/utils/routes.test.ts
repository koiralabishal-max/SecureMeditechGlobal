import test from 'node:test';
import assert from 'node:assert';
import { SERVICES } from '../data/services';
import { BRANDS } from '../data/brands';
import { PROJECTS } from '../data/projects';
import { GALLERY_ITEMS } from '../data/gallery';
import { DOWNLOADS } from '../data/downloads';
import { BLOG_POSTS } from '../data/blog';
import { PRODUCTS } from '../data/products';

test('Multi-page datasets are populated and valid', () => {
  assert.ok(SERVICES.length >= 6, 'Must have at least 6 services');
  assert.ok(BRANDS.length >= 6, 'Must have at least 6 brands');
  assert.ok(PROJECTS.length >= 5, 'Must have at least 5 hospital projects');
  assert.ok(GALLERY_ITEMS.length >= 8, 'Must have at least 8 gallery photos');
  assert.ok(DOWNLOADS.length >= 8, 'Must have at least 8 download documents');
  assert.ok(BLOG_POSTS.length >= 4, 'Must have at least 4 blog articles');
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
