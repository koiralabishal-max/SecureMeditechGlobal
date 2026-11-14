'use client';

import React, { useState } from 'react';
import { TopBar } from './TopBar';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { RfqModal } from './RfqModal';
import { Toast } from './Toast';
import { Product, QuoteItem } from '../types';

interface SubpageLayoutProps {
  children: React.ReactNode;
}

export const SubpageLayout: React.FC<SubpageLayoutProps> = ({ children }) => {
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);
  const [isRfqModalOpen, setIsRfqModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  };

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
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800 selection:bg-[#38B6FF]/20 selection:text-[#0B2F63]">
      <TopBar />
      <Navbar
        onOpenRfq={() => setIsRfqModalOpen(true)}
        quoteCount={quoteItems.length}
      />
      <main className="flex-1">{children}</main>
      <Footer onTransferToRfq={handleTransferFromCalculator} />
      <RfqModal
        isOpen={isRfqModalOpen}
        onClose={() => setIsRfqModalOpen(false)}
        quoteItems={quoteItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearQuote={() => setQuoteItems([])}
      />
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
};
