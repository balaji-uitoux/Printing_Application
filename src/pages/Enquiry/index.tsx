import { useState } from 'react';
import { Table, Button, Input, Space, Card, Select, Tag } from 'antd';
import { EyeOutlined, EditOutlined, FileTextOutlined, SearchOutlined, PlusOutlined, DownOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { Enquiry as EnquiryType } from '../../types';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import AddEnquiryDrawer from '../../components/enquiry/AddEnquiryDrawer';
import ViewEnquiryDrawer from '../../components/enquiry/ViewEnquiryDrawer';

// Mock data
const mockEnquiries: EnquiryType[] = [
  {
    id: '1',
    enquiryNumber: 'ENQ-2024-001',
    customerName: 'Acme Corporation',
    productType: 'Business Cards',
    quantity: 1000,
    requestDate: '2024-01-15',
    status: 'New',
    estimatedCost: 250,
  },
  {
    id: '2',
    enquiryNumber: 'ENQ-2024-002',
    customerName: 'Tech Solutions Inc',
    productType: 'Brochures',
    quantity: 500,
    requestDate: '2024-01-16',
    status: 'Quoted',
    estimatedCost: 890,
  },
  {
    id: '3',
    enquiryNumber: 'ENQ-2024-003',
    customerName: 'Green Earth LLC',
    productType: 'Flyers',
    quantity: 2000,
    requestDate: '2024-01-17',
    status: 'Approved',
    estimatedCost: 450,
  },
  {
    id: '4',
    enquiryNumber: 'ENQ-2024-004',
    customerName: 'Urban Designs',
    productType: 'Banners',
    quantity: 10,
    requestDate: '2024-01-18',
    status: 'In Progress',
    estimatedCost: 1200,
  },
  {
    id: '5',
    enquiryNumber: 'ENQ-2024-005',
    customerName: 'Bright Marketing',
    productType: 'Posters',
    quantity: 300,
    requestDate: '2024-01-19',
    status: 'New',
    estimatedCost: 680,
  },
  {
    id: '6',
    enquiryNumber: 'ENQ-2024-006',
    customerName: 'Elite Events',
    productType: 'Labels',
    quantity: 5000,
    requestDate: '2024-01-20',
    status: 'Quoted',
    estimatedCost: 1500,
  },
  {
    id: '7',
    enquiryNumber: 'ENQ-2024-007',
    customerName: 'Modern Retail Co',
    productType: 'Catalogs',
    quantity: 200,
    requestDate: '2024-01-21',
    status: 'Rejected',
    estimatedCost: 2100,
  },
  {
    id: '8',
    enquiryNumber: 'ENQ-2024-008',
    customerName: 'Fashion Forward',
    productType: 'Hangtags',
    quantity: 10000,
    requestDate: '2024-01-22',
    status: 'Approved',
    estimatedCost: 3500,
  },
  {
    id: '9',
    enquiryNumber: 'ENQ-2024-009',
    customerName: 'Food Delight',
    productType: 'Menu Cards',
    quantity: 800,
    requestDate: '2024-01-23',
    status: 'In Progress',
    estimatedCost: 950,
  },
  {
    id: '10',
    enquiryNumber: 'ENQ-2024-010',
    customerName: 'Real Estate Pro',
    productType: 'Booklets',
    quantity: 150,
    requestDate: '2024-01-24',
    status: 'New',
    estimatedCost: 1850,
  },
  {
    id: '11',
    enquiryNumber: 'ENQ-2024-011',
    customerName: 'Wellness Center',
    productType: 'Business Cards',
    quantity: 500,
    requestDate: '2024-01-25',
    status: 'Quoted',
    estimatedCost: 125,
  },
  {
    id: '12',
    enquiryNumber: 'ENQ-2024-012',
    customerName: 'Auto Services Ltd',
    productType: 'Stickers',
    quantity: 3000,
    requestDate: '2024-01-26',
    status: 'Approved',
    estimatedCost: 780,
  },
];

const Enquiry = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(mockEnquiries);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [viewDrawerOpen, setViewDrawerOpen] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryType | null>(null);

  const handleSearch = (value: string) => {
    setSearchText(value);
    const filtered = mockEnquiries.filter(
      (item) =>
        item.customerName.toLowerCase().includes(value.toLowerCase()) ||
        item.enquiryNumber.toLowerCase().includes(value.toLowerCase()) ||
        item.productType.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleStatusChange = (enquiryId: string, newStatus: string) => {
    const updatedData = filteredData.map((item) =>
      item.id === enquiryId ? { ...item, status: newStatus as EnquiryType['status'] } : item
    );
    setFilteredData(updatedData);
    message.success(`Status updated to ${newStatus}`);
  };

  const handleAddEnquiry = () => {
    setDrawerOpen(true);
  };

  const handleView = (record: EnquiryType) => {
    setSelectedEnquiry(record);
    setViewDrawerOpen(true);
  };

  const handleEdit = (record: EnquiryType) => {
    message.info(`Editing enquiry: ${record.enquiryNumber}`);
  };

  const handleCreateQuotation = (record: EnquiryType) => {
    navigate('/quotations/create', { state: { enquiryData: record } });
  };

  const columns: ColumnsType<EnquiryType> = [
    {
      title: 'Enquiry No.',
      dataIndex: 'enquiryNumber',
      key: 'enquiryNumber',
      sorter: (a, b) => a.enquiryNumber.localeCompare(b.enquiryNumber),
    },
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',
      sorter: (a, b) => a.customerName.localeCompare(b.customerName),
    },
    {
      title: 'Product Type',
      dataIndex: 'productType',
      key: 'productType',
      filters: [
        { text: 'Business Cards', value: 'Business Cards' },
        { text: 'Brochures', value: 'Brochures' },
        { text: 'Flyers', value: 'Flyers' },
        { text: 'Banners', value: 'Banners' },
        { text: 'Labels', value: 'Labels' },
      ],
      onFilter: (value, record) => record.productType === value,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      sorter: (a, b) => a.quantity - b.quantity,
      render: (value) => value.toLocaleString(),
    },
    {
      title: 'Date',
      dataIndex: 'requestDate',
      key: 'requestDate',
      sorter: (a, b) => new Date(a.requestDate).getTime() - new Date(b.requestDate).getTime(),
    },
    {
      title: 'Estimated Cost',
      dataIndex: 'estimatedCost',
      key: 'estimatedCost',
      sorter: (a, b) => (a.estimatedCost || 0) - (b.estimatedCost || 0),
      render: (value) => (value ? `₹${value.toLocaleString()}` : '-'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'New', value: 'New' },
        { text: 'Quoted', value: 'Quoted' },
        { text: 'Approved', value: 'Approved' },
        { text: 'Rejected', value: 'Rejected' },
        { text: 'In Progress', value: 'In Progress' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status, record) => {
        const getStatusColor = (status: string) => {
          const colors: Record<string, string> = {
            New: 'blue',
            Quoted: 'orange',
            Approved: 'green',
            Rejected: 'red',
            'In Progress': 'purple',
          };
          return colors[status] || 'default';
        };

        return (
          <Select
            value={status}
            onChange={(newStatus) => handleStatusChange(record.id, newStatus)}
            style={{ width: '140px' }}
            size="small"
            variant="borderless"
            suffixIcon={null}
            options={[
              { value: 'New', label: 'New' },
              { value: 'Quoted', label: 'Quoted' },
              { value: 'Approved', label: 'Approved' },
              { value: 'Rejected', label: 'Rejected' },
              { value: 'In Progress', label: 'In Progress' },
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
      width: 320,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="text"
            icon={<EyeOutlined size={16} />}
            onClick={() => handleView(record)}
            size="small"
          >
            View
          </Button>
          <Button
            type="text"
            icon={<EditOutlined size={16} />}
            onClick={() => handleEdit(record)}
            size="small"
          >
            Edit
          </Button>
          <Button
            type="text"
            onClick={() => handleCreateQuotation(record)}
            size="small"
            disabled={record.status !== 'Approved'}
            className="create-quotation-btn"
            style={{
              color: record.status === 'Approved' ? '#3B82F6' : undefined,
              fontWeight: 600,
            }}
          >
            Create Quotation
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <style>{`
        .create-quotation-btn:not(:disabled):hover {
          background: transparent !important;
          text-decoration: underline;
          text-decoration-color: #3B82F6;
          padding: 0 !important;
        }
        .create-quotation-btn:not(:disabled):hover span {
          text-decoration: underline;
          text-decoration-color: #3B82F6;
        }
      `}</style>
      <div className="enquiry-page-container" data-testid="enquiry-page">
        <Card
        className="enquiry-page-card"
        data-testid="enquiry-card"
        style={{
          borderRadius: '16px',
          border: '1px solid rgba(226, 232, 240, 0.6)',
          background: 'rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        }}
        styles={{ body: { padding: '20px' } }}
      >
        {/* Header with Title, Search, and Add Button */}
        <div className="page-header" data-testid="page-header" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <div className="header-title-section">
            <h1 style={{
              fontSize: '24px',
              fontWeight: 600,
              color: '#0F172A',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <FileTextOutlined size={24} />
              Enquiries
            </h1>
          </div>

          <div className="header-actions-section" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div className="header-search">
              <Input
                placeholder="Search by customer, enquiry number, or product type"
                prefix={<SearchOutlined size={16} />}
                value={searchText}
                onChange={(e) => handleSearch(e.target.value)}
                style={{ width: '400px' }}
                size="large"
              />
            </div>
            <div className="header-button">
              <Button
                type="primary"
                icon={<PlusOutlined size={16} />}
                onClick={handleAddEnquiry}
                style={{
                  background: '#0F172A',
                  borderColor: '#0F172A',
                  height: '40px',
                  borderRadius: '50px',
                  padding: '0 20px'
                }}
              >
                Add Enquiry
              </Button>
            </div>
          </div>
        </div>

        <div className="page-body" data-testid="page-body">
          <Table
          className="enquiry-data-table"
          data-testid="enquiry-table"
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} enquiries`,
          }}
          style={{ background: 'transparent' }}
          />
        </div>
      </Card>

        <AddEnquiryDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        <ViewEnquiryDrawer
          open={viewDrawerOpen}
          onClose={() => {
            setViewDrawerOpen(false);
            setSelectedEnquiry(null);
          }}
          enquiry={selectedEnquiry}
        />
      </div>
    </>
  );
};

export default Enquiry;
