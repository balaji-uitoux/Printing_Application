import { useState } from 'react';
import { Card, Input, Button, Form } from 'antd';
import { UserOutlined, LockOutlined, CheckCircleFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { themeColors } from '../../theme/themeConfig';
import { typography } from '../../theme/typography';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = () => {
    // No validation - just login with any credentials
    login(username, password);
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      {/* Left Panel - Marketing Content */}
      <div className="login-left-panel">
        <div className="login-left-content">
          <h1>The Complete Printing Press Management Solution</h1>
          <p>
            Streamline your printing business operations with our comprehensive management system.
            From enquiries to production, manage everything in one place.
          </p>
          <div className="login-features">
            <div className="login-feature-item">
              <div className="login-feature-icon">
                <CheckCircleFilled />
              </div>
              <span>Manage enquiries and quotations efficiently</span>
            </div>
            <div className="login-feature-item">
              <div className="login-feature-icon">
                <CheckCircleFilled />
              </div>
              <span>Track orders and production in real-time</span>
            </div>
            <div className="login-feature-item">
              <div className="login-feature-icon">
                <CheckCircleFilled />
              </div>
              <span>Monitor inventory and generate reports</span>
            </div>
            <div className="login-feature-item">
              <div className="login-feature-icon">
                <CheckCircleFilled />
              </div>
              <span>Streamline invoicing and payments</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="login-right-panel">
        <Card className="login-card">
          <div className="login-logo">PrintPress</div>
          <div className="login-title">Welcome Back</div>
          <div className="login-subtitle">Log in to your account to continue</div>
          <Form layout="vertical" onFinish={handleLogin}>
            <Form.Item label="Username" name="username">
              <Input
                prefix={<UserOutlined />}
                placeholder="Enter your username"
                size="large"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter your password"
                size="large"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                style={{
                  background: themeColors.primary,
                  borderColor: themeColors.primary,
                  height: '48px',
                  ...typography.body,
                  fontWeight: 600,
                  borderRadius: '50px',
                }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
