/**
 * View Enquiry Drawer
 *
 * Displays enquiry details in a compact invoice-like format
 */

import { Drawer, Button, Tag } from 'antd';
import { ArrowLeftOutlined, PrinterOutlined, DownloadOutlined } from '@ant-design/icons';
import type { Enquiry } from '../../types';
import { themeColors } from '../../theme/themeConfig';

interface ViewEnquiryDrawerProps {
  open: boolean;
  onClose: () => void;
  enquiry: Enquiry | null;
}

const ViewEnquiryDrawer = ({ open, onClose, enquiry }: ViewEnquiryDrawerProps) => {
  if (!enquiry) return null;

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      New: 'blue',
      Quoted: 'orange',
      Approved: 'green',
      Rejected: 'red',
      'In Progress': 'purple',
    };
    return colors[status] || 'default';
  };

  return (
    <Drawer
      title={null}
      placement="right"
      size="large"
      onClose={onClose}
      open={open}
      closable={false}
      styles={{
        body: {
          padding: 0,
          background: '#F8FAFC',
        },
      }}
    >
      {/* Header */}
      <div
        style={{
          background: '#FFFFFF',
          padding: '16px 24px',
          borderBottom: `1px solid ${themeColors.borderLight}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={onClose}
            style={{
              fontSize: '18px',
              color: themeColors.text,
              width: '36px',
              height: '36px',
            }}
          />
          <div>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 600, color: themeColors.text }}>
              Enquiry Details
            </h2>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            type="text"
            icon={<PrinterOutlined style={{ fontSize: '18px' }} />}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: themeColors.text
            }}
          />
          <Button
            type="text"
            icon={<DownloadOutlined style={{ fontSize: '18px' }} />}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: themeColors.text
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '24px', overflowY: 'auto', height: 'calc(100vh - 69px)' }}>
        <div
          style={{
            background: '#FFFFFF',
            padding: '36px',
            borderRadius: '12px',
            border: `1px solid ${themeColors.borderLight}`,
            maxWidth: '900px',
            margin: '0 auto',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          }}
        >
          {/* Invoice Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', paddingBottom: '24px', borderBottom: `2px solid ${themeColors.border}` }}>
            <div>
              <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: `linear-gradient(135deg, ${themeColors.primary} 0%, #E65525 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontSize: '24px', fontWeight: 700, marginBottom: '12px', boxShadow: '0 4px 12px rgba(255, 107, 53, 0.3)' }}>
                P
              </div>
              <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 700, color: themeColors.text, letterSpacing: '-0.01em' }}>PRINTING PRESS CO.</h1>
              <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: themeColors.textSecondary, lineHeight: '1.7' }}>
                123 Industrial Area<br />
                Chennai, Tamil Nadu 600001<br />
                <strong>Phone:</strong> +91 98765 43210<br />
                <strong>Email:</strong> info@printingpress.com
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ display: 'inline-block', background: 'rgba(255, 107, 53, 0.1)', padding: '8px 16px', borderRadius: '8px', marginBottom: '12px' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, color: themeColors.primary, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Enquiry</div>
              </div>
              <div style={{ fontSize: '20px', fontWeight: 700, color: themeColors.text, marginBottom: '8px' }}>
                #{enquiry.enquiryNumber}
              </div>
              <Tag color={getStatusColor(enquiry.status)} style={{ fontSize: '12px', padding: '4px 12px', borderRadius: '6px', fontWeight: 600 }}>
                {enquiry.status}
              </Tag>
            </div>
          </div>

          {/* Project and Date Info */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr',
              gap: '16px',
              padding: '16px 0',
              borderBottom: `1px solid ${themeColors.borderLight}`,
              marginBottom: '24px',
            }}
          >
            <div>
              <div style={{ fontSize: '12px', color: themeColors.textSecondary, marginBottom: '4px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Product</div>
              <div style={{ fontSize: '15px', fontWeight: 600, color: themeColors.text }}>
                {enquiry.productType}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: themeColors.textSecondary, marginBottom: '4px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Enquiry Date</div>
              <div style={{ fontSize: '15px', fontWeight: 600, color: themeColors.text }}>
                {new Date(enquiry.enquiryDate).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: themeColors.textSecondary, marginBottom: '4px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Quantity</div>
              <div style={{ fontSize: '15px', fontWeight: 600, color: themeColors.text }}>
                {enquiry.quantity.toLocaleString()} units
              </div>
            </div>
          </div>

          {/* From and To Section */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '32px' }}>
            {/* From */}
            <div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: themeColors.textSecondary, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '12px', paddingBottom: '8px', borderBottom: `2px solid ${themeColors.primary}`, display: 'inline-block' }}>
                From
              </div>
              <div style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px', color: themeColors.text }}>
                Printing Press Co.
              </div>
              <div style={{ fontSize: '12px', color: themeColors.textSecondary, lineHeight: '1.8' }}>
                123 Industrial Area<br />
                Chennai, Tamil Nadu 600001<br />
                <strong>Phone:</strong> +91 98765 43210<br />
                <strong>Email:</strong> info@printingpress.com
              </div>
            </div>

            {/* To */}
            <div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: themeColors.textSecondary, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '12px', paddingBottom: '8px', borderBottom: `2px solid ${themeColors.primary}`, display: 'inline-block' }}>
                Customer
              </div>
              <div style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px', color: themeColors.text }}>
                {enquiry.customerName}
              </div>
              {enquiry.size && (
                <div style={{ fontSize: '12px', color: themeColors.textSecondary, lineHeight: '1.8' }}>
                  <strong>Size:</strong> {enquiry.size}
                </div>
              )}
              {enquiry.followUpDate && (
                <div style={{ fontSize: '12px', color: themeColors.textSecondary, lineHeight: '1.8', marginTop: '8px' }}>
                  <strong>Follow Up:</strong> {new Date(enquiry.followUpDate).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Product Details - Invoice Line Items Style */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: themeColors.textSecondary, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '16px', paddingBottom: '8px', borderBottom: `2px solid ${themeColors.border}` }}>Item Details</div>

            {/* Table Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr 1fr', gap: '16px', padding: '12px 16px', background: 'rgba(248, 250, 252, 1)', borderRadius: '8px 8px 0 0', borderBottom: `1px solid ${themeColors.border}` }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: themeColors.textSecondary, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Description</div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: themeColors.textSecondary, letterSpacing: '0.05em', textTransform: 'uppercase', textAlign: 'right' }}>Quantity</div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: themeColors.textSecondary, letterSpacing: '0.05em', textTransform: 'uppercase', textAlign: 'right' }}>Est. Cost</div>
            </div>

            {/* Item Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr 1fr', gap: '16px', padding: '16px', borderBottom: `1px solid ${themeColors.borderLight}`, background: '#FFFFFF' }}>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 600, color: themeColors.text, marginBottom: '6px' }}>{enquiry.productType}</div>
                {enquiry.specifications && (
                  <div style={{ fontSize: '13px', color: themeColors.textSecondary, lineHeight: '1.6', marginBottom: '4px' }}>
                    <strong>Specifications:</strong> {enquiry.specifications}
                  </div>
                )}
                {enquiry.size && (
                  <div style={{ fontSize: '13px', color: themeColors.textSecondary, lineHeight: '1.6' }}>
                    <strong>Size:</strong> {enquiry.size}
                  </div>
                )}
              </div>
              <div style={{ fontSize: '15px', fontWeight: 600, textAlign: 'right', color: themeColors.text, alignSelf: 'center' }}>
                {enquiry.quantity.toLocaleString()}
              </div>
              <div style={{ fontSize: '15px', fontWeight: 600, textAlign: 'right', color: themeColors.text, alignSelf: 'center' }}>
                {enquiry.estimatedCost ? `₹${enquiry.estimatedCost.toLocaleString()}` : '-'}
              </div>
            </div>
          </div>

          {/* Total Amount - Invoice Style */}
          {enquiry.estimatedCost && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '28px' }}>
              <div style={{ width: '350px' }}>
                <div style={{ background: `linear-gradient(135deg, ${themeColors.primary} 0%, #E65525 100%)`, padding: '18px 20px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(255, 107, 53, 0.3)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.9)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '4px' }}>Estimated Total</div>
                      <div style={{ fontSize: '28px', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.01em' }}>₹{enquiry.estimatedCost.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notes Section */}
          {enquiry.notes && (
            <div style={{ marginBottom: '28px', background: 'rgba(255, 107, 53, 0.08)', border: `1px solid rgba(255, 107, 53, 0.3)`, borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: themeColors.primary, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '8px' }}>Notes</div>
              <div style={{ fontSize: '13px', color: themeColors.text, lineHeight: '1.7' }}>
                {enquiry.notes}
              </div>
            </div>
          )}

          {/* Footer Section */}
          <div style={{ borderTop: `2px solid ${themeColors.border}`, paddingTop: '20px', marginTop: '32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px', marginBottom: '20px' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: themeColors.textSecondary, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '8px' }}>Next Steps</div>
                <div style={{ fontSize: '12px', color: themeColors.textSecondary, lineHeight: '1.7' }}>
                  • We will review your requirements carefully<br />
                  • A detailed quotation will be prepared<br />
                  • Our team will contact you within 24-48 hours<br />
                  • For urgent inquiries, please call us directly
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, color: themeColors.textSecondary, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '8px' }}>Contact</div>
                <div style={{ fontSize: '12px', color: themeColors.textSecondary, lineHeight: '1.7' }}>
                  <strong>Phone:</strong> +91 98765 43210<br />
                  <strong>Email:</strong> info@printingpress.com
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'center', paddingTop: '16px', borderTop: `1px solid ${themeColors.borderLight}` }}>
              <p style={{ margin: 0, fontSize: '12px', fontWeight: 600, color: themeColors.text }}>Thank you for your enquiry!</p>
              <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: themeColors.textSecondary }}>This is a system-generated enquiry document.</p>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default ViewEnquiryDrawer;
