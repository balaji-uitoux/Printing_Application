import { useState } from 'react';
import { Table, Button, Input, Space, Tag, Card, Progress, Select, message } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, DownOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import AddMachineDrawer from '../../../components/masters/AddMachineDrawer';

interface Machine {
  id: string;
  code: string;
  name: string;
  type: string;
  manufacturer: string;
  model: string;
  location: string;
  installDate: string;
  lastMaintenance: string;
  utilization: number;
  status: 'Active' | 'Inactive';
}

const mockMachines: Machine[] = [
  {
    id: '1',
    code: 'MCH-001',
    name: 'Offset Press HP',
    type: 'Digital Printing',
    manufacturer: 'HP Inc.',
    model: 'Indigo 7900',
    location: 'Main Factory',
    installDate: '2022-01-15',
    lastMaintenance: '2024-01-10',
    utilization: 85,
    status: 'Active',
  },
  {
    id: '2',
    code: 'MCH-002',
    name: 'Xerox Versant',
    type: 'Large Format',
    manufacturer: 'Xerox',
    model: 'Versant 3100',
    location: 'Main Factory',
    installDate: '2021-06-20',
    lastMaintenance: '2024-01-05',
    utilization: 60,
    status: 'Active',
  },
  {
    id: '3',
    code: 'MCH-003',
    name: 'Canon ImagePress',
    type: 'Color Printing',
    manufacturer: 'Canon',
    model: 'ImagePress C10000VP',
    location: 'Main Factory',
    installDate: '2020-11-10',
    lastMaintenance: '2023-12-20',
    utilization: 35,
    status: 'Active',
  },
  {
    id: '4',
    code: 'MCH-004',
    name: 'Ricoh Pro C9200',
    type: 'Commercial Printing',
    manufacturer: 'Ricoh',
    model: 'Pro C9200',
    location: 'Branch Office - West',
    installDate: '2023-03-15',
    lastMaintenance: '2024-01-15',
    utilization: 0,
    status: 'Inactive',
  },
  {
    id: '5',
    code: 'MCH-005',
    name: 'Konica Minolta AccurioPress',
    type: 'Production Printing',
    manufacturer: 'Konica Minolta',
    model: 'AccurioPress C6100',
    location: 'Production Unit - South',
    installDate: '2019-08-25',
    lastMaintenance: '2023-11-30',
    utilization: 0,
    status: 'Inactive',
  },
];

const Machines = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(mockMachines);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSearch = (value: string) => {
    setSearchText(value);
    const filtered = mockMachines.filter(
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

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Running: 'green',
      Idle: 'orange',
      Maintenance: 'blue',
      Offline: 'red',
    };
    return colors[status] || 'default';
  };

  const columns: ColumnsType<Machine> = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: 'Machine Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      filters: [
        { text: 'Digital Printing', value: 'Digital Printing' },
        { text: 'Large Format', value: 'Large Format' },
        { text: 'Color Printing', value: 'Color Printing' },
        { text: 'Commercial Printing', value: 'Commercial Printing' },
        { text: 'Production Printing', value: 'Production Printing' },
      ],
      onFilter: (value, record) => record.type === value,
    },
    {
      title: 'Manufacturer',
      dataIndex: 'manufacturer',
      key: 'manufacturer',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Utilization',
      dataIndex: 'utilization',
      key: 'utilization',
      sorter: (a, b) => a.utilization - b.utilization,
      render: (value) => (
        <Progress
          percent={value}
          size="small"
          strokeColor={value > 70 ? '#10B981' : value > 40 ? '#F59E0B' : '#EF4444'}
        />
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
    <div className="master-page-container" data-testid="machines-page">
      <Card
        className="master-page-card"
        data-testid="machines-card"
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
              Machines
            </h1>
          </div>

          <div className="header-actions-section" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div className="header-search">
              <Input
                placeholder="Search machines..."
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
                style={{
                  background: '#0F172A',
                  borderColor: '#0F172A',
                  height: '40px',
                  borderRadius: '50px',
                  padding: '0 20px',
                }}
              >
                Add Machine
              </Button>
            </div>
          </div>
        </div>

        <div className="page-body" data-testid="page-body">
          <Table
            className="master-data-table"
            data-testid="machines-table"
            columns={columns}
            dataSource={filteredData}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} machines`,
            }}
            style={{ background: 'transparent' }}
          />
        </div>
      </Card>

      <AddMachineDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
};

export default Machines;
