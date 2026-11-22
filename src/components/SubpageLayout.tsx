'use client';

import React, { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import { TopBar } from './TopBar';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Toast } from './Toast';
import { RfqProvider } from './RfqContext';
import { MobileContactBar } from './MobileContactBar';
import { Product, QuoteItem, RfqFormData } from '../types';
import { trackBulkQuoteRequest } from '@/lib/analytics';

const RfqModal = dynamic(() => import('./RfqModal').then((m) => m.RfqModal), {
  ssr: false,
});

interface SubpageLayoutProps {
  children: React.ReactNode;
}

export const SubpageLayout: React.FC<SubpageLayoutProps> = ({ children }) => {
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);
  const [isRfqModalOpen, setIsRfqModalOpen] = useState(false);
  const [defaultBusinessType, setDefaultBusinessType] = useState<RfqFormData['businessType'] | undefined>(undefined);
  const [defaultCountry, setDefaultCountry] = useState<string | undefined>(undefined);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  }, []);

  const addProductToQuote = useCallback(
    (product: Product, quantity = 500, customNotes?: string) => {
      trackBulkQuoteRequest({
        stage: 'add_item',
        sku: product.sku,
        productName: product.name,
        totalUnits: quantity,
      });
      setQuoteItems((prev) => {
        const existing = prev.find((item) => item.product.id === product.id);
        if (existing) {
          return prev.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity, ...(customNotes ? { customNotes } : {}) }
              : item
          );
        }
        return [...prev, { product, quantity, ...(customNotes ? { customNotes } : {}) }];
      });
      showToast(`Added ${product.name} (${product.sku}) to RFQ basket`);
    },
    [showToast]
  );

  const openRfqModal = useCallback(
    (options?: {
      product?: Product;
      quantity?: number;
      customNotes?: string;
      isOem?: boolean;
      defaultCountry?: string;
    }) => {
      if (options?.product) {
        addProductToQuote(options.product, options.quantity || 500, options.customNotes);
      }
      setDefaultBusinessType(options?.isOem ? 'OEM / Brand Partner' : undefined);
      setDefaultCountry(options?.defaultCountry);
      setIsRfqModalOpen(true);
    },
    [addProductToQuote]
  );

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setQuoteItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (productId: string) => {
    setQuoteItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from quotation request');
  };

  const handleTransferFromCalculator = (product: Product, quantity: number, notes: string) => {
    setQuoteItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity, customNotes: notes } : item
        );
      }
      return [...prev, { product, quantity, customNotes: notes }];
    });
    setIsRfqModalOpen(true);
    showToast(`Transferred ${quantity.toLocaleString()} units of ${product.name} to RFQ`);
  };

  return (
    <RfqProvider value={{ openRfqModal, addProductToQuote }}>
      <div className="min-h-screen flex flex-col bg-[#F7F8FA] text-slate-800 selection:bg-[#4C7A9C]/20 selection:text-[#223752]">
        <TopBar />
        <Navbar
          onOpenRfq={() => setIsRfqModalOpen(true)}
          quoteCount={quoteItems.length}
        />
        <main className="flex-1">{children}</main>
        <Footer onTransferToRfq={handleTransferFromCalculator} />
        {isRfqModalOpen && (
          <RfqModal
            isOpen={isRfqModalOpen}
            onClose={() => setIsRfqModalOpen(false)}
            quoteItems={quoteItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearQuote={() => setQuoteItems([])}
            defaultBusinessType={defaultBusinessType}
            defaultCountry={defaultCountry}
          />
        )}
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
        <MobileContactBar onOpenQuote={() => openRfqModal()} />
      </div>
    </RfqProvider>
  );
};
