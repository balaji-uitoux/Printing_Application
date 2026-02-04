// Quotation Type Definitions

// Coating Process Types
export type CoatingType = 'Printing' | 'UV Plating' | 'Lamination' | 'Die';

// Printing specific types
export type PrintingType = 'Offset' | 'Digital' | 'Screen' | 'Flexo';
export type PrintColors = '1 Color' | '2 Colors' | '4 Colors CMYK' | '5 Colors' | '6 Colors';
export type PrintSide = 'Single Side' | 'Both Sides';

// UV Plating specific types
export type UVType = 'Spot UV' | 'Full UV' | '3D UV';
export type CoverageArea = '25%' | '50%' | '75%' | '100%';
export type ProcessSide = 'Front' | 'Back' | 'Both';

// Lamination specific types
export type LaminationType = 'Glossy' | 'Matte' | 'Soft Touch' | 'Velvet';
export type LaminationThickness = '18 Micron' | '25 Micron' | '30 Micron';

// Die specific types
export type DieType = 'Flat Die' | 'Rotary Die' | 'Laser Die';

// Board types
export type BoardType = 'Duplex Board' | 'Art Card' | 'Kraft Board' | 'Grey Board' | 'Ivory Board' | 'Chrome Board';

// Process Data Interfaces

export interface PrintingData {
  printingType: PrintingType;
  colors: PrintColors;
  printSide: PrintSide;
  ratePer1000: number;
  totalCost: number; // calculated
}

export interface UVPlatingData {
  uvType: UVType;
  coverageArea: CoverageArea;
  side: ProcessSide;
  ratePer1000: number;
  totalCost: number; // calculated
}

export interface LaminationData {
  laminationType: LaminationType;
  thickness: LaminationThickness;
  side: ProcessSide;
  ratePer1000: number;
  totalCost: number; // calculated
}

export interface DieData {
  dieType: DieType;
  dieSize: string; // e.g., "100mm × 150mm"
  dieCharge: number; // one-time setup charge
  dieCutRatePer1000: number;
  totalCost: number; // calculated: dieCharge + ((qty/1000) × dieCutRatePer1000)
}

// Union type for all process data
export type ProcessData = PrintingData | UVPlatingData | LaminationData | DieData;

// Process Card Interface
export interface ProcessCard {
  id: string;
  type: CoatingType;
  order: number;
  data: ProcessData;
}

// Main Quotation Form Data
export interface QuotationFormData {
  // Customer Information
  customerName: string;

  // Item Details
  itemName: string;
  size1: number; // Width/Length in mm
  size2: number; // Height/Breadth in mm
  gsm: number; // Grams per square meter
  boardType: BoardType;

  // Pricing (some fields auto-filled from enquiry)
  kgRate: number;
  singleBoardRate: number; // calculated: (size1 × size2 × gsm × kgRate) / 1000000

  // Quantity (some fields auto-filled from enquiry)
  qty: number;
  noOfUps: number; // Number of units per sheet
  noOfBoardReq: number; // calculated: ceil(qty / noOfUps)
  wasteQty: number;
  totalBoardReq: number; // calculated: noOfBoardReq + wasteQty
  totalBoardRate: number; // calculated: totalBoardReq × singleBoardRate

  // Workflow
  selectedCoatingTypes: CoatingType[];
  processCards: ProcessCard[];

  // Final totals
  subtotal: number; // calculated: totalBoardRate + sum of all process costs
  tax: number; // calculated based on tax rate
  discount: number; // calculated based on discount type and value
  grandTotal: number; // calculated: subtotal + tax - discount
}

// Helper interface for enquiry data mapping
export interface EnquiryDataForQuotation {
  customerName: string;
  itemName?: string;
  productType?: string;
  quantity: number;
  // Additional fields that can be mapped
  description?: string;
}

// Initial empty data generators
export const createEmptyPrintingData = (): PrintingData => ({
  printingType: 'Offset',
  colors: '4 Colors CMYK',
  printSide: 'Single Side',
  ratePer1000: 0,
  totalCost: 0,
});

export const createEmptyUVPlatingData = (): UVPlatingData => ({
  uvType: 'Spot UV',
  coverageArea: '100%',
  side: 'Front',
  ratePer1000: 0,
  totalCost: 0,
});

export const createEmptyLaminationData = (): LaminationData => ({
  laminationType: 'Glossy',
  thickness: '25 Micron',
  side: 'Front',
  ratePer1000: 0,
  totalCost: 0,
});

export const createEmptyDieData = (): DieData => ({
  dieType: 'Flat Die',
  dieSize: '',
  dieCharge: 0,
  dieCutRatePer1000: 0,
  totalCost: 0,
});

// Helper to create empty process card
export const createProcessCard = (type: CoatingType, order: number): ProcessCard => {
  let data: ProcessData;

  switch (type) {
    case 'Printing':
      data = createEmptyPrintingData();
      break;
    case 'UV Plating':
      data = createEmptyUVPlatingData();
      break;
    case 'Lamination':
      data = createEmptyLaminationData();
      break;
    case 'Die':
      data = createEmptyDieData();
      break;
  }

  return {
    id: `${type.toLowerCase().replace(' ', '-')}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type,
    order,
    data,
  };
};

// Type guard functions
export const isPrintingData = (data: ProcessData): data is PrintingData => {
  return 'printingType' in data && 'colors' in data && 'printSide' in data;
};

export const isUVPlatingData = (data: ProcessData): data is UVPlatingData => {
  return 'uvType' in data && 'coverageArea' in data;
};

export const isLaminationData = (data: ProcessData): data is LaminationData => {
  return 'laminationType' in data && 'thickness' in data;
};

export const isDieData = (data: ProcessData): data is DieData => {
  return 'dieType' in data && 'dieSize' in data && 'dieCharge' in data;
};
