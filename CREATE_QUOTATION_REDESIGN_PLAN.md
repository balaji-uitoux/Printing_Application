# Create Quotation Form - Redesign Plan

## Overview
Redesign the Create Quotation form to include workflow-based coating process management with draggable cards representing the printing flow.

---

## Current vs New Structure

### Current Form Fields:
- Client, Contact Person, Email, Phone
- Product Type, Total Quantity, Description
- Currency, Tax Rate, Discount Type, Discount Value

### New Form Fields:

#### 1. Customer Information Card
- **Customer Name** (required)

#### 2. Item Details Card
- **Item Name** (required)
- **Size 1** (required) - Width/Length
- **Size 2** (required) - Height/Breadth
- **GSM** (required) - Grams per square meter
- **Board Type** (dropdown: Duplex, Art Card, Kraft, etc.)

#### 3. Pricing & Quantity Card
**Pricing:**
- **KG Rate** (required) - Rate per kilogram
- **Single Board Rate** (calculated) - Auto-calculated based on Size1, Size2, GSM, KG Rate

**Quantity:**
- **QTY** (required) - Total quantity needed
- **No of UPS** (required) - Number of units per sheet
- **No of Board Req** (calculated) - QTY / No of UPS
- **Waste QTY** (required) - Wastage quantity
- **Total Board Req** (calculated) - No of Board Req + Waste QTY
- **Total Board Rate** (calculated) - Total Board Req × Single Board Rate

#### 4. Workflow Process Section
- **Coating Type Multi-Select Dropdown**
  - Options: Printing, UV Plating, Lamination, Die
  - Multi-select enabled
- **Draggable Process Cards** (one for each selected coating type)
  - Reorderable via drag-and-drop
  - Each card has type-specific fields

---

## Calculation Formulas

### Single Board Rate
```typescript
// Formula: (Size1 × Size2 × GSM × KG Rate) / 1000000
const singleBoardRate = (size1 * size2 * gsm * kgRate) / 1000000;
```

### No of Board Required
```typescript
// Formula: QTY / No of UPS (rounded up)
const noOfBoardReq = Math.ceil(qty / noOfUps);
```

### Total Board Required
```typescript
// Formula: No of Board Req + Waste QTY
const totalBoardReq = noOfBoardReq + wasteQty;
```

### Total Board Rate
```typescript
// Formula: Total Board Req × Single Board Rate
const totalBoardRate = totalBoardReq * singleBoardRate;
```

---

## Coating Process Cards Design

### Card Structure
Each coating process card will have:
- **Card Header**: Type icon + name + drag handle + remove button
- **Card Body**: Type-specific fields
- **Card Footer**: Status indicator

### Coating Type Fields

#### 1. **Printing Card**
Fields:
- **Printing Type** (dropdown: Offset, Digital, Screen, Flexo)
- **Colors** (dropdown: 1 Color, 2 Colors, 4 Colors CMYK, 5 Colors, 6 Colors)
- **Print Side** (dropdown: Single Side, Both Sides)
- **Rate per 1000** (number input)
- **Total Printing Cost** (calculated: (QTY/1000) × Rate per 1000)

#### 2. **UV Plating Card**
Fields:
- **UV Type** (dropdown: Spot UV, Full UV, 3D UV)
- **Coverage Area** (dropdown: 25%, 50%, 75%, 100%)
- **Side** (dropdown: Front, Back, Both)
- **Rate per 1000** (number input)
- **Total UV Cost** (calculated: (QTY/1000) × Rate per 1000)

#### 3. **Lamination Card**
Fields:
- **Lamination Type** (dropdown: Glossy, Matte, Soft Touch, Velvet)
- **Thickness** (dropdown: 18 Micron, 25 Micron, 30 Micron)
- **Side** (dropdown: Front, Back, Both)
- **Rate per 1000** (number input)
- **Total Lamination Cost** (calculated: (QTY/1000) × Rate per 1000)

#### 4. **Die Card**
Fields:
- **Die Type** (dropdown: Flat Die, Rotary Die, Laser Die)
- **Die Size** (text input: e.g., "100mm × 150mm")
- **Die Charge** (number input: one-time setup charge)
- **Die Cut Rate per 1000** (number input)
- **Total Die Cost** (calculated: Die Charge + ((QTY/1000) × Die Cut Rate))

---

## UI/UX Design

### Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│                    CREATE QUOTATION                          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  LEFT SIDE (45%)                 │  RIGHT SIDE (55%)         │
│                                  │                            │
│  ┌─────────────────────────┐    │  ┌──────────────────────┐ │
│  │ Customer Information    │    │  │   Live Preview        │ │
│  │ • Customer Name         │    │  │                       │ │
│  └─────────────────────────┘    │  │   [Quotation PDF]    │ │
│                                  │  │                       │ │
│  ┌─────────────────────────┐    │  └──────────────────────┘ │
│  │ Item Details            │    │                            │
│  │ • Item Name             │    │                            │
│  │ • Size 1, Size 2        │    │                            │
│  │ • GSM, Board Type       │    │                            │
│  └─────────────────────────┘    │                            │
│                                  │                            │
│  ┌─────────────────────────┐    │                            │
│  │ Pricing & Quantity      │    │                            │
│  │ • KG Rate               │    │                            │
│  │ • Single Board Rate ✓   │    │                            │
│  │ • QTY, No of UPS        │    │                            │
│  │ • Calculations... ✓     │    │                            │
│  └─────────────────────────┘    │                            │
│                                  │                            │
│  ┌─────────────────────────┐    │                            │
│  │ Coating Type            │    │                            │
│  │ [Multi-select dropdown] │    │                            │
│  └─────────────────────────┘    │                            │
│                                  │                            │
│  ┌─────────────────────────┐    │                            │
│  │ Workflow Process        │    │                            │
│  │                         │    │                            │
│  │  ═══ Drag Handle ═══    │    │                            │
│  │  🖨️ PRINTING           │    │                            │
│  │  [Fields...]            │    │                            │
│  │  ────────────────────   │    │                            │
│  │                         │    │                            │
│  │  ═══ Drag Handle ═══    │    │                            │
│  │  ✨ UV PLATING         │    │                            │
│  │  [Fields...]            │    │                            │
│  │  ────────────────────   │    │                            │
│  │                         │    │                            │
│  │  ═══ Drag Handle ═══    │    │                            │
│  │  📋 LAMINATION         │    │                            │
│  │  [Fields...]            │    │                            │
│  │                         │    │                            │
│  └─────────────────────────┘    │                            │
│                                  │                            │
└─────────────────────────────────────────────────────────────┘
```

### Drag-and-Drop Behavior
- **Grab**: Click and hold on card header drag handle
- **Drag**: Move card up/down to reorder
- **Drop**: Release to place in new position
- **Visual Feedback**:
  - Card being dragged has elevated shadow
  - Drop zone shows placeholder/highlight
  - Smooth animations during reorder

### Visual Workflow Indicators
- Arrow connectors between cards showing flow direction
- Process number badges (1, 2, 3, 4) on each card
- Color-coded borders for each process type

---

## Component Structure

### New/Modified Components

```
src/
├── pages/
│   └── CreateQuotation/
│       └── index.tsx (MODIFIED - new form structure)
│
├── components/
│   └── quotation/
│       ├── CoatingProcessCard.tsx (NEW)
│       ├── ProcessCardDragContainer.tsx (NEW)
│       ├── CustomerInfoSection.tsx (NEW)
│       ├── ItemDetailsSection.tsx (NEW)
│       ├── PricingQuantitySection.tsx (NEW)
│       └── WorkflowProcessSection.tsx (NEW)
│
├── hooks/
│   ├── useQuotationCalculations.ts (NEW)
│   └── useProcessCardsDragDrop.ts (NEW)
│
└── types/
    └── quotation.ts (MODIFIED - new interfaces)
```

---

## Type Definitions

```typescript
// Coating Process Types
export type CoatingType = 'Printing' | 'UV Plating' | 'Lamination' | 'Die';

// Base Process Card Interface
export interface ProcessCard {
  id: string;
  type: CoatingType;
  order: number;
  data: PrintingData | UVPlatingData | LaminationData | DieData;
}

// Specific Process Data Interfaces
export interface PrintingData {
  printingType: 'Offset' | 'Digital' | 'Screen' | 'Flexo';
  colors: string;
  printSide: 'Single Side' | 'Both Sides';
  ratePer1000: number;
  totalCost: number;
}

export interface UVPlatingData {
  uvType: 'Spot UV' | 'Full UV' | '3D UV';
  coverageArea: '25%' | '50%' | '75%' | '100%';
  side: 'Front' | 'Back' | 'Both';
  ratePer1000: number;
  totalCost: number;
}

export interface LaminationData {
  laminationType: 'Glossy' | 'Matte' | 'Soft Touch' | 'Velvet';
  thickness: '18 Micron' | '25 Micron' | '30 Micron';
  side: 'Front' | 'Back' | 'Both';
  ratePer1000: number;
  totalCost: number;
}

