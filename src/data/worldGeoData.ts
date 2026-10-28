// Simplified GeoJSON FeatureCollection for World Landmasses
// Enables instant zero-latency rendering of global continents with D3 geo projections

export interface GeoFeature {
  type: 'Feature';
  properties: {
    name: string;
    continent: string;
  };
  geometry: {
    type: 'Polygon' | 'MultiPolygon';
    coordinates: number[][][] | number[][][][];
  };
}

export interface GeoDataCollection {
  type: 'FeatureCollection';
  features: GeoFeature[];
}

export const WORLD_GEO_DATA: GeoDataCollection = {
  type: 'FeatureCollection',
  features: [
    // North America
    {
      type: 'Feature',
      properties: { name: 'North America', continent: 'North America' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-168, 65], [-160, 71], [-140, 70], [-125, 69], [-105, 69], [-85, 70], [-75, 62],
          [-65, 58], [-60, 48], [-66, 44], [-71, 42], [-75, 35], [-81, 25], [-81, 30],
          [-89, 29], [-97, 26], [-97, 21], [-88, 16], [-83, 9], [-77, 8], [-80, 8],
          [-85, 13], [-95, 16], [-105, 20], [-110, 24], [-117, 32], [-124, 38], [-125, 49],
          [-132, 54], [-136, 58], [-145, 60], [-155, 59], [-165, 60], [-168, 65]
        ]]
      }
    },
    // Greenland
    {
      type: 'Feature',
      properties: { name: 'Greenland', continent: 'North America' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-44, 60], [-35, 66], [-20, 70], [-18, 77], [-25, 82], [-40, 83], [-55, 82],
          [-60, 78], [-52, 72], [-50, 65], [-44, 60]
        ]]
      }
    },
    // South America
    {
      type: 'Feature',
      properties: { name: 'South America', continent: 'South America' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-77, 8], [-72, 11], [-62, 10], [-50, 0], [-35, -5], [-35, -9], [-39, -15],
          [-42, -22], [-48, -28], [-53, -33], [-58, -38], [-65, -44], [-68, -53], [-74, -53],
          [-75, -45], [-72, -35], [-71, -25], [-76, -15], [-80, -5], [-80, 2], [-77, 8]
        ]]
      }
    },
    // Europe
    {
      type: 'Feature',
      properties: { name: 'Europe', continent: 'Europe' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-9, 36], [-9, 43], [-1, 44], [-2, 47], [3, 51], [8, 54], [10, 58], [14, 55],
          [20, 55], [26, 60], [30, 65], [40, 67], [50, 67], [60, 67], [50, 55], [40, 50],
          [35, 45], [28, 41], [24, 38], [22, 40], [15, 40], [13, 44], [9, 44], [3, 42],
          [-1, 36], [-6, 36], [-9, 36]
        ]]
      }
    },
    // Scandinavia
    {
      type: 'Feature',
      properties: { name: 'Scandinavia', continent: 'Europe' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [5, 60], [10, 58], [15, 56], [18, 59], [22, 65], [28, 70], [24, 71], [15, 69],
          [10, 65], [5, 62], [5, 60]
        ]]
      }
    },
    // United Kingdom & Ireland
    {
      type: 'Feature',
      properties: { name: 'British Isles', continent: 'Europe' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-5, 50], [1, 51], [0, 53], [-2, 57], [-4, 58], [-6, 56], [-5, 52], [-5, 50]
        ]]
      }
    },
    // Africa
    {
      type: 'Feature',
      properties: { name: 'Africa', continent: 'Africa' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-6, 36], [0, 36], [11, 37], [12, 33], [24, 32], [32, 31], [33, 27], [40, 20],
          [44, 12], [51, 12], [47, 5], [41, -2], [40, -10], [36, -17], [34, -25], [30, -31],
          [26, -34], [18, -34], [17, -29], [12, -18], [12, -6], [9, 3], [5, 5], [3, 6],
          [-5, 5], [-12, 7], [-17, 12], [-17, 16], [-16, 21], [-13, 27], [-6, 36]
        ]]
      }
    },
    // Madagascar
    {
      type: 'Feature',
      properties: { name: 'Madagascar', continent: 'Africa' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [48, -12], [50, -15], [47, -25], [44, -25], [44, -18], [48, -12]
        ]]
      }
    },
    // Asia & Russia
    {
      type: 'Feature',
      properties: { name: 'Asia', continent: 'Asia' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [35, 45], [40, 50], [50, 55], [60, 67], [80, 72], [105, 75], [130, 72], [160, 70],
          [170, 65], [180, 65], [170, 60], [160, 53], [145, 48], [140, 44], [131, 42],
          [128, 38], [122, 35], [120, 31], [118, 25], [108, 20], [105, 14], [102, 10],
          [98, 5], [102, 2], [104, 1], [100, 7], [97, 15], [89, 21], [85, 20], [80, 15],
          [80, 9], [77, 8], [73, 16], [70, 22], [65, 25], [60, 25], [55, 25], [52, 27],
          [50, 30], [45, 30], [40, 32], [36, 36], [35, 45]
        ]]
      }
    },
    // Arabian Peninsula
    {
      type: 'Feature',
      properties: { name: 'Arabia', continent: 'Asia' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [35, 28], [40, 28], [45, 30], [50, 30], [55, 27], [56, 25], [59, 23], [58, 20],
          [54, 17], [48, 14], [43, 13], [42, 16], [38, 22], [35, 28]
        ]]
      }
    },
    // Japan
    {
      type: 'Feature',
      properties: { name: 'Japan', continent: 'Asia' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [141, 43], [142, 38], [140, 35], [136, 34], [131, 32], [130, 33], [133, 35],
          [138, 37], [141, 41], [141, 43]
        ]]
      }
    },
    // Southeast Asia islands / Indonesia / Philippines
    {
      type: 'Feature',
      properties: { name: 'Maritime Southeast Asia', continent: 'Asia' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [95, 5], [100, 0], [105, -5], [115, -8], [125, -8], [130, -5], [125, 0], [120, 2],
          [115, 5], [108, 4], [100, 3], [95, 5]
        ]]
      }
    },
    // Australia
    {
      type: 'Feature',
      properties: { name: 'Australia', continent: 'Oceania' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [115, -22], [120, -15], [130, -12], [142, -11], [148, -19], [152, -26], [150, -35],
          [144, -38], [138, -35], [130, -32], [120, -34], [115, -30], [113, -25], [115, -22]
        ]]
      }
    },
    // New Zealand
    {
      type: 'Feature',
      properties: { name: 'New Zealand', continent: 'Oceania' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [173, -35], [178, -38], [175, -42], [170, -46], [168, -44], [172, -41], [173, -35]
        ]]
      }
    }
  ]
};

