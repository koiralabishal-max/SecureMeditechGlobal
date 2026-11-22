export interface InquiryLineItem {
  sku: string;
  name: string;
  quantity: number;
  customNotes?: string;
}

export interface InquirySubmissionPayload {
  type: 'contact' | 'rfq' | 'newsletter';
  fullName: string;
  email?: string;
  phoneNumber?: string;
  companyName?: string;
  businessType?: string;
  country?: string;
  destinationPort?: string;
  incoterm?: string;
  subject?: string;
  message?: string;
  sourcePath?: string;
  items?: InquiryLineItem[];
}

export interface ValidatedInquiryResult {
  valid: boolean;
  errors: Record<string, string>;
  normalized?: InquirySubmissionPayload & {
    referenceId: string;
    isOem: boolean;
    totalUnits: number;
    receivedAt: string;
  };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanString(value: unknown, maxLen = 1000): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLen);
}

export function validateInquiryPayload(raw: unknown): ValidatedInquiryResult {
  if (!raw || typeof raw !== 'object') {
    return { valid: false, errors: { form: 'Invalid request payload.' } };
  }

  const input = raw as Record<string, unknown>;
  const type =
    input.type === 'rfq'
      ? 'rfq'
      : input.type === 'newsletter'
        ? 'newsletter'
        : 'contact';

  const fullName = cleanString(input.fullName, 140);
  const email = cleanString(input.email, 160);
  const phoneNumber = cleanString(input.phoneNumber, 60);
  const companyName = cleanString(input.companyName, 160);
  const businessType = cleanString(input.businessType, 100);
  const country = cleanString(input.country, 100);
  const destinationPort = cleanString(input.destinationPort, 120);
  const incoterm = cleanString(input.incoterm, 20);
  const subject = cleanString(input.subject, 160);
  const message = cleanString(input.message, 3000);
  const sourcePath = cleanString(input.sourcePath, 200);

  const errors: Record<string, string> = {};

  if (type === 'newsletter') {
    if (!email || !EMAIL_RE.test(email)) {
      errors.email = 'Please enter a valid institutional email address.';
    }
  } else if (type === 'rfq') {
    if (!fullName) errors.fullName = 'Contact name is required';
    if (!companyName) errors.companyName = 'Company / Hospital name is required';
    if (email && !EMAIL_RE.test(email)) errors.workEmail = 'Please provide a valid work email';
    if (!phoneNumber) errors.phoneNumber = 'Phone / WhatsApp is required';
    if (!country) errors.country = 'Destination country is required';
  } else {
    if (!fullName) errors.fullName = 'Full name is required';
    if (email && !EMAIL_RE.test(email)) errors.email = 'Please provide a valid email address';
    if (!message) errors.message = 'Please describe your product or logistics requirements';
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  const rawItems = Array.isArray(input.items) ? input.items : [];
  const items: InquiryLineItem[] = rawItems
    .filter((item): item is Record<string, unknown> => Boolean(item && typeof item === 'object'))
    .slice(0, 50)
    .map((item) => ({
      sku: cleanString(item.sku, 40),
      name: cleanString(item.name, 160),
      quantity: Math.max(1, Math.min(10_000_000, Number(item.quantity) || 1)),
      customNotes: cleanString(item.customNotes, 500) || undefined,
    }))
    .filter((item) => item.sku || item.name);

  const totalUnits = items.reduce((sum, item) => sum + item.quantity, 0);
  const oemText = `${subject} ${businessType} ${message}`.toLowerCase();
  const isOem =
    oemText.includes('oem') ||
    oemText.includes('private label') ||
    oemText.includes('contract manufacturing') ||
    oemText.includes('tooling');

  const prefix = type === 'rfq' ? 'RFQ-SMT' : type === 'newsletter' ? 'SUB-SMT' : 'INQ-SMT';
  const rand = Math.floor(100000 + Math.random() * 900000);

  return {
    valid: true,
    errors: {},
    normalized: {
      type,
      fullName: fullName || email,
      email: email || undefined,
      phoneNumber: phoneNumber || undefined,
      companyName: companyName || undefined,
      businessType: businessType || undefined,
      country: country || undefined,
      destinationPort: destinationPort || undefined,
      incoterm: incoterm || undefined,
      subject: subject || undefined,
      message: message || undefined,
      sourcePath: sourcePath || undefined,
      items,
      referenceId: `${prefix}-${rand}`,
      isOem,
      totalUnits,
      receivedAt: new Date().toISOString(),
    },
  };
}