export interface DieData {
  dieType: 'Flat Die' | 'Rotary Die' | 'Laser Die';
  dieSize: string;
  dieCharge: number;
  dieCutRatePer1000: number;
  totalCost: number;
}

// Main Quotation Form Data
export interface QuotationFormData {
  // Customer Info
  customerName: string;

  // Item Details
  itemName: string;
  size1: number;
  size2: number;
  gsm: number;
  boardType: string;

  // Pricing
  kgRate: number;
  singleBoardRate: number; // calculated

  // Quantity
  qty: number;
  noOfUps: number;
  noOfBoardReq: number; // calculated
  wasteQty: number;
  totalBoardReq: number; // calculated
  totalBoardRate: number; // calculated

  // Workflow
  selectedCoatingTypes: CoatingType[];
  processCards: ProcessCard[];
}
```

---

## Implementation Steps

### Phase 1: Setup & Structure (Day 1)
1. ✅ Install react-beautiful-dnd: `npm install react-beautiful-dnd @types/react-beautiful-dnd`
2. Create new type definitions in `/src/types/quotation.ts`
3. Create new hook files for calculations and drag-drop
4. Create component file structure

### Phase 2: Form Sections (Day 1-2)
1. Create CustomerInfoSection component
2. Create ItemDetailsSection component
3. Create PricingQuantitySection component
4. Implement calculation logic hook
5. Wire up state management

### Phase 3: Process Cards (Day 2-3)
1. Create CoatingProcessCard base component
2. Implement type-specific field rendering
3. Create ProcessCardDragContainer
4. Implement drag-and-drop with react-beautiful-dnd
5. Add visual indicators (arrows, numbers)

### Phase 4: Integration (Day 3)
1. Update CreateQuotation page with new structure
2. Add multi-select dropdown for coating types
3. Wire up all calculations
4. Test form validation

### Phase 5: Preview & Polish (Day 4)
1. Update preview section with new data structure
2. Add workflow visualization in preview
3. Polish UI/UX (animations, transitions)
4. Final testing

---

## Libraries Required

```bash
npm install react-beautiful-dnd @types/react-beautiful-dnd
```

**react-beautiful-dnd**: Beautiful and accessible drag-and-drop for lists with React

---

## Testing Checklist

### Calculations
- [ ] Single Board Rate calculates correctly
- [ ] No of Board Req rounds up properly
- [ ] Total Board Req includes waste
- [ ] Total Board Rate calculates correctly
- [ ] Process card totals calculate correctly

### Drag-and-Drop
- [ ] Cards can be reordered
- [ ] Order persists correctly
- [ ] Visual feedback works
- [ ] Process numbers update after reorder

### Validation
- [ ] Required fields show errors
- [ ] Cannot submit without required fields
- [ ] Calculated fields update in real-time
- [ ] Multi-select works correctly

### Preview
- [ ] All data reflects in preview
- [ ] Workflow order shows correctly
- [ ] Calculations display properly

---

## Visual Design Notes

### Card Styling
```typescript
// Process Card Colors
const PROCESS_COLORS = {
  Printing: {
    border: '#3B82F6',      // Blue
    bg: 'rgba(59, 130, 246, 0.05)',
    icon: '🖨️'
  },
  'UV Plating': {
    border: '#8B5CF6',      // Purple
    bg: 'rgba(139, 92, 246, 0.05)',
    icon: '✨'
  },
  Lamination: {
    border: '#10B981',      // Green
    bg: 'rgba(16, 185, 129, 0.05)',
    icon: '📋'
  },
  Die: {
    border: '#F59E0B',      // Amber
    bg: 'rgba(245, 158, 11, 0.05)',
    icon: '✂️'
  }
};
```

### Drag Handle Design
```
═══════════════════
  ⋮⋮  DRAG HERE  ⋮⋮
═══════════════════
```

---

## Questions for Confirmation

1. **Board Type Options**: What specific board types should be in the dropdown?
   - Suggested: Duplex Board, Art Card, Kraft Board, Grey Board, Ivory Board

2. **Unit of Measurement**:
   - Size 1 & Size 2: inches or mm?
   - Suggested: mm for precision

3. **Additional Fields**: Are there any other fields needed for each coating type?

4. **Preview Layout**: Should the preview show the workflow visually as well?

5. **Save Draft**: Should we add ability to save quotations as draft?

---

**Ready to proceed with implementation?** Please confirm:
- Are the calculations correct?
- Are the coating type fields appropriate?
- Any additional requirements?
