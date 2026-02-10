/**
 * Add Client Drawer
 *
 * Form for adding new clients with auto-generated code.
 */

import React, { useState } from 'react';
import { Form, Checkbox } from 'antd';
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

const SALUTATION_OPTIONS = [
  { value: 'Mr.', label: 'Mr.' },
  { value: 'Ms.', label: 'Ms.' },
  { value: 'Mrs.', label: 'Mrs.' },
  { value: 'Dr.', label: 'Dr.' },
];

const GST_TREATMENT_OPTIONS = [
  { value: 'Registered', label: 'Registered' },
  { value: 'Unregistered', label: 'Unregistered' },
  { value: 'Composition', label: 'Composition' },
  { value: 'Consumer', label: 'Consumer' },
  { value: 'Overseas', label: 'Overseas' },
];

const AddClientDrawer: React.FC<AddClientDrawerProps> = ({ open, onClose }) => {
  const [form] = Form.useForm();
  const [sameAsCompanyAddress, setSameAsCompanyAddress] = useState(false);

  const handleSubmit = async (values: ClientFormData) => {
    // Auto-generate client code
    const clientCode = `CLI-${Date.now().toString().slice(-6)}`;

    console.log('Form values:', { ...values, code: clientCode });
    // TODO: Replace with actual API call
    // await clientService.create({ ...values, code: clientCode });
  };

  // Handle checkbox change for "Same as Communication Address"
  const handleSameAddressChange = (e: any) => {
    const checked = e.target.checked;
    setSameAsCompanyAddress(checked);

    if (checked) {
      // Copy company address to billing address
      const companyAddressLine1 = form.getFieldValue('companyAddressLine1');
      const companyAddressLine2 = form.getFieldValue('companyAddressLine2');
      const companyPincode = form.getFieldValue('companyPincode');
      const companyStreet = form.getFieldValue('companyStreet');
      const companyState = form.getFieldValue('companyState');
      const companyCity = form.getFieldValue('companyCity');

      form.setFieldsValue({
        billingAddressLine1: companyAddressLine1,
        billingAddressLine2: companyAddressLine2,
        billingPincode: companyPincode,
        billingStreet: companyStreet,
        billingState: companyState,
        billingCity: companyCity,
      });
    } else {
      // Clear billing address fields
      form.setFieldsValue({
        billingAddressLine1: '',
        billingAddressLine2: '',
        billingPincode: '',
        billingStreet: '',
        billingState: '',
        billingCity: '',
      });
    }
  };

  return (
    <FormDrawer
      open={open}
      onClose={onClose}
      title="Add Client"
      onSubmit={handleSubmit}
      submitButtonText="Add Client"
      form={form}
      width={726}
    >
      {/* Row 1: Display Name, Salutation, First Name */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
        <FormField
          label="Display Name"
          name="displayName"
          required
          placeholder="Enter display name"
        />
        <FormField
          label="Salutation"
          name="salutation"
          type="select"
          options={SALUTATION_OPTIONS}
          placeholder="Select salutation"
        />
        <FormField
          label="First Name"
          name="firstName"
          required
          placeholder="Enter first name"
        />
      </div>

      {/* Row 2: Last Name, Contact Number, Mobile Number */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
        <FormField
          label="Last Name"
          name="lastName"
          required
          placeholder="Enter last name"
        />
        <FormField
          label="Contact Number"
          name="contactNumber"
          placeholder="+91 9876543210"
        />
        <FormField
          label="Mobile Number"
          name="mobileNumber"
          required
          placeholder="+91 9876543210"
        />
      </div>

      {/* Row 3: Email ID, GST Number, GST Treatment */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
        <FormField
          label="Email ID"
          name="email"
          type="email"
          required
          placeholder="john@example.com"
        />
        <FormField
          label="GST Number"
          name="gstNumber"
          placeholder="27AABCU9603R1ZM"
        />
        <FormField
          label="GST Treatment"
          name="gstTreatment"
          type="select"
          options={GST_TREATMENT_OPTIONS}
          placeholder="Select GST treatment"
        />
      </div>

      {/* Communication Address Section */}
      <div style={{
        marginTop: '24px',
        padding: '20px',
        background: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid #E2E8F0'
      }}>
        <div style={{
          marginBottom: '16px',
          fontWeight: 600,
          fontSize: '14px',
          color: '#0F172A'
        }}>
          Communication Address
        </div>

        {/* Row 4: Address Line 1, Address Line 2, Pincode */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
          <FormField
            label="Address Line 1"
            name="companyAddressLine1"
            required
            placeholder="Enter address line 1"
          />
          <FormField
            label="Address Line 2"
            name="companyAddressLine2"
            placeholder="Enter address line 2 (optional)"
          />
          <FormField
            label="Pincode"
            name="companyPincode"
            required
            placeholder="Enter pincode"
          />
        </div>

        {/* Row 5: Street, State, City */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
          <FormField
            label="Street"
            name="companyStreet"
            required
            placeholder="Enter street address"
          />
          <FormField
            label="State"
            name="companyState"
            required
            placeholder="Enter state"
          />
          <FormField
            label="City"
            name="companyCity"
            required
            placeholder="Enter city"
          />
        </div>
      </div>

      {/* Billing Address Section */}
      <div style={{
        marginTop: '24px',
        padding: '20px',
        background: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid #E2E8F0'
      }}>
        <div style={{
          marginBottom: '16px',
          fontWeight: 600,
          fontSize: '14px',
          color: '#0F172A'
        }}>
          Billing Address
        </div>

        {/* Same as Communication Address Checkbox */}
        <Form.Item name="sameAsCompanyAddress" valuePropName="checked">
          <Checkbox onChange={handleSameAddressChange}>
            Same as Communication Address
          </Checkbox>
        </Form.Item>

        {/* Row 6: Address Line 1, Address Line 2, Pincode */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
          <FormField
            label="Address Line 1"
            name="billingAddressLine1"
            required={!sameAsCompanyAddress}
            disabled={sameAsCompanyAddress}
            placeholder="Enter address line 1"
          />
          <FormField
            label="Address Line 2"
            name="billingAddressLine2"
            disabled={sameAsCompanyAddress}
            placeholder="Enter address line 2 (optional)"
          />
          <FormField
            label="Pincode"
            name="billingPincode"
            required={!sameAsCompanyAddress}
            disabled={sameAsCompanyAddress}
            placeholder="Enter pincode"
          />
        </div>

        {/* Row 7: Street, State, City */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
          <FormField
            label="Street"
            name="billingStreet"
            required={!sameAsCompanyAddress}
            disabled={sameAsCompanyAddress}
            placeholder="Enter street address"
          />
          <FormField
            label="State"
            name="billingState"
            required={!sameAsCompanyAddress}
            disabled={sameAsCompanyAddress}
            placeholder="Enter state"
          />
          <FormField
            label="City"
            name="billingCity"
            required={!sameAsCompanyAddress}
            disabled={sameAsCompanyAddress}
            placeholder="Enter city"
          />
        </div>
      </div>

      {/* Row 8: Status */}
      <div style={{ marginTop: '24px' }}>
        <FormField
          label="Status"
          name="status"
          type="select"
          options={STATUS_OPTIONS}
          initialValue="Active"
          required
        />
      </div>
    </FormDrawer>
  );
};

export default AddClientDrawer;
