import { Product, ProductCategory } from '../types';

export const CLINICAL_DIVISIONS: Exclude<ProductCategory, 'All'>[] = [
  'Critical Care & Monitoring',
  'Anesthesia & Airway Management',
  'IV & Infusion Supplies',
  'Respiratory Care',
  'Urology & Catheters',
  'Dialysis Supplies',
  'Surgical & OT Supplies',
  'Laboratory & Diagnostics',
];

/**
 * Selects a balanced set of flagship products representing each clinical division
 * for concise homepage presentation without hiding any division.
 */
export function getFeaturedCatalogProducts(
  products: Product[],
  limit = 8
): Product[] {
  const picked: Product[] = [];
  const usedIds = new Set<string>();

  for (const division of CLINICAL_DIVISIONS) {
    if (picked.length >= limit) break;
    const match = products.find((p) => p.category === division && !usedIds.has(p.id));
    if (match) {
      picked.push(match);
      usedIds.add(match.id);
    }
  }

  for (const product of products) {
    if (picked.length >= limit) break;
    if (!usedIds.has(product.id)) {
      picked.push(product);
      usedIds.add(product.id);
    }
  }

  return picked;
}
