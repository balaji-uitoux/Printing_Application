import { Card, Select, InputNumber, Switch } from 'antd';
import { DeleteOutlined, HolderOutlined } from '@ant-design/icons';
import { themeColors } from '../../theme/themeConfig';
import type {
  ProcessCard,
  CoatingType,
  PrintingData,
  UVPlatingData,
  LaminationData,
  DieData,
  VarnishData,
  UVPlateData,
  FluteData,
  PastingData,
} from '../../types/quotation';
import {
  isPrintingData,
  isUVPlatingData,
  isLaminationData,
  isDieData,
  isVarnishData,
  isUVPlateData,
  isFluteData,
  isPastingData,
} from '../../types/quotation';

interface CoatingProcessCardProps {
  processCard: ProcessCard;
  orderNumber: number;
  totalQty?: number;
  allProcessCards?: ProcessCard[];
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
  'UV Plate': {
    border: '#A78BFA',
    bg: 'rgba(167, 139, 250, 0.08)',
  },
  Varnish: {
    border: '#F472B6',
    bg: 'rgba(244, 114, 182, 0.08)',
  },
  Lamination: {
    border: '#34D399',
    bg: 'rgba(52, 211, 153, 0.08)',
  },
  Flute: {
    border: '#FB923C',
    bg: 'rgba(251, 146, 60, 0.08)',
  },
  Die: {
    border: '#FBBF24',
    bg: 'rgba(251, 191, 36, 0.08)',
  },
  'Single Window Pasting': {
    border: '#8B5CF6',
    bg: 'rgba(139, 92, 246, 0.08)',
  },
  'Single Side/4 Corner Pasting': {
    border: '#EC4899',
    bg: 'rgba(236, 72, 153, 0.08)',
  },
  'B2B Pasting': {
    border: '#F59E0B',
    bg: 'rgba(245, 158, 11, 0.08)',
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
  totalQty: _totalQty,
  allProcessCards = [],
  onUpdate,
  onRemove,
  dragHandleProps,
}) => {
  const { type, data, id } = processCard;
  const colors = PROCESS_COLORS[type];

  const handleFieldChange = (field: string, value: any) => {
    onUpdate(id, { [field]: value });
  };

  // Render Printing fields - Print Rate with Backside toggle
  const renderPrintingFields = (data: PrintingData) => {
    const totalPrintRate = data.backside === 'Yes' ? data.ratePer1000 * 2 : data.ratePer1000;

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.6fr 1fr', gap: '12px', alignItems: 'end' }}>
        <div>
          <div style={{ fontSize: '13px', marginBottom: '6px', color: themeColors.textSecondary }}>Print Rate</div>
          <InputNumber
            value={data.ratePer1000}
            onChange={(value) => {
              handleFieldChange('ratePer1000', value || 0);
              const newTotal = data.backside === 'Yes' ? (value || 0) * 2 : (value || 0);
              handleFieldChange('totalPrintRate', newTotal);
            }}
            style={{ ...inputStyle, width: '100%' }}
            size="small"
            min={0}
            prefix="₹"
            placeholder="0"
          />
        </div>

        <div>
          <div style={{ fontSize: '13px', marginBottom: '6px', color: themeColors.textSecondary }}>Backside</div>
          <div style={{ display: 'flex', alignItems: 'center', height: '32px' }}>
            <Switch
              checked={data.backside === 'Yes'}
              onChange={(checked) => {
                const value = checked ? 'Yes' : 'No';
                handleFieldChange('backside', value);
                const newTotal = checked ? data.ratePer1000 * 2 : data.ratePer1000;
                handleFieldChange('totalPrintRate', newTotal);
              }}
              size="small"
              style={{ marginRight: '8px' }}
            />
            <span style={{ fontSize: '13px', color: data.backside === 'Yes' ? themeColors.text : themeColors.textSecondary }}>
              {data.backside === 'Yes' ? 'Yes' : 'No'}
            </span>
          </div>
        </div>

        <div>
          <div style={{ fontSize: '13px', marginBottom: '6px', color: themeColors.textSecondary }}>Total Print Rate</div>
          <div style={{ ...inputStyle, display: 'flex', alignItems: 'center', background: 'rgba(96, 165, 250, 0.05)', border: '1px solid rgba(96, 165, 250, 0.2)', padding: '0 11px', fontWeight: 600, color: '#60A5FA', fontSize: '13px' }}>
            ₹{totalPrintRate.toFixed(2)}
          </div>
        </div>
      </div>
    );
  };

  // Render UV Plating fields - kept for backward compatibility (inline with label)
  const renderUVPlatingFields = (data: UVPlatingData) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <span style={{ fontSize: '13px', fontWeight: 500, color: themeColors.textSecondary, minWidth: '100px' }}>UV Rate</span>
      <InputNumber
        value={data.ratePer1000}
        onChange={(value) => handleFieldChange('ratePer1000', value || 0)}
        style={{ ...inputStyle, width: '100%', maxWidth: '350px' }}
        size="small"
        min={0}
        prefix="₹"
        placeholder="0"
      />
    </div>
  );

  // Render Lamination fields - Lamination Type, Lamination Rate, Backside, Total Rate
  const renderLaminationFields = (data: LaminationData) => {
    const totalLaminationRate = data.backside === 'Yes' ? data.ratePer1000 * 2 : data.ratePer1000;

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 0.6fr 1fr', gap: '12px', alignItems: 'end' }}>
        <div>
          <div style={{ fontSize: '13px', marginBottom: '6px', color: themeColors.textSecondary }}>Lamination Type</div>
          <Select
            value={data.laminationType}
            onChange={(value) => handleFieldChange('laminationType', value)}
            style={inputStyle}
            size="small"
          >
            <Select.Option value="Glossy">Glossy</Select.Option>
            <Select.Option value="Matte">Matte</Select.Option>
            <Select.Option value="UV">UV</Select.Option>
          </Select>
        </div>

        <div>
          <div style={{ fontSize: '13px', marginBottom: '6px', color: themeColors.textSecondary }}>Lamination Rate</div>
          <InputNumber
            value={data.ratePer1000}
            onChange={(value) => {
              handleFieldChange('ratePer1000', value || 0);
              const newTotal = data.backside === 'Yes' ? (value || 0) * 2 : (value || 0);
              handleFieldChange('totalLaminationRate', newTotal);
            }}
            style={{ ...inputStyle, width: '100%' }}
            size="small"
            min={0}
            prefix="₹"
            placeholder="0"
          />
        </div>

        <div>
          <div style={{ fontSize: '13px', marginBottom: '6px', color: themeColors.textSecondary }}>Backside</div>
          <div style={{ display: 'flex', alignItems: 'center', height: '32px' }}>
            <Switch
              checked={data.backside === 'Yes'}
              onChange={(checked) => {
                const value = checked ? 'Yes' : 'No';
                handleFieldChange('backside', value);
                const newTotal = checked ? data.ratePer1000 * 2 : data.ratePer1000;
                handleFieldChange('totalLaminationRate', newTotal);
              }}
              size="small"
              style={{ marginRight: '8px' }}
            />
            <span style={{ fontSize: '13px', color: data.backside === 'Yes' ? themeColors.text : themeColors.textSecondary }}>
              {data.backside === 'Yes' ? 'Yes' : 'No'}
            </span>
          </div>
        </div>

        <div>
          <div style={{ fontSize: '13px', marginBottom: '6px', color: themeColors.textSecondary }}>Total Lamination Rate</div>
          <div style={{ ...inputStyle, display: 'flex', alignItems: 'center', background: 'rgba(52, 211, 153, 0.05)', border: '1px solid rgba(52, 211, 153, 0.2)', padding: '0 11px', fontWeight: 600, color: '#10B981', fontSize: '13px' }}>
            ₹{totalLaminationRate.toFixed(2)}
          </div>
        </div>
      </div>
    );
  };

  // Render Die fields - All in single row (3 fields)
  const renderDieFields = (data: DieData) => {
    const totalDieRate = data.dieCharge + data.dieCutRatePer1000;

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', alignItems: 'end' }}>
        <div>
          <div style={{ fontSize: '13px', marginBottom: '6px', color: themeColors.textSecondary }}>Die Rate</div>
          <InputNumber
            value={data.dieCharge}
            onChange={(value) => handleFieldChange('dieCharge', value || 0)}
            style={{ ...inputStyle, width: '100%' }}
            size="small"
            min={0}
            prefix="₹"
            placeholder="0"
          />
        </div>

        <div>
          <div style={{ fontSize: '13px', marginBottom: '6px', color: themeColors.textSecondary }}>Single Die Cut Rate</div>
          <InputNumber
            value={data.dieCutRatePer1000}
            onChange={(value) => handleFieldChange('dieCutRatePer1000', value || 0)}
            style={{ ...inputStyle, width: '100%' }}
            size="small"
            min={0}
            prefix="₹"
            placeholder="0"
          />
        </div>

        <div>
          <div style={{ fontSize: '13px', marginBottom: '6px', color: themeColors.textSecondary }}>Total Die Rate</div>
          <div style={{ ...inputStyle, display: 'flex', alignItems: 'center', background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.2)', padding: '0 11px', fontWeight: 600, color: '#F59E0B', fontSize: '13px' }}>
            ₹{totalDieRate.toFixed(2)}
          </div>
        </div>
      </div>
    );
  };

  // Render Varnish fields - Single field inline
  const renderVarnishFields = (data: VarnishData) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <span style={{ fontSize: '13px', fontWeight: 500, color: themeColors.textSecondary, minWidth: '100px' }}>Varnish Rate</span>
      <InputNumber
        value={data.ratePer1000}
        onChange={(value) => handleFieldChange('ratePer1000', value || 0)}
        style={{ ...inputStyle, width: '100%', maxWidth: '350px' }}
        size="small"
        min={0}
        prefix="₹"
        placeholder="0"
      />
    </div>
  );

  // Render UV Plate fields - Single field inline
  const renderUVPlateFields = (data: UVPlateData) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <span style={{ fontSize: '13px', fontWeight: 500, color: themeColors.textSecondary, minWidth: '100px' }}>UV Rate</span>
      <InputNumber
        value={data.ratePer1000}
        onChange={(value) => handleFieldChange('ratePer1000', value || 0)}
        style={{ ...inputStyle, width: '100%', maxWidth: '350px' }}
        size="small"
        min={0}
        prefix="₹"
        placeholder="0"
      />
    </div>
  );

  // Render Flute fields - GSM fields, Single Flute Rate, and Total Flute Rate
  const renderFluteFields = (data: FluteData) => {
    const totalFluteRate = (data.gsm1Rate || 0) + (data.gsm2Rate || 0) + (data.ratePer1000 || 0);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Row 1: GSM 1, GSM 1 Rate, GSM 2, GSM 2 Rate, Single Flute Rate, Total Flute Rate */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr', gap: '12px', alignItems: 'end' }}>
          <div>
            <div style={{ fontSize: '13px', marginBottom: '6px', color: themeColors.textSecondary }}>GSM 1</div>
            <InputNumber
              value={data.gsm1}
              onChange={(value) => handleFieldChange('gsm1', value || 0)}
              style={{ ...inputStyle, width: '100%' }}
              size="small"
              min={0}
              placeholder="0"
            />
          </div>

          <div>
            <div style={{ fontSize: '13px', marginBottom: '6px', color: themeColors.textSecondary }}>GSM 1 Rate</div>
            <InputNumber
              value={data.gsm1Rate}
              onChange={(value) => {
                handleFieldChange('gsm1Rate', value || 0);
                const newTotal = (value || 0) + (data.gsm2Rate || 0) + (data.ratePer1000 || 0);
                handleFieldChange('totalFluteRate', newTotal);
              }}
              style={{ ...inputStyle, width: '100%' }}
              size="small"
              min={0}
              prefix="₹"
              placeholder="0"
            />
          </div>

          <div>
            <div style={{ fontSize: '13px', marginBottom: '6px', color: themeColors.textSecondary }}>GSM 2</div>
            <InputNumber
              value={data.gsm2}
              onChange={(value) => handleFieldChange('gsm2', value || 0)}
              style={{ ...inputStyle, width: '100%' }}
              size="small"
              min={0}
              placeholder="0"
            />
          </div>

          <div>
            <div style={{ fontSize: '13px', marginBottom: '6px', color: themeColors.textSecondary }}>GSM 2 Rate</div>
            <InputNumber
              value={data.gsm2Rate}
              onChange={(value) => {
                handleFieldChange('gsm2Rate', value || 0);
                const newTotal = (data.gsm1Rate || 0) + (value || 0) + (data.ratePer1000 || 0);
                handleFieldChange('totalFluteRate', newTotal);
              }}
              style={{ ...inputStyle, width: '100%' }}
              size="small"
              min={0}
              prefix="₹"
              placeholder="0"
            />
          </div>

          <div>
            <div style={{ fontSize: '13px', marginBottom: '6px', color: themeColors.textSecondary }}>Single Flute Rate</div>
            <InputNumber
              value={data.ratePer1000}
              onChange={(value) => {
                handleFieldChange('ratePer1000', value || 0);
                const newTotal = (data.gsm1Rate || 0) + (data.gsm2Rate || 0) + (value || 0);
                handleFieldChange('totalFluteRate', newTotal);
              }}
              style={{ ...inputStyle, width: '100%' }}
              size="small"
              min={0}
              prefix="₹"
              placeholder="0"
            />
          </div>

          <div>
            <div style={{ fontSize: '13px', marginBottom: '6px', color: themeColors.textSecondary }}>Total Flute Rate</div>
            <div style={{ ...inputStyle, display: 'flex', alignItems: 'center', background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.2)', padding: '0 11px', fontWeight: 600, color: '#F59E0B', fontSize: '13px', height: '32px' }}>
              ₹{totalFluteRate.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render Single Window Pasting fields
  const renderSingleWindowPastingFields = (data: PastingData) => {
    const totalWindowPastingRate = data.singleWindowPastingRate || 0;

    return (
      <div style={{ display: 'flex', gap: '12px', maxWidth: '800px' }}>
        <div style={{ flex: '0 0 350px' }}>
          <div style={{ fontSize: '13px', marginBottom: '6px', color: themeColors.textSecondary }}>Single Window Pasting Rate</div>
          <InputNumber
            value={data.singleWindowPastingRate}
            onChange={(value) => {
              handleFieldChange('singleWindowPastingRate', value || 0);
              handleFieldChange('totalWindowPastingRate', value || 0);
            }}
            style={{ ...inputStyle, width: '100%' }}
            size="small"
            min={0}
            prefix="₹"
            placeholder="0"
          />
        </div>

        <div style={{ flex: '0 0 350px' }}>
          <div style={{ fontSize: '13px', marginBottom: '6px', color: themeColors.textSecondary }}>Total Window Pasting Rate</div>
          <div style={{ ...inputStyle, display: 'flex', alignItems: 'center', background: 'rgba(139, 92, 246, 0.05)', border: '1px solid rgba(139, 92, 246, 0.2)', padding: '0 11px', fontWeight: 600, color: '#8B5CF6', fontSize: '13px', height: '32px' }}>
            ₹{totalWindowPastingRate.toFixed(2)}
          </div>
        </div>
      </div>
    );
  };

  // Render Single Side/4 Corner Pasting fields
  const renderSingleSideCornerPastingFields = (data: PastingData) => {
    const totalPastingRate = data.singleSideCornerPastingRate || 0;

    return (
      <div style={{ display: 'flex', gap: '12px', maxWidth: '800px' }}>
        <div style={{ flex: '0 0 350px' }}>
          <div style={{ fontSize: '13px', marginBottom: '6px', color: themeColors.textSecondary }}>Single Side/4 Corner Pasting Rate</div>
          <InputNumber
            value={data.singleSideCornerPastingRate}
            onChange={(value) => {
              handleFieldChange('singleSideCornerPastingRate', value || 0);
              handleFieldChange('totalPastingRate', value || 0);
            }}
            style={{ ...inputStyle, width: '100%' }}
            size="small"
            min={0}
            prefix="₹"
            placeholder="0"
          />
        </div>

        <div style={{ flex: '0 0 350px' }}>
          <div style={{ fontSize: '13px', marginBottom: '6px', color: themeColors.textSecondary }}>Total Pasting Rate</div>
          <div style={{ ...inputStyle, display: 'flex', alignItems: 'center', background: 'rgba(236, 72, 153, 0.05)', border: '1px solid rgba(236, 72, 153, 0.2)', padding: '0 11px', fontWeight: 600, color: '#EC4899', fontSize: '13px', height: '32px' }}>
            ₹{totalPastingRate.toFixed(2)}
          </div>
        </div>
      </div>
    );
  };

  // Render B2B Pasting fields
  const renderB2BPastingFields = (data: PastingData) => {
    // Calculate total from all pasting cards (Single Window Pasting + Single Side/4 Corner Pasting)
    let calculatedTotal = 0;
    allProcessCards.forEach((card) => {
      if (card.id !== id && isPastingData(card.data)) {
        if (card.type === 'Single Window Pasting') {
          calculatedTotal += (card.data.totalWindowPastingRate || 0);
        } else if (card.type === 'Single Side/4 Corner Pasting') {
          calculatedTotal += (card.data.totalPastingRate || 0);
        }
      }
    });

    const totalPastingRate = calculatedTotal;

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '13px', fontWeight: 500, color: themeColors.textSecondary, minWidth: '100px' }}>B2B Pasting</span>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Switch
            checked={data.b2bPasting === 'Yes'}
            onChange={(checked) => {
              handleFieldChange('b2bPasting', checked ? 'Yes' : 'No');
            }}
            size="small"
            style={{ marginRight: '8px' }}
          />
          <span style={{ fontSize: '13px', color: data.b2bPasting === 'Yes' ? themeColors.text : themeColors.textSecondary }}>
            {data.b2bPasting === 'Yes' ? 'Yes' : 'No'}
          </span>
        </div>
        <div style={{ marginLeft: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '13px', fontWeight: 500, color: themeColors.textSecondary }}>Total Pasting Rate</span>
          <div style={{ ...inputStyle, display: 'flex', alignItems: 'center', background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.2)', padding: '0 11px', fontWeight: 600, color: '#F59E0B', fontSize: '13px', height: '32px', minWidth: '120px' }}>
            ₹{totalPastingRate.toFixed(2)}
          </div>
        </div>
      </div>
    );
  };

  // Check if card has single field (compact layout)
  const isSingleFieldCard = () => {
    // Flute is multi-field
    if (isFluteData(data)) return false;
    // Single-field cards: UV Plating, Varnish, UV Plate
    if (isUVPlatingData(data) || isVarnishData(data) || isUVPlateData(data)) return true;
    // B2B Pasting is single-field (horizontal layout)
    if (isPastingData(data) && type === 'B2B Pasting') return true;
    // Other pasting cards are multi-field
    if (isPastingData(data)) return false;
    return false;
  };

  // Render appropriate fields based on type
  const renderFields = () => {
    // Printing: Multi-field with backside toggle
    if (isPrintingData(data)) {
      return renderPrintingFields(data);
    }
    // UV Plating: Single-field inline (kept for backward compatibility)
    if (isUVPlatingData(data)) {
      return renderUVPlatingFields(data);
    }
    // Lamination: Multi-field with backside toggle
    if (isLaminationData(data)) {
      return renderLaminationFields(data);
    }
    // Die: Multi-field
    if (isDieData(data)) {
      return renderDieFields(data);
    }
    // Varnish: Multi-field with total display (NEW)
    if (isVarnishData(data)) {
      return renderVarnishFields(data);
    }
    // UV Plate: Multi-field with total display (NEW - different from UV Plating)
    if (isUVPlateData(data)) {
      return renderUVPlateFields(data);
    }
    // Flute: Multi-field with total display (NEW)
    if (isFluteData(data)) {
      return renderFluteFields(data);
    }
    // Pasting: Multi-field - render based on type
    if (isPastingData(data)) {
      if (type === 'Single Window Pasting') {
        return renderSingleWindowPastingFields(data);
      } else if (type === 'Single Side/4 Corner Pasting') {
        return renderSingleSideCornerPastingFields(data);
      } else if (type === 'B2B Pasting') {
        return renderB2BPastingFields(data);
      }
    }
    return null;
  };

  const singleField = isSingleFieldCard();

  return (
    <Card
      style={{
        marginBottom: '8px',
        borderRadius: '10px',
        border: `1px solid ${colors.border}`,
        background: colors.bg,
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.04)',
      }}
      styles={{ body: { padding: singleField ? '10px 12px' : '12px' } }}
    >
      {/* Card Header - Single row for simple cards */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: singleField ? 0 : '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
          {/* Drag Handle with 6-dot icon */}
          <div
            {...dragHandleProps}
            style={{
              cursor: 'grab',
              padding: '4px',
              borderRadius: '4px',
              background: 'white',
              border: `1px solid ${colors.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <HolderOutlined style={{ fontSize: '14px', color: colors.border }} />
          </div>

          {/* Process Number Badge */}
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: colors.border,
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 700,
            }}
          >
            {orderNumber}
          </div>

          {/* Process Name */}
          <span style={{ fontSize: '14px', fontWeight: 600, color: themeColors.text, minWidth: '100px' }}>
            {type.toUpperCase()}
          </span>

          {/* Single field cards: show field inline */}
          {singleField && <div style={{ marginLeft: '16px' }}>{renderFields()}</div>}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Remove Button */}
          <div
            onClick={() => onRemove(id)}
            style={{
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '4px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
            }}
          >
            <DeleteOutlined style={{ fontSize: '13px', color: '#EF4444' }} />
          </div>
        </div>
      </div>

      {/* Card Body - Only show for multi-field cards */}
      {!singleField && <div>{renderFields()}</div>}
    </Card>
  );
};
