import { useState } from 'react';
import { Table, Button, Input, Space, Tag, Card, Select, message } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, DownOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import AddClientDrawer from '../../../components/masters/AddClientDrawer';

interface Client {
  id: string;
  code: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  city: string;
  gstNumber: string;
  outstandingAmount: number;
  status: 'Active' | 'Inactive';
}

const mockClients: Client[] = [
  {
    id: '1',
    code: 'CLI-001',
    name: 'Acme Corporation',
    contactPerson: 'John Smith',
    email: 'john@acme.com',
    phone: '+91 9876543210',
    city: 'Mumbai',
    gstNumber: '27AABCU9603R1ZM',
    outstandingAmount: 45000,
    status: 'Active',
  },
  {
    id: '2',
    code: 'CLI-002',
    name: 'Tech Solutions Pvt Ltd',
    contactPerson: 'Sarah Johnson',
    email: 'sarah@techsol.com',
    phone: '+91 9876543211',
    city: 'Bangalore',
    gstNumber: '29AABCT1332L1ZV',
    outstandingAmount: 0,
    status: 'Active',
  },
  {
    id: '3',
    code: 'CLI-003',
    name: 'Green Earth Industries',
    contactPerson: 'Michael Chen',
    email: 'michael@greenearth.com',
    phone: '+91 9876543212',
    city: 'Delhi',
    gstNumber: '07AABCG5623E1ZH',
    outstandingAmount: 23500,
    status: 'Active',
  },
  {
    id: '4',
    code: 'CLI-004',
    name: 'Urban Designs Studio',
    contactPerson: 'Emma Wilson',
    email: 'emma@urbandesigns.com',
    phone: '+91 9876543213',
    city: 'Pune',
    gstNumber: '27AABCU1234M1ZN',
    outstandingAmount: 12000,
    status: 'Inactive',
  },
  {
    id: '5',
    code: 'CLI-005',
    name: 'Bright Marketing Agency',
    contactPerson: 'David Brown',
    email: 'david@brightmarketing.com',
    phone: '+91 9876543214',
    city: 'Chennai',
    gstNumber: '33AABCB5678P1ZR',
    outstandingAmount: 8500,
    status: 'Active',
  },
];

const Clients = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(mockClients);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSearch = (value: string) => {
    setSearchText(value);
    const filtered = mockClients.filter(
      (item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.code.toLowerCase().includes(value.toLowerCase()) ||
        item.contactPerson.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleStatusChange = (clientId: string, newStatus: string) => {
    const updatedData = filteredData.map((item) =>
      item.id === clientId ? { ...item, status: newStatus as Client['status'] } : item
    );
    setFilteredData(updatedData);
    message.success(`Status updated to ${newStatus}`);
  };

  const columns: ColumnsType<Client> = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: 'Client Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Contact Person',
      dataIndex: 'contactPerson',
      key: 'contactPerson',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      sorter: (a, b) => a.city.localeCompare(b.city),
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
    <div className="master-page-container" data-testid="clients-page">
      <Card
        className="master-page-card"
        data-testid="clients-card"
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
              Clients
            </h1>
          </div>

          <div className="header-actions-section" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div className="header-search">
              <Input
                placeholder="Search clients..."
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
                Add Client
              </Button>
            </div>
          </div>
        </div>

        <div className="page-body" data-testid="page-body">
          <Table
            className="master-data-table"
            data-testid="clients-table"
            columns={columns}
            dataSource={filteredData}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} clients`,
            }}
            style={{ background: 'transparent' }}
          />
        </div>
      </Card>

      <AddClientDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
};

export default Clients;
