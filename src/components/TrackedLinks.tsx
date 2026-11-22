'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import {
  trackOemInquiry,
  trackProductView,
  trackWhatsAppInquiry,
} from '@/lib/analytics';

export function ProductViewTracker({
  id,
  sku,
  name,
  category,
}: {
  id: string;
  sku: string;
  name: string;
  category: string;
}) {
  useEffect(() => {
    trackProductView({ id, sku, name, category });
  }, [id, sku, name, category]);

  return null;
}

interface TrackedWhatsAppAnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  source: string;
  sku?: string;
  productName?: string;
  category?: string;
  country?: string;
  children: React.ReactNode;
}

export function TrackedWhatsAppAnchor({
  source,
  sku,
  productName,
  category,
  country,
  onClick,
  children,
  ...props
}: TrackedWhatsAppAnchorProps) {
  return (
    <a
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        trackWhatsAppInquiry({ source, sku, productName, category, country });
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}

interface TrackedOemLinkProps extends React.ComponentProps<typeof Link> {
  source: string;
  productName?: string;
}

export function TrackedOemLink({
  source,
  productName,
  onClick,
  children,
  ...props
}: TrackedOemLinkProps) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        trackOemInquiry({ source, productName });
        onClick?.(e);
      }}
    >
      {children}
    </Link>
  );
}
