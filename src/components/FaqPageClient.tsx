'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { FaqSection } from './FaqSection';
import { useRfq } from './RfqContext';

const ChatBot = dynamic(() => import('./ChatBot').then((m) => m.ChatBot), { ssr: false });

export function FaqPageClient() {
  const { openRfqModal } = useRfq();
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <FaqSection
        onOpenChat={() => setIsChatOpen(true)}
        onOpenRfq={() => openRfqModal()}
      />
      <ChatBot
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen((prev) => !prev)}
        onOpenRfq={() => openRfqModal()}
      />
    </>
  );
}
