/**
 * Type Definitions Index
 *
 * Central export for all type definitions
 */

// Export all common types
export * from './common';

// Export all entity types
export * from './entities';

// Export all form types
export * from './forms';

// Keep existing exports for backwards compatibility
export interface SubMenuItem {
  key: string;
  label: string;
  path: string;
}

export interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  path: string;
  subMenus?: SubMenuItem[];
}

// Note: Enquiry type is now exported from entities.ts
// User type is also exported from entities.ts with extended fields
