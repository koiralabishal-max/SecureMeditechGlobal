export interface DownloadDocument {
  id: string;
  title: string;
  category: 'Product Catalogues' | 'Company Profiles' | 'Technical Specifications' | 'User Manuals & IFU' | 'Certificates & Quality';
  fileFormat: 'PDF' | 'ZIP' | 'XLSX';
  fileSize: string;
  version: string;
  releaseDate: string;
  description: string;
  downloadUrl: string; // Simulated download trigger
  language: string;
}

export const DOWNLOADS: DownloadDocument[] = [
  {
    id: 'master-catalogue-2026',
    title: 'Secure MediTech Global Master Medical Catalogue (2026 Edition)',
    category: 'Product Catalogues',
    fileFormat: 'PDF',
    fileSize: '14.8 MB',
    version: 'v2026.1',
    releaseDate: 'January 2026',
    description: 'Comprehensive 84-page international hospital inventory catalogue covering Critical Care, Anesthesia, IV Infusion, Respiratory, Urology, Dialysis, Surgical, and Diagnostics with full SKU tables.',
    downloadUrl: '#',
    language: 'English'
  },
  {
    id: 'company-profile-brochure',
    title: 'Corporate Profile & Global Distribution Capabilities',
    category: 'Company Profiles',
    fileFormat: 'PDF',
    fileSize: '4.2 MB',
    version: 'v3.4',
    releaseDate: 'November 2025',
    description: 'Overview of Secure MediTech Global corporate structure, registered US headquarters in Wyoming, international manufacturing plants, bonded warehouse network, and Incoterm freight policies.',
    downloadUrl: '#',
    language: 'English'
  },
  {
    id: 'anesthesia-airway-brochure',
    title: 'Anesthesia & Airway Management Specialty Brochure',
    category: 'Product Catalogues',
    fileFormat: 'PDF',
    fileSize: '5.1 MB',
    version: 'v2.2',
    releaseDate: 'December 2025',
    description: 'Detailed clinical guide and product specifications for flexometallic armored tubes, cuffed/uncuffed ETTs, stylets, and echogenic ultrasound nerve block needles.',
    downloadUrl: '#',
    language: 'English'
  },
  {
    id: 'critical-care-cvp-specsheet',
    title: 'CVP Catheter Kit & Invasive Pressure Monitoring Technical Datasheet',
    category: 'Technical Specifications',
    fileFormat: 'PDF',
    fileSize: '2.8 MB',
    version: 'v4.0',
    releaseDate: 'October 2025',
    description: 'Engineering technical file detailing polyurethane tensile strengths, Nitinol guidewire flexibility tolerances, transducer frequency response curves, and priming volumes.',
    downloadUrl: '#',
    language: 'English'
  },
  {
    id: 'dialysis-catheter-ifu',
    title: 'Hemodialysis Catheter Instructions for Use (IFU) & Priming Guide',
    category: 'User Manuals & IFU',
    fileFormat: 'PDF',
    fileSize: '3.4 MB',
    version: 'v3.1',
    releaseDate: 'September 2025',
    description: 'Clinical operator manual outlining aseptic Seldinger insertion steps, heparin locking volume calculations, dressing change protocols, and flow rate maintenance.',
    downloadUrl: '#',
    language: 'English / French / Spanish'
  },
  {
    id: 'closed-suction-clinical-manual',
    title: '72-Hour Closed Suction System Clinical Protocol & VAP Prevention',
    category: 'User Manuals & IFU',
    fileFormat: 'PDF',
    fileSize: '3.9 MB',
    version: 'v2.5',
    releaseDate: 'August 2025',
    description: 'Nursing instruction manual for ventilator-dependent patient bronchial clearance, PEEP preservation verification, irrigation port usage, and day-change markings.',
    downloadUrl: '#',
    language: 'English'
  },
  {
    id: 'iso-13485-certificate-declaration',
    title: 'ISO 13485:2016 Quality Management System Declaration of Conformity',
    category: 'Certificates & Quality',
    fileFormat: 'PDF',
    fileSize: '1.6 MB',
    version: 'Cert #MD-2024-91',
    releaseDate: 'March 2025',
    description: 'Official registrar certified scope covering the design, cleanroom manufacture, sterilization, and international wholesale distribution of sterile single-use medical devices.',
    downloadUrl: '#',
    language: 'English'
  },
  {
    id: 'ce-mdr-compliance-dossier-summary',
    title: 'EU MDR 2017/745 Notified Body CE Certification Summary',
    category: 'Certificates & Quality',
    fileFormat: 'PDF',
    fileSize: '2.1 MB',
    version: 'MDR-2025-CE',
    releaseDate: 'May 2025',
    description: 'Notified Body audited compliance statement for Class IIa and Class IIb invasive vascular, respiratory, and urinary disposable medical devices.',
    downloadUrl: '#',
    language: 'English'
  },
  {
    id: 'biochem-analyzer-manual',
    title: 'Automated Clinical Chemistry Analyzer 5000 User & Maintenance Manual',
    category: 'User Manuals & IFU',
    fileFormat: 'PDF',
    fileSize: '8.7 MB',
    version: 'v5.2',
    releaseDate: 'July 2025',
    description: 'Installation qualification (IQ), operational qualification (OQ), reagent carousel programming, photometric calibration, and daily wash cycle instructions.',
    downloadUrl: '#',
    language: 'English'
  },
  {
    id: 'oem-contract-manufacturing-guidelines',
    title: 'OEM Private Labeling & Tooling DFM Capability Guidelines',
    category: 'Company Profiles',
    fileFormat: 'PDF',
    fileSize: '4.8 MB',
    version: 'v2026',
    releaseDate: 'February 2026',
    description: 'Engineering reference for medical brand owners: mold steel selection, cleanroom packaging options, sterile barrier testing, and minimum order quantities (MOQ).',
    downloadUrl: '#',
    language: 'English'
  }
];
