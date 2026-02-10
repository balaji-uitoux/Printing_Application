import { Drawer, Form, Select, Button, InputNumber } from 'antd';
import { PlusOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { typography } from '../../theme/typography';
import { themeColors } from '../../theme/themeConfig';

interface AddLaminationDrawerProps {
  open: boolean;
  onClose: () => void;
}

interface LaminationEntry {
  id: string;
}

const LAMINATION_TYPES = [
  { value: 'Glossy', label: 'Glossy' },
  { value: 'Matte', label: 'Matte' },
  { value: 'UV', label: 'UV' },
];

const AddLaminationDrawer = ({ open, onClose }: AddLaminationDrawerProps) => {
  const [form] = Form.useForm();
  const [laminations, setLaminations] = useState<LaminationEntry[]>([{ id: '1' }]);

  const addLamination = () => {
    setLaminations([...laminations, { id: Date.now().toString() }]);
  };

  const removeLamination = (id: string) => {
    if (laminations.length > 1) {
      setLaminations(laminations.filter((lamination) => lamination.id !== id));
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
            Add Lamination
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
          padding: '16px 24px',
          background: 'rgba(232, 237, 242, 0.4)',
          backdropFilter: 'blur(40px)',
        },
        header: {
          background: '#FFFFFF',
          borderBottom: '1px solid rgba(226, 232, 240, 0.4)',
          padding: '16px 24px',
        },
      }}
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
            Add Lamination
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
          {/* Lamination Section */}
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ margin: 0, marginBottom: '16px', ...typography.body, fontWeight: 600, fontSize: '16px' }}>
              Lamination
            </h3>

            {/* Lamination Table */}
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
                  gridTemplateColumns: '40px 1fr 200px 50px',
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
                <div>Lamination Type</div>
                <div>Price (₹)</div>
                <div></div>
              </div>

              {/* Table Rows */}
              {laminations.map((lamination, index) => (
                <div
                  key={lamination.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '40px 1fr 200px 50px',
                    gap: '12px',
                    padding: '12px 16px',
                    borderBottom: index < laminations.length - 1 ? `1px solid ${themeColors.borderLight}` : 'none',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ fontWeight: 600, color: themeColors.textSecondary }}>{index + 1}</div>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Select
                      placeholder="Select lamination type"
                      style={inputStyle}
                      size="small"
                      options={LAMINATION_TYPES}
                    />
                  </Form.Item>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <InputNumber
                      placeholder="250"
                      style={{ ...inputStyle, width: '100%' }}
                      min={0}
                      size="small"
                    />
                  </Form.Item>
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => removeLamination(lamination.id)}
                    disabled={laminations.length === 1}
                    size="small"
                  />
                </div>
              ))}
            </div>

            {/* Add Lamination Button */}
            <div style={{ marginTop: '12px' }}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={addLamination}
                style={{
                  background: themeColors.primary,
                  borderColor: themeColors.primary,
                  height: '36px',
                  borderRadius: '50px',
                  ...typography.bodySmall
                }}
              >
                Add Lamination
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </Drawer>
  );
};

export default AddLaminationDrawer;
