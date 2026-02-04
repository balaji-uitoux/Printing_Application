/**
 * Add Client Drawer
 *
 * Refactored to use FormDrawer and FormField components.
 * Reduced from ~200 lines to ~50 lines (75% reduction).
 */

import React from 'react';
import { FormDrawer, FormField } from '../ui';
import type { ClientFormData } from '../../types';

interface AddClientDrawerProps {
  open: boolean;
  onClose: () => void;
}

const STATUS_OPTIONS = [
  { value: 'Active', label: 'Active' },
  { value: 'Inactive', label: 'Inactive' },
];

const AddClientDrawer: React.FC<AddClientDrawerProps> = ({ open, onClose }) => {
  const handleSubmit = async (values: ClientFormData) => {
    console.log('Form values:', values);
    // TODO: Replace with actual API call
    // await clientService.create(values);
  };

  return (
    <FormDrawer
      open={open}
      onClose={onClose}
      title="Add Client"
      size="default"
      onSubmit={handleSubmit}
      submitButtonText="Add Client"
    >
      <FormField
        label="Client Code"
        name="code"
        required
        placeholder="CLI-001"
      />

      <FormField
        label="Client Name"
        name="name"
        required
        placeholder="Acme Corporation"
      />

      <FormField
        label="Contact Person"
        name="contactPerson"
        required
        placeholder="John Smith"
      />

      <FormField
        label="Email"
        name="email"
        type="email"
        required
        placeholder="john@acme.com"
      />

      <FormField
        label="Phone"
        name="phone"
        required
        placeholder="+91 9876543210"
      />

      <FormField
        label="City"
        name="city"
        required
        placeholder="Mumbai"
      />

      <FormField
        label="GST Number"
        name="gstNumber"
        required
        placeholder="27AABCU9603R1ZM"
      />

      <FormField
        label="Address"
        name="address"
        type="textarea"
        rows={3}
        placeholder="Enter complete address..."
      />

      <FormField
        label="Status"
        name="status"
        type="select"
        options={STATUS_OPTIONS}
        initialValue="Active"
        required
      />
    </FormDrawer>
  );
};

export default AddClientDrawer;
