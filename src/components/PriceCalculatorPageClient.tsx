'use client';

import React from 'react';
import { PriceEstimationCalculator } from './PriceEstimationCalculator';
import { useRfq } from './RfqContext';

export function PriceCalculatorPageClient() {
  const rfq = useRfq();

  return (
    <PriceEstimationCalculator
      onTransferToRfq={(product, quantity, notes) => {
        rfq?.openRfqModal({ product, quantity, customNotes: notes });
      }}
    />
  );
}
