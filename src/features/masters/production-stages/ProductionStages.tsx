import { useState } from 'react';
import { Table, Button, Input, Space, Tag, Card, Select, message } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, DownOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import AddProductionStageDrawer from '../../../components/masters/AddProductionStageDrawer';

interface ProductionStage {
  id: string;
  code: string;
  name: string;
  description: string;
  sequence: number;
  estimatedTime: string;
  department: string;
  status: 'Active' | 'Inactive';
}

const mockStages: ProductionStage[] = [
  {
    id: '1',
    code: 'STG-001',
    name: 'Pre-Press',
    description: 'Design preparation and file setup',
    sequence: 1,
    estimatedTime: '2 hours',
    department: 'Design',
    status: 'Active',
  },
  {
    id: '2',
    code: 'STG-002',
    name: 'Plate Making',
    description: 'Creating printing plates',
    sequence: 2,
    estimatedTime: '1 hour',
    department: 'Pre-Press',
    status: 'Active',
  },
  {
    id: '3',
    code: 'STG-003',
    name: 'Printing',
    description: 'Actual printing process',
    sequence: 3,
    estimatedTime: '4 hours',
    department: 'Production',
    status: 'Active',
  },
  {
    id: '4',
    code: 'STG-004',
    name: 'Cutting',
    description: 'Cutting printed sheets to size',
    sequence: 4,
    estimatedTime: '1.5 hours',
    department: 'Finishing',
    status: 'Active',
  },
  {
    id: '5',
    code: 'STG-005',
    name: 'Binding',
    description: 'Binding and finishing',
    sequence: 5,
    estimatedTime: '2 hours',
    department: 'Finishing',
    status: 'Active',
  },
  {
    id: '6',
    code: 'STG-006',
    name: 'Quality Check',
    description: 'Final quality inspection',
    sequence: 6,
    estimatedTime: '30 minutes',
    department: 'Quality Control',
    status: 'Active',
  },
  {
    id: '7',
    code: 'STG-007',
    name: 'Packaging',
    description: 'Packing finished products',
    sequence: 7,
    estimatedTime: '1 hour',
    department: 'Dispatch',
    status: 'Active',
  },
];

const ProductionStages = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(mockStages);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSearch = (value: string) => {
    setSearchText(value);
    const filtered = mockStages.filter(
      (item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.code.toLowerCase().includes(value.toLowerCase()) ||
        item.department.toLowerCase().includes(value.toLowerCase())
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

  const columns: ColumnsType<ProductionStage> = [
    {
      title: 'Sequence',
      dataIndex: 'sequence',
      key: 'sequence',
      sorter: (a, b) => a.sequence - b.sequence,
      width: 100,
    },
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Stage Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Estimated Time',
      dataIndex: 'estimatedTime',
      key: 'estimatedTime',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
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
            Production Stages
          </h1>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Input
              placeholder="Search stages..."
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
              Add Stage
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
            showTotal: (total) => `Total ${total} stages`,
          }}
          style={{ background: 'transparent' }}
        />
      </Card>

      <AddProductionStageDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
};

export default ProductionStages;
