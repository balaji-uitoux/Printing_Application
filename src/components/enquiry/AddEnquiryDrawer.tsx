import { Drawer, Form, Input, Select, DatePicker, Button, InputNumber, Upload } from 'antd';
import { PlusOutlined, CloseOutlined, HomeOutlined, UserOutlined, PhoneOutlined, DeleteOutlined, UploadOutlined, IdcardOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { typography } from '../../theme/typography';
import { themeColors } from '../../theme/themeConfig';

interface AddEnquiryDrawerProps {
  open: boolean;
  onClose: () => void;
}

interface ProductLine {
  id: string;
}

interface Customer {
  id: string;
  name: string;
  company: string;
  contactPerson: string;
  contactNumber: string;
  gstNumber: string;
}

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Digsel',
    company: 'Digsel',
    contactPerson: 'Rajesh Kumar',
    contactNumber: '+91 9876543210',
    gstNumber: '29ABCDE1234F1Z5',
  },
  {
    id: '2',
    name: 'Acme Corporation',
    company: 'Acme Corporation',
    contactPerson: 'John Smith',
    contactNumber: '+91 9876543211',
    gstNumber: '27ABCDE5678G2Z8',
  },
  {
    id: '3',
    name: 'Tech Solutions Pvt Ltd',
    company: 'Tech Solutions Pvt Ltd',
    contactPerson: 'Sarah Johnson',
    contactNumber: '+91 9876543212',
    gstNumber: '29ABCDE9012H3Z1',
  },
  {
    id: '4',
    name: 'Green Earth Industries',
    company: 'Green Earth Industries',
    contactPerson: 'Michael Chen',
    contactNumber: '+91 9876543213',
    gstNumber: '33ABCDE3456I4Z4',
  },
  {
    id: '5',
    name: 'Urban Designs Studio',
    company: 'Urban Designs Studio',
    contactPerson: 'Emma Wilson',
    contactNumber: '+91 9876543214',
    gstNumber: '29ABCDE7890J5Z7',
  },
];

