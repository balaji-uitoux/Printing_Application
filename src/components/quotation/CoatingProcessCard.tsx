import { Card, Select, InputNumber, Form } from 'antd';
import { DeleteOutlined, HolderOutlined } from '@ant-design/icons';
import { themeColors } from '../../theme/themeConfig';
import type {
  ProcessCard,
  CoatingType,
  PrintingData,
  UVPlatingData,
  LaminationData,
  DieData,
} from '../../types/quotation';
import {
  isPrintingData,
  isUVPlatingData,
  isLaminationData,
  isDieData,
} from '../../types/quotation';

interface CoatingProcessCardProps {
  processCard: ProcessCard;
  orderNumber: number;
  totalQty: number;
  onUpdate: (id: string, data: Partial<ProcessCard['data']>) => void;
  onRemove: (id: string) => void;
  dragHandleProps?: any; // Props from drag-and-drop library
}

// Process type colors
const PROCESS_COLORS: Record<CoatingType, { border: string; bg: string }> = {
  Printing: {
    border: '#60A5FA',
    bg: 'rgba(96, 165, 250, 0.08)',
  },
  'UV Plating': {
    border: '#A78BFA',
    bg: 'rgba(167, 139, 250, 0.08)',
  },
  Lamination: {
    border: '#34D399',
    bg: 'rgba(52, 211, 153, 0.08)',
  },
  Die: {
    border: '#FBBF24',
    bg: 'rgba(251, 191, 36, 0.08)',
  },
};

const inputStyle = {
  height: '36px',
  border: `1px solid ${themeColors.border}`,
  borderRadius: '8px',
};

