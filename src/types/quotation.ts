// Quotation Type Definitions

// Coating Process Types
export type CoatingType = 'Printing' | 'Varnish' | 'UV Plate' | 'Lamination' | 'Flute' | 'Die' | 'Single Window Pasting' | 'Single Side/4 Corner Pasting' | 'B2B Pasting';

// Printing specific types
export type PrintingType = 'Offset' | 'Digital' | 'Screen' | 'Flexo';
export type PrintColors = '1 Color' | '2 Colors' | '4 Colors CMYK' | '5 Colors' | '6 Colors';
export type PrintSide = 'Single Side' | 'Both Sides';

// UV Plating specific types
export type UVType = 'Spot UV' | 'Full UV' | '3D UV';
export type CoverageArea = '25%' | '50%' | '75%' | '100%';
export type ProcessSide = 'Front' | 'Back' | 'Both';

// Lamination specific types
export type LaminationType = 'Glossy' | 'Matte' | 'UV';
export type LaminationThickness = '18 Micron' | '25 Micron' | '30 Micron';

// Die specific types
export type DieType = 'Flat Die' | 'Rotary Die' | 'Laser Die';

// Varnish specific types
export type VarnishType = 'Gloss' | 'Matte' | 'Satin';

// Flute specific types
export type FluteType = 'Single Face' | 'Single Wall' | 'Double Wall';

// Pasting specific types
export type PastingType = 'Manual' | 'Automatic';

// Board types
export type BoardType = 'Duplex Board' | 'Art Card' | 'Kraft Board' | 'Grey Board' | 'Ivory Board' | 'Chrome Board';

// Process Data Interfaces

export interface PrintingData {
  printingType: PrintingType;
  colors: PrintColors;
  printSide: PrintSide;
  backside: 'Yes' | 'No';
  ratePer1000: number;
  totalPrintRate: number; // calculated: if backside=Yes, double the rate
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
  backside: 'Yes' | 'No';
  ratePer1000: number;
  totalLaminationRate: number; // calculated: if backside=Yes, double the rate
  totalCost: number; // calculated
}

export interface DieData {
  dieType: DieType;
  dieSize: string; // e.g., "100mm × 150mm"
  dieCharge: number; // one-time setup charge
  dieCutRatePer1000: number;
  totalCost: number; // calculated: dieCharge + ((qty/1000) × dieCutRatePer1000)
}

export interface VarnishData {
  varnishType: VarnishType;
  side: ProcessSide;
  ratePer1000: number;
  totalCost: number; // calculated
}

export interface UVPlateData {
  uvType: UVType;
  coverageArea: CoverageArea;
  side: ProcessSide;
  ratePer1000: number;
  totalCost: number; // calculated
}

export interface FluteData {
  fluteType: FluteType;
  gsm1: number;
  gsm1Rate: number;
  gsm2: number;
  gsm2Rate: number;
  ratePer1000: number; // Single Flute Rate
  totalFluteRate: number; // calculated: gsm1Rate + gsm2Rate + ratePer1000
  totalCost: number; // calculated
}

export interface PastingData {
  pastingType: PastingType;
  singleWindowPastingRate: number;
  totalWindowPastingRate: number; // calculated
  b2bPasting: 'Yes' | 'No';
  singleSideCornerPastingRate: number;
  totalPastingRate: number; // calculated: totalWindowPastingRate + singleSideCornerPastingRate
  totalCost: number; // calculated
}

// Union type for all process data
export type ProcessData = PrintingData | UVPlatingData | LaminationData | DieData | VarnishData | UVPlateData | FluteData | PastingData;

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
  backside: 'No',
  ratePer1000: 0,
  totalPrintRate: 0,
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
  backside: 'No',
  ratePer1000: 0,
  totalLaminationRate: 0,
  totalCost: 0,
});

export const createEmptyDieData = (): DieData => ({
  dieType: 'Flat Die',
  dieSize: '',
  dieCharge: 0,
  dieCutRatePer1000: 0,
  totalCost: 0,
});

export const createEmptyVarnishData = (): VarnishData => ({
  varnishType: 'Gloss',
  side: 'Front',
  ratePer1000: 0,
  totalCost: 0,
});

export const createEmptyUVPlateData = (): UVPlateData => ({
  uvType: 'Spot UV',
  coverageArea: '100%',
  side: 'Front',
  ratePer1000: 0,
  totalCost: 0,
});

export const createEmptyFluteData = (): FluteData => ({
  fluteType: 'Single Face',
  gsm1: 0,
  gsm1Rate: 0,
  gsm2: 0,
  gsm2Rate: 0,
  ratePer1000: 0,
  totalFluteRate: 0,
  totalCost: 0,
});

export const createEmptyPastingData = (): PastingData => ({
  pastingType: 'Manual',
  singleWindowPastingRate: 0,
  totalWindowPastingRate: 0,
  b2bPasting: 'No',
  singleSideCornerPastingRate: 0,
  totalPastingRate: 0,
  totalCost: 0,
});

// Helper to create empty process card
export const createProcessCard = (type: CoatingType, order: number): ProcessCard => {
  let data: ProcessData;

  switch (type) {
    case 'Printing':
      data = createEmptyPrintingData();
      break;
    case 'UV Plate':
      data = createEmptyUVPlateData();
      break;
    case 'Lamination':
      data = createEmptyLaminationData();
      break;
    case 'Die':
      data = createEmptyDieData();
      break;
    case 'Varnish':
      data = createEmptyVarnishData();
      break;
    case 'Flute':
      data = createEmptyFluteData();
      break;
    case 'Single Window Pasting':
    case 'Single Side/4 Corner Pasting':
    case 'B2B Pasting':
      data = createEmptyPastingData();
      break;
  }

  return {
    id: `${type.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
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
  return 'laminationType' in data && 'backside' in data;
};

export const isDieData = (data: ProcessData): data is DieData => {
  return 'dieType' in data && 'dieSize' in data && 'dieCharge' in data;
};

export const isVarnishData = (data: ProcessData): data is VarnishData => {
  return 'varnishType' in data;
};

export const isUVPlateData = (data: ProcessData): data is UVPlateData => {
  return 'uvType' in data && 'coverageArea' in data && !('colors' in data);
};

export const isFluteData = (data: ProcessData): data is FluteData => {
  return 'fluteType' in data;
};

export const isPastingData = (data: ProcessData): data is PastingData => {
  return 'pastingType' in data && 'singleWindowPastingRate' in data;
};
