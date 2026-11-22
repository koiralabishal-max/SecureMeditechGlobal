import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The requested page could not be found. Browse Secure MediTech Global certified medical supplies and OEM manufacturing catalog.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-[#F7F8FA]">
      <p className="text-sm font-semibold uppercase tracking-wider text-[#3B6B91]">404</p>
      <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#223752]">Page not found</h1>
      <p className="mt-3 text-base text-slate-600 max-w-md">
        The page you are looking for has moved or does not exist. Browse our medical supply catalog or return to the homepage.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center px-5 py-3 text-sm font-semibold text-white bg-[#223752] hover:bg-[#2E496B] rounded-xl transition-colors"
        >
          Back to homepage
        </Link>
        <Link
          href="/products"
          className="inline-flex items-center px-5 py-3 text-sm font-semibold text-[#223752] bg-white border border-slate-300 hover:border-[#223752] rounded-xl transition-colors"
        >
          Browse Product Catalog
        </Link>
      </div>
    </main>
  );
}
