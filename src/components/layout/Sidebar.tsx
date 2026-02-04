import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Tooltip } from 'antd';
import {
  LayoutOutlined,
  AppstoreOutlined,
  EditOutlined,
  FileTextOutlined,
  ShoppingCartOutlined,
  PrinterOutlined,
  TeamOutlined,
  SafetyOutlined,
  UploadOutlined,
  InboxOutlined,
  CreditCardOutlined,
  CarOutlined,
  BarChartOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import type { MenuItem } from '../../types';

const menuItems: MenuItem[] = [
  {
    key: 'dashboard',
    icon: <LayoutOutlined size={20} />,
    label: 'Dashboard',
    path: '/dashboard',
  },
  {
    key: 'masters',
    icon: <AppstoreOutlined size={20} />,
    label: 'Masters',
    path: '/masters',
    subMenus: [
      { key: 'clients', label: 'Clients', path: '/masters/clients' },
      { key: 'product-categories', label: 'Product Categories', path: '/masters/product-categories' },
      { key: 'products', label: 'Products', path: '/masters/products' },
      { key: 'boards', label: 'Boards', path: '/masters/boards' },
      { key: 'users', label: 'Users', path: '/masters/users' },
      { key: 'locations', label: 'Locations', path: '/masters/locations' },
      { key: 'machines', label: 'Machines', path: '/masters/machines' },
      { key: 'shifts', label: 'Shifts', path: '/masters/shifts' },
      { key: 'production-stages', label: 'Production Stages', path: '/masters/production-stages' },
    ],
  },
  {
    key: 'enquiry',
    icon: <EditOutlined size={20} />,
    label: 'Enquiry & Design',
    path: '/enquiry',
  },
  {
    key: 'quotations',
    icon: <FileTextOutlined size={20} />,
    label: 'Quotations',
    path: '/quotations',
  },
  {
    key: 'orders',
    icon: <ShoppingCartOutlined size={20} />,
    label: 'Orders',
    path: '/orders',
  },
  {
    key: 'production',
    icon: <PrinterOutlined size={20} />,
    label: 'Production',
    path: '/production',
  },
  {
    key: 'departments',
    icon: <TeamOutlined size={20} />,
    label: 'Departments',
    path: '/departments',
  },
  {
    key: 'quality-control',
    icon: <SafetyOutlined size={20} />,
    label: 'Quality Control',
    path: '/quality-control',
  },
  {
    key: 'outsourcing',
    icon: <UploadOutlined size={20} />,
    label: 'Outsourcing',
    path: '/outsourcing',
  },
  {
    key: 'inventory',
    icon: <InboxOutlined size={20} />,
    label: 'Inventory',
    path: '/inventory',
  },
  {
    key: 'billing',
    icon: <CreditCardOutlined size={20} />,
    label: 'Billing & Accounts',
    path: '/billing',
  },
  {
    key: 'delivery',
    icon: <CarOutlined size={20} />,
    label: 'Delivery',
    path: '/delivery',
  },
  {
    key: 'reports',
    icon: <BarChartOutlined size={20} />,
    label: 'Reports',
    path: '/reports',
  },
  {
    key: 'settings',
    icon: <SettingOutlined size={20} />,
    label: 'Settings',
    path: '/settings',
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const selectedKey = location.pathname.split('/')[1] || 'dashboard';

  // Close submenu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setActiveSubmenu(null);
      }
    };

    if (activeSubmenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeSubmenu]);

  const handleMenuClick = (key: string) => {
    const item = menuItems.find((item) => item.key === key);
    if (item) {
      if (item.subMenus && item.subMenus.length > 0) {
        setActiveSubmenu(activeSubmenu === key ? null : key);
      } else {
        navigate(item.path);
        setActiveSubmenu(null);
      }
    }
  };

  const handleSubMenuClick = (path: string) => {
    navigate(path);
    setActiveSubmenu(null);
  };

  const renderMenuItem = (item: MenuItem) => {
    const isActive = selectedKey === item.key;
    const hasSubMenu = item.subMenus && item.subMenus.length > 0;
    const isSubmenuOpen = activeSubmenu === item.key;

    return (
      <div key={item.key} style={{ position: 'relative' }}>
        <Tooltip title={item.label} placement="right">
          <div
            onClick={() => handleMenuClick(item.key)}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              backgroundColor: isActive || isSubmenuOpen ? '#0F172A' : 'transparent',
              color: isActive || isSubmenuOpen ? '#FFFFFF' : '#64748B',
              fontSize: '18px',
              boxShadow: isActive || isSubmenuOpen ? '0 4px 12px rgba(15, 23, 42, 0.3)' : 'none',
            }}
            onMouseEnter={(e) => {
              if (!isActive && !isSubmenuOpen) {
                e.currentTarget.style.backgroundColor = 'rgba(100, 116, 139, 0.1)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive && !isSubmenuOpen) {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'scale(1)';
              }
            }}
          >
            {item.icon}
          </div>
        </Tooltip>

        {/* Submenu Popup */}
        {hasSubMenu && isSubmenuOpen && (
          <div
            style={{
              position: 'absolute',
              left: '70px',
              top: '0',
              minWidth: '200px',
              background: '#FFFFFF',
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
              padding: '8px',
              zIndex: 1000,
              border: '1px solid #E2E8F0',
            }}
          >
            {item.subMenus?.map((subItem) => (
              <div
                key={subItem.key}
                onClick={() => handleSubMenuClick(subItem.path)}
                style={{
                  padding: '12px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: '#64748B',
                  transition: 'all 0.2s ease',
                  fontWeight: 500,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F1F5F9';
                  e.currentTarget.style.color = '#0F172A';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#64748B';
                }}
              >
                {subItem.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      ref={sidebarRef}
      className="sidebar-container"
      data-testid="sidebar-nav"
      style={{
        width: '80px',
        height: '100%',
        background: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 0 16px 0',
      }}
    >
      <div className="sidebar-menu-section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {menuItems.map(renderMenuItem)}
      </div>
    </div>
  );
};

export default Sidebar;
