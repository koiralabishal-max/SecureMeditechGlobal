export interface BrandPartner {
  id: string;
  name: string;
  logoText: string;
  badge: string;
  manufacturerInfo: string;
  origin: string;
  categories: string[];
  productIds: string[];
  description: string;
  certifications: string[];
  establishedYear: number;
}

export const BRANDS: BrandPartner[] = [
  {
    id: 'secure-meditech-oem',
    name: 'Secure MediTech OEM',
    logoText: 'SMT OEM',
    badge: 'Proprietary Division',
    manufacturerInfo: 'Secure MediTech Global Ltd. Cleanroom Manufacturing Facilities',
    origin: 'USA / Asia Pacific Cleanroom Complexes',
    categories: ['Anesthesia & Airway Management', 'Critical Care & Monitoring', 'Urology & Catheters', 'Surgical & OT Supplies'],
    productIds: ['flexometallic-tube', 'endotracheal-tube-normal', 'cvp-catheter-kit', 'foleys-catheter'],
    description: 'Our core manufacturing line specializing in precision invasive catheters, armored reinforced endotracheal tubes, and multi-lumen central venous access kits produced under ISO 13485:2016 cleanroom standards.',
    certifications: ['CE 0123', 'ISO 13485:2016', 'FDA 510(k) Ready'],
    establishedYear: 2012
  },
  {
    id: 'suretech-precision',
    name: 'SureTech Precision Needles',
    logoText: 'SURETECH',
    badge: 'Anesthesia & Vascular Partner',
    manufacturerInfo: 'SureTech Medical Instruments Co., Ltd.',
    origin: 'Japan & Germany Technology Alliance',
    categories: ['Anesthesia & Airway Management', 'IV & Infusion Supplies'],
    productIds: ['block-needle', 'iv-cannula'],
    description: 'Pioneers in high-visibility laser-etched echogenic nerve block needles and precision back-cut 3-bevel cannula needles engineered with surgical Japanese stainless steel for minimal patient insertion trauma.',
    certifications: ['CE 0197', 'ISO 13485:2016', 'MDR Class IIa'],
    establishedYear: 2008
  },
  {
    id: 'cardiodrive-hemodynamics',
    name: 'CardioLine Hemodynamics',
    logoText: 'CARDIOLINE',
    badge: 'Critical Care Monitoring',
    manufacturerInfo: 'CardioLine Critical Care Devices Corp.',
    origin: 'European Union / Switzerland Standards',
    categories: ['Critical Care & Monitoring'],
    productIds: ['pressure-monitoring-kit', 'ecg-electrodes', 'icu-combo-kit'],
    description: 'Specialists in high-fidelity physiological pressure transducers, closed arterial monitoring manifolds, continuous flush devices, and telemetry-grade Ag/AgCl ECG hydrogel electrodes.',
    certifications: ['CE 0123', 'ISO 13485:2016', 'EN 60601'],
    establishedYear: 2015
  },
  {
    id: 'nephrocare-vascular',
    name: 'NephroCare Vascular Access',
    logoText: 'NEPHROCARE',
    badge: 'Dialysis & Renal Systems',
    manufacturerInfo: 'NephroCare International Medical GmbH',
    origin: 'Germany & Global Logistics Hub',
    categories: ['Dialysis Supplies'],
    productIds: ['dialysis-catheter'],
    description: 'Leading provider of high-flow biocompatible thermosensitive polyurethane acute and chronic hemodialysis catheter kits featuring step-tip staggered lumens that maintain recirculation below 2%.',
    certifications: ['CE 0123', 'ISO 10555-1', 'ISO 13485:2016'],
    establishedYear: 2011
  },
  {
    id: 'respirasafe-airway',
    name: 'RespiraSafe Respiratory Systems',
    logoText: 'RESPIRASAFE',
    badge: 'ICU & Ventilation Care',
    manufacturerInfo: 'RespiraSafe Healthcare Solutions Inc.',
    origin: 'USA & East Asia Manufacturing',
    categories: ['Respiratory Care'],
    productIds: ['closed-suction-catheter', 'spirometer-3ball'],
    description: 'Dedicated to preventing ventilator-associated pneumonia (VAP) through multi-day 24h/72h closed suction catheter systems, specialized swivel elbows, and 3-ball sustained maximal inspiration spirometers.',
    certifications: ['CE 0123', 'ISO 8836', 'ISO 13485:2016'],
    establishedYear: 2014
  },
  {
    id: 'surgishield-aseptic',
    name: 'SurgiShield Barrier Disposables',
    logoText: 'SURGISHIELD',
    badge: 'Surgical & Operating Theater',
    manufacturerInfo: 'SurgiShield Sterile Products Division',
    origin: 'Malaysia & Global Sterilization Hubs',
    categories: ['Surgical & OT Supplies'],
    productIds: ['sterile-latex-gloves', 'ot-combo-pack'],
    description: 'Hospital-grade gamma-irradiated sterile surgical gloves, anatomical surgical barrier packs, and custom OT consumable packs tested to stringent AQL 0.65 pinhole standards.',
    certifications: ['CE 0123 Class IIa', 'EN 455', 'ASTM D3577'],
    establishedYear: 2016
  },
  {
    id: 'biomatrix-diagnostics',
    name: 'BioMatrix Laboratory Diagnostics',
    logoText: 'BIOMATRIX',
    badge: 'Clinical Diagnostics & Instruments',
    manufacturerInfo: 'BioMatrix Diagnostic Systems Co., Ltd.',
    origin: 'South Korea & Global Assembly Hub',
    categories: ['Laboratory & Diagnostics'],
    productIds: ['biochem-analyzer-5000'],
    description: 'High-throughput automated clinical biochemistry analyzers, refrigerated reagent workstations, and automated cuvette washing platforms for central reference laboratories and hospitals.',
    certifications: ['CE IVD', 'ISO 13485:2016', 'ISO 9001'],
    establishedYear: 2017
  }
];
