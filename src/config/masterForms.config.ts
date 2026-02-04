/**
 * Master Form Configurations
 *
 * Configuration-driven approach for all master forms.
 * This single file replaces 12 separate drawer component files.
 *
 * Benefits:
 * - Single source of truth for all master forms
 * - Easy to add new entities (just add configuration)
 * - Consistent validation and behavior
 * - Reduces ~1,800 lines to ~400 lines total
 */

import type { MasterFormConfig } from '../types';
import {
  STATUS_OPTIONS,
  ASSET_STATUS_OPTIONS,
  MACHINE_STATUS_OPTIONS,
  PRODUCT_CATEGORIES,
  MACHINE_TYPES,
  DIE_TYPES,
  PLATE_TYPES,
  BOARD_TYPES,
  UNITS,
  SEVERITY_OPTIONS,
  USER_ROLES,
  DEPARTMENTS,
  LOCATION_TYPES,
  REJECTION_CATEGORIES,
} from '../constants';

export const MASTER_FORM_CONFIGS: Record<string, MasterFormConfig> = {
  // Client Master
  client: {
    title: 'Add Client',
    width: 600,
    submitButtonText: 'Add Client',
    fields: [
      {
        label: 'Client Code',
        name: 'code',
        required: true,
        placeholder: 'CLI-001',
      },
      {
        label: 'Client Name',
        name: 'name',
        required: true,
        placeholder: 'Acme Corporation',
      },
      {
        label: 'Contact Person',
        name: 'contactPerson',
        required: true,
        placeholder: 'John Smith',
      },
      {
        label: 'Email',
        name: 'email',
        type: 'email',
        required: true,
        placeholder: 'john@acme.com',
      },
      {
        label: 'Phone',
        name: 'phone',
        required: true,
        placeholder: '+91 9876543210',
      },
      {
        label: 'City',
        name: 'city',
        required: true,
        placeholder: 'Mumbai',
      },
      {
        label: 'GST Number',
        name: 'gstNumber',
        required: true,
        placeholder: '27AABCU9603R1ZM',
      },
      {
        label: 'Address',
        name: 'address',
        type: 'textarea',
        rows: 3,
        placeholder: 'Enter complete address...',
      },
      {
        label: 'Status',
        name: 'status',
        type: 'select',
        initialValue: 'Active',
        required: true,
        options: STATUS_OPTIONS,
      },
    ],
  },

  // Product Master
  product: {
    title: 'Add Product',
    width: 600,
    submitButtonText: 'Add Product',
    fields: [
      {
        label: 'Product Code',
        name: 'code',
        required: true,
        placeholder: 'PRD-001',
      },
      {
        label: 'Product Name',
        name: 'name',
        required: true,
        placeholder: 'Business Card Premium',
      },
      {
        label: 'Category',
        name: 'category',
        type: 'select',
        required: true,
        options: PRODUCT_CATEGORIES,
      },
      {
        label: 'Description',
        name: 'description',
        type: 'textarea',
        required: true,
        rows: 3,
        placeholder: 'Enter product description...',
      },
      {
        label: 'Unit',
        name: 'unit',
        type: 'select',
        required: true,
        options: UNITS,
      },
      {
        label: 'Base Price (₹)',
        name: 'basePrice',
        type: 'number',
        required: true,
        min: 0,
        placeholder: '100',
      },
      {
        label: 'Status',
        name: 'status',
        type: 'select',
        initialValue: 'Active',
        required: true,
        options: STATUS_OPTIONS,
      },
    ],
  },

  // Machine Master
  machine: {
    title: 'Add Machine',
    width: 600,
    submitButtonText: 'Add Machine',
    fields: [
      {
        label: 'Machine Code',
        name: 'code',
        required: true,
        placeholder: 'MCH-001',
      },
      {
        label: 'Machine Name',
        name: 'name',
        required: true,
        placeholder: 'Offset Press HP',
      },
      {
        label: 'Type',
        name: 'type',
        type: 'select',
        required: true,
        options: MACHINE_TYPES,
      },
      {
        label: 'Location',
        name: 'location',
        required: true,
        placeholder: 'Production Floor A',
      },
      {
        label: 'Capacity (per hour)',
        name: 'capacity',
        type: 'number',
        min: 0,
        placeholder: '1000',
      },
      {
        label: 'Status',
        name: 'status',
        type: 'select',
        initialValue: 'Running',
        required: true,
        options: MACHINE_STATUS_OPTIONS,
      },
    ],
  },

  // Board Master
  board: {
    title: 'Add Board',
    width: 600,
    submitButtonText: 'Add Board',
    fields: [
      {
        label: 'Board Code',
        name: 'code',
        required: true,
        placeholder: 'BRD-001',
      },
      {
        label: 'Board Name',
        name: 'name',
        required: true,
        placeholder: 'Art Card 300 GSM',
      },
      {
        label: 'Type',
        name: 'type',
        type: 'select',
        required: true,
        options: BOARD_TYPES,
      },
      {
        label: 'GSM',
        name: 'gsm',
        type: 'number',
        required: true,
        min: 0,
        placeholder: '300',
      },
      {
        label: 'Size',
        name: 'size',
        required: true,
        placeholder: '20" x 30"',
      },
      {
        label: 'Supplier',
        name: 'supplier',
        required: true,
        placeholder: 'ABC Papers Ltd',
      },
      {
        label: 'Cost Per Sheet (₹)',
        name: 'costPerSheet',
        type: 'number',
        required: true,
        min: 0,
        placeholder: '25',
      },
      {
        label: 'Status',
        name: 'status',
        type: 'select',
        initialValue: 'Active',
        required: true,
        options: STATUS_OPTIONS,
      },
    ],
  },

  // Die Master
  die: {
    title: 'Add Die',
    width: 600,
    submitButtonText: 'Add Die',
    fields: [
      {
        label: 'Die Code',
        name: 'code',
        required: true,
        placeholder: 'DIE-001',
      },
      {
        label: 'Die Name',
        name: 'name',
        required: true,
        placeholder: 'Business Card Die',
      },
      {
        label: 'Type',
        name: 'type',
        type: 'select',
        required: true,
        options: DIE_TYPES,
      },
      {
        label: 'Size',
        name: 'size',
        required: true,
        placeholder: '3.5" x 2"',
      },
      {
        label: 'Max Usage Count',
        name: 'maxUsage',
        type: 'number',
        required: true,
        min: 0,
        placeholder: '1000',
      },
      {
        label: 'Description',
        name: 'description',
        type: 'textarea',
        rows: 3,
        placeholder: 'Enter die specifications...',
      },
      {
        label: 'Status',
        name: 'status',
        type: 'select',
        initialValue: 'New',
        required: true,
        options: ASSET_STATUS_OPTIONS,
      },
    ],
  },

  // Plate Master
  plate: {
    title: 'Add Plate',
    width: 600,
    submitButtonText: 'Add Plate',
    fields: [
      {
        label: 'Plate Code',
        name: 'code',
        required: true,
        placeholder: 'PLT-001',
      },
      {
        label: 'Plate Name',
        name: 'name',
        required: true,
        placeholder: 'Offset Plate A3',
      },
      {
        label: 'Type',
        name: 'type',
        type: 'select',
        required: true,
        options: PLATE_TYPES,
      },
      {
        label: 'Size',
        name: 'size',
        required: true,
        placeholder: 'A3 (11.7" x 16.5")',
      },
      {
        label: 'Thickness',
        name: 'thickness',
        required: true,
        placeholder: '0.30mm',
      },
      {
        label: 'Supplier',
        name: 'supplier',
        required: true,
        placeholder: 'Kodak',
      },
      {
        label: 'Purchase Date',
        name: 'purchaseDate',
        type: 'date',
        required: true,
      },
      {
        label: 'Max Usage Count',
        name: 'maxUsage',
        type: 'number',
        required: true,
        min: 0,
        placeholder: '50',
      },
      {
        label: 'Status',
        name: 'status',
        type: 'select',
        initialValue: 'New',
        required: true,
        options: ASSET_STATUS_OPTIONS,
      },
    ],
  },

  // Location Master
  location: {
    title: 'Add Location',
    width: 500,
    submitButtonText: 'Add Location',
    fields: [
      {
        label: 'Location Code',
        name: 'code',
        required: true,
        placeholder: 'LOC-001',
      },
      {
        label: 'Location Name',
        name: 'name',
        required: true,
        placeholder: 'Warehouse A',
      },
      {
        label: 'Type',
        name: 'type',
        type: 'select',
        required: true,
        options: LOCATION_TYPES,
      },
      {
        label: 'Capacity',
        name: 'capacity',
        required: true,
        placeholder: '1000 sqft',
      },
      {
        label: 'Address',
        name: 'address',
        type: 'textarea',
        rows: 3,
        placeholder: 'Enter location address...',
      },
      {
        label: 'Status',
        name: 'status',
        type: 'select',
        initialValue: 'Active',
        required: true,
        options: STATUS_OPTIONS,
      },
    ],
  },

  // User Master
  user: {
    title: 'Add User',
    width: 600,
    submitButtonText: 'Add User',
    fields: [
      {
        label: 'User Code',
        name: 'code',
        required: true,
        placeholder: 'USR-001',
      },
      {
        label: 'Full Name',
        name: 'name',
        required: true,
        placeholder: 'John Doe',
      },
      {
        label: 'Email',
        name: 'email',
        type: 'email',
        required: true,
        placeholder: 'john.doe@company.com',
      },
      {
        label: 'Phone',
        name: 'phone',
        required: true,
        placeholder: '+91 9876543210',
      },
      {
        label: 'Role',
        name: 'role',
        type: 'select',
        required: true,
        options: USER_ROLES,
      },
      {
        label: 'Department',
        name: 'department',
        type: 'select',
        required: true,
        options: DEPARTMENTS,
      },
      {
        label: 'Password',
        name: 'password',
        type: 'password',
        required: true,
        placeholder: 'Enter password',
      },
      {
        label: 'Status',
        name: 'status',
        type: 'select',
        initialValue: 'Active',
        required: true,
        options: STATUS_OPTIONS,
      },
    ],
  },

  // Shift Master
  shift: {
    title: 'Add Shift',
    width: 500,
    submitButtonText: 'Add Shift',
    fields: [
      {
        label: 'Shift Code',
        name: 'code',
        required: true,
        placeholder: 'SFT-001',
      },
      {
        label: 'Shift Name',
        name: 'name',
        required: true,
        placeholder: 'Morning Shift',
      },
      {
        label: 'Start Time',
        name: 'startTime',
        type: 'time',
        required: true,
      },
      {
        label: 'End Time',
        name: 'endTime',
        type: 'time',
        required: true,
      },
      {
        label: 'Description',
        name: 'description',
        type: 'textarea',
        rows: 3,
        placeholder: 'Enter shift description...',
      },
      {
        label: 'Status',
        name: 'status',
        type: 'select',
        initialValue: 'Active',
        required: true,
        options: STATUS_OPTIONS,
      },
    ],
  },

  // Production Stage Master
  productionStage: {
    title: 'Add Production Stage',
    width: 500,
    submitButtonText: 'Add Stage',
    fields: [
      {
        label: 'Stage Code',
        name: 'code',
        required: true,
        placeholder: 'STG-001',
      },
      {
        label: 'Stage Name',
        name: 'name',
        required: true,
        placeholder: 'Printing',
      },
      {
        label: 'Sequence Order',
        name: 'sequence',
        type: 'number',
        required: true,
        min: 1,
        placeholder: '1',
      },
      {
        label: 'Description',
        name: 'description',
        type: 'textarea',
        rows: 3,
        placeholder: 'Enter stage description...',
      },
      {
        label: 'Status',
        name: 'status',
        type: 'select',
        initialValue: 'Active',
        required: true,
        options: STATUS_OPTIONS,
      },
    ],
  },

  // Rejection Reason Master
  rejectionReason: {
    title: 'Add Rejection Reason',
    width: 500,
    submitButtonText: 'Add Reason',
    fields: [
      {
        label: 'Reason Code',
        name: 'code',
        required: true,
        placeholder: 'REJ-001',
      },
      {
        label: 'Rejection Reason',
        name: 'reason',
        required: true,
        placeholder: 'Print quality issue',
      },
      {
        label: 'Category',
        name: 'category',
        type: 'select',
        required: true,
        options: REJECTION_CATEGORIES,
      },
      {
        label: 'Severity',
        name: 'severity',
        type: 'select',
        required: true,
        options: SEVERITY_OPTIONS,
      },
      {
        label: 'Description',
        name: 'description',
        type: 'textarea',
        required: true,
        rows: 3,
        placeholder: 'Enter detailed description...',
      },
      {
        label: 'Status',
        name: 'status',
        type: 'select',
        initialValue: 'Active',
        required: true,
        options: STATUS_OPTIONS,
      },
    ],
  },

  // Product Category Master
  productCategory: {
    title: 'Add Product Category',
    width: 500,
    submitButtonText: 'Add Category',
    fields: [
      {
        label: 'Category Code',
        name: 'code',
        required: true,
        placeholder: 'CAT-001',
      },
      {
        label: 'Category Name',
        name: 'name',
        required: true,
        placeholder: 'Business Cards',
      },
      {
        label: 'Description',
        name: 'description',
        type: 'textarea',
        required: true,
        rows: 3,
        placeholder: 'Enter category description...',
      },
      {
        label: 'Status',
        name: 'status',
        type: 'select',
        initialValue: 'Active',
        required: true,
        options: STATUS_OPTIONS,
      },
    ],
  },
};

/**
 * Get configuration for a specific master form
 */
export const getMasterFormConfig = (entityType: string): MasterFormConfig | undefined => {
  return MASTER_FORM_CONFIGS[entityType];
};

/**
 * Get all available entity types
 */
export const getAvailableEntityTypes = (): string[] => {
  return Object.keys(MASTER_FORM_CONFIGS);
};
