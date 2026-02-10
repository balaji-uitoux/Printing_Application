import { themeColors } from '../theme/themeConfig';
import type { CSSProperties } from 'react';

/**
 * Centralized Style Constants
 *
 * This file contains all reusable style definitions to eliminate inline style duplication.
 * All styles use theme colors for consistency.
 */

// Input & Form Styles
export const INPUT_STYLES: CSSProperties = {
  height: '40px',
  width: '100%',
  border: `1px solid ${themeColors.border}`,
  borderRadius: '8px',
} as const;

export const TEXTAREA_STYLES: CSSProperties = {
  border: `1px solid ${themeColors.border}`,
  borderRadius: '8px',
} as const;

// Card Styles
export const CARD_STYLES: CSSProperties = {
  borderRadius: '16px',
  border: '1px solid rgba(226, 232, 240, 0.6)',
  background: 'rgba(255, 255, 255, 0.4)',
  backdropFilter: 'blur(20px)',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
} as const;

export const CARD_SIMPLE_STYLES: CSSProperties = {
  borderRadius: '12px',
  border: `1px solid ${themeColors.borderLight}`,
  background: '#FFFFFF',
} as const;

// Drawer Styles
export const DRAWER_STYLES = {
  body: {
    padding: '24px',
    background: 'rgba(232, 237, 242, 0.4)',
    backdropFilter: 'blur(40px)',
  },
  header: {
    background: '#FFFFFF',
    borderBottom: '1px solid rgba(226, 232, 240, 0.4)',
    padding: '16px 24px',
  },
  mask: {
    backdropFilter: 'blur(4px)',
    background: 'rgba(0, 0, 0, 0.1)',
  },
} as const;

// Button Styles
export const BUTTON_STYLES = {
  primary: {
    height: '40px',
    borderRadius: '50px',
    background: themeColors.text,
    borderColor: themeColors.text,
  },
  secondary: {
    height: '40px',
    borderRadius: '50px',
    borderColor: themeColors.text,
    color: themeColors.text,
  },
  cancel: {
    height: '40px',
    borderRadius: '50px',
    borderColor: themeColors.text,
    color: themeColors.text,
  },
  submit: {
    height: '40px',
    borderRadius: '50px',
    background: themeColors.text,
    borderColor: themeColors.text,
  },
} as const;

// Header Styles
export const DRAWER_HEADER_STYLES: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
} as const;

export const DRAWER_TITLE_STYLES: CSSProperties = {
  margin: 0,
  fontSize: '24px',
  fontWeight: 700,
  color: themeColors.text,
} as const;

// Footer Styles
export const DRAWER_FOOTER_STYLES: CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '10px',
} as const;

// Layout Styles
export const GRID_2_COL_STYLES: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '16px',
} as const;

export const GRID_4_COL_STYLES: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  gap: '16px',
} as const;

export const FLEX_BETWEEN_STYLES: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
} as const;

export const FLEX_START_STYLES: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
} as const;

// Icon Wrapper Styles
export const ICON_CIRCLE_STYLES = {
  base: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    fontSize: '18px',
  },
  blue: {
    background: 'rgba(59, 130, 246, 0.1)',
    color: '#3B82F6',
  },
  green: {
    background: 'rgba(16, 185, 129, 0.1)',
    color: '#10B981',
  },
  orange: {
    background: 'rgba(245, 158, 11, 0.1)',
    color: '#F59E0B',
  },
  red: {
    background: 'rgba(239, 68, 68, 0.1)',
    color: '#EF4444',
  },
} as const;

// Section Styles
export const FORM_SECTION_STYLES: CSSProperties = {
  background: '#FFFFFF',
  padding: '24px',
  borderRadius: '12px',
  marginBottom: '20px',
  border: `1px solid ${themeColors.borderLight}`,
} as const;

export const SECTION_HEADER_STYLES: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '20px',
} as const;

export const SECTION_TITLE_STYLES: CSSProperties = {
  margin: 0,
  fontSize: '18px',
  fontWeight: 600,
} as const;

// Table Styles
export const TABLE_HEADER_CELL_STYLES: CSSProperties = {
  textAlign: 'left',
  padding: '12px 8px',
  fontSize: '12px',
  fontWeight: 600,
  color: themeColors.textSecondary,
  textTransform: 'uppercase',
} as const;

export const TABLE_CELL_STYLES: CSSProperties = {
  padding: '12px 8px',
  fontSize: '14px',
} as const;

// Preview Styles
export const PREVIEW_CONTAINER_STYLES: CSSProperties = {
  background: '#FFFFFF',
  borderLeft: `1px solid ${themeColors.borderLight}`,
  display: 'flex',
  flexDirection: 'column',
} as const;

export const PREVIEW_HEADER_STYLES: CSSProperties = {
  padding: '20px 24px',
  borderBottom: `1px solid ${themeColors.borderLight}`,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
} as const;

// Close Button Styles
export const CLOSE_BUTTON_STYLES: CSSProperties = {
  fontSize: '16px',
  color: themeColors.textSecondary,
  width: '32px',
  height: '32px',
} as const;

// Split Layout Styles
export const SPLIT_LAYOUT_50_50: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '50% 50%',
  height: 'calc(100vh - 81px)',
} as const;

export const SPLIT_LAYOUT_40_60: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '40% 60%',
  height: 'calc(100vh - 81px)',
} as const;

// Form Container Styles
export const FORM_CONTAINER_STYLES: CSSProperties = {
  overflowY: 'auto',
  padding: '24px 32px',
} as const;

// Helper function to combine styles
export const combineStyles = (...styles: (CSSProperties | undefined)[]): CSSProperties => {
  return Object.assign({}, ...styles.filter(Boolean));
};

// Helper function to get icon circle style by color
export const getIconCircleStyle = (color: 'blue' | 'green' | 'orange' | 'red'): CSSProperties => {
  return combineStyles(ICON_CIRCLE_STYLES.base, ICON_CIRCLE_STYLES[color]);
};
