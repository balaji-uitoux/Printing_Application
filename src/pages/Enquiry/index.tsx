import { useState } from 'react';
import { Table, Button, Input, Space, Card, Tag, Tooltip } from 'antd';
import { EyeOutlined, EditOutlined, FileTextOutlined, SearchOutlined, PlusOutlined, InfoCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { Enquiry as EnquiryType } from '../../types';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import AddEnquiryDrawer from '../../components/enquiry/AddEnquiryDrawer';
import ViewEnquiryDrawer from '../../components/enquiry/ViewEnquiryDrawer';

// Mock data with products array
const mockEnquiries: (EnquiryType & { products?: string[]; contactNumber?: string; email?: string })[] = [
  {
    id: '1',
    enquiryNumber: 'ENQ-2024-001',
    customerName: 'Acme Corporation',
    productType: 'AALIA & ANUSHKA SLIPS',
    quantity: 1000,
    enquiryDate: '2024-01-15',
    status: 'New',
    estimatedCost: 250,
    products: ['AALIA & ANUSHKA SLIPS'],
    contactNumber: '+91 98765 43210',
    email: 'contact@acmecorp.com',
  },
  {
    id: '2',
    enquiryNumber: 'ENQ-2024-002',
    customerName: 'Tech Solutions Inc',
    productType: 'PUFFY & KURTHA BOX',
    quantity: 500,
    enquiryDate: '2024-01-16',
    status: 'Quoted',
    estimatedCost: 890,
    products: ['PUFFY & KURTHA BOX', 'DEEPIKA & MICHELLE SLIPS'],
    contactNumber: '+91 98234 56789',
    email: 'info@techsolutions.com',
  },
  {
    id: '3',
    enquiryNumber: 'ENQ-2024-003',
    customerName: 'Green Earth LLC',
    productType: 'EVELY SLIPS 6pcs BOX',
    quantity: 2000,
    enquiryDate: '2024-01-17',
    status: 'Approved',
    estimatedCost: 450,
    products: ['EVELY SLIPS 6pcs BOX', 'XPC - 99 BOX', 'RIYA KIDS PANTIES PHOTOCARD'],
    contactNumber: '+91 99876 54321',
    email: 'contact@greenearth.com',
  },
  {
    id: '4',
    enquiryNumber: 'ENQ-2024-004',
    customerName: 'Urban Designs',
    productType: 'XPC - 99 BOX',
    quantity: 10,
    enquiryDate: '2024-01-18',
    status: 'In Progress',
    estimatedCost: 1200,
    products: ['XPC - 99 BOX'],
    contactNumber: '+91 97654 32109',
    email: 'hello@urbandesigns.com',
  },
  {
    id: '5',
    enquiryNumber: 'ENQ-2024-005',
    customerName: 'Bright Marketing',
    productType: 'RIYA KIDS PANTIES PHOTOCARD',
    quantity: 300,
    enquiryDate: '2024-01-19',
    status: 'New',
    estimatedCost: 680,
    products: ['RIYA KIDS PANTIES PHOTOCARD', 'AALIA & ANUSHKA SLIPS'],
    contactNumber: '+91 96543 21098',
    email: 'team@brightmarketing.com',
  },
  {
    id: '6',
    enquiryNumber: 'ENQ-2024-006',
    customerName: 'Elite Events',
    productType: 'DEEPIKA & MICHELLE SLIPS',
    quantity: 5000,
    enquiryDate: '2024-01-20',
    status: 'Quoted',
    estimatedCost: 1500,
    products: ['DEEPIKA & MICHELLE SLIPS', 'PUFFY & KURTHA BOX', 'EVELY SLIPS 6pcs BOX'],
    contactNumber: '+91 95432 10987',
    email: 'events@eliteevents.com',
  },
  {
    id: '7',
    enquiryNumber: 'ENQ-2024-007',
    customerName: 'Modern Retail Co',
    productType: 'EVELY SLIPS 6pcs BOX',
    quantity: 200,
    enquiryDate: '2024-01-21',
    status: 'Rejected',
    estimatedCost: 2100,
    products: ['EVELY SLIPS 6pcs BOX'],
    contactNumber: '+91 94321 09876',
    email: 'sales@modernretail.com',
  },
  {
    id: '8',
    enquiryNumber: 'ENQ-2024-008',
    customerName: 'Fashion Forward',
    productType: 'AALIA & ANUSHKA SLIPS',
    quantity: 10000,
    enquiryDate: '2024-01-22',
    status: 'Approved',
    estimatedCost: 3500,
    products: ['AALIA & ANUSHKA SLIPS', 'DEEPIKA & MICHELLE SLIPS', 'XPC - 99 BOX', 'RIYA KIDS PANTIES PHOTOCARD'],
    contactNumber: '+91 93210 98765',
    email: 'orders@fashionforward.com',
  },
  {
    id: '9',
    enquiryNumber: 'ENQ-2024-009',
    customerName: 'Food Delight',
    productType: 'PUFFY & KURTHA BOX',
    quantity: 800,
    enquiryDate: '2024-01-23',
    status: 'In Progress',
    estimatedCost: 950,
    products: ['PUFFY & KURTHA BOX', 'EVELY SLIPS 6pcs BOX'],
    contactNumber: '+91 92109 87654',
    email: 'info@fooddelight.com',
  },
  {
    id: '10',
    enquiryNumber: 'ENQ-2024-010',
    customerName: 'Real Estate Pro',
    productType: 'XPC - 99 BOX',
    quantity: 150,
    enquiryDate: '2024-01-24',
    status: 'New',
    estimatedCost: 1850,
    products: ['XPC - 99 BOX', 'AALIA & ANUSHKA SLIPS'],
    contactNumber: '+91 91098 76543',
    email: 'contact@realestatepro.com',
  },
  {
    id: '11',
    enquiryNumber: 'ENQ-2024-011',
    customerName: 'Wellness Center',
    productType: 'RIYA KIDS PANTIES PHOTOCARD',
    quantity: 500,
    enquiryDate: '2024-01-25',
    status: 'Quoted',
    estimatedCost: 125,
    products: ['RIYA KIDS PANTIES PHOTOCARD'],
    contactNumber: '+91 90987 65432',
    email: 'wellness@center.com',
  },
  {
    id: '12',
    enquiryNumber: 'ENQ-2024-012',
    customerName: 'Auto Services Ltd',
    productType: 'DEEPIKA & MICHELLE SLIPS',
    quantity: 3000,
    enquiryDate: '2024-01-26',
    status: 'Approved',
    estimatedCost: 780,
    products: ['DEEPIKA & MICHELLE SLIPS', 'PUFFY & KURTHA BOX'],
    contactNumber: '+91 89876 54321',
    email: 'service@autoservices.com',
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
      title: 'Contact Number',
      dataIndex: 'contactNumber',
      key: 'contactNumber',
      width: 150,
      render: (contactNumber: string) => (
        <span style={{ fontSize: '13px', color: '#475569' }}>{contactNumber}</span>
      ),
    },
    {
      title: 'Email ID',
      dataIndex: 'email',
      key: 'email',
      width: 200,
      render: (email: string) => (
        <span style={{ fontSize: '13px', color: '#475569' }}>{email}</span>
      ),
    },
    {
      title: (
        <span>
          No. of Products{' '}
          <Tooltip title="View product details">
            <InfoCircleOutlined style={{ fontSize: '12px', color: '#64748B', cursor: 'pointer' }} />
          </Tooltip>
        </span>
      ),
      key: 'productCount',
      width: 150,
      render: (_, record: any) => {
        const products = record.products || [];
        const productCount = products.length;

        const productTooltipContent = (
          <div style={{ maxWidth: '300px' }}>
            <div style={{ fontWeight: 600, marginBottom: '8px' }}>
              {productCount} {productCount === 1 ? 'Product' : 'Products'}:
            </div>
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              {products.map((product: string, index: number) => (
                <li key={index} style={{ marginBottom: '4px' }}>
                  {product}
                </li>
              ))}
            </ul>
          </div>
        );

        return (
          <Tooltip title={productTooltipContent} placement="topLeft">
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              {productCount}
              <InfoCircleOutlined style={{ fontSize: '14px', color: '#3B82F6' }} />
            </span>
          </Tooltip>
        );
      },
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
      render: (status) => {
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
          <Tag color={getStatusColor(status)} style={{ margin: 0 }}>
            {status}
          </Tag>
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
