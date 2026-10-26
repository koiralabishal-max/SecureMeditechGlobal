import test from 'node:test';
import assert from 'node:assert/strict';
import { PRODUCTS } from '../data/products';

test('catalog contains all 14 requested medical supplies & hospital equipment', () => {
  assert.ok(PRODUCTS.length >= 14, `Catalog should have at least 14 products, found ${PRODUCTS.length}`);

  const productNames = PRODUCTS.map(p => p.name.toLowerCase());
  
  // 1. CVP Kit
  assert.ok(productNames.some(n => n.includes('cvp') || n.includes('central venous')), 'Should contain CVP Kit');
  // 2. Block Needle
  assert.ok(productNames.some(n => n.includes('block needle')), 'Should contain Block Needle');
  // 3. Pressure Monitoring Kit
  assert.ok(productNames.some(n => n.includes('pressure monitoring')), 'Should contain Pressure Monitoring Kit');
  // 4. ICU Combo
  assert.ok(productNames.some(n => n.includes('icu combo')), 'Should contain ICU Combo');
  // 5. OT Combo
  assert.ok(productNames.some(n => n.includes('ot combo')), 'Should contain OT Combo');
  // 6. Flexometallic Tube
  assert.ok(productNames.some(n => n.includes('flexometallic')), 'Should contain Flexometallic Tube');
  // 7. Normal Endotracheal Tube
  assert.ok(productNames.some(n => n.includes('endotracheal tube')), 'Should contain Normal Endotracheal Tube');
  // 8. IV Set
  assert.ok(productNames.some(n => n.includes('iv set') || n.includes('infusion set')), 'Should contain IV Set');
  // 9. IV Cannula
  assert.ok(productNames.some(n => n.includes('iv cannula')), 'Should contain IV Cannula');
  // 10. Closed Suction Catheter
  assert.ok(productNames.some(n => n.includes('closed suction')), 'Should contain Closed Suction Catheter');
  // 11. ECG Electrodes
  assert.ok(productNames.some(n => n.includes('ecg') && n.includes('electrode')), 'Should contain ECG Electrodes');
  // 12. NIV Masks
  assert.ok(productNames.some(n => n.includes('niv mask')), 'Should contain NIV Masks');
  // 13. Foley’s Catheter
  assert.ok(productNames.some(n => n.includes('foley')), 'Should contain Foley’s Catheter');
  // 14. Dialysis Catheter
  assert.ok(productNames.some(n => n.includes('dialysis catheter')), 'Should contain Dialysis Catheter');
});

test('each product has valid SKU, specifications, packaging, and certifications', () => {
  for (const product of PRODUCTS) {
    assert.ok(product.sku.startsWith('SMT-'), `SKU ${product.sku} must start with SMT-`);
    assert.ok(product.certifications.length > 0, `Product ${product.name} must have certifications`);
    assert.ok(Object.keys(product.specs).length >= 3, `Product ${product.name} must have >= 3 technical specs`);
    assert.ok(product.packaging.length > 0, `Product ${product.name} must have packaging specifications`);
    assert.ok(product.minOrderQty.length > 0, `Product ${product.name} must have MOQ`);
    assert.ok(product.image.length > 0, `Product ${product.name} must have an image path`);
  }
});

test('category filtering properly categorizes clinical products', () => {
  const criticalCareProducts = PRODUCTS.filter(p => p.category === 'Critical Care & Monitoring');
  assert.ok(criticalCareProducts.length >= 2, 'Should have Critical Care & Monitoring products');

  const airwayProducts = PRODUCTS.filter(p => p.category === 'Anesthesia & Airway Management');
  assert.ok(airwayProducts.length >= 2, 'Should have Anesthesia & Airway products');

  const ivProducts = PRODUCTS.filter(p => p.category === 'IV & Infusion Supplies');
  assert.ok(ivProducts.length >= 2, 'Should have IV & Infusion products');

  const urologyProducts = PRODUCTS.filter(p => p.category === 'Urology & Catheters');
  assert.ok(urologyProducts.length >= 1, 'Should have Urology & Catheters products');

  const dialysisProducts = PRODUCTS.filter(p => p.category === 'Dialysis Supplies');
  assert.ok(dialysisProducts.length >= 1, 'Should have Dialysis Supplies products');
});
