import { Form, Input, Select, InputNumber, Button, Divider, Card, DatePicker, message, Drawer, Tag } from 'antd';
import { EyeOutlined, DownloadOutlined, MailOutlined, PhoneOutlined, UserOutlined, DeleteOutlined, AppstoreOutlined, ShoppingCartOutlined, CalendarOutlined, FileTextOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { themeColors } from '../../theme/themeConfig';
import { ProcessCardDragContainer } from '../../components/quotation/ProcessCardDragContainer';
import type { CoatingType, ProcessCard } from '../../types/quotation';
import { createProcessCard } from '../../types/quotation';

const CreateQuotation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const enquiryData = location.state?.enquiryData;

  const [form] = Form.useForm();
  const [selectedCoatingTypes, setSelectedCoatingTypes] = useState<CoatingType[]>([]);
  const [processCards, setProcessCards] = useState<ProcessCard[]>([]);
  const [previewDrawerVisible, setPreviewDrawerVisible] = useState(false);
  const [productLines, setProductLines] = useState<any[]>([]);
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);

  // Watch form values for calculations
  const size1 = Form.useWatch('size1', form) || 0;
  const size2 = Form.useWatch('size2', form) || 0;
  const gsm = Form.useWatch('gsm', form) || 0;
  const kgRate = Form.useWatch('kgRate', form) || 0;
  const qty = Form.useWatch('qty', form) || 0;
  const noOfUps = Form.useWatch('noOfUps', form) || 0;
  const wasteQty = Form.useWatch('wasteQty', form) || 0;
  const packingCharge = Form.useWatch('packingCharge', form) || 0;
  const margin = Form.useWatch('margin', form) || 0;
  const taxRate = Form.useWatch('taxRate', form) || 18;

  // Calculations
  const singleBoardRate = size1 && size2 && gsm && kgRate ? (size1 * size2 * gsm * kgRate) / 1000000 : 0;
  const noOfBoardReq = qty && noOfUps ? Math.ceil(qty / noOfUps) : 0;
  const totalBoardReq = noOfBoardReq + wasteQty;
  const totalBoardRate = totalBoardReq * singleBoardRate;

  // Process costs from draggable cards
  const totalProcessCost = processCards.reduce((sum, card) => sum + (card.data.totalCost || 0), 0);

  // Final pricing calculations
  const totalRate = totalBoardRate + totalProcessCost + packingCharge;
  const singleBoxRate = qty > 0 ? totalRate / qty : 0;
  const rateWithMargin = totalRate + (totalRate * margin / 100);
  const tax = (rateWithMargin * taxRate) / 100;
  const grandTotal = rateWithMargin + tax;

  // Pre-fill form when enquiryData is provided
  useEffect(() => {
    // Initialize with dummy products if no enquiry data
    if (!enquiryData || !enquiryData.productLines || enquiryData.productLines.length === 0) {
      const dummyProducts = [
        {
          id: '1',
          category: 'Business Cards',
          productLine: 'Premium',
          length: 85,
          width: 55,
          height: null,
          quantity: 1000,
          description: 'Premium business cards with spot UV',
          deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: '2',
          category: 'Brochures',
          productLine: 'Standard',
          length: 210,
          width: 297,
          height: null,
          quantity: 500,
          description: 'A4 tri-fold brochures',
          deliveryDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: '3',
          category: 'Packaging',
          productLine: 'Custom',
          length: 150,
          width: 100,
          height: 50,
          quantity: 2000,
          description: 'Custom packaging boxes with logo',
          deliveryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ];
      setProductLines(dummyProducts);
    } else {
      setProductLines(enquiryData.productLines);
    }

    if (enquiryData) {
      form.setFieldsValue({
        customerName: enquiryData.customerName,
        itemName: enquiryData.productType || enquiryData.itemName,
        qty: enquiryData.quantity,
      });
    }
  }, [enquiryData, form]);

  // Handle coating type selection
  const handleCoatingTypeChange = (values: CoatingType[]) => {
    const newTypes = values.filter((type) => !selectedCoatingTypes.includes(type));
    const removedTypes = selectedCoatingTypes.filter((type) => !values.includes(type));

    // Add new process cards for newly selected types
    newTypes.forEach((type) => {
      const newCard = createProcessCard(type, processCards.length + 1);
      setProcessCards((prev) => [...prev, newCard]);
    });

    // Remove process cards for deselected types
    if (removedTypes.length > 0) {
      setProcessCards((prev) => prev.filter((card) => !removedTypes.includes(card.type)));
    }

    setSelectedCoatingTypes(values);
  };

  // Handle process card reordering
  const handleReorderCards = (reorderedCards: ProcessCard[]) => {
    setProcessCards(reorderedCards);
  };

  // Handle process card data update
  const handleUpdateCard = (id: string, data: Partial<ProcessCard['data']>) => {
    setProcessCards((prev) =>
      prev.map((card) => {
        if (card.id === id) {
          const updatedData = { ...card.data, ...data };

          // Recalculate totalCost based on process type
          if ('printingType' in updatedData) {
            // Printing: (QTY/1000) × Rate per 1000
            updatedData.totalCost = (qty / 1000) * (updatedData.ratePer1000 || 0);
          } else if ('uvType' in updatedData) {
            // UV Plating: (QTY/1000) × Rate per 1000
            updatedData.totalCost = (qty / 1000) * (updatedData.ratePer1000 || 0);
          } else if ('laminationType' in updatedData) {
            // Lamination: (QTY/1000) × Rate per 1000
            updatedData.totalCost = (qty / 1000) * (updatedData.ratePer1000 || 0);
          } else if ('dieType' in updatedData) {
            // Die: Die Charge + ((QTY/1000) × Die Cut Rate per 1000)
            updatedData.totalCost = (updatedData.dieCharge || 0) + ((qty / 1000) * (updatedData.dieCutRatePer1000 || 0));
          }

          return { ...card, data: updatedData };
        }
        return card;
      })
    );
  };

  // Handle process card removal
  const handleRemoveCard = (id: string) => {
    const cardToRemove = processCards.find((card) => card.id === id);
    if (cardToRemove) {
      setSelectedCoatingTypes((prev) => prev.filter((type) => type !== cardToRemove.type));
      setProcessCards((prev) => prev.filter((card) => card.id !== id));
      message.success(`${cardToRemove.type} process removed`);
    }
  };

  // Handle PDF download
  const handleDownloadPDF = () => {
    message.loading({ content: 'Generating PDF...', key: 'pdf' });
    setTimeout(() => {
      message.success({ content: 'PDF downloaded successfully!', key: 'pdf', duration: 2 });
    }, 1500);
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      message.loading({ content: 'Creating quotation...', key: 'submit' });

      const quotationData = {
        ...values,
        selectedCoatingTypes,
        processCards,
        singleBoardRate,
        noOfBoardReq,
        totalBoardReq,
        totalBoardRate,
        totalProcessCost,
        totalRate,
        singleBoxRate,
        rateWithMargin,
        grandTotal,
      };

      // Simulate API call
      setTimeout(() => {
        console.log('Quotation Data:', quotationData);
        message.success({ content: 'Quotation created and sent successfully!', key: 'submit', duration: 3 });
        navigate('/quotations');
      }, 1000);
    }).catch(() => {
      message.error('Please fill in all required fields');
    });
  };

  const inputStyle = {
    height: '36px',
    border: `1px solid ${themeColors.border}`,
    borderRadius: '8px',
  };

  const cardStyle = {
    background: '#FFFFFF',
    borderRadius: '12px',
    border: '1px solid rgba(226, 232, 240, 0.6)',
    marginBottom: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
  };

  const sectionHeaderStyle = {
    fontSize: '15px',
    fontWeight: 600,
    marginBottom: '12px',
    color: themeColors.text,
  };

  const selectedProduct = productLines[selectedProductIndex];

  return (
    <div className="create-quotation-page-container" data-testid="create-quotation-page" style={{ height: 'calc(100vh - 84px)', display: 'flex', flexDirection: 'column' }}>
      {/* Header with View Preview Button */}
      <div className="quotation-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', padding: '12px 16px', background: '#FFFFFF', borderRadius: '12px', border: '1px solid rgba(226, 232, 240, 0.6)', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 600, color: themeColors.text }}>Create Quotation</h2>
          <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: themeColors.textSecondary }}>Fill in the details for each product</p>
        </div>
        <Button
          type="primary"
          icon={<EyeOutlined />}
          onClick={() => setPreviewDrawerVisible(true)}
          style={{ background: themeColors.primary, borderColor: themeColors.primary, height: '40px', borderRadius: '50px', padding: '0 24px', fontWeight: 600 }}
        >
          View Preview
        </Button>
      </div>

      {/* Main Layout: Product List (Left) + Form (Right) */}
      <div style={{ display: 'flex', gap: '12px', flex: 1, overflow: 'hidden' }}>
        {/* Left Sidebar - Product Listings */}
        <Card
          title={<div style={{ fontSize: '16px', fontWeight: 600, color: themeColors.text }}>Products listings</div>}
          style={{ width: '400px', borderRadius: '12px', border: '1px solid rgba(226, 232, 240, 0.6)', background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(20px)' }}
          styles={{ body: { padding: '16px', height: 'calc(100% - 65px)', overflowY: 'auto' } }}
        >
          {productLines.map((product, index) => (
            <div
              key={product.id}
              onClick={() => setSelectedProductIndex(index)}
              style={{
                padding: '16px',
                marginBottom: '12px',
                borderRadius: '8px',
                border: selectedProductIndex === index ? `1.5px solid ${themeColors.text}` : `1.5px solid ${themeColors.border}`,
                background: '#FFFFFF',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (selectedProductIndex !== index) {
                  e.currentTarget.style.background = '#F8FAFC';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedProductIndex !== index) {
                  e.currentTarget.style.background = '#FFFFFF';
                }
              }}
            >
              <div style={{ fontWeight: 600, fontSize: '15px', color: themeColors.text, marginBottom: '12px' }}>
                Product {index + 1}
              </div>

              {/* Tags Section */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '50px',
                  background: '#E0F2FE',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: '#0369A1'
                }}>
                  <AppstoreOutlined style={{ fontSize: '13px' }} />
                  {product.category || '-'}
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '50px',
                  background: '#F3E8FF',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: '#7E22CE'
                }}>
                  {product.productLine || '-'}
                </div>
              </div>

              {/* Quantity with Icon */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: themeColors.textSecondary, marginBottom: '8px' }}>
                <ShoppingCartOutlined style={{ fontSize: '14px' }} />
                <span>{product.quantity?.toLocaleString() || '-'} units</span>
              </div>

              {/* Delivery Date with Icon */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: themeColors.textSecondary, marginBottom: '12px' }}>
                <CalendarOutlined style={{ fontSize: '13px' }} />
                <span>{product.deliveryDate ? new Date(product.deliveryDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}</span>
              </div>

              {/* Description Note - Moved to Last with Increased Fill */}
              {product.description && (
                <div style={{
                  padding: '12px 14px',
                  borderRadius: '8px',
                  background: selectedProductIndex === index ? 'rgba(255, 107, 53, 0.15)' : '#F0F4F8',
                  borderLeft: `4px solid ${themeColors.primary}`,
                  fontSize: '13px',
                  color: themeColors.text,
                  lineHeight: '1.5',
                  fontWeight: 500
                }}>
                  {product.description}
                </div>
              )}
            </div>
          ))}
        </Card>

        {/* Right Side - Form Sections */}
        <div style={{ flex: 1, overflowY: 'auto', paddingRight: '10px', paddingBottom: '24px' }}>
          <Form form={form} layout="vertical" size="small">
            {/* Customer Information Preview - Read Only */}
            <Card className="customer-preview-card" style={{ ...cardStyle, background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)' }} styles={{ body: { padding: '16px' } }}>
              <div style={{ ...sectionHeaderStyle, color: '#3B82F6', marginBottom: '16px' }}>Customer Information</div>
              <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start', flexWrap: 'wrap', fontSize: '13px' }}>
                <div>
                  <div style={{ color: themeColors.textSecondary, marginBottom: '6px', fontSize: '11px', fontWeight: 500 }}>Company</div>
                  <div style={{ fontWeight: 600, color: themeColors.text }}>{enquiryData?.company || enquiryData?.customerName || 'Green Earth LLC'}</div>
                </div>
                <div>
                  <div style={{ color: themeColors.textSecondary, marginBottom: '6px', fontSize: '11px', fontWeight: 500 }}>Email ID</div>
                  <div style={{ fontWeight: 600, color: themeColors.text }}>{enquiryData?.email || enquiryData?.contactEmail || 'contact@greenearthllc.com'}</div>
                </div>
                <div>
                  <div style={{ color: themeColors.textSecondary, marginBottom: '6px', fontSize: '11px', fontWeight: 500 }}>Contact Number</div>
                  <div style={{ fontWeight: 600, color: themeColors.text }}>{enquiryData?.phone || enquiryData?.contactNumber || '+91 98765 43210'}</div>
                </div>
                <div>
                  <div style={{ color: themeColors.textSecondary, marginBottom: '6px', fontSize: '11px', fontWeight: 500 }}>GST No</div>
                  <div style={{ fontWeight: 600, color: themeColors.text }}>{enquiryData?.gstNumber || '27AABCT1234H1Z0'}</div>
                </div>
              </div>
            </Card>

            {/* Designer Spec - All specification fields */}
            <Card className="designer-card" style={cardStyle} styles={{ body: { padding: '16px' } }}>
              <div style={sectionHeaderStyle}>Designer Specifications</div>

              {/* Row 1: Job Name, Date, Cartone Style, Board Type */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                <Form.Item label="Job Name" name="jobName" rules={[{ required: true }]} style={{ marginBottom: 0 }}>
                  <Input placeholder="e.g. Funny Kids AHD" style={inputStyle} />
                </Form.Item>
                <Form.Item label="Date" name="date" rules={[{ required: true }]} style={{ marginBottom: 0 }}>
                  <DatePicker style={{ ...inputStyle, width: '100%' }} format="DD-MM-YYYY" />
                </Form.Item>
                <Form.Item label="Cartone Style" name="cartoneStyle" initialValue="Inner Box" style={{ marginBottom: 0 }}>
                  <Select
                    placeholder="Select style"
                    style={inputStyle}
                    options={[
                      { value: 'Inner Box', label: 'Inner Box' },
                      { value: 'Outer Box', label: 'Outer Box' },
                      { value: 'Master Carton', label: 'Master Carton' },
                    ]}
                  />
                </Form.Item>
                <Form.Item label="Board Type" name="boardType" initialValue="Cyber XL" style={{ marginBottom: 0 }}>
                  <Select
                    placeholder="Board type"
                    style={inputStyle}
                    options={[
                      { value: 'Cyber XL', label: 'Cyber XL' },
                      { value: 'Duplex Board', label: 'Duplex Board' },
                      { value: 'Art Card', label: 'Art Card' },
                      { value: 'Kraft Board', label: 'Kraft Board' },
                      { value: 'Grey Board', label: 'Grey Board' },
                      { value: 'Ivory Board', label: 'Ivory Board' },
                      { value: 'Chrome Board', label: 'Chrome Board' },
                    ]}
                  />
                </Form.Item>
              </div>

              {/* Row 2: Dimensions (L, W, H) + GSM */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                <Form.Item label="Length (mm)" name="size1" rules={[{ required: true }]} style={{ marginBottom: 0 }}>
                  <InputNumber placeholder="L" style={{ ...inputStyle, width: '100%' }} min={0} step={0.1} controls size="small" />
                </Form.Item>
                <Form.Item label="Width (mm)" name="size2" rules={[{ required: true }]} style={{ marginBottom: 0 }}>
                  <InputNumber placeholder="W" style={{ ...inputStyle, width: '100%' }} min={0} step={0.1} controls size="small" />
                </Form.Item>
                <Form.Item label="Height (mm)" name="size3" style={{ marginBottom: 0 }}>
                  <InputNumber placeholder="H" style={{ ...inputStyle, width: '100%' }} min={0} step={0.1} controls size="small" />
                </Form.Item>
                <Form.Item label="GSM" name="gsm" rules={[{ required: true }]} style={{ marginBottom: 0 }}>
                  <InputNumber placeholder="GSM" style={{ ...inputStyle, width: '100%' }} min={0} />
                </Form.Item>
              </div>

              {/* Row 3: Colour, Surface Finishing, Board Size, Reel & Cutting Size */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                <Form.Item label="Colour" name="colour" initialValue="CMYK + Pantone (6 Colour)" style={{ marginBottom: 0 }}>
                  <Select
                    placeholder="Select colour"
                    style={inputStyle}
                    options={[
                      { value: 'CMYK + Pantone (6 Colour)', label: 'CMYK + Pantone (6)' },
                      { value: '4 Colors CMYK', label: '4 Colors CMYK' },
                      { value: '1 Color', label: '1 Color' },
                      { value: '2 Colors', label: '2 Colors' },
                      { value: '5 Colors', label: '5 Colors' },
                    ]}
                  />
                </Form.Item>
                <Form.Item label="Surface Finishing" name="surfaceFinishing" style={{ marginBottom: 0 }}>
                  <Input placeholder="e.g. F-Flute (3 Ply)" style={inputStyle} />
                </Form.Item>
                <Form.Item label="Board Size (inch)" name="boardSize" style={{ marginBottom: 0 }}>
                  <Input placeholder="e.g. 29.5 x 24.5" style={inputStyle} />
                </Form.Item>
                <Form.Item label="Reel & Cutting Size" name="reelCuttingSize" style={{ marginBottom: 0 }}>
                  <Input placeholder="e.g. (R)29 x (C)24in" style={inputStyle} />
                </Form.Item>
              </div>

              {/* Row 5: Lamination, Window Size, Film, Special Colour */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                <Form.Item label="Lamination" name="laminationType" style={{ marginBottom: 0 }}>
                  <Select
                    placeholder="Select lamination"
                    style={inputStyle}
                    options={[
                      { value: 'Glossy', label: 'Glossy' },
                      { value: 'Matte', label: 'Matte' },
                      { value: 'Soft Touch', label: 'Soft Touch' },
                      { value: 'None', label: 'None' },
                    ]}
                  />
                </Form.Item>
                <Form.Item label="Window Size" name="windowSize" style={{ marginBottom: 0 }}>
                  <Input placeholder="Window size" style={inputStyle} />
                </Form.Item>
                <Form.Item label="Film" name="film" style={{ marginBottom: 0 }}>
                  <Input placeholder="Film type" style={inputStyle} />
                </Form.Item>
                <Form.Item label="Special Colour" name="specialColour" style={{ marginBottom: 0 }}>
                  <Input placeholder="Special colour" style={inputStyle} />
                </Form.Item>
              </div>

              {/* Row 6: Emboss, Po Qty, Running Sheet, Die No */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                <Form.Item label="Emboss" name="emboss" style={{ marginBottom: 0 }}>
                  <Select
                    placeholder="Emboss"
                    style={inputStyle}
                    options={[
                      { value: 'Yes', label: 'Yes' },
                      { value: 'No', label: 'No' },
                    ]}
                  />
                </Form.Item>
                <Form.Item label="Po Qty" name="qty" rules={[{ required: true }]} style={{ marginBottom: 0 }}>
                  <InputNumber placeholder="Quantity" style={{ ...inputStyle, width: '100%' }} min={0} />
                </Form.Item>
                <Form.Item label="Running Sheet" name="runningSheet" style={{ marginBottom: 0 }}>
                  <Input placeholder="e.g. 1500 + Waste" style={inputStyle} />
                </Form.Item>
                <Form.Item label="Die No" name="dieNo" initialValue="New" style={{ marginBottom: 0 }}>
                  <Select
                    placeholder="Die No"
                    style={inputStyle}
                    options={[
                      { value: 'New', label: 'New' },
                      { value: 'Existing', label: 'Existing' },
                    ]}
                  />
                </Form.Item>
              </div>

              {/* Row 7: UPS, Joint, Special Effects & Coating (2 columns) */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: '8px', marginBottom: '8px' }}>
                <Form.Item label="UPS" name="noOfUps" rules={[{ required: true }]} style={{ marginBottom: 0 }}>
                  <InputNumber placeholder="UPS" style={{ ...inputStyle, width: '100%' }} min={1} />
                </Form.Item>
                <Form.Item label="Joint" name="joint" style={{ marginBottom: 0 }}>
                  <Select
                    placeholder="Select joint"
                    style={inputStyle}
                    options={[
                      { value: 'Pasting', label: 'Pasting' },
                      { value: 'Folding', label: 'Folding' },
                      { value: 'Stitching', label: 'Stitching' },
                      { value: 'Gluing', label: 'Gluing' },
                    ]}
                  />
                </Form.Item>
                <Form.Item label="Special Effects & Coating" style={{ marginBottom: 0 }}>
                  <Select
                    mode="multiple"
                    placeholder="Select effects and coating"
                    value={selectedCoatingTypes}
                    onChange={handleCoatingTypeChange}
                    style={inputStyle}
                    options={[
                      { value: 'Printing', label: 'Printing' },
                      { value: 'UV Plating', label: 'UV Plating' },
                      { value: 'Lamination', label: 'Lamination' },
                      { value: 'Die', label: 'Die' },
                    ]}
                  />
                </Form.Item>
              </div>
            </Card>

            {/* Pricing */}
            <Card className="pricing-calculation-card" style={cardStyle} styles={{ body: { padding: '16px' } }}>
              <div style={sectionHeaderStyle}>Pricing</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                <div>
                  <div style={{ fontSize: '12px', marginBottom: '6px', color: themeColors.text }}>Single Board Rate</div>
                  <div style={{ ...inputStyle, display: 'flex', alignItems: 'center', background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)', padding: '0 11px', fontWeight: 600, color: '#3B82F6', fontSize: '13px' }}>
                    ₹{singleBoardRate.toFixed(4)}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', marginBottom: '6px', color: themeColors.text }}>No of Board Req</div>
                  <div style={{ ...inputStyle, display: 'flex', alignItems: 'center', background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)', padding: '0 11px', fontWeight: 600, color: '#3B82F6', fontSize: '13px' }}>
                    {noOfBoardReq}
                  </div>
                </div>
                <Form.Item label="Waste QTY" name="wasteQty" rules={[{ required: true }]} initialValue={0} style={{ marginBottom: 0 }}>
                  <InputNumber placeholder="Waste" style={{ ...inputStyle, width: '100%' }} min={0} />
                </Form.Item>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div>
                  <div style={{ fontSize: '12px', marginBottom: '6px', color: themeColors.text }}>Total Board Req</div>
                  <div style={{ ...inputStyle, display: 'flex', alignItems: 'center', background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)', padding: '0 11px', fontWeight: 600, color: '#3B82F6', fontSize: '13px' }}>
                    {totalBoardReq}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', marginBottom: '6px', color: themeColors.text }}>Total Board Rate</div>
                  <div style={{ ...inputStyle, display: 'flex', alignItems: 'center', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '0 11px', fontWeight: 700, color: '#10B981', fontSize: '14px' }}>
                    ₹{totalBoardRate.toFixed(2)}
                  </div>
                </div>
              </div>
              <div style={{ marginTop: '8px' }}>
                <Form.Item label="KG Rate (₹/kg)" name="kgRate" rules={[{ required: true }]} style={{ marginBottom: 0 }}>
                  <InputNumber placeholder="Rate per kg" style={{ ...inputStyle, width: '100%' }} min={0} prefix="₹" />
                </Form.Item>
              </div>
            </Card>

            {/* Workflow Process Cards - Draggable */}
            {processCards.length > 0 && (
              <Card className="workflow-process-card" style={cardStyle} styles={{ body: { padding: '16px' } }}>
                <div style={sectionHeaderStyle}>Workflow Process</div>
                <ProcessCardDragContainer
                  processCards={processCards}
                  totalQty={qty}
                  onReorder={handleReorderCards}
                  onUpdateCard={handleUpdateCard}
                  onRemoveCard={handleRemoveCard}
                />
              </Card>
            )}

            {/* Packing */}
            <Card className="packing-card" style={cardStyle} styles={{ body: { padding: '16px' } }}>
              <div style={sectionHeaderStyle}>Packing</div>
              <Form.Item label="Packing Charge" name="packingCharge" rules={[{ required: true }]} initialValue={0} style={{ marginBottom: 0 }}>
                <InputNumber placeholder="Charge" style={{ ...inputStyle, width: '100%' }} min={0} prefix="₹" />
              </Form.Item>
            </Card>

            {/* Final Pricing */}
            <Card className="final-pricing-card" style={cardStyle} styles={{ body: { padding: '16px' } }}>
              <div style={sectionHeaderStyle}>Final Pricing</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                <div>
                  <div style={{ fontSize: '12px', marginBottom: '6px', color: themeColors.text }}>Total Process Cost</div>
                  <div style={{ ...inputStyle, display: 'flex', alignItems: 'center', background: 'rgba(139, 92, 246, 0.05)', border: '1px solid rgba(139, 92, 246, 0.2)', padding: '0 11px', fontWeight: 700, color: '#8B5CF6', fontSize: '14px' }}>
                    ₹{totalProcessCost.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', marginBottom: '6px', color: themeColors.text }}>Total Rate</div>
                  <div style={{ ...inputStyle, display: 'flex', alignItems: 'center', background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)', padding: '0 11px', fontWeight: 700, color: '#3B82F6', fontSize: '14px' }}>
                    ₹{totalRate.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', marginBottom: '6px', color: themeColors.text }}>Single Box Rate</div>
                  <div style={{ ...inputStyle, display: 'flex', alignItems: 'center', background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)', padding: '0 11px', fontWeight: 700, color: '#3B82F6', fontSize: '14px' }}>
                    ₹{singleBoxRate.toFixed(4)}
                  </div>
                </div>
                <Form.Item label="Margin (%)" name="margin" initialValue={0} style={{ marginBottom: 0 }}>
                  <InputNumber placeholder="Margin" style={{ ...inputStyle, width: '100%' }} min={0} max={100} suffix="%" />
                </Form.Item>
                <div>
                  <div style={{ fontSize: '12px', marginBottom: '6px', color: themeColors.text }}>Rate with Margin</div>
                  <div style={{ ...inputStyle, display: 'flex', alignItems: 'center', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '0 11px', fontWeight: 700, color: '#10B981', fontSize: '14px' }}>
                    ₹{rateWithMargin.toFixed(2)}
                  </div>
                </div>
                <Form.Item label="Tax Rate (%)" name="taxRate" initialValue={18} style={{ marginBottom: 0 }}>
                  <InputNumber placeholder="Tax" style={{ ...inputStyle, width: '100%' }} min={0} max={100} suffix="%" />
                </Form.Item>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px' }}>
                <div>
                  <div style={{ fontSize: '12px', marginBottom: '6px', color: themeColors.text }}>Grand Total</div>
                  <div style={{ ...inputStyle, display: 'flex', alignItems: 'center', background: 'rgba(34, 197, 94, 0.05)', border: '1px solid rgba(34, 197, 94, 0.3)', padding: '0 11px', fontWeight: 700, color: '#22C55E', fontSize: '15px' }}>
                    ₹{grandTotal.toFixed(2)}
                  </div>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="form-actions" style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '12px', paddingBottom: '20px' }}>
              <Button onClick={() => {
                message.info('Cancelled');
                navigate(-1);
              }} style={{ height: '36px', borderRadius: '50px', padding: '0 20px', borderColor: themeColors.text, color: themeColors.text }}>
                Cancel
              </Button>
              <Button type="primary" onClick={handleSubmit} style={{ background: '#0F172A', borderColor: '#0F172A', height: '36px', borderRadius: '50px', padding: '0 20px' }}>
                Next Product
              </Button>
            </div>
          </Form>
        </div>
      </div>

      {/* Preview Drawer */}
      <Drawer
          title={null}
          placement="right"
          onClose={() => setPreviewDrawerVisible(false)}
          open={previewDrawerVisible}
          closable={false}
          width={900}
          styles={{
            body: { padding: 0, background: '#F8FAFC' },
          }}
        >
          {/* Drawer Header */}
          <div style={{ background: '#FFFFFF', padding: '20px 24px', borderBottom: `1px solid ${themeColors.borderLight}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <EyeOutlined style={{ fontSize: '24px', color: themeColors.primary }} />
              <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 600, color: themeColors.text }}>Quotation Preview</h2>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Button icon={<DownloadOutlined />} onClick={handleDownloadPDF} style={{ borderRadius: '50px', height: '36px' }}>
                Download PDF
              </Button>
              <Button
                type="text"
                onClick={() => setPreviewDrawerVisible(false)}
                style={{ fontSize: '20px', color: themeColors.textSecondary }}
              >
                ×
              </Button>
            </div>
          </div>

          {/* Preview Content */}
          <div className="preview-body" style={{ padding: '24px', overflowY: 'auto', height: 'calc(100vh - 88px)' }}>
            <div style={{ background: '#FFFFFF', border: `1px solid ${themeColors.borderLight}`, borderRadius: '12px', padding: '24px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)' }}>
              {/* Invoice Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', paddingBottom: '16px', borderBottom: `2px solid ${themeColors.border}` }}>
                <div>
                  <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: `linear-gradient(135deg, ${themeColors.primary} 0%, #E65525 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontSize: '24px', fontWeight: 700, marginBottom: '12px', boxShadow: '0 4px 12px rgba(255, 107, 53, 0.3)' }}>
                    P
                  </div>
                  <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 700, color: themeColors.text, letterSpacing: '-0.01em' }}>PRINTING PRESS</h1>
                  <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: themeColors.textSecondary, lineHeight: '1.7' }}>
                    Industrial Area, Chennai 600001<br />
                    <strong>Phone:</strong> +91 98765 43210<br />
                    <strong>Email:</strong> info@printingpress.com<br />
                    <strong>GST:</strong> 33AAAAA0000A1Z5
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ display: 'inline-block', background: 'rgba(255, 107, 53, 0.1)', padding: '8px 16px', borderRadius: '8px', marginBottom: '12px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: themeColors.primary, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Quotation</div>
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: themeColors.text, marginBottom: '6px' }}>QUO-2026-AUTO</div>
                  <div style={{ fontSize: '12px', color: themeColors.textSecondary }}>
                    <strong>Date:</strong> {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </div>
                </div>
              </div>

              {/* Bill To Section */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '16px' }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: themeColors.textSecondary, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '12px', paddingBottom: '8px', borderBottom: `2px solid ${themeColors.primary}`, display: 'inline-block' }}>Bill To</div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: themeColors.text, marginBottom: '8px' }}>{form.getFieldValue('customerName') || 'Customer Name'}</div>
                  <div style={{ fontSize: '12px', color: themeColors.textSecondary, lineHeight: '1.8' }}>
                    {enquiryData?.phone && <div><strong>Phone:</strong> {enquiryData.phone}</div>}
                    {enquiryData?.email && <div><strong>Email:</strong> {enquiryData.email}</div>}
                    {enquiryData?.gstNumber && <div><strong>GST:</strong> {enquiryData.gstNumber}</div>}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: themeColors.textSecondary, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '12px', paddingBottom: '8px', borderBottom: `2px solid ${themeColors.primary}`, display: 'inline-block' }}>Job Details</div>
                  <div style={{ fontSize: '12px', color: themeColors.textSecondary, lineHeight: '1.8' }}>
                    <div><strong>Job Name:</strong> {form.getFieldValue('jobName') || '-'}</div>
                    <div><strong>Item:</strong> {form.getFieldValue('itemName') || '-'}</div>
                    <div><strong>Quantity:</strong> {qty ? qty.toLocaleString() : '-'} units</div>
                  </div>
                </div>
              </div>

              {/* Notes/Description from Enquiry */}
              {enquiryData?.description && (
                <div style={{ marginBottom: '16px', background: 'rgba(255, 107, 53, 0.08)', border: `1px solid rgba(255, 107, 53, 0.3)`, borderRadius: '8px', padding: '12px 14px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: themeColors.primary, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '6px' }}>Special Note</div>
                  <div style={{ fontSize: '13px', color: themeColors.text, lineHeight: '1.6' }}>{enquiryData.description}</div>
                </div>
              )}

              {/* Workflow Process - Invoice Line Items Table */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, color: themeColors.textSecondary, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '12px', paddingBottom: '6px', borderBottom: `2px solid ${themeColors.border}` }}>Line Items</div>

                {/* Table Header */}
                <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr 1fr', gap: '16px', padding: '12px 16px', background: 'rgba(248, 250, 252, 1)', borderRadius: '8px 8px 0 0', borderBottom: `1px solid ${themeColors.border}` }}>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: themeColors.textSecondary, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Description</div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: themeColors.textSecondary, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Details</div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: themeColors.textSecondary, letterSpacing: '0.05em', textTransform: 'uppercase', textAlign: 'right' }}>Amount</div>
                </div>

                {/* Board Cost Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr 1fr', gap: '16px', padding: '14px 16px', borderBottom: `1px solid ${themeColors.borderLight}`, background: '#FFFFFF' }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: themeColors.text, marginBottom: '4px' }}>Board Material</div>
                    <div style={{ fontSize: '12px', color: themeColors.textSecondary }}>{form.getFieldValue('boardType') || 'Board Type'} - {gsm}gsm</div>
                  </div>
                  <div style={{ fontSize: '12px', color: themeColors.textSecondary, lineHeight: '1.6' }}>
                    <div>Size: {size1 || 0} × {size2 || 0} cm</div>
                    <div>Boards Req: {totalBoardReq}</div>
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: themeColors.text, textAlign: 'right' }}>₹{totalBoardRate.toFixed(2)}</div>
                </div>

                {/* Process Cards as Line Items */}
                {processCards.length > 0 && processCards.map((card, index) => {
                  const { data } = card;
                  const getProcessDetails = () => {
                    if ('printingType' in data) {
                      return `Type: ${data.printingType} | Colors: ${data.colors}`;
                    } else if ('uvType' in data) {
                      return `Type: ${data.uvType} | Coverage: ${data.coverageArea}`;
                    } else if ('laminationType' in data) {
                      return `Type: ${data.laminationType} | Thickness: ${data.thickness}`;
                    } else if ('dieType' in data) {
                      return `Die Charge: ₹${data.dieCharge} | Cut Rate: ₹${data.dieCutRatePer1000}/1000`;
                    }
                    return '';
                  };

                  return (
                    <div key={card.id} style={{ display: 'grid', gridTemplateColumns: '3fr 2fr 1fr', gap: '16px', padding: '14px 16px', borderBottom: `1px solid ${themeColors.borderLight}`, background: '#FFFFFF' }}>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: themeColors.text, marginBottom: '4px' }}>{card.type}</div>
                        <div style={{ fontSize: '12px', color: themeColors.textSecondary }}>Process #{index + 1}</div>
                      </div>
                      <div style={{ fontSize: '12px', color: themeColors.textSecondary, lineHeight: '1.6' }}>
                        {getProcessDetails()}
                      </div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: themeColors.text, textAlign: 'right' }}>₹{card.data.totalCost.toFixed(2)}</div>
                    </div>
                  );
                })}

                {/* Packing Row */}
                {packingCharge > 0 && (
                  <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr 1fr', gap: '16px', padding: '14px 16px', borderBottom: `1px solid ${themeColors.borderLight}`, background: '#FFFFFF' }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: themeColors.text }}>Packing & Handling</div>
                    </div>
                    <div style={{ fontSize: '12px', color: themeColors.textSecondary }}>Standard packaging</div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: themeColors.text, textAlign: 'right' }}>₹{packingCharge.toFixed(2)}</div>
                  </div>
                )}
              </div>

              {/* Pricing Summary Section */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ width: '380px' }}>
                  {/* Subtotal and Calculations */}
                  <div style={{ background: 'rgba(248, 250, 252, 1)', padding: '16px', borderRadius: '8px', marginBottom: '12px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: themeColors.textSecondary, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '12px' }}>Calculation Summary</div>

                    <div style={{ fontSize: '13px', lineHeight: '1.8' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
                        <span style={{ color: themeColors.textSecondary }}>Subtotal</span>
                        <span style={{ fontWeight: 600, color: themeColors.text }}>₹{totalRate.toFixed(2)}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
                        <span style={{ color: themeColors.textSecondary }}>Single Box Rate</span>
                        <span style={{ fontWeight: 600, color: themeColors.text }}>₹{singleBoxRate.toFixed(4)}</span>
                      </div>
                      {margin > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
                          <span style={{ color: themeColors.textSecondary }}>Margin ({margin}%)</span>
                          <span style={{ fontWeight: 600, color: themeColors.text }}>₹{(totalRate * margin / 100).toFixed(2)}</span>
                        </div>
                      )}
                      <Divider style={{ margin: '10px 0' }} />
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
                        <span style={{ fontWeight: 600, color: themeColors.text }}>Total Before Tax</span>
                        <span style={{ fontWeight: 700, color: themeColors.text }}>₹{rateWithMargin.toFixed(2)}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
                        <span style={{ color: themeColors.textSecondary }}>GST ({taxRate}%)</span>
                        <span style={{ fontWeight: 600, color: themeColors.text }}>₹{tax.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Grand Total - Highlighted */}
                  <div style={{ background: `linear-gradient(135deg, ${themeColors.primary} 0%, #E65525 100%)`, padding: '18px 20px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(255, 107, 53, 0.3)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.9)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '4px' }}>Grand Total</div>
                        <div style={{ fontSize: '28px', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.01em' }}>₹{grandTotal.toFixed(2)}</div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '6px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                    <div style={{ fontSize: '11px', color: '#3B82F6', lineHeight: '1.6' }}>
                      <div><strong>Total Quantity:</strong> {qty ? qty.toLocaleString() : 0} units</div>
                      {noOfUps > 0 && <div><strong>UPS:</strong> {noOfUps}</div>}
                      {totalBoardReq > 0 && <div><strong>Total Boards:</strong> {totalBoardReq}</div>}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
      </Drawer>
    </div>
  );
};

export default CreateQuotation;
