import { BLOG_POSTS } from '../data/blog';
import { COUNTRY_MARKETS } from '../data/markets';
import { PRODUCTS } from '../data/products';
import { SERVICES } from '../data/services';
import { CATEGORY_SEO_PROFILES } from './seo-strategy';

export type SearchResultGroup =
  | 'Products'
  | 'Services & OEM'
  | 'Blog & Guides'
  | 'Categories & Pages';

export interface SearchResultItem {
  id: string;
  group: SearchResultGroup;
  title: string;
  subtitle: string;
  badge?: string;
  href: string;
}

interface IndexedEntry extends SearchResultItem {
  titleLower: string;
  badgeLower: string;
  subtitleLower: string;
  corpusLower: string;
}

export interface SiteSearchResponse {
  query: string;
  totalCount: number;
  items: SearchResultItem[];
  groups: {
    group: SearchResultGroup;
    items: SearchResultItem[];
  }[];
}

const CORE_PAGES: SearchResultItem[] = [
  {
    id: 'page-products',
    group: 'Categories & Pages',
    title: 'Full Medical Product Catalog',
    subtitle: 'Browse all ISO 13485 & CE-marked critical care, airway, IV & surgical supplies',
    badge: 'Catalog',
    href: '/products',
  },
  {
    id: 'page-oem',
    group: 'Services & OEM',
    title: 'OEM & Private-Label Medical Manufacturing',
    subtitle: 'ISO Class 7/8 cleanroom production, CAD tooling, EtO sterilization & custom branding',
    badge: 'OEM Workflow',
    href: '/oem-manufacturing',
  },
  {
    id: 'page-services',
    group: 'Services & OEM',
    title: 'All Medical Supply & Regulatory Services',
    subtitle: 'Contract manufacturing, freight forwarding, calibration & CE MDR dossiers',
    badge: 'Services',
    href: '/services',
  },
  {
    id: 'page-markets',
    group: 'Categories & Pages',
    title: 'Global Export & Regional Logistics Corridors',
    subtitle: 'Dedicated B2B medical export corridors across Asia, Africa, UK & USA',
    badge: '65+ Countries',
    href: '/markets',
  },
  {
    id: 'page-blog',
    group: 'Blog & Guides',
    title: 'Hospital Procurement & Technical Blog',
    subtitle: 'Verified B2B guides on bulk sourcing, ICU consumables, OEM & diagnostics',
    badge: 'All Articles',
    href: '/blog',
  },
  {
    id: 'page-about',
    group: 'Categories & Pages',
    title: 'About Secure MediTech Global',
    subtitle: 'US headquarters, global QA governance, partner brands & hospital projects',
    badge: 'Company',
    href: '/about',
  },
  {
    id: 'page-contact',
    group: 'Categories & Pages',
    title: 'Contact Procurement & Regulatory Desk',
    subtitle: 'Request bulk wholesale quotations, CoA dossiers & distributor onboarding',
    badge: 'Contact',
    href: '/contact',
  },
  {
    id: 'page-faq',
    group: 'Categories & Pages',
    title: 'Procurement, Lead Times & OEM FAQ',
    subtitle: 'Answers on production timelines, EXW/FOB/CIF/DDP shipping & MOQs',
    badge: 'FAQ',
    href: '/faq',
  },
  {
    id: 'page-price-calculator',
    group: 'Services & OEM',
    title: 'Wholesale Price & Volume Calculator',
    subtitle: 'Simulate FOB, CIF & DDP bulk budgets, CBM logistics & volume tier discounts',
    badge: 'Estimator',
    href: '/price-calculator',
  },
];

