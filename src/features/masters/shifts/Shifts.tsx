import { useState } from 'react';
import { Table, Button, Input, Space, Tag, Card, Select, message } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, DownOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import AddShiftDrawer from '../../../components/masters/AddShiftDrawer';

interface Shift {
  id: string;
  code: string;
  name: string;
  startTime: string;
  endTime: string;
  duration: string;
  breakDuration: string;
  supervisor: string;
  workers: number;
  status: 'Active' | 'Inactive';
}

const mockShifts: Shift[] = [
  {
    id: '1',
    code: 'SHF-001',
    name: 'Morning Shift',
    startTime: '06:00 AM',
    endTime: '02:00 PM',
    duration: '8 hours',
    breakDuration: '1 hour',
    supervisor: 'Rajesh Kumar',
    workers: 25,
    status: 'Active',
  },
  {
    id: '2',
    code: 'SHF-002',
    name: 'Afternoon Shift',
    startTime: '02:00 PM',
    endTime: '10:00 PM',
    duration: '8 hours',
    breakDuration: '1 hour',
    supervisor: 'Priya Sharma',
    workers: 20,
    status: 'Active',
  },
  {
    id: '3',
    code: 'SHF-003',
    name: 'Night Shift',
    startTime: '10:00 PM',
    endTime: '06:00 AM',
    duration: '8 hours',
    breakDuration: '1 hour',
    supervisor: 'Amit Patel',
    workers: 15,
    status: 'Active',
  },
  {
    id: '4',
    code: 'SHF-004',
    name: 'Weekend Shift',
    startTime: '08:00 AM',
    endTime: '04:00 PM',
    duration: '8 hours',
    breakDuration: '1 hour',
    supervisor: 'Lakshmi Iyer',
    workers: 10,
    status: 'Inactive',
  },
];

const Shifts = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(mockShifts);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSearch = (value: string) => {
    setSearchText(value);
    const filtered = mockShifts.filter(
      (item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.code.toLowerCase().includes(value.toLowerCase()) ||
        item.supervisor.toLowerCase().includes(value.toLowerCase())
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

  const columns: ColumnsType<Shift> = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Shift Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Supervisor',
      dataIndex: 'supervisor',
      key: 'supervisor',
    },
    {
      title: 'Workers',
      dataIndex: 'workers',
      key: 'workers',
      sorter: (a, b) => a.workers - b.workers,
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
    <div className="master-page-container" data-testid="shifts-page">
      <Card
        className="master-page-card"
        data-testid="shifts-card"
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
              Shifts
            </h1>
          </div>

          <div className="header-actions-section" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div className="header-search">
              <Input
                placeholder="Search shifts..."
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
                Add Shift
              </Button>
            </div>
          </div>
        </div>

        <div className="page-body" data-testid="page-body">
          <Table
            className="master-data-table"
            data-testid="shifts-table"
            columns={columns}
            dataSource={filteredData}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} shifts`,
            }}
            style={{ background: 'transparent' }}
          />
        </div>
      </Card>

      <AddShiftDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
};

export default Shifts;
