'use client';

export type TrafficChannel = 'organic_search' | 'direct' | 'referral' | 'paid_or_campaign';

export interface AttributionContext {
  traffic_channel: TrafficChannel;
  referring_engine?: string;
  landing_path: string;
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

const ATTRIBUTION_STORAGE_KEY = 'smt_attribution_v1';

const SEARCH_ENGINES: { match: RegExp; name: string }[] = [
  { match: /(^|\.)google\./i, name: 'google' },
  { match: /(^|\.)bing\.com$/i, name: 'bing' },
  { match: /(^|\.)yahoo\./i, name: 'yahoo' },
  { match: /(^|\.)duckduckgo\.com$/i, name: 'duckduckgo' },
  { match: /(^|\.)ecosia\.org$/i, name: 'ecosia' },
  { match: /(^|\.)yandex\./i, name: 'yandex' },
  { match: /(^|\.)baidu\.com$/i, name: 'baidu' },
];

export function detectTrafficAttribution(
  referrer: string,
  searchParamsString: string,
  pathname: string
): AttributionContext {
  const params = new URLSearchParams(searchParamsString);
  const utmMedium = (params.get('utm_medium') || '').toLowerCase();
  const utmSource = (params.get('utm_source') || '').toLowerCase();

  if (utmMedium === 'organic') {
    return {
      traffic_channel: 'organic_search',
      referring_engine: utmSource || 'organic_utm',
      landing_path: pathname,
    };
  }

  if (utmMedium || params.has('gclid')) {
    return {
      traffic_channel: 'paid_or_campaign',
      referring_engine: utmSource || 'campaign',
      landing_path: pathname,
    };
  }

  if (referrer) {
    try {
      const host = new URL(referrer).hostname.toLowerCase();
      const engine = SEARCH_ENGINES.find((e) => e.match.test(host));
      if (engine) {
        return {
          traffic_channel: 'organic_search',
          referring_engine: engine.name,
          landing_path: pathname,
        };
      }
      if (!host.includes('securemeditechglobal.com') && host !== 'localhost') {
        return {
          traffic_channel: 'referral',
          referring_engine: host,
          landing_path: pathname,
        };
      }
    } catch {
      // Ignore malformed referrer URLs
    }
  }

  return {
    traffic_channel: 'direct',
    landing_path: pathname,
  };
}

function getAttribution(): AttributionContext {
  if (typeof window === 'undefined') {
    return { traffic_channel: 'direct', landing_path: '/' };
  }
  try {
    const cached = window.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (cached) {
      return JSON.parse(cached) as AttributionContext;
    }
  } catch {
    // sessionStorage might be unavailable
  }
  const detected = detectTrafficAttribution(
    document.referrer || '',
    window.location.search || '',
    window.location.pathname || '/'
  );
  try {
    window.sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(detected));
  } catch {
    // ignore storage failures
  }
  return detected;
}

function pushEvent(eventName: string, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return;
  const attribution = getAttribution();
  const payload = {
    event: eventName,
    ...attribution,
    ...params,
    timestamp: new Date().toISOString(),
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, {
      traffic_channel: attribution.traffic_channel,
      referring_engine: attribution.referring_engine,
      landing_path: attribution.landing_path,
      ...params,
    });
  }
}

export function initOrganicAttribution(): void {
  if (typeof window === 'undefined') return;
  try {
    const alreadyTracked = window.sessionStorage.getItem('smt_landing_tracked');
    if (alreadyTracked) return;
    window.sessionStorage.setItem('smt_landing_tracked', '1');
  } catch {
    // continue gracefully
  }

  const attribution = getAttribution();
  if (attribution.traffic_channel === 'organic_search') {
    pushEvent('organic_visitor_landing', {
      page_path: window.location.pathname,
    });
  }
}

export function trackProductView(product: {
  id: string;
  sku: string;
  name: string;
  category: string;
}): void {
  pushEvent('view_item', {
    currency: 'USD',
    item_id: product.sku,
    item_slug: product.id,
    item_name: product.name,
    item_category: product.category,
    items: [
      {
        item_id: product.sku,
        item_name: product.name,
        item_category: product.category,
      },
    ],
  });
}

export function trackContactSubmission(params: {
  referenceId: string;
  subject: string;
  isOem?: boolean;
  source?: string;
}): void {
  pushEvent('contact_form_submit', {
    reference_id: params.referenceId,
    inquiry_subject: params.subject,
    inquiry_source: params.source || 'contact_form',
  });
  if (params.isOem) {
    trackOemInquiry({ source: params.source || 'contact_form', referenceId: params.referenceId });
  }
}

export function trackWhatsAppInquiry(params: {
  source: string;
  sku?: string;
  productName?: string;
  category?: string;
  country?: string;
}): void {
  pushEvent('whatsapp_inquiry', {
    inquiry_source: params.source,
    item_id: params.sku,
    item_name: params.productName,
    item_category: params.category,
    destination_country: params.country,
  });
  if (params.source.toLowerCase().includes('oem')) {
    trackOemInquiry({ source: params.source, productName: params.productName });
  }
}

export function trackBulkQuoteRequest(params: {
  stage: 'open' | 'add_item' | 'submit';
  referenceId?: string;
  sku?: string;
  productName?: string;
  itemCount?: number;
  totalUnits?: number;
  country?: string;
  incoterm?: string;
  isOem?: boolean;
}): void {
  const eventMap = {
    open: 'begin_rfq',
    add_item: 'add_to_quote',
    submit: 'rfq_submission',
  } as const;

  pushEvent(eventMap[params.stage], {
    reference_id: params.referenceId,
    item_id: params.sku,
    item_name: params.productName,
    item_count: params.itemCount,
    total_units: params.totalUnits,
    destination_country: params.country,
    incoterm: params.incoterm,
  });

  if (params.stage === 'submit' && params.isOem) {
    trackOemInquiry({
      source: 'rfq_modal',
      referenceId: params.referenceId,
      productName: params.productName,
    });
  }
}

export function trackOemInquiry(params: {
  source: string;
  productName?: string;
  referenceId?: string;
}): void {
  pushEvent('oem_inquiry', {
    inquiry_source: params.source,
    item_name: params.productName,
    reference_id: params.referenceId,
  });
}
