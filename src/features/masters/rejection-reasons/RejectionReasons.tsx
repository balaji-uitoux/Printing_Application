import { useState } from 'react';
import { Table, Button, Input, Space, Tag, Card, Select, message } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, DownOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import AddRejectionReasonDrawer from '../../../components/masters/AddRejectionReasonDrawer';

interface RejectionReason {
  id: string;
  code: string;
  reason: string;
  category: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  occurrences: number;
  description: string;
  status: 'Active' | 'Inactive';
}

const mockReasons: RejectionReason[] = [
  {
    id: '1',
    code: 'REJ-001',
    reason: 'Color Mismatch',
    category: 'Quality',
    severity: 'High',
    occurrences: 45,
    description: 'Printed color does not match approved proof',
    status: 'Active',
  },
  {
    id: '2',
    code: 'REJ-002',
    reason: 'Paper Defect',
    category: 'Material',
    severity: 'Medium',
    occurrences: 28,
    description: 'Tears, wrinkles, or other paper defects',
    status: 'Active',
  },
  {
    id: '3',
    code: 'REJ-003',
    reason: 'Registration Error',
    category: 'Technical',
    severity: 'Critical',
    occurrences: 15,
    description: 'Misalignment of colors or images',
    status: 'Active',
  },
  {
    id: '4',
    code: 'REJ-004',
    reason: 'Ink Smudging',
    category: 'Quality',
    severity: 'High',
    occurrences: 32,
    description: 'Ink not properly dried causing smudges',
    status: 'Active',
  },
  {
    id: '5',
    code: 'REJ-005',
    reason: 'Wrong Size',
    category: 'Technical',
    severity: 'Critical',
    occurrences: 8,
    description: 'Final product dimensions incorrect',
    status: 'Active',
  },
  {
    id: '6',
    code: 'REJ-006',
    reason: 'Text Error',
    category: 'Quality',
    severity: 'Critical',
    occurrences: 12,
    description: 'Spelling mistakes or incorrect text',
    status: 'Active',
  },
  {
    id: '7',
    code: 'REJ-007',
    reason: 'Cutting Error',
    category: 'Technical',
    severity: 'Medium',
    occurrences: 22,
    description: 'Improper cutting or trimming',
    status: 'Active',
  },
  {
    id: '8',
    code: 'REJ-008',
    reason: 'Binding Issue',
    category: 'Technical',
    severity: 'Low',
    occurrences: 18,
    description: 'Problems with binding or stitching',
    status: 'Active',
  },
  {
    id: '9',
    code: 'REJ-009',
    reason: 'Damaged Stock',
    category: 'Material',
    severity: 'High',
    occurrences: 25,
    description: 'Pre-damaged material used',
    status: 'Inactive',
  },
];

const RejectionReasons = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(mockReasons);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSearch = (value: string) => {
    setSearchText(value);
    const filtered = mockReasons.filter(
      (item) =>
        item.reason.toLowerCase().includes(value.toLowerCase()) ||
        item.code.toLowerCase().includes(value.toLowerCase()) ||
        item.category.toLowerCase().includes(value.toLowerCase())
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

  const getSeverityColor = (severity: string) => {
    const colors: Record<string, string> = {
      Low: 'blue',
      Medium: 'orange',
      High: 'red',
      Critical: 'purple',
    };
    return colors[severity] || 'default';
  };

  const columns: ColumnsType<RejectionReason> = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Rejection Reason',
      dataIndex: 'reason',
      key: 'reason',
      sorter: (a, b) => a.reason.localeCompare(b.reason),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      filters: [
        { text: 'Quality', value: 'Quality' },
        { text: 'Material', value: 'Material' },
        { text: 'Technical', value: 'Technical' },
      ],
      onFilter: (value, record) => record.category === value,
    },
    {
      title: 'Severity',
      dataIndex: 'severity',
      key: 'severity',
      render: (severity) => (
        <Tag color={getSeverityColor(severity)}>{severity}</Tag>
      ),
      sorter: (a, b) => {
        const order = { Low: 1, Medium: 2, High: 3, Critical: 4 };
        return order[a.severity] - order[b.severity];
      },
    },
    {
      title: 'Occurrences',
      dataIndex: 'occurrences',
      key: 'occurrences',
      sorter: (a, b) => a.occurrences - b.occurrences,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
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
            Rejection Reasons
          </h1>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Input
              placeholder="Search rejection reasons..."
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
              Add Reason
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
            showTotal: (total) => `Total ${total} reasons`,
          }}
          style={{ background: 'transparent' }}
        />
      </Card>

      <AddRejectionReasonDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
};

export default RejectionReasons;
