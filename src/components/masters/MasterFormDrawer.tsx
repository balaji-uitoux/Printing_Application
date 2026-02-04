/**
 * Master Form Drawer Component
 *
 * Generic drawer component that uses configuration to render any master form.
 * This single component replaces 12 separate drawer components.
 *
 * Usage:
 * <MasterFormDrawer
 *   entityType="client"
 *   open={open}
 *   onClose={onClose}
 *   onSubmit={handleSubmit}
 * />
 */

import { useEffect } from 'react';
import { Form } from 'antd';
import { FormDrawer } from '../ui/FormDrawer';
import { FormField } from '../ui/FormField';
import { MASTER_FORM_CONFIGS } from '../../config/masterForms.config';
import type { MasterFormDrawerProps } from '../../types';

export const MasterFormDrawer = <T,>({
  entityType,
  open,
  onClose,
  onSubmit,
  initialValues,
  loading = false,
}: MasterFormDrawerProps<T>) => {
  // Get configuration for this entity type
  const config = MASTER_FORM_CONFIGS[entityType];

  // Create form instance
  const [form] = Form.useForm();

  // Pre-fill form with initial values if provided
  useEffect(() => {
    if (initialValues && open) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, open, form]);

  // Handle case where entity type is not configured
  if (!config) {
    console.error(`No configuration found for entity type: ${entityType}`);
    return null;
  }

  return (
    <FormDrawer
      open={open}
      onClose={onClose}
      title={config.title}
      width={config.width}
      onSubmit={onSubmit}
      submitButtonText={config.submitButtonText}
      form={form}
      loading={loading}
    >
      {config.fields.map((field) => (
        <FormField key={field.name} {...field} />
      ))}
    </FormDrawer>
  );
};

export default MasterFormDrawer;
