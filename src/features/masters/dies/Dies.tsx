import { useState } from 'react';
import { Table, Button, Input, Space, Tag, Card, Select, message } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, DownOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import AddDieDrawer from '../../../components/masters/AddDieDrawer';

interface Die {
  id: string;
  code: string;
  name: string;
  size: string;
  type: string;
  material: string;
  purchaseDate: string;
  cost: number;
  location: string;
  condition: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  status: 'Active' | 'Inactive';
}

const mockDies: Die[] = [
  {
    id: '1',
    code: 'DIE-001',
    name: 'Box Die 12x10',
    size: '12" x 10"',
    type: 'Box',
    material: 'Steel',
    purchaseDate: '2023-01-15',
    cost: 15000,
    location: 'Main Factory',
    condition: 'Excellent',
    status: 'Active',
  },
  {
    id: '2',
    code: 'DIE-002',
    name: 'Label Die Round 5"',
    size: '5" diameter',
    type: 'Label',
    material: 'Aluminum',
    purchaseDate: '2023-03-20',
    cost: 8500,
    location: 'Main Factory',
    condition: 'Good',
    status: 'Active',
  },
  {
    id: '3',
    code: 'DIE-003',
    name: 'Card Die Business',
    size: '3.5" x 2"',
    type: 'Business Card',
    material: 'Steel',
    purchaseDate: '2022-11-10',
    cost: 12000,
    location: 'Branch Office - West',
    condition: 'Good',
    status: 'Active',
  },
  {
    id: '4',
    code: 'DIE-004',
    name: 'Envelope Die DL',
    size: '8.6" x 4.3"',
    type: 'Envelope',
    material: 'Steel',
    purchaseDate: '2022-08-05',
    cost: 18000,
    location: 'Main Factory',
    condition: 'Fair',
    status: 'Inactive',
  },
  {
    id: '5',
    code: 'DIE-005',
    name: 'Tag Die 4x6',
    size: '4" x 6"',
    type: 'Tag',
    material: 'Aluminum',
    purchaseDate: '2021-12-15',
    cost: 9500,
    location: 'Main Factory',
    condition: 'Poor',
    status: 'Inactive',
  },
];

const Dies = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(mockDies);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSearch = (value: string) => {
    setSearchText(value);
    const filtered = mockDies.filter(
      (item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.code.toLowerCase().includes(value.toLowerCase()) ||
        item.type.toLowerCase().includes(value.toLowerCase())
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

  const getConditionColor = (condition: string) => {
    const colors: Record<string, string> = {
      Excellent: 'green',
      Good: 'blue',
      Fair: 'orange',
      Poor: 'red',
    };
    return colors[condition] || 'default';
  };

  const columns: ColumnsType<Die> = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Die Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Material',
      dataIndex: 'material',
      key: 'material',
    },
    {
      title: 'Cost',
      dataIndex: 'cost',
      key: 'cost',
      sorter: (a, b) => a.cost - b.cost,
      render: (value) => `₹${value.toLocaleString()}`,
    },
    {
      title: 'Condition',
      dataIndex: 'condition',
      key: 'condition',
      render: (condition) => (
        <Tag color={getConditionColor(condition)}>{condition}</Tag>
      ),
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
            Dies
          </h1>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Input
              placeholder="Search dies..."
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
              Add Die
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
            showTotal: (total) => `Total ${total} dies`,
          }}
          style={{ background: 'transparent' }}
        />
      </Card>

      <AddDieDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
};

export default Dies;
