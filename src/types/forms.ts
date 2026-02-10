/**
 * Form Type Definitions
 *
 * All form-related types and interfaces
 */

import type { FormInstance, Rule } from 'antd/es/form';
import type { ReactNode } from 'react';
import type { SelectOption, Currency, DiscountType } from './common';

// Base Form Props
export interface BaseFormProps {
  form?: FormInstance;
  onSubmit?: (values: any) => void | Promise<void>;
  initialValues?: Record<string, any>;
  loading?: boolean;
}

// Form Field Configuration
export interface FormFieldConfig {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'number' | 'select' | 'textarea' | 'date' | 'time' | 'password';
  required?: boolean;
  placeholder?: string;
  options?: SelectOption[];
  rules?: Rule[];
  min?: number;
  max?: number;
  rows?: number;
  initialValue?: any;
  disabled?: boolean;
  tooltip?: string;
}

// Master Form Configuration
export interface MasterFormConfig {
  title: string;
  width?: number;
  fields: FormFieldConfig[];
  submitButtonText?: string;
}

// Drawer Form Props
export interface DrawerFormProps<T = any> {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: T) => void | Promise<void>;
  initialValues?: Partial<T>;
  loading?: boolean;
}

// Quotation Form Data
export interface QuotationFormData {
  customerName: string;
  contactPerson?: string;
  email: string;
  phone: string;
  productType: string;
  totalQuantity: number;
  description: string;
  currency: Currency;
  taxRate: number;
  discountType: DiscountType;
  discountValue: number;
}

// Enquiry Form Data
export interface EnquiryFormData {
  customerName: string;
  productType: string;
  quantity: number;
  size?: string;
  specifications?: string;
  enquiryDate: Date | string;
  followUpDate?: Date | string;
  estimatedCost?: number;
  notes?: string;
}

// Client Form Data
export interface ClientFormData {
  displayName: string;
  salutation?: 'Mr.' | 'Ms.' | 'Mrs.' | 'Dr.';
  firstName: string;
  lastName: string;
  contactNumber?: string;
  mobileNumber: string;
  email: string;
  // Company Address
  companyPincode: string;
  companyStreet: string;
  companyState: string;
  companyCity: string;
  // Billing Address
  sameAsCompanyAddress?: boolean;
  billingPincode?: string;
  billingStreet?: string;
  billingState?: string;
  billingCity?: string;
  // GST Details
  gstNumber?: string;
  gstTreatment?: 'Registered' | 'Unregistered' | 'Composition' | 'Consumer' | 'Overseas';
  status: 'Active' | 'Inactive';
}

// Product Form Data
export interface ProductFormData {
  code: string;
  name: string;
  category: string;
  description: string;
  unit: string;
  basePrice: number;
  status: 'Active' | 'Inactive';
}

// Machine Form Data
export interface MachineFormData {
  code: string;
  name: string;
  type: string;
  location: string;
  capacity?: number;
  status: 'Running' | 'Idle' | 'Maintenance' | 'Offline';
}

// Board Form Data
export interface BoardFormData {
  code: string;
  name: string;
  type: string;
  gsm: number;
  size: string;
  supplier: string;
  costPerSheet: number;
  status: 'Active' | 'Inactive';
}

// Die Form Data
export interface DieFormData {
  code: string;
  name: string;
  type: 'Flat Bed' | 'Rotary' | 'Laser';
  size: string;
  maxUsage: number;
  description?: string;
  status: 'New' | 'In Use' | 'Worn' | 'Retired';
}

// Plate Form Data
export interface PlateFormData {
  code: string;
  name: string;
  type: 'Offset' | 'Flexographic' | 'Lithographic' | 'Digital' | 'Screen';
  size: string;
  thickness: string;
  supplier: string;
  purchaseDate: Date | string;
  maxUsage: number;
  status: 'New' | 'In Use' | 'Worn' | 'Retired';
}

// Location Form Data
export interface LocationFormData {
  code: string;
  name: string;
  type: string;
  capacity: string;
  address?: string;
  status: 'Active' | 'Inactive';
}

// User Form Data
export interface UserFormData {
  code: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  password: string;
  status: 'Active' | 'Inactive';
}

// Shift Form Data
export interface ShiftFormData {
  code: string;
  name: string;
  startTime: string;
  endTime: string;
  description?: string;
  status: 'Active' | 'Inactive';
}

// Production Stage Form Data
export interface ProductionStageFormData {
  code: string;
  name: string;
  sequence: number;
  description?: string;
  status: 'Active' | 'Inactive';
}

// Rejection Reason Form Data
export interface RejectionReasonFormData {
  code: string;
  reason: string;
  category: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  description: string;
  status: 'Active' | 'Inactive';
}

// Product Category Form Data
export interface ProductCategoryFormData {
  code: string;
  name: string;
  description: string;
  status: 'Active' | 'Inactive';
}

// Form Field Props
export interface FormFieldProps {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  type?: 'text' | 'email' | 'number' | 'select' | 'textarea' | 'date' | 'time' | 'password';
  options?: SelectOption[];
  rules?: Rule[];
  min?: number;
  max?: number;
  rows?: number;
  initialValue?: any;
  disabled?: boolean;
  tooltip?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
}

// Form Drawer Props
export interface FormDrawerProps<T = any> {
  open: boolean;
  onClose: () => void;
  title: string;
  width?: number;
  onSubmit: (values: T) => void | Promise<void>;
  submitButtonText?: string;
  submitButtonIcon?: ReactNode;
  children: ReactNode;
  form?: FormInstance;
  loading?: boolean;
}

// Master Form Drawer Props
export interface MasterFormDrawerProps<T = any> {
  entityType: string;
  open: boolean;
  onClose: () => void;
  onSubmit: (values: T) => Promise<void>;
  initialValues?: Partial<T>;
  loading?: boolean;
}

// Form Section Props
export interface FormSectionProps {
  title: string;
  icon?: ReactNode;
  iconColor?: 'blue' | 'green' | 'orange' | 'red';
  children: ReactNode;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}
