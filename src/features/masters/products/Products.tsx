import { useState } from 'react';
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
  unit: string;
  basePrice: number;
  status: 'Active' | 'Inactive';
}

const mockProducts: Product[] = [
  {
    id: '1',
    code: 'PRD-001',
    name: 'Standard Business Card',
    category: 'Business Cards',
    description: '3.5" x 2" - 350gsm - Matt Finish',
    unit: 'Per 100',
    basePrice: 500,
    status: 'Active',
  },
  {
    id: '2',
    code: 'PRD-002',
    name: 'Premium Business Card',
    category: 'Business Cards',
    description: '3.5" x 2" - 400gsm - Glossy Finish',
    unit: 'Per 100',
    basePrice: 750,
    status: 'Active',
  },
  {
    id: '3',
    code: 'PRD-003',
    name: 'A4 Brochure - Bi-fold',
    category: 'Brochures',
    description: 'A4 size - 170gsm - Glossy Art Paper',
    unit: 'Per Piece',
    basePrice: 25,
    status: 'Active',
  },
  {
    id: '4',
    code: 'PRD-004',
    name: 'A5 Flyer',
    category: 'Flyers',
    description: 'A5 size - 130gsm - Maplitho',
    unit: 'Per 100',
    basePrice: 300,
    status: 'Active',
  },
  {
    id: '5',
    code: 'PRD-005',
    name: 'A3 Poster',
    category: 'Posters',
    description: 'A3 size - 200gsm - Glossy',
    unit: 'Per Piece',
    basePrice: 80,
    status: 'Active',
  },
  {
    id: '6',
    code: 'PRD-006',
    name: 'Corrugated Box - Small',
    category: 'Packaging',
    description: '10" x 8" x 6" - 3 Ply',
    unit: 'Per Piece',
    basePrice: 45,
    status: 'Active',
  },
  {
    id: '7',
    code: 'PRD-007',
    name: 'Product Label Roll',
    category: 'Labels & Stickers',
    description: '2" x 3" - Vinyl - 1000 labels/roll',
    unit: 'Per Roll',
    basePrice: 1200,
    status: 'Active',
  },
  {
    id: '8',
    code: 'PRD-008',
    name: 'A4 Catalogue - Saddle Stitch',
    category: 'Catalogues',
    description: '16 pages - 170gsm inner, 300gsm cover',
    unit: 'Per Piece',
    basePrice: 120,
    status: 'Inactive',
  },
];

const Products = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(mockProducts);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSearch = (value: string) => {
    setSearchText(value);
    const filtered = mockProducts.filter(
      (item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.code.toLowerCase().includes(value.toLowerCase()) ||
        item.category.toLowerCase().includes(value.toLowerCase()) ||
        item.description.toLowerCase().includes(value.toLowerCase())
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
    },
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
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
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
      key: 'unit',
    },
    {
      title: 'Base Price',
      dataIndex: 'basePrice',
      key: 'basePrice',
      sorter: (a, b) => a.basePrice - b.basePrice,
      render: (value) => `₹${value.toLocaleString()}`,
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
    <div className="master-page-container" data-testid="products-page">
      <Card
        className="master-page-card"
        data-testid="products-card"
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
              Products
            </h1>
          </div>

          <div className="header-actions-section" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div className="header-search">
              <Input
                placeholder="Search products..."
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
                Add Product
              </Button>
            </div>
          </div>
        </div>

        <div className="page-body" data-testid="page-body">
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
            style={{ background: 'transparent' }}
          />
        </div>
      </Card>

      <AddProductDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
};

export default Products;
