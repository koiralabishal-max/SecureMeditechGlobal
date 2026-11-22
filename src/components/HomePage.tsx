'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Product, ProductCategory, QuoteItem, RfqFormData } from '../types';
import { TopBar } from './TopBar';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { ProductCatalog } from './ProductCatalog';
import { HomeCapabilitiesOverview } from './HomeCapabilitiesOverview';
import { SocialProof } from './SocialProof';
import { HomeProcurementCta } from './HomeProcurementCta';
import { Footer } from './Footer';
import { MobileContactBar } from './MobileContactBar';
import { Toast } from './Toast';
import { trackBulkQuoteRequest, trackOemInquiry } from '@/lib/analytics';

const RfqModal = dynamic(() => import('./RfqModal').then((m) => m.RfqModal), { ssr: false });
const SpecSheetModal = dynamic(() => import('./SpecSheetModal').then((m) => m.SpecSheetModal), { ssr: false });
const ProductDetailModal = dynamic(() => import('./ProductDetailModal').then((m) => m.ProductDetailModal), { ssr: false });
const ChatBot = dynamic(() => import('./ChatBot').then((m) => m.ChatBot), { ssr: false });
const FloatingPriceCalculatorWidget = dynamic(
  () => import('./FloatingPriceCalculatorWidget').then((m) => m.FloatingPriceCalculatorWidget),
  { ssr: false }
);

export function HomePage() {
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [activeSpecSheet, setActiveSpecSheet] = useState<Product | null>(null);
  const [activeProductDetail, setActiveProductDetail] = useState<Product | null>(null);
  const [isRfqModalOpen, setIsRfqModalOpen] = useState(false);
  const [rfqDefaultBusinessType, setRfqDefaultBusinessType] = useState<RfqFormData['businessType'] | undefined>(undefined);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  };

  const handleAddToQuote = (product: Product, quantity = 500) => {
    trackBulkQuoteRequest({
      stage: 'add_item',
      sku: product.sku,
      productName: product.name,
      totalUnits: quantity,
    });
    setQuoteItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        showToast(`Updated quantity for ${product.name} in your RFQ`);
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 200 }
            : item
        );
      }
      showToast(`Added ${product.name} to RFQ basket`);
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setQuoteItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setQuoteItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from quotation request');
  };

  const handleClearQuote = () => {
    setQuoteItems([]);
  };

  const handleExploreCatalog = () => {
    const el = document.getElementById('products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRequestBulkRfq = () => {
    setRfqDefaultBusinessType(undefined);
    setIsRfqModalOpen(true);
  };

  const handleStartOemInquiry = () => {
    trackOemInquiry({ source: 'homepage_oem_section' });
    setRfqDefaultBusinessType('OEM / Brand Partner');
    setIsRfqModalOpen(true);
  };

  const handleSelectCategory = (category: ProductCategory) => {
    setSelectedCategory(category);
    const el = document.getElementById('products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTransferFromCalculator = (product: Product, quantity: number, notes: string) => {
    setQuoteItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity, customNotes: notes }
            : item
        );
      }
      return [...prev, { product, quantity, customNotes: notes }];
    });
    setIsRfqModalOpen(true);
    showToast(`Transferred ${quantity.toLocaleString()} units of ${product.name} to RFQ`);
  };

  const quoteItemIds = quoteItems.map((item) => item.product.id);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8FA] text-slate-800 selection:bg-[#4C7A9C]/20 selection:text-[#223752]">
      <TopBar />

      <Navbar
        onOpenRfq={() => setIsRfqModalOpen(true)}
        quoteCount={quoteItems.length}
        onSelectCategory={handleSelectCategory}
      />

      <main className="flex-1">
        <Hero
          onExploreCatalog={handleExploreCatalog}
          onRequestBulkRfq={handleRequestBulkRfq}
        />

        <ProductCatalog
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onAddToQuote={handleAddToQuote}
          onOpenSpecSheet={(prod) => setActiveSpecSheet(prod)}
          onOpenDetails={(prod) => setActiveProductDetail(prod)}
          quoteItemIds={quoteItemIds}
          featuredOnly
        />

        <HomeCapabilitiesOverview onStartOemInquiry={handleStartOemInquiry} />

        <SocialProof />

        <HomeProcurementCta onOpenRfq={handleRequestBulkRfq} />
      </main>

      <Footer />

      <FloatingPriceCalculatorWidget onTransferToRfq={handleTransferFromCalculator} />

      <ChatBot
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen((prev) => !prev)}
        onOpenRfq={handleRequestBulkRfq}
      />

      {isRfqModalOpen && (
        <RfqModal
          isOpen={isRfqModalOpen}
          onClose={() => setIsRfqModalOpen(false)}
          quoteItems={quoteItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearQuote={handleClearQuote}
          defaultBusinessType={rfqDefaultBusinessType}
        />
      )}

      {activeSpecSheet && (
        <SpecSheetModal
          product={activeSpecSheet}
          onClose={() => setActiveSpecSheet(null)}
          onAddToQuote={handleAddToQuote}
        />
      )}

      {activeProductDetail && (
        <ProductDetailModal
          product={activeProductDetail}
          onClose={() => setActiveProductDetail(null)}
          onAddToQuote={handleAddToQuote}
          onOpenSpecSheet={(prod) => setActiveSpecSheet(prod)}
          isInQuote={quoteItemIds.includes(activeProductDetail.id)}
        />
      )}

      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />

      <MobileContactBar onOpenQuote={handleRequestBulkRfq} />
    </div>
  );
}
