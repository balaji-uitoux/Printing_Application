import { useState } from 'react';
import { Table, Button, Input, Space, Tag, Card, Select, message } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, DownOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import AddLocationDrawer from '../../../components/masters/AddLocationDrawer';

interface Location {
  id: string;
  name: string;
  code: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  contactPerson: string;
  phone: string;
  status: 'Active' | 'Inactive';
}

const mockLocations: Location[] = [
  {
    id: '1',
    name: 'Main Factory',
    code: 'LOC-001',
    address: '123 Industrial Area, Phase 1',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    contactPerson: 'Rajesh Kumar',
    phone: '+91 9876543210',
    status: 'Active',
  },
  {
    id: '2',
    name: 'Warehouse - North',
    code: 'LOC-002',
    address: '456 Storage Zone, Sector 5',
    city: 'Delhi',
    state: 'Delhi',
    pincode: '110001',
    contactPerson: 'Priya Sharma',
    phone: '+91 9876543211',
    status: 'Active',
  },
  {
    id: '3',
    name: 'Branch Office - West',
    code: 'LOC-003',
    address: '789 Business Park, Wing A',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411001',
    contactPerson: 'Amit Patel',
    phone: '+91 9876543212',
    status: 'Active',
  },
  {
    id: '4',
    name: 'Production Unit - South',
    code: 'LOC-004',
    address: '321 Manufacturing Hub',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560001',
    contactPerson: 'Lakshmi Iyer',
    phone: '+91 9876543213',
    status: 'Inactive',
  },
];

const Locations = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(mockLocations);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSearch = (value: string) => {
    setSearchText(value);
    const filtered = mockLocations.filter(
      (item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.code.toLowerCase().includes(value.toLowerCase()) ||
        item.city.toLowerCase().includes(value.toLowerCase())
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

  const columns: ColumnsType<Location> = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: 'Location Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      sorter: (a, b) => a.city.localeCompare(b.city),
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: 'Contact Person',
      dataIndex: 'contactPerson',
      key: 'contactPerson',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
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
    <div>
      <Card
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
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <h1
            style={{
              fontSize: '24px',
              fontWeight: 600,
              color: '#0F172A',
              margin: 0,
            }}
          >
            Locations
          </h1>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Input
              placeholder="Search locations..."
              prefix={<SearchOutlined size={16} />}
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
              style={{ width: '300px' }}
              size="large"
            />
            <Button
              type="primary"
              icon={<PlusOutlined size={16} />}
              style={{
                background: '#0F172A',
                borderColor: '#0F172A',
                height: '40px',
                borderRadius: '50px',
                padding: '0 20px',
              }}
            >
              Add Location
            </Button>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} locations`,
          }}
          style={{ background: 'transparent' }}
        />
      </Card>

      <AddLocationDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
};

export default Locations;
