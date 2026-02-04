# Assets Directory

This directory contains all static assets used throughout the application, including icons, images, and fonts.

## Structure

```
assets/
├── icons/      # SVG icons and icon components
├── images/     # PNG, JPG, WebP, and other image files
└── fonts/      # Custom font files (if any)
```

## Icons (`/icons`)

Store SVG icon files here. Consider these approaches:

### Option 1: SVG Files
Store raw SVG files that can be imported directly:

```tsx
import { ReactComponent as LogoIcon } from '@/assets/icons/logo.svg';

function Header() {
  return <LogoIcon width={24} height={24} />;
}
```

### Option 2: Icon Components
Create React components for commonly used icons:

```tsx
// icons/PrinterIcon.tsx
export const PrinterIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M..." fill={color} />
  </svg>
);
```

### Icon Naming
- Use PascalCase for icon components: `PrinterIcon.tsx`
- Use kebab-case for SVG files: `printer-icon.svg`
- Be descriptive: `add-user-icon.svg` instead of `icon1.svg`

## Images (`/images`)

Store raster images (PNG, JPG, WebP, etc.) used in the UI.

### Organization
```
images/
├── logo.png
├── backgrounds/
│   ├── hero-bg.jpg
│   └── pattern-bg.png
├── products/
│   └── placeholder.png
└── illustrations/
    ├── empty-state.svg
    └── error-page.svg
```

### Image Naming
- Use lowercase with hyphens: `hero-background.jpg`
- Include size in name if multiple versions: `logo-sm.png`, `logo-lg.png`
- Be descriptive: `empty-cart-illustration.svg`

### Image Optimization
- Compress images before adding to project
- Use WebP format for better compression (with fallbacks)
- Consider using lazy loading for large images
- Use appropriate image dimensions (don't use 4K image where 1080p is enough)

### Usage Example
```tsx
import heroImage from '@/assets/images/hero-background.jpg';
import logoSmall from '@/assets/images/logo-sm.png';

function Hero() {
  return (
    <div style={{ backgroundImage: `url(${heroImage})` }}>
      <img src={logoSmall} alt="Company Logo" />
    </div>
  );
}
```

## Fonts (`/fonts`)

Store custom font files here if not using CDN.

### Organization
```
fonts/
├── ProductSans-Regular.woff2
├── ProductSans-Bold.woff2
└── ProductSans-Italic.woff2
```

### Font Loading
Define fonts in CSS:

```css
/* styles/global.css */
@font-face {
  font-family: 'Product Sans';
  src: url('../assets/fonts/ProductSans-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Product Sans';
  src: url('../assets/fonts/ProductSans-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

## Best Practices

### Icons
1. **Use SVG when possible** for scalability and small file size
2. **Ant Design Icons**: Use Ant Design's icon library for common icons
3. **Consistent sizing**: Use theme-defined sizes (16px, 20px, 24px, 32px)
4. **Color**: Icons should inherit color from parent or use theme colors
5. **Accessibility**: Add `aria-label` when icon is the only content

### Images
1. **Optimize**: Always compress images before committing
2. **Alt text**: Always provide meaningful alt text
3. **Responsive**: Use `srcset` for responsive images
4. **Lazy loading**: Use `loading="lazy"` for below-fold images
5. **Format**: Use WebP with PNG/JPG fallback

### Fonts
1. **Subset fonts**: Only include characters you need
2. **Formats**: Use WOFF2 (best compression), fallback to WOFF
3. **Font-display**: Use `swap` to prevent invisible text
4. **Loading**: Preload critical fonts in HTML head
5. **Fallbacks**: Always define fallback system fonts

## File Size Guidelines

- **Icons**: < 10KB (SVG)
- **Logos**: < 50KB
- **UI Images**: < 200KB
- **Background Images**: < 500KB
- **Fonts**: < 100KB per weight/style

## Importing Assets

### TypeScript Configuration
Ensure `vite-env.d.ts` includes asset types:

```typescript
/// <reference types="vite/client" />

declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
  const src: string;
  export default src;
}

declare module '*.jpg';
declare module '*.png';
declare module '*.webp';
```

### Alias Import (Recommended)
Use path aliases for cleaner imports:

```tsx
// Instead of: import logo from '../../../assets/images/logo.png'
import logo from '@/assets/images/logo.png';
```

Configure in `vite.config.ts`:
```typescript
resolve: {
  alias: {
    '@': '/src'
  }
}
```
