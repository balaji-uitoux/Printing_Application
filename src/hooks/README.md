# Hooks Directory

This directory contains custom React hooks that are **shared across multiple features**. Feature-specific hooks should live in their respective feature directories.

## When to add a hook here

Add a hook to this directory when:
- ✅ Used by **2 or more features**
- ✅ Provides **generic, reusable** functionality
- ✅ Not tied to specific business logic

Keep in feature directory when:
- ❌ Hook is feature-specific
- ❌ Only used in one feature

## Common Shared Hooks

### Data Fetching
- `useFetch.ts` - Generic data fetching hook
- `useApi.ts` - API request wrapper
- `usePagination.ts` - Pagination logic

### Form Management
- `useForm.ts` - Form state management
- `useFormValidation.ts` - Form validation
- `useDebounce.ts` - Debounce user input

### UI/UX
- `useToggle.ts` - Toggle boolean state
- `useModal.ts` - Modal state management
- `useToast.ts` - Toast notifications
- `useLocalStorage.ts` - Local storage sync
- `useMediaQuery.ts` - Responsive breakpoints

### Authentication
- `useAuth.ts` - Authentication state
- `usePermissions.ts` - User permissions

### Utils
- `useDebounce.ts` - Debounce values
- `useThrottle.ts` - Throttle function calls
- `useClickOutside.ts` - Detect clicks outside element
- `useCopyToClipboard.ts` - Copy text to clipboard

## Hook Naming Convention

- Always prefix with `use` (e.g., `useAuth`, `useFetch`)
- Use descriptive names that indicate what the hook does
- Use camelCase

## Example Hook Structure

```typescript
// useDebounce.ts
import { useEffect, useState } from 'react';

/**
 * Debounces a value by delaying updates
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced value
 */
export const useDebounce = <T>(value: T, delay: number = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Usage example:
// const debouncedSearch = useDebounce(searchTerm, 300);
```

## Best Practices

1. **Type Safety**: Always use TypeScript generics when appropriate
2. **Documentation**: Add JSDoc comments explaining parameters and return values
3. **Dependencies**: Clearly specify dependencies in useEffect
4. **Testing**: Write unit tests for complex hooks
5. **Error Handling**: Handle errors gracefully
6. **Cleanup**: Return cleanup functions when needed (timeouts, subscriptions)

## Testing Hooks

Use React Testing Library's `renderHook` utility:

```typescript
import { renderHook } from '@testing-library/react';
import { useDebounce } from './useDebounce';

test('debounces value', async () => {
  const { result, rerender } = renderHook(
    ({ value }) => useDebounce(value, 100),
    { initialProps: { value: 'initial' } }
  );

  expect(result.current).toBe('initial');

  rerender({ value: 'updated' });
  expect(result.current).toBe('initial'); // Not updated yet

  await waitFor(() => {
    expect(result.current).toBe('updated');
  });
});
```
