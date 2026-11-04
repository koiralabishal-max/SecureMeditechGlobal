export type FaqCategory = 'All' | 'Lead Times' | 'International Shipping' | 'OEM & MOQs' | 'Quality & Compliance';

export interface FaqItem {
  id: string;
  category: 'Lead Times' | 'International Shipping' | 'OEM & MOQs' | 'Quality & Compliance';
  question: string;
  answer: string;
  highlights: string[];
}

export const FAQ_DATA: FaqItem[] = [
  // 1. Lead Times
  {
    id: 'lead-time-catalog',
    category: 'Lead Times',
    question: 'What are standard lead times for catalog medical supplies and consumables?',
    answer: 'For in-stock catalog sterile consumables—such as IV Cannulas, CVP Kits, Endotracheal Tubes, and Foley Catheters—standard dispatch occurs within 3 to 5 business days from our logistics hub. For high-volume repeat orders or scheduled bulk replenishments, production and dispatch typically take 7 to 14 business days from purchase order confirmation.',
    highlights: ['3–5 business days for stock items', '7–14 days for bulk replenishments', 'Real-time consignment tracking']
  },
  {
    id: 'lead-time-emergency',
    category: 'Lead Times',
    question: 'Can emergency or expedited hospital consignments be dispatched faster?',
    answer: 'Yes. We maintain emergency reserve buffer stock specifically for critical ICU, trauma, and surgical consumables. Priority air-dispatch can be scheduled within 24 to 48 hours for contracted healthcare institutions, health ministries, and registered hospital groups managing acute shortages.',
    highlights: ['24–48 hour priority dispatch', 'Emergency air cargo allocation', 'Dedicated logistics coordinator']
  },
  {
    id: 'lead-time-oem-tooling',
    category: 'Lead Times',
    question: 'What is the turnaround time for custom OEM tooling and new mold engineering?',
    answer: 'New OEM product development cycles—from CAD review and tooling fabrication in our ISO Class 7/8 cleanrooms to First Article Inspection (FAI) and sterilization validation—typically require 3 to 5 weeks. Rapid 3D prototyping and non-sterile functional evaluation samples can be delivered in as little as 7 to 10 business days.',
    highlights: ['3–5 weeks for full production tooling', '7–10 days for rapid prototypes', 'Complete FAI & biocompatibility testing']
  },

  // 2. International Shipping & Logistics
  {
    id: 'shipping-incoterms',
    category: 'International Shipping',
    question: 'Which Incoterms do you support for international sea and air freight?',
    answer: 'We offer flexible international commercial terms adapted to your national customs framework and institutional preferences. We routinely execute contracts under FOB (Free On Board), CIF (Cost, Insurance & Freight), CFR, EXW, DAP (Delivered at Place), and DDP (Delivered Duty Paid directly to your hospital warehouse or central distributor depot).',
    highlights: ['DDP, DAP, CIF, FOB, and EXW', 'Door-to-door customs clearance', 'Air & Ocean multimodal transport']
  },
  {
    id: 'shipping-packaging-security',
    category: 'International Shipping',
    question: 'How are sterile and fragile medical devices protected during long-haul transit?',
    answer: 'All sterile products are double-sealed in medical-grade Tyvek® / polymer blister packs or tear-resistant pouch barriers equipped with Class 1 chemical sterilization indicators. Outer shippers utilize heavy-duty 5-ply export corrugation with internal moisture barriers, desiccants, and shock-absorption corner blocks. Temperature-controlled refrigerated air containers are utilized for sensitive diagnostic reagents.',
    highlights: ['Medical-grade Tyvek® blister sealing', '5-ply reinforced export corrugation', 'Optional temperature & shock monitoring']
  },
  {
    id: 'shipping-customs-documents',
    category: 'International Shipping',
    question: 'What regulatory and customs clearance documentation is provided with shipments?',
    answer: 'Every consignment is accompanied by a comprehensive regulatory pack: Commercial Invoice, Packing List with batch/lot numbers and expiration dates, Certificate of Origin (COO), Certificate of Analysis (CoA), and Batch Ethylene Oxide (EtO) / Gamma Sterilization Validation Certificates. We also provide consular legalization and embassy stamping when required.',
    highlights: ['Batch-specific Certificates of Analysis', 'Sterilization Validation Certificates', 'Full customs dossier provided ahead of arrival']
  },
  {
    id: 'shipping-regional-coverage',
    category: 'International Shipping',
    question: 'Do you provide direct medical supplies deliveries to Nepal, Kenya, Rwanda, South Africa, Nigeria, and India?',
    answer: 'Yes. We operate dedicated medical supply corridors connecting our strategic logistics hubs to healthcare systems in Nepal (Kathmandu, Pokhara & regional hubs), Kenya (Nairobi & Mombasa), Rwanda (Kigali & provincial centers), South Africa (Johannesburg, Cape Town & Durban), Nigeria (Lagos & Abuja), and India (New Delhi & Mumbai). Every consignment includes pre-cleared regulatory paperwork (Nepal DDA, Kenya PPB, Rwanda FDA, SAHPRA, NAFDAC, CDSCO), active 2°C–8°C cold-chain tracking, and bonded customs clearance with priority air dispatch in 24 to 48 hours.',
    highlights: ['Direct corridors for Nepal, Kenya, Rwanda, South Africa, Nigeria & India', 'Local health authority compliance (SAHPRA, PPB, RFDA, NAFDAC, CDSCO, DDA)', 'Continuous 2°C–8°C temperature monitoring & bonded customs']
  },

  // 3. OEM & Manufacturing Minimums
  {
    id: 'oem-moqs-by-category',
    category: 'OEM & MOQs',
    question: 'What are the Minimum Order Quantities (MOQs) for OEM private labeling and contract manufacturing?',
    answer: 'Our OEM minimums are structured to accommodate both growing medical distributors and large healthcare systems: \n• Catheter & Critical Care Kits (CVP, Dialysis, Pressure Monitoring): 500 to 1,000 units\n• Extruded & Molded Consumables (IV Cannula, Closed Suction, ET Tubes): 2,500 to 5,000 units\n• High-Volume Consumables & Drapes (OT Combos, IV Sets, Gauze): 5,000 to 10,000 units\n• Custom Resin Formulations & Tooling: Project-specific agreements with staggered call-off orders.',
    highlights: ['Low MOQs from 500 units for specialized kits', 'Staggered release schedules for annual contracts', 'Private label branding & custom barcodes']
  },
  {
    id: 'oem-preproduction-samples',
    category: 'OEM & MOQs',
    question: 'Can we evaluate pre-production clinical samples before committing to a full contract?',
    answer: 'Yes. We encourage procurement committees, clinical directors, and biomedical engineers to rigorously evaluate our devices. We provide complimentary or subsidized sample evaluation packs (5 to 10 units) for clinical benchmarking, physical inspection, and tender qualification.',
    highlights: ['5–10 sample units per product line', 'Clinical evaluation documentation', 'Fast courier delivery via DHL/FedEx']
  },
  {
    id: 'oem-custom-combos',
    category: 'OEM & MOQs',
    question: 'Can you manufacture custom surgical procedure packs (OT Combos) with specific component layouts?',
    answer: 'Yes, custom procedural kits are one of our core specialties. You define the exact bill of materials—including drape dimensions, reinforced zones, gowns, suction tubing, bowls, and scalpels. We assemble, seal, and sterilize everything in an ISO Class 7 cleanroom under your hospital or distributor brand name.',
    highlights: ['100% customizable surgical drapes & pack contents', 'Sterile blister or overwrapped packaging', 'Reduces surgical turnover time by up to 35%']
  },

  // 4. Quality & Compliance
  {
    id: 'compliance-cleanroom-standards',
    category: 'Quality & Compliance',
    question: 'What quality certifications and cleanroom standards do your facilities maintain?',
    answer: 'Our manufacturing infrastructure is certified to ISO 13485:2016 (Medical Devices Quality Management Systems) and complies with the European Medical Device Regulation (EU MDR 2017/745). Manufacturing occurs in verified ISO Class 7 (Class 10,000) and ISO Class 8 (Class 100,000) cleanrooms with automated continuous airborne particulate and bioburden monitoring.',
    highlights: ['ISO 13485:2016 certified', 'ISO Class 7 & Class 8 Cleanrooms', 'EU MDR & CE compliance']
  },
  {
    id: 'compliance-sterilization-methods',
    category: 'Quality & Compliance',
    question: 'Which sterilization processes do you utilize, and how is sterility guaranteed?',
    answer: 'Products undergo validated Ethylene Oxide (EtO) sterilization in accordance with ISO 11135 or Gamma Irradiation per ISO 11137. We adhere to a verified Sterility Assurance Level (SAL) of 10⁻⁶. Residual EtO and Ethylene Chlorohydrin levels are tested per ISO 10993-7 to guarantee biocompatibility and patient safety.',
    highlights: ['Validated SAL 10⁻⁶ sterility assurance', 'ISO 11135 & ISO 11137 validated cycles', 'Strict ISO 10993 biocompatibility testing']
  }
];
