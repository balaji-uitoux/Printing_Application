import { useState } from 'react';
import { Table, Button, Input, Space, Tag, Card, Avatar, Select, message } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, UserOutlined, DownOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import AddUserDrawer from '../../../components/masters/AddUserDrawer';

interface User {
  id: string;
  code: string;
  name: string;
  email: string;
  phone: string;
  role: 'Marketing' | 'Designer' | 'Admin' | 'Production Team' | 'Management';
  department: string;
  joinDate: string;
  status: 'Active' | 'Inactive';
}

const mockUsers: User[] = [
  {
    id: '1',
    code: 'USR-001',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@company.com',
    phone: '+91 9876543210',
    role: 'Admin',
    department: 'Administration',
    joinDate: '2022-01-15',
    status: 'Active',
  },
  {
    id: '2',
    code: 'USR-002',
    name: 'Priya Sharma',
    email: 'priya.sharma@company.com',
    phone: '+91 9876543211',
    role: 'Marketing',
    department: 'Sales & Marketing',
    joinDate: '2022-03-20',
    status: 'Active',
  },
  {
    id: '3',
    code: 'USR-003',
    name: 'Amit Patel',
    email: 'amit.patel@company.com',
    phone: '+91 9876543212',
    role: 'Designer',
    department: 'Design',
    joinDate: '2022-05-10',
    status: 'Active',
  },
  {
    id: '4',
    code: 'USR-004',
    name: 'Sneha Reddy',
    email: 'sneha.reddy@company.com',
    phone: '+91 9876543213',
    role: 'Designer',
    department: 'Design',
    joinDate: '2022-07-01',
    status: 'Active',
  },
  {
    id: '5',
    code: 'USR-005',
    name: 'Vikram Singh',
    email: 'vikram.singh@company.com',
    phone: '+91 9876543214',
    role: 'Production Team',
    department: 'Production',
    joinDate: '2021-11-15',
    status: 'Active',
  },
  {
    id: '6',
    code: 'USR-006',
    name: 'Anjali Mehta',
    email: 'anjali.mehta@company.com',
    phone: '+91 9876543215',
    role: 'Production Team',
    department: 'Production',
    joinDate: '2023-02-20',
    status: 'Active',
  },
  {
    id: '7',
    code: 'USR-007',
    name: 'Arjun Nair',
    email: 'arjun.nair@company.com',
    phone: '+91 9876543216',
    role: 'Management',
    department: 'Executive',
    joinDate: '2020-06-01',
    status: 'Active',
  },
  {
    id: '8',
    code: 'USR-008',
    name: 'Deepak Verma',
    email: 'deepak.verma@company.com',
    phone: '+91 9876543217',
    role: 'Marketing',
    department: 'Sales & Marketing',
    joinDate: '2023-01-10',
    status: 'Active',
  },
  {
    id: '9',
    code: 'USR-009',
    name: 'Kavita Joshi',
    email: 'kavita.joshi@company.com',
    phone: '+91 9876543218',
    role: 'Production Team',
    department: 'Production',
    joinDate: '2021-09-05',
    status: 'Inactive',
  },
];

