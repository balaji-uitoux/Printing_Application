# File Mapping - Old Structure to New Structure

This document maps every existing file to its new location in the reorganized structure.

## 📄 Complete File Mapping

### Root Files (No Change)
```
✅ src/App.tsx                    → src/App.tsx
✅ src/App.css                    → src/App.css (or src/styles/App.css)
✅ src/main.tsx                   → src/main.tsx
```

### Assets
```
📦 OLD LOCATION                           → 🎯 NEW LOCATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
src/assets/image 86.png            → src/assets/images/image-86.png
src/assets/react.svg               → src/assets/images/react.svg (or delete)
```

### Theme / Styles
```
📦 OLD LOCATION                           → 🎯 NEW LOCATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
src/theme/themeConfig.ts           → src/styles/theme/themeConfig.ts
src/theme/typography.ts            → src/styles/theme/typography.ts
src/theme/antdTheme.ts             → src/styles/theme/antdTheme.ts
src/index.css                      → src/styles/index.css
```

### Context (No Change - Global)
```
✅ src/context/AuthContext.tsx    → src/context/AuthContext.tsx (keep as is)
```

### Types (No Change)
```
✅ src/types/index.ts              → src/types/index.ts
```

### Routes (No Change in Location, Update Imports)
```
✅ src/routes/index.tsx            → src/routes/index.tsx (update imports)
```

### Components

#### Layout Components (No Change)
```
✅ src/components/layout/AppLayout.tsx  → src/components/layout/AppLayout.tsx
✅ src/components/layout/Header.tsx     → src/components/layout/Header.tsx
✅ src/components/layout/Sidebar.tsx    → src/components/layout/Sidebar.tsx
```

#### Common Components (No Change)
```
✅ src/components/common/Logo.tsx       → src/components/common/Logo.tsx
```

#### Feature Components (Move to Features)
```
📦 OLD LOCATION                                    → 🎯 NEW LOCATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
src/components/enquiry/AddEnquiryDrawer.tsx → src/features/enquiry/components/AddEnquiryDrawer.tsx
```

### Pages → Features

#### Authentication
```
📦 OLD LOCATION                           → 🎯 NEW LOCATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
src/pages/Login/index.tsx          → src/features/auth/Login.tsx
```

#### Dashboard
```
📦 OLD LOCATION                           → 🎯 NEW LOCATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
src/pages/Dashboard/index.tsx      → src/features/dashboard/Dashboard.tsx
```

#### Enquiry
```
📦 OLD LOCATION                           → 🎯 NEW LOCATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
src/pages/Enquiry/index.tsx        → src/features/enquiry/Enquiry.tsx
```

## 📋 Import Update Reference

### Theme Imports
```typescript
// ❌ OLD
import { themeColors } from '../theme/themeConfig';
import { typography } from '../theme/typography';
import { antdTheme } from '../theme/antdTheme';

// ✅ NEW
import { themeColors } from '@/styles/theme/themeConfig';
import { typography } from '@/styles/theme/typography';
import { antdTheme } from '@/styles/theme/antdTheme';
```

### Component Imports
```typescript
// ❌ OLD (from pages)
import { AddEnquiryDrawer } from '../../components/enquiry/AddEnquiryDrawer';

// ✅ NEW (from features)
import { AddEnquiryDrawer } from '../components/AddEnquiryDrawer';
// OR with alias
import { AddEnquiryDrawer } from '@/features/enquiry/components/AddEnquiryDrawer';
```

### Page Imports (in routes)
```typescript
// ❌ OLD
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Enquiry from '../pages/Enquiry';

// ✅ NEW
import { Login } from '@/features/auth/Login';
import { Dashboard } from '@/features/dashboard/Dashboard';
import { Enquiry } from '@/features/enquiry/Enquiry';
```

### Context Imports (No Change)
```typescript
// ✅ STAYS THE SAME
import { useAuth } from '../context/AuthContext';
// OR with alias
import { useAuth } from '@/context/AuthContext';
```

### Types Imports (No Change)
```typescript
// ✅ STAYS THE SAME
import type { MenuItem } from '../../types';
// OR with alias
import type { MenuItem } from '@/types';
```

## 🗂️ Directory Removal Plan

After successful migration, remove these empty directories:

```bash
# Remove old page directories
rm -rf src/pages/Login
rm -rf src/pages/Dashboard
rm -rf src/pages/Enquiry
rm -rf src/pages  # If empty

# Remove old theme directory
rm -rf src/theme

# Remove old component directories (if empty)
rm -rf src/components/enquiry  # If empty
```

## 📊 Migration Statistics

### Current Structure
- **Total Files**: ~18 TypeScript/React files
- **Total Directories**: 13 directories
- **Files to Move**: ~8 files
- **Files to Keep**: ~10 files
- **Imports to Update**: ~50-60 import statements

### New Structure
- **Total Directories**: 50+ directories (including empty feature folders)
- **Organized by**: Business domain (features)
- **Scalability**: Ready for 100+ files

## 🎯 Files Affected by Import Updates

These files contain imports that need updating:

### Files with Theme Imports
1. ✅ `src/App.tsx`
2. ✅ `src/components/common/Logo.tsx`
3. ✅ `src/components/layout/Header.tsx`
4. ✅ `src/components/layout/Sidebar.tsx`
5. ✅ `src/components/enquiry/AddEnquiryDrawer.tsx`
6. ✅ `src/pages/Login/index.tsx`
7. ✅ `src/pages/Dashboard/index.tsx`
8. ✅ `src/pages/Enquiry/index.tsx`

### Files with Page Imports
1. ✅ `src/routes/index.tsx`
2. ✅ `src/App.tsx`

### Files with Component Imports
1. ✅ `src/pages/Enquiry/index.tsx` (imports AddEnquiryDrawer)
2. ✅ `src/components/layout/Header.tsx` (may import Logo)
3. ✅ `src/components/layout/AppLayout.tsx` (imports Header, Sidebar)

## ✅ Verification Checklist

After migration, verify:

- [ ] All files are in their new locations
- [ ] No broken imports
- [ ] App builds successfully (`npm run build`)
- [ ] App runs without errors (`npm run dev`)
- [ ] All routes work correctly
- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] All features function as before
- [ ] Old directories are removed
- [ ] Documentation is updated

## 🔍 Quick Find Commands

Find files that need updating:

```bash
# Find all files importing from old theme location
grep -r "from '../theme" src/

# Find all files importing from old theme location (absolute)
grep -r "from '../../theme" src/

# Find all files importing pages
grep -r "from '../pages" src/

# Find all TypeScript/React files
find src/ -name "*.tsx" -o -name "*.ts"

# Count import statements to update
grep -r "import.*from.*theme" src/ | wc -l
```

## 📝 Notes

1. **Path Aliases**: Configure in both `vite.config.ts` and `tsconfig.json`
2. **Restart Required**: Restart dev server after moving files
3. **Cache**: Clear Vite cache if issues: `rm -rf node_modules/.vite`
4. **Git**: Use `git mv` to preserve file history
5. **Testing**: Test each feature after migration before moving to next
