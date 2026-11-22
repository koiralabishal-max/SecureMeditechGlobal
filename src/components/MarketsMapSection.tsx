'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const GlobalDistributionMap = dynamic(
  () => import('./GlobalDistributionMap').then((m) => m.GlobalDistributionMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[460px] sm:h-[540px] rounded-3xl bg-[#19293F] border border-slate-800 animate-pulse flex items-center justify-center text-slate-300 text-sm">
        Loading Interactive Global Distribution Map...
      </div>
    ),
  }
);

export function MarketsMapSection() {
  const router = useRouter();

  const handleSelectHubForInquiry = (hubName: string) => {
    router.push(`/contact?hub=${encodeURIComponent(hubName)}`);
  };

  return (
    <section id="distribution-map" className="scroll-mt-24">
      <GlobalDistributionMap onSelectHubForInquiry={handleSelectHubForInquiry} />
    </section>
  );
}
