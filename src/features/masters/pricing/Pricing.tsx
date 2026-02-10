import { useState } from 'react';
import { Table, Button, Input, Space, Tag, Card, Select, message, Segmented } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, DownOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import AddBoardDrawer from '../../../components/masters/AddBoardDrawer';
import AddLaminationDrawer from '../../../components/masters/AddLaminationDrawer';
import AddPrintingDrawer from '../../../components/masters/AddPrintingDrawer';
import AddDieModal from '../../../components/masters/AddDieModal';
import AddGSTModal from '../../../components/masters/AddGSTModal';
import { themeColors } from '../../../theme/themeConfig';

interface Board {
  id: string;
  code: string;
  name: string;
  type: string;
  gsm: number;
  size: string;
  finish: string;
  supplier: string;
  perKgRate: number;
  pricePerSheet: number;
  stockQuantity: number;
  status: 'Active' | 'Inactive';
  // Printing specific fields
  minimumQuantity?: number;
  firstSetPrice?: number;
  extraCopiesPrice?: number;
  // Die specific field
  minimumDieRate?: number;
  // GST specific fields
  igst?: number;
  sgst?: number;
  cgst?: number;
}


const mockBoards: Board[] = [
  {
    id: '1',
    code: 'BRD-001',
    name: 'Art Card 300gsm',
    type: 'Board',
    gsm: 300,
    size: '20" x 30"',
    finish: 'Glossy',
    supplier: 'JK Papers',
    perKgRate: 120,
    pricePerSheet: 45,
    stockQuantity: 500,
    status: 'Active',
  },
  {
    id: '2',
    code: 'BRD-002',
    name: 'Art Card 350gsm',
    type: 'Board',
    gsm: 350,
    size: '20" x 30"',
    finish: 'Matt',
    supplier: 'JK Papers',
    perKgRate: 135,
    pricePerSheet: 52,
    stockQuantity: 300,
    status: 'Active',
  },
  {
    id: '3',
    code: 'BRD-003',
    name: 'Ivory Board 250gsm',
    type: 'Board',
    gsm: 250,
    size: '22" x 34"',
    finish: 'Matt',
    supplier: 'ITC Paperboards',
    perKgRate: 95,
    pricePerSheet: 38,
    stockQuantity: 450,
    status: 'Active',
  },
  {
    id: '4',
    code: 'LAM-001',
    name: 'Glossy Lamination 12 micron',
    type: 'Lamination',
    gsm: 0,
    size: '-',
    finish: 'Glossy',
    supplier: 'Uflex Limited',
    perKgRate: 250,
    pricePerSheet: 0,
    stockQuantity: 0,
    status: 'Active',
  },
  {
    id: '5',
    code: 'LAM-002',
    name: 'Matte Lamination 12 micron',
    type: 'Lamination',
    gsm: 0,
    size: '-',
    finish: 'Matte',
    supplier: 'Uflex Limited',
    perKgRate: 270,
    pricePerSheet: 0,
    stockQuantity: 0,
    status: 'Active',
  },
  {
    id: '9',
    code: 'LAM-003',
    name: 'UV Lamination',
    type: 'Lamination',
    gsm: 0,
    size: '-',
    finish: 'UV',
    supplier: 'Cosmo Films',
    perKgRate: 320,
    pricePerSheet: 0,
    stockQuantity: 0,
    status: 'Active',
  },
  {
    id: '6',
    code: 'PRT-001',
    name: 'Default Printing Pricing',
    type: 'Printing',
    gsm: 0,
    size: '-',
    finish: '-',
    supplier: '-',
    perKgRate: 180,
    pricePerSheet: 0,
    stockQuantity: 0,
    status: 'Active',
    minimumQuantity: 100,
    firstSetPrice: 500,
    extraCopiesPrice: 5,
  },
  {
    id: '7',
    code: 'DIE-001',
    name: 'Die Rate',
    type: 'Die',
    gsm: 0,
    size: '-',
    finish: '-',
    supplier: '-',
    perKgRate: 150,
    pricePerSheet: 0,
    stockQuantity: 0,
    status: 'Active',
    minimumDieRate: 150,
  },
  {
    id: '8',
    code: 'FLT-001',
    name: 'Flute Board 3mm',
    type: 'Flute',
    gsm: 0,
    size: '-',
    finish: '-',
    supplier: '-',
    perKgRate: 85,
    pricePerSheet: 0,
    stockQuantity: 0,
    status: 'Active',
  },
  {
    id: '9',
    code: 'GST-001',
    name: 'GST',
    type: 'GST',
    gsm: 0,
    size: '-',
    finish: '-',
    supplier: '-',
    perKgRate: 0,
    pricePerSheet: 0,
    stockQuantity: 0,
    status: 'Active',
    igst: 18,
    sgst: 9,
    cgst: 9,
  },
];


