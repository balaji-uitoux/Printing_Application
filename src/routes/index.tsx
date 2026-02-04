import { createBrowserRouter, Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';
import AppLayout from '../components/layout/AppLayout';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Enquiry from '../pages/Enquiry';
import Quotations from '../pages/Quotations';
import CreateQuotation from '../pages/CreateQuotation';
import Locations from '../features/masters/locations/Locations';
import Clients from '../features/masters/clients/Clients';
import ProductCategories from '../features/masters/product-categories/ProductCategories';
import Products from '../features/masters/products/Products';
import Boards from '../features/masters/boards/Boards';
import Users from '../features/masters/users/Users';
import Machines from '../features/masters/machines/Machines';
import Shifts from '../features/masters/shifts/Shifts';
import ProductionStages from '../features/masters/production-stages/ProductionStages';
import Dies from '../features/masters/dies/Dies';
import Plates from '../features/masters/plates/Plates';
import RejectionReasons from '../features/masters/rejection-reasons/RejectionReasons';
import { themeColors } from '../theme/themeConfig';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

// Placeholder component for unimplemented pages
const PlaceholderPage = ({ title }: { title: string }) => (
  <div
    style={{
      padding: '48px',
      textAlign: 'center',
      background: themeColors.surface,
      borderRadius: '12px',
      border: `1px solid ${themeColors.borderLight}`,
      minHeight: '400px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <div
      style={{
        fontSize: '64px',
        marginBottom: '24px',
      }}
    >
      🚧
    </div>
    <h1
      style={{
        fontSize: '32px',
        fontWeight: 600,
        color: themeColors.text,
        marginBottom: '12px',
      }}
    >
      {title}
    </h1>
    <p
      style={{
        fontSize: '16px',
        color: themeColors.textSecondary,
        maxWidth: '500px',
      }}
    >
      This page is currently under construction and will be available soon.
      We're working hard to bring you the best experience.
    </p>
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'masters',
        element: <PlaceholderPage title="Masters" />,
      },
      {
        path: 'masters/locations',
        element: <Locations />,
      },
      {
        path: 'masters/clients',
        element: <Clients />,
      },
      {
        path: 'masters/product-categories',
        element: <ProductCategories />,
      },
      {
        path: 'masters/products',
        element: <Products />,
      },
      {
        path: 'masters/boards',
        element: <Boards />,
      },
      {
        path: 'masters/users',
        element: <Users />,
      },
      {
        path: 'masters/machines',
        element: <Machines />,
      },
      {
        path: 'masters/shifts',
        element: <Shifts />,
      },
      {
        path: 'masters/production-stages',
        element: <ProductionStages />,
      },
      {
        path: 'masters/dies',
        element: <Dies />,
      },
      {
        path: 'masters/plates',
        element: <Plates />,
      },
      {
        path: 'masters/rejection-reasons',
        element: <RejectionReasons />,
      },
      {
        path: 'enquiry',
        element: <Enquiry />,
      },
      {
        path: 'quotations',
        element: <Quotations />,
      },
      {
        path: 'quotations/create',
        element: <CreateQuotation />,
      },
      {
        path: 'orders',
        element: <PlaceholderPage title="Orders" />,
      },
      {
        path: 'production',
        element: <PlaceholderPage title="Production" />,
      },
      {
        path: 'departments',
        element: <PlaceholderPage title="Departments" />,
      },
      {
        path: 'quality-control',
        element: <PlaceholderPage title="Quality Control" />,
      },
      {
        path: 'outsourcing',
        element: <PlaceholderPage title="Outsourcing" />,
      },
      {
        path: 'inventory',
        element: <PlaceholderPage title="Inventory" />,
      },
      {
        path: 'billing',
        element: <PlaceholderPage title="Billing & Accounts" />,
      },
      {
        path: 'delivery',
        element: <PlaceholderPage title="Delivery" />,
      },
      {
        path: 'reports',
        element: <PlaceholderPage title="Reports" />,
      },
      {
        path: 'settings',
        element: <PlaceholderPage title="Settings" />,
      },
    ],
  },
]);
