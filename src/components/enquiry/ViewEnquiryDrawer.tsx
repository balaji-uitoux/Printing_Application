/**
 * View Enquiry Drawer
 *
 * Displays enquiry details in A4 format matching Quotation view layout
 */

import { Drawer, Button } from 'antd';
import type { Enquiry } from '../../types';
import { themeColors } from '../../theme/themeConfig';

interface ViewEnquiryDrawerProps {
  open: boolean;
  onClose: () => void;
  enquiry: Enquiry | null;
}

// Mock products data - Replace with actual data from enquiry
const mockProducts = [
  { id: 1, category: 'Photocards', name: 'ANUSHKA PHOTOCARD', dimensions: '85 x 55 x 2', quantity: 1000, description: 'High quality photocard with glossy finish', deliveryDate: '2024-02-15' },
  { id: 2, category: 'Boxes', name: 'TOP - 286 X 199 X 38', dimensions: '286 x 199 x 38', quantity: 500, description: 'Corrugated box with custom printing', deliveryDate: '2024-02-20' },
  { id: 3, category: 'Slips', name: 'EVELY SLIPS PHOTOCARD', dimensions: '150 x 100 x 1', quantity: 2000, description: 'Printed slips with lamination', deliveryDate: '2024-02-18' }
];

const ViewEnquiryDrawer = ({ open, onClose, enquiry }: ViewEnquiryDrawerProps) => {
  if (!enquiry) return null;

  // Cast enquiry to access additional properties
  const enquiryWithExtras = enquiry as Enquiry & { contactNumber?: string; email?: string };

  return (
    <Drawer
      title={null}
      placement="right"
      onClose={onClose}
      open={open}
      closable={false}
      styles={{
        body: { padding: 0, background: 'linear-gradient(135deg, #F0F4F8 0%, #E8EDF2 25%, #F5F0F8 50%, #E8F0F2 75%, #F0F8F4 100%)' },
        wrapper: { width: '900px' },
      }}
    >
      <>
        {/* Header with Enquiry Preview */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(20px)',
          padding: '20px 24px',
          borderBottom: `1px solid rgba(226, 232, 240, 0.6)`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}>
          <h2 style={{
            margin: 0,
            fontSize: '20px',
            fontWeight: 600,
            color: themeColors.text,
            letterSpacing: '-0.01em'
          }}>
            Enquiry Preview
          </h2>
          <Button
            type="text"
            onClick={onClose}
            style={{
              fontSize: '24px',
              color: themeColors.textSecondary,
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ×
          </Button>
        </div>

        {/* Content - A4 Printable Container */}
        <div style={{ padding: '20px', overflowY: 'auto', height: 'calc(100vh - 70px)', display: 'flex', justifyContent: 'center' }}>

          {/* A4 Paper Container */}
          <div style={{
            width: '210mm',
            minHeight: '297mm',
            background: '#FFFFFF',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            padding: '10mm',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column'
          }}>

          {/* ENQUIRY Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '12px',
            paddingBottom: '12px',
            borderBottom: `2px solid ${themeColors.border}`
          }}>
            {/* Left: Logo */}
            <div>
              <img
                src="/logo.png"
                alt="Cheran Print"
                style={{
                  width: '100px',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            </div>

            {/* Right: ENQUIRY Title */}
            <div style={{ textAlign: 'right' }}>
              <h1 style={{
                margin: 0,
                fontSize: '36px',
                fontWeight: 700,
                color: themeColors.text,
                letterSpacing: '0.02em',
                lineHeight: 1
              }}>ENQUIRY</h1>
            </div>
          </div>

          {/* Company Details and Customer Info */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            marginBottom: '12px',
            paddingBottom: '12px',
            borderBottom: `1px solid ${themeColors.border}`
          }}>
            {/* Left: Customer Details */}
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: themeColors.textSecondary, marginBottom: '8px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Customer Details</div>
              <div style={{ fontSize: '13px', color: themeColors.text, lineHeight: '1.8' }}>
                <div style={{ fontWeight: 600, marginBottom: '4px' }}>{enquiry.customerName}</div>
                {enquiryWithExtras.contactNumber && <div>Contact: {enquiryWithExtras.contactNumber}</div>}
                {enquiryWithExtras.email && <div>Email: {enquiryWithExtras.email}</div>}
              </div>
            </div>

            {/* Right: Enquiry Details */}
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '13px', color: themeColors.textSecondary, lineHeight: '1.8' }}>
                <div>Enquiry Number: {enquiry.enquiryNumber}</div>
                <div>Enquiry Date: {new Date(enquiry.enquiryDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' })}</div>
              </div>
            </div>
          </div>

          {/* Products Table */}
          <div style={{ marginBottom: '12px' }}>
            {/* Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${themeColors.border}` }}>
              {/* Table Header */}
              <thead>
                <tr style={{ background: '#F8FAFC' }}>
                  <th style={{
                    padding: '12px 16px',
                    textAlign: 'center',
                    fontWeight: 600,
                    fontSize: '12px',
                    color: themeColors.textSecondary,
                    border: `1px solid ${themeColors.border}`
                  }}>#</th>
                  <th style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontWeight: 600,
                    fontSize: '12px',
                    color: themeColors.textSecondary,
                    border: `1px solid ${themeColors.border}`
                  }}>Category</th>
                  <th style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontWeight: 600,
                    fontSize: '12px',
                    color: themeColors.textSecondary,
                    border: `1px solid ${themeColors.border}`
                  }}>Product Name</th>
                  <th style={{
                    padding: '12px 16px',
                    textAlign: 'center',
                    fontWeight: 600,
                    fontSize: '12px',
                    color: themeColors.textSecondary,
                    border: `1px solid ${themeColors.border}`
                  }}>Dimensions (L×W×H mm)</th>
                  <th style={{
                    padding: '12px 16px',
                    textAlign: 'right',
                    fontWeight: 600,
                    fontSize: '12px',
                    color: themeColors.textSecondary,
                    border: `1px solid ${themeColors.border}`
                  }}>Quantity</th>
                  <th style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontWeight: 600,
                    fontSize: '12px',
                    color: themeColors.textSecondary,
                    border: `1px solid ${themeColors.border}`
                  }}>Description</th>
                  <th style={{
                    padding: '12px 16px',
                    textAlign: 'center',
                    fontWeight: 600,
                    fontSize: '12px',
                    color: themeColors.textSecondary,
                    border: `1px solid ${themeColors.border}`
                  }}>Delivery Date</th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {mockProducts.map((product) => (
                  <tr key={product.id}>
                    <td style={{
                      padding: '16px',
                      textAlign: 'center',
                      fontSize: '13px',
                      color: themeColors.text,
                      border: `1px solid ${themeColors.border}`
                    }}>{product.id}</td>
                    <td style={{
                      padding: '16px',
                      fontSize: '13px',
                      color: themeColors.text,
                      border: `1px solid ${themeColors.border}`
                    }}>{product.category}</td>
                    <td style={{
                      padding: '16px',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: themeColors.text,
                      border: `1px solid ${themeColors.border}`
                    }}>{product.name}</td>
                    <td style={{
                      padding: '16px',
                      textAlign: 'center',
                      fontSize: '13px',
                      color: themeColors.text,
                      border: `1px solid ${themeColors.border}`
                    }}>{product.dimensions}</td>
                    <td style={{
                      padding: '16px',
                      textAlign: 'right',
                      fontSize: '13px',
                      color: themeColors.text,
                      border: `1px solid ${themeColors.border}`
                    }}>
                      {product.quantity.toLocaleString()}
                    </td>
                    <td style={{
                      padding: '16px',
                      fontSize: '12px',
                      color: themeColors.textSecondary,
                      border: `1px solid ${themeColors.border}`
                    }}>{product.description}</td>
                    <td style={{
                      padding: '16px',
                      textAlign: 'center',
                      fontSize: '13px',
                      color: themeColors.text,
                      border: `1px solid ${themeColors.border}`
                    }}>
                      {new Date(product.deliveryDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Notes/Description Section */}
            <div style={{ marginTop: '12px', padding: '12px 0' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: themeColors.text, marginBottom: '8px' }}>
                Notes / Description
              </div>
              <div style={{ fontSize: '13px', color: themeColors.textSecondary, lineHeight: '1.6', fontStyle: 'italic' }}>
                {enquiry.notes || 'Please ensure all products meet quality standards. Sample reference provided for verification.'}
              </div>
            </div>
          </div>

          {/* Spacer to push footer to bottom */}
          <div style={{ flex: 1 }}></div>

          {/* Footer with Company Details */}
          <div style={{
            borderTop: `1px solid ${themeColors.border}`,
            paddingTop: '12px',
            marginTop: 'auto'
          }}>
            <div style={{ fontSize: '13px', color: themeColors.textSecondary, lineHeight: '1.5' }}>
              <div style={{ fontWeight: 700, marginBottom: '4px', color: themeColors.text }}>CHERAN PRINT Private Limited</div>
              <div>123 Industrial Estate, Phase 2, Sector 15, Mumbai, Maharashtra - 400 001</div>
              <div style={{ marginTop: '2px' }}>
                www.example-prints.com | Ph: +91 98765 43210 | Email: info@example-prints.com
              </div>
              <div style={{ marginTop: '2px' }}>
                GSTN: 27AABCU9603R1ZX | CIN: U22123MH2015PTC123456
              </div>
            </div>
          </div>

          </div> {/* End A4 Paper Container */}
        </div> {/* End Content */}
      </>
    </Drawer>
  );
};

export default ViewEnquiryDrawer;
