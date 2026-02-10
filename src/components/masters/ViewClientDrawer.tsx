/**
 * View Client Drawer
 *
 * Displays client information in a compact, organized layout with icons.
 */

import React from 'react';
import { Drawer, Button, Tag } from 'antd';
import {
  CloseOutlined,
  UserOutlined,
  PhoneOutlined,
  IdcardOutlined,
  HomeOutlined,
  BankOutlined,
  EditOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';
import type { ClientFormData } from '../../types';
import {
  DRAWER_STYLES,
  DRAWER_HEADER_STYLES,
  DRAWER_TITLE_STYLES,
  CLOSE_BUTTON_STYLES,
} from '../../styles/constants';
import { themeColors } from '../../theme/themeConfig';

interface ViewClientDrawerProps {
  open: boolean;
  onClose: () => void;
  client: ClientFormData | null;
  onEdit?: () => void;
}

const ViewClientDrawer: React.FC<ViewClientDrawerProps> = ({
  open,
  onClose,
  client,
  onEdit,
}) => {
  if (!client) return null;

  // Render custom drawer title with edit and close buttons
  const renderTitle = () => (
    <div style={DRAWER_HEADER_STYLES}>
      <h2 style={DRAWER_TITLE_STYLES}>Client Details</h2>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {onEdit && (
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={onEdit}
            style={{
              fontSize: '14px',
              color: themeColors.text,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            Edit
          </Button>
        )}
        <Button
          type="text"
          icon={<CloseOutlined />}
          onClick={onClose}
          style={CLOSE_BUTTON_STYLES}
        />
      </div>
    </div>
  );

  // Info row component for displaying label-value pairs in horizontal layout
  const InfoRow = ({ label, value }: { label: string; value?: string | React.ReactNode }) => {
    if (!value) return null;
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '8px',
        }}
      >
        <div
          style={{
            fontSize: '14px',
            color: themeColors.textSecondary,
            fontWeight: 500,
            flex: '0 0 120px',
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: '14px',
            color: themeColors.text,
            flex: 1,
            textAlign: 'right',
          }}
        >
          {value}
        </div>
      </div>
    );
  };

  // Section header with icon
  const SectionHeader = ({
    icon,
    title,
  }: {
    icon: React.ReactNode;
    title: string;
  }) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '12px',
      }}
    >
      <div
        style={{
          width: '28px',
          height: '28px',
          borderRadius: '6px',
          background: 'rgba(59, 130, 246, 0.1)',
          color: '#3B82F6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontSize: '15px',
          fontWeight: 600,
          color: themeColors.text,
        }}
      >
        {title}
      </div>
    </div>
  );

  // Section component
  const Section = ({
    children,
    style,
  }: {
    children: React.ReactNode;
    style?: React.CSSProperties;
  }) => (
    <div
      style={{
        marginBottom: '16px',
        padding: '16px',
        background: '#FFFFFF',
        borderRadius: '12px',
        border: `1px solid ${themeColors.borderLight}`,
        ...style,
      }}
    >
      {children}
    </div>
  );

  // Build full name
  const fullName = [
    client.salutation,
    client.firstName,
    client.lastName,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Drawer
      title={renderTitle()}
      placement="right"
      width={520}
      onClose={onClose}
      open={open}
      closable={false}
      styles={DRAWER_STYLES}
    >
      {/* Personal Details Section */}
      <Section>
        <SectionHeader icon={<UserOutlined />} title="Personal Details" />
        <InfoRow label="Name" value={fullName || client.displayName} />
        <InfoRow
          label="Status"
          value={
            <Tag
              color={client.status === 'Active' ? 'green' : 'red'}
              style={{
                fontSize: '12px',
                padding: '2px 12px',
                borderRadius: '20px',
              }}
            >
              {client.status}
            </Tag>
          }
        />
      </Section>

      {/* Contact Information Section */}
      <Section>
        <SectionHeader icon={<PhoneOutlined />} title="Contact Information" />
        {client.mobileNumber && <InfoRow label="Mobile Number" value={client.mobileNumber} />}
        {client.contactNumber && <InfoRow label="Contact Number" value={client.contactNumber} />}
        {client.email && <InfoRow label="Email" value={client.email} />}
      </Section>

      {/* GST Details Section */}
      {(client.gstNumber || client.gstTreatment) && (
        <Section>
          <SectionHeader icon={<IdcardOutlined />} title="GST Details" />
          {client.gstNumber && <InfoRow label="GST Number" value={client.gstNumber} />}
          {client.gstTreatment && <InfoRow label="GST Treatment" value={client.gstTreatment} />}
        </Section>
      )}

      {/* Communication Address Section */}
      <Section>
        <SectionHeader icon={<HomeOutlined />} title="Communication Address" />
        <div style={{ fontSize: '14px', color: themeColors.text, lineHeight: '1.6' }}>
          {client.companyStreet && <div>{client.companyStreet}</div>}
          <div>
            {[client.companyCity, client.companyState, client.companyPincode]
              .filter(Boolean)
              .join(', ')}
          </div>
        </div>
      </Section>

      {/* Billing Address Section */}
      <Section>
        <SectionHeader icon={<BankOutlined />} title="Billing Address" />
        {client.sameAsCompanyAddress ? (
          <div style={{ fontSize: '14px', color: themeColors.textSecondary, fontStyle: 'italic' }}>
            Same as Communication Address
          </div>
        ) : (
          <div style={{ fontSize: '14px', color: themeColors.text, lineHeight: '1.6' }}>
            {client.billingStreet && <div>{client.billingStreet}</div>}
            <div>
              {[client.billingCity, client.billingState, client.billingPincode]
                .filter(Boolean)
                .join(', ')}
            </div>
          </div>
        )}
      </Section>

      {/* Products List Section */}
      <Section>
        <SectionHeader icon={<ShoppingOutlined />} title="Products" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* Mock products data - replace with actual client products */}
          {[
            'AALIA & ANUSHKA SLIPS',
            'PUFFY & KURTHA BOX',
            'DEEPIKA & MICHELLE SLIPS',
            'EVELY SLIPS 6pcs BOX',
            'XPC - 99 BOX'
          ].map((product, index) => (
            <div
              key={index}
              style={{
                padding: '10px 0',
                fontSize: '14px',
                color: themeColors.text,
                fontWeight: 500,
              }}
            >
              {product}
            </div>
          ))}
        </div>
      </Section>
    </Drawer>
  );
};

export default ViewClientDrawer;
