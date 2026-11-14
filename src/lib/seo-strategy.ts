import { CATEGORIES, PRODUCTS } from '@/data/products';
import { Product, ProductCategory } from '@/types';
import { SITE, toCategorySlug } from './site';

export type ExcludeAllCategory = Exclude<ProductCategory, 'All'>;

export interface CategorySeoProfile {
  name: ExcludeAllCategory;
  slug: string;
  seoTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  longTailKeywords: string[];
  heroEyebrow: string;
  heroHeading: string;
  overview: string;
  clinicalApplications: string[];
  relatedServiceIds: string[];
  relatedCategorySlugs: string[];
}

export const CATEGORY_SEO_PROFILES: CategorySeoProfile[] = [
  {
    name: 'Critical Care & Monitoring',
    slug: toCategorySlug('Critical Care & Monitoring'),
    seoTitle: 'Hospital Critical Care Supplies Wholesale | Secure MediTech',
    metaDescription:
      'Hospital supplies wholesale for ICU & critical care: CE 0123 CVP kits, invasive pressure transducer sets, ECG electrodes & ICU bundles. ISO 13485 certified.',
    primaryKeyword: 'hospital supplies wholesale',
    secondaryKeywords: [
      'critical care consumables supplier',
      'CVP kit supplier',
      'invasive blood pressure transducer kit',
      'ECG monitoring electrodes wholesale',
    ],
    longTailKeywords: [
      'ISO 13485 triple lumen CVP catheter kit wholesale',
      'single and dual channel pressure monitoring transducer supplier',
      'Ag/AgCl disposable ECG electrodes bulk hospital procurement',
    ],
    heroEyebrow: 'Critical Care & Hemodynamic Monitoring',
    heroHeading: 'Wholesale Critical Care & ICU Hospital Supplies',
    overview:
      'Engineered for intensive care units, cardiothoracic suites, and trauma centers requiring aseptic vascular access and continuous hemodynamic monitoring. Every sterile consumable and bundle in this division complies with ISO 13485:2016 and CE MDR standards with batch lot traceability.',
    clinicalApplications: [
      'Central venous pressure (CVP) monitoring, fluid resuscitation, and parenteral infusion via Seldinger-technique multi-lumen catheters',
      'Continuous invasive arterial and central venous blood pressure waveform monitoring compatible with Philips, Mindray, GE, Edwards, and Nihon Kohden systems',
      'ICU admission readiness and crbsi risk reduction using pre-assembled sterile ICU Combo procedural bundles',
      'Continuous telemetry, ECG monitoring, and stress testing with low-impedance Ag/AgCl hydrogel electrodes',
    ],
    relatedServiceIds: ['turnkey-hospital-equipment', 'oem-manufacturing', 'global-logistics-coldchain'],
    relatedCategorySlugs: ['anesthesia-airway-management', 'iv-infusion-supplies', 'respiratory-care'],
  },
  {
    name: 'Anesthesia & Airway Management',
    slug: toCategorySlug('Anesthesia & Airway Management'),
    seoTitle: 'Surgical & Anesthesia Airway Supplier | Secure MediTech',
    metaDescription:
      'Surgical equipment supplier & airway consumables manufacturer: CE-marked endotracheal tubes, armored flexometallic ETT & echogenic nerve block needles.',
    primaryKeyword: 'surgical equipment supplier',
    secondaryKeywords: [
      'anesthesia consumables manufacturer',
      'endotracheal tube supplier',
      'flexometallic tube wholesale',
      'echogenic nerve block needle supplier',
    ],
    longTailKeywords: [
      'ISO 5361 cuffed and uncuffed endotracheal tube bulk supplier',
      'spiral stainless steel reinforced flexometallic ETT manufacturer',
      'ultrasound guided echogenic nerve block needle wholesale',
    ],
    heroEyebrow: 'Anesthesia & Surgical Airway Systems',
    heroHeading: 'Surgical Airway & Regional Anesthesia Supplies',
    overview:
      'Designed for operating rooms, anesthesiology departments, and emergency airway management teams. Our airway portfolio pairs thermosensitive DEHP-free PVC endotracheal tubes and stainless steel reinforced armored tubes with precision laser-etched echogenic regional block needles.',
    clinicalApplications: [
      'General anesthesia intubation and ICU mechanical ventilation with HVLP cuff protection across pediatric and adult sizes (2.0mm to 10.0mm ID)',
      'Head, neck, prone-position, and neurosurgical procedures where kink-resistant spiral wire reinforced flexometallic tubes prevent airway occlusion',
      'Ultrasound-guided regional nerve blocks and peripheral anesthesia with 360° echogenic micro-reflector needles (NRFit / Luer compatible)',
    ],
    relatedServiceIds: ['oem-manufacturing', 'cad-tooling-dfm', 'regulatory-technical-dossier'],
    relatedCategorySlugs: ['critical-care-monitoring', 'respiratory-care', 'surgical-ot-supplies'],
  },
  {
    name: 'IV & Infusion Supplies',
    slug: toCategorySlug('IV & Infusion Supplies'),
    seoTitle: 'IV Cannula & Medical Consumables Supplier | Secure MediTech',
    metaDescription:
      'Wholesale medical consumables supplier for IV therapy: CE 0123 IV cannulas (14G-26G), gravity IV giving sets & IEC 60601 volumetric IV infusion pumps.',
    primaryKeyword: 'medical consumables supplier',
    secondaryKeywords: [
      'IV cannula wholesale supplier',
      'IV infusion set manufacturer',
      'volumetric IV infusion pump supplier',
      'wholesale hospital IV disposables',
    ],
    longTailKeywords: [
      'back-cut Japanese needle IV cannula with port and wings wholesale',
      'macro and micro drip gravity IV administration set ISO 8536-4',
      'IEC 60601-2-24 volumetric hospital infusion pump supplier',
    ],
    heroEyebrow: 'Vascular Access & Infusion Therapy',
    heroHeading: 'Wholesale IV Cannulas, Giving Sets & Infusion Pumps',
    overview:
      'Integrated peripheral vascular access consumables and microprocessor-controlled volumetric delivery equipment engineered for wards, emergency departments, and oncology/ICU drug titration under ISO 13485 and CE conformity.',
    clinicalApplications: [
      'Peripheral intravenous cannulation across neonatal (26G) to rapid trauma resuscitation (14G) gauges using siliconized back-cut needles',
      'Gravity crystalloid, medication, and blood transfusion administration with 15µm fluid filtration (or 200µm blood mesh)',
      'Precision multi-ward continuous IV drug delivery from 0.10 to 1,500.0 mL/h with ultrasonic air-in-line detection and 8+ hour battery backup',
    ],
    relatedServiceIds: ['global-logistics-coldchain', 'oem-manufacturing', 'biomedical-calibration-maintenance'],
    relatedCategorySlugs: ['critical-care-monitoring', 'dialysis-supplies', 'surgical-ot-supplies'],
  },
  {
    name: 'Respiratory Care',
    slug: toCategorySlug('Respiratory Care'),
    seoTitle: 'Respiratory Care Hospital Supplies | Secure MediTech',
    metaDescription:
      'Hospital supplies wholesale for respiratory therapy: 24h/72h closed suction catheters, CPAP/BiPAP NIV masks & 3-ball incentive spirometers. CE 0123 certified.',
    primaryKeyword: 'hospital supplies wholesale',
    secondaryKeywords: [
      'respiratory consumables supplier',
      'closed suction catheter wholesale',
      'NIV mask CPAP BiPAP supplier',
      '3-ball incentive spirometer wholesale',
    ],
    longTailKeywords: [
      '24h and 72h closed suction catheter system for ventilated ICU patients',
      'liquid silicone non-invasive ventilation NIV full face mask supplier',
      'post-operative 3-ball respiratory spirometer 600 900 1200 cc/s',
    ],
    heroEyebrow: 'Mechanical Ventilation & Pulmonary Recovery',
    heroHeading: 'Respiratory Care & ICU Ventilation Consumables',
    overview:
      'Closed-circuit bronchial hygiene, non-invasive ventilation interfaces, and pulmonary rehabilitation devices engineered to help hospitals reduce ventilator-associated pneumonia (VAP) risk and shorten post-operative recovery.',
    clinicalApplications: [
      'Multi-day closed endotracheal and tracheostomy suctioning (10 Fr–16 Fr) without breaking PEEP circuit pressure',
      'Non-invasive positive pressure ventilation (CPAP/BiPAP) in ICU, emergency, and step-down wards with automatic anti-asphyxia valves',
      'Post-operative thoracic and abdominal lung expansion therapy with calibrated 600 / 900 / 1200 cc/s visual flow chambers',
    ],
    relatedServiceIds: ['turnkey-hospital-equipment', 'oem-manufacturing', 'global-logistics-coldchain'],
    relatedCategorySlugs: ['anesthesia-airway-management', 'critical-care-monitoring', 'surgical-ot-supplies'],
  },
  {
    name: 'Urology & Catheters',
    slug: toCategorySlug('Urology & Catheters'),
    seoTitle: 'Foley Catheter & Urology Supplies | Secure MediTech',
    metaDescription:
      "Bulk medical consumables supplier for urology: sterile 2-way & 3-way 100% silicone and latex Foley's balloon catheters (Fr 8-Fr 24). CE 0123 & ISO 13485.",
    primaryKeyword: 'medical consumables supplier',
    secondaryKeywords: [
      'Foley catheter wholesale supplier',
      '100% silicone Foley catheter manufacturer',
      'urology consumables exporter',
      '2-way 3-way urinary balloon catheter',
    ],
    longTailKeywords: [
      'sterile 100% medical silicone Foley catheter Fr 8 to Fr 24 wholesale',
      '3-way continuous bladder irrigation latex Foley catheter bulk supplier',
      'EN 1616 and ISO 20696 certified urinary catheter manufacturer',
    ],
    heroEyebrow: 'Urological Drainage & Indwelling Catheters',
    heroHeading: 'Sterile Urology & Foley Balloon Catheter Supplies',
    overview:
      'Hospital-grade 2-way and 3-way indwelling urinary drainage catheters available in hydrophilic siliconized natural latex and 100% transparent biocompatible silicone for short- and long-term catheterization up to 30 days.',
    clinicalApplications: [
      'Routine peri-operative and inpatient urinary drainage in pediatric (Fr 8–Fr 10) and adult (Fr 12–Fr 24) sizes',
      'Post-urological surgery continuous bladder irrigation using high-flow 3-way Fr 18–Fr 24 configurations with 30cc retention balloons',
      'Long-term indwelling catheterization up to 30 days using encrustation-resistant 100% medical silicone',
    ],
    relatedServiceIds: ['oem-manufacturing', 'regulatory-technical-dossier', 'global-logistics-coldchain'],
    relatedCategorySlugs: ['dialysis-supplies', 'surgical-ot-supplies', 'iv-infusion-supplies'],
  },
  {
    name: 'Dialysis Supplies',
    slug: toCategorySlug('Dialysis Supplies'),
    seoTitle: 'Hemodialysis Catheter Wholesale Supplier | Secure MediTech',
    metaDescription:
      'Wholesale medical supplies for renal care: CE 0123 dual & triple lumen acute hemodialysis catheter kits with Seldinger accessories. >350 mL/min flow rate.',
    primaryKeyword: 'wholesale medical supplies',
    secondaryKeywords: [
      'hemodialysis catheter supplier',
      'dual triple lumen dialysis kit wholesale',
      'renal vascular access consumables',
      'acute dialysis catheter manufacturer',
    ],
    longTailKeywords: [
      'dual lumen 11.5Fr 12Fr 14Fr acute hemodialysis catheter kit wholesale',
      'low recirculation step-tip polyurethane dialysis catheter CE 0123',
      'Seldinger vascular access renal replacement therapy kit supplier',
    ],
    heroEyebrow: 'Renal Replacement & Vascular Access',
    heroHeading: 'Acute Hemodialysis Catheter Kits & Renal Supplies',
    overview:
      'High-flow thermosensitive polyurethane hemodialysis catheterization kits built to ISO 10555-1 / ISO 10555-2 and EU MDR Class III standards for nephrology units, acute dialysis centers, and emergency renal intervention.',
    clinicalApplications: [
      'Acute femoral, internal jugular, and subclavian vascular access for hemodialysis and continuous renal replacement therapy (CRRT)',
      'Sustained >350–400 mL/min extracorporeal blood flow at venous pressures below 200 mmHg with <2% recirculation',
      'Complete bedside Seldinger insertion using included J-tip Nitinol guidewire, introducer needle, dilators, and scalpel',
    ],
    relatedServiceIds: ['regulatory-technical-dossier', 'global-logistics-coldchain', 'oem-manufacturing'],
    relatedCategorySlugs: ['critical-care-monitoring', 'urology-catheters', 'iv-infusion-supplies'],
  },
  {
    name: 'Surgical & OT Supplies',
    slug: toCategorySlug('Surgical & OT Supplies'),
    seoTitle: 'Surgical Consumables Manufacturer | Secure MediTech Global',
    metaDescription:
      'Surgical consumables manufacturer & equipment supplier: AAMI Level 4 OT combo packs & AQL 0.65 sterile powder-free latex surgical gloves. EN 455 & EN 13795.',
    primaryKeyword: 'surgical consumables manufacturer',
    secondaryKeywords: [
      'surgical equipment supplier',
      'OT combo surgical pack wholesale',
      'sterile latex surgical gloves supplier',
      'private label surgical supplies',
    ],
    longTailKeywords: [
      'custom sterile operating theater OT combo pack EN 13795 manufacturer',
      'AQL 0.65 powder-free gamma sterilized latex surgical gloves wholesale',
      'AAMI Level 4 impervious surgical drape and gown procedure pack',
    ],
    heroEyebrow: 'Operating Theater Barrier & Procedure Packs',
    heroHeading: 'Surgical Consumables & Operating Theater Packs',
    overview:
      'Operating room sterility and barrier integrity manufactured for general surgery, obstetrics, orthopedics, and cardiovascular suites. Every surgical glove lot passes AQL 0.65 pinhole testing, and OT Combo procedure packs comply with EN 13795 and ASTM F1670/F1671.',
    clinicalApplications: [
      'Turnkey aseptic operating theater setup across general laparotomy, orthopedic implant, Cesarean/OB-GYN, and cardiovascular procedures',
      'Low-protein (<25 µg/g) gamma-irradiated surgical hand barrier protection in sizes 6.0 through 9.0 with curved anatomical fit',
      'Custom-bill-of-materials (BOM) private-label OT packs assembled in ISO Class 7 cleanrooms to cut theater turnover time',
    ],
    relatedServiceIds: ['oem-manufacturing', 'turnkey-hospital-equipment', 'global-logistics-coldchain'],
    relatedCategorySlugs: ['anesthesia-airway-management', 'critical-care-monitoring', 'iv-infusion-supplies'],
  },
  {
    name: 'Laboratory & Diagnostics',
    slug: toCategorySlug('Laboratory & Diagnostics'),
    seoTitle: 'Laboratory & Diagnostic Equipment Supplier | Secure MediTech',
    metaDescription:
      'International laboratory & diagnostic equipment supplier: CE IVD automated biochemistry analyzers (400 T/H), refrigerated reagent racks & LIS integration.',
    primaryKeyword: 'laboratory equipment supplier',
    secondaryKeywords: [
      'diagnostic equipment supplier',
      'clinical biochemistry analyzer wholesale',
      'automated chemistry workstation CE IVD',
      'hospital laboratory instrumentation',
    ],
    longTailKeywords: [
      '400 tests per hour automated clinical biochemistry analyzer supplier',
      'benchtop random-access chemistry analyzer with 80 refrigerated positions',
      'IEC 61010-2-101 CE IVD hospital laboratory diagnostic equipment',
    ],
    heroEyebrow: 'Clinical Chemistry & IVD Instrumentation',
    heroHeading: 'Automated Laboratory & Diagnostic Equipment',
    overview:
      'High-throughput In Vitro Diagnostic (IVD) laboratory systems engineered for hospital pathology labs and regional diagnostic centers, supported by NIST-traceable calibration, 2°C–8°C cold-chain logistics, and bidirectional LIS/HIS connectivity.',
    clinicalApplications: [
      'High-volume automated photometric clinical chemistry assays (400 T/H constant throughput, up to 640 T/H with ISE Na/K/Cl/Li)',
      'Continuous 24-hour Peltier reagent stability at 2°C–8°C across 80 refrigerated positions with random-access emergency stat sampling',
      'Automated hospital laboratory workflow integration over HL7 RS-232 and Ethernet LIS/HIS interfaces',
    ],
    relatedServiceIds: ['biomedical-calibration-maintenance', 'global-logistics-coldchain', 'turnkey-hospital-equipment'],
    relatedCategorySlugs: ['critical-care-monitoring', 'iv-infusion-supplies', 'dialysis-supplies'],
  },
];

