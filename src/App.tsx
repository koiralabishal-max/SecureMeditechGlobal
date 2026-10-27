/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Product, ProductCategory, QuoteItem } from './types';
import { PRODUCTS } from './data/products';
import { TopBar } from './components/TopBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { OemSection } from './components/OemSection';
import { QualityComplianceSection } from './components/QualityComplianceSection';
import { FaqSection } from './components/FaqSection';
import { SocialProof } from './components/SocialProof';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { RfqModal } from './components/RfqModal';
import { SpecSheetModal } from './components/SpecSheetModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ChatBot } from './components/ChatBot';
import { Toast } from './components/Toast';

export default function App() {
  // Pre-populate with the 3-Ball Incentive Spirometer to showcase live RFQ badge
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([
    {
      product: PRODUCTS[0],
      quantity: 500,
      customNotes: 'Standard sterile packaging'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [activeSpecSheet, setActiveSpecSheet] = useState<Product | null>(null);
  const [activeProductDetail, setActiveProductDetail] = useState<Product | null>(null);
  const [isRfqModalOpen, setIsRfqModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  };

  const handleAddToQuote = (product: Product, quantity = 500) => {
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
    setIsRfqModalOpen(true);
  };

  const handleStartOemInquiry = () => {
    setIsRfqModalOpen(true);
  };

  const handleSelectCategory = (category: ProductCategory) => {
    setSelectedCategory(category);
    const el = document.getElementById('products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quoteItemIds = quoteItems.map((item) => item.product.id);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800 selection:bg-[#38B6FF]/20 selection:text-[#0B2F63]">
      
      {/* 1. Top Announcement / Utility Bar */}
      <TopBar />

      {/* 2. Sticky Navigation Bar */}
      <Navbar
        onOpenRfq={() => setIsRfqModalOpen(true)}
        quoteCount={quoteItems.length}
        onSelectCategory={handleSelectCategory}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 3. Hero Section */}
        <Hero
          onExploreCatalog={handleExploreCatalog}
          onRequestBulkRfq={handleRequestBulkRfq}
        />

        {/* 4. Interactive Product Showcase Grid */}
        <ProductCatalog
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onAddToQuote={handleAddToQuote}
          onOpenSpecSheet={(prod) => setActiveSpecSheet(prod)}
          onOpenDetails={(prod) => setActiveProductDetail(prod)}
          quoteItemIds={quoteItemIds}
        />

        {/* 5. B2B OEM & Contract Manufacturing Section */}
        <OemSection onStartOemInquiry={handleStartOemInquiry} />

        {/* 6. Quality & Regulatory Compliance Section */}
        <QualityComplianceSection />

        {/* 7. Comprehensive FAQ: Lead Times, International Shipping, OEM Minimums */}
        <FaqSection
          onOpenChat={() => setIsChatOpen(true)}
          onOpenRfq={() => setIsRfqModalOpen(true)}
        />

        {/* 8. Social Proof & Case Studies */}
        <SocialProof />

        {/* 9. Direct Contact & Logistics Inquiries */}
        <ContactSection />
      </main>

      {/* 10. Comprehensive Footer */}
      <Footer />

      {/* AI Procurement Specialist Multi-turn Chatbot */}
      <ChatBot
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen((prev) => !prev)}
        onOpenRfq={handleRequestBulkRfq}
      />

      {/* Modals & Overlays */}
      <RfqModal
        isOpen={isRfqModalOpen}
        onClose={() => setIsRfqModalOpen(false)}
        quoteItems={quoteItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearQuote={handleClearQuote}
      />

      <SpecSheetModal
        product={activeSpecSheet}
        onClose={() => setActiveSpecSheet(null)}
        onAddToQuote={handleAddToQuote}
      />

      <ProductDetailModal
        product={activeProductDetail}
        onClose={() => setActiveProductDetail(null)}
        onAddToQuote={handleAddToQuote}
        onOpenSpecSheet={(prod) => setActiveSpecSheet(prod)}
        isInQuote={activeProductDetail ? quoteItemIds.includes(activeProductDetail.id) : false}
      />

      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />

    </div>
  );
}
