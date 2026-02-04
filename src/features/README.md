# Features Directory

This directory contains feature-based modules organized by business domain. Each feature is self-contained and follows a consistent structure.

## Available Features

- **auth** - Authentication and authorization
- **dashboard** - Main dashboard and overview
- **enquiry** - Enquiry management
- **orders** - Order processing and management
- **customers** - Customer relationship management
- **products** - Product catalog management
- **inventory** - Inventory tracking
- **production** - Production management
- **invoicing** - Invoice generation and management
- **reports** - Reporting and analytics
- **settings** - Application settings

## Feature Structure

Each feature should follow this structure:

```
feature-name/
├── components/         # Feature-specific components
│   └── ComponentName.tsx
├── hooks/             # Feature-specific custom hooks
│   └── useFeatureName.ts
├── services/          # Feature-specific API services
│   └── featureName.service.ts
├── types.ts           # Feature-specific TypeScript types (optional)
├── constants.ts       # Feature-specific constants (optional)
└── FeatureName.tsx    # Main page/entry component
```

## Guidelines

### When to create a new feature:
- ✅ Represents a distinct business domain or capability
- ✅ Has its own navigation/route
- ✅ Contains related functionality that belongs together
- ✅ Can be developed/maintained independently

### Feature Organization Rules:

1. **Keep it self-contained**: Everything related to the feature should live within its directory
2. **Share when necessary**: If a component is used by 2+ features, move it to `/components`
3. **Use feature-specific types**: Define types in `types.ts` or inline with components
4. **API services**: Feature-specific API calls go in `services/`
5. **Custom hooks**: Feature-specific hooks go in `hooks/`

## Example: Enquiry Feature

```
enquiry/
├── components/
│   ├── AddEnquiryDrawer.tsx      # Add new enquiry form
│   ├── EnquiryTable.tsx           # Enquiry list table
│   └── EnquiryFilters.tsx         # Filter controls
├── hooks/
│   ├── useEnquiries.ts            # Fetch enquiries data
│   └── useAddEnquiry.ts           # Add enquiry mutation
├── services/
│   └── enquiry.service.ts         # API calls (getEnquiries, addEnquiry, etc.)
├── types.ts                       # Enquiry, EnquiryStatus, etc.
└── Enquiry.tsx                    # Main enquiry page
```

## Creating a New Feature

1. Create the feature directory: `mkdir -p features/new-feature/{components,hooks,services}`
2. Create the main page component: `features/new-feature/NewFeature.tsx`
3. Add route in `/routes/index.tsx`
4. Add menu item in `/components/layout/Sidebar.tsx`
5. Implement feature-specific components, hooks, and services

## Best Practices

### Components
- Use descriptive names that reflect their purpose
- Keep components focused on a single responsibility
- Extract reusable logic into custom hooks

### Hooks
- Prefix with `use` (e.g., `useEnquiries`, `useAddOrder`)
- Handle loading and error states
- Return data in a consistent format

### Services
- Use `.service.ts` suffix
- Group related API calls together
- Handle API errors consistently
- Return typed responses

### Types
- Define in `types.ts` or inline
- Use descriptive names
- Export for use in other features if needed

## Communication Between Features

If features need to share state or communicate:
1. **Context**: Use React Context (in `/context`)
2. **Props**: Pass data through shared parent component
3. **URL State**: Use URL parameters for shareable state
4. **Global State**: Consider using a state management library (if needed)

## Testing

- Add unit tests for components in `__tests__/` subdirectory
- Test hooks using React Testing Library
- Mock API services in tests

## Example Feature Component

```tsx
// features/enquiry/Enquiry.tsx
import { useState } from 'react';
import { EnquiryTable } from './components/EnquiryTable';
import { AddEnquiryDrawer } from './components/AddEnquiryDrawer';
import { useEnquiries } from './hooks/useEnquiries';

export const Enquiry = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { enquiries, isLoading, error } = useEnquiries();

  return (
    <div>
      <h1>Enquiries</h1>
      <button onClick={() => setIsDrawerOpen(true)}>Add Enquiry</button>

      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {enquiries && <EnquiryTable data={enquiries} />}

      <AddEnquiryDrawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};
```
