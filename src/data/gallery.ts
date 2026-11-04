export interface GalleryItem {
  id: string;
  title: string;
  category: 'Products' | 'Cleanrooms & Manufacturing' | 'Hospital Installations' | 'Expos & Conferences';
  caption: string;
  image: string;
  location?: string;
  date?: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'ISO Class 7 Medical Cleanroom Facility',
    category: 'Cleanrooms & Manufacturing',
    caption: 'Automated polymer injection molding and robotic extraction lines within an ISO 14644-1 Class 7 cleanroom environment.',
    image: '/assets/images/oem_cleanroom_facility_1792848782226.jpg',
    location: 'Cleanroom Complex',
    date: '2025'
  },
  {
    id: 'gal-2',
    title: 'Central Venous Catheter (CVP) Blister Tray Packaging',
    category: 'Products',
    caption: 'Sterile hard blister packaging of the CVP Catheter Kit featuring Nitinol J-tip guidewire and vessel dilators.',
    image: '/assets/aistudio/image_ff91983b.png',
    location: 'Aseptic Packaging Suite',
    date: '2026'
  },
  {
    id: 'gal-3',
    title: 'Reinforced Flexometallic Armored ETT',
    category: 'Products',
    caption: 'Spiral stainless steel wire reinforced endotracheal tube preventing lumen collapse during prolonged surgery.',
    image: '/assets/images/flexometallic_tube_clean_1793719762077.jpg',
    location: 'Airway Quality Inspection',
    date: '2026'
  },
  {
    id: 'gal-4',
    title: 'ICU Respiratory & Ventilation Consumables Combo',
    category: 'Products',
    caption: 'Comprehensive ICU ventilator circuit pack containing HME filter, catheter mount, and closed suction system.',
    image: '/assets/aistudio/image_c5072168.png',
    location: 'Critical Care Assembly',
    date: '2026'
  },
  {
    id: 'gal-5',
    title: 'Acute Hemodialysis Dual & Triple Lumen Vascular Catheters',
    category: 'Products',
    caption: 'High-flow thermosensitive polyurethane dialysis catheters with step-tip geometry and color-coded clamps.',
    image: '/assets/aistudio/image_d84fe53c.png',
    location: 'Nephrology Quality Lab',
    date: '2026'
  },
  {
    id: 'gal-6',
    title: 'Global Bonded Warehouse & Air Cargo Forwarding',
    category: 'Hospital Installations',
    caption: 'Palletized international medical air cargo dispatch to strategic distribution hubs in Africa, India, and Nepal.',
    image: '/assets/images/hero_medical_logistics_1792848779603.jpg',
    location: 'Air Cargo Logistics Terminal',
    date: '2025'
  },
  {
    id: 'gal-7',
    title: 'Normal Endotracheal Tubes (Cuffed & Uncuffed Variants)',
    category: 'Products',
    caption: 'Thermosensitive medical PVC endotracheal tubes with micro-thin HVLP cuffs and radiopaque x-ray stripes.',
    image: '/assets/aistudio/image_1fee0fc7.png',
    location: 'Sterile Inspection Line',
    date: '2026'
  },
  {
    id: 'gal-8',
    title: 'Echogenic Ultrasound-Guided Nerve Block Needles',
    category: 'Products',
    caption: 'Precision laser-etched echogenic tip pattern providing crystal-clear acoustic reflection under ultrasound.',
    image: '/assets/aistudio/image_c109e49f.png',
    location: 'Precision Needle Suite',
    date: '2025'
  },
  {
    id: 'gal-9',
    title: 'Automated Clinical Chemistry Diagnostics Workstation',
    category: 'Hospital Installations',
    caption: '400 test/hour automated biochemistry analyzer installed in central hospital clinical reference laboratory.',
    image: '/assets/images/product_biochemistry_analyzer_1792848780691.jpg',
    location: 'Central Pathology Laboratory',
    date: '2025'
  },
  {
    id: 'gal-10',
    title: 'Sterile Powder-Free Latex Surgical Gloves Inspection',
    category: 'Products',
    caption: 'Gamma-irradiated sterile latex surgical gloves undergoing 100% automated water-leak AQL 0.65 pinhole verification.',
    image: '/assets/aistudio/image_2f0f661c.png',
    location: 'Quality Assurance Cleanroom',
    date: '2026'
  },
  {
    id: 'gal-11',
    title: 'Operating Theater Custom Consumables Pack (OT Combo)',
    category: 'Hospital Installations',
    caption: 'Standardized aseptic surgical procedure pack layout deployed across surgical suites for rapid turnover.',
    image: '/assets/aistudio/image_4aa64575.png',
    location: 'Surgical Theater Suite',
    date: '2026'
  },
  {
    id: 'gal-12',
    title: 'Multi-Day Closed Suction Bronchial Catheter System',
    category: 'Products',
    caption: 'PEEP-preserving closed bronchial suction catheter with 360-degree double swivel and tactile protective PU sheath.',
    image: '/assets/aistudio/image_1869f62c.png',
    location: 'Intensive Care Unit',
    date: '2026'
  }
];