const Users = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(mockUsers);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSearch = (value: string) => {
    setSearchText(value);
    const filtered = mockUsers.filter(
      (item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.code.toLowerCase().includes(value.toLowerCase()) ||
        item.email.toLowerCase().includes(value.toLowerCase()) ||
        item.role.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleStatusChange = (itemId: string, newStatus: string) => {
    const updatedData = filteredData.map((item) =>
      item.id === itemId ? { ...item, status: newStatus as typeof item.status } : item
    );
    setFilteredData(updatedData);
    message.success(`Status updated to ${newStatus}`);
  };

  const getRoleColor = (role: string) => {
    const colors: Record<string, string> = {
      Admin: 'red',
      Marketing: 'blue',
      Designer: 'purple',
      'Production Team': 'orange',
      Management: 'green',
    };
    return colors[role] || 'default';
  };

  const columns: ColumnsType<User> = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: 'User',
      key: 'user',
      render: (_, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar icon={<UserOutlined />} style={{ background: '#0F172A' }} />
          <div>
            <div style={{ fontWeight: 500, color: '#0F172A' }}>{record.name}</div>
            <div style={{ fontSize: '12px', color: '#64748B' }}>{record.email}</div>
          </div>
        </div>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => <Tag color={getRoleColor(role)}>{role}</Tag>,
      filters: [
        { text: 'Admin', value: 'Admin' },
        { text: 'Marketing', value: 'Marketing' },
        { text: 'Designer', value: 'Designer' },
        { text: 'Production Team', value: 'Production Team' },
        { text: 'Management', value: 'Management' },
      ],
      onFilter: (value, record) => record.role === value,
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Join Date',
      dataIndex: 'joinDate',
      key: 'joinDate',
      sorter: (a, b) => new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime(),
      render: (date) => new Date(date).toLocaleDateString('en-IN'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => {
        const getStatusColor = (status: string) => {
          return status === 'Active' ? 'green' : 'red';
        };

        return (
          <Select
            value={status}
            onChange={(newStatus) => handleStatusChange(record.id, newStatus)}
            style={{ width: '110px' }}
            size="small"
            variant="borderless"
            suffixIcon={null}
            options={[
              { value: 'Active', label: 'Active' },
              { value: 'Inactive', label: 'Inactive' },
            ]}
            labelRender={({ value }) => (
              <Tag color={getStatusColor(value as string)} style={{ margin: 0, cursor: 'pointer' }}>
                {value} <DownOutlined style={{ fontSize: '10px', marginLeft: '4px' }} />
              </Tag>
            )}
            optionRender={(option) => (
              <Tag color={getStatusColor(option.value as string)} style={{ margin: '4px 0', width: '100%' }}>
                {option.label}
              </Tag>
            )}
          />
        );
      },
      filters: [
        { text: 'Active', value: 'Active' },
        { text: 'Inactive', value: 'Inactive' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space>
          <Button type="text" icon={<EditOutlined size={16} />} size="small">
            Edit
          </Button>
          <Button type="text" danger icon={<DeleteOutlined size={16} />} size="small">
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="master-page-container" data-testid="users-page">
      <Card
        className="master-page-card"
        data-testid="users-card"
        style={{
          borderRadius: '16px',
          border: '1px solid rgba(226, 232, 240, 0.6)',
          background: 'rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        }}
        styles={{ body: { padding: '20px' } }}
      >
        <div
          className="page-header"
          data-testid="page-header"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <div className="header-title-section">
            <h1
              style={{
                fontSize: '24px',
                fontWeight: 600,
                color: '#0F172A',
                margin: 0,
              }}
            >
              Users
            </h1>
          </div>

          <div className="header-actions-section" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div className="header-search">
              <Input
                placeholder="Search users..."
                prefix={<SearchOutlined size={16} />}
                value={searchText}
                onChange={(e) => handleSearch(e.target.value)}
                style={{ width: '300px' }}
                size="large"
              />
            </div>
            <div className="header-button">
              <Button
                type="primary"
                icon={<PlusOutlined size={16} />}
                onClick={() => setDrawerOpen(true)}
                style={{
                  background: '#0F172A',
                  borderColor: '#0F172A',
                  height: '40px',
                  borderRadius: '50px',
                  padding: '0 20px',
                }}
              >
                Add User
              </Button>
            </div>
          </div>
        </div>

        <div className="page-body" data-testid="page-body">
          <Table
            className="master-data-table"
            data-testid="users-table"
            columns={columns}
            dataSource={filteredData}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} users`,
            }}
            style={{ background: 'transparent' }}
          />
        </div>
      </Card>

      <AddUserDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
};

export default Users;
