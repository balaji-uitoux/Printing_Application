import { Layout, Space, Avatar, Dropdown, Breadcrumb } from 'antd';
import { UserOutlined, LogoutOutlined, HomeOutlined } from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import type { MenuProps } from 'antd';
import { themeColors } from '../../theme/themeConfig';
import { typography } from '../../theme/typography';

const { Header: AntHeader } = Layout;

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined size={16} />,
      label: 'Profile',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined size={16} />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  // Generate breadcrumb items only for Create Quotation page
  const breadcrumbItems = useMemo(() => {
    // Only show breadcrumbs on Create Quotation page
    if (location.pathname !== '/quotations/create') {
      return [];
    }

    return [
      {
        title: (
          <Link to="/dashboard" style={{ color: themeColors.textSecondary }}>
            <HomeOutlined style={{ fontSize: '14px' }} />
          </Link>
        ),
      },
      {
        title: (
          <Link to="/enquiry" style={{ color: themeColors.textSecondary }}>
            Enquiry
          </Link>
        ),
      },
      {
        title: <span style={{ color: themeColors.text, fontWeight: 500 }}>Create</span>,
      },
    ];
  }, [location.pathname]);

  return (
    <AntHeader
      className="app-header"
      data-testid="app-header"
      style={{
        padding: '0 32px 0 32px',
        background: scrolled ? 'rgba(248, 250, 252, 0.5)' : 'transparent',
        backdropFilter: scrolled ? 'blur(30px)' : 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: scrolled ? '1px solid rgba(226, 232, 240, 0.6)' : 'none',
        height: '60px',
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        zIndex: 100,
        transition: 'all 0.3s ease',
        boxShadow: scrolled ? '0 4px 12px rgba(0, 0, 0, 0.08)' : 'none',
      }}
    >
      {/* Left side - Logo and Breadcrumbs */}
      <div className="header-left-section" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <div
          className="header-logo"
          style={{
            ...typography.h1,
            fontSize: '28px',
            fontWeight: 800,
            color: themeColors.text,
            letterSpacing: '-1px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          }}
        >
          PRINT
        </div>

        {breadcrumbItems.length > 0 && (
          <>
            <div
              className="header-divider"
              style={{
                width: '1px',
                height: '24px',
                background: themeColors.borderLight,
              }}
            />
            <Breadcrumb
              className="header-breadcrumb"
              items={breadcrumbItems}
              separator="/"
              style={{
                fontSize: '14px',
              }}
            />
          </>
        )}
      </div>

      {/* User menu on the right */}
      <div className="header-right-section">
        <Space className="header-user-menu">
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <Space style={{ cursor: 'pointer' }}>
              <span style={{ ...typography.body, color: themeColors.text, fontWeight: 500 }}>
                {user?.name || 'User'}
              </span>
              <Avatar
                icon={<UserOutlined size={20} />}
                style={{
                  backgroundColor: themeColors.primary,
                  width: 40,
                  height: 40,
                }}
              />
            </Space>
          </Dropdown>
        </Space>
      </div>
    </AntHeader>
  );
};

export default Header;
