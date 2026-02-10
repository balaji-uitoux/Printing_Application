import { useState, useEffect } from 'react';
import { Table, Button, Input, Space, Tag, Card, Select, message } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, DownOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import AddProductDrawer from '../../../components/masters/AddProductDrawer';

interface Product {
  id: string;
  code: string;
  name: string;
  category: string;
  description: string;
  client: string;
  groupedWith?: string[];
  status: 'Active' | 'Inactive';
}

const mockProducts: Product[] = [
  {
    id: '1',
    code: 'PRD-001',
    name: 'AALIA & ANUSHKA SLIPS',
    category: 'Slips',
    description: 'Custom printing slips',
    client: 'Digsel',
    status: 'Active',
  },
  {
    id: '2',
    code: 'PRD-002',
    name: 'PUFFY & KURTHA BOX',
    category: 'Boxes',
    description: 'Packaging boxes',
    client: 'Tech Solutions Pvt Ltd',
    groupedWith: ['TOP - 286 X 199 X 38', 'BTM - 281 X 194 X 45'],
    status: 'Active',
  },
  {
    id: '3',
    code: 'PRD-003',
    name: 'DEEPIKA & MICHELLE SLIPS',
    category: 'Slips',
    description: 'Custom printing slips',
    client: 'Green Earth Industries',
    status: 'Active',
  },
  {
    id: '4',
    code: 'PRD-004',
    name: 'EVELY SLIPS 6pcs BOX',
    category: 'Boxes',
    description: '6 pieces box packaging',
    client: 'Urban Designs Studio',
    groupedWith: ['XPC - 99 BOX'],
    status: 'Active',
  },
  {
    id: '5',
    code: 'PRD-005',
    name: 'XPC - 99 BOX',
    category: 'Boxes',
    description: 'XPC packaging box',
    client: 'Acme Corporation',
    status: 'Active',
  },
  {
    id: '6',
    code: 'PRD-006',
    name: 'RIYA KIDS PANTIES PHOTOCARD',
    category: 'Photocards',
    description: 'Product photocard',
    client: 'Tech Solutions Pvt Ltd',
    status: 'Active',
  },
  {
    id: '7',
    code: 'PRD-007',
    name: 'ANUSHKA PHOTOCARD',
    category: 'Photocards',
    description: 'Product photocard',
    client: 'Acme Corporation',
    status: 'Active',
  },
  {
    id: '8',
    code: 'PRD-008',
    name: 'PUFFY PHOTOCARD',
    category: 'Photocards',
    description: 'Product photocard',
    client: 'Green Earth Industries',
    groupedWith: ['MICHELLE PHOTOCARD', 'ANUSHKA PHOTOCARD'],
    status: 'Active',
  },
  {
    id: '9',
    code: 'PRD-009',
    name: 'MICHELLE PHOTOCARD',
    category: 'Photocards',
    description: 'Product photocard',
    client: 'Urban Designs Studio',
    status: 'Active',
  },
  {
    id: '10',
    code: 'PRD-010',
    name: 'TOP - 286 X 199 X 38',
    category: 'Boxes',
    description: 'Top box with dimensions',
    client: 'Tech Solutions Pvt Ltd',
    groupedWith: ['BTM - 281 X 194 X 45'],
    status: 'Active',
  },
  {
    id: '11',
    code: 'PRD-011',
    name: 'BTM - 281 X 194 X 45',
    category: 'Boxes',
    description: 'Bottom box with dimensions',
    client: 'Tech Solutions Pvt Ltd',
    groupedWith: ['TOP - 286 X 199 X 38'],
    status: 'Active',
  },
  {
    id: '12',
    code: 'PRD-012',
    name: 'EVELY SLIPS PHOTOCARD',
    category: 'Photocards',
    description: 'Product photocard',
    client: 'Green Earth Industries',
    status: 'Active',
  },
  {
    id: '13',
    code: 'PRD-013',
    name: 'XPC - 99 PHOTOCARD',
    category: 'Photocards',
    description: 'Product photocard',
    client: 'Acme Corporation',
    status: 'Active',
  },
  {
    id: '14',
    code: 'PRD-014',
    name: 'RIYA KIDS PHOTOCARD',
    category: 'Photocards',
    description: 'Product photocard',
    client: 'Urban Designs Studio',
    status: 'Active',
  },
];

