import test from 'node:test';
import assert from 'node:assert';
import { CATEGORY_PRICING_CONFIGS } from '../components/PriceEstimationCalculator';

test('Price Estimation Calculator configuration contains all 8 clinical divisions', () => {
  assert.strictEqual(CATEGORY_PRICING_CONFIGS.length, 8, 'Should have exactly 8 category configurations');
  const categories = CATEGORY_PRICING_CONFIGS.map(c => c.id);
  assert.ok(categories.includes('Critical Care & Monitoring'));
  assert.ok(categories.includes('Anesthesia & Airway Management'));
  assert.ok(categories.includes('IV & Infusion Supplies'));
  assert.ok(categories.includes('Respiratory Care'));
  assert.ok(categories.includes('Urology & Catheters'));
  assert.ok(categories.includes('Dialysis Supplies'));
  assert.ok(categories.includes('Surgical & OT Supplies'));
  assert.ok(categories.includes('Laboratory & Diagnostics'));
});

test('Price configurations have positive price ranges and realistic MOQs', () => {
  for (const config of CATEGORY_PRICING_CONFIGS) {
    assert.ok(config.baseMinPrice > 0, `${config.id} baseMinPrice must be > 0`);
    assert.ok(config.baseMaxPrice >= config.baseMinPrice, `${config.id} baseMaxPrice must be >= baseMinPrice`);
    assert.ok(config.minOrderQty > 0, `${config.id} minOrderQty must be > 0`);
    assert.ok(config.cbmPer1000 > 0, `${config.id} cbmPer1000 must be > 0`);
    assert.ok(config.kgPer1000 > 0, `${config.id} kgPer1000 must be > 0`);
  }
});
