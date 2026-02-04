/**
 * FormField Generic Component
 *
 * Reusable form field component that handles all common input types
 * with consistent styling and validation.
 *
 * Features:
 * - Supports multiple input types (text, email, number, select, textarea, date, time, password)
 * - Automatic validation rules
 * - Consistent styling via centralized constants
 * - Type-safe props
 *
 * Usage:
 * <FormField label="Name" name="name" required placeholder="Enter name" />
 * <FormField label="Email" name="email" type="email" required />
 * <FormField label="Status" name="status" type="select" options={STATUS_OPTIONS} />
 */

import type { ReactNode } from 'react';
import { Form, Input, InputNumber, Select, DatePicker, TimePicker } from 'antd';
import type { Rule } from 'antd/es/form';
import { INPUT_STYLES, TEXTAREA_STYLES } from '../../../styles/constants';
import type { SelectOption } from '../../../types';

const { TextArea } = Input;

export interface FormFieldProps {
  /** Field label */
  label: string;

  /** Field name (used for form value key) */
  name: string;

  /** Whether field is required */
  required?: boolean;

  /** Placeholder text */
  placeholder?: string;

  /** Input type */
  type?: 'text' | 'email' | 'number' | 'select' | 'textarea' | 'date' | 'time' | 'password';

  /** Options for select dropdown */
  options?: SelectOption[];

  /** Custom validation rules */
  rules?: Rule[];

  /** Minimum value for number inputs */
  min?: number;

  /** Maximum value for number inputs */
  max?: number;

  /** Number of rows for textarea */
  rows?: number;

  /** Initial value */
  initialValue?: any;

  /** Whether field is disabled */
  disabled?: boolean;

  /** Tooltip text */
  tooltip?: string;

  /** Prefix icon/text */
  prefix?: ReactNode;

  /** Suffix icon/text */
  suffix?: ReactNode;

  /** Step value for number inputs */
  step?: number;

  /** Custom style overrides */
  style?: React.CSSProperties;

  /** Allow clear for select/date/time inputs */
  allowClear?: boolean;

  /** Additional className */
  className?: string;
}

/**
 * Generic Form Field Component
 */
export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  required = false,
  placeholder,
  type = 'text',
  options,
  rules = [],
  min,
  max,
  rows = 3,
  initialValue,
  disabled = false,
  tooltip,
  prefix,
  suffix,
  step,
  style,
  allowClear = true,
  className,
}) => {
  // Build validation rules
  const buildRules = (): Rule[] => {
    const baseRules: Rule[] = [];

    // Add required rule if needed
    if (required) {
      baseRules.push({
        required: true,
        message: `Please ${type === 'select' ? 'select' : 'enter'} ${label.toLowerCase()}`,
      });
    }

    // Add email validation rule
    if (type === 'email') {
      baseRules.push({
        type: 'email',
        message: 'Please enter a valid email address',
      });
    }

    // Merge with custom rules
    return [...baseRules, ...rules];
  };

  /**
   * Render the appropriate input component based on type
   */
  const renderInput = () => {
    const inputStyle = style || INPUT_STYLES;

    switch (type) {
      case 'select':
        return (
          <Select
            placeholder={placeholder}
            style={inputStyle}
            disabled={disabled}
            allowClear={allowClear}
            className={className}
          >
            {options?.map((option) => (
              <Select.Option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </Select.Option>
            ))}
          </Select>
        );

      case 'number':
        return (
          <InputNumber
            placeholder={placeholder}
            style={{ ...(style || INPUT_STYLES), width: '100%' }}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            prefix={prefix}
            className={className}
          />
        );

      case 'textarea':
        return (
          <TextArea
            placeholder={placeholder}
            rows={rows}
            style={style || TEXTAREA_STYLES}
            disabled={disabled}
            className={className}
          />
        );

      case 'date':
        return (
          <DatePicker
            placeholder={placeholder}
            style={{ ...(style || INPUT_STYLES), width: '100%' }}
            format="DD/MM/YYYY"
            disabled={disabled}
            allowClear={allowClear}
            className={className}
          />
        );

      case 'time':
        return (
          <TimePicker
            placeholder={placeholder}
            format="HH:mm"
            style={{ ...(style || INPUT_STYLES), width: '100%' }}
            disabled={disabled}
            allowClear={allowClear}
            className={className}
          />
        );

      case 'password':
        return (
          <Input.Password
            placeholder={placeholder}
            style={inputStyle}
            disabled={disabled}
            prefix={prefix}
            suffix={suffix}
            className={className}
          />
        );

      case 'email':
        return (
          <Input
            type="email"
            placeholder={placeholder}
            style={inputStyle}
            disabled={disabled}
            prefix={prefix}
            suffix={suffix}
            className={className}
          />
        );

      case 'text':
      default:
        return (
          <Input
            placeholder={placeholder}
            style={inputStyle}
            disabled={disabled}
            prefix={prefix}
            suffix={suffix}
            className={className}
          />
        );
    }
  };

  return (
    <Form.Item
      label={label}
      name={name}
      rules={buildRules()}
      initialValue={initialValue}
      tooltip={tooltip}
    >
      {renderInput()}
    </Form.Item>
  );
};

export default FormField;
