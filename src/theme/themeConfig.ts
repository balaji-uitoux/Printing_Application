// Single source of truth for all theme colors
// CHANGE COLORS HERE TO UPDATE THE ENTIRE APPLICATION THEME

export const themeColors = {
  // Primary Brand Colors - Orange Theme
  primary: '#FF6B35',         // Primary orange brand color
  primaryLight: '#FF8C61',    // Lighter orange for hover states
  primaryDark: '#E65525',     // Darker orange for active states

  // Background Colors
  background: '#F8FAFC',      // Light gray page background
  surface: '#FFFFFF',         // White cards/surfaces
  surfaceHover: '#F9FAFB',    // Hover state for surfaces
  sidebarBg: '#FFFFFF',       // White sidebar background
  sidebarActiveOrange: '#FFF4F0',  // Light orange background for active menu items

  // Text Colors
  text: '#0F172A',            // Primary text (dark slate)
  textSecondary: '#64748B',   // Secondary text (medium gray)
  textTertiary: '#94A3B8',    // Tertiary text (light gray)

  // Border Colors
  border: '#E2E8F0',          // Default border
  borderLight: '#F1F5F9',     // Light border

  // Supporting Colors
  error: '#EF4444',           // Red
  warning: '#F59E0B',         // Amber
  success: '#10B981',         // Green
  info: '#3B82F6',            // Blue
};

export type ThemeColors = typeof themeColors;
