'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { initOrganicAttribution } from '@/lib/analytics';

interface GoogleTagIntegrationsProps {
  gaId?: string;
  gtmId?: string;
}

const VALID_GA_RE = /^G-[A-Z0-9]+$/i;
const VALID_GTM_RE = /^GTM-[A-Z0-9]+$/i;

export function GoogleTagIntegrations({ gaId, gtmId }: GoogleTagIntegrationsProps) {
  const safeGaId = gaId && VALID_GA_RE.test(gaId.trim()) ? gaId.trim() : '';
  const safeGtmId = gtmId && VALID_GTM_RE.test(gtmId.trim()) ? gtmId.trim() : '';

  useEffect(() => {
    initOrganicAttribution();
  }, []);

  return (
    <>
      {safeGtmId && (
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${safeGtmId}');`}
        </Script>
      )}

      {safeGaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${safeGaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} window.gtag = gtag; gtag('js', new Date()); gtag('config', '${safeGaId}', { anonymize_ip: true });`}
          </Script>
        </>
      )}
    </>
  );
}
