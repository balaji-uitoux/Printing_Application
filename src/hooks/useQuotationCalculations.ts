import { useMemo } from 'react';
import type { ProcessCard, ProcessData } from '../types/quotation';
import { isPrintingData, isUVPlatingData, isLaminationData, isDieData } from '../types/quotation';

interface CalculationInputs {
  // Item dimensions and material
  size1: number; // mm
  size2: number; // mm
  gsm: number;
  kgRate: number;

  // Quantity
  qty: number;
  noOfUps: number;
  wasteQty: number;

  // Process cards
  processCards: ProcessCard[];

  // Pricing
  taxRate: number; // percentage
  discountType: 'none' | 'percentage' | 'fixed';
  discountValue: number;
}

interface CalculationResults {
  // Board calculations
  singleBoardRate: number;
  noOfBoardReq: number;
  totalBoardReq: number;
  totalBoardRate: number;

  // Process costs
  totalProcessCost: number;

  // Final totals
  subtotal: number;
  tax: number;
  discount: number;
  grandTotal: number;
}

/**
 * Custom hook for quotation calculations
 * Handles all automatic calculations based on form inputs
 */
export const useQuotationCalculations = (inputs: CalculationInputs): CalculationResults => {
  // Calculate Single Board Rate
  // Formula: (Size1 × Size2 × GSM × KG Rate) / 1000000
  const singleBoardRate = useMemo(() => {
    const { size1, size2, gsm, kgRate } = inputs;
    if (!size1 || !size2 || !gsm || !kgRate) return 0;

    return (size1 * size2 * gsm * kgRate) / 1000000;
  }, [inputs.size1, inputs.size2, inputs.gsm, inputs.kgRate]);

  // Calculate No of Board Required
  // Formula: ceil(QTY / No of UPS)
  const noOfBoardReq = useMemo(() => {
    const { qty, noOfUps } = inputs;
    if (!qty || !noOfUps) return 0;

    return Math.ceil(qty / noOfUps);
  }, [inputs.qty, inputs.noOfUps]);

  // Calculate Total Board Required
  // Formula: No of Board Req + Waste QTY
  const totalBoardReq = useMemo(() => {
    return noOfBoardReq + (inputs.wasteQty || 0);
  }, [noOfBoardReq, inputs.wasteQty]);

  // Calculate Total Board Rate
  // Formula: Total Board Req × Single Board Rate
  const totalBoardRate = useMemo(() => {
    return totalBoardReq * singleBoardRate;
  }, [totalBoardReq, singleBoardRate]);

  // Calculate individual process costs
  const processCardsWithCosts = useMemo(() => {
    return inputs.processCards.map((card) => {
      const updatedCard = { ...card };
      const { qty } = inputs;

      if (!qty) return updatedCard;

      const data = { ...card.data };

      // Calculate cost based on process type
      if (isPrintingData(data)) {
        // Printing: (QTY/1000) × Rate per 1000
        data.totalCost = (qty / 1000) * data.ratePer1000;
      } else if (isUVPlatingData(data)) {
        // UV Plating: (QTY/1000) × Rate per 1000
        data.totalCost = (qty / 1000) * data.ratePer1000;
      } else if (isLaminationData(data)) {
        // Lamination: (QTY/1000) × Rate per 1000
        data.totalCost = (qty / 1000) * data.ratePer1000;
      } else if (isDieData(data)) {
        // Die: Die Charge + ((QTY/1000) × Die Cut Rate per 1000)
        data.totalCost = data.dieCharge + ((qty / 1000) * data.dieCutRatePer1000);
      }

      updatedCard.data = data;
      return updatedCard;
    });
  }, [inputs.processCards, inputs.qty]);

  // Calculate Total Process Cost (sum of all process costs)
  const totalProcessCost = useMemo(() => {
    return processCardsWithCosts.reduce((sum, card) => {
      return sum + (card.data.totalCost || 0);
    }, 0);
  }, [processCardsWithCosts]);

  // Calculate Subtotal
  // Formula: Total Board Rate + Total Process Cost
  const subtotal = useMemo(() => {
    return totalBoardRate + totalProcessCost;
  }, [totalBoardRate, totalProcessCost]);

  // Calculate Tax
  // Formula: (Subtotal × Tax Rate) / 100
  const tax = useMemo(() => {
    const { taxRate } = inputs;
    if (!taxRate) return 0;

    return (subtotal * taxRate) / 100;
  }, [subtotal, inputs.taxRate]);

  // Calculate Discount
  const discount = useMemo(() => {
    const { discountType, discountValue } = inputs;

    if (discountType === 'none' || !discountValue) return 0;

    if (discountType === 'percentage') {
      // Percentage discount: (Subtotal × Discount Value) / 100
      return (subtotal * discountValue) / 100;
    } else {
      // Fixed discount: Discount Value
      return discountValue;
    }
  }, [subtotal, inputs.discountType, inputs.discountValue]);

  // Calculate Grand Total
  // Formula: Subtotal + Tax - Discount
  const grandTotal = useMemo(() => {
    return subtotal + tax - discount;
  }, [subtotal, tax, discount]);

  return {
    singleBoardRate: Number(singleBoardRate.toFixed(2)),
    noOfBoardReq,
    totalBoardReq,
    totalBoardRate: Number(totalBoardRate.toFixed(2)),
    totalProcessCost: Number(totalProcessCost.toFixed(2)),
    subtotal: Number(subtotal.toFixed(2)),
    tax: Number(tax.toFixed(2)),
    discount: Number(discount.toFixed(2)),
    grandTotal: Number(grandTotal.toFixed(2)),
  };
};

/**
 * Helper function to calculate process cost independently
 * Useful for real-time updates in process cards
 */
export const calculateProcessCost = (
  processType: string,
  data: ProcessData,
  qty: number
): number => {
  if (!qty) return 0;

  if (isPrintingData(data)) {
    return (qty / 1000) * data.ratePer1000;
  } else if (isUVPlatingData(data)) {
    return (qty / 1000) * data.ratePer1000;
  } else if (isLaminationData(data)) {
    return (qty / 1000) * data.ratePer1000;
  } else if (isDieData(data)) {
    return data.dieCharge + ((qty / 1000) * data.dieCutRatePer1000);
  }

  return 0;
};
