import { Modal, Form, Button, InputNumber, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { typography } from '../../theme/typography';
import { themeColors } from '../../theme/themeConfig';

interface AddPrintingDrawerProps {
  open: boolean;
  onClose: () => void;
}

const AddPrintingDrawer = ({ open, onClose }: AddPrintingDrawerProps) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      console.log('Form values:', values);
      onClose();
    });
  };

  const inputStyle = {
    height: '48px',
    border: `1px solid ${themeColors.border}`,
    borderRadius: '8px',
    fontSize: '14px',
  };

  return (
    <Modal
      title={
        <div style={{
          fontSize: '24px',
          fontWeight: 700,
          color: themeColors.text,
        }}>
          Add Printing
        </div>
      }
      open={open}
      onCancel={onClose}
      closable={true}
      width={600}
      centered
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '16px' }}>
          <Button
            onClick={onClose}
            style={{
              height: '40px',
              borderRadius: '50px',
              ...typography.body,
              borderColor: themeColors.text,
              color: themeColors.text,
              paddingLeft: '24px',
              paddingRight: '24px',
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
              ...typography.body,
              paddingLeft: '24px',
              paddingRight: '24px',
            }}
          >
            Add Printing
          </Button>
        </div>
      }
      styles={{
        body: {
          paddingTop: '24px',
        },
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label={<span style={{ fontSize: '14px', fontWeight: 600, color: themeColors.text }}>Printing Name</span>}
          name="name"
          rules={[{ required: true, message: 'Please enter printing name' }]}
        >
          <Input
            placeholder="Enter printing name"
            style={inputStyle}
          />
        </Form.Item>

        <Form.Item
          label={<span style={{ fontSize: '14px', fontWeight: 600, color: themeColors.text }}>Minimum Quantity</span>}
          name="minimumQuantity"
          rules={[{ required: true, message: 'Please enter minimum quantity' }]}
        >
          <InputNumber
            placeholder="100"
            style={{ ...inputStyle, width: '100%' }}
            min={1}
          />
        </Form.Item>

        <Form.Item
          label={<span style={{ fontSize: '14px', fontWeight: 600, color: themeColors.text }}>1st Set Price (₹)</span>}
          name="firstSetPrice"
          rules={[{ required: true, message: 'Please enter 1st set price' }]}
        >
          <InputNumber
            placeholder="500"
            style={{ ...inputStyle, width: '100%' }}
            min={0}
            precision={2}
            prefix="₹"
          />
        </Form.Item>

        <Form.Item
          label={<span style={{ fontSize: '14px', fontWeight: 600, color: themeColors.text }}>Extra Copy Price (₹)</span>}
          name="extraCopyPrice"
          rules={[{ required: true, message: 'Please enter extra copy price' }]}
        >
          <InputNumber
            placeholder="5"
            style={{ ...inputStyle, width: '100%' }}
            min={0}
            precision={2}
            prefix="₹"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddPrintingDrawer;