const Products = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(mockProducts);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const searchKeywords = ['Product', 'Customer'];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % searchKeywords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (value: string) => {
    setSearchText(value);
    const filtered = mockProducts.filter(
      (item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.code.toLowerCase().includes(value.toLowerCase()) ||
        item.category.toLowerCase().includes(value.toLowerCase()) ||
        item.description.toLowerCase().includes(value.toLowerCase()) ||
        item.client.toLowerCase().includes(value.toLowerCase())
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

  const columns: ColumnsType<Product> = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      sorter: (a, b) => a.code.localeCompare(b.code),
      fixed: 'left',
      width: 120,
    },
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      width: 250,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      filters: [
        { text: 'Slips', value: 'Slips' },
        { text: 'Boxes', value: 'Boxes' },
        { text: 'Photocards', value: 'Photocards' },
      ],
      onFilter: (value, record) => record.category === value,
      width: 150,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 200,
    },
    {
      title: 'Client/Customer',
      dataIndex: 'client',
      key: 'client',
      sorter: (a, b) => a.client.localeCompare(b.client),
      width: 200,
    },
    {
      title: 'Grouped With',
      dataIndex: 'groupedWith',
      key: 'groupedWith',
      render: (groupedWith: string[]) => {
        if (!groupedWith || groupedWith.length === 0) {
          return <span style={{ color: '#94A3B8' }}>-</span>;
        }
        return <span>{groupedWith.join(', ')}</span>;
      },
      width: 300,
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
      width: 150,
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
      fixed: 'right',
      width: 180,
    },
  ];

  return (
    <div className="master-page-container" data-testid="products-page" style={{
      background: 'rgba(232, 237, 242, 0.4)',
      backdropFilter: 'blur(40px)',
      minHeight: '100vh',
      padding: '24px',
    }}>
      <Card
        className="master-page-card"
        data-testid="products-card"
        style={{
          borderRadius: '16px',
          border: '1px solid rgba(226, 232, 240, 0.6)',
          background: 'rgba(255, 255, 255, 0.6)',
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
              Products
            </h1>
          </div>

          <div className="header-actions-section" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div className="header-search" style={{ position: 'relative' }}>
              <style>
                {`
                  @keyframes slideUpIn {
                    from {
                      transform: translateY(20px);
                      opacity: 0;
                    }
                    to {
                      transform: translateY(0);
                      opacity: 1;
                    }
                  }
                  .search-input-animated .ant-input::placeholder {
                    animation: slideUpIn 0.5s ease-out;
                  }
                `}
              </style>
              <Input
                key={placeholderIndex}
                className="search-input-animated"
                placeholder={searchKeywords[placeholderIndex]}
                prefix={<SearchOutlined size={16} />}
                value={searchText}
                onChange={(e) => handleSearch(e.target.value)}
                style={{ width: '350px' }}
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
                Add Product
              </Button>
            </div>
          </div>
        </div>

        <div className="page-body" data-testid="page-body">
          <style>
            {`
              /* Table basic styling */
              .master-data-table .ant-table {
                border-collapse: collapse;
              }

              /* Header styling */
              .master-data-table .ant-table-thead > tr > th {
                background: #FFFFFF !important;
                padding: 12px 16px;
                height: 48px;
                border-bottom: 1px solid #e0e0e0;
                font-weight: 600;
                font-size: 13px;
                color: #64748B;
              }

              /* Body cell styling */
              .master-data-table .ant-table-tbody > tr > td {
                padding: 12px 16px;
                height: 48px;
                border-bottom: 1px solid #f0f0f0;
                background: #FFFFFF;
              }

              /* Fixed column styling - left */
              .master-data-table .ant-table-cell-fix-left {
                background: #FFFFFF !important;
                box-shadow: 2px 0 4px rgba(0, 0, 0, 0.06) !important;
                z-index: 2 !important;
              }

              .master-data-table .ant-table-thead .ant-table-cell-fix-left {
                background: #FFFFFF !important;
                box-shadow: 2px 0 4px rgba(0, 0, 0, 0.06) !important;
                z-index: 3 !important;
              }

              /* Fixed column styling - right */
              .master-data-table .ant-table-cell-fix-right {
                background: #FFFFFF !important;
                box-shadow: -2px 0 4px rgba(0, 0, 0, 0.06) !important;
                z-index: 2 !important;
              }

              .master-data-table .ant-table-thead .ant-table-cell-fix-right {
                background: #FFFFFF !important;
                box-shadow: -2px 0 4px rgba(0, 0, 0, 0.06) !important;
                z-index: 3 !important;
              }

              /* Hover states */
              .master-data-table .ant-table-tbody > tr:hover > td {
                background: #F8FAFC !important;
              }

              .master-data-table .ant-table-tbody > tr:hover > td.ant-table-cell-fix-left,
              .master-data-table .ant-table-tbody > tr:hover > td.ant-table-cell-fix-right {
                background: #F8FAFC !important;
              }

              /* Remove measure row */
              .master-data-table .ant-table-measure-row {
                display: none;
              }

              /* Pagination spacing */
              .master-data-table .ant-pagination {
                margin-top: 16px;
              }
            `}
          </style>
          <Table
            className="master-data-table"
            data-testid="products-table"
            columns={columns}
            dataSource={filteredData}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} products`,
            }}
            scroll={{ x: 1500 }}
            style={{ background: 'transparent', margin: 0, padding: 0 }}
          />
        </div>
      </Card>

      <AddProductDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
};

export default Products;