export interface ShippingHub {
  id: string;
  name: string;
  city: string;
  country: string;
  region: string;
  coordinates: [number, number]; // [longitude, latitude]
  isHQ?: boolean;
  type: 'Global Corporate HQ' | 'Regional Distribution Gateway' | 'Manufacturing & QC Center' | 'Maritime Consolidation Hub';
  customsFacility: string;
  transitAir: string;
  transitOcean: string;
  certifications: string[];
  keyIncoterms: string[];
  tempStorage: string;
  servedMarkets: string[];
  annualConsignments: string;
}

export const SHIPPING_HUBS: ShippingHub[] = [
  {
    id: 'usa-hq',
    name: 'North America Global Logistics HQ',
    city: 'Sheridan, WY',
    country: 'United States',
    region: 'North America',
    coordinates: [-106.9562, 44.7978],
    isHQ: true,
    type: 'Global Corporate HQ',
    customsFacility: 'US FDA Registered & Customs Bonded Gateway',
    transitAir: '24–48 Hours Priority Hospital Delivery',
    transitOcean: '14–18 Days Coast-to-Coast Allocation',
    certifications: ['US FDA Cleared', 'ISO 13485:2016', 'GDP Validated'],
    keyIncoterms: ['DDP', 'CIF', 'FOB', 'EXW'],
    tempStorage: 'Climate-controlled warehouse with active 2°C–8°C dataloggers',
    servedMarkets: ['USA & Canada Hospital Systems', 'LATAM Regional Consignments', 'GPO Bulk Contracts'],
    annualConsignments: '18,500+ Shipments'
  },
  {
    id: 'eu-hub',
    name: 'European Central Medical Gateway',
    city: 'Rotterdam / Antwerp',
    country: 'Netherlands / Belgium',
    region: 'Europe & UK',
    coordinates: [4.4777, 51.9244],
    type: 'Regional Distribution Gateway',
    customsFacility: 'EU Bonded Medical Free-Zone & Schiphol Air Ramp',
    transitAir: '24–36 Hours Direct EU Hospital Drop-ship',
    transitOcean: '12–16 Days Deep-Sea Container Clearance',
    certifications: ['CE MDR 2017/745 Notified Body', 'ISO 13485:2016', 'GDP Certified'],
    keyIncoterms: ['DDP', 'CIF', 'FOB', 'DAP'],
    tempStorage: 'Cold-chain pallet bays (2°C–8°C & -20°C deep freeze)',
    servedMarkets: ['Germany, France, UK NHS', 'Nordic & Central European Tenders', 'Benelux Healthcare Networks'],
    annualConsignments: '24,200+ Pallets'
  },
  {
    id: 'mena-hub',
    name: 'MENA & African Transit Hub',
    city: 'Dubai (JAFZA)',
    country: 'United Arab Emirates',
    region: 'Middle East & Africa',
    coordinates: [55.2708, 25.2048],
    type: 'Regional Distribution Gateway',
    customsFacility: 'Jebel Ali Freezone (JAFZA) Medical Bonded Logistics Park',
    transitAir: '24–48 Hours Across GCC & East Africa',
    transitOcean: '8–14 Days Regional Feeder Vessel Network',
    certifications: ['UAE MOHAP Registered', 'Saudi SFDA Compliant', 'ISO 13485'],
    keyIncoterms: ['CIF', 'FOB', 'DDP', 'CFR'],
    tempStorage: 'Insulated pharma-grade staging with 24/7 cold monitoring',
    servedMarkets: ['Saudi Arabia, UAE, Qatar, Oman', 'East & North Africa Ministries of Health', 'Levant Regional Hospitals'],
    annualConsignments: '16,800+ Orders'
  },
  {
    id: 'apac-hub',
    name: 'APAC Maritime & Aviation Hub',
    city: 'Singapore',
    country: 'Singapore',
    region: 'Asia-Pacific',
    coordinates: [103.8198, 1.3521],
    type: 'Maritime Consolidation Hub',
    customsFacility: 'Changi Airport Airfreight Centre (CAC) & PSA Seaport',
    transitAir: '18–36 Hours Express ASEAN & Australasia',
    transitOcean: '6–10 Days Intra-Asia Feeder Lines',
    certifications: ['HSA GDP Certified', 'ISO 13485:2016', 'TGA Compliant'],
    keyIncoterms: ['FOB', 'CIF', 'EXW', 'DAP'],
    tempStorage: 'Chilled & ambient ISO 9001 certified medical distribution center',
    servedMarkets: ['Australia, New Zealand', 'Japan, South Korea, Taiwan', 'Indonesia, Philippines, Malaysia'],
    annualConsignments: '29,400+ Shipments'
  },
  {
    id: 'asia-mfg',
    name: 'Manufacturing, Sterilization & QC Center',
    city: 'Shenzhen / Guangzhou',
    country: 'Greater Bay Area',
    region: 'East Asia Production',
    coordinates: [114.0579, 22.5431],
    type: 'Manufacturing & QC Center',
    customsFacility: 'Direct Customs Export Terminal & Bonded Cleanroom Logistics',
    transitAir: 'Daily Air Cargo Charters to US / EU / MENA',
    transitOcean: 'Direct FCL/LCL Container Terminal Loading',
    certifications: ['ISO 13485:2016', 'Class 100,000 Cleanroom', 'EO & Gamma Sterilization'],
    keyIncoterms: ['FOB', 'CIF', 'EXW'],
    tempStorage: 'Raw material quarantine, automated sterile barrier pack storage',
    servedMarkets: ['Worldwide Global Export & OEM Distribution', 'Tier-1 Hospital Brand Manufacturing'],
    annualConsignments: '120M+ Consumables Produced'
  },
  {
    id: 'latam-hub',
    name: 'Latin America Distribution Gateway',
    city: 'São Paulo (Santos)',
    country: 'Brazil',
    region: 'Latin America',
    coordinates: [-46.6333, -23.5505],
    type: 'Regional Distribution Gateway',
    customsFacility: 'Santos Maritime Port & Guarulhos Airport Bonded Complex',
    transitAir: '36–60 Hours South American Major Centers',
    transitOcean: '18–22 Days Inter-American Coastal Freight',
    certifications: ['ANVISA Compliant', 'COFEPRIS Validated', 'ISO 13485'],
    keyIncoterms: ['CIF', 'FOB', 'DDP'],
    tempStorage: 'Temperature-monitored pharmaceutical staging facility',
    servedMarkets: ['Brazil Hospital Federations', 'Colombia, Chile, Peru, Argentina Medical Distributors'],
    annualConsignments: '11,200+ Pallets'
  }
];

