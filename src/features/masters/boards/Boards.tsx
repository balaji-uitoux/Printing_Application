import { useState } from 'react';
import { Table, Button, Input, Space, Tag, Card, Select, message } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, DownOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import AddBoardDrawer from '../../../components/masters/AddBoardDrawer';

interface Board {
  id: string;
  code: string;
  name: string;
  type: string;
  gsm: number;
  size: string;
  finish: string;
  supplier: string;
  pricePerSheet: number;
  stockQuantity: number;
  status: 'Active' | 'Inactive';
}

const mockBoards: Board[] = [
  {
    id: '1',
    code: 'BRD-001',
    name: 'Art Card 300gsm',
    type: 'Art Card',
    gsm: 300,
    size: '20" x 30"',
    finish: 'Glossy',
    supplier: 'JK Papers',
    pricePerSheet: 45,
    stockQuantity: 500,
    status: 'Active',
  },
  {
    id: '2',
    code: 'BRD-002',
    name: 'Art Card 350gsm',
    type: 'Art Card',
    gsm: 350,
    size: '20" x 30"',
    finish: 'Matt',
    supplier: 'JK Papers',
    pricePerSheet: 52,
    stockQuantity: 300,
    status: 'Active',
  },
  {
    id: '3',
    code: 'BRD-003',
    name: 'Ivory Board 250gsm',
    type: 'Ivory Board',
    gsm: 250,
    size: '22" x 34"',
    finish: 'Matt',
    supplier: 'ITC Paperboards',
    pricePerSheet: 38,
    stockQuantity: 450,
    status: 'Active',
  },
  {
    id: '4',
    code: 'BRD-004',
    name: 'Maplitho 130gsm',
    type: 'Maplitho',
    gsm: 130,
    size: '20" x 30"',
    finish: 'Uncoated',
    supplier: 'West Coast Paper Mills',
    pricePerSheet: 18,
    stockQuantity: 800,
    status: 'Active',
  },
  {
    id: '5',
    code: 'BRD-005',
    name: 'Chromo Board 280gsm',
    type: 'Chromo Board',
    gsm: 280,
    size: '20" x 30"',
    finish: 'Glossy',
    supplier: 'Seshasayee Paper',
    pricePerSheet: 42,
    stockQuantity: 200,
    status: 'Active',
  },
  {
    id: '6',
    code: 'BRD-006',
    name: 'Duplex Board 300gsm',
    type: 'Duplex Board',
    gsm: 300,
    size: '24" x 36"',
    finish: 'Grey Back',
    supplier: 'Tamil Nadu Newsprint',
    pricePerSheet: 35,
    stockQuantity: 600,
    status: 'Active',
  },
  {
    id: '7',
    code: 'BRD-007',
    name: 'Glossy Art Paper 170gsm',
    type: 'Art Paper',
    gsm: 170,
    size: '20" x 30"',
    finish: 'Glossy',
    supplier: 'JK Papers',
    pricePerSheet: 28,
    stockQuantity: 100,
    status: 'Active',
  },
  {
    id: '8',
    code: 'BRD-008',
    name: 'Kraft Paper 120gsm',
    type: 'Kraft Paper',
    gsm: 120,
    size: '20" x 30"',
    finish: 'Natural',
    supplier: 'West Coast Paper Mills',
    pricePerSheet: 15,
    stockQuantity: 50,
    status: 'Inactive',
  },
];

const Boards = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(mockBoards);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSearch = (value: string) => {
    setSearchText(value);
    const filtered = mockBoards.filter(
      (item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.code.toLowerCase().includes(value.toLowerCase()) ||
        item.type.toLowerCase().includes(value.toLowerCase()) ||
        item.supplier.toLowerCase().includes(value.toLowerCase())
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

  const columns: ColumnsType<Board> = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: 'Board Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      filters: [
        { text: 'Art Card', value: 'Art Card' },
        { text: 'Art Paper', value: 'Art Paper' },
        { text: 'Ivory Board', value: 'Ivory Board' },
        { text: 'Maplitho', value: 'Maplitho' },
        { text: 'Chromo Board', value: 'Chromo Board' },
        { text: 'Duplex Board', value: 'Duplex Board' },
        { text: 'Kraft Paper', value: 'Kraft Paper' },
      ],
      onFilter: (value, record) => record.type === value,
    },
    {
      title: 'GSM',
      dataIndex: 'gsm',
      key: 'gsm',
      sorter: (a, b) => a.gsm - b.gsm,
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Finish',
      dataIndex: 'finish',
      key: 'finish',
    },
    {
      title: 'Supplier',
      dataIndex: 'supplier',
      key: 'supplier',
    },
    {
      title: 'Price/Sheet',
      dataIndex: 'pricePerSheet',
      key: 'pricePerSheet',
      sorter: (a, b) => a.pricePerSheet - b.pricePerSheet,
      render: (value) => `₹${value}`,
    },
    {
      title: 'Stock',
      dataIndex: 'stockQuantity',
      key: 'stockQuantity',
      sorter: (a, b) => a.stockQuantity - b.stockQuantity,
      render: (value) => (
        <span style={{ color: value < 200 ? '#EF4444' : '#10B981' }}>
          {value} sheets
        </span>
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
    <div className="master-page-container" data-testid="boards-page">
      <Card
        className="master-page-card"
        data-testid="boards-card"
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
              Boards & Papers
            </h1>
          </div>

          <div className="header-actions-section" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div className="header-search">
              <Input
                placeholder="Search boards..."
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
                Add Board
              </Button>
            </div>
          </div>
        </div>

        <div className="page-body" data-testid="page-body">
          <Table
            className="master-data-table"
            data-testid="boards-table"
            columns={columns}
            dataSource={filteredData}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} boards`,
            }}
            style={{ background: 'transparent' }}
          />
        </div>
      </Card>

      <AddBoardDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
};

export default Boards;
