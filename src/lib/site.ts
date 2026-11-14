export const SITE = {
  name: 'Secure MediTech Global',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://securemeditechglobal.com').replace(/\/$/, ''),
  title: 'Wholesale Medical Supplies & OEM Supplier | Secure MediTech',
  description:
    'Wholesale medical supplies & ISO 13485 OEM medical device manufacturer. CE-marked hospital consumables, surgical gear & diagnostics shipped to 65+ countries.',
  keywords: [
    'wholesale medical supplies',
    'medical consumables supplier',
    'surgical equipment supplier',
    'hospital supplies wholesale',
    'laboratory equipment supplier',
    'diagnostic equipment supplier',
    'OEM medical device manufacturer',
    'private label medical supplies',
    'surgical consumables manufacturer',
    'international medical equipment supplier',
  ],
  ogImage: '/assets/images/hero_medical_logistics_1792848779603.jpg',
  phone: '+1-307-533-4504',
  email: 'info@securemeditechglobal.com',
  address: {
    streetAddress: '30 N Gould St Ste R',
    addressLocality: 'Sheridan',
    addressRegion: 'WY',
    postalCode: '82801',
    addressCountry: 'US',
  },
  social: [
    'https://www.facebook.com/profile.php?id=61591817960540',
    'https://www.linkedin.com/company/144075515/admin/dashboard/',
    'https://www.instagram.com/securedmeditech/',
  ],
};

export function toCategorySlug(category: string): string {
  return category
    .toLowerCase()
    .replace(/&/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