const SEARCH_INDEX: IndexedEntry[] = [
  ...PRODUCTS.map((product): IndexedEntry => {
    const specsText = Object.entries(product.specs)
      .map(([k, v]) => `${k} ${v}`)
      .join(' ');
    const corpus = [
      product.name,
      product.sku,
      product.category,
      product.tagline,
      product.description,
      product.certifications.join(' '),
      product.standards.join(' '),
      product.sizes?.join(' ') || '',
      specsText,
    ]
      .join(' ')
      .toLowerCase();

    return {
      id: `product-${product.id}`,
      group: 'Products',
      title: product.name,
      subtitle: product.tagline,
      badge: product.sku,
      href: `/products/${product.id}`,
      titleLower: product.name.toLowerCase(),
      badgeLower: product.sku.toLowerCase(),
      subtitleLower: `${product.category} ${product.tagline}`.toLowerCase(),
      corpusLower: corpus,
    };
  }),
  ...SERVICES.map((service): IndexedEntry => {
    const corpus = [
      service.title,
      service.shortDescription,
      service.fullDescription,
      service.capabilities.join(' '),
      service.standards.join(' '),
      service.targetAudience,
    ]
      .join(' ')
      .toLowerCase();

    return {
      id: `service-${service.id}`,
      group: 'Services & OEM',
      title: service.title,
      subtitle: service.shortDescription,
      badge: service.standards[0] || 'Service',
      href: `/services#${service.slug}`,
      titleLower: service.title.toLowerCase(),
      badgeLower: 'service',
      subtitleLower: service.shortDescription.toLowerCase(),
      corpusLower: corpus,
    };
  }),
  ...BLOG_POSTS.map((post): IndexedEntry => {
    const sectionsText =
      post.sections
        ?.map((sec) => `${sec.heading} ${sec.paragraphs.join(' ')}`)
        .join(' ') || '';
    const corpus = [
      post.title,
      post.category,
      post.primaryKeyword,
      post.summary,
      post.tags.join(' '),
      sectionsText,
    ]
      .join(' ')
      .toLowerCase();

    return {
      id: `blog-${post.id}`,
      group: 'Blog & Guides',
      title: post.title,
      subtitle: `${post.category} · ${post.readTime}`,
      badge: 'Guide',
      href: `/blog/${post.slug}`,
      titleLower: post.title.toLowerCase(),
      badgeLower: post.category.toLowerCase(),
      subtitleLower: `${post.category} ${post.summary}`.toLowerCase(),
      corpusLower: corpus,
    };
  }),
  ...CATEGORY_SEO_PROFILES.map((category): IndexedEntry => {
    const corpus = [
      category.name,
      category.heroHeading,
      category.primaryKeyword,
      category.secondaryKeywords.join(' '),
      category.overview,
    ]
      .join(' ')
      .toLowerCase();

    return {
      id: `category-${category.slug}`,
      group: 'Categories & Pages',
      title: category.name,
      subtitle: category.heroHeading,
      badge: 'Category',
      href: `/products/category/${category.slug}`,
      titleLower: category.name.toLowerCase(),
      badgeLower: 'category',
      subtitleLower: category.heroHeading.toLowerCase(),
      corpusLower: corpus,
    };
  }),
  ...COUNTRY_MARKETS.map((market): IndexedEntry => {
    const corpus = [
      market.countryName,
      market.regionLabel,
      market.h1,
      market.gatewayRoute,
      market.regulatoryAuthority.name,
      market.regulatoryAuthority.acronym,
    ]
      .join(' ')
      .toLowerCase();

    return {
      id: `market-${market.slug}`,
      group: 'Categories & Pages',
      title: `${market.countryName} Export Corridor`,
      subtitle: `${market.regionLabel} · ${market.regulatoryAuthority.acronym}`,
      badge: 'Market',
      href: `/markets/${market.slug}`,
      titleLower: `${market.countryName} export corridor`.toLowerCase(),
      badgeLower: market.countryName.toLowerCase(),
      subtitleLower: `${market.regionLabel} ${market.regulatoryAuthority.acronym}`.toLowerCase(),
      corpusLower: corpus,
    };
  }),
  ...CORE_PAGES.map((page): IndexedEntry => ({
    ...page,
    titleLower: page.title.toLowerCase(),
    badgeLower: (page.badge || '').toLowerCase(),
    subtitleLower: page.subtitle.toLowerCase(),
    corpusLower: `${page.title} ${page.subtitle} ${page.badge || ''}`.toLowerCase(),
  })),
];

const GROUP_ORDER: SearchResultGroup[] = [
  'Products',
  'Services & OEM',
  'Blog & Guides',
  'Categories & Pages',
];

function scoreEntry(entry: IndexedEntry, cleanQuery: string, tokens: string[]): number {
  for (const token of tokens) {
    if (!entry.corpusLower.includes(token)) {
      return 0;
    }
  }

  let score = 5;

  if (entry.badgeLower === cleanQuery || entry.titleLower === cleanQuery) {
    score += 80;
  } else if (entry.titleLower.startsWith(cleanQuery) || entry.badgeLower.startsWith(cleanQuery)) {
    score += 50;
  } else if (entry.titleLower.includes(cleanQuery)) {
    score += 35;
  }

  for (const token of tokens) {
    if (entry.badgeLower.includes(token)) score += 20;
    if (entry.titleLower.includes(token)) score += 16;
    if (entry.subtitleLower.includes(token)) score += 6;
  }

  return score;
}

export function searchSite(
  query: string,
  options: { limitPerGroup?: number; maxTotal?: number } = {}
): SiteSearchResponse {
  const cleanQuery = query.trim().toLowerCase();
  const limitPerGroup = options.limitPerGroup ?? 4;
  const maxTotal = options.maxTotal ?? 12;

  if (!cleanQuery) {
    return {
      query: '',
      totalCount: 0,
      items: [],
      groups: [],
    };
  }

  const tokens = cleanQuery.split(/\s+/).filter(Boolean);
  if (tokens.length === 0) {
    return {
      query: '',
      totalCount: 0,
      items: [],
      groups: [],
    };
  }

  const scored: { entry: IndexedEntry; score: number }[] = [];
  for (const entry of SEARCH_INDEX) {
    const score = scoreEntry(entry, cleanQuery, tokens);
    if (score > 0) {
      scored.push({ entry, score });
    }
  }

  scored.sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title));

  const groups: { group: SearchResultGroup; items: SearchResultItem[] }[] = [];
  const flatItems: SearchResultItem[] = [];

  for (const groupName of GROUP_ORDER) {
    if (flatItems.length >= maxTotal) break;

    const groupMatches = scored
      .filter((s) => s.entry.group === groupName)
      .slice(0, limitPerGroup)
      .map(({ entry }): SearchResultItem => ({
        id: entry.id,
        group: entry.group,
        title: entry.title,
        subtitle: entry.subtitle,
        badge: entry.badge,
        href: entry.href,
      }));

    if (groupMatches.length > 0) {
      const remaining = maxTotal - flatItems.length;
      const bounded = groupMatches.slice(0, remaining);
      groups.push({ group: groupName, items: bounded });
      flatItems.push(...bounded);
    }
  }

  return {
    query: query.trim(),
    totalCount: scored.length,
    items: flatItems,
    groups,
  };
}
