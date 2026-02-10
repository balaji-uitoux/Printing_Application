import { Drawer, Form, Input, Select, InputNumber, Button, Divider } from 'antd';
import { EyeOutlined, DownloadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { typography } from '../../theme/typography';
import { themeColors } from '../../theme/themeConfig';

interface CreateQuotationDrawerProps {
  open: boolean;
  onClose: () => void;
  enquiryData?: any;
}

interface QuotationLine {
  id: string;
  description: string;
  quantity: number;
  board: string;
  gsm: number;
  rate: number;
  amount: number;
}

const CreateQuotationDrawer = ({ open, onClose, enquiryData }: CreateQuotationDrawerProps) => {
  const [form] = Form.useForm();
  const [quotationLines, setQuotationLines] = useState<QuotationLine[]>([
    {
      id: '1',
      description: '',
      quantity: 0,
      board: '',
      gsm: 0,
      rate: 0,
      amount: 0,
    },
  ]);

  // Pre-fill form when enquiryData is provided
  useEffect(() => {
    if (enquiryData && open) {
      form.setFieldsValue({
        customerName: enquiryData.customerName,
        email: '',
        phone: '',
        productType: enquiryData.productType,
        totalQuantity: enquiryData.quantity,
        description: '',
      });

      setQuotationLines([
        {
          id: '1',
          description: enquiryData.productType || '',
          quantity: enquiryData.quantity || 0,
          board: '',
          gsm: 0,
          rate: 0,
          amount: 0,
        },
      ]);
    }
  }, [enquiryData, open, form]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      console.log('Form values:', values);
      console.log('Quotation lines:', quotationLines);
      onClose();
    });
  };

  const calculateSubtotal = () => {
    return quotationLines.reduce((sum, line) => sum + line.amount, 0);
  };

  const calculateTax = () => {
    const subtotal = calculateSubtotal();
    const taxRate = form.getFieldValue('taxRate') || 18;
    return (subtotal * taxRate) / 100;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const inputStyle = {
    height: '40px',
    border: `1px solid ${themeColors.border}`,
    borderRadius: '8px',
  };

  return (
    <Drawer
      title={null}
      placement="right"
      width="95%"
      onClose={onClose}
      open={open}
      closable={false}
      styles={{
        body: {
          padding: 0,
          background: '#F8FAFC',
        },
      }}
    >
      {/* Custom Header */}
      <div
        style={{
          background: '#FFFFFF',
          padding: '20px 32px',
          borderBottom: `1px solid ${themeColors.borderLight}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={onClose}
            style={{
              fontSize: '20px',
              color: themeColors.text,
              width: '40px',
              height: '40px',
            }}
          />
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: '24px',
                fontWeight: 700,
                color: themeColors.text,
              }}
            >
              New Quotation
            </h2>
            <p style={{ margin: 0, fontSize: '14px', color: themeColors.textSecondary }}>
              Create a new quotation for your client
            </p>
          </div>
        </div>
      </div>

      {/* Split Screen Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '50% 50%', height: 'calc(100vh - 81px)' }}>
        {/* Left Side - Form */}
        <div style={{ overflowY: 'auto', padding: '24px 32px' }}>
          <Form form={form} layout="vertical">
            {/* Client Information */}
            <div
              style={{
                background: '#FFFFFF',
                padding: '24px',
                borderRadius: '12px',
                marginBottom: '20px',
                border: `1px solid ${themeColors.borderLight}`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(59, 130, 246, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#3B82F6',
                    fontSize: '18px',
                  }}
                >
                  👤
                </div>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>Client Information</h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <Form.Item
                  label="Client"
                  name="customerName"
                  rules={[{ required: true, message: 'Please enter client name' }]}
                >
                  <Input placeholder="Search and select client" style={inputStyle} />
                </Form.Item>

                <Form.Item label="Contact Person" name="contactPerson">
                  <Input placeholder="Contact person name" style={inputStyle} />
                </Form.Item>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <Form.Item label="Email" name="email">
                  <Input placeholder="Email address" style={inputStyle} />
                </Form.Item>

                <Form.Item label="Phone" name="phone">
                  <Input placeholder="Phone number" style={inputStyle} />
                </Form.Item>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <Form.Item
                  label="Product Type"
                  name="productType"
                  rules={[{ required: true, message: 'Please select product type' }]}
                >
                  <Select placeholder="Select product type" style={inputStyle}>
                    <Select.Option value="business-cards">Business Cards</Select.Option>
                    <Select.Option value="brochures">Brochures</Select.Option>
                    <Select.Option value="packaging">Packaging</Select.Option>
                    <Select.Option value="labels">Labels</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Total Quantity"
                  name="totalQuantity"
                  rules={[{ required: true, message: 'Please enter quantity' }]}
                >
                  <InputNumber
                    placeholder="Quantity"
                    style={{ ...inputStyle, width: '100%' }}
                    min={0}
                  />
                </Form.Item>
              </div>

              <Form.Item
                label="Product Description"
                name="description"
                rules={[{ required: true, message: 'Please enter description' }]}
              >
                <Input.TextArea
                  placeholder="Describe the product requirements..."
                  rows={4}
                  style={{
                    border: `1px solid ${themeColors.border}`,
                    borderRadius: '8px',
                  }}
                />
              </Form.Item>
            </div>

            {/* Pricing Settings */}
            <div
              style={{
                background: '#FFFFFF',
                padding: '24px',
                borderRadius: '12px',
                marginBottom: '20px',
                border: `1px solid ${themeColors.borderLight}`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(16, 185, 129, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#10B981',
                    fontSize: '18px',
                  }}
                >
                  💰
                </div>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>Pricing Settings</h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px' }}>
                <Form.Item label="Currency" name="currency" initialValue="INR">
                  <Select style={inputStyle}>
                    <Select.Option value="INR">INR (₹)</Select.Option>
                    <Select.Option value="USD">USD ($)</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item label="Tax Rate (%)" name="taxRate" initialValue={18}>
                  <InputNumber
                    placeholder="18"
                    style={{ ...inputStyle, width: '100%' }}
                    min={0}
                    max={100}
                  />
                </Form.Item>

                <Form.Item label="Discount Type" name="discountType" initialValue="none">
                  <Select style={inputStyle}>
                    <Select.Option value="none">None</Select.Option>
                    <Select.Option value="percentage">Percentage</Select.Option>
                    <Select.Option value="fixed">Fixed</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item label="Discount Value" name="discountValue" initialValue={0}>
                  <InputNumber
                    placeholder="0"
                    style={{ ...inputStyle, width: '100%' }}
                    min={0}
                  />
                </Form.Item>
              </div>
            </div>

          </Form>
        </div>

        {/* Right Side - Live Preview */}
        <div
          style={{
            background: '#FFFFFF',
            borderLeft: `1px solid ${themeColors.borderLight}`,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Preview Header */}
          <div
            style={{
              padding: '20px 24px',
              borderBottom: `1px solid ${themeColors.borderLight}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <EyeOutlined style={{ fontSize: '18px', color: themeColors.textSecondary }} />
              <span style={{ fontSize: '16px', fontWeight: 600, color: themeColors.text }}>
                Live Preview
              </span>
            </div>
            <Button
              type="text"
              icon={<DownloadOutlined />}
              style={{ color: themeColors.textSecondary }}
            >
              Download PDF
            </Button>
          </div>

          {/* Preview Content */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
            <div
              style={{
                background: '#FFFFFF',
                border: `1px solid ${themeColors.borderLight}`,
                borderRadius: '8px',
                padding: '32px',
              }}
            >
              {/* Company Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      fontSize: '24px',
                    }}
                  >
                    🖨️
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 700 }}>PRINTING PRESS</h3>
                    <p style={{ margin: 0, fontSize: '12px', color: themeColors.textSecondary }}>
                      Industrial Area
                    </p>
                    <p style={{ margin: 0, fontSize: '12px', color: themeColors.textSecondary }}>
                      Chennai, Tamil Nadu 600001
                    </p>
                    <p style={{ margin: 0, fontSize: '12px', color: themeColors.textSecondary }}>
                      info@printingpress.com
                    </p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: themeColors.textSecondary,
                      marginBottom: '4px',
                    }}
                  >
                    QUOTATION
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: themeColors.text }}>
                    QUO-2026-AUTO
                  </div>
                  <div style={{ fontSize: '12px', color: themeColors.textSecondary, marginTop: '4px' }}>
                    Date: {new Date().toLocaleDateString()}
                  </div>
                  <div style={{ fontSize: '12px', color: themeColors.textSecondary }}>
                    Valid Until: {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Bill To */}
              <div style={{ marginBottom: '32px' }}>
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: themeColors.textSecondary,
                    marginBottom: '8px',
                  }}
                >
                  BILL TO
                </div>
                <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>
                  {form.getFieldValue('customerName') || 'Client Name'}
                </div>
                <div style={{ fontSize: '14px', color: themeColors.textSecondary }}>
                  {form.getFieldValue('email') || 'client@email.com'}
                </div>
                <div style={{ fontSize: '14px', color: themeColors.textSecondary }}>
                  {form.getFieldValue('phone') || '+91 00000 00000'}
                </div>
              </div>

              <Divider style={{ margin: '24px 0' }} />

              {/* Items Table */}
              <div style={{ marginBottom: '24px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: `2px solid ${themeColors.borderLight}` }}>
                      <th
                        style={{
                          textAlign: 'left',
                          padding: '12px 8px',
                          fontSize: '12px',
                          fontWeight: 600,
                          color: themeColors.textSecondary,
                        }}
                      >
                        #
                      </th>
                      <th
                        style={{
                          textAlign: 'left',
                          padding: '12px 8px',
                          fontSize: '12px',
                          fontWeight: 600,
                          color: themeColors.textSecondary,
                        }}
                      >
                        DESCRIPTION
                      </th>
                      <th
                        style={{
                          textAlign: 'right',
                          padding: '12px 8px',
                          fontSize: '12px',
                          fontWeight: 600,
                          color: themeColors.textSecondary,
                        }}
                      >
                        QTY
                      </th>
                      <th
                        style={{
                          textAlign: 'right',
                          padding: '12px 8px',
                          fontSize: '12px',
                          fontWeight: 600,
                          color: themeColors.textSecondary,
                        }}
                      >
                        RATE
                      </th>
                      <th
                        style={{
                          textAlign: 'right',
                          padding: '12px 8px',
                          fontSize: '12px',
                          fontWeight: 600,
                          color: themeColors.textSecondary,
                        }}
                      >
                        AMOUNT
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {quotationLines.map((line, index) => (
                      <tr key={line.id} style={{ borderBottom: `1px solid ${themeColors.borderLight}` }}>
                        <td style={{ padding: '12px 8px', fontSize: '14px' }}>{index + 1}</td>
                        <td style={{ padding: '12px 8px', fontSize: '14px' }}>
                          {line.description || 'Select item...'}
                          {line.board && (
                            <div style={{ fontSize: '12px', color: themeColors.textSecondary }}>
                              {line.board} {line.gsm && `- ${line.gsm} GSM`}
                            </div>
                          )}
                        </td>
                        <td style={{ padding: '12px 8px', fontSize: '14px', textAlign: 'right' }}>
                          {line.quantity}
                        </td>
                        <td style={{ padding: '12px 8px', fontSize: '14px', textAlign: 'right' }}>
                          ₹{line.rate.toFixed(2)}
                        </td>
                        <td style={{ padding: '12px 8px', fontSize: '14px', textAlign: 'right' }}>
                          ₹{line.amount.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
                <div style={{ width: '250px' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '8px 0',
                      fontSize: '14px',
                    }}
                  >
                    <span style={{ color: themeColors.textSecondary }}>Subtotal</span>
                    <span style={{ fontWeight: 600 }}>₹{calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '8px 0',
                      fontSize: '14px',
                    }}
                  >
                    <span style={{ color: themeColors.textSecondary }}>
                      Tax ({form.getFieldValue('taxRate') || 18}%)
                    </span>
                    <span style={{ fontWeight: 600 }}>₹{calculateTax().toFixed(2)}</span>
                  </div>
                  <Divider style={{ margin: '12px 0' }} />
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '8px 0',
                      fontSize: '18px',
                      fontWeight: 700,
                      color: '#10B981',
                    }}
                  >
                    <span>Total</span>
                    <span>₹{calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Divider style={{ margin: '32px 0' }} />

              <div style={{ textAlign: 'center', color: themeColors.textSecondary, fontSize: '14px' }}>
                <p style={{ margin: 0, fontWeight: 600 }}>Thank you for your business!</p>
                <p style={{ margin: '4px 0 0 0', fontSize: '12px' }}>
                  This is a computer-generated quotation.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div
            style={{
              padding: '20px 24px',
              borderTop: `1px solid ${themeColors.borderLight}`,
              display: 'flex',
              gap: '12px',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              onClick={onClose}
              style={{
                height: '40px',
                borderRadius: '8px',
                ...typography.body,
                borderColor: themeColors.text,
                color: themeColors.text,
              }}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={handleSubmit}
              style={{
                background: '#3B82F6',
                borderColor: '#3B82F6',
                height: '40px',
                borderRadius: '8px',
                ...typography.body,
              }}
            >
              Create Quotation
            </Button>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default CreateQuotationDrawer;
