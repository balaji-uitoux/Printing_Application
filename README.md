# PrintPress - Printing Press Management Application

A modern web application for managing printing press operations, built with React, TypeScript, and Ant Design.

## Features

- **Custom Theme System** - Single-source theme configuration for easy color customization
- **Responsive Layout** - Collapsible sidebar navigation that adapts to all screen sizes
- **Dashboard** - Overview with key metrics and statistics
- **Enquiry Management** - Full-featured enquiry list with search, filters, and pagination
- **Future-Ready** - Menu structure prepared for Orders, Customers, Products, Inventory, Production, Invoicing, Reports, and Settings

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone or navigate to the project directory:
   ```bash
   cd printing-press-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

### Login

The login page has no validation (as per requirements). You can enter any username and password to access the application.

## Changing the Theme Color

**One of the key features of this application is the ability to change the entire color theme by modifying a single file.**

### Steps to Change Theme Colors:

1. Open the file: **`src/theme/themeConfig.ts`**

2. Modify the `primary` color (or any other color):
   ```typescript
   export const themeColors = {
     primary: '#2563eb',  // Change this to your desired color
     // ... other colors
   };
   ```

3. Save the file - the changes will be reflected immediately (hot reload)

### Example Color Changes:

- **Blue Theme** (default): `#2563eb`
- **Purple Theme**: `#9333ea`
- **Green Theme**: `#10b981`
- **Red Theme**: `#ef4444`
- **Orange Theme**: `#f97316`

All Ant Design components, buttons, active menu items, tags, and UI elements will automatically update to use the new color!

## Project Structure

```
printing-press-app/
├── src/
│   ├── components/
│   │   └── layout/         # Layout components (Sidebar, Header, AppLayout)
│   ├── context/            # React Context (AuthContext)
│   ├── pages/              # Page components (Login, Dashboard, Enquiry)
│   ├── routes/             # React Router configuration
│   ├── theme/              # Theme configuration
│   │   ├── themeConfig.ts  # SINGLE SOURCE for all colors
│   │   └── antdTheme.ts    # Ant Design theme setup
│   ├── types/              # TypeScript type definitions
│   ├── App.tsx             # Root component
│   └── main.tsx            # Entry point
├── package.json
└── README.md
```

## Current Implementation

### Fully Implemented Pages:

1. **Login** - Simple login form (no validation)
2. **Dashboard** - Statistics cards and overview
3. **Enquiry** - Full table with:
   - 12 sample enquiries
   - Search functionality
   - Column sorting
   - Status filters
   - Product type filters
   - Pagination
   - View/Edit actions

### Placeholder Pages:

The following menu items are visible in the sidebar but route to placeholder pages:
- Orders
- Customers
- Products
- Inventory
- Production
- Invoicing
- Reports
- Settings

These can be implemented in future phases.

## Available Scripts

### `npm run dev`
Starts the development server with hot reload.

### `npm run build`
Builds the application for production.

### `npm run preview`
Preview the production build locally.

### `npm run lint`
Run ESLint to check code quality.

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Ant Design 5** - UI component library
- **React Router 6** - Routing
- **@ant-design/icons** - Icon library

## Menu Structure

1. **Dashboard** (✅ Implemented) - Overview, stats, recent orders
2. **Enquiry** (✅ Implemented) - Customer enquiries and quotes
3. **Orders** (📝 Placeholder) - Job orders and tracking
4. **Customers** (📝 Placeholder) - Customer management
5. **Products** (📝 Placeholder) - Print products catalog
6. **Inventory** (📝 Placeholder) - Paper stock, ink, materials
7. **Production** (📝 Placeholder) - Job scheduling and machine allocation
8. **Invoicing** (📝 Placeholder) - Billing and payments
9. **Reports** (📝 Placeholder) - Analytics and reports
10. **Settings** (📝 Placeholder) - System configuration

## Customization Guide

### Adding New Menu Items

1. Edit `src/components/layout/Sidebar.tsx`
2. Add new item to `menuItems` array
3. Create corresponding route in `src/routes/index.tsx`
4. Create page component in `src/pages/`

### Modifying Theme Beyond Colors

Edit `src/theme/antdTheme.ts` to customize:
- Font sizes
- Border radius
- Component-specific styles
- Layout spacing

### Adding New Pages

1. Create component in `src/pages/YourPage/index.tsx`
2. Add route in `src/routes/index.tsx`
3. Add menu item in `src/components/layout/Sidebar.tsx`

## License

This project is created for demonstration purposes.

## Support

For issues or questions, please contact the development team.
# Printing_Application
