# Printing Press Application - Theme & Layout Documentation

> **Purpose**: This document serves as a comprehensive reference for all theme, styling, and layout conventions used in the Printing Press Application. Use this to maintain consistency across all components and pages, especially after context resets.

**To keep in mind** : You are a senior Designer with frontend development, and good creative thinking to make the UI look clean and modern. Dont Hallocinate, and dont assume, just work on the requirments, and use the same UI elements and componants from the theme always refer the theme to work,and dont make the same mistakes repeatedlly. You say its fixed and while looking the local host the changes are not made.And dont change any UI unless said and dont make any changes to the section not told or mention to make changes.

**Last Updated**: 2026-02-03
**Version**: 1.0

---

## Table of Contents
1. [Color Palette](#color-palette)
2. [Typography System](#typography-system)
3. [Layout & Spacing](#layout--spacing)
4. [Component Styling Patterns](#component-styling-patterns)
5. [Semantic Class Names](#semantic-class-names)
6. [Background & Effects](#background--effects)
7. [Component-Specific Styles](#component-specific-styles)
8. [Ant Design Customizations](#ant-design-customizations)

---

## Color Palette

### Theme Configuration
**Source**: `/src/theme/themeConfig.ts`

#### Primary Brand Colors - Orange Theme
```typescript
primary: '#FF6B35'         // Primary orange brand color
primaryLight: '#FF8C61'    // Lighter orange for hover states
primaryDark: '#E65525'     // Darker orange for active states
```

#### Background Colors
```typescript
background: '#F8FAFC'      // Light gray page background
surface: '#FFFFFF'         // White cards/surfaces
surfaceHover: '#F9FAFB'    // Hover state for surfaces
sidebarBg: '#FFFFFF'       // White sidebar background
sidebarActiveOrange: '#FFF4F0'  // Light orange background for active menu items
```

#### Text Colors
```typescript
text: '#0F172A'            // Primary text (dark slate)
textSecondary: '#64748B'   // Secondary text (medium gray)
textTertiary: '#94A3B8'    // Tertiary text (light gray)
```

#### Border Colors
```typescript
border: '#E2E8F0'          // Default border
borderLight: '#F1F5F9'     // Light border
```

#### Supporting Colors
```typescript
error: '#EF4444'           // Red for errors
warning: '#F59E0B'         // Amber for warnings
success: '#10B981'         // Green for success
info: '#3B82F6'            // Blue for information
```

### Usage Examples
```typescript
import { themeColors } from '../../theme/themeConfig';

// Apply colors
style={{
  color: themeColors.text,
  borderColor: themeColors.border,
  background: themeColors.surface
}}
```

---

## Typography System

### Font Family
**Source**: `/src/theme/typography.ts`

#### Primary Font
```css
'Product Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif
```

#### Monospace Font
```css
source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace
```

### Typography Scale

#### Display & Hero Text
```typescript
display: {
  fontSize: '48px',
  fontWeight: 700,
  lineHeight: '56px',
  letterSpacing: '-0.02em'
}
```

#### Headings
```typescript
h1: { fontSize: '32px', fontWeight: 700, lineHeight: '40px', letterSpacing: '-0.01em' }
h2: { fontSize: '24px', fontWeight: 600, lineHeight: '32px', letterSpacing: '-0.01em' }
h3: { fontSize: '20px', fontWeight: 600, lineHeight: '28px', letterSpacing: '0' }
h4: { fontSize: '16px', fontWeight: 600, lineHeight: '24px', letterSpacing: '0' }
```

#### Body Text
```typescript
bodyLarge: { fontSize: '16px', fontWeight: 400, lineHeight: '24px' }
body: { fontSize: '14px', fontWeight: 400, lineHeight: '20px' }
bodySmall: { fontSize: '13px', fontWeight: 400, lineHeight: '18px' }
```

#### Labels & Captions
```typescript
label: { fontSize: '12px', fontWeight: 500, lineHeight: '16px', letterSpacing: '0.01em' }
labelSmall: { fontSize: '11px', fontWeight: 500, lineHeight: '16px', letterSpacing: '0.02em' }
caption: { fontSize: '12px', fontWeight: 400, lineHeight: '16px' }
```

#### Button Text
```typescript
button: { fontSize: '14px', fontWeight: 600, lineHeight: '20px', letterSpacing: '0.01em' }
buttonLarge: { fontSize: '16px', fontWeight: 600, lineHeight: '24px' }
buttonSmall: { fontSize: '13px', fontWeight: 600, lineHeight: '18px' }
```

#### Stats & Numbers
```typescript
statValue: { fontSize: '32px', fontWeight: 700, lineHeight: '40px', letterSpacing: '-0.01em' }
statLabel: { fontSize: '14px', fontWeight: 500, lineHeight: '20px' }
```

#### Table Text
```typescript
tableHeader: {
  fontSize: '12px',
  fontWeight: 600,
  lineHeight: '16px',
  letterSpacing: '0.05em',
  textTransform: 'uppercase'
}
tableCell: { fontSize: '14px', fontWeight: 400, lineHeight: '20px' }
```

### Usage Examples
```typescript
import { typography } from '../../theme/typography';

// Apply typography
style={{ ...typography.h1, color: themeColors.text }}
style={{ ...typography.body, color: themeColors.textSecondary }}
```

---

## Layout & Spacing

### Standard Spacing Scale
```typescript
4px   // xs - Minimal gap
8px   // sm - Small gap
12px  // md - Medium gap
16px  // lg - Large gap
20px  // xl - Extra large gap
24px  // 2xl - Section spacing
32px  // 3xl - Major section spacing
```

### Common Measurements

#### Heights
- **Header**: `60px` (reduced from 72px)
- **Input**: `40px`
- **Button**: `40px`
- **Table Row**: `48px`
- **Icon Wrapper**: `32px` × `32px` (small), `40px` × `40px` (medium), `56px` × `56px` (large)

#### Padding
- **Card Body**: `20px` or `24px`
- **Page Content**: `24px`
- **Left Padding (CreateQuotation)**: `16px`
- **Input Padding**: `0 20px` or `0 24px`

#### Gaps
- **Grid Gap**: `16px` or `20px`
- **Flex Gap**: `8px`, `12px`, or `16px`

#### Border Radius
- **Cards**: `16px` (large), `12px` (medium)
- **Inputs**: `8px`
- **Buttons**: `50px` (pill shape) or `8px` (rounded)
- **Icons/Avatars**: `50%` (circle), `12px` (rounded square)
- **Progress Bars**: `4px` (rounded ends)

#### Margins
- **Section Bottom**: `16px`, `20px`, or `24px`
- **Element Bottom**: `4px`, `6px`, `8px`

---

## Component Styling Patterns

### Card Styles

#### Standard Card (Glassmorphism - Deprecated, now solid white)
```typescript
{
  borderRadius: '16px',
  border: '1px solid rgba(226, 232, 240, 0.6)',
  background: '#FFFFFF',  // Changed from rgba(255, 255, 255, 0.4)
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
}
```

#### Dashboard Metric Card
```typescript
{
  borderRadius: '12px',
  border: '1px solid rgba(226, 232, 240, 0.6)',
  background: 'rgba(255, 255, 255, 0.4)',
  backdropFilter: 'blur(20px)',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
}
```

### Button Styles

#### Primary Button
```typescript
{
  background: '#0F172A',      // Dark slate
  borderColor: '#0F172A',
  height: '40px',
  borderRadius: '50px',       // Pill shape
  padding: '0 24px',
  color: '#FFFFFF'
}
```

#### Secondary Button
```typescript
{
  height: '40px',
  borderRadius: '50px',
  padding: '0 24px',
  borderColor: themeColors.text,
  color: themeColors.text,
  background: 'transparent'
}
```

### Input Styles

#### Standard Input
```typescript
{
  height: '40px',
  border: '1px solid ${themeColors.border}',
  borderRadius: '8px'
}
```

#### Search Input
```typescript
{
  width: '300px' or '400px',
  size: 'large'  // Ant Design size prop
}
```

### Shadow Patterns

#### Light Shadow (Cards)
```css
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
```

#### Medium Shadow (Elevated elements)
```css
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
```

#### Tooltip/Popover Shadow
```css
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
```

### Icon Wrapper Pattern
```typescript
{
  width: '32px' or '40px',
  height: '32px' or '40px',
  borderRadius: '8px' or '50%',
  background: themeColors.borderLight,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '16px' or '18px',
  color: themeColors.textSecondary
}
```

---

## Semantic Class Names

### Naming Convention Standards

#### Page-Level Containers
```typescript
'[entity]-page-container'        // Root page wrapper (e.g., 'enquiry-page-container')
'page-header'                     // Page header section
'page-body'                       // Main content area
'page-footer'                     // Page footer section
```

#### Content Sections
```typescript
'content-section'                 // Generic content section
'form-section'                    // Form-specific section
'preview-section'                 // Preview/display section
'table-section'                   // Table wrapper section
'metrics-section'                 // Dashboard metrics section
'charts-section'                  // Dashboard charts section
```

#### Header Components
```typescript
'header-title-section'            // Header title area
'header-actions-section'          // Header actions (search + buttons)
'header-search'                   // Search input wrapper
'header-button'                   // Button wrapper
'header-left-section'             // Header left side
'header-right-section'            // Header right side
'header-logo'                     // Logo area
'header-divider'                  // Divider element
'header-breadcrumb'               // Breadcrumb navigation
'header-user-menu'                // User dropdown menu
```

#### Card Components
```typescript
'card-header'                     // Card header section
'card-body'                       // Card body content
'card-footer'                     // Card footer section
```

#### Layout Components
```typescript
'app-layout'                      // Root layout container
'app-sidebar'                     // Sidebar container
'app-content-layout'              // Content layout wrapper
'app-main-content'                // Main content area
'app-header'                      // Application header
```

#### Sidebar Components
```typescript
'sidebar-container'               // Sidebar wrapper
'sidebar-nav'                     // Sidebar navigation
'sidebar-logo-section'            // Logo section
'sidebar-menu-section'            // Menu section
'sidebar-menu'                    // Menu component
```

#### Master Page Components
```typescript
'master-page-container'           // Master page root
'master-page-card'                // Master page card
'master-data-table'               // Master page table
```

#### CreateQuotation Specific
```typescript
'create-quotation-page-container' // Root container
'create-quotation-split-layout'   // Split screen grid
'quotation-form-section'          // Left side form
'quotation-preview-section'       // Right side preview
'client-info-card'                // Client information card
'pricing-settings-card'           // Pricing settings card
'form-actions'                    // Action buttons section
'preview-header'                  // Preview header
'preview-body'                    // Preview content
'preview-company-header'          // Company header in preview
'preview-client-section'          // Client details in preview
'preview-line-items-section'      // Line items table
'preview-totals-section'          // Totals calculation
```

#### Dashboard Specific
```typescript
'dashboard-page-container'        // Dashboard root
'sales-chart-container'           // Sales chart wrapper
'orders-chart-container'          // Orders chart wrapper
'distribution-chart-container'    // Distribution chart wrapper
'machines-table-container'        // Machines table wrapper
'charts-row-primary'              // Primary charts row
'charts-row-secondary'            // Secondary charts row
```

#### Data Attributes
All major sections should include `data-testid` for testing:
```typescript
data-testid="[entity]-page"       // Page level
data-testid="[entity]-card"       // Card level
data-testid="[entity]-table"      // Table level
data-testid="page-header"         // Generic sections
data-testid="page-body"
data-testid="split-layout"
```

---

## Background & Effects

### Page Background Gradient
```css
background: linear-gradient(
  135deg,
  #F0F4F8 0%,    /* Light blue-gray */
  #E8EDF2 25%,   /* Cool gray */
  #F5F0F8 50%,   /* Light purple */
  #E8F0F2 75%,   /* Cyan tint */
  #F0F8F4 100%   /* Light mint */
);
background-attachment: fixed;
```

### Glassmorphism Effect (Deprecated - Now using solid white)
**Previous style** (kept for reference):
```css
background: rgba(255, 255, 255, 0.4);
backdrop-filter: blur(20px);
border: 1px solid rgba(226, 232, 240, 0.6);
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
```

**Current style** (solid white):
```css
background: #FFFFFF;
border: 1px solid rgba(226, 232, 240, 0.6);
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
```

### Backdrop Blur
- **Pagination**: `backdrop-filter: blur(10px)`
- **Drawers**: `backdrop-filter: blur(40px)`
- **Tooltips**: `backdrop-filter: blur(10px)`

### Animations

#### Fade In
```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

#### Hover Transitions
```css
transition: all 0.2s ease;
```

---

## Component-Specific Styles

### CreateQuotation Layout

#### Split Screen Grid
```typescript
{
  display: 'grid',
  gridTemplateColumns: '45% 55%',  // 45% form, 55% preview
  height: '100%',
  gap: '20px',
  paddingLeft: '16px'
}
```

#### Form Section (Left Side)
```typescript
{
  overflowY: 'auto',
  paddingRight: '10px'
}
```

#### Preview Section (Right Side)
```typescript
{
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto'
}
```

### Dashboard Layout

#### Metrics Grid
```typescript
<Row gutter={[16, 16]}>
  <Col xs={24} sm={12} lg={6}>  // 4 columns on large screens
```

#### Charts Layout
```typescript
// Primary Row: Sales (66%) + Orders (33%)
<Row gutter={[16, 16]}>
  <Col xs={24} lg={16}>  // Sales Overview Chart
  <Col xs={24} lg={8}>   // Total Orders Chart

// Secondary Row: Distribution (33%) + Machines (66%)
<Row gutter={[16, 16]}>
  <Col xs={24} lg={8}>   // Order Distribution
  <Col xs={24} lg={16}>  // Active Machines Table
```

### Status Dropdown Pattern

#### Tag-Based Dropdown
```typescript
<Select
  value={status}
  onChange={(newStatus) => handleStatusChange(record.id, newStatus)}
  style={{ width: '130px' }}
  size="small"
  variant="borderless"
  suffixIcon={null}
  labelRender={({ value }) => (
    <Tag color={getStatusColor(value)} style={{ margin: 0, cursor: 'pointer' }}>
      {value} <DownOutlined style={{ fontSize: '10px', marginLeft: '4px' }} />
    </Tag>
  )}
  optionRender={(option) => (
    <Tag color={getStatusColor(option.value)} style={{ margin: '4px 0', width: '100%' }}>
      {option.label}
    </Tag>
  )}
/>
```

#### Status Colors
```typescript
// Enquiry Status
New: 'blue'
Quoted: 'gold'
Approved: 'green'
Rejected: 'red'
'In Progress': 'orange'

// Quotation Status
Draft: 'default'
Sent: 'blue'
Approved: 'green'
Rejected: 'red'
Expired: 'orange'

// Master Status
Active: 'green'
Inactive: 'red'
```

---

## Ant Design Customizations

### Table Customizations

#### Table Structure
```css
.ant-table-wrapper {
  background: #FFFFFF !important;
  border-radius: 12px !important;
  min-height: calc(100vh - 240px) !important;
  max-height: calc(100vh - 168px) !important;
}

.ant-table {
  background: #FFFFFF !important;
  overflow-y: auto !important;
  padding-bottom: 70px !important;
}
```

#### Table Rows
```css
.ant-table-tbody > tr > td {
  height: 48px !important;
  padding: 8px 16px !important;
}

.ant-table-thead > tr > th {
  height: 48px !important;
  padding: 8px 16px !important;
}
```

### Pagination

#### Fixed Pagination (Viewport Bottom)
```css
.ant-table-pagination {
  position: fixed !important;
  bottom: 24px !important;
  left: 20px !important;
  right: 20px !important;
  background: transparent !important;
  backdrop-filter: blur(10px) !important;
  padding: 16px 16px !important;
  border-top: 1px solid rgba(226, 232, 240, 0.6) !important;
  z-index: 100 !important;
  display: flex !important;
  justify-content: space-between !important;
}
```

#### Total Text Styling
```css
.ant-pagination-total-text {
  color: royalblue !important;
  font-weight: 600 !important;
  font-size: 14px !important;
}
```

### Select Dropdown

#### Selected Item Background (Grey instead of Orange)
```css
.ant-select-dropdown .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
  background-color: #f5f5f5 !important;
}

.ant-select-dropdown .ant-select-item-option-active:not(.ant-select-item-option-disabled) {
  background-color: #f5f5f5 !important;
}
```

### Drawer Sizes
- **Large**: `size="large"` (70-80% width)
- **Default**: `size="default"` (600px width)

**Note**: Use `size` prop instead of deprecated `width` prop in Ant Design v5.

---

## Usage Guidelines

### Importing Theme
```typescript
// Always import from theme config
import { themeColors } from '../../theme/themeConfig';
import { typography } from '../../theme/typography';

// Apply in inline styles
style={{
  color: themeColors.text,
  ...typography.h1
}}
```

### Consistent Patterns

1. **Always use theme colors** - Never hardcode colors
2. **Use typography scale** - Don't define custom font sizes
3. **Follow semantic naming** - Use consistent className patterns
4. **Add data-testid** - For all major sections and interactive elements
5. **Maintain spacing** - Use the standard spacing scale
6. **Border radius consistency** - 16px for cards, 8px for inputs, 50px for pill buttons
7. **Shadow consistency** - Use the defined shadow patterns
8. **Solid white backgrounds** - Cards use `#FFFFFF` (no glassmorphism)

### Common Mistakes to Avoid

❌ **Don't:**
- Hardcode colors: `color: '#123456'`
- Use custom font sizes: `fontSize: '15px'`
- Mix spacing values: `gap: '13px'`
- Forget data-testid attributes
- Use deprecated `width` prop on Drawers
- Use blur effects on cards (deprecated)

✅ **Do:**
- Use theme: `color: themeColors.text`
- Use typography: `...typography.body`
- Standard spacing: `gap: '12px'` or `'16px'`
- Add semantic names and test IDs
- Use `size="large"` on Drawers
- Use solid white: `background: '#FFFFFF'`

---

## Version History

### Version 1.0 (2026-02-03)
- Initial documentation
- Comprehensive theme coverage
- Semantic naming conventions
- Component styling patterns
- Ant Design customizations
- Layout guidelines

---

## Quick Reference

### Most Used Styles

**Card**:
```typescript
{
  borderRadius: '16px',
  border: '1px solid rgba(226, 232, 240, 0.6)',
  background: '#FFFFFF',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
}
```

**Button**:
```typescript
{
  background: '#0F172A',
  height: '40px',
  borderRadius: '50px',
  padding: '0 24px',
}
```

**Input**:
```typescript
{
  height: '40px',
  border: `1px solid ${themeColors.border}`,
  borderRadius: '8px',
}
```

**Typography**:
```typescript
h1: '32px/700/40px'
body: '14px/400/20px'
label: '12px/500/16px'
```

**Colors**:
```typescript
Text: #0F172A
Border: #E2E8F0
Success: #10B981
Error: #EF4444
```

---

**End of Theme Documentation**
