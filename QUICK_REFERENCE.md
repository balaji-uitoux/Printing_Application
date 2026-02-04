# Quick Reference Card

Print this and keep on your desk! 📋

## 📁 Where Does It Go?

| What | Where | Example |
|------|-------|---------|
| **New Feature Page** | `features/{name}/Feature.tsx` | `features/orders/Orders.tsx` |
| **Feature Component** | `features/{name}/components/` | `features/orders/components/OrderCard.tsx` |
| **Reusable Component** | `components/{category}/` | `components/common/Button.tsx` |
| **Custom Hook (shared)** | `hooks/` | `hooks/useDebounce.ts` |
| **Custom Hook (feature)** | `features/{name}/hooks/` | `features/orders/hooks/useOrders.ts` |
| **API Service (shared)** | `services/` | `services/api.ts` |
| **API Service (feature)** | `features/{name}/services/` | `features/orders/services/orders.service.ts` |
| **Utility Function** | `utils/` | `utils/formatters.ts` |
| **Type Definition** | `types/` | `types/models.types.ts` |
| **Image** | `assets/images/` | `assets/images/logo.png` |
| **Icon** | `assets/icons/` | `assets/icons/printer.svg` |
| **Theme Config** | `styles/theme/` | `styles/theme/themeConfig.ts` |

## 🎯 Quick Commands

```bash
# Start dev server
npm run dev

# Build
npm run build

# Type check
npm run type-check

# Lint
npm run lint

# Create feature
mkdir -p src/features/my-feature/{components,hooks,services}

# Clear cache
rm -rf node_modules/.vite && npm run dev

# Find component
find src/components -name "*Button*"

# Find usage
grep -r "functionName" src/
```

## 🔤 Import Aliases

```typescript
@/              → src/
@components/    → src/components/
@features/      → src/features/
@styles/        → src/styles/
@utils/         → src/utils/
@hooks/         → src/hooks/
@services/      → src/services/
@types/         → src/types/
@assets/        → src/assets/
```

## 🎨 Theme Quick Reference

```typescript
import { themeColors } from '@/styles/theme/themeConfig';
import { typography } from '@/styles/theme/typography';

// Colors
themeColors.primary       // #FF6B35
themeColors.text          // #0F172A
themeColors.textSecondary // #64748B
themeColors.background    // #F8FAFC
themeColors.success       // #10B981
themeColors.error         // #EF4444

// Typography
typography.h1      // Large heading
typography.h2      // Medium heading
typography.body    // Body text
typography.label   // Small labels
```

## 📐 Component Template

```typescript
// features/my-feature/components/MyComponent.tsx
import { themeColors } from '@/styles/theme/themeConfig';

interface MyComponentProps {
  title: string;
  onClick?: () => void;
}

export const MyComponent = ({ title, onClick }: MyComponentProps) => {
  return (
    <div onClick={onClick}>
      <h2 style={{ color: themeColors.primary }}>{title}</h2>
    </div>
  );
};
```

## 🪝 Hook Template

```typescript
// hooks/useMyHook.ts
import { useState, useEffect } from 'react';

export const useMyHook = (param: string) => {
  const [data, setData] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Hook logic
  }, [param]);

  return { data, loading, error };
};
```

## 🔌 Service Template

```typescript
// features/my-feature/services/myFeature.service.ts
import { get, post } from '@/services/api';

export const myFeatureService = {
  getItems: async () => {
    return get('/items');
  },

  createItem: async (data: any) => {
    return post('/items', data);
  },
};
```

## ✅ Pre-Commit Checklist

- [ ] No TypeScript errors (`npm run type-check`)
- [ ] No lint errors (`npm run lint`)
- [ ] App builds (`npm run build`)
- [ ] App runs (`npm run dev`)
- [ ] Features tested manually
- [ ] No console errors
- [ ] Imports use aliases
- [ ] Theme colors used (no hardcoded colors)

## 🚫 Common Mistakes

❌ Hardcoding colors → ✅ Use themeColors
❌ Relative imports → ✅ Use path aliases (@/)
❌ Feature code in components/ → ✅ Use features/
❌ Duplicate components → ✅ Reuse existing
❌ Missing types → ✅ Define TypeScript types
❌ Using 'any' → ✅ Use proper types

## 📚 Documentation Files

```
PROJECT_STRUCTURE.md  → Full structure reference
DEVELOPER_GUIDE.md    → Daily development guide
MIGRATION_GUIDE.md    → How to migrate files
FILE_MAPPING.md       → Where each file goes
STRUCTURE_SUMMARY.md  → What was created
QUICK_REFERENCE.md    → This file!
```

## 🆘 Stuck?

1. Check directory README
2. Check DEVELOPER_GUIDE.md
3. Search similar files: `find src/ -name "*similar*"`
4. Ask the team

---

**Keep this handy!** 🎯
