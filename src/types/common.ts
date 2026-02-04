/**
 * Common Types and Enums
 *
 * Base types used throughout the application
 */

// Base Entity Interface
export interface BaseEntity {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Status Types
export type Status = 'Active' | 'Inactive';

export type MachineStatus = 'Running' | 'Idle' | 'Maintenance' | 'Offline';

export type AssetStatus = 'New' | 'In Use' | 'Worn' | 'Retired';

export type EnquiryStatus = 'New' | 'Quoted' | 'Approved' | 'Rejected' | 'In Progress';

export type QuotationStatus = 'Draft' | 'Sent' | 'Approved' | 'Rejected' | 'Expired';

export type OrderStatus = 'Pending' | 'In Production' | 'Completed' | 'Cancelled';

// Currency Types
export type Currency = 'INR' | 'USD' | 'EUR' | 'GBP';

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  INR: '₹',
  USD: '$',
  EUR: '€',
  GBP: '£',
};

// Discount Types
export type DiscountType = 'none' | 'percentage' | 'fixed';

// Product Categories
export type ProductCategory =
  | 'Business Cards'
  | 'Brochures'
  | 'Flyers'
  | 'Posters'
  | 'Packaging'
  | 'Labels & Stickers'
  | 'Catalogues'
  | 'Letterheads'
  | 'Envelopes'
  | 'Booklets';

// Machine Types
export type MachineType =
  | 'Offset Printer'
  | 'Digital Printer'
  | 'Die Cutting'
  | 'Lamination'
  | 'Binding'
  | 'Large Format'
  | 'Color Printing';

// Die Types
export type DieType = 'Flat Bed' | 'Rotary' | 'Laser';

// Plate Types
export type PlateType = 'Offset' | 'Flexographic' | 'Lithographic' | 'Digital' | 'Screen';

// Board Types
export type BoardType = 'Art Card' | 'Ivory Board' | 'Maplitho' | 'Kraft Board';

// Unit Types
export type Unit = 'Pcs' | 'Sheets' | 'Reams' | 'Kg' | 'Boxes';

// Rejection Severity
export type RejectionSeverity = 'Low' | 'Medium' | 'High' | 'Critical';

// Pagination
export interface PaginationParams {
  page: number;
  pageSize: number;
  total?: number;
}

// Sort
export interface SortParams {
  field: string;
  order: 'asc' | 'desc';
}

// Search/Filter
export interface SearchFilter {
  searchTerm?: string;
  status?: string | string[];
  dateFrom?: Date;
  dateTo?: Date;
}

// API Response
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

// Form Validation Rule
export interface ValidationRule {
  required?: boolean;
  message?: string;
  type?: 'email' | 'url' | 'number';
  min?: number;
  max?: number;
  pattern?: RegExp;
  validator?: (rule: any, value: any) => Promise<void>;
}

// Select Option
export interface SelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

// Action Handler Types
export type ActionHandler<T = void> = () => T | Promise<T>;
export type SubmitHandler<T, R = void> = (values: T) => R | Promise<R>;
export type ChangeHandler<T = any> = (value: T) => void;
export type SearchHandler = (searchTerm: string) => void;
