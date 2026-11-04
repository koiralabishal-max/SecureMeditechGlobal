export interface MedicalService {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  capabilities: string[];
  keyBenefits: string[];
  standards: string[];
  targetAudience: string;
  image: string;
}

export const SERVICES: MedicalService[] = [
  {
    id: 'oem-manufacturing',
    title: 'OEM & Contract Cleanroom Manufacturing',
    slug: 'oem-contract-manufacturing',
    shortDescription: 'Precision medical device contract manufacturing across ISO Class 7 (Class 10,000) and Class 8 (Class 100,000) cleanrooms.',
    fullDescription: 'Secure MediTech Global provides end-to-end contract manufacturing for international healthcare brands, hospital groups, and medical device distributors. Operating state-of-the-art automated injection molding, precision catheter extrusion, and validated EtO and Gamma sterilization facilities, we manufacture to exact customer engineering drawings and tolerance specifications.',
    iconName: 'Factory',
    capabilities: [
      'Multi-cavity high-precision medical grade polymer injection molding',
      'Continuous spiral wire armored catheter extrusion (PU, FEP, Silicone)',
      'Aseptic ultrasonic welding and high-integrity RF catheter tipping',
      'Cleanroom automated pouch packaging with 4-side Tyvek barrier sealing',
      'In-house bioburden, pyrogen, and ethylene oxide residual degassing testing'
    ],
    keyBenefits: [
      'Accelerated time-to-market with ready tooling libraries',
      'Full compliance with ISO 13485:2016 and EU MDR 2017/745 Class IIa/IIb/III',
      'Batch traceability with GS1 standard barcode serialization',
      'Cost efficiency with flexible batch MOQs from 2,500 units'
    ],
    standards: ['ISO 13485:2016', 'ISO 14644-1 Class 7/8', 'ISO 11135 EtO', 'ISO 10993'],
    targetAudience: 'Medical device brand owners, OEM clients, national healthcare ministries',
    image: '/assets/images/oem_cleanroom_facility_1792848782226.jpg'
  },
  {
    id: 'cad-tooling-dfm',
    title: 'CAD Tooling & DFM Engineering',
    slug: 'cad-tooling-dfm',
    shortDescription: 'Design for Manufacturability (DFM) analysis, custom mold fabrication, and rapid 3D prototyping for proprietary medical components.',
    fullDescription: 'Our senior biomedical engineering team collaborates with client R&D departments to optimize complex component designs for clinical safety, mold release efficiency, and cost-effective high-volume production. We generate comprehensive 3D CAD models, finite element analysis (FEA), mold flow simulations, and rapid CNC/3D printed prototypes before tool steel cutting.',
    iconName: 'PenTool',
    capabilities: [
      'SolidWorks & Creo 3D parametric medical mold engineering',
      'Rheological mold flow simulation to eliminate flash and sink marks',
      'High-speed 5-axis CNC machining of hardened Swedish ASSAB tool steels',
      'Class 100 prototype cleanroom assembly and First Article Inspection (FAI)',
      'Tolerance verification via high-magnification optical coordinate measuring (CMM)'
    ],
    keyBenefits: [
      'Eliminate costly production re-tooling with pre-production DFM auditing',
      'Prototypes delivered within 7 to 10 business days',
      'Guaranteed tool life up to 1,000,000 shots with lifetime tool maintenance',
      'Full intellectual property (IP) protection and NDA confidentiality'
    ],
    standards: ['ISO 14971 Risk Management', 'ISO 13485:2016 D&D', 'MDR Annex IX'],
    targetAudience: 'Biomedical innovators, device startups, multinational procurement directors',
    image: '/assets/images/product_icu_pressure_monitor_1792988228259.jpg'
  },
  {
    id: 'global-logistics-coldchain',
    title: 'International Logistics & Supply Chain Forwarding',
    slug: 'international-logistics-forwarding',
    shortDescription: 'Bonded warehouse consolidation, temperature-controlled air cargo, and containerized ocean shipping across Nepal, Kenya, Rwanda, South Africa, Nigeria, and India.',
    fullDescription: 'With dedicated distribution hubs across South Asia, East Africa, and Southern Africa, Secure MediTech Global eliminates clinical supply chain disruptions. We manage end-to-end import licensing, consular legalization, customs clearance, and cold-chain temperature-controlled air freight for emergency hospital requirements, as well as full container load (FCL) sea freight for national bulk procurements.',
    iconName: 'Truck',
    capabilities: [
      'Incoterms 2020 execution: EXW, FOB, CIF, CFR, DAP, and DDP door-to-door',
      'Direct partnerships with major air cargo carriers for 3 to 7 day global transit',
      'Continuous NIST-traceable temperature logging for heat-sensitive consumables',
      'Consignment stocking and strategic bonded warehouse buffer reserves',
      'Customs clearance handling including Bill of Lading, CoA, and Certificate of Origin'
    ],
    keyBenefits: [
      'Zero port demurrage delays with pre-cleared regulatory paperwork',
      'Emergency trauma and ICU stockout dispatch within 24 to 48 hours',
      'Significant freight savings through consolidated mixed-pallet container stuffing',
      'Real-time cargo tracking and dedicated logistics desk support'
    ],
    standards: ['Good Distribution Practice (GDP)', 'WHO Annex 5 GDP Guidelines', 'IATA Cargo'],
    targetAudience: 'Hospital procurement teams, regional distributor networks, UN agencies',
    image: '/assets/images/hero_medical_logistics_1792848779603.jpg'
  },
  {
    id: 'turnkey-hospital-equipment',
    title: 'Turnkey Hospital Ward & ICU Equipment Packages',
    slug: 'turnkey-hospital-equipment-supply',
    shortDescription: 'Standardized comprehensive equipment and consumable packs for operating theaters, ICUs, and emergency trauma departments.',
    fullDescription: 'We configure and supply fully synchronized, turnkey medical equipment packages for newly commissioned hospital wings, ICU expansions, and surgical theaters. From automated clinical chemistry analyzers and volumetric infusion pumps to dedicated catheterization trays and procedure packs, our bundles ensure immediate clinical readiness on day one.',
    iconName: 'Building2',
    capabilities: [
      'Custom clinical consumable bundle assembly (ICU Combo & OT Combo)',
      'Multi-parameter monitor and infusion pump pre-calibration',
      'Standardization of catheter sizes and connectors across hospital wards',
      'Dual-language IFU documentation and clinical staff training aids',
      'Lot-matched shipment scheduling aligned with hospital commissioning phases'
    ],
    keyBenefits: [
      'Single-vendor accountability reduces administrative procurement overhead by 40%',
      'Eliminates component incompatibility between tubing, pumps, and cannulas',
      'Predictable budgeting with locked-in annual contract pricing',
      'Complete regulatory dossier ready for institutional accreditation audits'
    ],
    standards: ['MDR (EU) 2017/745', 'IEC 60601-1 Medical Electrical Equipment', 'ISO 13485'],
    targetAudience: 'Hospital administrators, clinic directors, healthcare construction EPCs',
    image: '/assets/aistudio/image_c5072168.png'
  },
  {
    id: 'biomedical-calibration-maintenance',
    title: 'Biomedical Equipment Calibration & Support',
    slug: 'biomedical-calibration-maintenance',
    shortDescription: 'Certified preventative maintenance, electrical safety inspections, and NIST-traceable calibration for clinical diagnostic devices.',
    fullDescription: 'Our certified biomedical service engineers provide post-installation calibration, annual preventative maintenance (PPM), and emergency troubleshooting for clinical biochemistry analyzers, infusion pumps, and critical care monitoring systems. Every servicing visit includes calibrated test records, electrical safety analyzer printouts, and compliance certificates.',
    iconName: 'Wrench',
    capabilities: [
      'Photometric spectrophotometer optical wavelength calibration (±1 nm)',
      'Infusion pump flow rate accuracy and occlusion pressure calibration',
      'Patient simulator verification for ECG and invasive pressure channels',
      'Critical spare parts inventory maintained at regional distribution hubs',
      'Remote telemetry diagnostics and firmware upgrades'
    ],
    keyBenefits: [
      'Maximizes equipment uptime and patient diagnostic accuracy',
      'Extends capital equipment lifespan beyond 8 to 10 years',
      'Meets international hospital accreditation (JCI, NABH, ISO 15189) standards',
      '24/7 technical hotline access for hospital engineering staff'
    ],
    standards: ['IEC 62353 Medical Electrical Safety', 'ISO 17025 Calibration', 'ISO 9001'],
    targetAudience: 'Hospital biomedical engineering heads, clinical laboratory managers',
    image: '/assets/images/product_biochemistry_analyzer_1792848780691.jpg'
  },
  {
    id: 'regulatory-technical-dossier',
    title: 'Regulatory Affairs & CE MDR Technical Dossier Support',
    slug: 'regulatory-ce-mdr-dossier-support',
    shortDescription: 'Preparation of CE MDR 2017/745 technical files, ISO 14971 risk management reports, and local Ministry of Health registration dossiers.',
    fullDescription: 'Navigating international medical device regulations requires rigorous technical documentation. Secure MediTech Global provides comprehensive regulatory dossiers including Clinical Evaluation Reports (CER), Post-Market Surveillance (PMS) plans, biological evaluation summaries (ISO 10993), and sterilization validation protocols for smooth national registration in target markets.',
    iconName: 'ShieldCheck',
    capabilities: [
      'EU MDR 2017/745 Class IIa, IIb, and Class III Technical Documentation',
      'Biocompatibility test protocols according to ISO 10993 series',
      'Ethylene Oxide residual gas dissipation analysis reports (ISO 11135)',
      'Free Sale Certificates (FSC) and Apostille Embassy Legalization',
      'Local authorized representative (EC REP / UKRP) coordination'
    ],
    keyBenefits: [
      'Fast-track local health authority and drug administration approvals',
      'Pre-audited documentation prevents tender rejection',
      'Full legal compliance protecting brand owners against regulatory recalls',
      'Direct liaison with EU Notified Bodies (TÜV SÜD, BSI, DNV)'
    ],
    standards: ['MDR (EU) 2017/745', 'ISO 13485:2016', 'ISO 14971:2019', 'ISO 10993'],
    targetAudience: 'Importers, pharmaceutical distributors, regional health ministries',
    image: '/assets/images/product_surgical_gloves_1792848782534.jpg'
  }
];