const AddEnquiryDrawer = ({ open, onClose }: AddEnquiryDrawerProps) => {
  const [form] = Form.useForm();
  const [productLines, setProductLines] = useState<ProductLine[]>([{ id: '1' }]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const addProductLine = () => {
    setProductLines([...productLines, { id: Date.now().toString() }]);
  };

  const removeProductLine = (id: string) => {
    if (productLines.length > 1) {
      setProductLines(productLines.filter((line) => line.id !== id));
    }
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      console.log('Form values:', values);
      onClose();
    });
  };

  const inputStyle = {
    height: '36px',
    border: `1px solid ${themeColors.border}`,
    borderRadius: '8px',
  };

  const customerSelectStyle = `
    .customer-select-header {
      width: auto !important;
    }
    .customer-select-header .ant-select-selector {
      border: none !important;
      box-shadow: none !important;
      background: transparent !important;
      padding: 0 30px 0 0 !important;
      font-size: 18px !important;
      font-weight: 600 !important;
      color: #3B82F6 !important;
      height: auto !important;
      line-height: 1.2 !important;
    }
    .customer-select-header .ant-select-selector:hover,
    .customer-select-header .ant-select-selector:focus {
      background: transparent !important;
      border: none !important;
    }
    .customer-select-header.ant-select-focused .ant-select-selector {
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
    }
    .customer-select-header .ant-select-selection-placeholder {
      color: #3B82F6 !important;
      font-size: 18px !important;
      padding: 0 !important;
    }
    .customer-select-header .ant-select-selection-item {
      color: #3B82F6 !important;
      padding: 0 !important;
    }
    .customer-select-header .ant-select-arrow {
      color: #3B82F6 !important;
      font-size: 14px !important;
      right: 0 !important;
    }
  `;


  return (
    <>
      <style>{customerSelectStyle}</style>
      <Drawer
        title={
        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
          }}>
            <h2 style={{
              margin: 0,
              fontSize: '28px',
              fontWeight: 700,
              color: themeColors.text,
            }}>
              Add Enquiry
            </h2>
            <Button
              type="text"
              icon={<CloseOutlined size={16} />}
              onClick={onClose}
              style={{
                fontSize: '16px',
                color: themeColors.textSecondary,
                width: '32px',
                height: '32px',
              }}
            />
          </div>

          {/* Customer Selection */}
          <div style={{ marginTop: '16px' }}>
            <Select
              showSearch
              placeholder="Search Company"
              style={{
                width: 'auto',
                minWidth: '200px',
              }}
              size="large"
              variant="borderless"
              value={selectedCustomer?.id}
              onChange={(value) => {
                const customer = mockCustomers.find((c) => c.id === value);
                setSelectedCustomer(customer || null);
              }}
              filterOption={(input, option) =>
                (option?.searchtext ?? '').toString().toLowerCase().includes(input.toLowerCase())
              }
              options={mockCustomers.map((customer) => ({
                value: customer.id,
                label: customer.company,
                searchtext: `${customer.company} ${customer.contactPerson} ${customer.contactNumber}`,
              }))}
              className="customer-select-header"
            />

            {/* Customer Details */}
            {selectedCustomer && (
              <div style={{
                marginTop: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                fontSize: '14px',
                color: '#64748B',
                flexWrap: 'wrap'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <HomeOutlined size={16} color="#475569" />
                  <span>{selectedCustomer.company}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <UserOutlined size={16} color="#475569" />
                  <span>{selectedCustomer.contactPerson}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <PhoneOutlined size={16} color="#475569" />
                  <span>{selectedCustomer.contactNumber}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <IdcardOutlined size={16} color="#475569" />
                  <span>{selectedCustomer.gstNumber}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      }
      placement="right"
      width={1300}
      onClose={onClose}
      open={open}
      closable={false}
      styles={{
        body: {
          padding: '16px 24px',
          background: 'rgba(232, 237, 242, 0.4)',
          backdropFilter: 'blur(40px)',
        },
        header: {
          background: '#FFFFFF',
          borderBottom: '1px solid rgba(226, 232, 240, 0.4)',
          padding: '16px 24px',
        },
        mask: {
          backdropFilter: 'blur(4px)',
          background: 'rgba(0, 0, 0, 0.1)',
        },
      }}
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <Button onClick={onClose} style={{ height: '40px', borderRadius: '50px', ...typography.body, borderColor: themeColors.text, color: themeColors.text }}>
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={handleSubmit}
            icon={<PlusOutlined size={16} />}
            style={{ background: themeColors.text, borderColor: themeColors.text, height: '40px', borderRadius: '50px', ...typography.body }}
          >
            Submit Enquiry
          </Button>
        </div>
      }
    >
      <div
        style={{
          height: '100%',
          overflowY: 'auto',
          paddingBottom: '44px',
        }}
      >
        <Form form={form} layout="vertical">

          {/* Products Section */}
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ margin: 0, marginBottom: '16px', ...typography.body, fontWeight: 600, fontSize: '16px' }}>
              Products
            </h3>

            {/* Product Table */}
            <div
              style={{
                border: `1px solid ${themeColors.border}`,
                borderRadius: '12px',
                background: themeColors.surface,
                overflow: 'hidden',
              }}
            >
              {/* Table Header */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '40px 130px 130px 180px 90px 2fr 130px 110px 50px',
                  gap: '12px',
                  padding: '12px 16px',
                  background: '#F8FAFC',
                  borderBottom: `1px solid ${themeColors.border}`,
                  fontWeight: 600,
                  fontSize: '13px',
                  color: themeColors.textSecondary,
                }}
              >
                <div>#</div>
                <div>Category</div>
                <div>Products</div>
                <div>Dimensions (mm)</div>
                <div>Quantity</div>
                <div>Description</div>
                <div>Delivery Date</div>
                <div>Sample/Reference</div>
                <div></div>
              </div>

              {/* Table Rows */}
              {productLines.map((line, index) => (
                <div
                  key={line.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '40px 130px 130px 180px 90px 2fr 130px 110px 50px',
                    gap: '12px',
                    padding: '12px 16px',
                    borderBottom: index < productLines.length - 1 ? `1px solid ${themeColors.borderLight}` : 'none',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ fontWeight: 600, color: themeColors.textSecondary }}>{index + 1}</div>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Select placeholder="Select category" style={inputStyle} size="small">
                      <Select.Option value="Photocards">Photocards</Select.Option>
                      <Select.Option value="Boxes">Boxes</Select.Option>
                      <Select.Option value="Slips">Slips</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Select placeholder="Select products" style={inputStyle} size="small">
                      <Select.Option value="ANUSHKA PHOTOCARD">ANUSHKA PHOTOCARD</Select.Option>
                      <Select.Option value="PUFFY PHOTOCARD">PUFFY PHOTOCARD</Select.Option>
                      <Select.Option value="MICHELLE PHOTOCARD">MICHELLE PHOTOCARD</Select.Option>
                      <Select.Option value="TOP - 286 X 199 X 38">TOP - 286 X 199 X 38</Select.Option>
                      <Select.Option value="BTM - 281 X 194 X 45">BTM - 281 X 194 X 45</Select.Option>
                      <Select.Option value="EVELY SLIPS PHOTOCARD">EVELY SLIPS PHOTOCARD</Select.Option>
                      <Select.Option value="XPC - 99 PHOTOCARD">XPC - 99 PHOTOCARD</Select.Option>
                      <Select.Option value="RIYA KIDS PHOTOCARD">RIYA KIDS PHOTOCARD</Select.Option>
                      <Select.Option value="AALIA & ANUSHKA SLIPS">AALIA & ANUSHKA SLIPS</Select.Option>
                      <Select.Option value="PUFFY & KURTHA BOX">PUFFY & KURTHA BOX</Select.Option>
                    </Select>
                  </Form.Item>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px' }}>
                    <InputNumber placeholder="L" style={{ ...inputStyle, width: '100%' }} min={0} controls size="small" />
                    <InputNumber placeholder="W" style={{ ...inputStyle, width: '100%' }} min={0} controls size="small" />
                    <InputNumber placeholder="H" style={{ ...inputStyle, width: '100%' }} min={0} controls size="small" />
                  </div>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <InputNumber placeholder="Quantity" style={{ ...inputStyle, width: '100%' }} min={0} size="small" />
                  </Form.Item>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Input placeholder="Description" style={inputStyle} size="small" />
                  </Form.Item>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <DatePicker placeholder="Select date" style={{ ...inputStyle, width: '100%' }} format="DD/MM/YYYY" size="small" />
                  </Form.Item>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Upload
                      maxCount={1}
                      beforeUpload={() => false}
                      showUploadList={false}
                    >
                      <Button
                        icon={<UploadOutlined />}
                        size="small"
                        style={{
                          width: '100%',
                          fontSize: '12px',
                          height: '32px',
                          borderRadius: '6px'
                        }}
                      >
                        Upload
                      </Button>
                    </Upload>
                  </Form.Item>
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined size={16} />}
                    onClick={() => removeProductLine(line.id)}
                    disabled={productLines.length === 1}
                    size="small"
                  />
                </div>
              ))}
            </div>

            {/* Add Line Item Button */}
            <div style={{ marginTop: '12px', marginBottom: '16px' }}>
              <Button
                type="primary"
                icon={<PlusOutlined size={16} />}
                onClick={addProductLine}
                style={{ background: themeColors.primary, borderColor: themeColors.primary, height: '36px', borderRadius: '50px', ...typography.bodySmall }}
              >
                Add Line Item
              </Button>
            </div>

            {/* Common Notes Section */}
            <div style={{ marginTop: '16px' }}>
              <Form.Item label="Notes / Description" style={{ marginBottom: 0 }}>
                <Input.TextArea
                  placeholder="Enter common notes or description for all products..."
                  rows={4}
                  style={{
                    border: `1px solid ${themeColors.border}`,
                    borderRadius: '8px',
                  }}
                />
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </Drawer>
    </>
  );
};

export default AddEnquiryDrawer;
