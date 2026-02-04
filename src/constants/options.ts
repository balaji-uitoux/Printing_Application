/**
 * Form Options Constants
 *
 * Centralized select dropdown options for all forms
 */

import type { SelectOption } from '../types';

// Status Options
export const STATUS_OPTIONS: SelectOption[] = [
  { value: 'Active', label: 'Active' },
  { value: 'Inactive', label: 'Inactive' },
];

export const ASSET_STATUS_OPTIONS: SelectOption[] = [
  { value: 'New', label: 'New' },
  { value: 'In Use', label: 'In Use' },
  { value: 'Worn', label: 'Worn' },
  { value: 'Retired', label: 'Retired' },
];

export const MACHINE_STATUS_OPTIONS: SelectOption[] = [
  { value: 'Running', label: 'Running' },
  { value: 'Idle', label: 'Idle' },
  { value: 'Maintenance', label: 'Maintenance' },
  { value: 'Offline', label: 'Offline' },
];

// Product Categories
export const PRODUCT_CATEGORIES: SelectOption[] = [
  { value: 'Business Cards', label: 'Business Cards' },
  { value: 'Brochures', label: 'Brochures' },
  { value: 'Flyers', label: 'Flyers' },
  { value: 'Posters', label: 'Posters' },
  { value: 'Packaging', label: 'Packaging' },
  { value: 'Labels & Stickers', label: 'Labels & Stickers' },
  { value: 'Catalogues', label: 'Catalogues' },
  { value: 'Letterheads', label: 'Letterheads' },
  { value: 'Envelopes', label: 'Envelopes' },
  { value: 'Booklets', label: 'Booklets' },
];

// Machine Types
export const MACHINE_TYPES: SelectOption[] = [
  { value: 'Offset Printer', label: 'Offset Printer' },
  { value: 'Digital Printer', label: 'Digital Printer' },
  { value: 'Die Cutting', label: 'Die Cutting' },
  { value: 'Lamination', label: 'Lamination' },
  { value: 'Binding', label: 'Binding' },
  { value: 'Large Format', label: 'Large Format' },
  { value: 'Color Printing', label: 'Color Printing' },
];

// Die Types
export const DIE_TYPES: SelectOption[] = [
  { value: 'Flat Bed', label: 'Flat Bed' },
  { value: 'Rotary', label: 'Rotary' },
  { value: 'Laser', label: 'Laser' },
];

// Plate Types
export const PLATE_TYPES: SelectOption[] = [
  { value: 'Offset', label: 'Offset' },
  { value: 'Flexographic', label: 'Flexographic' },
  { value: 'Lithographic', label: 'Lithographic' },
  { value: 'Digital', label: 'Digital' },
  { value: 'Screen', label: 'Screen' },
];

// Board Types
export const BOARD_TYPES: SelectOption[] = [
  { value: 'Art Card', label: 'Art Card' },
  { value: 'Ivory Board', label: 'Ivory Board' },
  { value: 'Maplitho', label: 'Maplitho' },
  { value: 'Kraft Board', label: 'Kraft Board' },
];

// Unit Types
export const UNITS: SelectOption[] = [
  { value: 'Pcs', label: 'Pcs' },
  { value: 'Sheets', label: 'Sheets' },
  { value: 'Reams', label: 'Reams' },
  { value: 'Kg', label: 'Kg' },
  { value: 'Boxes', label: 'Boxes' },
];

// Rejection Severity
export const SEVERITY_OPTIONS: SelectOption[] = [
  { value: 'Low', label: 'Low' },
  { value: 'Medium', label: 'Medium' },
  { value: 'High', label: 'High' },
  { value: 'Critical', label: 'Critical' },
];

// User Roles
export const USER_ROLES: SelectOption[] = [
  { value: 'Admin', label: 'Admin' },
  { value: 'Manager', label: 'Manager' },
  { value: 'Operator', label: 'Operator' },
  { value: 'Supervisor', label: 'Supervisor' },
  { value: 'QC Inspector', label: 'QC Inspector' },
];

// Departments
export const DEPARTMENTS: SelectOption[] = [
  { value: 'Production', label: 'Production' },
  { value: 'Quality Control', label: 'Quality Control' },
  { value: 'Maintenance', label: 'Maintenance' },
  { value: 'Administration', label: 'Administration' },
  { value: 'Sales', label: 'Sales' },
  { value: 'Logistics', label: 'Logistics' },
];

// Location Types
export const LOCATION_TYPES: SelectOption[] = [
  { value: 'Warehouse', label: 'Warehouse' },
  { value: 'Production Floor', label: 'Production Floor' },
  { value: 'Storage', label: 'Storage' },
  { value: 'Office', label: 'Office' },
];

// Rejection Categories
export const REJECTION_CATEGORIES: SelectOption[] = [
  { value: 'Print Quality', label: 'Print Quality' },
  { value: 'Material Defect', label: 'Material Defect' },
  { value: 'Dimension Error', label: 'Dimension Error' },
  { value: 'Color Mismatch', label: 'Color Mismatch' },
  { value: 'Finishing Issue', label: 'Finishing Issue' },
  { value: 'Other', label: 'Other' },
];
