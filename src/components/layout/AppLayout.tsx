import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const { Sider, Content } = Layout;

const AppLayout = () => {
  return (
    <Layout className="app-layout" data-testid="app-layout" style={{ minHeight: '100vh', background: 'transparent' }}>
      <Sider
        className="app-sidebar"
        data-testid="sidebar"
        width={80}
        style={{
          background: 'transparent',
          borderRight: 'none',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 10,
        }}
        trigger={null}
      >
        <Sidebar />
      </Sider>
      <Layout className="app-content-layout" data-testid="content-layout" style={{ marginLeft: '80px', background: 'transparent' }}>
        <Header />
        <Content
          className="app-main-content"
          data-testid="main-content"
          style={{
            padding: '24px',
            minHeight: 280,
            marginTop: '60px',
            paddingLeft: '12px',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
