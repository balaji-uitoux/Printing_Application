import { useState } from 'react';
import { Table, Button, Input, Space, Tag, Card, Select, message } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, DownOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import AddPlateDrawer from '../../../components/masters/AddPlateDrawer';

interface Plate {
  id: string;
  code: string;
  name: string;
  size: string;
  type: string;
  thickness: string;
  supplier: string;
  purchaseDate: string;
  usageCount: number;
  maxUsage: number;
  status: 'Active' | 'Inactive';
}

const mockPlates: Plate[] = [
  {
    id: '1',
    code: 'PLT-001',
    name: 'Offset Plate A3',
    size: 'A3 (11.7" x 16.5")',
    type: 'Offset',
    thickness: '0.30mm',
    supplier: 'Kodak',
    purchaseDate: '2024-01-10',
    usageCount: 5,
    maxUsage: 50,
    status: 'Active',
  },
  {
    id: '2',
    code: 'PLT-002',
    name: 'Flexo Plate Medium',
    size: '12" x 18"',
    type: 'Flexographic',
    thickness: '1.70mm',
    supplier: 'DuPont',
    purchaseDate: '2023-12-15',
    usageCount: 28,
    maxUsage: 30,
    status: 'Active',
  },
  {
    id: '3',
    code: 'PLT-003',
    name: 'Litho Plate A2',
    size: 'A2 (16.5" x 23.4")',
    type: 'Lithographic',
    thickness: '0.40mm',
    supplier: 'Agfa',
    purchaseDate: '2023-11-20',
    usageCount: 42,
    maxUsage: 45,
    status: 'Active',
  },
  {
    id: '4',
    code: 'PLT-004',
    name: 'Digital Plate Large',
    size: '20" x 28"',
    type: 'Digital',
    thickness: '0.30mm',
    supplier: 'Fujifilm',
    purchaseDate: '2024-01-05',
    usageCount: 0,
    maxUsage: 100,
    status: 'Active',
  },
  {
    id: '5',
    code: 'PLT-005',
    name: 'Screen Plate Small',
    size: '8" x 10"',
    type: 'Screen',
    thickness: '2.00mm',
    supplier: 'Sefar',
    purchaseDate: '2022-06-30',
    usageCount: 150,
    maxUsage: 150,
    status: 'Inactive',
  },
];

const Plates = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(mockPlates);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSearch = (value: string) => {
    setSearchText(value);
    const filtered = mockPlates.filter(
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

  const columns: ColumnsType<Plate> = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Plate Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      filters: [
        { text: 'Offset', value: 'Offset' },
        { text: 'Flexographic', value: 'Flexographic' },
        { text: 'Lithographic', value: 'Lithographic' },
        { text: 'Digital', value: 'Digital' },
        { text: 'Screen', value: 'Screen' },
      ],
      onFilter: (value, record) => record.type === value,
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Thickness',
      dataIndex: 'thickness',
      key: 'thickness',
    },
    {
      title: 'Supplier',
      dataIndex: 'supplier',
      key: 'supplier',
    },
    {
      title: 'Usage',
      key: 'usage',
      render: (_, record) => (
        <span>
          {record.usageCount} / {record.maxUsage}
        </span>
      ),
      sorter: (a, b) => (a.usageCount / a.maxUsage) - (b.usageCount / b.maxUsage),
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
            Plates
          </h1>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Input
              placeholder="Search plates..."
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
              Add Plate
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
            showTotal: (total) => `Total ${total} plates`,
          }}
          style={{ background: 'transparent' }}
        />
      </Card>

      <AddPlateDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
};

export default Plates;
