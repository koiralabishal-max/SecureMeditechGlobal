export interface HospitalProject {
  id: string;
  title: string;
  slug: string;
  clientInstitution: string;
  location: string;
  country: string;
  category: 'Critical Care & ICU' | 'Operating Theater' | 'Renal & Dialysis' | 'Diagnostic Laboratory' | 'Emergency & Disaster Relief';
  completionDate: string;
  scopeSummary: string;
  fullCaseStudy: string;
  quantifiedImpact: string[];
  equipmentSupplied: string[];
  image: string;
}

export const PROJECTS: HospitalProject[] = [
  {
    id: 'national-cardiac-hemodynamics',
    title: 'National Heart Center Hemodynamic Line Standardization',
    slug: 'national-heart-center-hemodynamics',
    clientInstitution: 'National Institute of Cardiovascular Diseases',
    location: 'Kathmandu',
    country: 'Nepal',
    category: 'Critical Care & ICU',
    completionDate: 'November 2025',
    scopeSummary: 'Complete standardization of invasive central venous catheterization (CVP) and arterial pressure monitoring sets across 64 coronary care ICU beds.',
    fullCaseStudy: 'The institution experienced catheter-related blood stream infections (CRBSI) and intermittent signal dampening from inconsistent multi-vendor arterial lines. Secure MediTech Global was awarded the supply contract to deliver integrated triple-lumen CVP Seldinger kits with nitinol guidewires alongside dual-channel pressure transducers with high-frequency flush devices. Our clinical specialist conducted hands-on training for 85 ICU nurse specialists.',
    quantifiedImpact: [
      '38% reduction in catheter placement complications and vein transfixation',
      'Zero arterial transducer zero-drift errors over 72-hour continuous monitoring',
      'Annual consumable budget savings of $42,000 via direct bulk delivery'
    ],
    equipmentSupplied: [
      'CVP (Central Venous Pressure) Kit - Triple Lumen 7Fr (5,000 sets)',
      'Direct-Access Arterial Pressure Monitoring Kits (3,500 sets)',
      'Disposable ECG Monitoring Electrodes (50,000 units)'
    ],
    image: '/assets/aistudio/image_ff91983b.png'
  },
  {
    id: 'nairobi-teaching-icu-upgrade',
    title: 'University Teaching Hospital ICU Closed Suction Overhaul',
    slug: 'nairobi-teaching-icu-upgrade',
    clientInstitution: 'East Africa Regional Teaching & Referral Hospital',
    location: 'Nairobi',
    country: 'Kenya',
    category: 'Critical Care & ICU',
    completionDate: 'August 2025',
    scopeSummary: 'Transitioned a 48-bed trauma and medical ICU from open endotracheal suctioning to 72-hour closed suction systems and armored flexometallic airway tubes.',
    fullCaseStudy: 'Open suctioning was contributing to aerosol generation and ventilator-associated pneumonia (VAP) across long-stay trauma patients. Secure MediTech Global established a bonded warehouse consignment inventory in Nairobi to guarantee uninterrupted replenishment of 24h/72h closed suction systems, reinforced flexometallic endotracheal tubes, and breathing circuit HME filters.',
    quantifiedImpact: [
      '47% decline in hospital-acquired ventilator-associated respiratory infections',
      'Eliminated airway tube collapse during patient repositioning and proning',
      'Guaranteed 24-hour stock availability at hospital loading dock'
    ],
    equipmentSupplied: [
      'Closed Suction Catheter 72h System (8,000 units)',
      'Flexometallic Reinforced Armored ETT (3,000 units)',
      'Normal Endotracheal Tubes Cuffed & Uncuffed (12,000 units)',
      'ICU Combo Consumable Bundles (1,200 kits)'
    ],
    image: '/assets/aistudio/image_c5072168.png'
  },
  {
    id: 'kigali-dialysis-network',
    title: 'National Renal Care Dialysis Vascular Access Supply',
    slug: 'kigali-dialysis-network',
    clientInstitution: 'Central Medical Stores & University Hospital Network',
    location: 'Kigali',
    country: 'Rwanda',
    category: 'Renal & Dialysis',
    completionDate: 'January 2026',
    scopeSummary: 'Turnkey supply of acute dual and triple-lumen hemodialysis catheter kits and high-flow vascular access lines across 6 regional dialysis centers.',
    fullCaseStudy: 'Rapid expansion of outpatient renal replacement therapy required reliable vascular catheters with high flow rates (>350 mL/min) and minimal blood recirculation. Secure MediTech Global supplied certified polyurethane hemodialysis kits featuring step-tip staggered lumens, Nitinol guidewires, and color-coded extension clamps, compliant with MDR 2017/745 Class III.',
    quantifiedImpact: [
      'Recirculation rates verified at < 1.8% across 1,400 dialysis sessions',
      '100% on-time shipment arrival at Kigali International Airport hub',
      'Full CE 0123 batch traceability documentation accepted by Rwanda FDA'
    ],
    equipmentSupplied: [
      'Dialysis Catheter Dual & Triple Lumen Hemodialysis Sets (2,500 kits)',
      'Foley 100% Silicone Balloon Catheters (6,000 units)',
      'Sterile Powder-Free Latex Surgical Gloves (25,000 pairs)'
    ],
    image: '/assets/aistudio/image_d84fe53c.png'
  },
  {
    id: 'lagos-surgical-ot-packs',
    title: 'Private Hospital Consortium Surgical OT Standardization',
    slug: 'lagos-surgical-ot-packs',
    clientInstitution: 'Metropolitan Healthcare Alliance',
    location: 'Lagos',
    country: 'Nigeria',
    category: 'Operating Theater',
    completionDate: 'December 2025',
    scopeSummary: 'Standardized custom sterile operating theater consumable packs, surgical drapes, and powder-free sterile latex gloves across 18 surgical centers.',
    fullCaseStudy: 'Surgeons experienced delays due to missing individual disposable components in operating rooms. Secure MediTech Global engineered an integrated "OT Combo Pack" containing custom surgical drapes, mayo stand covers, skin markers, and suction tubing, combined with AQL 0.65 pinhole-tested surgical gloves.',
    quantifiedImpact: [
      '22-minute average reduction in operating room pre-surgical setup time',
      'Zero surgical glove barrier tears or chemical accelerator dermatitis incidents',
      'Custom bilingual carton packaging with direct inventory barcode scanning'
    ],
    equipmentSupplied: [
      'OT Combo Operating Theater Consumable Packs (4,800 packs)',
      'Sterile Powder-Free Latex Surgical Gloves (120,000 pairs)',
      'Echogenic Ultrasound Nerve Block Needles (3,500 units)'
    ],
    image: '/assets/aistudio/image_4aa64575.png'
  },
  {
    id: 'delhi-critical-care-diagnostic',
    title: 'Autonomous Clinical Biochemistry & Laboratory Expansion',
    slug: 'delhi-diagnostic-expansion',
    clientInstitution: 'Apex Diagnostic & Research Institute',
    location: 'New Delhi',
    country: 'India',
    category: 'Diagnostic Laboratory',
    completionDate: 'March 2025',
    scopeSummary: 'Installation, validation, and calibration of 400 test/hour automated clinical biochemistry workstations with refrigerated reagent carousels.',
    fullCaseStudy: 'High daily test volumes of over 3,000 patient samples overwhelmed the laboratory manual testing benches. Secure MediTech Global provided automated discrete analyzers with 80 refrigerated reagent positions and automated cuvette washing stations, complete with full ISO 15189 accreditation documentation.',
    quantifiedImpact: [
      'Throughput increased to 400 tests/hour with random-access emergency sampling',
      'Sample turnaround time reduced from 4 hours to 45 minutes',
      'Full NIST-traceable calibration and preventative maintenance service contract'
    ],
    equipmentSupplied: [
      'Automated Clinical Biochemistry Analyzer 5000 (3 units)',
      'Photometric clinical chemistry reagents & calibrators (12-month supply)',
      'Laboratory precision consumables & sampling tips (100,000 pcs)'
    ],
    image: '/assets/images/product_biochemistry_analyzer_1792848780691.jpg'
  },
  {
    id: 'southern-africa-infusion-resilience',
    title: 'Regional Healthcare Ministry IV Therapy & Infusion Supply',
    slug: 'southern-africa-infusion-resilience',
    clientInstitution: 'Provincial Health Directorate',
    location: 'Johannesburg',
    country: 'South Africa',
    category: 'Emergency & Disaster Relief',
    completionDate: 'February 2026',
    scopeSummary: 'Strategic buffer stock deployment of 1,000,000 IV cannulas and 500,000 precision gravity infusion sets for national trauma and pediatric centers.',
    fullCaseStudy: 'Global supply chain volatility prompted the health directorate to seek a single certified manufacturer capable of delivering high-volume, cost-effective peripheral IV catheters with Japanese back-cut needles. Secure MediTech Global scheduled containerized maritime consignments with guaranteed temperature-controlled holding at Durban port.',
    quantifiedImpact: [
      '100% on-time delivery across 14 district hospitals without a single stockout',
      'Clinical satisfaction rating of 98.4% among emergency room physicians',
      '30% procurement cost reduction versus legacy European brand pricing'
    ],
    equipmentSupplied: [
      'IV Cannula with Port & Wings 14G-24G (1,000,000 units)',
      'Gravity IV Infusion Sets with 15µm Filter (500,000 units)',
      '3-Ball Incentive Respiratory Spirometers (20,000 units)'
    ],
    image: '/assets/images/product_iv_cannula_set_1792988226730.jpg'
  }
];
