# Migration Guide - New Folder Structure

This guide helps developers migrate files from the old structure to the new organized structure.

## 📋 Migration Checklist

### Phase 1: Move Assets ✅ (Can be done immediately)

#### Images
```bash
# Move existing images to organized folders
mv src/assets/*.png src/assets/images/
mv src/assets/*.jpg src/assets/images/
mv src/assets/*.svg src/assets/images/ # (non-icon SVGs)
```

**Current Files:**
- ✅ `src/assets/image 86.png` → `src/assets/images/image-86.png` (rename for consistency)
- ✅ `src/assets/react.svg` → `src/assets/images/react.svg` OR delete if unused

### Phase 2: Move Theme Files ✅ (Can be done immediately)

```bash
# Move theme configuration
mv src/theme/* src/styles/theme/
```

**Files to migrate:**
- ✅ `src/theme/themeConfig.ts` → `src/styles/theme/themeConfig.ts`
- ✅ `src/theme/typography.ts` → `src/styles/theme/typography.ts`
- ✅ `src/theme/antdTheme.ts` → `src/styles/theme/antdTheme.ts`

**Update imports in all files:**
```typescript
// Old
import { themeColors } from '../theme/themeConfig';

// New
import { themeColors } from '@/styles/theme/themeConfig';
```

### Phase 3: Reorganize Pages into Features ⚠️ (Requires testing)

#### Auth Feature
```bash
# Create auth feature
mkdir -p src/features/auth/components
mkdir -p src/features/auth/hooks
mkdir -p src/features/auth/services

# Move login page
mv src/pages/Login/index.tsx src/features/auth/Login.tsx
```

**Files to migrate:**
- ✅ `src/pages/Login/index.tsx` → `src/features/auth/Login.tsx`
- ✅ `src/context/AuthContext.tsx` → Keep as is (global context)

#### Dashboard Feature
```bash
# Move dashboard
mv src/pages/Dashboard/index.tsx src/features/dashboard/Dashboard.tsx
```

**Files to migrate:**
- ✅ `src/pages/Dashboard/index.tsx` → `src/features/dashboard/Dashboard.tsx`

#### Enquiry Feature
```bash
# Move enquiry page and components
mv src/pages/Enquiry/index.tsx src/features/enquiry/Enquiry.tsx
mv src/components/enquiry/AddEnquiryDrawer.tsx src/features/enquiry/components/
```

**Files to migrate:**
- ✅ `src/pages/Enquiry/index.tsx` → `src/features/enquiry/Enquiry.tsx`
- ✅ `src/components/enquiry/AddEnquiryDrawer.tsx` → `src/features/enquiry/components/AddEnquiryDrawer.tsx`

### Phase 4: Move Layout Components ✅ (Can be done immediately)

Layout components stay in `/components/layout` (already correct):

**Files (no migration needed):**
- ✅ `src/components/layout/AppLayout.tsx` - Keep as is
- ✅ `src/components/layout/Header.tsx` - Keep as is
- ✅ `src/components/layout/Sidebar.tsx` - Keep as is

### Phase 5: Move Common Components ✅ (Can be done immediately)

Common components stay in `/components/common` (already correct):

**Files (no migration needed):**
- ✅ `src/components/common/Logo.tsx` - Keep as is

### Phase 6: Update Routes ⚠️ (Update after moving pages)

```typescript
// src/routes/index.tsx - Update imports

// Old imports
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Enquiry from '../pages/Enquiry';

// New imports
import { Login } from '../features/auth/Login';
import { Dashboard } from '../features/dashboard/Dashboard';
import { Enquiry } from '../features/enquiry/Enquiry';
```

### Phase 7: Move Global Styles ✅ (Can be done immediately)

```bash
# Move CSS files
mv src/index.css src/styles/index.css
# App.css can stay at root or move to styles
```

**Update imports:**
```typescript
// main.tsx
import './styles/index.css'; // instead of './index.css'
```

## 🔄 Migration Order (Recommended)

1. **Week 1: Assets & Theme** (Low Risk)
   - Move images to `/assets/images`
   - Move theme files to `/styles/theme`
   - Update all imports

2. **Week 2: Features Structure** (Medium Risk)
   - Create feature directories
   - Move pages to features
   - Keep old pages until routes are updated

3. **Week 3: Update Routes** (High Risk - Test thoroughly)
   - Update route imports
   - Test all page navigation
   - Remove old page directories

4. **Week 4: Future Features** (Ongoing)
   - Create new features in proper structure
   - Add services, hooks as needed

## 📝 Import Path Updates

After migration, update imports to use path aliases:

```typescript
// vite.config.ts
export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@features': '/src/features',
      '@styles': '/src/styles',
      '@utils': '/src/utils',
      '@hooks': '/src/hooks',
      '@services': '/src/services',
      '@types': '/src/types',
      '@assets': '/src/assets',
    },
  },
});
```

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@features/*": ["src/features/*"],
      "@styles/*": ["src/styles/*"],
      "@utils/*": ["src/utils/*"],
      "@hooks/*": ["src/hooks/*"],
      "@services/*": ["src/services/*"],
      "@types/*": ["src/types/*"],
      "@assets/*": ["src/assets/*"]
    }
  }
}
```

**Example usage:**
```typescript
// Instead of
import { themeColors } from '../../../styles/theme/themeConfig';
import { Logo } from '../../components/common/Logo';

// Use
import { themeColors } from '@styles/theme/themeConfig';
import { Logo } from '@components/common/Logo';
```

## 🧪 Testing After Migration

After each phase, run:

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build
npm run build

# Run app
npm run dev
```

## 🚨 Common Issues

### Issue: Import not found after migration

**Solution:**
1. Check if path alias is configured in `vite.config.ts` and `tsconfig.json`
2. Restart dev server after config changes
3. Clear cache: `rm -rf node_modules/.vite`

### Issue: Module not found

**Solution:**
1. Verify file was actually moved to new location
2. Check for typos in import path
3. Ensure file extension is included/excluded as required

### Issue: Circular dependencies

**Solution:**
1. Reorganize imports to break the cycle
2. Consider creating a barrel export file
3. Move shared types to `/types`

## 📊 Migration Progress Tracker

Create a file to track migration progress:

```markdown
# Migration Progress

## Completed ✅
- [ ] Assets organized
- [ ] Theme files moved
- [ ] Path aliases configured

## In Progress 🚧
- [ ] Auth feature created
- [ ] Dashboard feature created
- [ ] Enquiry feature created

## Pending ⏳
- [ ] Orders feature
- [ ] Customers feature
- [ ] Products feature
- [ ] Inventory feature
- [ ] Production feature
- [ ] Invoicing feature
- [ ] Reports feature
- [ ] Settings feature

## Blocked 🚫
- None
```

## 🎯 Post-Migration Cleanup

After successful migration:

1. Remove old empty directories
2. Update documentation
3. Create new feature template
4. Update onboarding docs for new developers

```bash
# Remove old empty directories
rm -rf src/pages
rm -rf src/theme
```

## 💡 Tips

1. **Commit frequently**: Commit after each successful phase
2. **Test thoroughly**: Don't move multiple things at once
3. **Keep old structure temporarily**: Keep both old and new until fully tested
4. **Update documentation**: Update README as you go
5. **Team communication**: Inform team before major migrations
6. **Branch strategy**: Do migration in a separate branch

## 🆘 Rollback Plan

If migration causes issues:

1. **Git revert**:
   ```bash
   git revert <commit-hash>
   ```

2. **Restore from backup**:
   ```bash
   git checkout <previous-commit> -- src/
   ```

3. **Incremental rollback**: Revert one phase at a time
