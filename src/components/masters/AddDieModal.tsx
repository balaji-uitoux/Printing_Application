import { Modal, Form, Button, InputNumber } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { typography } from '../../theme/typography';
import { themeColors } from '../../theme/themeConfig';

interface AddDieModalProps {
  open: boolean;
  onClose: () => void;
}

const AddDieModal = ({ open, onClose }: AddDieModalProps) => {
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
          Add Die Rate
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
            Add Die Rate
          </Button>
        </div>
      }
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Minimum Die Rate (₹)"
          name="minimumDieRate"
          rules={[{ required: true, message: 'Please enter minimum die rate' }]}
        >
          <InputNumber
            placeholder="Enter minimum die rate"
            style={{ ...inputStyle, width: '100%' }}
            min={0}
            precision={2}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddDieModal;
