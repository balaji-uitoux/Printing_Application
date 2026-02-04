# Developer Guide - Printing Press App

Welcome to the Printing Press App! This guide will help you quickly navigate the codebase and understand where everything is located.

## 🚀 Quick Start

### Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run type checking
npm run type-check

# Run linting
npm run lint
```

## 📁 Project Structure at a Glance

```
src/
├── 📦 assets/          → Images, icons, fonts
├── 🧩 components/      → Reusable UI components
├── ⚙️  config/          → App configuration
├── 🔐 context/         → React Context providers
├── 🎯 features/        → Feature modules (main work area)
├── 🪝 hooks/           → Shared custom hooks
├── 📐 layouts/         → Page layouts
├── 📚 lib/             → Third-party configs
├── 🛣️  routes/          → Routing configuration
├── 🔌 services/        → API services
├── 🎨 styles/          → Global styles & theme
├── 📝 types/           → TypeScript types
└── 🛠️  utils/           → Utility functions
```

## 🎯 Most Common Tasks

### Adding a New Page

1. Create feature directory (if doesn't exist):
   ```bash
   mkdir -p src/features/my-feature/{components,hooks,services}
   ```

2. Create page component:
   ```tsx
   // src/features/my-feature/MyFeature.tsx
   export const MyFeature = () => {
     return <div>My Feature Page</div>;
   };
   ```

3. Add route:
   ```tsx
   // src/routes/index.tsx
   import { MyFeature } from '@/features/my-feature/MyFeature';

   // Add to routes array
   {
     path: '/my-feature',
     element: <MyFeature />
   }
   ```

4. Add to sidebar menu:
   ```tsx
   // src/components/layout/Sidebar.tsx
   // Add menu item to menuItems array
   ```

### Adding a Component

**For reusable components:**
```bash
# Location: src/components/{category}/ComponentName.tsx
src/components/common/Button.tsx
src/components/forms/TextField.tsx
src/components/ui/Modal.tsx
```

**For feature-specific components:**
```bash
# Location: src/features/{feature}/components/ComponentName.tsx
src/features/orders/components/OrderCard.tsx
```

### Adding API Service

**For shared API:**
```typescript
// src/services/api.ts
export const api = {
  get: async <T>(url: string): Promise<T> => { /* ... */ },
  post: async <T>(url: string, data: any): Promise<T> => { /* ... */ },
};
```

**For feature-specific API:**
```typescript
// src/features/orders/services/orders.service.ts
export const ordersService = {
  getOrders: async () => { /* ... */ },
  createOrder: async (data) => { /* ... */ },
};
```

### Adding a Custom Hook

**For shared hook:**
```typescript
// src/hooks/useDebounce.ts
export const useDebounce = <T>(value: T, delay: number): T => {
  // Hook implementation
};
```

**For feature-specific hook:**
```typescript
// src/features/orders/hooks/useOrders.ts
export const useOrders = () => {
  // Hook implementation
};
```

### Updating Theme Colors

```typescript
// src/styles/theme/themeConfig.ts
export const themeColors = {
  primary: '#FF6B35',      // Change this
  // ... other colors
};
```

All components using `themeColors.primary` will update automatically.

### Adding Utility Function

```typescript
// src/utils/formatters.ts (or create new file)
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};
```

## 📚 Import Path Aliases

Use these aliases for cleaner imports:

```typescript
import { Button } from '@/components/common/Button';
import { useAuth } from '@/context/AuthContext';
import { Login } from '@/features/auth/Login';
import { formatCurrency } from '@/utils/formatters';
import { themeColors } from '@/styles/theme/themeConfig';
import logoImage from '@/assets/images/logo.png';
```

**Available aliases:**
- `@/` → `src/`
- `@components/` → `src/components/`
- `@features/` → `src/features/`
- `@styles/` → `src/styles/`
- `@utils/` → `src/utils/`
- `@hooks/` → `src/hooks/`
- `@services/` → `src/services/`
- `@types/` → `src/types/`
- `@assets/` → `src/assets/`

## 🗺️ Feature Directory Structure

Each feature follows this pattern:

```
features/
└── feature-name/
    ├── components/         # Feature-specific components
    │   ├── FeatureCard.tsx
    │   └── FeatureForm.tsx
    ├── hooks/             # Feature-specific hooks
    │   └── useFeatureData.ts
    ├── services/          # Feature API services
    │   └── feature.service.ts
    ├── types.ts           # Feature types (optional)
    └── FeatureName.tsx    # Main page component
```

## 🎨 Styling

### Using Theme
```typescript
import { themeColors } from '@/styles/theme/themeConfig';
import { typography } from '@/styles/theme/typography';

