import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-[#38B6FF]">404</p>
      <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B2F63]">Page not found</h1>
      <p className="mt-3 text-base text-slate-600 max-w-md">
        The page you are looking for has moved. Browse our medical supply catalog from the homepage.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center px-5 py-3 text-sm font-semibold text-white bg-[#0B2F63] hover:bg-[#164082] rounded-xl transition-colors"
      >
        Back to homepage
      </Link>
    </main>
  );
}
