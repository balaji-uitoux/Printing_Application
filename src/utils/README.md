# Utils Directory

Utility functions and helper modules that provide common functionality across the application.

## Structure

```
utils/
├── helpers.ts        # General helper functions
├── formatters.ts     # Data formatting utilities
├── validators.ts     # Validation utilities
├── constants.ts      # Application constants
├── date.ts           # Date/time utilities
└── string.ts         # String manipulation utilities
```

## When to add a utility here

Add utilities when:
- ✅ Pure functions (no side effects)
- ✅ Used across multiple features
- ✅ Provide generic, reusable functionality
- ✅ No React-specific logic (use hooks for that)

## Common Utility Categories

### Formatters (`formatters.ts`)

Format data for display:

```typescript
/**
 * Format number as currency
 */
export const formatCurrency = (
  amount: number,
  currency: string = 'USD'
): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Format date to readable string
 */
export const formatDate = (
  date: Date | string,
  format: 'short' | 'long' = 'short'
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (format === 'long') {
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  return dateObj.toLocaleDateString('en-US');
};

/**
 * Format file size
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};
```

### Validators (`validators.ts`)

Validate user input and data:

```typescript
/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

/**
 * Validate password strength
 */
export const isStrongPassword = (password: string): boolean => {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password)
  );
};

/**
 * Validate file type
 */
export const isValidFileType = (
  file: File,
  allowedTypes: string[]
): boolean => {
  return allowedTypes.includes(file.type);
};
```

### Helpers (`helpers.ts`)

General helper functions:

```typescript
/**
 * Generate unique ID
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Safely parse JSON
 */
export const safeJsonParse = <T>(
  json: string,
  fallback: T
): T => {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
};

/**
 * Debounce function execution
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Deep clone object
 */
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Group array by key
 */
export const groupBy = <T>(
  array: T[],
  key: keyof T
): Record<string, T[]> => {
  return array.reduce((result, item) => {
    const group = String(item[key]);
    if (!result[group]) {
      result[group] = [];
    }
    result[group].push(item);
    return result;
  }, {} as Record<string, T[]>);
};
```

### String Utilities (`string.ts`)

String manipulation functions:

```typescript
/**
 * Capitalize first letter
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Convert to title case
 */
export const toTitleCase = (str: string): string => {
  return str.replace(/\w\S*/g, (txt) =>
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};

/**
 * Truncate string
 */
export const truncate = (str: string, length: number): string => {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
};

/**
 * Slugify string
 */
export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

/**
 * Remove HTML tags
 */
export const stripHtml = (html: string): string => {
  return html.replace(/<[^>]*>/g, '');
};
```

### Date Utilities (`date.ts`)

Date manipulation functions:

```typescript
/**
 * Check if date is today
 */
export const isToday = (date: Date): boolean => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

/**
 * Get days difference between dates
 */
export const getDaysDiff = (date1: Date, date2: Date): number => {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Add days to date
 */
export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * Get relative time string
 */
export const getRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins} minutes ago`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hours ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays} days ago`;

  return date.toLocaleDateString();
};
```

## Best Practices

1. **Pure Functions**: Utils should be pure functions with no side effects
2. **Type Safety**: Always use TypeScript types
3. **Documentation**: Add JSDoc comments
4. **Testing**: Write unit tests for all utilities
5. **Single Responsibility**: Each function should do one thing well
6. **No React Dependencies**: Keep utils framework-agnostic

## Testing Utilities

```typescript
// formatters.test.ts
import { formatCurrency, formatDate } from './formatters';

describe('formatCurrency', () => {
  it('formats USD currency correctly', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
  });

  it('handles zero correctly', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });
});

describe('formatDate', () => {
  it('formats date in short format', () => {
    const date = new Date('2024-01-15');
    expect(formatDate(date, 'short')).toBe('1/15/2024');
  });
});
```

## Importing Utilities

```typescript
// Named imports
import { formatCurrency, formatDate } from '@/utils/formatters';
import { isValidEmail } from '@/utils/validators';
import { capitalize, slugify } from '@/utils/string';
```
