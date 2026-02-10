import { useState } from 'react';
import { Table, Button, Input, Card, Select, Tag, Progress } from 'antd';
import { EyeOutlined, SearchOutlined, DownOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { message } from 'antd';

type ProductionStage = 'Pre-Press' | 'Plate Making' | 'Printing' | 'Cutting' | 'Binding' | 'Quality Check' | 'Packaging' | 'Completed';
type ProductionStatus = 'Not Started' | 'In Progress' | 'Completed' | 'On Hold';

interface ProductionItem {
  id: string;
  jobOrderNumber: string;
  productName: string;
  category: string;
  customerName: string;
  company: string;
  quantity: number;
  currentStage: ProductionStage;
  status: ProductionStatus;
  progress: number;
  assignedTo: string;
  startDate: string;
  expectedDelivery: string;
}

const mockProductionData: ProductionItem[] = [
  {
    id: '1',
    jobOrderNumber: 'JO-2026-001',
    productName: 'Standard Business Card',
    category: 'Business Cards',
    customerName: 'John Smith',
    company: 'Acme Corporation',
    quantity: 500,
    currentStage: 'Printing',
    status: 'In Progress',
    progress: 43,
    assignedTo: 'Rajesh Kumar',
    startDate: '2026-02-01',
    expectedDelivery: '2026-02-10',
  },
  {
    id: '2',
    jobOrderNumber: 'JO-2026-001',
    productName: 'A4 Brochure - Bi-fold',
    category: 'Brochures',
    customerName: 'John Smith',
    company: 'Acme Corporation',
    quantity: 200,
    currentStage: 'Pre-Press',
    status: 'In Progress',
    progress: 14,
    assignedTo: 'Amit Patel',
    startDate: '2026-02-03',
    expectedDelivery: '2026-02-10',
  },
  {
    id: '3',
    jobOrderNumber: 'JO-2026-002',
    productName: 'Premium Business Card',
    category: 'Business Cards',
    customerName: 'Sarah Johnson',
    company: 'Tech Solutions Pvt Ltd',
    quantity: 1000,
    currentStage: 'Cutting',
    status: 'In Progress',
    progress: 57,
    assignedTo: 'Suresh Reddy',
    startDate: '2026-02-02',
    expectedDelivery: '2026-02-12',
  },
  {
    id: '4',
    jobOrderNumber: 'JO-2026-002',
    productName: 'A5 Flyer',
    category: 'Flyers',
    customerName: 'Sarah Johnson',
    company: 'Tech Solutions Pvt Ltd',
    quantity: 300,
    currentStage: 'Plate Making',
    status: 'In Progress',
    progress: 28,
    assignedTo: 'Vikram Singh',
    startDate: '2026-02-04',
    expectedDelivery: '2026-02-12',
  },
  {
    id: '5',
    jobOrderNumber: 'JO-2026-003',
    productName: 'A4 Catalogue - Saddle Stitch',
    category: 'Catalogues',
    customerName: 'Michael Chen',
    company: 'Green Earth Industries',
    quantity: 150,
    currentStage: 'Binding',
    status: 'In Progress',
    progress: 71,
    assignedTo: 'Priya Nair',
    startDate: '2026-02-03',
    expectedDelivery: '2026-02-11',
  },
  {
    id: '6',
    jobOrderNumber: 'JO-2026-003',
    productName: 'Product Label Roll',
    category: 'Labels & Stickers',
    customerName: 'Michael Chen',
    company: 'Green Earth Industries',
    quantity: 5000,
    currentStage: 'Printing',
    status: 'In Progress',
    progress: 43,
    assignedTo: 'Rajesh Kumar',
    startDate: '2026-02-05',
    expectedDelivery: '2026-02-11',
  },
  {
    id: '7',
    jobOrderNumber: 'JO-2026-004',
    productName: 'A3 Poster',
    category: 'Posters',
    customerName: 'Emma Wilson',
    company: 'Urban Designs Studio',
    quantity: 100,
    currentStage: 'Quality Check',
    status: 'In Progress',
    progress: 86,
    assignedTo: 'Deepa Sharma',
    startDate: '2026-02-04',
    expectedDelivery: '2026-02-14',
  },
  {
    id: '8',
    jobOrderNumber: 'JO-2026-004',
    productName: 'Standard Business Card',
    category: 'Business Cards',
    customerName: 'Emma Wilson',
    company: 'Urban Designs Studio',
    quantity: 250,
    currentStage: 'Pre-Press',
    status: 'Not Started',
    progress: 0,
    assignedTo: 'Unassigned',
    startDate: '2026-02-06',
    expectedDelivery: '2026-02-14',
  },
  {
    id: '9',
    jobOrderNumber: 'JO-2026-005',
    productName: 'Corrugated Box - Small',
    category: 'Packaging',
    customerName: 'David Lee',
    company: 'Creative Minds Ltd',
    quantity: 400,
    currentStage: 'Packaging',
    status: 'In Progress',
    progress: 95,
    assignedTo: 'Arjun Mehta',
    startDate: '2026-02-05',
    expectedDelivery: '2026-02-15',
  },
  {
    id: '10',
    jobOrderNumber: 'JO-2026-005',
    productName: 'A4 Brochure - Bi-fold',
    category: 'Brochures',
    customerName: 'David Lee',
    company: 'Creative Minds Ltd',
    quantity: 500,
    currentStage: 'Completed',
    status: 'Completed',
    progress: 100,
    assignedTo: 'Rajesh Kumar',
    startDate: '2026-02-05',
    expectedDelivery: '2026-02-15',
  },
  {
    id: '11',
    jobOrderNumber: 'JO-2026-006',
    productName: 'A5 Flyer',
    category: 'Flyers',
    customerName: 'Priya Sharma',
    company: 'Digital Marketing Co',
    quantity: 1000,
    currentStage: 'Printing',
    status: 'On Hold',
    progress: 43,
    assignedTo: 'Vikram Singh',
    startDate: '2026-02-06',
    expectedDelivery: '2026-02-16',
  },
  {
    id: '12',
    jobOrderNumber: 'JO-2026-007',
    productName: 'Premium Business Card',
    category: 'Business Cards',
    customerName: 'James Wilson',
    company: 'Print Solutions Inc',
    quantity: 2000,
    currentStage: 'Plate Making',
    status: 'In Progress',
    progress: 28,
    assignedTo: 'Amit Patel',
    startDate: '2026-02-07',
    expectedDelivery: '2026-02-17',
  },
  {
    id: '13',
    jobOrderNumber: 'JO-2026-007',
    productName: 'A4 Catalogue - Saddle Stitch',
    category: 'Catalogues',
    customerName: 'James Wilson',
    company: 'Print Solutions Inc',
    quantity: 300,
    currentStage: 'Pre-Press',
    status: 'In Progress',
    progress: 14,
    assignedTo: 'Priya Nair',
    startDate: '2026-02-08',
    expectedDelivery: '2026-02-17',
  },
  {
    id: '14',
    jobOrderNumber: 'JO-2026-008',
    productName: 'Product Label Roll',
    category: 'Labels & Stickers',
    customerName: 'Lisa Anderson',
    company: 'Brand Innovations',
    quantity: 3000,
    currentStage: 'Cutting',
    status: 'On Hold',
    progress: 57,
    assignedTo: 'Suresh Reddy',
    startDate: '2026-02-08',
    expectedDelivery: '2026-02-18',
  },
  {
    id: '15',
    jobOrderNumber: 'JO-2026-009',
    productName: 'A3 Poster',
    category: 'Posters',
    customerName: 'Robert Taylor',
    company: 'Marketing Pros LLC',
    quantity: 200,
    currentStage: 'Printing',
    status: 'In Progress',
    progress: 43,
    assignedTo: 'Rajesh Kumar',
    startDate: '2026-02-09',
    expectedDelivery: '2026-02-19',
  },
];

const Production = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(mockProductionData);

  const handleSearch = (value: string) => {
    setSearchText(value);
    const filtered = mockProductionData.filter(
      (item) =>
        item.jobOrderNumber.toLowerCase().includes(value.toLowerCase()) ||
        item.productName.toLowerCase().includes(value.toLowerCase()) ||
        item.customerName.toLowerCase().includes(value.toLowerCase()) ||
        item.company.toLowerCase().includes(value.toLowerCase()) ||
        item.currentStage.toLowerCase().includes(value.toLowerCase()) ||
        item.assignedTo.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleStatusChange = (itemId: string, newStatus: string) => {
    const updatedData = filteredData.map((item) =>
      item.id === itemId ? { ...item, status: newStatus as ProductionStatus } : item
    );
    setFilteredData(updatedData);
    message.success(`Status updated to ${newStatus}`);
  };

  const handleViewDetails = (record: ProductionItem) => {
    message.info(`Viewing production details for: ${record.productName} (${record.jobOrderNumber})`);
  };

  const columns: ColumnsType<ProductionItem> = [
    {
      title: 'Job Order',
      dataIndex: 'jobOrderNumber',
      key: 'jobOrderNumber',
      width: 130,
      fixed: 'left',
      sorter: (a, b) => a.jobOrderNumber.localeCompare(b.jobOrderNumber),
    },
    {
      title: 'Product',
      dataIndex: 'productName',
      key: 'productName',
      width: 200,
      sorter: (a, b) => a.productName.localeCompare(b.productName),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: 150,
      filters: [
        { text: 'Business Cards', value: 'Business Cards' },
        { text: 'Brochures', value: 'Brochures' },
        { text: 'Flyers', value: 'Flyers' },
        { text: 'Posters', value: 'Posters' },
        { text: 'Packaging', value: 'Packaging' },
        { text: 'Labels & Stickers', value: 'Labels & Stickers' },
        { text: 'Catalogues', value: 'Catalogues' },
      ],
      onFilter: (value, record) => record.category === value,
    },
    {
      title: 'Customer',
      dataIndex: 'customerName',
      key: 'customerName',
      width: 140,
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      width: 180,
    },
    {
      title: 'Qty',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 80,
      sorter: (a, b) => a.quantity - b.quantity,
      render: (value) => value.toLocaleString(),
    },
    {
      title: 'Current Stage',
      dataIndex: 'currentStage',
      key: 'currentStage',
      width: 140,
      filters: [
        { text: 'Pre-Press', value: 'Pre-Press' },
        { text: 'Plate Making', value: 'Plate Making' },
        { text: 'Printing', value: 'Printing' },
        { text: 'Cutting', value: 'Cutting' },
        { text: 'Binding', value: 'Binding' },
        { text: 'Quality Check', value: 'Quality Check' },
        { text: 'Packaging', value: 'Packaging' },
        { text: 'Completed', value: 'Completed' },
      ],
      onFilter: (value, record) => record.currentStage === value,
      render: (stage: ProductionStage) => {
        const stageColors: Record<ProductionStage, string> = {
          'Pre-Press': 'purple',
          'Plate Making': 'geekblue',
          'Printing': 'blue',
          'Cutting': 'cyan',
          'Binding': 'orange',
          'Quality Check': 'gold',
          'Packaging': 'lime',
          'Completed': 'green',
        };
        return <Tag color={stageColors[stage]}>{stage}</Tag>;
      },
    },
    {
      title: 'Progress',
      dataIndex: 'progress',
      key: 'progress',
      width: 150,
      sorter: (a, b) => a.progress - b.progress,
      render: (value: number) => {
        const color = value === 100 ? '#52c41a' : value >= 50 ? '#1677ff' : '#faad14';
        return <Progress percent={value} size="small" strokeColor={color} style={{ margin: 0, minWidth: '100px' }} />;
      },
    },
    {
      title: 'Assigned To',
      dataIndex: 'assignedTo',
      key: 'assignedTo',
      width: 140,
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      width: 120,
      sorter: (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
    },
    {
      title: 'Expected Delivery',
      dataIndex: 'expectedDelivery',
      key: 'expectedDelivery',
      width: 140,
      sorter: (a, b) => new Date(a.expectedDelivery).getTime() - new Date(b.expectedDelivery).getTime(),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 160,
      filters: [
        { text: 'Not Started', value: 'Not Started' },
        { text: 'In Progress', value: 'In Progress' },
        { text: 'Completed', value: 'Completed' },
        { text: 'On Hold', value: 'On Hold' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status: ProductionStatus, record) => {
        const getStatusColor = (s: string) => {
          const colors: Record<string, string> = {
            'Not Started': 'default',
            'In Progress': 'processing',
            'Completed': 'success',
            'On Hold': 'warning',
          };
          return colors[s] || 'default';
        };

        return (
          <Select
            value={status}
            onChange={(newStatus) => handleStatusChange(record.id, newStatus)}
            style={{ width: '100%' }}
            size="small"
            variant="borderless"
            suffixIcon={null}
            options={[
              { value: 'Not Started', label: 'Not Started' },
              { value: 'In Progress', label: 'In Progress' },
              { value: 'Completed', label: 'Completed' },
              { value: 'On Hold', label: 'On Hold' },
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
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 100,
      fixed: 'right',
      render: (_, record) => (
        <Button
          type="text"
          icon={<EyeOutlined style={{ fontSize: '16px' }} />}
          onClick={() => handleViewDetails(record)}
          size="small"
          style={{ padding: '4px 8px' }}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <>
      <style>{`
        .production-data-table .ant-table {
          border-collapse: collapse;
        }

        .production-data-table .ant-table-thead > tr > th {
          background: #F8FAFC !important;
          padding: 12px 16px;
          height: 48px;
          border-bottom: 1px solid #e0e0e0;
          font-weight: 600;
          font-size: 13px;
          color: #64748B;
        }

        .production-data-table .ant-table-tbody > tr > td {
          padding: 12px 16px;
          height: 48px;
          border-bottom: 1px solid #f0f0f0;
          background: #FFFFFF;
        }

        .production-data-table .ant-table-cell-fix-left {
          background: #FFFFFF !important;
          box-shadow: 2px 0 4px rgba(0, 0, 0, 0.06) !important;
          z-index: 2 !important;
        }

        .production-data-table .ant-table-thead .ant-table-cell-fix-left {
          background: #F8FAFC !important;
          box-shadow: 2px 0 4px rgba(0, 0, 0, 0.06) !important;
          z-index: 3 !important;
        }

        .production-data-table .ant-table-cell-fix-right {
          background: #FFFFFF !important;
          box-shadow: -2px 0 4px rgba(0, 0, 0, 0.06) !important;
          z-index: 2 !important;
        }

        .production-data-table .ant-table-thead .ant-table-cell-fix-right {
          background: #F8FAFC !important;
          box-shadow: -2px 0 4px rgba(0, 0, 0, 0.06) !important;
          z-index: 3 !important;
        }

        .production-data-table .ant-table-tbody > tr:hover > td {
          background: #F8FAFC !important;
        }

        .production-data-table .ant-table-tbody > tr:hover > td.ant-table-cell-fix-left,
        .production-data-table .ant-table-tbody > tr:hover > td.ant-table-cell-fix-right {
          background: #F8FAFC !important;
        }

        .production-data-table .ant-table-measure-row {
          display: none;
        }

        .production-data-table .ant-pagination {
          margin-top: 16px;
        }
      `}</style>

      <div data-testid="production-page">
        <Card
          data-testid="production-card"
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
            <div>
              <h1
                style={{
                  fontSize: '24px',
                  fontWeight: 600,
                  color: '#0F172A',
                  margin: 0,
                }}
              >
                Production
              </h1>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Input
                placeholder="Search production..."
                prefix={<SearchOutlined style={{ fontSize: '16px' }} />}
                value={searchText}
                onChange={(e) => handleSearch(e.target.value)}
                style={{ width: '400px' }}
                size="large"
              />
            </div>
          </div>

          <Table
            className="production-data-table"
            data-testid="production-table"
            columns={columns}
            dataSource={filteredData}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} items`,
            }}
            style={{ background: 'transparent', margin: 0, padding: 0 }}
            scroll={{ x: 1830 }}
          />
        </Card>
      </div>
    </>
  );
};

export default Production;
