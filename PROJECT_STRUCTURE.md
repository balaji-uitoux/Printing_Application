# Printing Press App - Project Structure

## Overview
This document outlines the folder structure and organization of the Printing Press application, making it easy for new developers to navigate and contribute to the project.

## 📁 Folder Structure

```
src/
├── assets/                    # Static assets (images, icons, fonts)
│   ├── icons/                # SVG icons and icon components
│   ├── images/               # PNG, JPG, and other image files
│   └── fonts/                # Custom font files
│
├── components/               # Reusable UI components
│   ├── common/              # Shared components used across the app
│   │   └── Logo.tsx
│   ├── forms/               # Form-related components
│   │   └── (form fields, validation components)
│   ├── layout/              # Layout components
│   │   ├── AppLayout.tsx
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx
│   └── ui/                  # UI elements (buttons, cards, modals, drawers)
│       └── (modals, drawers, cards, etc.)
│
├── config/                   # Application configuration
│   ├── constants.ts         # App-wide constants
│   └── env.ts               # Environment variables
│
├── context/                  # React Context providers
│   └── AuthContext.tsx      # Authentication context
│
├── features/                 # Feature-based modules (organized by domain)
│   ├── auth/                # Authentication feature
│   │   ├── components/      # Auth-specific components
│   │   ├── hooks/           # Auth-specific hooks
│   │   ├── services/        # Auth API services
│   │   └── Login.tsx        # Login page
│   │
│   ├── dashboard/           # Dashboard feature
│   │   ├── components/      # Dashboard-specific components
│   │   └── Dashboard.tsx    # Dashboard page
│   │
│   ├── enquiry/             # Enquiry management feature
│   │   ├── components/      # Enquiry-specific components
│   │   │   └── AddEnquiryDrawer.tsx
│   │   ├── hooks/           # Enquiry-specific hooks
│   │   ├── services/        # Enquiry API services
│   │   └── Enquiry.tsx      # Enquiry page
│   │
│   ├── orders/              # Orders management feature
│   ├── customers/           # Customer management feature
│   ├── products/            # Product management feature
│   ├── inventory/           # Inventory management feature
│   ├── production/          # Production management feature
│   ├── invoicing/           # Invoicing feature
│   ├── reports/             # Reports feature
│   └── settings/            # Settings feature
│
├── hooks/                    # Custom React hooks (shared across features)
│   ├── useAuth.ts
│   ├── useDebounce.ts
│   └── useFetch.ts
│
├── layouts/                  # Page layout wrappers
│   ├── AuthLayout.tsx       # Layout for auth pages
│   └── DashboardLayout.tsx  # Layout for dashboard pages
│
├── lib/                      # Third-party library configurations
│   └── antd.config.ts
│
├── routes/                   # Routing configuration
│   └── index.tsx            # Main router configuration
│
├── services/                 # API services (shared across features)
│   ├── api.ts               # Base API configuration
│   └── http.ts              # HTTP client setup
│
├── styles/                   # Global styles and theme
│   ├── theme/               # Theme configuration
│   │   ├── themeConfig.ts   # Color palette
│   │   ├── typography.ts    # Typography system
│   │   └── antdTheme.ts     # Ant Design theme
│   ├── global.css           # Global CSS styles
│   └── index.css            # Root styles
│
├── types/                    # TypeScript type definitions
│   ├── index.ts             # Shared types
│   ├── api.types.ts         # API response types
│   └── models.types.ts      # Data model types
│
├── utils/                    # Utility functions
│   ├── helpers.ts           # General helper functions
│   ├── formatters.ts        # Data formatting utilities
│   └── validators.ts        # Validation utilities
│
├── App.tsx                   # Main App component
├── App.css                   # App-specific styles
└── main.tsx                  # Application entry point
```

## 📋 Directory Descriptions

### `/assets`
Static files like images, icons, and fonts. Organized by type for easy access.

### `/components`
Reusable UI components that can be used across different features:
- **common/**: Basic shared components (Logo, Button, etc.)
- **forms/**: Form-related components (InputField, SelectField, etc.)
- **layout/**: Layout components (Header, Sidebar, Footer)
- **ui/**: UI elements (Modal, Drawer, Card, etc.)

### `/config`
Application configuration files, constants, and environment variables.

### `/context`
React Context providers for global state management.

### `/features`
Feature-based organization following domain-driven design. Each feature is self-contained with its own:
- Components (feature-specific)
- Hooks (feature-specific)
- Services (feature-specific APIs)
- Pages

**Benefits:**
- Easy to locate all code related to a specific feature
- Encourages code modularity
- Makes it easier to add/remove features
- Clear separation of concerns

### `/hooks`
Custom React hooks that are shared across multiple features.

### `/layouts`
Page layout wrappers that define the structure of different page types.

### `/lib`
Third-party library configurations and wrappers.

### `/routes`
Routing configuration and route definitions.

### `/services`
API services and HTTP client setup shared across the application.

### `/styles`
Global styles, theme configuration, and design system:
- **theme/**: Color palette, typography, Ant Design customization
- **global.css**: Global CSS rules
- **index.css**: Root styles and CSS imports

### `/types`
TypeScript type definitions and interfaces:
- Shared types used across features
- API response types
- Data model types

### `/utils`
Utility functions and helpers:
- General helper functions
- Data formatting utilities
- Validation utilities

## 🎯 Naming Conventions

### Files
- **Components**: PascalCase (e.g., `AddEnquiryDrawer.tsx`)
- **Hooks**: camelCase with 'use' prefix (e.g., `useAuth.ts`)
- **Utils**: camelCase (e.g., `formatters.ts`)
- **Types**: camelCase with '.types' suffix (e.g., `api.types.ts`)
- **Styles**: kebab-case (e.g., `global.css`)

### Folders
- Use lowercase with hyphens for multi-word folders
- Keep folder names singular (e.g., `component` not `components` for feature folders)
- Use plural for collection folders (e.g., `components/`, `hooks/`)

## 🚀 Benefits of This Structure

1. **Scalability**: Easy to add new features without cluttering existing code
2. **Discoverability**: New developers can quickly find what they need
3. **Maintainability**: Related code is grouped together
4. **Testability**: Each feature can have its own test files
5. **Reusability**: Common components are easily accessible
6. **Clear Boundaries**: Each feature is self-contained

## 📖 Quick Navigation Guide

### Need to...
- **Add a new page?** → Create it in `/features/{feature-name}/`
- **Create a reusable component?** → Add to `/components/{category}/`
- **Add a custom hook?** → `/hooks/` (if shared) or `/features/{feature}/hooks/` (if feature-specific)
- **Modify theme colors?** → `/styles/theme/themeConfig.ts`
- **Add API endpoint?** → `/features/{feature}/services/` or `/services/` (if shared)
- **Add icons/images?** → `/assets/icons/` or `/assets/images/`
- **Define types?** → `/types/` (if shared) or `/features/{feature}/types.ts` (if feature-specific)
- **Add utility function?** → `/utils/`

## 🔄 Migration Status

This structure represents the planned organization. Files will be migrated gradually to maintain application stability.
