/**
 * Entity Type Definitions
 *
 * All entity interfaces for the application
 */

import type {
  BaseEntity,
  Status,
  MachineStatus,
  AssetStatus,
  EnquiryStatus,
  QuotationStatus,
  OrderStatus,
  Currency,
  DiscountType,
  ProductCategory,
  MachineType,
  DieType,
  PlateType,
  BoardType,
  Unit,
  RejectionSeverity,
} from './common';

// Client/Customer Entity
export interface Client extends BaseEntity {
  code: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  city: string;
  gstNumber: string;
  address?: string;
  outstandingAmount?: number;
  status: Status;
}

// Product Entity
export interface Product extends BaseEntity {
  code: string;
  name: string;
  category: ProductCategory | string;
  description: string;
  unit: Unit | string;
  basePrice: number;
  status: Status;
}

// Machine Entity
export interface Machine extends BaseEntity {
  code: string;
  name: string;
  type: MachineType | string;
  location: string;
  capacity?: number;
  currentLoad?: number;
  utilization?: number;
  status: MachineStatus;
}

// Board Entity
export interface Board extends BaseEntity {
  code: string;
  name: string;
  type: BoardType | string;
  gsm: number;
  size: string;
  supplier: string;
  costPerSheet: number;
  status: Status;
}

// Die Entity
export interface Die extends BaseEntity {
  code: string;
  name: string;
  type: DieType;
  size: string;
  maxUsage: number;
  currentUsage?: number;
  description?: string;
  status: AssetStatus;
}

// Plate Entity
export interface Plate extends BaseEntity {
  code: string;
  name: string;
  type: PlateType;
  size: string;
  thickness: string;
  supplier: string;
  purchaseDate: Date | string;
  maxUsage: number;
  currentUsage?: number;
  status: AssetStatus;
}

// Location Entity
export interface Location extends BaseEntity {
  code: string;
  name: string;
  type: string;
  capacity: string;
  address?: string;
  status: Status;
}

// User Entity
export interface User extends BaseEntity {
  code: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  password?: string; // Should not be exposed in frontend
  status: Status;
}

// Shift Entity
export interface Shift extends BaseEntity {
  code: string;
  name: string;
  startTime: string;
  endTime: string;
  description?: string;
  status: Status;
}

// Production Stage Entity
export interface ProductionStage extends BaseEntity {
  code: string;
  name: string;
  sequence: number;
  description?: string;
  status: Status;
}

// Rejection Reason Entity
export interface RejectionReason extends BaseEntity {
  code: string;
  reason: string;
  category: string;
  severity: RejectionSeverity;
  description: string;
  status: Status;
}

// Product Category Entity
export interface ProductCategoryEntity extends BaseEntity {
  code: string;
  name: string;
  description: string;
  status: Status;
}

// Enquiry Entity
export interface Enquiry extends BaseEntity {
  enquiryNumber: string;
  customerName: string;
  productType: ProductCategory | string;
  quantity: number;
  size?: string;
  specifications?: string;
  status: EnquiryStatus;
  enquiryDate: Date | string;
  followUpDate?: Date | string;
  estimatedCost?: number;
  notes?: string;
  attachments?: string[];
}

// Quotation Line Item
export interface QuotationLine {
  id: string;
  description: string;
  quantity: number;
  board: string;
  gsm: number;
  rate: number;
  amount: number;
}

// Quotation Entity
export interface Quotation extends BaseEntity {
  quotationNumber: string;
  enquiryId?: string;
  clientId?: string;
  clientName: string;
  contactPerson?: string;
  email: string;
  phone: string;
  productType: string;
  totalQuantity: number;
  description: string;
  lineItems: QuotationLine[];
  currency: Currency;
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discountType: DiscountType;
  discountValue: number;
  discountAmount: number;
  total: number;
  validUntil: Date | string;
  status: QuotationStatus;
  quotationDate: Date | string;
  notes?: string;
}

// Order Entity
export interface Order extends BaseEntity {
  orderNumber: string;
  quotationId?: string;
  clientId: string;
  clientName: string;
  productType: string;
  quantity: number;
  orderDate: Date | string;
  deliveryDate: Date | string;
  amount: number;
  status: OrderStatus;
  currentStage?: string;
  progress?: number;
}

// Dashboard Metric
export interface DashboardMetric {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon?: React.ReactNode;
}

// Chart Data Point
export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

// Sales Data
export interface SalesData {
  month: string;
  amount: number;
}

// Order Distribution
export interface OrderDistribution {
  type: string;
  value: number;
  color: string;
}
