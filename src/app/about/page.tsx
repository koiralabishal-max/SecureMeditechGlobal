import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Award,
  CheckCircle2,
  ChevronRight,
  Globe2,
  MapPin,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import { SubpageLayout } from '@/components/SubpageLayout';
import { STATS } from '@/data/products';
import { BRANDS } from '@/data/brands';
import { PROJECTS } from '@/data/projects';
import {
  buildBreadcrumbSchema,
  buildWebPageSchema,
  ORGANIZATION_ID,
  ORGANIZATION_SCHEMA,
  serializeJsonLd,
  WEBSITE_SCHEMA,
} from '@/lib/schema';
import { SITE } from '@/lib/site';

export const dynamic = 'force-static';

const PAGE_TITLE = 'About Secure MediTech Global | ISO 13485 Supplier';
const PAGE_DESCRIPTION =
  'International medical equipment supplier & ISO 13485:2016 manufacturer shipping CE MDR medical supplies to 65+ countries from cleanrooms & US headquarters.';

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  keywords: [
    'international medical equipment supplier',
    'ISO 13485 medical device manufacturer',
    'CE MDR 2017/745 certified medical supplier',
    'global medical distribution 65 countries',
    'AQL 0.65 medical quality assurance',
  ],
  alternates: { canonical: '/about' },
  openGraph: {
    type: 'website',
    url: '/about',
    siteName: SITE.name,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: SITE.ogImage,
        width: 1376,
        height: 768,
        alt: 'Secure MediTech Global medical supply headquarters and international logistics',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [SITE.ogImage],
  },
};

const CERTIFICATIONS = [
  {
    code: 'ISO 13485:2016',
    title: 'Medical Devices Quality Management System',
    description:
      'Comprehensive quality management across all stages of medical device design, manufacturing, sterilization, and lot traceability.',
  },
  {
    code: 'CE MDR 2017/745',
    title: 'European Medical Device Regulation Compliance',
    description:
      'Rigorous notified-body conformity assessment audits covering Class I, Class IIa, Class IIb, Class III, and In Vitro Diagnostic (IVD) systems.',
  },
  {
    code: 'ISO 14971:2019',
    title: 'Risk Management to Medical Devices',
    description:
      'Structured lifecycle risk control, clinical evaluation assessment, and post-market surveillance across all product divisions.',
  },
  {
    code: 'AQL 0.65 & SAL 10⁻⁶',
    title: 'Pinhole Testing & Validated Sterility',
    description:
      'AQL 0.65 water-leak inspection for sterile latex surgical gloves alongside ISO 11135 EtO and ISO 11137 Gamma sterilization.',
  },
];

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    ORGANIZATION_SCHEMA,
    WEBSITE_SCHEMA,
    buildWebPageSchema({
      path: '/about',
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      type: 'AboutPage',
      aboutId: ORGANIZATION_ID,
    }),
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'About Us', path: '/about' },
    ]),
  ],
};