const Pricing = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredBoards, setFilteredBoards] = useState(mockBoards);
  const [boardDrawerOpen, setBoardDrawerOpen] = useState(false);
  const [laminationDrawerOpen, setLaminationDrawerOpen] = useState(false);
  const [printingDrawerOpen, setPrintingDrawerOpen] = useState(false);
  const [dieDrawerOpen, setDieDrawerOpen] = useState(false);
  const [gstModalOpen, setGstModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('boards');

  const handleSearch = (value: string) => {
    setSearchText(value);

    const filteredBoardsData = mockBoards.filter(
      (item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.type.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredBoards(filteredBoardsData);
  };

  const handleStatusChange = (itemId: string, newStatus: string) => {
    const updatedData = filteredBoards.map((item) =>
      item.id === itemId ? { ...item, status: newStatus as typeof item.status } : item
    );
    setFilteredBoards(updatedData);
    message.success(`Status updated to ${newStatus}`);
  };

  const laminationColumns: ColumnsType<Board> = [
    {
      title: 'Lamination Type',
      dataIndex: 'finish',
      key: 'finish',
      width: 250,
    },
    {
      title: 'Price',
      dataIndex: 'perKgRate',
      key: 'perKgRate',
      sorter: (a, b) => a.perKgRate - b.perKgRate,
      render: (value) => `₹${value}`,
      width: 150,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 150,
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
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 180,
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

  const boardColumns: ColumnsType<Board> = [
    {
      title: 'Category',
      dataIndex: 'type',
      key: 'type',
      fixed: 'left',
      width: 150,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      width: 300,
    },
    {
      title: 'Per KG Rate',
      dataIndex: 'perKgRate',
      key: 'perKgRate',
      sorter: (a, b) => a.perKgRate - b.perKgRate,
      render: (value) => `₹${value}`,
      width: 150,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 150,
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
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      width: 180,
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



  const tableStyle = `
    /* Table basic styling */
    .pricing-data-table .ant-table {
      border-collapse: collapse;
    }

    /* Header styling */
    .pricing-data-table .ant-table-thead > tr > th {
      background: #FFFFFF !important;
      padding: 12px 16px;
      height: 48px;
      border-bottom: 1px solid #e0e0e0;
      font-weight: 600;
      font-size: 13px;
      color: #64748B;
    }

    /* Body cell styling */
    .pricing-data-table .ant-table-tbody > tr > td {
      padding: 12px 16px;
      height: 48px;
      border-bottom: 1px solid #f0f0f0;
      background: #FFFFFF;
    }

    /* Fixed column styling - left */
    .pricing-data-table .ant-table-cell-fix-left {
      background: #FFFFFF !important;
      box-shadow: 2px 0 4px rgba(0, 0, 0, 0.06) !important;
      z-index: 2 !important;
    }

    .pricing-data-table .ant-table-thead .ant-table-cell-fix-left {
      background: #FFFFFF !important;
      box-shadow: 2px 0 4px rgba(0, 0, 0, 0.06) !important;
      z-index: 3 !important;
    }

    /* Fixed column styling - right */
    .pricing-data-table .ant-table-cell-fix-right {
      background: #FFFFFF !important;
      box-shadow: -2px 0 4px rgba(0, 0, 0, 0.06) !important;
      z-index: 2 !important;
    }

    .pricing-data-table .ant-table-thead .ant-table-cell-fix-right {
      background: #FFFFFF !important;
      box-shadow: -2px 0 4px rgba(0, 0, 0, 0.06) !important;
      z-index: 3 !important;
    }

    /* Hover states */
    .pricing-data-table .ant-table-tbody > tr:hover > td {
      background: #F8FAFC !important;
    }

    .pricing-data-table .ant-table-tbody > tr:hover > td.ant-table-cell-fix-left,
    .pricing-data-table .ant-table-tbody > tr:hover > td.ant-table-cell-fix-right {
      background: #F8FAFC !important;
    }

    /* Remove measure row */
    .pricing-data-table .ant-table-measure-row {
      display: none;
    }

    /* Pagination spacing */
    .pricing-data-table .ant-pagination {
      margin-top: 16px;
    }

    /* Segmented control styling */
    .custom-segmented .ant-segmented-item-selected {
      background: #0F172A !important;
      color: #FFFFFF !important;
    }

    .custom-segmented .ant-segmented-item-selected .ant-segmented-item-label {
      color: #FFFFFF !important;
    }

    .custom-segmented .ant-segmented-item {
      color: #64748B;
    }

    .custom-segmented .ant-segmented-item:hover:not(.ant-segmented-item-selected) {
      background: rgba(15, 23, 42, 0.05);
    }
  `;


  const renderGSTCardView = (items: Board[]) => {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '16px',
      }}>
        {items.map((item) => (
          <Card
            key={item.id}
            style={{
              borderRadius: '12px',
              border: `1px solid ${themeColors.border}`,
              background: '#FFFFFF',
            }}
            styles={{ body: { padding: '16px' } }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: themeColors.text }}>
                {item.name}
              </h3>
              <Tag color={item.status === 'Active' ? 'green' : 'red'}>
                {item.status}
              </Tag>
            </div>

            <div style={{ display: 'flex', gap: '24px', marginBottom: '16px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '12px', color: themeColors.textSecondary, marginBottom: '4px' }}>
                  IGST
                </div>
                <div style={{ fontSize: '16px', fontWeight: 600, color: themeColors.text }}>
                  {item.igst || 0}%
                </div>
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '12px', color: themeColors.textSecondary, marginBottom: '4px' }}>
                  SGST
                </div>
                <div style={{ fontSize: '16px', fontWeight: 600, color: themeColors.text }}>
                  {item.sgst || 0}%
                </div>
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '12px', color: themeColors.textSecondary, marginBottom: '4px' }}>
                  CGST
                </div>
                <div style={{ fontSize: '16px', fontWeight: 600, color: themeColors.text }}>
                  {item.cgst || 0}%
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <Space>
                <Button type="text" icon={<EditOutlined />} size="small">
                  Edit
                </Button>
                <Button type="text" danger icon={<DeleteOutlined />} size="small">
                  Delete
                </Button>
              </Space>
            </div>
          </Card>
        ))}
      </div>
    );
  };

  const renderDieCardView = (items: Board[]) => {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '16px',
      }}>
        {items.map((item) => (
          <Card
            key={item.id}
            style={{
              borderRadius: '12px',
              border: `1px solid ${themeColors.border}`,
              background: '#FFFFFF',
            }}
            styles={{ body: { padding: '16px' } }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: themeColors.text }}>
                {item.name}
              </h3>
              <Tag color={item.status === 'Active' ? 'green' : 'red'}>
                {item.status}
              </Tag>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', color: themeColors.textSecondary, marginBottom: '4px' }}>
                Minimum Die Rate
              </div>
              <div style={{ fontSize: '16px', fontWeight: 600, color: themeColors.text }}>
                ₹{item.minimumDieRate || 0}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <Space>
                <Button type="text" icon={<EditOutlined />} size="small">
                  Edit
                </Button>
                <Button type="text" danger icon={<DeleteOutlined />} size="small">
                  Delete
                </Button>
              </Space>
            </div>
          </Card>
        ))}
      </div>
    );
  };

  const renderPrintingCardView = (items: Board[]) => {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '16px',
      }}>
        {items.map((item) => (
          <Card
            key={item.id}
            style={{
              borderRadius: '12px',
              border: `1px solid ${themeColors.border}`,
              background: '#FFFFFF',
            }}
            styles={{ body: { padding: '16px' } }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: themeColors.text }}>
                {item.name}
              </h3>
              <Tag color={item.status === 'Active' ? 'green' : 'red'}>
                {item.status}
              </Tag>
            </div>

            <div style={{ display: 'grid', gap: '12px', marginBottom: '16px' }}>
              <div>
                <div style={{ fontSize: '12px', color: themeColors.textSecondary, marginBottom: '4px' }}>
                  Minimum Quantity
                </div>
                <div style={{ fontSize: '16px', fontWeight: 600, color: themeColors.text }}>
                  {item.minimumQuantity || 0}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '12px', color: themeColors.textSecondary, marginBottom: '4px' }}>
                  1st Set Price
                </div>
                <div style={{ fontSize: '16px', fontWeight: 600, color: themeColors.text }}>
                  ₹{item.firstSetPrice || 0}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '12px', color: themeColors.textSecondary, marginBottom: '4px' }}>
                  Extra Copy Price
                </div>
                <div style={{ fontSize: '16px', fontWeight: 600, color: themeColors.text }}>
                  ₹{item.extraCopiesPrice || 0}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <Space>
                <Button type="text" icon={<EditOutlined />} size="small">
                  Edit
                </Button>
                <Button type="text" danger icon={<DeleteOutlined />} size="small">
                  Delete
                </Button>
              </Space>
            </div>
          </Card>
        ))}
      </div>
    );
  };


  const renderContent = () => {
    const filterByType = (type: string) => filteredBoards.filter(item => item.type === type);

    if (activeTab === 'boards') {
      return (
        <Table
          className="pricing-data-table"
          data-testid="boards-table"
          columns={boardColumns}
          dataSource={filterByType('Board')}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} items`,
          }}
          scroll={{ x: 900 }}
          style={{ background: 'transparent', margin: 0, padding: 0 }}
        />
      );
    } else if (activeTab === 'lamination') {
      return (
        <Table
          className="pricing-data-table"
          data-testid="lamination-table"
          columns={laminationColumns}
          dataSource={filterByType('Lamination')}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} items`,
          }}
          scroll={{ x: 700 }}
          style={{ background: 'transparent', margin: 0, padding: 0 }}
        />
      );
    } else if (activeTab === 'printing') {
      return renderPrintingCardView(filterByType('Printing'));
    } else if (activeTab === 'die') {
      return renderDieCardView(filterByType('Die'));
    } else if (activeTab === 'gst') {
      return renderGSTCardView(filterByType('GST'));
    }
  };

  const getAddButtonText = () => {
    switch (activeTab) {
      case 'boards':
        return 'Add Board';
      case 'lamination':
        return 'Add Lamination';
      case 'printing':
        return 'Add Printing';
      case 'die':
        return 'Add Die';
      case 'gst':
        return 'Configure GST';
      default:
        return 'Add Pricing';
    }
  };

  return (
    <div className="master-page-container" data-testid="pricing-page" style={{
      background: 'rgba(232, 237, 242, 0.4)',
      backdropFilter: 'blur(40px)',
      minHeight: '100vh',
      padding: '24px',
    }}>
      <Card
        className="master-page-card"
        data-testid="pricing-card"
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
            <Segmented
              value={activeTab}
              onChange={(value) => setActiveTab(value as string)}
              options={[
                { label: 'Boards', value: 'boards' },
                { label: 'Lamination', value: 'lamination' },
                { label: 'Printing', value: 'printing' },
                { label: 'Die', value: 'die' },
                { label: 'GST', value: 'gst' },
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
                placeholder="Search pricing..."
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
                onClick={() => {
                  if (activeTab === 'boards') {
                    setBoardDrawerOpen(true);
                  } else if (activeTab === 'lamination') {
                    setLaminationDrawerOpen(true);
                  } else if (activeTab === 'printing') {
                    setPrintingDrawerOpen(true);
                  } else if (activeTab === 'die') {
                    setDieDrawerOpen(true);
                  } else if (activeTab === 'gst') {
                    setGstModalOpen(true);
                  }
                }}
                style={{
                  background: '#0F172A',
                  borderColor: '#0F172A',
                  height: '40px',
                  borderRadius: '50px',
                  padding: '0 20px',
                }}
              >
                {getAddButtonText()}
              </Button>
            </div>
          </div>
        </div>

        <div className="page-body" data-testid="page-body">
          <style>{tableStyle}</style>
          {renderContent()}
        </div>
      </Card>

      <AddBoardDrawer open={boardDrawerOpen} onClose={() => setBoardDrawerOpen(false)} />
      <AddLaminationDrawer open={laminationDrawerOpen} onClose={() => setLaminationDrawerOpen(false)} />
      <AddPrintingDrawer open={printingDrawerOpen} onClose={() => setPrintingDrawerOpen(false)} />
      <AddDieModal open={dieDrawerOpen} onClose={() => setDieDrawerOpen(false)} />
      <AddGSTModal open={gstModalOpen} onClose={() => setGstModalOpen(false)} />
    </div>
  );
};

export default Pricing;
