import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // 1. CVP Kit
  {
    id: 'cvp-catheter-kit',
    name: 'CVP (Central Venous Pressure) Kit',
    category: 'Critical Care & Monitoring',
    sku: 'SMT-CCM-CVP01',
    tagline: 'Aseptic Seldinger vascular access for continuous central venous monitoring',
    description: 'Complete sterile Seldinger-technique Central Venous Catheterization Kit for hemodynamic pressure monitoring, rapid fluid resuscitation, and parenteral drug administration. Includes biocompatible radiopaque polyurethane catheter with atraumatic blue soft tip, J-tip Nitinol guidewire in thumb-feed dispenser, vessel dilator, Y-introducer needle, and catheter clamp with suture wings.',
    certifications: ['CE 0123', 'ISO 13485:2016'],
    specs: {
      'Catheter Lumen': 'Single (16G/18G), Double (7Fr), Triple (7Fr/8.5Fr), Quad (8.5Fr)',
      'Catheter Material': 'Thermosensitive radiopaque polyurethane (non-thrombogenic)',
      'Guidewire': '0.032" / 0.035" J-tip Nitinol with depth marks and thumb feeder',
      'Sterilization': 'Ethylene Oxide (EO) sterile barrier packaging',
      'Biocompatibility': 'ISO 10993 cytotoxicity and hemocompatibility verified'
    },
    sizes: [
      'Single Lumen: 16G (20cm), 18G (20cm)',
      'Double Lumen: 7Fr (15cm / 20cm)',
      'Triple Lumen: 7Fr (15cm / 20cm / 30cm)',
      'Quad Lumen: 8.5Fr (20cm)'
    ],
    standards: ['ISO 10555-1', 'ISO 10555-3', 'MDR (EU) 2017/745 Class III'],
    packaging: '1 set/sterile hard blister tray, 10 sets/inner box, 40 sets/carton',
    minOrderQty: '100 sets',
    leadTime: '3-5 business days',
    image: '/src/assets/images/product_cvp_catheter_kit_1792988224908.jpg',
    featured: true
  },

  // 2. Block Needle
  {
    id: 'block-needle',
    name: 'Echogenic Nerve Block Needle',
    category: 'Anesthesia & Airway Management',
    sku: 'SMT-ANM-BN100',
    tagline: 'Laser-etched high-visibility echogenic tip for precision ultrasound-guided nerve blocks',
    description: 'High-visibility echogenic regional anesthesia block needle engineered with laser-etched micro-reflectors for ultra-sharp ultrasound guidance. Features smooth silicone glide coating, ergonomic hub with 30° / 45° bevel geometry, integrated transparent extension tubing, and electrical nerve stimulator connector.',
    certifications: ['CE 0123', 'ISO 13485:2016'],
    specs: {
      'Echogenic Visibility': '360° ring reflectors visible at steep insertion angles up to 60°',
      'Bevel Angle': '30° facet bevel or 45° short bevel (atraumatic penetration)',
      'Extension Line': '60cm transparent DEHP-free microbore tubing with male Luer lock',
      'Cannula Coating': 'Medical silicone low-friction coating for smooth tissue gliding',
      'Stimulator Lead': 'Standard 2mm connector pin with protective gold contact'
    },
    sizes: [
      '21G: 50mm, 100mm',
      '22G: 50mm, 80mm, 100mm, 120mm',
      '25G: 50mm, 70mm'
    ],
    standards: ['ISO 7864', 'ISO 80369-6 (NRFit compatible)', 'ISO 14971'],
    packaging: '1 pc/sterile peel pack, 25 pcs/dispenser box, 400 pcs/master carton',
    minOrderQty: '250 pcs',
    leadTime: '3-5 business days',
    image: '/src/assets/images/product_iv_cannula_set_1792988226730.jpg',
    featured: true
  },

  // 3. Pressure Monitoring Kit
  {
    id: 'pressure-monitoring-kit',
    name: 'Pressure Monitoring Kit (Invasive Blood Pressure)',
    category: 'Critical Care & Monitoring',
    sku: 'SMT-CCM-PMK02',
    tagline: 'Zero-drift disposable transducer set for continuous arterial & venous pressure waveforms',
    description: 'Disposable pre-assembled physiological pressure transducer set for continuous direct arterial, central venous, and pulmonary artery blood pressure monitoring. Equipped with transparent fluidic dome, snap-tab 3mL/hr continuous flush device, zero-drift semiconductor chip sensor, and non-compliant pressure tubing.',
    certifications: ['CE 0123', 'ISO 13485:2016'],
    specs: {
      'Sensitivity': '5.0 µV/V/mmHg ± 1% with high dynamic frequency response',
      'Pressure Range': '-50 mmHg to +300 mmHg',
      'Continuous Flush Rate': '3 mL/hr at 300 mmHg infusion bag pressure',
      'Tubing': 'Rigid non-compliant PVC pressure monitoring line (150cm / 180cm)',
      'Connector Cables': 'Compatible with Philips, Mindray, GE, Edwards, Nihon Kohden'
    },
    sizes: [
      'Single Channel (Arterial Line)',
      'Dual Channel (Arterial + CVP)',
      'Triple Channel (ICU Multipressure / Swan-Ganz)'
    ],
    standards: ['IEC 60601-2-34', 'AAMI BP22', 'MDR 2017/745 Class IIa'],
    packaging: '1 set/sterile Tyvek pouch, 20 sets/box, 80 sets/carton',
    minOrderQty: '80 sets',
    leadTime: '5-7 business days',
    image: '/src/assets/images/product_icu_pressure_monitor_1792988228259.jpg',
    featured: true
  },

  // 4. ICU Combo
  {
    id: 'icu-combo-kit',
    name: 'ICU Combo (Critical Care Consumables Bundle)',
    category: 'Critical Care & Monitoring',
    sku: 'SMT-CCM-ICU99',
    tagline: 'Standardized sterile critical care bundle for rapid ICU bed readiness & infection prevention',
    description: 'Integrated high-dependency intensive care bundle containing essential sterile disposables: CVP line kit, arterial line catheter, closed suction catheter system (24h), pressure transducer kit, ECG electrode pack, and extension manifolds. Packaged together for rapid aseptic bedside setup and procedural inventory control.',
    certifications: ['CE 0123', 'ISO 13485:2016'],
    specs: {
      'Bundle Inclusions': 'CVP Kit (Triple 7Fr), Arterial Line (20G), Pressure Transducer, Closed Suction (14Fr), 10x ECG Electrodes',
      'Packaging Format': 'Sterile inner modules inside unified multi-layer aseptic pack',
      'Application': 'ICU admission, acute resuscitation, post-operative surgical ICU',
      'Compliance': 'Full lot traceability with dual barcode scanning labels'
    },
    sizes: [
      'Standard Adult ICU Combo Kit',
      'Cardiothoracic Surgery ICU Combo Kit',
      'Pediatric / Neonatal ICU Custom Bundle'
    ],
    standards: ['ISO 13485', 'ISO 11607', 'WHO Patient Safety Guidelines'],
    packaging: '1 combo kit/sealed sterile barrier pack, 10 kits/master shipper',
    minOrderQty: '50 kits',
    leadTime: '5-7 business days',
    image: '/src/assets/images/product_cvp_catheter_kit_1792988224908.jpg',
    featured: false
  },

  // 5. OT Combo
  {
    id: 'ot-combo-pack',
    name: 'OT Combo (Operating Theater Consumable Pack)',
    category: 'Surgical & OT Supplies',
    sku: 'SMT-SOT-OTC01',
    tagline: 'Turnkey aseptic surgical drape & disposable consumable pack for operating theaters',
    description: 'Turnkey aseptic surgical consumable set designed for operating theater workflow efficiency. Contains reinforced liquid-barrier surgical drapes with incise film and fluid collection pouches, sterile latex surgical gloves, electrosurgical pencil with tip cleaner, suction connecting tubing with Yankauer handle, and surgical sponges with X-ray detectable thread.',
    certifications: ['CE 0123 Class IIa', 'ISO 13485:2016'],
    specs: {
      'Barrier Level': 'AAMI Level 4 impervious surgical SMS/SMMS fabric',
      'Components': '1x Main Surgical Drape, 2x Gowns, 4x Utility Drapes, 1x Cautery Pencil, 1x Suction Line, 10x X-Ray Gauze',
      'Latex Content': 'Latex-free or powder-free low protein surgical latex options',
      'Sterilization Method': 'Validated Gamma Radiation / Ethylene Oxide'
    },
    sizes: [
      'General Laparotomy OT Combo',
      'Orthopedic Implant OT Combo',
      'Cesarean / OB-GYN OT Combo',
      'Cardiovascular Surgical Pack'
    ],
    standards: ['EN 13795', 'ASTM F1670/F1671 Viral Penetration', 'ISO 11137'],
    packaging: '1 pack/sterile CSR wrap in Tyvek barrier pouch, 8 packs/carton',
    minOrderQty: '40 packs',
    leadTime: '5-7 business days',
    image: '/src/assets/images/product_surgical_gloves_1792848782534.jpg',
    featured: false
  },

  // 6. Flexometallic Tube
  {
    id: 'flexometallic-tube',
    name: 'Flexometallic Tube (Reinforced Armored ETT)',
    category: 'Anesthesia & Airway Management',
    sku: 'SMT-ANM-FMT08',
    tagline: 'Spiral stainless steel wire reinforced tube preventing kink & occlusion during surgery',
    description: 'Kink-resistant spiral stainless steel reinforced endotracheal tube designed for head/neck surgeries, prone positioning, or prolonged intubation where standard tubes risk occlusion. Features high-volume low-pressure (HVLP) barrel cuff, continuous radio-opaque line, Murphy eye, and universal 15mm connector.',
    certifications: ['CE 0123', 'ISO 13485:2016'],
    specs: {
      'Reinforcement': 'Continuous embedded medical 304 stainless steel spiral wire',
      'Cuff Profile': 'HVLP micro-thin cylindrical cuff with pilot balloon & check valve',
      'Tip Design': 'Smooth atraumatic beveled tip with polished Murphy eye',
      'Depth Markings': 'Dual centimeter markings for precise vocal cord placement',
      'Connector': 'Standard ISO 5356-1 conical 15mm connector'
    },
    sizes: [
      'Cuffed ID: 5.0mm, 5.5mm, 6.0mm, 6.5mm, 7.0mm, 7.5mm, 8.0mm, 8.5mm, 9.0mm',
      'Uncuffed ID: 3.0mm, 3.5mm, 4.0mm, 4.5mm, 5.0mm'
    ],
    standards: ['ISO 5361', 'ISO 5356-1', 'MDR 2017/745 Class IIa'],
    packaging: '1 pc/sterile paper-poly pouch, 10 pcs/box, 100 pcs/carton',
    minOrderQty: '100 pcs',
    leadTime: '3-5 business days',
    image: '/src/assets/images/product_endotracheal_tube_1792988225400.jpg',
    featured: true
  },

  // 7. Normal Endotracheal Tube
  {
    id: 'endotracheal-tube-normal',
    name: 'Normal Endotracheal Tube (Cuffed & Uncuffed)',
    category: 'Anesthesia & Airway Management',
    sku: 'SMT-ANM-ETT05',
    tagline: 'Thermosensitive medical PVC endotracheal tube with HVLP cuff & radiopaque line',
    description: 'Medical thermosensitive PVC endotracheal tube that softens at body temperature to conform precisely to tracheal anatomy. Features micro-thin polyurethane HVLP cuff to minimize mucosal ischemic pressure, depth measurement markers, Murphy eye, and full-length radiopaque stripe for radiographic placement verification.',
    certifications: ['CE 0123', 'ISO 13485:2016'],
    specs: {
      'Material': 'Clear thermosensitive medical-grade PVC (DEHP-free)',
      'Cuff System': 'High-volume low-pressure (HVLP) barrel cuff',
      'Pilot Balloon': 'Spring-loaded self-closing valve with size marking',
      'X-Ray Stripe': 'Full length radio-opaque blue line for fluoroscopy detection',
      'Tip Geometry': 'Soft rounded atraumatic bevel with Murphy eye'
    },
    sizes: [
      'Cuffed ID: 3.0mm, 3.5mm, 4.0mm, 4.5mm, 5.0mm, 5.5mm, 6.0mm, 6.5mm, 7.0mm, 7.5mm, 8.0mm, 8.5mm, 9.0mm, 9.5mm, 10.0mm',
      'Uncuffed ID: 2.0mm, 2.5mm, 3.0mm, 3.5mm, 4.0mm, 4.5mm, 5.0mm'
    ],
    standards: ['ISO 5361', 'EN 1782', 'MDR (EU) 2017/745 Class IIa'],
    packaging: '1 pc/sterile peel pack, 10 pcs/box, 100 pcs/export carton',
    minOrderQty: '200 pcs',
    leadTime: '3-5 business days',
    image: '/src/assets/images/product_endotracheal_tube_1792988225400.jpg',
    featured: true
  },

  // 8. IV Set
  {
    id: 'iv-infusion-set',
    name: 'IV Set (Intravenous Infusion Giving Set)',
    category: 'IV & Infusion Supplies',
    sku: 'SMT-IFS-IVS01',
    tagline: 'Gravity IV administration set with micro/macro drip chamber & 15µm fluid filter',
    description: 'Gravity intravenous infusion administration set manufactured from clear, non-toxic medical grade PVC. Equipped with sharp vented/non-vented spike with bacterial air filter, clear flexible drip chamber with 15µm fluid filter, precision V-roller clamp, latex-free Y-injection site, and rotating Luer-lock connector.',
    certifications: ['CE 0123', 'ISO 13485:2016'],
    specs: {
      'Drip Rate': 'Macro Drip (20 drops/mL) or Micro Drip (60 drops/mL)',
      'Tubing Length': '150cm / 180cm / 200cm kink-resistant flexible PVC',
      'Filter Mesh': '15µm particulate fluid filter inside drip chamber',
      'Injection Site': 'Self-sealing latex-free Y-site or flashbulb',
      'Connector': 'Universal male rotating Luer lock with protective cap'
    },
    sizes: [
      'Macro Drip: 20 drops = 1 mL ± 0.1 mL (Adult Standard)',
      'Micro Drip: 60 drops = 1 mL ± 0.1 mL (Pediatric Precision)',
      'Blood Transfusion Set with 200µm filter mesh'
    ],
    standards: ['ISO 8536-4', 'ISO 80369-7', 'ISO 10993'],
    packaging: '1 pc/sterile PE or paper-poly pouch, 25 pcs/polybag, 500 pcs/carton',
    minOrderQty: '1,000 pcs',
    leadTime: '3-5 business days',
    image: '/src/assets/images/product_iv_cannula_set_1792988226730.jpg',
    featured: true
  },

  // 9. IV Cannula
  {
    id: 'iv-cannula',
    name: 'IV Cannula (Intravenous Catheter with Port & Wings)',
    category: 'IV & Infusion Supplies',
    sku: 'SMT-IFS-IVC20',
    tagline: 'Japanese stainless steel needle catheter with color-coded wings & injection port',
    description: 'Peripheral intravenous cannula featuring siliconized ultra-sharp back-cut Japanese stainless steel needle for painless venipuncture. Biocompatible PTFE/FEP catheter with tapered tip ensures minimal vein trauma, color-coded wings for size identification, and self-closing silicone injection port valve for intermittent medication.',
    certifications: ['CE 0123', 'ISO 13485:2016'],
    specs: {
      'Needle Sharpness': 'Back-cut 3-bevel needle geometry for low penetration resistance',
      'Catheter Material': 'Virgin PTFE / FEP / Polyurethane with 4 radiopaque stripes',
      'Flashback Chamber': 'Crystal clear chamber for instant venous entry confirmation',
      'Injection Port': 'Integrated one-way silicone valve with color-coded cap'
    },
    sizes: [
      '14G (Orange - 45mm, Flow: 300 mL/min)',
      '16G (Grey - 45mm, Flow: 180 mL/min)',
      '18G (Green - 45mm, Flow: 90 mL/min)',
      '20G (Pink - 32mm, Flow: 60 mL/min)',
      '22G (Blue - 25mm, Flow: 36 mL/min)',
      '24G (Yellow - 19mm, Flow: 20 mL/min)',
      '26G (Violet - 19mm, Flow: 13 mL/min)'
    ],
    standards: ['ISO 10555-5', 'ISO 80369-7', 'ISO 14971'],
    packaging: '1 pc/sterile blister pack, 50 pcs/dispenser box, 1,000 pcs/carton',
    minOrderQty: '1,000 pcs (20 boxes)',
    leadTime: '3-5 business days',
    image: '/src/assets/images/product_iv_cannula_set_1792988226730.jpg',
    featured: true
  },

  // 10. Closed Suction Catheter
  {
    id: 'closed-suction-catheter',
    name: 'Closed Suction Catheter (24h / 72h System)',
    category: 'Respiratory Care',
    sku: 'SMT-RES-CSC24',
    tagline: 'Multi-day closed circuit bronchial suction system preserving PEEP & sterility',
    description: 'Multi-day sterile closed suction catheter system designed to clear secretions from ventilator-dependent patients without breaking ventilation circuit pressure or aerosolizing pathogens. Includes soft protective PU sleeve, isolating swivel valve with rinse port, dual-swivel elbow, and color-coded depth graduation markings.',
    certifications: ['CE 0123', 'ISO 13485:2016'],
    specs: {
      'Duration of Use': '24-Hour System or Extended 72-Hour System',
      'PEEP Preservation': 'Zero pressure loss during suction procedure',
      'Catheter Sleeve': 'Ultra-thin tactile polyurethane protective isolation sheath',
      'Cleaning Port': 'One-way irrigation flush port with non-reflux valve',
      'Elbow Design': '360° double-swivel connector for reduced torque on airway'
    },
    sizes: [
      '10 Fr (Black) - Length 54cm',
      '12 Fr (White) - Length 54cm',
      '14 Fr (Green) - Length 54cm',
      '16 Fr (Orange) - Length 54cm',
      'Tracheostomy Short Length (30.5cm): 12 Fr, 14 Fr'
    ],
    standards: ['ISO 8836', 'ISO 5356-1', 'MDR 2017/745 Class IIa'],
    packaging: '1 pc/sterile blister pack, 10 pcs/box, 100 pcs/master carton',
    minOrderQty: '100 pcs',
    leadTime: '3-5 business days',
    image: '/src/assets/images/product_respiratory_niv_suction_1792988228094.jpg',
    featured: true
  },

  // 11. ECG Electrodes
  {
    id: 'ecg-electrodes',
    name: 'Disposable ECG Monitoring Electrodes',
    category: 'Critical Care & Monitoring',
    sku: 'SMT-CCM-ECG50',
    tagline: 'High-signal Ag/AgCl hydrogel electrodes for ICU telemetry & stress testing',
    description: 'Hospital-grade disposable silver/silver-chloride (Ag/AgCl) ECG monitoring electrodes with conductive wet gel/solid hydrogel for instant baseline stabilization and low electrical impedance. Breathable foam/micropore backing with hypoallergenic medical adhesive prevents skin irritation during prolonged telemetry.',
    certifications: ['CE 0123', 'ISO 13485:2016'],
    specs: {
      'Sensor Material': 'Silver / Silver Chloride (Ag/AgCl) high conductivity sensor',
      'Conductive Medium': 'Medical conductive solid hydrogel or wet gel',
      'Substrate': 'High-density closed-cell polyethylene foam or micropore paper',
      'Adhesive': 'Hypoallergenic biocompatible pressure-sensitive acrylic',
      'Defibrillation Recovery': '< 5 mV offset instability, fast trace recovery'
    },
    sizes: [
      'Adult Teardrop Foam: 50mm × 55mm',
      'Adult Round Foam: 45mm diameter',
      'Adult Micropore Breathable: 50mm',
      'Pediatric / Neonatal: 30mm diameter'
    ],
    standards: ['ANSI/AAMI EC12', 'ISO 10993 Biocompatibility'],
    packaging: '50 pcs/sealed foil moisture-barrier pouch, 1,000 pcs/box, 5,000 pcs/carton',
    minOrderQty: '5,000 pcs (5 boxes)',
    leadTime: '3-5 business days',
    image: '/src/assets/images/product_icu_pressure_monitor_1792988228259.jpg',
    featured: true
  },

  // 12. NIV Masks
  {
    id: 'niv-masks',
    name: 'NIV Masks (Non-Invasive Ventilation CPAP / BiPAP)',
    category: 'Respiratory Care',
    sku: 'SMT-RES-NIV01',
    tagline: 'Ultra-soft liquid silicone seal mask with anti-asphyxia valve & magnetic headgear clips',
    description: 'Ergonomic medical non-invasive ventilation full-face and nasal masks engineered for hospital ICU, step-down, and emergency mechanical ventilation. Equipped with ultra-soft liquid silicone dual-wall cushion seal, 360° anti-asphyxia elbow valve, forehead support pad, and quick-release magnetic headgear clips.',
    certifications: ['CE 0123', 'ISO 13485:2016'],
    specs: {
      'Cushion Material': 'Medical liquid silicone rubber (LSR) dual-wall auto-fit cushion',
      'Ventilation Types': 'Vented (Clear elbow with exhalation port) & Non-Vented (Blue elbow for dual-limb)',
      'Safety Valve': 'Anti-asphyxia valve opens automatically below 3 cmH2O',
      'Frame & Headgear': 'Polycarbonate lightweight frame with 4-point breathable strap',
      'Circuit Port': 'Standard 22mm conical connection according to ISO 5356-1'
    },
    sizes: [
      'Small (S)',
      'Medium (M)',
      'Large (L)',
      'Extra Large (XL)'
    ],
    standards: ['ISO 17510', 'ISO 5356-1', 'MDR 2017/745 Class IIa'],
    packaging: '1 pc/sealed protective bag with headgear, 20 pcs/shipping carton',
    minOrderQty: '20 pcs',
    leadTime: '3-5 business days',
    image: '/src/assets/images/product_respiratory_niv_suction_1792988228094.jpg',
    featured: true
  },

  // 13. Foley’s Catheter
  {
    id: 'foleys-catheter',
    name: "Foley's Catheter (Normal Latex / 100% Silicone)",
    category: 'Urology & Catheters',
    sku: 'SMT-URO-FC16',
    tagline: 'Hydrophilic coated latex and 100% silicone 2-way/3-way balloon catheters',
    description: 'Sterile 2-way and 3-way indwelling urinary drainage balloon catheter. Available in medical-grade hydrophilic coated latex or 100% transparent biocompatible silicone for long-term catheterization up to 30 days. Smooth side drainage eyes and symmetric high-integrity balloon minimize encrustation and urethral irritation.',
    certifications: ['CE 0123', 'ISO 13485:2016'],
    specs: {
      'Material Varieties': '100% All-Silicone (Medical Grade) or Siliconized Natural Latex',
      'Channel Options': '2-Way (Drainage + Inflation) or 3-Way (Irrigation + Drainage + Inflation)',
      'Balloon Integrity': 'Symmetrical inflation with puncture-resistant elastomer',
      'Drainage Eyes': 'Opposing oval lateral eyes with bevel-polished smooth edges',
      'Color Coding': 'Universal color-coded hard plastic valve for gauge identification'
    },
    sizes: [
      '2-Way Pediatric: Fr 8, Fr 10 (3-5cc balloon)',
      '2-Way Adult: Fr 12, Fr 14, Fr 16, Fr 18, Fr 20, Fr 22, Fr 24 (5-10cc / 30cc balloon)',
      '3-Way Irrigation: Fr 18, Fr 20, Fr 22, Fr 24 (30cc balloon)'
    ],
    standards: ['EN 1616', 'ISO 20696', 'MDR 2017/745 Class IIb'],
    packaging: '1 pc/sterile double pouch, 10 pcs/box, 200 pcs/carton',
    minOrderQty: '200 pcs (20 boxes)',
    leadTime: '3-5 business days',
    image: '/src/assets/images/product_foley_dialysis_catheter_1792988227912.jpg',
    featured: true
  },

  // 14. Dialysis Catheter
  {
    id: 'dialysis-catheter',
    name: 'Dialysis Catheter (Dual / Triple Lumen Hemodialysis)',
    category: 'Dialysis Supplies',
    sku: 'SMT-DIA-HDC12',
    tagline: 'High-flow polyurethane acute hemodialysis catheter kit with low recirculation',
    description: 'High-flow thermosensitive polyurethane dual-lumen hemodialysis catheter kit designed for acute and temporary vascular access during renal replacement therapy. Features staggered arterial and venous tip design to prevent recirculation (< 2%), high-durability extension lines with color-coded clamps, suture wing, and complete Seldinger insertion accessories.',
    certifications: ['CE 0123', 'ISO 13485:2016'],
    specs: {
      'Flow Rate': '> 350-400 mL/min at arterial venous pressures below 200 mmHg',
      'Tip Design': 'Step-tip staggered lumen design reducing recirculation to under 2%',
      'Lumen Profiles': 'Dual D-shape or coaxial high-flow lumen geometry',
      'Extension Lines': 'Kink-free transparent extensions with printed priming volumes',
      'Kit Accessories': 'Catheter, J-tip Nitinol guidewire, introducer needle, 2x dilators, scalpel'
    },
    sizes: [
      '11.5 Fr: 13.5cm, 16cm, 20cm (Straight / Curved extensions)',
      '12 Fr: 16cm, 20cm, 25cm',
      '14 Fr: 16cm, 20cm, 25cm (High Flow Adult)'
    ],
    standards: ['ISO 10555-1', 'ISO 10555-2', 'MDR (EU) 2017/745 Class III'],
    packaging: '1 set/sterile custom blister tray, 10 sets/inner box, 40 sets/carton',
    minOrderQty: '40 sets',
    leadTime: '3-5 business days',
    image: '/src/assets/images/product_foley_dialysis_catheter_1792988227912.jpg',
    featured: true
  },

  // 15. 3-Ball Spirometer (Existing)
  {
    id: 'spirometer-3ball',
    name: '3-Ball Incentive Respiratory Spirometer',
    category: 'Respiratory Care',
    sku: 'SMT-RES-3B90',
    tagline: 'Multi-stage visual lung volume rehabilitation for post-operative recovery',
    description: 'Precision-engineered triple-chamber incentive spirometer designed to encourage sustained maximal inspiration (SMI). Calibrated chambers at 600, 900, and 1200 cc/second with non-toxic color-coded spherical floats, flexible medical EVA corrugated tubing, and ergonomic antibacterial mouthpiece.',
    certifications: ['CE 0123', 'ISO 13485:2016'],
    specs: {
      'Flow Rate Channels': '600 cc/s (Red), 900 cc/s (Yellow), 1200 cc/s (Blue)',
      'Housing Material': 'Medical-grade crystal styrene (BPA & DEHP free)',
      'Tube & Mouthpiece': '45cm flexible EVA ribbed tube with particulate filter',
      'Sterilization': 'Cleanroom packed, single-patient multi-use',
      'Biocompatibility': 'ISO 10993 cytotoxicity & skin irritation verified'
    },
    sizes: ['Universal Adult / Pediatric calibrated chambers (600/900/1200 cc/s)'],
    standards: ['ISO 13485', 'EN ISO 14971', 'MDR (EU) 2017/745 Class I'],
    packaging: '1 pc/sterile polybag, 50 pcs/export master carton',
    minOrderQty: '500 units',
    leadTime: '3-5 business days',
    image: '/src/assets/images/product_spirometer_1792848780145.jpg',
    featured: true
  },

  // 16. Sterile Latex Gloves (Existing)
  {
    id: 'sterile-latex-gloves',
    name: 'Sterile Powder-Free Latex Surgical Gloves',
    category: 'Surgical & OT Supplies',
    sku: 'SMT-SUR-GL075',
    tagline: 'Micro-textured barrier protection with superior tactile sensitivity',
    description: 'Gamma-irradiated sterile latex surgical gloves with anatomically curved finger geometry to minimize hand fatigue during prolonged surgical interventions. Polymer-coated interior enables smooth damp-hand donning without synthetic talc or chemical accelerants.',
    certifications: ['CE 0123 Class IIa', 'ISO 13485:2016'],
    specs: {
      'Pinhole AQL': 'AQL 0.65 rigorous water-leak tested',
      'Tensile Strength': 'Min. 24 MPa before aging / Min. 18 MPa after accelerated aging',
      'Protein Content': '< 25 µg/g (Modified Lowry method - low allergen risk)',
      'Thickness': 'Cuff 0.16mm, Palm 0.20mm, Finger 0.22mm',
      'Sterilization Method': 'Gamma radiation (SAL 10⁻⁶ validated)'
    },
    sizes: ['Size 6.0', 'Size 6.5', 'Size 7.0', 'Size 7.5', 'Size 8.0', 'Size 8.5', 'Size 9.0'],
    standards: ['EN 455 Parts 1-4', 'ASTM D3577', 'ISO 11137 Radiation Sterilization'],
    packaging: '1 pair/sterile peel pouch, 50 pairs/dispenser box, 4 boxes/carton',
    minOrderQty: '10,000 pairs (50 cartons)',
    leadTime: '7-10 business days',
    image: '/src/assets/images/product_surgical_gloves_1792848782534.jpg',
    featured: true
  },

  // 17. Biochemistry Analyzer (Existing)
  {
    id: 'biochem-analyzer-5000',
    name: 'Automated Clinical Biochemistry Analyzer',
    category: 'Laboratory & Diagnostics',
    sku: 'SMT-LAB-BA5000',
    tagline: 'High-throughput 400 tests/hour clinical diagnostics workstation',
    description: 'Fully automated discrete benchtop clinical chemistry analyzer with continuous random-access capability. Features 80 refrigerated reagent positions (2-8°C), 90 reaction cuvettes with auto-wash station, inverted optical matrix spectrophotometer, and liquid level detection with collision protection.',
    certifications: ['CE IVD', 'ISO 13485:2016'],
    specs: {
      'Constant Throughput': '400 photometric tests/hour (up to 640 T/H with ISE)',
      'Assay Methods': 'End-point, Fixed-time, Kinetic, ISE (Na/K/Cl/Li)',
      'Reagent Cooling': '24-hour Peltier cooling 2°C–8°C for 80 positions',
      'Optical System': '12 wavelengths (340nm–800nm) sealed grating matrix',
      'Connectivity': 'Bidirectional LIS / HIS via RS-232 & Ethernet (HL7 standard)'
    },
    sizes: ['Benchtop Model: 105cm × 72cm × 65cm (Weight: 110 kg)'],
    standards: ['IEC 61010-2-101', 'ISO 14971', 'Directive 98/79/EC IVD'],
    packaging: 'Reinforced anti-shock wooden crate with shockwatch indicator',
    minOrderQty: '1 unit',
    leadTime: '10-14 business days',
    image: '/src/assets/images/product_biochemistry_analyzer_1792848780691.jpg',
    featured: true
  },

  // 18. Infusion Pump (Existing)
  {
    id: 'infusion-pump-v120',
    name: 'Precision Volumetric IV Infusion Pump',
    category: 'IV & Infusion Supplies',
    sku: 'SMT-EQP-IV120',
    tagline: 'Microprocessor-controlled dual-sensor volumetric intravenous drug delivery',
    description: 'Hospital-grade volumetric infusion system engineered for intensive care units, pediatric wards, and surgical recovery. Equipped with ultrasonic air-in-line bubble sensors, multi-level occlusion pressure monitoring, dynamic rate titration, and fail-safe anti-free-flow clamp.',
    certifications: ['CE 0197', 'ISO 13485:2016'],
    specs: {
      'Flow Rate Range': '0.10 to 1,500.0 mL/h in 0.01 mL/h micro-steps',
      'Delivery Accuracy': '±2% with calibrated dedicated medical IV sets',
      'Bolus / Purge Rate': 'Up to 1,200 mL/h with programmable limit thresholds',
      'Occlusion Detection': '13 selectable pressure levels (20–140 kPa)',
      'Battery Backup': 'Internal Lithium-ion rechargeable (8+ hours continuous operation)'
    },
    sizes: ['Compact Pole-Mount Unit: 145mm × 120mm × 100mm (Weight: 1.4 kg)'],
    standards: ['IEC 60601-1', 'IEC 60601-1-2 (EMC)', 'IEC 60601-2-24 Infusion Pumps'],
    packaging: 'Shock-isolated molded EPE foam inside reinforced industrial carton',
    minOrderQty: '5 units',
    leadTime: '5-7 business days',
    image: '/src/assets/images/product_infusion_pump_1792848782970.jpg',
    featured: true
  }
];

