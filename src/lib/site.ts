export const SITE = {
  name: 'Secure MediTech Global',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://securemeditechglobal.com').replace(/\/$/, ''),
  title: 'Secure MediTech Global | Medical Supplies & OEM Devices',
  description:
    'ISO 13485 medical supplier & OEM manufacturer of CVP kits, IV cannulas, ET tubes, catheters, surgical packs & diagnostics. CE-marked, shipping to 65+ countries.',
  keywords: [
    'medical supplies wholesale',
    'medical device OEM manufacturer',
    'hospital consumables supplier',
    'CVP kit',
    'IV cannula',
    'endotracheal tube',
    'Foley catheter',
    'hemodialysis catheter',
    'closed suction catheter',
    'surgical OT combo pack',
    'ISO 13485 contract manufacturing',
    'CE marked medical devices',
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