const MyComponent = () => (
  <div style={{
    color: themeColors.primary,
    ...typography.h1,
  }}>
    Styled with theme
  </div>
);
```

### Theme Colors Available
- `primary`, `primaryLight`, `primaryDark`
- `background`, `surface`, `surfaceHover`
- `text`, `textSecondary`, `textTertiary`
- `border`, `borderLight`
- `success`, `error`, `warning`, `info`

### Typography Available
- `h1`, `h2`, `h3`, `h4`
- `body`, `bodyMedium`, `bodySmall`
- `label`, `labelSmall`
- `statValue`

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests
```typescript
// Component test
import { render, screen } from '@testing-library/react';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});

// Hook test
import { renderHook } from '@testing-library/react';
import { useMyHook } from './useMyHook';

describe('useMyHook', () => {
  it('returns expected value', () => {
    const { result } = renderHook(() => useMyHook());
    expect(result.current).toBe('expected');
  });
});
```

## 🔍 Finding Things

### Need to find...

**A specific component?**
```bash
# Search by name
find src/components -name "*Button*"

# Search in features
find src/features -name "*Card*"
```

**Where a function is used?**
```bash
# Search for usage
grep -r "functionName" src/
```

**All files importing something?**
```bash
# Find imports
grep -r "import.*from.*module" src/
```

## 📋 Code Conventions

### Naming
- **Components**: PascalCase (`UserProfile.tsx`)
- **Hooks**: camelCase with 'use' prefix (`useAuth.ts`)
- **Utils**: camelCase (`formatDate.ts`)
- **Types**: PascalCase (`User`, `OrderStatus`)
- **Folders**: lowercase with hyphens (`user-profile`)

### File Structure
```typescript
// 1. Imports (external first, then internal)
import { useState } from 'react';
import { Button } from 'antd';
import { useAuth } from '@/context/AuthContext';
import { themeColors } from '@/styles/theme/themeConfig';

// 2. Types/Interfaces
interface Props {
  name: string;
}

// 3. Component/Function
export const MyComponent = ({ name }: Props) => {
  // 4. Hooks
  const [state, setState] = useState('');
  const { user } = useAuth();

  // 5. Event handlers
  const handleClick = () => {
    // ...
  };

  // 6. Render
  return <div>{name}</div>;
};

// 7. Default export (if needed)
export default MyComponent;
```

### TypeScript
- Always define types for props
- Use interfaces for object shapes
- Use type for unions/primitives
- Avoid `any` - use `unknown` if needed

## 🐛 Common Issues

### Module not found
1. Check import path
2. Verify file exists
3. Check path alias configuration
4. Restart dev server

### Type errors
1. Check TypeScript version
2. Run `npm run type-check`
3. Check tsconfig.json
4. Ensure types are exported

### Build errors
1. Clear cache: `rm -rf node_modules/.vite`
2. Reinstall: `rm -rf node_modules && npm install`
3. Check for circular dependencies

## 📞 Getting Help

- **Documentation**: See `PROJECT_STRUCTURE.md`
- **Migration**: See `MIGRATION_GUIDE.md`
- **File locations**: See `FILE_MAPPING.md`
- **README files**: Each directory has a README
- **Team**: Ask in team chat

## ✅ Before Committing

```bash
# 1. Type check
npm run type-check

# 2. Lint
npm run lint

# 3. Format (if configured)
npm run format

# 4. Build
npm run build

# 5. Test affected features
npm run dev  # Manual testing
```

## 🎯 Quick Reference Commands

```bash
# Create new feature
mkdir -p src/features/my-feature/{components,hooks,services}

# Find component usage
grep -r "ComponentName" src/

# Count lines of code
find src -name "*.tsx" -o -name "*.ts" | xargs wc -l

# List all components
find src/components -name "*.tsx"

# List all features
ls src/features/

# Clear cache and restart
rm -rf node_modules/.vite && npm run dev
```

## 🚀 Pro Tips

1. **Use snippets**: Configure editor snippets for common patterns
2. **Import aliases**: Always use `@/` paths for clarity
3. **Colocate**: Keep related files together in features
4. **Type everything**: Better errors, better autocomplete
5. **Small components**: Break large components into smaller ones
6. **Custom hooks**: Extract logic into reusable hooks
7. **Comments**: Add JSDoc for exported functions
8. **README**: Update when you add major features

## 📖 Learning Resources

- React: https://react.dev
- TypeScript: https://www.typescriptlang.org/docs
- Ant Design: https://ant.design/components
- Vite: https://vitejs.dev
- React Router: https://reactrouter.com

Happy coding! 🎉