export const CATEGORIES: { name: Product['category']; count: number; desc: string }[] = [
  { name: 'Critical Care & Monitoring', count: 4, desc: 'CVP kits, pressure monitoring kits, ICU bundles, ECG electrodes' },
  { name: 'Anesthesia & Airway Management', count: 3, desc: 'Flexometallic tubes, normal ETT, echogenic block needles' },
  { name: 'IV & Infusion Supplies', count: 3, desc: 'IV sets, IV safety cannulas, volumetric infusion pumps' },
  { name: 'Respiratory Care', count: 3, desc: 'Closed suction systems, NIV masks, 3-ball incentive spirometers' },
  { name: 'Urology & Catheters', count: 1, desc: "2-way and 3-way 100% silicone Foley's balloon catheters" },
  { name: 'Dialysis Supplies', count: 1, desc: 'High-flow dual/triple lumen hemodialysis catheters' },
  { name: 'Surgical & OT Supplies', count: 2, desc: 'Aseptic OT combo packs, sterile powder-free latex gloves' },
  { name: 'Laboratory & Diagnostics', count: 1, desc: 'Automated clinical chemistry analyzers, refrigerated centrifuges' }
];

export const OEM_STEPS = [
  {
    step: '01',
    title: 'Custom Specification & Prototyping',
    subtitle: 'From Concept to Functional CAD',
    description: 'Our biomedical engineering team translates your clinical performance criteria into 3D DFM (Design for Manufacturing) schematics, selects biocompatible USP Class VI polymers, and produces functional rapid prototypes.',
    deliverables: ['CAD/CAM Tooling Drawings', 'Polymer Rheology Testing', 'Functional SLA/CNC Prototypes']
  },
  {
    step: '02',
    title: 'ISO 13485 Cleanroom Production',
    subtitle: 'Controlled Cleanroom Fabrication',
    description: 'Manufacturing takes place inside certified ISO Class 7 and Class 8 cleanrooms equipped with automated robotic injection molding, multi-cavity hot runner tooling, and in-line particle & bioburden monitoring.',
    deliverables: ['ISO Class 7/8 Cleanroom Run', 'Real-time Automated Inspection', 'Cpk / Ppk Process Capability > 1.33']
  },
  {
    step: '03',
    title: 'Regulatory Dossier & Global Clearance',
    subtitle: 'EU MDR & International Submissions',
    description: 'We construct complete Technical Documentation files according to EU MDR (EU) 2017/745, ISO 14971 risk management standards, and provide turnkey support for US FDA 510(k), Health Canada, and TGA.',
    deliverables: ['Full Technical Dossier (Annex II/III)', 'Biocompatibility ISO 10993 Reports', 'Sterilization Validation (ISO 11135/11137)']
  },
  {
    step: '04',
    title: 'Bonded Logistics & Cold-Chain Shipping',
    subtitle: 'Secured Global Freight Delivery',
    description: 'Final products are sterilized, tamper-proof packaged, and routed via temperature-monitored bonded logistics to over 65 international seaports and air freight hubs with automated customs clearance.',
    deliverables: ['Validated Sterile Barrier Packaging', 'Continuous Temp/Humidity Dataloggers', 'Door-to-Port / DDP Global Freight']
  }
];

export const STATS = [
  { value: '65+', label: 'Countries Supplied', subtext: 'Global hospital networks' },
  { value: '100%', label: 'Batch Quality Audit', subtext: 'AQL 0.65 inspection protocol' },
  { value: '48h', label: 'Fast Dispatch', subtext: 'In-stock inventory dispatch' },
  { value: 'ISO 13485', label: 'Certified Facility', subtext: 'CE MDR 2017/745 accredited' }
];
