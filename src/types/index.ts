export type ProductCategory = 
  | 'All'
  | 'Critical Care & Monitoring'
  | 'Anesthesia & Airway Management'
  | 'IV & Infusion Supplies'
  | 'Respiratory Care'
  | 'Urology & Catheters'
  | 'Dialysis Supplies'
  | 'Surgical & OT Supplies'
  | 'Laboratory & Diagnostics';

export interface Product {
  id: string;
  name: string;
  category: Exclude<ProductCategory, 'All'>;
  sku: string;
  tagline: string;
  description: string;
  certifications: string[];
  specs: { [key: string]: string };
  sizes?: string[];
  standards: string[];
  packaging: string;
  minOrderQty: string;
  leadTime: string;
  image: string;
  featured?: boolean;
}

export interface QuoteItem {
  product: Product;
  quantity: number;
  customNotes?: string;
}

export interface RfqFormData {
  fullName: string;
  companyName: string;
  businessType: 'Hospital / Clinic Network' | 'Medical Equipment Distributor' | 'Government Health Ministry' | 'OEM / Brand Partner' | 'Other';
  workEmail: string;
  phoneNumber: string;
  country: string;
  destinationPort: string;
  targetDeliveryDate: string;
  incoterm: 'FOB' | 'CIF' | 'DDP' | 'EXW';
  projectDetails: string;
  requestedItems: QuoteItem[];
}
