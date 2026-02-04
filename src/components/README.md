# Components Directory

This directory contains reusable UI components that can be used across different features of the application.

## Structure

```
components/
├── common/       # Basic shared components (Logo, Button, etc.)
├── forms/        # Form-related components (InputField, SelectField, DatePicker, etc.)
├── layout/       # Layout components (Header, Sidebar, Footer, etc.)
└── ui/           # UI elements (Modal, Drawer, Card, Badge, etc.)
```

## Guidelines

### When to add a component here:
- ✅ The component is used in **2 or more features**
- ✅ The component is **generic** and not tied to business logic
- ✅ The component is **configurable** via props

### When NOT to add a component here:
- ❌ Component is feature-specific → Add to `/features/{feature-name}/components/`
- ❌ Component contains business logic → Refactor to separate logic from UI
- ❌ Component is used only once → Keep it in the feature directory

## Examples

### Common Components (`/common`)
- Logo
- Button variants
- Loading spinners
- Empty states
- Error boundaries

### Form Components (`/forms`)
- Custom input fields
- Select dropdowns
- Date/time pickers
- File uploaders
- Form validation wrappers

### Layout Components (`/layout`)
- Header
- Sidebar
- Footer
- Navigation
- Breadcrumbs

### UI Components (`/ui`)
- Modal
- Drawer
- Card
- Tooltip
- Badge
- Tabs
- Accordion
- Alert/Toast

## Best Practices

1. **Naming**: Use PascalCase for component files (e.g., `CustomButton.tsx`)
2. **Props**: Always define TypeScript interfaces for props
3. **Documentation**: Add JSDoc comments for complex components
4. **Exports**: Use named exports for better tree-shaking
5. **Styling**: Use theme variables from `/styles/theme/`
6. **Testing**: Add unit tests for reusable components

## Example Component Structure

```tsx
// CustomButton.tsx
import { ButtonHTMLAttributes } from 'react';
import { themeColors } from '../../styles/theme/themeConfig';

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
}

/**
 * Reusable button component with consistent styling
 * @param variant - Button style variant
 * @param size - Button size
 */
export const CustomButton = ({
  variant = 'primary',
  size = 'medium',
  children,
  ...props
}: CustomButtonProps) => {
  // Component implementation
  return <button {...props}>{children}</button>;
};
```
