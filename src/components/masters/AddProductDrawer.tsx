import React from 'react';
import { Drawer, Form, Select, Input, Button, Checkbox } from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { themeColors } from '../../theme/themeConfig';
import { typography } from '../../theme/typography';

interface AddProductDrawerProps {
  open: boolean;
  onClose: () => void;
}

const mockClients = [
  { label: 'Digsel', value: 'Digsel' },
  { label: 'Acme Corporation', value: 'Acme Corporation' },
  { label: 'Tech Solutions Pvt Ltd', value: 'Tech Solutions Pvt Ltd' },
  { label: 'Green Earth Industries', value: 'Green Earth Industries' },
  { label: 'Urban Designs Studio', value: 'Urban Designs Studio' },
];

const mockCategories = [
  { label: 'Photocards', value: 'Photocards' },
  { label: 'Boxes', value: 'Boxes' },
  { label: 'Slips', value: 'Slips' },
];

const mockProducts = [
  { label: 'AALIA & ANUSHKA SLIPS', value: 'PRD-001' },
  { label: 'PUFFY & KURTHA BOX', value: 'PRD-002' },
  { label: 'DEEPIKA & MICHELLE SLIPS', value: 'PRD-003' },
  { label: 'EVELY SLIPS 6pcs BOX', value: 'PRD-004' },
  { label: 'XPC - 99 BOX', value: 'PRD-005' },
  { label: 'RIYA KIDS PANTIES PHOTOCARD', value: 'PRD-006' },
  { label: 'ANUSHKA PHOTOCARD', value: 'PRD-007' },
  { label: 'PUFFY PHOTOCARD', value: 'PRD-008' },
  { label: 'MICHELLE PHOTOCARD', value: 'PRD-009' },
  { label: 'TOP - 286 X 199 X 38', value: 'PRD-010' },
  { label: 'BTM - 281 X 194 X 45', value: 'PRD-011' },
];

const AddProductDrawer: React.FC<AddProductDrawerProps> = ({ open, onClose }) => {
  const [form] = Form.useForm();
  const [isGrouped, setIsGrouped] = React.useState(false);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      console.log('Form values:', values);
      onClose();
    });
  };

  const inputStyle = {
    height: '40px',
    border: `1px solid ${themeColors.border}`,
    borderRadius: '8px',
  };

  return (
    <Drawer
      title={
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h2 style={{
            margin: 0,
            fontSize: '24px',
            fontWeight: 700,
            color: themeColors.text,
          }}>
            Add Product
          </h2>
          <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={onClose}
            style={{
              fontSize: '16px',
              color: themeColors.textSecondary,
              width: '32px',
              height: '32px',
            }}
          />
        </div>
      }
      placement="right"
      width={900}
      onClose={onClose}
      open={open}
      closable={false}
      styles={{
        body: {
          padding: '24px',
          background: 'rgba(232, 237, 242, 0.4)',
          backdropFilter: 'blur(40px)',
        },
        header: {
          background: '#FFFFFF',
          borderBottom: '1px solid rgba(226, 232, 240, 0.4)',
          padding: '20px 24px',
        },
      }}
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', padding: '16px 24px' }}>
          <Button
            onClick={onClose}
            style={{
              height: '40px',
              borderRadius: '50px',
              ...typography.body,
              borderColor: themeColors.text,
              color: themeColors.text
            }}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={handleSubmit}
            icon={<PlusOutlined />}
            style={{
              background: themeColors.text,
              borderColor: themeColors.text,
              height: '40px',
              borderRadius: '50px',
              ...typography.body
            }}
          >
            Add Product
          </Button>
        </div>
      }
    >
      <Form form={form} layout="vertical">
        {/* Row 1: Client/Customer, Product Name, Category */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
          <Form.Item
            label="Client/Customer"
            name="client"
            rules={[{ required: true, message: 'Please select a client' }]}
          >
            <Select
              showSearch
              placeholder="Select client"
              style={inputStyle}
              options={mockClients}
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>

          <Form.Item
            label="Product Name"
            name="name"
            rules={[{ required: true, message: 'Please enter product name' }]}
          >
            <Input placeholder="Product name" style={inputStyle} />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: 'Please select category' }]}
          >
            <Select
              placeholder="Select category"
              style={inputStyle}
              options={mockCategories}
            />
          </Form.Item>
        </div>

        {/* Row 2: Group this product with checkbox */}
        <Form.Item
          name="isGrouped"
          valuePropName="checked"
          style={{ marginBottom: '16px' }}
        >
          <Checkbox
            onChange={(e) => setIsGrouped(e.target.checked)}
            style={{ fontSize: '14px', fontWeight: 500 }}
          >
            Group this product                                           with
          </Checkbox>
        </Form.Item>

        {/* Row 3: Group Product dropdown (conditional) */}
        {isGrouped && (
          <Form.Item
            label="Group Product"
            name="groupProduct"
            rules={[{ required: isGrouped, message: 'Please select group products' }]}
          >
            <Select
              mode="multiple"
              showSearch
              placeholder="Select products to group with"
              style={inputStyle}
              options={mockProducts}
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
        )}

        {/* Description - Full Width */}
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please enter description' }]}
        >
          <Input.TextArea
            placeholder="Enter product description..."
            rows={4}
            style={{
              border: `1px solid ${themeColors.border}`,
              borderRadius: '8px',
            }}
          />
        </Form.Item>

        {/* Status */}
        <Form.Item
          label="Status"
          name="status"
          initialValue="Active"
          rules={[{ required: true }]}
        >
          <Select
            style={inputStyle}
            options={[
              { label: 'Active', value: 'Active' },
              { label: 'Inactive', value: 'Inactive' },
            ]}
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default AddProductDrawer;
