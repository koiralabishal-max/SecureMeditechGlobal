'use client';

import React, { createContext, useContext } from 'react';
import { Product } from '@/types';

export interface RfqContextValue {
  openRfqModal: (options?: {
    product?: Product;
    quantity?: number;
    customNotes?: string;
    isOem?: boolean;
    defaultCountry?: string;
  }) => void;
  addProductToQuote: (product: Product, quantity?: number, customNotes?: string) => void;
}

const RfqContext = createContext<RfqContextValue | null>(null);

export function RfqProvider({
  value,
  children,
}: {
  value: RfqContextValue;
  children: React.ReactNode;
}) {
  return <RfqContext.Provider value={value}>{children}</RfqContext.Provider>;
}

export function useRfq(): RfqContextValue | null {
  return useContext(RfqContext);
}