export interface ShippingRoute {
  id: string;
  sourceHubId: string;
  targetHubId?: string;
  targetCity: string;
  targetCountry: string;
  targetCoordinates: [number, number];
  mode: 'Air Priority' | 'Cold-Chain Air' | 'Ocean Container' | 'Inter-Hub Corridor';
  transitDays: string;
  frequency: string;
}

export const SHIPPING_ROUTES: ShippingRoute[] = [
  // Inter-Hub Global Trunks
  {
    id: 'route-mfg-eu',
    sourceHubId: 'asia-mfg',
    targetHubId: 'eu-hub',
    targetCity: 'Rotterdam / Antwerp',
    targetCountry: 'Netherlands',
    targetCoordinates: [4.4777, 51.9244],
    mode: 'Inter-Hub Corridor',
    transitDays: '3–5 Days Air / 24 Days Ocean',
    frequency: 'Daily Express Flights / 3x Weekly Vessels'
  },
  {
    id: 'route-mfg-usa',
    sourceHubId: 'asia-mfg',
    targetHubId: 'usa-hq',
    targetCity: 'Sheridan, WY',
    targetCountry: 'United States',
    targetCoordinates: [-106.9562, 44.7978],
    mode: 'Inter-Hub Corridor',
    transitDays: '2–4 Days Air Charter / 18 Days Ocean',
    frequency: 'Bi-weekly Dedicated Air Cargo'
  },
  {
    id: 'route-mfg-mena',
    sourceHubId: 'asia-mfg',
    targetHubId: 'mena-hub',
    targetCity: 'Dubai',
    targetCountry: 'UAE',
    targetCoordinates: [55.2708, 25.2048],
    mode: 'Inter-Hub Corridor',
    transitDays: '2–3 Days Air / 14 Days Ocean',
    frequency: 'Daily Direct Flights'
  },
  {
    id: 'route-mfg-apac',
    sourceHubId: 'asia-mfg',
    targetHubId: 'apac-hub',
    targetCity: 'Singapore',
    targetCountry: 'Singapore',
    targetCoordinates: [103.8198, 1.3521],
    mode: 'Inter-Hub Corridor',
    transitDays: '24 Hours Air / 4 Days Ocean',
    frequency: 'Daily Shuttle Express'
  },
  {
    id: 'route-usa-latam',
    sourceHubId: 'usa-hq',
    targetHubId: 'latam-hub',
    targetCity: 'São Paulo',
    targetCountry: 'Brazil',
    targetCoordinates: [-46.6333, -23.5505],
    mode: 'Cold-Chain Air',
    transitDays: '36–48 Hours',
    frequency: '3x Weekly Cold-Chain Flights'
  },
  // North America Regional Outward Routes
  {
    id: 'route-usa-ny',
    sourceHubId: 'usa-hq',
    targetCity: 'New York / Boston',
    targetCountry: 'USA East Coast',
    targetCoordinates: [-74.006, 40.7128],
    mode: 'Air Priority',
    transitDays: '24 Hours',
    frequency: 'Daily Direct Logistics'
  },
  {
    id: 'route-usa-toronto',
    sourceHubId: 'usa-hq',
    targetCity: 'Toronto / Montreal',
    targetCountry: 'Canada',
    targetCoordinates: [-79.3832, 43.6532],
    mode: 'Air Priority',
    transitDays: '24–36 Hours',
    frequency: 'Daily Expedited Courier'
  },
  {
    id: 'route-usa-monterrey',
    sourceHubId: 'usa-hq',
    targetCity: 'Monterrey / Mexico City',
    targetCountry: 'Mexico',
    targetCoordinates: [-100.3161, 25.6866],
    mode: 'Cold-Chain Air',
    transitDays: '36 Hours',
    frequency: 'Daily Bonded Transit'
  },
  // European Regional Outward Routes
  {
    id: 'route-eu-london',
    sourceHubId: 'eu-hub',
    targetCity: 'London',
    targetCountry: 'United Kingdom',
    targetCoordinates: [-0.1278, 51.5074],
    mode: 'Air Priority',
    transitDays: '24 Hours',
    frequency: 'Daily NHS Hospital Supply'
  },
  {
    id: 'route-eu-frankfurt',
    sourceHubId: 'eu-hub',
    targetCity: 'Frankfurt / Munich',
    targetCountry: 'Germany',
    targetCoordinates: [8.6821, 50.1109],
    mode: 'Cold-Chain Air',
    transitDays: '18–24 Hours',
    frequency: 'Daily Express Road & Air'
  },
  {
    id: 'route-eu-milan',
    sourceHubId: 'eu-hub',
    targetCity: 'Milan / Rome',
    targetCountry: 'Italy',
    targetCoordinates: [9.1900, 45.4642],
    mode: 'Air Priority',
    transitDays: '24 Hours',
    frequency: 'Daily Express'
  },
  {
    id: 'route-eu-madrid',
    sourceHubId: 'eu-hub',
    targetCity: 'Madrid / Barcelona',
    targetCountry: 'Spain',
    targetCoordinates: [-3.7038, 40.4168],
    mode: 'Ocean Container',
    transitDays: '48 Hours Express Road / 4 Days Ocean',
    frequency: 'Weekly Multi-Container'
  },
  {
    id: 'route-eu-nordics',
    sourceHubId: 'eu-hub',
    targetCity: 'Stockholm / Copenhagen',
    targetCountry: 'Nordic Healthcare',
    targetCoordinates: [18.0686, 59.3293],
    mode: 'Cold-Chain Air',
    transitDays: '24–36 Hours',
    frequency: 'Daily Monitored Flight'
  },
  // MENA & African Routes
  {
    id: 'route-mena-riyadh',
    sourceHubId: 'mena-hub',
    targetCity: 'Riyadh / Jeddah',
    targetCountry: 'Saudi Arabia',
    targetCoordinates: [46.6753, 24.7136],
    mode: 'Cold-Chain Air',
    transitDays: '24 Hours',
    frequency: 'Daily Direct Flights'
  },
  {
    id: 'route-mena-cairo',
    sourceHubId: 'mena-hub',
    targetCity: 'Cairo / Alexandria',
    targetCountry: 'Egypt',
    targetCoordinates: [31.2357, 30.0444],
    mode: 'Ocean Container',
    transitDays: '48 Hours Air / 5 Days Red Sea Feeder',
    frequency: 'Daily Air & Bi-weekly Sea'
  },
  {
    id: 'route-mena-nairobi',
    sourceHubId: 'mena-hub',
    targetCity: 'Nairobi',
    targetCountry: 'Kenya / East Africa',
    targetCoordinates: [36.8219, -1.2921],
    mode: 'Cold-Chain Air',
    transitDays: '36 Hours',
    frequency: '3x Weekly Scheduled Cargo'
  },
  {
    id: 'route-mena-joburg',
    sourceHubId: 'mena-hub',
    targetCity: 'Johannesburg / Cape Town',
    targetCountry: 'South Africa',
    targetCoordinates: [28.0473, -26.2041],
    mode: 'Air Priority',
    transitDays: '48 Hours',
    frequency: '3x Weekly Dedicated Flights'
  },
  // APAC Regional Routes
  {
    id: 'route-apac-sydney',
    sourceHubId: 'apac-hub',
    targetCity: 'Sydney / Melbourne',
    targetCountry: 'Australia',
    targetCoordinates: [151.2093, -33.8688],
    mode: 'Air Priority',
    transitDays: '24–48 Hours',
    frequency: 'Daily Direct Flights'
  },
  {
    id: 'route-apac-tokyo',
    sourceHubId: 'apac-hub',
    targetCity: 'Tokyo / Osaka',
    targetCountry: 'Japan',
    targetCoordinates: [139.6917, 35.6895],
    mode: 'Cold-Chain Air',
    transitDays: '24 Hours',
    frequency: 'Daily Direct Air Cargo'
  },
  {
    id: 'route-apac-jakarta',
    sourceHubId: 'apac-hub',
    targetCity: 'Jakarta / Surabaya',
    targetCountry: 'Indonesia',
    targetCoordinates: [106.8456, -6.2088],
    mode: 'Ocean Container',
    transitDays: '24 Hours Air / 3 Days Seaport',
    frequency: 'Daily Feeder Services'
  },
  {
    id: 'route-apac-mumbai',
    sourceHubId: 'apac-hub',
    targetCity: 'Mumbai / New Delhi',
    targetCountry: 'India',
    targetCoordinates: [72.8777, 19.0760],
    mode: 'Air Priority',
    transitDays: '24–36 Hours',
    frequency: 'Daily Scheduled Dispatch'
  },
  // LATAM Regional Routes
  {
    id: 'route-latam-bogota',
    sourceHubId: 'latam-hub',
    targetCity: 'Bogotá / Medellín',
    targetCountry: 'Colombia',
    targetCoordinates: [-74.0721, 4.7110],
    mode: 'Cold-Chain Air',
    transitDays: '36 Hours',
    frequency: '3x Weekly Flights'
  },
  {
    id: 'route-latam-santiago',
    sourceHubId: 'latam-hub',
    targetCity: 'Santiago',
    targetCountry: 'Chile',
    targetCoordinates: [-70.6693, -33.4489],
    mode: 'Ocean Container',
    transitDays: '48 Hours Air / 10 Days Coastal',
    frequency: '2x Weekly Ocean Liners'
  }
];

export const GLOBAL_COVERAGE_STATS = [
  { value: '65+', label: 'Nations Served', sub: 'Direct hospital deliveries across 5 continents' },
  { value: '6 Hubs', label: 'Strategic Gateways', sub: 'US HQ, EU, MENA, APAC, China & LATAM' },
  { value: '< 48h', label: 'Emergency Air Dispatch', sub: 'Guaranteed Priority customs ramp departure' },
  { value: '100%', label: 'Cold-Chain Traceability', sub: 'Calibrated dataloggers on every consignment' }
];
