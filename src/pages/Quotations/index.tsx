import { useState } from 'react';
import { Table, Button, Input, Space, Card, Tag, Segmented, Drawer, Modal, Form, Tooltip } from 'antd';
import { SearchOutlined, EyeOutlined, EditOutlined, CheckOutlined, CloseOutlined, InfoCircleOutlined, DownloadOutlined, ShareAltOutlined } from '@ant-design/icons';
import { message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import TextArea from 'antd/es/input/TextArea';
import { themeColors } from '../../theme/themeConfig';

interface Product {
  name: string;
  quantity: number;
}

interface Quotation {
  id: string;
  quotationNumber: string;
  enquiryNumber: string;
  customerName: string;
  productType: string;
  totalProducts: number;
  products: Product[];
  quantity: number;
  totalAmount: number;
  createdDate: string;
  validUntil: string;
  status: 'Draft' | 'Sent' | 'Approved' | 'Rejected' | 'Expired';
}

const mockQuotations: Quotation[] = [
  {
    id: '1',
    quotationNumber: 'QUO-2024-001',
    enquiryNumber: 'ENQ-2024-001',
    customerName: 'Tech Innovators Ltd',
    productType: 'Business Cards',
    totalProducts: 3,
    products: [
      { name: 'ANUSHKA PHOTOCARD', quantity: 1000 },
      { name: 'TOP - 286 X 199 X 38', quantity: 500 },
      { name: 'EVELY SLIPS PHOTOCARD', quantity: 2000 }
    ],
    quantity: 5000,
    totalAmount: 12500,
    createdDate: '2024-01-15',
    validUntil: '2024-02-15',
    status: 'Sent',
  },
  {
    id: '2',
    quotationNumber: 'QUO-2024-002',
    enquiryNumber: 'ENQ-2024-003',
    customerName: 'Creative Solutions Inc',
    productType: 'Brochures',
    totalProducts: 2,
    products: [
      { name: 'PUFFY PHOTOCARD', quantity: 1500 },
      { name: 'MICHELLE PHOTOCARD', quantity: 500 }
    ],
    quantity: 2000,
    totalAmount: 8500,
    createdDate: '2024-01-16',
    validUntil: '2024-02-16',
    status: 'Approved',
  },
  {
    id: '3',
    quotationNumber: 'QUO-2024-003',
    enquiryNumber: 'ENQ-2024-005',
    customerName: 'Modern Enterprises',
    productType: 'Packaging Boxes',
    totalProducts: 3,
    products: [
      { name: 'BTM - 281 X 194 X 45', quantity: 300 },
      { name: 'TOP - 286 X 199 X 38', quantity: 400 },
      { name: 'XPC - 99 PHOTOCARD', quantity: 300 }
    ],
    quantity: 1000,
    totalAmount: 15750,
    createdDate: '2024-01-17',
    validUntil: '2024-02-17',
    status: 'Draft',
  },
  {
    id: '4',
    quotationNumber: 'QUO-2024-004',
    enquiryNumber: 'ENQ-2024-008',
    customerName: 'Fashion Forward',
    productType: 'Hangtags',
    totalProducts: 1,
    products: [
      { name: 'RIYA KIDS PHOTOCARD', quantity: 10000 }
    ],
    quantity: 10000,
    totalAmount: 4200,
    createdDate: '2024-01-18',
    validUntil: '2024-02-18',
    status: 'Rejected',
  },
];

const Quotations = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(mockQuotations);
  const [activeTab, setActiveTab] = useState<string>('quotations');
  const [viewDrawerVisible, setViewDrawerVisible] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState<Quotation | null>(null);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showQuotationPreview, setShowQuotationPreview] = useState(false);
  const [form] = Form.useForm();

  // Mock approval data (quotations pending approval)
  const mockApprovals: Quotation[] = [
    {
      id: '5',
      quotationNumber: 'QUO-2024-005',
      enquiryNumber: 'ENQ-2024-010',
      customerName: 'Global Traders Co',
      productType: 'Product Labels',
      totalProducts: 2,
      products: [
        { name: 'ANUSHKA PHOTOCARD', quantity: 2000 },
        { name: 'PUFFY PHOTOCARD', quantity: 1000 }
      ],
      quantity: 3000,
      totalAmount: 9800,
      createdDate: '2024-01-19',
      validUntil: '2024-02-19',
      status: 'Sent',
    },
    {
      id: '6',
      quotationNumber: 'QUO-2024-006',
      enquiryNumber: 'ENQ-2024-012',
      customerName: 'Elite Packaging Ltd',
      productType: 'Custom Boxes',
      totalProducts: 3,
      products: [
        { name: 'TOP - 286 X 199 X 38', quantity: 500 },
        { name: 'BTM - 281 X 194 X 45', quantity: 500 },
        { name: 'EVELY SLIPS PHOTOCARD', quantity: 500 }
      ],
      quantity: 1500,
      totalAmount: 18500,
      createdDate: '2024-01-20',
      validUntil: '2024-02-20',
      status: 'Sent',
    },
  ];

  const handleSearch = (value: string) => {
    setSearchText(value);
    const dataSource = activeTab === 'quotations' ? mockQuotations : mockApprovals;
    const filtered = dataSource.filter(
      (item) =>
        item.quotationNumber.toLowerCase().includes(value.toLowerCase()) ||
        item.customerName.toLowerCase().includes(value.toLowerCase()) ||
        item.enquiryNumber.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };


  const handleView = (record: Quotation) => {
    setSelectedQuotation(record);
    setViewDrawerVisible(true);
    setShowQuotationPreview(false); // Start with workflow stages view
  };

  const handleEdit = (record: Quotation) => {
    console.log('Edit quotation:', record);
  };

  const handleApprove = () => {
    message.success(`Quotation ${selectedQuotation?.quotationNumber} approved successfully!`);
    setViewDrawerVisible(false);
    setSelectedQuotation(null);
  };

  const handleRejectClick = () => {
    setRejectModalVisible(true);
  };

  const handleRejectSubmit = () => {
    form.validateFields().then(() => {
      message.error(`Quotation ${selectedQuotation?.quotationNumber} rejected. Reason: ${rejectionReason}`);
      setRejectModalVisible(false);
      setViewDrawerVisible(false);
      setSelectedQuotation(null);
      setRejectionReason('');
      form.resetFields();
    });
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSearchText('');
    setFilteredData(value === 'quotations' ? mockQuotations : mockApprovals);
  };

  const columns: ColumnsType<Quotation> = [
    {
      title: 'Quotation No.',
      dataIndex: 'quotationNumber',
      key: 'quotationNumber',
      sorter: (a, b) => a.quotationNumber.localeCompare(b.quotationNumber),
    },
    {
      title: 'Enquiry No.',
      dataIndex: 'enquiryNumber',
      key: 'enquiryNumber',
    },
    {
      title: 'Client Name',
      dataIndex: 'customerName',
      key: 'customerName',
      sorter: (a, b) => a.customerName.localeCompare(b.customerName),
    },
    {
      title: (
        <span>
          Total Product{' '}
          <Tooltip title="View product details">
            <InfoCircleOutlined style={{ fontSize: '12px', color: '#64748B', cursor: 'pointer' }} />
          </Tooltip>
        </span>
      ),
      key: 'totalProducts',
      width: 150,
      sorter: (a, b) => a.totalProducts - b.totalProducts,
      render: (_, record: Quotation) => {
        const productCount = record.products.length;

        const productTooltipContent = (
          <div style={{ maxWidth: '300px' }}>
            <div style={{ fontWeight: 600, marginBottom: '8px' }}>
              {productCount} {productCount === 1 ? 'Product' : 'Products'}:
            </div>
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              {record.products.map((product, idx) => (
                <li key={idx} style={{ marginBottom: '4px' }}>
                  {product.name} - Qty: {product.quantity.toLocaleString()}
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
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      sorter: (a, b) => a.quantity - b.quantity,
      render: (value) => value.toLocaleString(),
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      sorter: (a, b) => a.totalAmount - b.totalAmount,
      render: (value) => `₹${value.toLocaleString()}`,
    },
    {
      title: 'Created Date',
      dataIndex: 'createdDate',
      key: 'createdDate',
      sorter: (a, b) => new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime(),
    },
    {
      title: 'Valid Upto',
      dataIndex: 'validUntil',
      key: 'validUntil',
      sorter: (a, b) => new Date(a.validUntil).getTime() - new Date(b.validUntil).getTime(),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const getStatusColor = (status: string) => {
          const colors: Record<string, string> = {
            Draft: 'default',
            Sent: 'blue',
            Approved: 'green',
            Rejected: 'red',
            Expired: 'orange',
          };
          return colors[status] || 'default';
        };

        return (
          <Tag color={getStatusColor(status)} style={{ margin: 0 }}>
            {status}
          </Tag>
        );
      },
      filters: [
        { text: 'Draft', value: 'Draft' },
        { text: 'Sent', value: 'Sent' },
        { text: 'Approved', value: 'Approved' },
        { text: 'Rejected', value: 'Rejected' },
        { text: 'Expired', value: 'Expired' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EyeOutlined size={16} />}
            onClick={() => handleView(record)}
            size="small"
          >
            View
          </Button>
          {record.status === 'Draft' && (
            <Button
              type="text"
              icon={<EditOutlined size={16} />}
              onClick={() => handleEdit(record)}
              size="small"
            >
              Edit
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="quotations-page-container" data-testid="quotations-page">
      <style>
        {`
          .custom-segmented .ant-segmented-item-selected {
            background: #0F172A !important;
            color: #FFFFFF !important;
          }
          .custom-segmented .ant-segmented-item-selected .ant-segmented-item-label {
            color: #FFFFFF !important;
          }
          .custom-segmented .ant-segmented-item:hover:not(.ant-segmented-item-selected) {
            background: rgba(15, 23, 42, 0.1) !important;
          }

          @media print {
            @page {
              size: A4;
              margin: 0;
            }

            body {
              margin: 0;
              padding: 0;
            }

            .ant-drawer-mask,
            .ant-drawer-close {
              display: none !important;
            }

            .ant-drawer-content-wrapper {
              width: 210mm !important;
              max-width: 210mm !important;
              box-shadow: none !important;
            }

            .ant-drawer-body {
              padding: 0 !important;
              background: #FFFFFF !important;
            }

            /* Hide header when printing */
            .quotation-preview-header {
              display: none !important;
            }
          }
        `}
      </style>
      <Card
        className="quotations-page-card"
        data-testid="quotations-card"
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
            {/* Glass-effect Tabs */}
            <Segmented
              value={activeTab}
              onChange={handleTabChange}
              options={[
                { label: 'Quotations', value: 'quotations' },
                { label: 'Approvals', value: 'approvals' },
              ]}
              size="large"
              style={{
                background: 'rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(226, 232, 240, 0.8)',
                borderRadius: '12px',
                padding: '4px',
              }}
              className="custom-segmented"
            />
          </div>

          <div className="header-actions-section" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div className="header-search">
              <Input
                placeholder="Search quotations..."
                prefix={<SearchOutlined size={16} />}
                value={searchText}
                onChange={(e) => handleSearch(e.target.value)}
                style={{ width: '300px' }}
                size="large"
              />
            </div>
          </div>
        </div>

        <div className="page-body" data-testid="page-body">
          <Table
            className="quotations-data-table"
            data-testid="quotations-table"
            columns={columns}
            dataSource={filteredData}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} ${activeTab === 'quotations' ? 'quotations' : 'pending approvals'}`,
            }}
            style={{ background: 'transparent' }}
          />
        </div>
      </Card>

      {/* View Drawer */}
      <Drawer
        title={null}
        placement="right"
        onClose={() => {
          setViewDrawerVisible(false);
          setSelectedQuotation(null);
          setShowQuotationPreview(false);
        }}
        open={viewDrawerVisible}
        closable={false}
        styles={{
          body: { padding: 0, background: 'linear-gradient(135deg, #F0F4F8 0%, #E8EDF2 25%, #F5F0F8 50%, #E8F0F2 75%, #F0F8F4 100%)' },
          wrapper: { width: '900px' },
        }}
        footer={
          activeTab === 'approvals' && selectedQuotation ? (
            <div style={{ textAlign: 'right', display: 'flex', gap: '12px', justifyContent: 'flex-end', padding: '16px 24px', borderTop: `1px solid ${themeColors.borderLight}`, background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)' }}>
              <Button
                icon={<CloseOutlined />}
                onClick={handleRejectClick}
                size="large"
                style={{
                  borderRadius: '50px',
                  borderColor: themeColors.error,
                  color: themeColors.error,
                  height: '40px',
                  padding: '0 24px',
                  fontWeight: 600,
                }}
              >
                Reject
              </Button>
              <Button
                type="primary"
                icon={<CheckOutlined />}
                onClick={handleApprove}
                size="large"
                style={{
                  background: themeColors.success,
                  borderColor: themeColors.success,
                  borderRadius: '50px',
                  height: '40px',
                  padding: '0 24px',
                  fontWeight: 600,
                }}
              >
                Approve
              </Button>
            </div>
          ) : null
        }
      >
        {selectedQuotation && (
          <>
            {/* Header with dynamic title and View Quotation button */}
            <div className="quotation-preview-header" style={{
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(20px)',
              padding: '20px 24px',
              borderBottom: `1px solid rgba(226, 232, 240, 0.6)`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              position: 'sticky',
              top: 0,
              zIndex: 10
            }}>
              <h2 style={{
                margin: 0,
                fontSize: '20px',
                fontWeight: 600,
                color: themeColors.text,
                letterSpacing: '-0.01em'
              }}>
                {showQuotationPreview ? 'Quotation Preview' : 'View'}
              </h2>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                {!showQuotationPreview && (
                  <Button
                    type="primary"
                    icon={<EyeOutlined />}
                    onClick={() => setShowQuotationPreview(true)}
                    style={{
                      background: '#0F172A',
                      borderColor: '#0F172A',
                      height: '40px',
                      borderRadius: '50px',
                      padding: '0 24px',
                      fontWeight: 600,
                    }}
                  >
                    View Quotation
                  </Button>
                )}
                {showQuotationPreview && (
                  <>
                    <Button
                      icon={<DownloadOutlined />}
                      onClick={() => {
                        message.success('Downloading PDF...');
                      }}
                      style={{
                        height: '40px',
                        borderRadius: '50px',
                        padding: '0 20px',
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      Download PDF
                    </Button>
                    <Button
                      icon={<ShareAltOutlined />}
                      onClick={() => {
                        message.success('Share PDF...');
                      }}
                      style={{
                        height: '40px',
                        borderRadius: '50px',
                        padding: '0 20px',
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      Share PDF
                    </Button>
                    <Button
                      onClick={() => setShowQuotationPreview(false)}
                      style={{
                        height: '40px',
                        borderRadius: '50px',
                        padding: '0 24px',
                        fontWeight: 600,
                      }}
                    >
                      Back to Workflow
                    </Button>
                  </>
                )}
                <Button
                  type="text"
                  onClick={() => {
                    setViewDrawerVisible(false);
                    setSelectedQuotation(null);
                    setShowQuotationPreview(false);
                  }}
                  style={{
                    fontSize: '24px',
                    color: themeColors.textSecondary,
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  ×
                </Button>
              </div>
            </div>

            {/* Content - Conditional rendering based on view mode */}
            {!showQuotationPreview ? (
              /* Workflow Stages View - Invoice Style Layout */
              <div style={{ padding: '20px', overflowY: 'auto', height: activeTab === 'approvals' ? 'calc(100vh - 150px)' : 'calc(100vh - 70px)' }}>
                <div style={{
                  maxWidth: '1200px',
                  margin: '0 auto',
                  background: '#FFFFFF',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  padding: '24px'
                }}>

                  {/* Products Title */}
                  <div style={{
                    marginBottom: '20px'
                  }}>
                    <h2 style={{
                      margin: 0,
                      fontSize: '24px',
                      fontWeight: 700,
                      color: themeColors.text,
                      letterSpacing: '0.02em'
                    }}>Products</h2>
                  </div>

                  {/* Products with Workflow Stages */}
                  {selectedQuotation.products.map((product, index) => (
                    <div key={index} style={{ marginBottom: '16px' }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '8px 0',
                        marginBottom: '8px'
                      }}>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '14px', color: themeColors.text }}>
                            {product.name}
                          </div>
                          <div style={{ fontSize: '12px', color: themeColors.textSecondary, marginTop: '2px' }}>
                            Quantity: {product.quantity.toLocaleString()}
                          </div>
                        </div>
                        <Tag color="blue" style={{ fontSize: '11px', padding: '2px 8px' }}>
                          Product {index + 1} of {selectedQuotation.products.length}
                        </Tag>
                      </div>

                      <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${themeColors.border}`, marginBottom: '8px' }}>
                        <thead>
                          <tr style={{ background: '#F8FAFC' }}>
                            <th style={{
                              padding: '8px 12px',
                              textAlign: 'left',
                              fontWeight: 600,
                              fontSize: '11px',
                              color: themeColors.textSecondary,
                              border: `1px solid ${themeColors.border}`
                            }}>Stage</th>
                            <th style={{
                              padding: '8px 12px',
                              textAlign: 'left',
                              fontWeight: 600,
                              fontSize: '11px',
                              color: themeColors.textSecondary,
                              border: `1px solid ${themeColors.border}`
                            }}>Details</th>
                            <th style={{
                              padding: '8px 12px',
                              textAlign: 'right',
                              fontWeight: 600,
                              fontSize: '11px',
                              color: themeColors.textSecondary,
                              border: `1px solid ${themeColors.border}`,
                              width: '120px'
                            }}>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td style={{ padding: '8px 12px', fontSize: '12px', fontWeight: 600, color: themeColors.text, border: `1px solid ${themeColors.border}` }}>Board</td>
                            <td style={{ padding: '8px 12px', fontSize: '11px', color: themeColors.textSecondary, border: `1px solid ${themeColors.border}` }}>Art Card 300gsm - 20" × 30"</td>
                            <td style={{ padding: '8px 12px', fontSize: '12px', fontWeight: 600, textAlign: 'right', color: themeColors.text, border: `1px solid ${themeColors.border}` }}>
                              ₹{(Math.random() * 2000 + 1000).toFixed(2)}
                            </td>
                          </tr>
                          <tr>
                            <td style={{ padding: '8px 12px', fontSize: '12px', fontWeight: 600, color: themeColors.text, border: `1px solid ${themeColors.border}` }}>Printing</td>
                            <td style={{ padding: '8px 12px', fontSize: '11px', color: themeColors.textSecondary, border: `1px solid ${themeColors.border}` }}>4 Color CMYK - Offset</td>
                            <td style={{ padding: '8px 12px', fontSize: '12px', fontWeight: 600, textAlign: 'right', color: themeColors.text, border: `1px solid ${themeColors.border}` }}>
                              ₹{(Math.random() * 1500 + 500).toFixed(2)}
                            </td>
                          </tr>
                          <tr>
                            <td style={{ padding: '8px 12px', fontSize: '12px', fontWeight: 600, color: themeColors.text, border: `1px solid ${themeColors.border}` }}>Lamination</td>
                            <td style={{ padding: '8px 12px', fontSize: '11px', color: themeColors.textSecondary, border: `1px solid ${themeColors.border}` }}>Glossy - Single Side</td>
                            <td style={{ padding: '8px 12px', fontSize: '12px', fontWeight: 600, textAlign: 'right', color: themeColors.text, border: `1px solid ${themeColors.border}` }}>
                              ₹{(Math.random() * 800 + 200).toFixed(2)}
                            </td>
                          </tr>
                          <tr>
                            <td style={{ padding: '8px 12px', fontSize: '12px', fontWeight: 600, color: themeColors.text, border: `1px solid ${themeColors.border}` }}>Die Cutting</td>
                            <td style={{ padding: '8px 12px', fontSize: '11px', color: themeColors.textSecondary, border: `1px solid ${themeColors.border}` }}>Custom Shape</td>
                            <td style={{ padding: '8px 12px', fontSize: '12px', fontWeight: 600, textAlign: 'right', color: themeColors.text, border: `1px solid ${themeColors.border}` }}>
                              ₹{(Math.random() * 500 + 150).toFixed(2)}
                            </td>
                          </tr>
                          <tr>
                            <td style={{ padding: '8px 12px', fontSize: '12px', fontWeight: 600, color: themeColors.text, border: `1px solid ${themeColors.border}` }}>Packing</td>
                            <td style={{ padding: '8px 12px', fontSize: '11px', color: themeColors.textSecondary, border: `1px solid ${themeColors.border}` }}>Standard Packaging</td>
                            <td style={{ padding: '8px 12px', fontSize: '12px', fontWeight: 600, textAlign: 'right', color: themeColors.text, border: `1px solid ${themeColors.border}` }}>
                              ₹{(Math.random() * 300 + 100).toFixed(2)}
                            </td>
                          </tr>
                          <tr style={{ background: '#FAFAFA' }}>
                            <td colSpan={2} style={{ padding: '10px 12px', fontSize: '13px', fontWeight: 700, textAlign: 'right', color: themeColors.text, border: `1px solid ${themeColors.border}` }}>
                              Product Subtotal
                            </td>
                            <td style={{ padding: '10px 12px', fontSize: '14px', fontWeight: 700, textAlign: 'right', color: '#3B82F6', border: `1px solid ${themeColors.border}` }}>
                              ₹{((selectedQuotation.totalAmount / selectedQuotation.products.length)).toFixed(2)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ))}

                  {/* Price Summary */}
                  <div style={{ marginTop: '16px', marginBottom: '16px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${themeColors.border}` }}>
                      <thead>
                        <tr style={{ background: '#F8FAFC' }}>
                          <th colSpan={2} style={{
                            padding: '10px 12px',
                            textAlign: 'left',
                            fontWeight: 600,
                            fontSize: '13px',
                            color: themeColors.text,
                            border: `1px solid ${themeColors.border}`
                          }}>Price Summary</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ padding: '8px 12px', fontSize: '12px', color: themeColors.textSecondary, border: `1px solid ${themeColors.border}` }}>
                            Subtotal (All Products)
                          </td>
                          <td style={{ padding: '8px 12px', fontSize: '13px', fontWeight: 600, textAlign: 'right', color: themeColors.text, border: `1px solid ${themeColors.border}`, width: '150px' }}>
                            ₹{(selectedQuotation.totalAmount / 1.18).toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: '8px 12px', fontSize: '12px', color: themeColors.textSecondary, border: `1px solid ${themeColors.border}` }}>
                            CGST (9%)
                          </td>
                          <td style={{ padding: '8px 12px', fontSize: '13px', fontWeight: 600, textAlign: 'right', color: themeColors.text, border: `1px solid ${themeColors.border}` }}>
                            ₹{((selectedQuotation.totalAmount / 1.18) * 0.09).toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: '8px 12px', fontSize: '12px', color: themeColors.textSecondary, border: `1px solid ${themeColors.border}` }}>
                            SGST (9%)
                          </td>
                          <td style={{ padding: '8px 12px', fontSize: '13px', fontWeight: 600, textAlign: 'right', color: themeColors.text, border: `1px solid ${themeColors.border}` }}>
                            ₹{((selectedQuotation.totalAmount / 1.18) * 0.09).toFixed(2)}
                          </td>
                        </tr>
                        <tr style={{ background: `linear-gradient(135deg, ${themeColors.text} 0%, #1E293B 100%)` }}>
                          <td style={{ padding: '12px', fontSize: '14px', fontWeight: 700, color: '#FFFFFF', border: `1px solid ${themeColors.border}` }}>
                            Grand Total
                          </td>
                          <td style={{ padding: '12px', fontSize: '18px', fontWeight: 700, textAlign: 'right', color: '#FFFFFF', border: `1px solid ${themeColors.border}` }}>
                            ₹{selectedQuotation.totalAmount.toFixed(2)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div style={{ flex: 1 }}></div>

                  {/* Footer */}
                  <div style={{
                    borderTop: `1px solid ${themeColors.border}`,
                    paddingTop: '12px',
                    marginTop: 'auto'
                  }}>
                    <div style={{ fontSize: '13px', color: themeColors.textSecondary, lineHeight: '1.5' }}>
                      <div style={{ fontWeight: 700, marginBottom: '4px', color: themeColors.text }}>CHERAN PRINT Private Limited</div>
                      <div>123 Industrial Estate, Phase 2, Sector 15, Mumbai, Maharashtra - 400 001</div>
                      <div style={{ marginTop: '2px' }}>
                        www.example-prints.com | Ph: +91 98765 43210 | Email: info@example-prints.com
                      </div>
                      <div style={{ marginTop: '2px' }}>
                        GSTN: 27AABCU9603R1ZX | CIN: U22123MH2015PTC123456
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ) : (
              /* Quotation Preview - A4 Format */
              <div style={{ padding: '20px', overflowY: 'auto', height: activeTab === 'approvals' ? 'calc(100vh - 150px)' : 'calc(100vh - 70px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>

              {/* Page 1 - A4 Paper Container */}
              <div style={{
                width: '210mm',
                minHeight: '297mm',
                background: '#FFFFFF',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                padding: '10mm',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column'
              }}>

              {/* QUOTATION Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '12px',
                paddingBottom: '12px',
                borderBottom: `2px solid ${themeColors.border}`
              }}>
                {/* Left: Logo */}
                <div>
                  <img
                    src="/logo.png"
                    alt="Cheran Print"
                    style={{
                      width: '100px',
                      height: 'auto',
                      objectFit: 'contain',
                    }}
                  />
                </div>

                {/* Right: QUOTATION Title */}
                <div style={{ textAlign: 'right' }}>
                  <h1 style={{
                    margin: 0,
                    fontSize: '36px',
                    fontWeight: 700,
                    color: themeColors.text,
                    letterSpacing: '0.02em',
                    lineHeight: 1
                  }}>QUOTATION</h1>
                </div>
              </div>

              {/* Company Details and Billing Info */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                marginBottom: '20px'
              }}>
                {/* Left: Billing Address */}
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: themeColors.textSecondary, marginBottom: '8px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Billing Address</div>
                  <div style={{ fontSize: '13px', color: themeColors.text, lineHeight: '1.8' }}>
                    <div style={{ fontWeight: 600, marginBottom: '4px' }}>{selectedQuotation.customerName}</div>
                    <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>36 Kamaraj Street, D G Pudur, Erode, 638503, Tamil Nadu, India</div>
                    <div>Contact: +91 98765 43210 | Email: contact@example.com</div>
                    <div>GST No: 33AABCU9603R1ZX</div>
                  </div>
                </div>

                {/* Right: Quotation Details */}
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '13px', color: themeColors.textSecondary, lineHeight: '1.8' }}>
                    <div>Quotation Number: {selectedQuotation.quotationNumber}</div>
                    <div>Quotation Date: {new Date(selectedQuotation.createdDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' })}</div>
                  </div>
                </div>
              </div>

              {/* Products Title */}
              <div style={{
                fontSize: '18px',
                fontWeight: 700,
                color: themeColors.text,
                marginBottom: '12px'
              }}>
                Products
              </div>

              {/* Products Table */}
              <div style={{ marginBottom: '12px' }}>
                {/* Table */}
                <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${themeColors.border}` }}>
                  {/* Table Header */}
                  <thead>
                    <tr style={{ background: '#F8FAFC' }}>
                      <th style={{
                        padding: '12px 16px',
                        textAlign: 'center',
                        fontWeight: 600,
                        fontSize: '12px',
                        color: themeColors.textSecondary,
                        border: `1px solid ${themeColors.border}`
                      }}>#</th>
                      <th style={{
                        padding: '12px 16px',
                        textAlign: 'left',
                        fontWeight: 600,
                        fontSize: '12px',
                        color: themeColors.textSecondary,
                        border: `1px solid ${themeColors.border}`
                      }}>Item & Description</th>
                      <th style={{
                        padding: '12px 16px',
                        textAlign: 'right',
                        fontWeight: 600,
                        fontSize: '12px',
                        color: themeColors.textSecondary,
                        border: `1px solid ${themeColors.border}`
                      }}>Amount</th>
                      <th colSpan={2} style={{
                        padding: '12px 16px',
                        textAlign: 'center',
                        fontWeight: 600,
                        fontSize: '12px',
                        color: themeColors.textSecondary,
                        border: `1px solid ${themeColors.border}`
                      }}>CGST</th>
                      <th colSpan={2} style={{
                        padding: '12px 16px',
                        textAlign: 'center',
                        fontWeight: 600,
                        fontSize: '12px',
                        color: themeColors.textSecondary,
                        border: `1px solid ${themeColors.border}`
                      }}>SGST</th>
                      <th style={{
                        padding: '12px 16px',
                        textAlign: 'right',
                        fontWeight: 600,
                        fontSize: '12px',
                        color: themeColors.textSecondary,
                        border: `1px solid ${themeColors.border}`
                      }}>Total</th>
                    </tr>
                    <tr style={{ background: '#F8FAFC' }}>
                      <th style={{
                        padding: '8px 16px',
                        border: `1px solid ${themeColors.border}`
                      }}></th>
                      <th style={{
                        padding: '8px 16px',
                        border: `1px solid ${themeColors.border}`
                      }}></th>
                      <th style={{
                        padding: '8px 16px',
                        border: `1px solid ${themeColors.border}`
                      }}></th>
                      <th style={{
                        padding: '8px 16px',
                        textAlign: 'center',
                        fontWeight: 600,
                        fontSize: '11px',
                        color: themeColors.textSecondary,
                        border: `1px solid ${themeColors.border}`
                      }}>%</th>
                      <th style={{
                        padding: '8px 16px',
                        textAlign: 'center',
                        fontWeight: 600,
                        fontSize: '11px',
                        color: themeColors.textSecondary,
                        border: `1px solid ${themeColors.border}`
                      }}>Amount</th>
                      <th style={{
                        padding: '8px 16px',
                        textAlign: 'center',
                        fontWeight: 600,
                        fontSize: '11px',
                        color: themeColors.textSecondary,
                        border: `1px solid ${themeColors.border}`
                      }}>%</th>
                      <th style={{
                        padding: '8px 16px',
                        textAlign: 'center',
                        fontWeight: 600,
                        fontSize: '11px',
                        color: themeColors.textSecondary,
                        border: `1px solid ${themeColors.border}`
                      }}>Amount</th>
                      <th style={{
                        padding: '8px 16px',
                        border: `1px solid ${themeColors.border}`
                      }}></th>
                    </tr>
                  </thead>
                  {/* Table Body */}
                  <tbody>
                    {/* Products */}
                    {[
                      { id: 1, name: 'ANUSHKA PHOTOCARD', dimensions: '85mm x 55mm', quantity: 1000, amount: 4200 },
                      { id: 2, name: 'TOP - 286 X 199 X 38', dimensions: '286mm x 199mm x 38mm', quantity: 500, amount: 5250 },
                      { id: 3, name: 'EVELY SLIPS PHOTOCARD', dimensions: '150mm x 100mm', quantity: 2000, amount: 3850 },
                      { id: 4, name: 'BUSINESS CARD PREMIUM', dimensions: '90mm x 55mm', quantity: 1500, amount: 3600 },
                      { id: 5, name: 'FLYER A5 SIZE', dimensions: '148mm x 210mm', quantity: 3000, amount: 6800 },
                      { id: 6, name: 'BROCHURE TRI-FOLD', dimensions: '297mm x 210mm', quantity: 800, amount: 4500 }
                    ].map((product) => (
                      <tr key={product.id}>
                        <td style={{
                          padding: '16px',
                          textAlign: 'center',
                          fontSize: '13px',
                          color: themeColors.text,
                          border: `1px solid ${themeColors.border}`
                        }}>{product.id}</td>
                        <td style={{
                          padding: '16px',
                          fontSize: '13px',
                          color: themeColors.text,
                          border: `1px solid ${themeColors.border}`
                        }}>
                          <div style={{ fontWeight: 600, marginBottom: '4px', fontSize: '14px' }}>{product.name}</div>
                          <div style={{ fontSize: '12px', color: themeColors.textSecondary }}>
                            <strong>Quantity:</strong> {product.quantity.toLocaleString()}
                          </div>
                        </td>
                        <td style={{
                          padding: '16px',
                          textAlign: 'right',
                          fontSize: '13px',
                          color: themeColors.text,
                          border: `1px solid ${themeColors.border}`
                        }}>
                          {(() => {
                            const baseAmount = product.amount / 1.18;
                            return baseAmount.toFixed(2);
                          })()}
                        </td>
                        <td style={{
                          padding: '16px',
                          textAlign: 'center',
                          fontSize: '13px',
                          color: themeColors.text,
                          border: `1px solid ${themeColors.border}`
                        }}>9%</td>
                        <td style={{
                          padding: '16px',
                          textAlign: 'right',
                          fontSize: '13px',
                          color: themeColors.text,
                          border: `1px solid ${themeColors.border}`
                        }}>
                          {(() => {
                            const baseAmount = product.amount / 1.18;
                            const cgst = baseAmount * 0.09;
                            return cgst.toFixed(2);
                          })()}
                        </td>
                        <td style={{
                          padding: '16px',
                          textAlign: 'center',
                          fontSize: '13px',
                          color: themeColors.text,
                          border: `1px solid ${themeColors.border}`
                        }}>9%</td>
                        <td style={{
                          padding: '16px',
                          textAlign: 'right',
                          fontSize: '13px',
                          color: themeColors.text,
                          border: `1px solid ${themeColors.border}`
                        }}>
                          {(() => {
                            const baseAmount = product.amount / 1.18;
                            const sgst = baseAmount * 0.09;
                            return sgst.toFixed(2);
                          })()}
                        </td>
                        <td style={{
                          padding: '16px',
                          textAlign: 'right',
                          fontSize: '14px',
                          fontWeight: 600,
                          color: themeColors.text,
                          border: `1px solid ${themeColors.border}`
                        }}>
                          {product.amount.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Spacer to push footer to bottom */}
              <div style={{ flex: 1 }}></div>

              {/* Footer with Company Details */}
              <div style={{
                borderTop: `1px solid ${themeColors.border}`,
                paddingTop: '12px',
                marginTop: 'auto'
              }}>
                <div style={{ fontSize: '13px', color: themeColors.textSecondary, lineHeight: '1.5' }}>
                  <div style={{ fontWeight: 700, marginBottom: '4px', color: themeColors.text }}>CHERAN PRINT Private Limited</div>
                  <div>123 Industrial Estate, Phase 2, Sector 15, Mumbai, Maharashtra - 400 001</div>
                  <div style={{ marginTop: '2px' }}>
                    www.example-prints.com | Ph: +91 98765 43210 | Email: info@example-prints.com
                  </div>
                  <div style={{ marginTop: '2px' }}>
                    GSTN: 27AABCU9603R1ZX | CIN: U22123MH2015PTC123456
                  </div>
                </div>
              </div>

              </div>

              {/* Page 2 - A4 Paper Container */}
              <div style={{
                width: '210mm',
                minHeight: '297mm',
                background: '#FFFFFF',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                padding: '10mm',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                pageBreakBefore: 'always'
              }}>

              {/* QUOTATION Header - Page 2 */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '12px',
                paddingBottom: '12px',
                borderBottom: `2px solid ${themeColors.border}`
              }}>
                <div>
                  <img
                    src="/logo.png"
                    alt="Cheran Print"
                    style={{
                      width: '100px',
                      height: 'auto',
                      objectFit: 'contain',
                    }}
                  />
                </div>
                <div style={{ textAlign: 'right' }}>
                  <h1 style={{
                    margin: 0,
                    fontSize: '36px',
                    fontWeight: 700,
                    color: themeColors.text,
                    letterSpacing: '0.02em',
                    lineHeight: 1
                  }}>QUOTATION</h1>
                  <div style={{ fontSize: '12px', color: themeColors.textSecondary, marginTop: '4px' }}>
                    Page 2
                  </div>
                </div>
              </div>

              {/* Products Title - Page 2 */}
              <div style={{
                fontSize: '18px',
                fontWeight: 700,
                color: themeColors.text,
                marginBottom: '12px'
              }}>
                Products (Continued)
              </div>

              {/* Products Table - Page 2 */}
              <div style={{ marginBottom: '12px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${themeColors.border}` }}>
                  <thead>
                    <tr style={{ background: '#F8FAFC' }}>
                      <th style={{
                        padding: '12px 16px',
                        textAlign: 'center',
                        fontWeight: 600,
                        fontSize: '12px',
                        color: themeColors.textSecondary,
                        border: `1px solid ${themeColors.border}`
                      }}>#</th>
                      <th style={{
                        padding: '12px 16px',
                        textAlign: 'left',
                        fontWeight: 600,
                        fontSize: '12px',
                        color: themeColors.textSecondary,
                        border: `1px solid ${themeColors.border}`
                      }}>Item & Description</th>
                      <th style={{
                        padding: '12px 16px',
                        textAlign: 'right',
                        fontWeight: 600,
                        fontSize: '12px',
                        color: themeColors.textSecondary,
                        border: `1px solid ${themeColors.border}`
                      }}>Amount</th>
                      <th colSpan={2} style={{
                        padding: '12px 16px',
                        textAlign: 'center',
                        fontWeight: 600,
                        fontSize: '12px',
                        color: themeColors.textSecondary,
                        border: `1px solid ${themeColors.border}`
                      }}>CGST</th>
                      <th colSpan={2} style={{
                        padding: '12px 16px',
                        textAlign: 'center',
                        fontWeight: 600,
                        fontSize: '12px',
                        color: themeColors.textSecondary,
                        border: `1px solid ${themeColors.border}`
                      }}>SGST</th>
                      <th style={{
                        padding: '12px 16px',
                        textAlign: 'right',
                        fontWeight: 600,
                        fontSize: '12px',
                        color: themeColors.textSecondary,
                        border: `1px solid ${themeColors.border}`
                      }}>Total</th>
                    </tr>
                    <tr style={{ background: '#F8FAFC' }}>
                      <th style={{
                        padding: '8px 16px',
                        border: `1px solid ${themeColors.border}`
                      }}></th>
                      <th style={{
                        padding: '8px 16px',
                        border: `1px solid ${themeColors.border}`
                      }}></th>
                      <th style={{
                        padding: '8px 16px',
                        border: `1px solid ${themeColors.border}`
                      }}></th>
                      <th style={{
                        padding: '8px 16px',
                        textAlign: 'center',
                        fontWeight: 600,
                        fontSize: '11px',
                        color: themeColors.textSecondary,
                        border: `1px solid ${themeColors.border}`
                      }}>%</th>
                      <th style={{
                        padding: '8px 16px',
                        textAlign: 'center',
                        fontWeight: 600,
                        fontSize: '11px',
                        color: themeColors.textSecondary,
                        border: `1px solid ${themeColors.border}`
                      }}>Amount</th>
                      <th style={{
                        padding: '8px 16px',
                        textAlign: 'center',
                        fontWeight: 600,
                        fontSize: '11px',
                        color: themeColors.textSecondary,
                        border: `1px solid ${themeColors.border}`
                      }}>%</th>
                      <th style={{
                        padding: '8px 16px',
                        textAlign: 'center',
                        fontWeight: 600,
                        fontSize: '11px',
                        color: themeColors.textSecondary,
                        border: `1px solid ${themeColors.border}`
                      }}>Amount</th>
                      <th style={{
                        padding: '8px 16px',
                        border: `1px solid ${themeColors.border}`
                      }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: 7, name: 'POSTER A3 SIZE', dimensions: '297mm x 420mm', quantity: 1200, amount: 5400 },
                      { id: 8, name: 'LETTERHEAD PREMIUM', dimensions: '210mm x 297mm', quantity: 2500, amount: 4200 },
                      { id: 9, name: 'ENVELOPE DL SIZE', dimensions: '220mm x 110mm', quantity: 1800, amount: 3900 },
                      { id: 10, name: 'CATALOG A4 MULTI-PAGE', dimensions: '210mm x 297mm', quantity: 600, amount: 7200 }
                    ].map((product) => (
                      <tr key={product.id}>
                        <td style={{
                          padding: '16px',
                          textAlign: 'center',
                          fontSize: '13px',
                          color: themeColors.text,
                          border: `1px solid ${themeColors.border}`
                        }}>{product.id}</td>
                        <td style={{
                          padding: '16px',
                          fontSize: '13px',
                          color: themeColors.text,
                          border: `1px solid ${themeColors.border}`
                        }}>
                          <div style={{ fontWeight: 600, marginBottom: '4px', fontSize: '14px' }}>{product.name}</div>
                          <div style={{ fontSize: '12px', color: themeColors.textSecondary }}>
                            <strong>Quantity:</strong> {product.quantity.toLocaleString()}
                          </div>
                        </td>
                        <td style={{
                          padding: '16px',
                          textAlign: 'right',
                          fontSize: '13px',
                          color: themeColors.text,
                          border: `1px solid ${themeColors.border}`
                        }}>
                          {(() => {
                            const baseAmount = product.amount / 1.18;
                            return baseAmount.toFixed(2);
                          })()}
                        </td>
                        <td style={{
                          padding: '16px',
                          textAlign: 'center',
                          fontSize: '13px',
                          color: themeColors.text,
                          border: `1px solid ${themeColors.border}`
                        }}>9%</td>
                        <td style={{
                          padding: '16px',
                          textAlign: 'right',
                          fontSize: '13px',
                          color: themeColors.text,
                          border: `1px solid ${themeColors.border}`
                        }}>
                          {(() => {
                            const baseAmount = product.amount / 1.18;
                            const cgst = baseAmount * 0.09;
                            return cgst.toFixed(2);
                          })()}
                        </td>
                        <td style={{
                          padding: '16px',
                          textAlign: 'center',
                          fontSize: '13px',
                          color: themeColors.text,
                          border: `1px solid ${themeColors.border}`
                        }}>9%</td>
                        <td style={{
                          padding: '16px',
                          textAlign: 'right',
                          fontSize: '13px',
                          color: themeColors.text,
                          border: `1px solid ${themeColors.border}`
                        }}>
                          {(() => {
                            const baseAmount = product.amount / 1.18;
                            const sgst = baseAmount * 0.09;
                            return sgst.toFixed(2);
                          })()}
                        </td>
                        <td style={{
                          padding: '16px',
                          textAlign: 'right',
                          fontSize: '14px',
                          fontWeight: 600,
                          color: themeColors.text,
                          border: `1px solid ${themeColors.border}`
                        }}>
                          {product.amount.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                    {/* Sub Total Row */}
                    <tr style={{ background: '#FAFAFA' }}>
                      <td colSpan={2} style={{
                        padding: '12px 16px',
                        textAlign: 'right',
                        fontWeight: 700,
                        fontSize: '13px',
                        color: themeColors.text,
                        border: `1px solid ${themeColors.border}`
                      }}>Sub Total</td>
                      <td style={{
                        padding: '12px 16px',
                        textAlign: 'right',
                        fontWeight: 600,
                        fontSize: '13px',
                        color: themeColors.text,
                        border: `1px solid ${themeColors.border}`
                      }}>
                        {(() => {
                          const baseAmount = selectedQuotation.totalAmount / 1.18;
                          return baseAmount.toFixed(2);
                        })()}
                      </td>
                      <td colSpan={2} style={{
                        padding: '12px 16px',
                        textAlign: 'right',
                        fontWeight: 600,
                        fontSize: '13px',
                        color: themeColors.text,
                        border: `1px solid ${themeColors.border}`
                      }}>
                        {(() => {
                          const baseAmount = selectedQuotation.totalAmount / 1.18;
                          const cgst = baseAmount * 0.09;
                          return cgst.toFixed(2);
                        })()}
                      </td>
                      <td colSpan={2} style={{
                        padding: '12px 16px',
                        textAlign: 'right',
                        fontWeight: 600,
                        fontSize: '13px',
                        color: themeColors.text,
                        border: `1px solid ${themeColors.border}`
                      }}>
                        {(() => {
                          const baseAmount = selectedQuotation.totalAmount / 1.18;
                          const sgst = baseAmount * 0.09;
                          return sgst.toFixed(2);
                        })()}
                      </td>
                      <td style={{
                        padding: '12px 16px',
                        textAlign: 'right',
                        fontWeight: 700,
                        fontSize: '14px',
                        color: themeColors.text,
                        border: `1px solid ${themeColors.border}`
                      }}>
                        {selectedQuotation.totalAmount.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* Total in Words */}
                <div style={{ marginTop: '8px', padding: '8px 0' }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: themeColors.text }}>
                    <span style={{ fontWeight: 700 }}>Total In Words</span>
                  </div>
                  <div style={{ fontSize: '13px', fontStyle: 'italic', color: themeColors.textSecondary, marginTop: '2px' }}>
                    Indian Rupees {selectedQuotation.totalAmount.toLocaleString()} Only
                  </div>
                </div>
              </div>

              {/* Spacer to push footer to bottom */}
              <div style={{ flex: 1 }}></div>

              {/* Footer with Company Details - Page 2 */}
              <div style={{
                borderTop: `1px solid ${themeColors.border}`,
                paddingTop: '12px',
                marginTop: 'auto'
              }}>
                <div style={{ fontSize: '13px', color: themeColors.textSecondary, lineHeight: '1.5' }}>
                  <div style={{ fontWeight: 700, marginBottom: '4px', color: themeColors.text }}>CHERAN PRINT Private Limited</div>
                  <div>123 Industrial Estate, Phase 2, Sector 15, Mumbai, Maharashtra - 400 001</div>
                  <div style={{ marginTop: '2px' }}>
                    www.example-prints.com | Ph: +91 98765 43210 | Email: info@example-prints.com
                  </div>
                  <div style={{ marginTop: '2px' }}>
                    GSTN: 27AABCU9603R1ZX | CIN: U22123MH2015PTC123456
                  </div>
                </div>
              </div>

              </div>
            </div>
            )}
          </>
        )}
      </Drawer>

      {/* Rejection Modal */}
      <Modal
        title="Reject Quotation"
        open={rejectModalVisible}
        onOk={handleRejectSubmit}
        onCancel={() => {
          setRejectModalVisible(false);
          setRejectionReason('');
          form.resetFields();
        }}
        okText="Submit Rejection"
        cancelText="Cancel"
        okButtonProps={{
          danger: true,
          style: { borderRadius: '8px' },
        }}
        cancelButtonProps={{
          style: { borderRadius: '8px' },
        }}
      >
        <Form form={form} layout="vertical" style={{ marginTop: '16px' }}>
          <Form.Item
            label="Rejection Reason"
            name="rejectionReason"
            rules={[{ required: true, message: 'Please provide a reason for rejection' }]}
          >
            <TextArea
              rows={4}
              placeholder="Enter the reason for rejecting this quotation..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Quotations;