export const CATEGORY_BY_SLUG: Record<string, CategorySeoProfile> = Object.fromEntries(
  CATEGORY_SEO_PROFILES.map((c) => [c.slug, c])
);

export const CATEGORY_BY_NAME: Record<string, CategorySeoProfile> = Object.fromEntries(
  CATEGORY_SEO_PROFILES.map((c) => [c.name, c])
);

export interface ProductSeoMeta {
  primaryKeyword: string;
  secondaryKeywords: string[];
  applications: string[];
  buyerTitlePrefix: string;
}

export const PRODUCT_SEO_MAP: Record<string, ProductSeoMeta> = {
  'cvp-catheter-kit': {
    primaryKeyword: 'CVP catheter kit wholesale supplier',
    secondaryKeywords: ['central venous pressure kit ISO 13485', 'triple lumen Seldinger CVP kit CE 0123'],
    applications: [
      'Continuous central venous pressure (CVP) hemodynamic monitoring in adult and surgical ICUs',
      'High-volume fluid resuscitation and emergency central venous access',
      'Long-term parenteral nutrition and incompatible IV medication infusion across 1 to 4 lumens',
    ],
    buyerTitlePrefix: 'CVP Catheter Kit (Single to Quad Lumen)',
  },
  'block-needle': {
    primaryKeyword: 'echogenic nerve block needle wholesale',
    secondaryKeywords: ['ultrasound regional anesthesia block needle', 'NRFit nerve stimulator needle supplier'],
    applications: [
      'Ultrasound-guided peripheral nerve blocks at steep insertion angles up to 60°',
      'Combined ultrasound and electrical nerve stimulation regional anesthesia',
      'Orthopedic, upper/lower limb, and peri-operative pain management blocks',
    ],
    buyerTitlePrefix: 'Echogenic Nerve Block Needle',
  },
  'pressure-monitoring-kit': {
    primaryKeyword: 'invasive blood pressure monitoring kit supplier',
    secondaryKeywords: ['disposable IBP pressure transducer kit wholesale', 'AAMI BP22 arterial line transducer'],
    applications: [
      'Direct continuous arterial blood pressure waveform monitoring in ICU and operating theaters',
      'Central venous pressure (CVP) and Swan-Ganz pulmonary artery multipressure tracking',
      'Universal bedside compatibility with Philips, Mindray, GE, Edwards, and Nihon Kohden monitors',
    ],
    buyerTitlePrefix: 'Invasive Pressure Monitoring Transducer Kit',
  },
  'icu-combo-kit': {
    primaryKeyword: 'ICU consumables bundle kit wholesale',
    secondaryKeywords: ['critical care procedure pack supplier', 'hospital ICU admission disposable kit'],
    applications: [
      'Rapid aseptic ICU bed admission bundling CVP, arterial line, closed suction, and ECG leads',
      'Cardiothoracic post-operative intensive care standardization and barcode lot tracking',
      'Emergency trauma resuscitation rooms reducing multi-SKU picking errors',
    ],
    buyerTitlePrefix: 'ICU Critical Care Consumables Combo Kit',
  },
  'ot-combo-pack': {
    primaryKeyword: 'surgical OT combo pack manufacturer',
    secondaryKeywords: ['sterile operating theater drape pack wholesale', 'EN 13795 AAMI Level 4 surgical pack'],
    applications: [
      'General laparotomy and abdominal operating theater sterile field setup',
      'Orthopedic implant, Cesarean / OB-GYN, and cardiovascular surgical procedures',
      'Custom OEM hospital procedure packs standardized for faster operating room turnover',
    ],
    buyerTitlePrefix: 'Operating Theater Surgical OT Combo Pack',
  },
  'flexometallic-tube': {
    primaryKeyword: 'flexometallic reinforced endotracheal tube supplier',
    secondaryKeywords: ['armored spiral wire ETT wholesale', 'ISO 5361 cuffed kink resistant ET tube'],
    applications: [
      'Head, neck, ENT, oral, and maxillofacial surgeries requiring sharp tube angulation',
      'Neurosurgical and spinal procedures in prone positioning without lumen collapse',
      'Long-duration anesthesia where standard PVC endotracheal tubes risk kinking',
    ],
    buyerTitlePrefix: 'Flexometallic Reinforced Armored ET Tube',
  },
  'endotracheal-tube-normal': {
    primaryKeyword: 'endotracheal tube cuffed uncuffed wholesale',
    secondaryKeywords: ['medical PVC ET tube ISO 5361 supplier', 'HVLP cuff endotracheal tube CE 0123'],
    applications: [
      'Routine general anesthesia oral and nasal intubation across adult and pediatric IDs (2.0–10.0mm)',
      'ICU invasive mechanical ventilation with low-pressure HVLP cuff mucosal protection',
      'Emergency trauma airway securing with radiopaque placement verification line',
    ],
    buyerTitlePrefix: 'Cuffed & Uncuffed Endotracheal Tube',
  },
  'iv-infusion-set': {
    primaryKeyword: 'IV infusion giving set wholesale supplier',
    secondaryKeywords: ['macro micro drip IV set ISO 8536-4', 'gravity infusion set 15 micron filter'],
    applications: [
      'Adult standard (20 drops/mL) and pediatric micro-drip (60 drops/mL) gravity IV therapy',
      'Hospital ward hydration, electrolyte replacement, and intermittent Y-site drug delivery',
      'Whole blood and blood component administration using 200µm filter configurations',
    ],
    buyerTitlePrefix: 'Gravity IV Infusion Giving Set',
  },
  'iv-cannula': {
    primaryKeyword: 'IV cannula with port and wings wholesale',
    secondaryKeywords: ['peripheral intravenous catheter supplier', 'ISO 10555-5 IV cannula 14G-26G'],
    applications: [
      'Rapid trauma fluid resuscitation using high-flow 14G (300 mL/min) and 16G (180 mL/min) gauges',
      'General medical-surgical inpatient intravenous access (18G–22G) with silicone injection port',
      'Pediatric and neonatal fragile-vein cannulation using 24G and 26G thin-wall catheters',
    ],
    buyerTitlePrefix: 'IV Cannula with Injection Port & Wings',
  },
  'closed-suction-catheter': {
    primaryKeyword: 'closed suction catheter 24h 72h wholesale',
    secondaryKeywords: ['PEEP preserving ICU endotracheal suction system', 'ventilator closed suction supplier'],
    applications: [
      'Continuous ICU secretion clearance for ventilated patients without circuit disconnection',
      'VAP infection control and PEEP maintenance across 24-hour and 72-hour change intervals',
      'Endotracheal (54cm) and tracheostomy (30.5cm) adult airway suctioning in 10 Fr to 16 Fr',
    ],
    buyerTitlePrefix: 'Closed Suction Catheter (24h / 72h System)',
  },
  'ecg-electrodes': {
    primaryKeyword: 'disposable ECG monitoring electrodes wholesale',
    secondaryKeywords: ['Ag/AgCl hydrogel ECG electrode supplier', 'ANSI AAMI EC12 telemetry electrodes'],
    applications: [
      'Continuous ICU bedside cardiac telemetry and coronary care monitoring',
      'Emergency department triage, Holter ambulatory monitoring, and cardiac stress testing',
      'Adult teardrop/round foam, breathable micropore, and pediatric (30mm) monitoring',
    ],
    buyerTitlePrefix: 'Disposable Ag/AgCl ECG Electrodes',
  },
  'niv-masks': {
    primaryKeyword: 'NIV CPAP BiPAP ventilation mask wholesale',
    secondaryKeywords: ['hospital non-invasive ventilation mask supplier', 'liquid silicone NIV full face mask'],
    applications: [
      'Acute respiratory failure CPAP and BiPAP support in ICU and emergency departments',
      'Dual-limb ICU ventilator setups (non-vented blue elbow) and single-limb circuits (vented clear elbow)',
      'Step-down respiratory care across Small, Medium, Large, and XL facial ergonomics',
    ],
    buyerTitlePrefix: 'NIV CPAP / BiPAP Ventilation Masks',
  },
  'foleys-catheter': {
    primaryKeyword: "Foley's catheter silicone latex wholesale supplier",
    secondaryKeywords: ['100% silicone 2-way 3-way Foley catheter', 'ISO 20696 urinary balloon catheter'],
    applications: [
      'Long-term indwelling bladder catheterization up to 30 days with 100% biocompatible silicone',
      'Post-operative urological continuous bladder irrigation via 3-way Fr 18–Fr 24 catheters',
      'Routine pediatric (Fr 8–Fr 10) and adult (Fr 12–Fr 24) surgical urinary drainage',
    ],
    buyerTitlePrefix: "Foley's Catheter (Latex & 100% Silicone)",
  },
  'dialysis-catheter': {
    primaryKeyword: 'dual triple lumen hemodialysis catheter supplier',
    secondaryKeywords: ['acute dialysis catheter kit ISO 10555-1', 'high flow vascular access dialysis kit'],
    applications: [
      'Acute hemodialysis and continuous renal replacement therapy (CRRT) vascular access',
      'High-flow >350–400 mL/min extracorporeal blood circuits with <2% step-tip recirculation',
      'Complete bedside Seldinger insertion across 11.5 Fr, 12 Fr, and 14 Fr lengths',
    ],
    buyerTitlePrefix: 'Dual & Triple Lumen Dialysis Catheter Kit',
  },
  'spirometer-3ball': {
    primaryKeyword: '3-ball incentive spirometer wholesale supplier',
    secondaryKeywords: ['respiratory lung exercise spirometer bulk', '600 900 1200 cc/s incentive spirometer'],
    applications: [
      'Post-operative thoracic, cardiac, and upper-abdominal atelectasis prevention',
      'Visual sustained maximal inspiration (SMI) biofeedback at 600, 900, and 1200 cc/second',
      'Inpatient physiotherapy wards and pulmonary rehabilitation discharge programs',
    ],
    buyerTitlePrefix: '3-Ball Incentive Respiratory Spirometer',
  },
  'sterile-latex-gloves': {
    primaryKeyword: 'sterile powder-free latex surgical gloves wholesale',
    secondaryKeywords: ['AQL 0.65 gamma sterile surgical gloves supplier', 'EN 455 ASTM D3577 gloves manufacturer'],
    applications: [
      'General, orthopedic, cardiovascular, and micro-surgical operating room barrier protection',
      'Reduced Type-I allergy exposure via Modified Lowry <25 µg/g low-protein processing',
      'Damp-hand gloving with curved anatomical fit across surgical sizes 6.0 to 9.0',
    ],
    buyerTitlePrefix: 'Sterile Powder-Free Latex Surgical Gloves',
  },
  'biochem-analyzer-5000': {
    primaryKeyword: 'automated clinical biochemistry analyzer supplier',
    secondaryKeywords: ['400 T/H benchtop chemistry analyzer CE IVD', 'hospital diagnostic laboratory equipment'],
    applications: [
      'Hospital central pathology and regional reference laboratory high-throughput chemistry panels',
      'End-point, fixed-time, kinetic, and optional ISE (Na/K/Cl/Li) assays up to 640 T/H',
      'Automated LIS/HIS HL7 laboratory reporting with 80 refrigerated reagent positions (2–8°C)',
    ],
    buyerTitlePrefix: 'Automated Clinical Biochemistry Analyzer',
  },
  'infusion-pump-v120': {
    primaryKeyword: 'volumetric IV infusion pump wholesale supplier',
    secondaryKeywords: ['IEC 60601-2-24 hospital infusion pump', 'ICU microprocessor infusion system'],
    applications: [
      'Precision adult, pediatric, and neonatal critical care IV medication titration (0.10–1,500 mL/h)',
      'ICU wards and post-anesthesia recovery requiring ultrasonic air-in-line and 13-level occlusion alarms',
      'Ambulatory hospital patient transfers supported by >8-hour internal Li-ion battery backup',
    ],
    buyerTitlePrefix: 'Precision Volumetric IV Infusion Pump',
  },
};

