import { useState } from 'react';
import { Table, Button, Input, Space, Card, Select, Tag, Segmented, Drawer, Modal, Form } from 'antd';
import { SearchOutlined, EyeOutlined, EditOutlined, FileTextOutlined, DownOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import TextArea from 'antd/es/input/TextArea';
import { themeColors } from '../../theme/themeConfig';

interface Quotation {
  id: string;
  quotationNumber: string;
  enquiryNumber: string;
  customerName: string;
  productType: string;
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
  const [form] = Form.useForm();

  // Mock approval data (quotations pending approval)
  const mockApprovals: Quotation[] = [
    {
      id: '5',
      quotationNumber: 'QUO-2024-005',
      enquiryNumber: 'ENQ-2024-010',
      customerName: 'Global Traders Co',
      productType: 'Product Labels',
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

  const handleStatusChange = (quotationId: string, newStatus: string) => {
    const updatedData = filteredData.map((item) =>
      item.id === quotationId ? { ...item, status: newStatus as Quotation['status'] } : item
    );
    setFilteredData(updatedData);
    message.success(`Status updated to ${newStatus}`);
  };

  const handleView = (record: Quotation) => {
    setSelectedQuotation(record);
    setViewDrawerVisible(true);
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
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',
      sorter: (a, b) => a.customerName.localeCompare(b.customerName),
    },
    {
      title: 'Product Type',
      dataIndex: 'productType',
      key: 'productType',
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
      title: 'Valid Until',
      dataIndex: 'validUntil',
      key: 'validUntil',
      sorter: (a, b) => new Date(a.validUntil).getTime() - new Date(b.validUntil).getTime(),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => {
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
          <Select
            value={status}
            onChange={(newStatus) => handleStatusChange(record.id, newStatus)}
            style={{ width: '130px' }}
            size="small"
            variant="borderless"
            suffixIcon={null}
            options={[
              { value: 'Draft', label: 'Draft' },
              { value: 'Sent', label: 'Sent' },
              { value: 'Approved', label: 'Approved' },
              { value: 'Rejected', label: 'Rejected' },
              { value: 'Expired', label: 'Expired' },
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
        }}
        open={viewDrawerVisible}
        closable={false}
        styles={{
          body: { padding: 0, background: '#F8FAFC' },
          wrapper: { width: '900px' },
        }}
        footer={
          activeTab === 'approvals' && selectedQuotation ? (
            <div style={{ textAlign: 'right', display: 'flex', gap: '12px', justifyContent: 'flex-end', padding: '16px 24px', borderTop: `1px solid ${themeColors.borderLight}`, background: '#FFFFFF' }}>
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
            {/* Header Bar */}
            <div style={{ background: '#FFFFFF', padding: '20px 24px', borderBottom: `1px solid ${themeColors.borderLight}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FileTextOutlined style={{ fontSize: '24px', color: themeColors.primary }} />
                <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 600, color: themeColors.text }}>Quotation Details</h2>
              </div>
              <Button
                type="text"
                onClick={() => {
                  setViewDrawerVisible(false);
                  setSelectedQuotation(null);
                }}
                style={{ fontSize: '20px', color: themeColors.textSecondary }}
              >
                ×
              </Button>
            </div>

            {/* Content */}
            <div style={{ padding: '24px', overflowY: 'auto', height: 'calc(100vh - 140px)' }}>
              <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '12px', border: `1px solid ${themeColors.borderLight}`, maxWidth: '900px', margin: '0 auto', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)' }}>

                {/* Invoice Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', paddingBottom: '16px', borderBottom: `2px solid ${themeColors.border}` }}>
                  <div>
                    <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: `linear-gradient(135deg, ${themeColors.primary} 0%, #E65525 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontSize: '24px', fontWeight: 700, marginBottom: '12px', boxShadow: '0 4px 12px rgba(255, 107, 53, 0.3)' }}>
                      P
                    </div>
                    <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 700, color: themeColors.text, letterSpacing: '-0.01em' }}>PRINTING PRESS CO.</h1>
                    <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: themeColors.textSecondary, lineHeight: '1.7' }}>
                      123 Industrial Area<br />
                      Chennai, Tamil Nadu 600001<br />
                      <strong>Phone:</strong> +91 98765 43210<br />
                      <strong>Email:</strong> info@printingpress.com
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-block', background: 'rgba(255, 107, 53, 0.1)', padding: '8px 16px', borderRadius: '8px', marginBottom: '12px' }}>
                      <div style={{ fontSize: '11px', fontWeight: 600, color: themeColors.primary, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Quotation</div>
                    </div>
                    <div style={{ fontSize: '20px', fontWeight: 700, color: themeColors.text, marginBottom: '8px' }}>
                      {selectedQuotation.quotationNumber}
                    </div>
                    <Tag
                      color={
                        selectedQuotation.status === 'Approved'
                          ? 'green'
                          : selectedQuotation.status === 'Rejected'
                          ? 'red'
                          : selectedQuotation.status === 'Sent'
                          ? 'blue'
                          : selectedQuotation.status === 'Draft'
                          ? 'default'
                          : 'orange'
                      }
                      style={{ fontSize: '12px', padding: '4px 12px', borderRadius: '6px', fontWeight: 600 }}
                    >
                      {selectedQuotation.status}
                    </Tag>
                  </div>
                </div>

                {/* Basic Info Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '16px', padding: '12px 0', borderBottom: `1px solid ${themeColors.borderLight}`, marginBottom: '16px' }}>
                  <div>
                    <div style={{ fontSize: '12px', color: themeColors.textSecondary, marginBottom: '4px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Enquiry Number</div>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: themeColors.text }}>
                      {selectedQuotation.enquiryNumber}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: themeColors.textSecondary, marginBottom: '4px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Created Date</div>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: themeColors.text }}>
                      {new Date(selectedQuotation.createdDate).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: themeColors.textSecondary, marginBottom: '4px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Valid Until</div>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: themeColors.text }}>
                      {new Date(selectedQuotation.validUntil).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                </div>

                {/* Customer & Product Info */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '16px' }}>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: themeColors.textSecondary, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '12px', paddingBottom: '8px', borderBottom: `2px solid ${themeColors.primary}`, display: 'inline-block' }}>
                      Bill To
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px', color: themeColors.text }}>
                      {selectedQuotation.customerName}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: themeColors.textSecondary, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '12px', paddingBottom: '8px', borderBottom: `2px solid ${themeColors.primary}`, display: 'inline-block' }}>
                      Product Details
                    </div>
                    <div style={{ fontSize: '12px', color: themeColors.textSecondary, lineHeight: '1.8' }}>
                      <div><strong>Product Type:</strong> {selectedQuotation.productType}</div>
                      <div><strong>Quantity:</strong> {selectedQuotation.quantity.toLocaleString()} units</div>
                    </div>
                  </div>
                </div>

                {/* Specifications Table */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: themeColors.textSecondary, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '12px', paddingBottom: '6px', borderBottom: `2px solid ${themeColors.border}` }}>Quotation Specifications</div>

                  {/* Table Header */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px', padding: '12px 16px', background: 'rgba(248, 250, 252, 1)', borderRadius: '8px 8px 0 0', borderBottom: `1px solid ${themeColors.border}` }}>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: themeColors.textSecondary, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Field</div>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: themeColors.textSecondary, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Value</div>
                  </div>

                  {/* Specification Rows */}
                  {[
                    { label: 'Job Name', value: 'Funny Kids AHD 12 Pc Box' },
                    { label: 'Dimensions', value: '19.1 x 15.6 x 10.1 cm' },
                    { label: 'Board Type', value: 'Cyber XL 250gsm' },
                    { label: 'Colour', value: 'CMYK + Pantone (6 Colour)' },
                    { label: 'Special Effects', value: 'Drip off UV' },
                    { label: 'Surface Finishing', value: 'F-Flute (3 Ply) 120 + 140' },
                    { label: 'Die No', value: 'New' },
                    { label: 'UPS', value: '2' },
                  ].map((spec, index, array) => (
                    <div key={spec.label} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px', padding: '14px 16px', borderBottom: index === array.length - 1 ? 'none' : `1px solid ${themeColors.borderLight}`, background: '#FFFFFF' }}>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: themeColors.textSecondary }}>
                        {spec.label}
                      </div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: themeColors.text }}>
                        {spec.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total Amount */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <div style={{ width: '350px' }}>
                    <div style={{ background: `linear-gradient(135deg, ${themeColors.primary} 0%, #E65525 100%)`, padding: '18px 20px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(255, 107, 53, 0.3)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.9)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '4px' }}>Total Amount</div>
                          <div style={{ fontSize: '28px', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.01em' }}>₹{selectedQuotation.totalAmount.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
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