export const CoatingProcessCard: React.FC<CoatingProcessCardProps> = ({
  processCard,
  orderNumber,
  totalQty,
  onUpdate,
  onRemove,
  dragHandleProps,
}) => {
  const { type, data, id } = processCard;
  const colors = PROCESS_COLORS[type];

  const handleFieldChange = (field: string, value: any) => {
    onUpdate(id, { [field]: value });
  };

  // Render Printing fields - All in single row
  const renderPrintingFields = (data: PrintingData) => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
      <Form.Item label="Printing Type" style={{ marginBottom: 0 }}>
        <Select
          value={data.printingType}
          onChange={(value) => handleFieldChange('printingType', value)}
          style={inputStyle}
          size="small"
        >
          <Select.Option value="Offset">Offset</Select.Option>
          <Select.Option value="Digital">Digital</Select.Option>
          <Select.Option value="Screen">Screen</Select.Option>
          <Select.Option value="Flexo">Flexo</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Colors" style={{ marginBottom: 0 }}>
        <Select
          value={data.colors}
          onChange={(value) => handleFieldChange('colors', value)}
          style={inputStyle}
          size="small"
        >
          <Select.Option value="1 Color">1 Color</Select.Option>
          <Select.Option value="2 Colors">2 Colors</Select.Option>
          <Select.Option value="4 Colors CMYK">4 Colors CMYK</Select.Option>
          <Select.Option value="5 Colors">5 Colors</Select.Option>
          <Select.Option value="6 Colors">6 Colors</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Rate per 1000" style={{ marginBottom: 0 }}>
        <InputNumber
          value={data.ratePer1000}
          onChange={(value) => handleFieldChange('ratePer1000', value || 0)}
          style={{ ...inputStyle, width: '100%' }}
          size="small"
          min={0}
          prefix="₹"
          placeholder="0"
        />
      </Form.Item>
    </div>
  );

  // Render UV Plating fields - All in single row
  const renderUVPlatingFields = (data: UVPlatingData) => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
      <Form.Item label="UV Type" style={{ marginBottom: 0 }}>
        <Select
          value={data.uvType}
          onChange={(value) => handleFieldChange('uvType', value)}
          style={inputStyle}
          size="small"
        >
          <Select.Option value="Spot UV">Spot UV</Select.Option>
          <Select.Option value="Full UV">Full UV</Select.Option>
          <Select.Option value="3D UV">3D UV</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Coverage Area" style={{ marginBottom: 0 }}>
        <Select
          value={data.coverageArea}
          onChange={(value) => handleFieldChange('coverageArea', value)}
          style={inputStyle}
          size="small"
        >
          <Select.Option value="25%">25%</Select.Option>
          <Select.Option value="50%">50%</Select.Option>
          <Select.Option value="75%">75%</Select.Option>
          <Select.Option value="100%">100%</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Total UV Rate" style={{ marginBottom: 0 }}>
        <InputNumber
          value={data.ratePer1000}
          onChange={(value) => handleFieldChange('ratePer1000', value || 0)}
          style={{ ...inputStyle, width: '100%' }}
          size="small"
          min={0}
          prefix="₹"
          placeholder="0"
        />
      </Form.Item>
    </div>
  );

  // Render Lamination fields - All in single row
  const renderLaminationFields = (data: LaminationData) => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
      <Form.Item label="Lamination Type" style={{ marginBottom: 0 }}>
        <Select
          value={data.laminationType}
          onChange={(value) => handleFieldChange('laminationType', value)}
          style={inputStyle}
          size="small"
        >
          <Select.Option value="Glossy">Glossy</Select.Option>
          <Select.Option value="Matte">Matte</Select.Option>
          <Select.Option value="Soft Touch">Soft Touch</Select.Option>
          <Select.Option value="Velvet">Velvet</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Thickness" style={{ marginBottom: 0 }}>
        <Select
          value={data.thickness}
          onChange={(value) => handleFieldChange('thickness', value)}
          style={inputStyle}
          size="small"
        >
          <Select.Option value="18 Micron">18 Micron</Select.Option>
          <Select.Option value="25 Micron">25 Micron</Select.Option>
          <Select.Option value="30 Micron">30 Micron</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Single Board Lamination Rate" style={{ marginBottom: 0 }}>
        <InputNumber
          value={data.ratePer1000}
          onChange={(value) => handleFieldChange('ratePer1000', value || 0)}
          style={{ ...inputStyle, width: '100%' }}
          size="small"
          min={0}
          prefix="₹"
          placeholder="0"
        />
      </Form.Item>
    </div>
  );

  // Render Die fields - All in single row (3 fields)
  const renderDieFields = (data: DieData) => {
    const totalDieRate = data.dieCharge + data.dieCutRatePer1000;

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
        <Form.Item label="Die Rate" style={{ marginBottom: 0 }}>
          <InputNumber
            value={data.dieCharge}
            onChange={(value) => handleFieldChange('dieCharge', value || 0)}
            style={{ ...inputStyle, width: '100%' }}
            size="small"
            min={0}
            prefix="₹"
            placeholder="0"
          />
        </Form.Item>

        <Form.Item label="Single Die Cut Rate" style={{ marginBottom: 0 }}>
          <InputNumber
            value={data.dieCutRatePer1000}
            onChange={(value) => handleFieldChange('dieCutRatePer1000', value || 0)}
            style={{ ...inputStyle, width: '100%' }}
            size="small"
            min={0}
            prefix="₹"
            placeholder="0"
          />
        </Form.Item>

        <div>
          <div style={{ fontSize: '12px', marginBottom: '6px', color: themeColors.text }}>Total Die Rate</div>
          <div style={{ ...inputStyle, display: 'flex', alignItems: 'center', background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.2)', padding: '0 11px', fontWeight: 600, color: '#F59E0B', fontSize: '13px' }}>
            ₹{totalDieRate.toFixed(2)}
          </div>
        </div>
      </div>
    );
  };

  // Render appropriate fields based on type
  const renderFields = () => {
    if (isPrintingData(data)) {
      return renderPrintingFields(data);
    } else if (isUVPlatingData(data)) {
      return renderUVPlatingFields(data);
    } else if (isLaminationData(data)) {
      return renderLaminationFields(data);
    } else if (isDieData(data)) {
      return renderDieFields(data);
    }
    return null;
  };

  return (
    <Card
      style={{
        marginBottom: '12px',
        borderRadius: '12px',
        border: `1px solid ${colors.border}`,
        background: colors.bg,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      }}
      styles={{ body: { padding: '12px' } }}
    >
      {/* Card Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
          {/* Drag Handle with 6-dot icon */}
          <div
            {...dragHandleProps}
            style={{
              cursor: 'grab',
              padding: '6px',
              borderRadius: '6px',
              background: 'white',
              border: `1px solid ${colors.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <HolderOutlined style={{ fontSize: '18px', color: colors.border }} />
          </div>

          {/* Process Number Badge */}
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: colors.border,
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '13px',
              fontWeight: 700,
            }}
          >
            {orderNumber}
          </div>

          {/* Process Name */}
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '15px', fontWeight: 600, color: themeColors.text }}>
                {type.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Total Cost Badge */}
          <div
            style={{
              padding: '6px 12px',
              background: colors.bg,
              border: `1px solid ${colors.border}`,
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: 700,
              color: colors.border,
            }}
          >
            ₹{data.totalCost.toFixed(2)}
          </div>
        </div>

        {/* Remove Button */}
        <div
          onClick={() => onRemove(id)}
          style={{
            cursor: 'pointer',
            padding: '6px',
            borderRadius: '6px',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s',
            marginLeft: '8px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
          }}
        >
          <DeleteOutlined style={{ fontSize: '14px', color: '#EF4444' }} />
        </div>
      </div>

      {/* Card Body - Type-specific Fields in Single Row */}
      <div>{renderFields()}</div>
    </Card>
  );
};