export function getRelatedCategoryForProduct(product: Product): CategorySeoProfile | undefined {
  return CATEGORY_BY_NAME[product.category];
}

export function getCategoryLinksMap() {
  return CATEGORIES.map((cat) => {
    const slug = toCategorySlug(cat.name);
    const productsCount = PRODUCTS.filter((p) => p.category === cat.name).length;
    return {
      ...cat,
      slug,
      href: `/products/category/${slug}`,
      productsCount,
    };
  });
}

export const SITE_KEYWORD_MAP_SUMMARY = [
  {
    route: '/',
    pageType: 'Homepage',
    primaryKeyword: 'Wholesale medical supplies',
    secondaryKeywords: ['International medical equipment supplier', 'Hospital supplies wholesale', 'OEM medical device manufacturer'],
  },
  {
    route: '/about',
    pageType: 'About Us & Quality Assurance',
    primaryKeyword: 'International medical equipment supplier',
    secondaryKeywords: ['ISO 13485 medical device manufacturer', 'CE MDR 2017/745 compliance', 'AQL 0.65 medical quality audit'],
  },
  {
    route: '/contact',
    pageType: 'Contact Us & Procurement Desk',
    primaryKeyword: 'Wholesale medical supplies inquiry',
    secondaryKeywords: ['Hospital procurement RFQ desk', 'OEM manufacturing consultation', 'Incoterms 2020 medical freight'],
  },
  {
    route: '/oem-manufacturing',
    pageType: 'OEM & Private Label Manufacturing',
    primaryKeyword: 'OEM medical device manufacturer',
    secondaryKeywords: ['Private label medical supplies', 'ISO Class 7 cleanroom molding', 'Custom OT surgical procedure packs OEM'],
  },
  {
    route: '/services',
    pageType: 'Services Overview',
    primaryKeyword: 'Private label medical supplies',
    secondaryKeywords: ['Medical contract manufacturing services', 'Biomedical equipment calibration', 'CE MDR regulatory technical dossier'],
  },
  {
    route: '/products',
    pageType: 'Master Product Catalog',
    primaryKeyword: 'Medical consumables supplier',
    secondaryKeywords: ['Hospital supplies wholesale catalog', 'Wholesale surgical & ICU consumables', 'CE marked medical devices'],
  },
];

export { SITE };
