# Services Directory

This directory contains API services and HTTP client configuration that are **shared across multiple features**. Feature-specific API services should live in their respective feature directories.

## Structure

```
services/
├── api.ts           # Base API configuration
├── http.ts          # HTTP client setup (axios/fetch)
└── README.md        # This file
```

## When to add a service here

Add a service to this directory when:
- ✅ Used by **multiple features**
- ✅ Provides **shared API functionality**
- ✅ Contains **common HTTP logic**

Keep in feature directory when:
- ❌ API calls are feature-specific
- ❌ Only used within one feature

## Base HTTP Client (`http.ts`)

Configure your HTTP client (axios, fetch wrapper, etc.):

```typescript
// http.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Create axios instance
const httpClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
httpClient.interceptors.request.use(
  (config) => {
    // Add auth token
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Redirect to login
      window.location.href = '/login';
    }

    if (error.response?.status === 500) {
      console.error('Server error:', error);
    }

    return Promise.reject(error);
  }
);

export default httpClient;
```

## API Service (`api.ts`)

Common API utility functions:

```typescript
// api.ts
import httpClient from './http';

/**
 * Generic GET request
 */
export const get = async <T>(url: string, config?: any): Promise<T> => {
  const response = await httpClient.get<T>(url, config);
  return response.data;
};

/**
 * Generic POST request
 */
export const post = async <T>(
  url: string,
  data?: any,
  config?: any
): Promise<T> => {
  const response = await httpClient.post<T>(url, data, config);
  return response.data;
};

/**
 * Generic PUT request
 */
export const put = async <T>(
  url: string,
  data?: any,
  config?: any
): Promise<T> => {
  const response = await httpClient.put<T>(url, data, config);
  return response.data;
};

/**
 * Generic PATCH request
 */
export const patch = async <T>(
  url: string,
  data?: any,
  config?: any
): Promise<T> => {
  const response = await httpClient.patch<T>(url, data, config);
  return response.data;
};

/**
 * Generic DELETE request
 */
export const del = async <T>(url: string, config?: any): Promise<T> => {
  const response = await httpClient.delete<T>(url, config);
  return response.data;
};

/**
 * Upload file
 */
export const uploadFile = async (
  url: string,
  file: File,
  onProgress?: (progress: number) => void
): Promise<any> => {
  const formData = new FormData();
  formData.append('file', file);

  return httpClient.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgress(progress);
      }
    },
  });
};
```

## Feature-Specific Services

Feature services should live in their feature directory:

```typescript
// features/enquiry/services/enquiry.service.ts
import { get, post, put, del } from '@/services/api';
import { Enquiry, CreateEnquiryDto, UpdateEnquiryDto } from '../types';

const BASE_URL = '/enquiries';

export const enquiryService = {
  /**
   * Get all enquiries
   */
  getEnquiries: async (): Promise<Enquiry[]> => {
    return get<Enquiry[]>(BASE_URL);
  },

  /**
   * Get enquiry by ID
   */
  getEnquiryById: async (id: string): Promise<Enquiry> => {
    return get<Enquiry>(`${BASE_URL}/${id}`);
  },

  /**
   * Create new enquiry
   */
  createEnquiry: async (data: CreateEnquiryDto): Promise<Enquiry> => {
    return post<Enquiry>(BASE_URL, data);
  },

  /**
   * Update enquiry
   */
  updateEnquiry: async (
    id: string,
    data: UpdateEnquiryDto
  ): Promise<Enquiry> => {
    return put<Enquiry>(`${BASE_URL}/${id}`, data);
  },

  /**
   * Delete enquiry
   */
  deleteEnquiry: async (id: string): Promise<void> => {
    return del<void>(`${BASE_URL}/${id}`);
  },

  /**
   * Search enquiries
   */
  searchEnquiries: async (query: string): Promise<Enquiry[]> => {
    return get<Enquiry[]>(`${BASE_URL}/search`, { params: { q: query } });
  },
};
```

## Error Handling

Create a standard error handling utility:

```typescript
// services/errorHandler.ts
import { AxiosError } from 'axios';

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: any;
}

export const handleApiError = (error: unknown): ApiError => {
  if (error instanceof AxiosError) {
    return {
      message: error.response?.data?.message || error.message,
      code: error.response?.data?.code,
      status: error.response?.status,
      details: error.response?.data,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
    };
  }

  return {
    message: 'An unknown error occurred',
  };
};
```

## Using Services in Components

```typescript
// features/enquiry/Enquiry.tsx
import { useEffect, useState } from 'react';
import { enquiryService } from './services/enquiry.service';
import { Enquiry } from './types';
import { handleApiError } from '@/services/errorHandler';

export const EnquiryPage = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEnquiries = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await enquiryService.getEnquiries();
        setEnquiries(data);
      } catch (err) {
        const apiError = handleApiError(err);
        setError(apiError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiries();
  }, []);

  // Render component...
};
```

## Best Practices

1. **Type Safety**: Always define request/response types
2. **Error Handling**: Use consistent error handling
3. **Loading States**: Track loading state for better UX
4. **Caching**: Consider using React Query or SWR for data caching
5. **Retry Logic**: Implement retry for failed requests
6. **Cancellation**: Cancel requests on component unmount
7. **Environment Variables**: Use env vars for API URLs

## Environment Variables

```env
# .env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_API_TIMEOUT=30000
```

```typescript
// Access in code
const apiUrl = import.meta.env.VITE_API_BASE_URL;
```

## Advanced: Using React Query

For better data management, consider React Query:

```typescript
// hooks/useEnquiries.ts
import { useQuery } from '@tanstack/react-query';
import { enquiryService } from '@/features/enquiry/services/enquiry.service';

export const useEnquiries = () => {
  return useQuery({
    queryKey: ['enquiries'],
    queryFn: enquiryService.getEnquiries,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
};

// Usage
const { data, isLoading, error } = useEnquiries();
```

## Testing Services

```typescript
// enquiry.service.test.ts
import { enquiryService } from './enquiry.service';
import httpClient from '@/services/http';

jest.mock('@/services/http');

describe('EnquiryService', () => {
  it('fetches enquiries successfully', async () => {
    const mockData = [{ id: '1', title: 'Test' }];
    (httpClient.get as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await enquiryService.getEnquiries();

    expect(result).toEqual(mockData);
    expect(httpClient.get).toHaveBeenCalledWith('/enquiries');
  });

  it('handles errors correctly', async () => {
    const errorMessage = 'Network Error';
    (httpClient.get as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(enquiryService.getEnquiries()).rejects.toThrow(errorMessage);
  });
});
```
