import { Modal, Form, Button, InputNumber } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { typography } from '../../theme/typography';
import { themeColors } from '../../theme/themeConfig';

interface AddGSTModalProps {
  open: boolean;
  onClose: () => void;
}

const AddGSTModal = ({ open, onClose }: AddGSTModalProps) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      console.log('Form values:', values);
      form.resetFields();
      onClose();
    });
  };

  const inputStyle = {
    height: '40px',
    border: `1px solid ${themeColors.border}`,
    borderRadius: '8px',
  };

  return (
    <Modal
      title={
        <h2 style={{
          margin: 0,
          fontSize: '20px',
          fontWeight: 600,
          color: themeColors.text,
        }}>
          Add GST
        </h2>
      }
      open={open}
      onCancel={onClose}
      width={500}
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
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
            Add GST
          </Button>
        </div>
      }
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="IGST (%)"
          name="igst"
          rules={[{ required: true, message: 'Please enter IGST' }]}
        >
          <InputNumber
            placeholder="Enter IGST percentage"
            style={{ ...inputStyle, width: '100%' }}
            min={0}
            max={100}
            precision={2}
          />
        </Form.Item>

        <Form.Item
          label="SGST (%)"
          name="sgst"
          rules={[{ required: true, message: 'Please enter SGST' }]}
        >
          <InputNumber
            placeholder="Enter SGST percentage"
            style={{ ...inputStyle, width: '100%' }}
            min={0}
            max={100}
            precision={2}
          />
        </Form.Item>

        <Form.Item
          label="CGST (%)"
          name="cgst"
          rules={[{ required: true, message: 'Please enter CGST' }]}
        >
          <InputNumber
            placeholder="Enter CGST percentage"
            style={{ ...inputStyle, width: '100%' }}
            min={0}
            max={100}
            precision={2}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddGSTModal;