export default function AboutPage() {
  return (
    <SubpageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(structuredData),
        }}
      />

      {/* Hero */}
      <section className="bg-[#19293F] text-white py-14 sm:py-16 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs text-slate-300 mb-5"
          >
            <Link href="/" className="hover:text-[#8CB3D4] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
            <span className="text-white font-semibold" aria-current="page">
              About Us
            </span>
          </nav>

          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#8CB3D4]">
            <Award className="w-4 h-4" />
            <span>Global Medical Manufacturing &amp; Quality Assurance</span>
          </p>

          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white max-w-4xl">
            International Medical Equipment Supplier &amp; Certified Manufacturer
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Headquartered in Sheridan, Wyoming (USA), Secure MediTech Global supplies hospitals, national ministries of health, and regional medical distributors across 65+ countries with ISO 13485:2016 and CE-marked clinical consumables, surgical packs, and diagnostics.
          </p>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-2xl bg-white/[0.05] border border-white/10"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-[#8CB3D4]">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-white mt-1">{stat.label}</div>
                <div className="text-xs text-slate-300 mt-0.5">{stat.subtext}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        {/* Quality Certifications Matrix */}
        <section>
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#223752] tracking-tight">
              Regulatory Accreditations &amp; Cleanroom Standards
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1.5 max-w-3xl">
              Every production batch undergoes documented quality verification, AQL sampling, and sterilization validation prior to international release.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.code}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[#F1F5F8] text-[#223752] border border-[#DCE4EC]">
                      {cert.code}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-[#3F7D6B]" />
                  </div>
                  <h3 className="text-base font-bold text-[#223752] leading-snug">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    {cert.description}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-100 text-xs text-[#2F6153] font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Audited &amp; Validated</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Global Corridors & Regional Supply Footprint */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#223752] flex items-center gap-2">
                <Globe2 className="w-5 h-5 text-[#3B6B91]" />
                <span>Dedicated International Distribution Corridors</span>
              </h2>
              <Link href="/markets" className="text-xs font-bold text-[#3B6B91] hover:underline">
                View 8 Country Guides →
              </Link>
            </div>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              We operate direct medical supply corridors to Europe, the Americas, Asia-Pacific, and Africa—including established clearance workflows for{' '}
              <Link href="/markets/nepal" className="text-[#223752] font-semibold hover:underline">Nepal (DDA)</Link>,{' '}
              <Link href="/markets/kenya" className="text-[#223752] font-semibold hover:underline">Kenya (PPB)</Link>,{' '}
              <Link href="/markets/rwanda" className="text-[#223752] font-semibold hover:underline">Rwanda (RFDA)</Link>,{' '}
              <Link href="/markets/south-africa" className="text-[#223752] font-semibold hover:underline">South Africa (SAHPRA)</Link>,{' '}
              <Link href="/markets/nigeria" className="text-[#223752] font-semibold hover:underline">Nigeria (NAFDAC)</Link>,{' '}
              <Link href="/markets/india" className="text-[#223752] font-semibold hover:underline">India (CDSCO)</Link>,{' '}
              <Link href="/markets/united-kingdom" className="text-[#223752] font-semibold hover:underline">United Kingdom (MHRA)</Link>, and{' '}
              <Link href="/markets/united-states" className="text-[#223752] font-semibold hover:underline">United States</Link>.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {PROJECTS.slice(0, 4).map((proj) => (
                <div
                  key={proj.id}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5"
                >
                  <div className="text-xs font-bold uppercase tracking-wider text-[#3B6B91]">
                    {proj.location}, {proj.country} · {proj.category}
                  </div>
                  <h3 className="text-sm font-bold text-[#223752] leading-snug">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {proj.scopeSummary}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#223752] text-white rounded-2xl p-6 sm:p-8 space-y-5">
            <h2 className="text-xl font-extrabold flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#8CB3D4]" />
              <span>Corporate Registration &amp; Dispatch</span>
            </h2>
            <div className="space-y-3 text-sm text-slate-200">
              <div>
                <div className="text-xs uppercase tracking-wider text-[#8CB3D4] font-bold">
                  Registered US Headquarters
                </div>
                <p className="mt-1 font-medium">
                  30 N Gould St Ste R, Sheridan, WY 82801, USA
                </p>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-[#8CB3D4] font-bold">
                  Logistics &amp; Customs Terms
                </div>
                <p className="mt-1">
                  Incoterms 2020: EXW, FOB, CIF, CFR, DAP, and DDP door-to-door with Certificate of Origin (COO), CoA, and FSC documentation.
                </p>
              </div>
              <div className="flex items-center gap-2 text-[#9DC5B8] text-xs font-semibold pt-1">
                <Truck className="w-4 h-4 shrink-0" />
                <span>24–48 hour emergency air dispatch · 2°C–8°C cold-chain logging</span>
              </div>
            </div>
            <div className="pt-3 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="flex-1 h-11 px-4 bg-[#DCE7F2] hover:bg-[#CBDCEB] text-[#19293F] text-sm font-bold rounded-xl inline-flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Contact Procurement Desk</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/oem-manufacturing"
                className="flex-1 h-11 px-4 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-xl inline-flex items-center justify-center border border-white/20 transition-colors"
              >
                <span>OEM Manufacturing</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Specialized Alliances & Manufacturing Divisions */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-extrabold text-[#223752]">
                Manufacturing Divisions &amp; Technology Alliances
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Proprietary OEM lines and specialized global technology partnerships supporting our 8 clinical divisions.
              </p>
            </div>
            <Link href="/products" className="text-sm font-bold text-[#3B6B91] hover:underline">
              Explore Full Product Catalog →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {BRANDS.map((brand) => (
              <div
                key={brand.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-[#223752] bg-slate-100 px-2.5 py-1 rounded">
                      {brand.logoText}
                    </span>
                    <span className="text-xs font-semibold text-[#2F6153]">
                      Est. {brand.establishedYear}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#223752]">{brand.name}</h3>
                  <p className="text-xs text-slate-500 font-medium">{brand.origin}</p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {brand.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                  {brand.certifications.map((c) => (
                    <span
                      key={c}
                      className="text-[11px] font-semibold bg-[#F1F5F8] text-[#223752] px-2 py-0.5 rounded"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </SubpageLayout>
  );
}
