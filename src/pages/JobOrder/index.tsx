import { useState, useEffect } from 'react';
import { Table, Button, Input, Card, Select, Tag } from 'antd';
import { EyeOutlined, SearchOutlined, DownOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { message } from 'antd';

interface JobOrderItem {
  id: string;
  jobOrderNumber: string;
  customerName: string;
  company: string;
  email: string;
  contactNumber: string;
  quotationNumber: string;
  totalProducts: number;
  totalPrice: number;
  firstDeliveryDate: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'On Hold';
  createdDate: string;
}

// Mock data for Job Orders (from approved quotations)
const mockJobOrders: JobOrderItem[] = [
  {
    id: '1',
    jobOrderNumber: 'JO-2026-001',
    customerName: 'John Smith',
    company: 'Acme Corporation',
    email: 'john@acmecorp.com',
    contactNumber: '+91 9876543210',
    quotationNumber: 'QT-2026-001',
    totalProducts: 3,
    totalPrice: 15000,
    firstDeliveryDate: '2026-02-10',
    status: 'Pending',
    createdDate: '2026-02-01',
  },
  {
    id: '2',
    jobOrderNumber: 'JO-2026-002',
    customerName: 'Sarah Johnson',
    company: 'Tech Solutions Pvt Ltd',
    email: 'sarah@techsolutions.com',
    contactNumber: '+91 9876543211',
    quotationNumber: 'QT-2026-002',
    totalProducts: 2,
    totalPrice: 8500,
    firstDeliveryDate: '2026-02-12',
    status: 'In Progress',
    createdDate: '2026-02-02',
  },
  {
    id: '3',
    jobOrderNumber: 'JO-2026-003',
    customerName: 'Michael Chen',
    company: 'Green Earth Industries',
    email: 'michael@greenearth.com',
    contactNumber: '+91 9876543212',
    quotationNumber: 'QT-2026-003',
    totalProducts: 4,
    totalPrice: 22500,
    firstDeliveryDate: '2026-02-11',
    status: 'In Progress',
    createdDate: '2026-02-03',
  },
  {
    id: '4',
    jobOrderNumber: 'JO-2026-004',
    customerName: 'Emma Wilson',
    company: 'Urban Designs Studio',
    email: 'emma@urbandesigns.com',
    contactNumber: '+91 9876543213',
    quotationNumber: 'QT-2026-004',
    totalProducts: 2,
    totalPrice: 12000,
    firstDeliveryDate: '2026-02-14',
    status: 'Pending',
    createdDate: '2026-02-04',
  },
  {
    id: '5',
    jobOrderNumber: 'JO-2026-005',
    customerName: 'David Lee',
    company: 'Creative Minds Ltd',
    email: 'david@creativeminds.com',
    contactNumber: '+91 9876543214',
    quotationNumber: 'QT-2026-005',
    totalProducts: 5,
    totalPrice: 18500,
    firstDeliveryDate: '2026-02-15',
    status: 'Completed',
    createdDate: '2026-02-05',
  },
  {
    id: '6',
    jobOrderNumber: 'JO-2026-006',
    customerName: 'Priya Sharma',
    company: 'Digital Marketing Co',
    email: 'priya@digitalmarketing.com',
    contactNumber: '+91 9876543215',
    quotationNumber: 'QT-2026-006',
    totalProducts: 3,
    totalPrice: 9800,
    firstDeliveryDate: '2026-02-16',
    status: 'Pending',
    createdDate: '2026-02-06',
  },
  {
    id: '7',
    jobOrderNumber: 'JO-2026-007',
    customerName: 'James Wilson',
    company: 'Print Solutions Inc',
    email: 'james@printsolutions.com',
    contactNumber: '+91 9876543216',
    quotationNumber: 'QT-2026-007',
    totalProducts: 6,
    totalPrice: 25000,
    firstDeliveryDate: '2026-02-17',
    status: 'In Progress',
    createdDate: '2026-02-07',
  },
  {
    id: '8',
    jobOrderNumber: 'JO-2026-008',
    customerName: 'Lisa Anderson',
    company: 'Brand Innovations',
    email: 'lisa@brandinnovations.com',
    contactNumber: '+91 9876543217',
    quotationNumber: 'QT-2026-008',
    totalProducts: 4,
    totalPrice: 16200,
    firstDeliveryDate: '2026-02-18',
    status: 'On Hold',
    createdDate: '2026-02-08',
  },
  {
    id: '9',
    jobOrderNumber: 'JO-2026-009',
    customerName: 'Robert Taylor',
    company: 'Marketing Pros LLC',
    email: 'robert@marketingpros.com',
    contactNumber: '+91 9876543218',
    quotationNumber: 'QT-2026-009',
    totalProducts: 3,
    totalPrice: 11500,
    firstDeliveryDate: '2026-02-19',
    status: 'Pending',
    createdDate: '2026-02-09',
  },
  {
    id: '10',
    jobOrderNumber: 'JO-2026-010',
    customerName: 'Sophia Martinez',
    company: 'Design Studio Pro',
    email: 'sophia@designstudio.com',
    contactNumber: '+91 9876543219',
    quotationNumber: 'QT-2026-010',
    totalProducts: 5,
    totalPrice: 20000,
    firstDeliveryDate: '2026-02-20',
    status: 'In Progress',
    createdDate: '2026-02-10',
  },
  {
    id: '11',
    jobOrderNumber: 'JO-2026-011',
    customerName: 'Christopher Brown',
    company: 'Corporate Branding',
    email: 'chris@corporatebranding.com',
    contactNumber: '+91 9876543220',
    quotationNumber: 'QT-2026-011',
    totalProducts: 4,
    totalPrice: 14800,
    firstDeliveryDate: '2026-02-21',
    status: 'Pending',
    createdDate: '2026-02-11',
  },
  {
    id: '12',
    jobOrderNumber: 'JO-2026-012',
    customerName: 'Jessica Garcia',
    company: 'Event Management Co',
    email: 'jessica@eventmanagement.com',
    contactNumber: '+91 9876543221',
    quotationNumber: 'QT-2026-012',
    totalProducts: 7,
    totalPrice: 28500,
    firstDeliveryDate: '2026-02-22',
    status: 'Completed',
    createdDate: '2026-02-12',
  },
  {
    id: '13',
    jobOrderNumber: 'JO-2026-013',
    customerName: 'Daniel Rodriguez',
    company: 'Web Solutions Ltd',
    email: 'daniel@websolutions.com',
    contactNumber: '+91 9876543222',
    quotationNumber: 'QT-2026-013',
    totalProducts: 3,
    totalPrice: 10200,
    firstDeliveryDate: '2026-02-23',
    status: 'In Progress',
    createdDate: '2026-02-13',
  },
  {
    id: '14',
    jobOrderNumber: 'JO-2026-014',
    customerName: 'Nancy White',
    company: 'Fashion Forward Inc',
    email: 'nancy@fashionforward.com',
    contactNumber: '+91 9876543223',
    quotationNumber: 'QT-2026-014',
    totalProducts: 6,
    totalPrice: 23400,
    firstDeliveryDate: '2026-02-24',
    status: 'Pending',
    createdDate: '2026-02-14',
  },
  {
    id: '15',
    jobOrderNumber: 'JO-2026-015',
    customerName: 'Mark Thompson',
    company: 'Retail Excellence',
    email: 'mark@retailexcellence.com',
    contactNumber: '+91 9876543224',
    quotationNumber: 'QT-2026-015',
    totalProducts: 4,
    totalPrice: 19500,
    firstDeliveryDate: '2026-02-25',
    status: 'On Hold',
    createdDate: '2026-02-15',
  },
  {
    id: '16',
    jobOrderNumber: 'JO-2026-016',
    customerName: 'Jennifer Davis',
    company: 'Creative Agency Pro',
    email: 'jennifer@creativeagency.com',
    contactNumber: '+91 9876543225',
    quotationNumber: 'QT-2026-016',
    totalProducts: 5,
    totalPrice: 21800,
    firstDeliveryDate: '2026-02-26',
    status: 'Pending',
    createdDate: '2026-02-16',
  },
  {
    id: '17',
    jobOrderNumber: 'JO-2026-017',
    customerName: 'Kevin Harris',
    company: 'Tech Innovators Inc',
    email: 'kevin@techinnovators.com',
    contactNumber: '+91 9876543226',
    quotationNumber: 'QT-2026-017',
    totalProducts: 3,
    totalPrice: 13500,
    firstDeliveryDate: '2026-02-27',
    status: 'In Progress',
    createdDate: '2026-02-17',
  },
  {
    id: '18',
    jobOrderNumber: 'JO-2026-018',
    customerName: 'Amanda Clark',
    company: 'Sustainable Solutions',
    email: 'amanda@sustainablesolutions.com',
    contactNumber: '+91 9876543227',
    quotationNumber: 'QT-2026-018',
    totalProducts: 4,
    totalPrice: 17200,
    firstDeliveryDate: '2026-02-28',
    status: 'Completed',
    createdDate: '2026-02-18',
  },
  {
    id: '19',
    jobOrderNumber: 'JO-2026-019',
    customerName: 'Steven Lewis',
    company: 'Global Enterprises',
    email: 'steven@globalenterprises.com',
    contactNumber: '+91 9876543228',
    quotationNumber: 'QT-2026-019',
    totalProducts: 6,
    totalPrice: 26500,
    firstDeliveryDate: '2026-03-01',
    status: 'Pending',
    createdDate: '2026-02-19',
  },
  {
    id: '20',
    jobOrderNumber: 'JO-2026-020',
    customerName: 'Michelle Walker',
    company: 'Marketing Solutions Ltd',
    email: 'michelle@marketingsolutions.com',
    contactNumber: '+91 9876543229',
    quotationNumber: 'QT-2026-020',
    totalProducts: 3,
    totalPrice: 11800,
    firstDeliveryDate: '2026-03-02',
    status: 'In Progress',
    createdDate: '2026-02-20',
  },
  {
    id: '21',
    jobOrderNumber: 'JO-2026-021',
    customerName: 'Andrew Young',
    company: 'Digital Transformation',
    email: 'andrew@digitaltransformation.com',
    contactNumber: '+91 9876543230',
    quotationNumber: 'QT-2026-021',
    totalProducts: 5,
    totalPrice: 19900,
    firstDeliveryDate: '2026-03-03',
    status: 'On Hold',
    createdDate: '2026-02-21',
  },
  {
    id: '22',
    jobOrderNumber: 'JO-2026-022',
    customerName: 'Rachel King',
    company: 'Brand Excellence Corp',
    email: 'rachel@brandexcellence.com',
    contactNumber: '+91 9876543231',
    quotationNumber: 'QT-2026-022',
    totalProducts: 4,
    totalPrice: 15600,
    firstDeliveryDate: '2026-03-04',
    status: 'Pending',
    createdDate: '2026-02-22',
  },
  {
    id: '23',
    jobOrderNumber: 'JO-2026-023',
    customerName: 'Brandon Scott',
    company: 'Print Innovations Co',
    email: 'brandon@printinnovations.com',
    contactNumber: '+91 9876543232',
    quotationNumber: 'QT-2026-023',
    totalProducts: 7,
    totalPrice: 29500,
    firstDeliveryDate: '2026-03-05',
    status: 'Completed',
    createdDate: '2026-02-23',
  },
  {
    id: '24',
    jobOrderNumber: 'JO-2026-024',
    customerName: 'Megan Green',
    company: 'Graphic Design Studio',
    email: 'megan@graphicdesignstudio.com',
    contactNumber: '+91 9876543233',
    quotationNumber: 'QT-2026-024',
    totalProducts: 3,
    totalPrice: 10800,
    firstDeliveryDate: '2026-03-06',
    status: 'In Progress',
    createdDate: '2026-02-24',
  },
  {
    id: '25',
    jobOrderNumber: 'JO-2026-025',
    customerName: 'Tyler Adams',
    company: 'Creative Print Solutions',
    email: 'tyler@creativeprint.com',
    contactNumber: '+91 9876543234',
    quotationNumber: 'QT-2026-025',
    totalProducts: 5,
    totalPrice: 20500,
    firstDeliveryDate: '2026-03-07',
    status: 'Pending',
    createdDate: '2026-02-25',
  },
];

const JobOrder = () => {
  const [jobOrders, setJobOrders] = useState<JobOrderItem[]>([]);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState<JobOrderItem[]>([]);

  useEffect(() => {
    // Sort by first delivery date (nearest first)
    const sortedOrders = [...mockJobOrders].sort((a, b) => {
      return new Date(a.firstDeliveryDate).getTime() - new Date(b.firstDeliveryDate).getTime();
    });
    setJobOrders(sortedOrders);
    setFilteredData(sortedOrders);
  }, []);

  const handleSearch = (value: string) => {
    setSearchText(value);
    const filtered = jobOrders.filter(
      (item) =>
        item.customerName.toLowerCase().includes(value.toLowerCase()) ||
        item.jobOrderNumber.toLowerCase().includes(value.toLowerCase()) ||
        item.company.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleStatusChange = (jobOrderId: string, newStatus: string) => {
    const updatedData = filteredData.map((item) =>
      item.id === jobOrderId ? { ...item, status: newStatus as JobOrderItem['status'] } : item
    );
    setFilteredData(updatedData);
    message.success(`Status updated to ${newStatus}`);
  };

  const handleViewOrder = (record: JobOrderItem) => {
    message.info(`Viewing Job Order: ${record.jobOrderNumber}`);
    // TODO: Implement view order details
  };

  const columns: ColumnsType<JobOrderItem> = [
    {
      title: 'Job Order',
      dataIndex: 'jobOrderNumber',
      key: 'jobOrderNumber',
      width: 140,
      fixed: 'left',
      sorter: (a, b) => a.jobOrderNumber.localeCompare(b.jobOrderNumber),
    },
    {
      title: 'Customer',
      dataIndex: 'customerName',
      key: 'customerName',
      width: 160,
      sorter: (a, b) => a.customerName.localeCompare(b.customerName),
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      width: 200,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 260,
    },
    {
      title: 'Contact',
      dataIndex: 'contactNumber',
      key: 'contactNumber',
      width: 150,
    },
    {
      title: 'Total Products',
      dataIndex: 'totalProducts',
      key: 'totalProducts',
      width: 140,
      sorter: (a, b) => a.totalProducts - b.totalProducts,
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      width: 140,
      sorter: (a, b) => a.totalPrice - b.totalPrice,
      render: (value) => `₹${value.toLocaleString()}`,
    },
    {
      title: 'First Delivery Date',
      dataIndex: 'firstDeliveryDate',
      key: 'firstDeliveryDate',
      width: 170,
      sorter: (a, b) => new Date(a.firstDeliveryDate).getTime() - new Date(b.firstDeliveryDate).getTime(),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      filters: [
        { text: 'Pending', value: 'Pending' },
        { text: 'In Progress', value: 'In Progress' },
        { text: 'Completed', value: 'Completed' },
        { text: 'On Hold', value: 'On Hold' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status, record) => {
        const getStatusColor = (status: string) => {
          const colors: Record<string, string> = {
            Pending: 'blue',
            'In Progress': 'orange',
            Completed: 'green',
            'On Hold': 'red',
          };
          return colors[status] || 'default';
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
              { value: 'Pending', label: 'Pending' },
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
      width: 120,
      fixed: 'right',
      render: (_, record) => (
        <Button
          type="text"
          icon={<EyeOutlined style={{ fontSize: '16px' }} />}
          onClick={() => handleViewOrder(record)}
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
        /* Table basic styling */
        .job-order-data-table .ant-table {
          border-collapse: collapse;
        }

        /* Header styling */
        .job-order-data-table .ant-table-thead > tr > th {
          background: #FFFFFF !important;
          padding: 12px 16px;
          height: 48px;
          border-bottom: 1px solid #e0e0e0;
          font-weight: 600;
          font-size: 13px;
          color: #64748B;
        }

        /* Body cell styling */
        .job-order-data-table .ant-table-tbody > tr > td {
          padding: 12px 16px;
          height: 48px;
          border-bottom: 1px solid #f0f0f0;
          background: #FFFFFF;
        }

        /* Fixed column styling - left */
        .job-order-data-table .ant-table-cell-fix-left {
          background: #FFFFFF !important;
          box-shadow: 2px 0 4px rgba(0, 0, 0, 0.06) !important;
          z-index: 2 !important;
        }

        .job-order-data-table .ant-table-thead .ant-table-cell-fix-left {
          background: #FFFFFF !important;
          box-shadow: 2px 0 4px rgba(0, 0, 0, 0.06) !important;
          z-index: 3 !important;
        }

        /* Fixed column styling - right */
        .job-order-data-table .ant-table-cell-fix-right {
          background: #FFFFFF !important;
          box-shadow: -2px 0 4px rgba(0, 0, 0, 0.06) !important;
          z-index: 2 !important;
        }

        .job-order-data-table .ant-table-thead .ant-table-cell-fix-right {
          background: #FFFFFF !important;
          box-shadow: -2px 0 4px rgba(0, 0, 0, 0.06) !important;
          z-index: 3 !important;
        }

        /* Hover states */
        .job-order-data-table .ant-table-tbody > tr:hover > td {
          background: #F8FAFC !important;
        }

        .job-order-data-table .ant-table-tbody > tr:hover > td.ant-table-cell-fix-left,
        .job-order-data-table .ant-table-tbody > tr:hover > td.ant-table-cell-fix-right {
          background: #F8FAFC !important;
        }

        /* Remove measure row */
        .job-order-data-table .ant-table-measure-row {
          display: none;
        }

        /* Pagination spacing */
        .job-order-data-table .ant-pagination {
          margin-top: 16px;
        }

        /* Card styling */
        .job-order-page-card {
          min-height: auto;
          height: auto;
        }
      `}</style>
      <div className="job-order-page-container" data-testid="job-order-page">
        <Card
          className="job-order-page-card"
          data-testid="job-order-card"
          style={{
            borderRadius: '16px',
            border: '1px solid rgba(226, 232, 240, 0.6)',
            background: 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          }}
          styles={{ body: { padding: '20px' } }}
        >
          {/* Header with Title, Search */}
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
                Job Orders
              </h1>
            </div>

            <div className="header-actions-section" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div className="header-search">
                <Input
                  placeholder="Search by job order, customer, or company"
                  prefix={<SearchOutlined size={16} />}
                  value={searchText}
                  onChange={(e) => handleSearch(e.target.value)}
                  style={{ width: '400px' }}
                  size="large"
                />
              </div>
            </div>
          </div>

          <Table
            className="job-order-data-table"
            data-testid="job-order-table"
            columns={columns}
            dataSource={filteredData}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} job orders`,
            }}
            style={{ background: 'transparent', margin: 0, padding: 0 }}
            scroll={{ x: 1630 }}
          />
        </Card>
      </div>
    </>
  );
};

export default JobOrder;
