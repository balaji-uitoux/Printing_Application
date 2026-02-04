/**
 * FormDrawer Base Component
 *
 * Generic drawer wrapper that provides consistent styling and behavior
 * for all form drawers in the application.
 *
 * Features:
 * - Automatic form validation and submission
 * - Loading states
 * - Consistent styling via centralized constants
 * - Customizable title, width, and buttons
 * - Error handling
 *
 * Usage:
 * <FormDrawer
 *   open={open}
 *   onClose={onClose}
 *   title="Add Client"
 *   onSubmit={handleSubmit}
 * >
 *   <FormField label="Name" name="name" required />
 *   <FormField label="Email" name="email" type="email" required />
 * </FormDrawer>
 */

import type { ReactNode } from 'react';
import { Drawer, Form, Button, message } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd/es/form';
import { typography } from '../../../theme/typography';
import {
  DRAWER_STYLES,
  DRAWER_HEADER_STYLES,
  DRAWER_TITLE_STYLES,
  DRAWER_FOOTER_STYLES,
  CLOSE_BUTTON_STYLES,
  BUTTON_STYLES,
} from '../../../styles/constants';

export interface FormDrawerProps<T = any> {
  /** Whether the drawer is visible */
  open: boolean;

  /** Callback when drawer is closed */
  onClose: () => void;

  /** Drawer title */
  title: string;

  /** Drawer width in pixels or percentage (default: 600) */
  width?: number | string;

  /** Submit handler - receives validated form values */
  onSubmit: (values: T) => void | Promise<void>;

  /** Submit button text (default: "Submit") */
  submitButtonText?: string;

  /** Submit button icon (default: <PlusOutlined />) */
  submitButtonIcon?: ReactNode;

  /** Form content */
  children: ReactNode;

  /** External form instance (optional - will create internal if not provided) */
  form?: FormInstance;

  /** Loading state for async operations */
  loading?: boolean;

  /** Additional footer actions (rendered before Cancel/Submit buttons) */
  footerActions?: ReactNode;

  /** Custom close button text (default: "Cancel") */
  closeButtonText?: string;
}

/**
 * Generic Form Drawer Component
 */
export const FormDrawer = <T,>({
  open,
  onClose,
  title,
  width = 600,
  onSubmit,
  submitButtonText = 'Submit',
  submitButtonIcon = <PlusOutlined />,
  children,
  form: externalForm,
  loading = false,
  footerActions,
  closeButtonText = 'Cancel',
}: FormDrawerProps<T>) => {
  // Create internal form if none provided
  const [internalForm] = Form.useForm();
  const form = externalForm || internalForm;

  /**
   * Handle form submission
   * Validates fields and calls onSubmit with validated values
   */
  const handleSubmit = async () => {
    try {
      // Validate all form fields
      const values = await form.validateFields();

      // Call submit handler
      await onSubmit(values);

      // Reset form after successful submission
      form.resetFields();

      // Close drawer
      onClose();

      // Show success message
      message.success('Saved successfully');
    } catch (error: any) {
      // Handle validation errors
      if (error.errorFields) {
        console.error('Form validation failed:', error);
        message.error('Please check the form for errors');
      } else {
        // Handle submission errors
        console.error('Form submission failed:', error);
        message.error(error.message || 'Failed to save');
      }
    }
  };

  /**
   * Handle drawer close
   * Resets form when drawer is closed
   */
  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  /**
   * Render custom drawer title with close button
   */
  const renderTitle = () => (
    <div style={DRAWER_HEADER_STYLES}>
      <h2 style={DRAWER_TITLE_STYLES}>{title}</h2>
      <Button
        type="text"
        icon={<CloseOutlined />}
        onClick={handleClose}
        style={CLOSE_BUTTON_STYLES}
        disabled={loading}
      />
    </div>
  );

  /**
   * Render footer with Cancel and Submit buttons
   */
  const renderFooter = () => (
    <div style={DRAWER_FOOTER_STYLES}>
      {footerActions}
      <Button
        onClick={handleClose}
        disabled={loading}
        style={{
          ...BUTTON_STYLES.cancel,
          ...typography.body,
        }}
      >
        {closeButtonText}
      </Button>
      <Button
        type="primary"
        onClick={handleSubmit}
        icon={submitButtonIcon}
        loading={loading}
        style={{
          ...BUTTON_STYLES.submit,
          ...typography.body,
        }}
      >
        {submitButtonText}
      </Button>
    </div>
  );

  return (
    <Drawer
      title={renderTitle()}
      placement="right"
      width={width}
      onClose={handleClose}
      open={open}
      closable={false}
      styles={DRAWER_STYLES}
      footer={renderFooter()}
      maskClosable={!loading}
      keyboard={!loading}
    >
      <Form form={form} layout="vertical">
        {children}
      </Form>
    </Drawer>
  );
};

export default FormDrawer;
