import { Form, Input, Select, InputNumber, Button, Card, message, Drawer, Alert, Tag } from 'antd';
import { EyeOutlined, DownloadOutlined, ShoppingCartOutlined, CalendarOutlined, MailOutlined, PhoneOutlined, IdcardOutlined, CheckCircleOutlined, ColumnWidthOutlined, ShareAltOutlined } from '@ant-design/icons';
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
  const [showQuotationPreview, setShowQuotationPreview] = useState(false);

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
  const plateRate = Form.useWatch('plateRate', form) || 0;

  // Calculations
  const singleBoardRate = size1 && size2 && gsm && kgRate ? (size1 * size2 * gsm * kgRate) / 1000000 : 0;
  const noOfBoardReq = qty && noOfUps ? Math.ceil(qty / noOfUps) : 0;
  const totalBoardReq = noOfBoardReq + wasteQty;
  const totalBoardRate = totalBoardReq * singleBoardRate;

  // Process costs from draggable cards
  const totalProcessCost = processCards.reduce((sum, card) => sum + (card.data.totalCost || 0), 0);

  // Final pricing calculations
  const totalRate = totalBoardRate + totalProcessCost + packingCharge + plateRate;
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
          name: 'ANUSHKA PHOTOCARD',
          category: 'Photocards',
          length: 85,
          width: 55,
          height: null,
          quantity: 1000,
          description: 'Product photocard',
          deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: '2',
          name: 'TOP - 286 X 199 X 38',
          category: 'Boxes',
          length: 286,
          width: 199,
          height: 38,
          quantity: 500,
          description: 'Top box with dimensions',
          deliveryDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: '3',
          name: 'EVELY SLIPS PHOTOCARD',
          category: 'Photocards',
          length: 150,
          width: 100,
          height: null,
          quantity: 2000,
          description: 'Product photocard',
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

  // Update form qty when selected product changes
  useEffect(() => {
    if (productLines.length > 0 && productLines[selectedProductIndex]) {
      const selectedProduct = productLines[selectedProductIndex];
      form.setFieldsValue({
        qty: selectedProduct.quantity || 0,
      });
    }
  }, [selectedProductIndex, productLines, form]);

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
            // Printing: (QTY/1000) × Total Print Rate (accounts for backside)
            updatedData.totalCost = (qty / 1000) * (updatedData.totalPrintRate || 0);
          } else if ('uvType' in updatedData && 'coverageArea' in updatedData) {
            // UV Plate/UV Plating: (QTY/1000) × Rate per 1000
            updatedData.totalCost = (qty / 1000) * (updatedData.ratePer1000 || 0);
          } else if ('laminationType' in updatedData) {
            // Lamination: (QTY/1000) × Total Lamination Rate (accounts for backside)
            updatedData.totalCost = (qty / 1000) * (updatedData.totalLaminationRate || 0);
          } else if ('dieType' in updatedData) {
            // Die: Die Charge + ((QTY/1000) × Die Cut Rate per 1000)
            updatedData.totalCost = (updatedData.dieCharge || 0) + ((qty / 1000) * (updatedData.dieCutRatePer1000 || 0));
          } else if ('varnishType' in updatedData) {
            // Varnish: (QTY/1000) × Rate per 1000
            updatedData.totalCost = (qty / 1000) * (updatedData.ratePer1000 || 0);
          } else if ('fluteType' in updatedData) {
            // Flute: (QTY/1000) × Total Flute Rate
            updatedData.totalCost = (qty / 1000) * (updatedData.totalFluteRate || 0);
          } else if ('pastingType' in updatedData) {
            // Pasting: use appropriate total rate based on pasting type
            // Single Window Pasting uses totalWindowPastingRate
            // Single Side/4 Corner Pasting uses totalPastingRate
            // B2B Pasting: calculate totalPastingRate from all previous pasting cards
            if (card.type === 'B2B Pasting') {
              // Sum up rates from Single Window Pasting and Single Side/4 Corner Pasting
              let totalFromPreviousPasting = 0;
              processCards.forEach((prevCard) => {
                if (prevCard.id !== card.id && 'pastingType' in prevCard.data) {
                  if (prevCard.type === 'Single Window Pasting') {
                    totalFromPreviousPasting += (prevCard.data.totalWindowPastingRate || 0);
                  } else if (prevCard.type === 'Single Side/4 Corner Pasting') {
                    totalFromPreviousPasting += (prevCard.data.totalPastingRate || 0);
                  }
                }
              });
              updatedData.totalPastingRate = totalFromPreviousPasting;
              updatedData.totalCost = (qty / 1000) * totalFromPreviousPasting;
            } else {
              const rateToUse = card.type === 'Single Window Pasting'
                ? (updatedData.totalWindowPastingRate || 0)
                : (updatedData.totalPastingRate || 0);
              updatedData.totalCost = (qty / 1000) * rateToUse;
            }
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
    message.loading({ content: 'Creating quotation...', key: 'submit' });

    const quotationData = {
      ...form.getFieldsValue(),
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

  return (
    <div className="create-quotation-page-container" data-testid="create-quotation-page" style={{ height: 'calc(100vh - 84px)', display: 'flex', flexDirection: 'column' }}>
      {/* Header with Customer Information and View Preview Button */}
      <Card className="quotation-header" style={{ ...cardStyle, background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)', marginBottom: '12px' }} styles={{ body: { padding: '16px' } }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <div style={{ ...sectionHeaderStyle, color: '#3B82F6', marginBottom: '10px', fontSize: '18px' }}>
              Create Quotation - {enquiryData?.company || enquiryData?.customerName || 'Customer Name'}
            </div>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap', fontSize: '13px', color: themeColors.text }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MailOutlined style={{ fontSize: '14px' }} />
                <span>{enquiryData?.email || enquiryData?.contactEmail || 'contact@greenearthllc.com'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <PhoneOutlined style={{ fontSize: '14px' }} />
                <span>{enquiryData?.phone || enquiryData?.contactNumber || '+91 98765 43210'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <IdcardOutlined style={{ fontSize: '14px' }} />
                <span>{enquiryData?.gstNumber || '27AABCT1234H1Z0'}</span>
              </div>
            </div>
          </div>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => setPreviewDrawerVisible(true)}
            style={{ background: '#0F172A', borderColor: '#0F172A', height: '40px', borderRadius: '50px', padding: '0 24px', fontWeight: 600 }}
          >
            View Quotation
          </Button>
        </div>
      </Card>

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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{ fontWeight: 600, fontSize: '15px', color: themeColors.text }}>
                  {product.name || product.category || `Product ${index + 1}`}
                </div>
                {index === 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '3px 10px', borderRadius: '50px', background: '#DCFCE7', fontSize: '11px', fontWeight: 600, color: '#16A34A' }}>
                    <CheckCircleOutlined style={{ fontSize: '12px' }} />
                    Completed
                  </div>
                )}
              </div>

              {/* Tags Section */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                {product.category && (
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
                    {product.category}
                  </div>
                )}
              </div>

              {/* Dimensions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: themeColors.textSecondary, marginBottom: '8px' }}>
                <ColumnWidthOutlined style={{ fontSize: '14px' }} />
                <span>
                  {product.length || 0} mm × {product.width || 0} mm
                  {product.height ? ` × ${product.height} mm` : ''}
                </span>
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
            {/* Product Title */}
            <div style={{
              fontSize: '16px',
              fontWeight: 600,
              color: themeColors.text,
              marginBottom: '12px',
            }}>
              {productLines[selectedProductIndex]?.name || productLines[selectedProductIndex]?.category || `Product ${selectedProductIndex + 1}`}
            </div>

            {/* Designer Spec - All specification fields */}
            <Card className="designer-card" style={cardStyle} styles={{ body: { padding: '16px' } }}>
              <div style={sectionHeaderStyle}>Designer Specifications</div>

              {/* Row 1: Special Colour, Colour, Surface Finishing, Die No */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                <Form.Item label="Special Colour" name="specialColour" style={{ marginBottom: 0 }}>
                  <Input placeholder="e.g. Pantone 123" style={inputStyle} />
                </Form.Item>
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

              {/* Row 2: Window Size, Film */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                <Form.Item label="Window Size" name="windowSize" style={{ marginBottom: 0 }}>
                  <Input placeholder="e.g. 100 x 150mm" style={inputStyle} />
                </Form.Item>
                <Form.Item label="Film" name="film" style={{ marginBottom: 0 }}>
                  <Input placeholder="Film type" style={inputStyle} />
                </Form.Item>
              </div>

              {/* Row 3: Special Effects & Coating */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                <div style={{ gridColumn: 'span 4' }}>
                  <Form.Item label="Special Effects & Coating" style={{ marginBottom: 0 }}>
                    <Select
                      mode="multiple"
                      placeholder="Select effects and coating"
                      value={selectedCoatingTypes}
                      onChange={handleCoatingTypeChange}
                      style={inputStyle}
                      options={[
                        { value: 'Printing', label: 'Printing' },
                        { value: 'Varnish', label: 'Varnish' },
                        { value: 'UV Plate', label: 'UV Plate' },
                        { value: 'Flute', label: 'Flute' },
                        { value: 'Die', label: 'Die' },
                        { value: 'Single Window Pasting', label: 'Single Window Pasting' },
                        { value: 'Single Side/4 Corner Pasting', label: 'Single Side/4 Corner Pasting' },
                        { value: 'B2B Pasting', label: 'B2B Pasting' },
                      ]}
                    />
                  </Form.Item>
                </div>
              </div>
            </Card>

            {/* Board Details */}
            <Card className="board-details-card" style={cardStyle} styles={{ body: { padding: '16px' } }}>
              <div style={sectionHeaderStyle}>Board Details</div>

              {/* Row 1: Board, GSM, Board Size (Length & Width), UPS */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                <Form.Item label="Board" name="board" rules={[{ required: true }]} style={{ marginBottom: 0 }}>
                  <Select
                    placeholder="Select board"
                    style={inputStyle}
                    options={[
                      { value: 'art-paper-130gsm', label: 'Art Paper 130 GSM' },
                      { value: 'art-paper-170gsm', label: 'Art Paper 170 GSM' },
                      { value: 'art-paper-210gsm', label: 'Art Paper 210 GSM' },
                      { value: 'art-card-250gsm', label: 'Art Card 250 GSM' },
                      { value: 'art-card-300gsm', label: 'Art Card 300 GSM' },
                      { value: 'duplex-board-250gsm', label: 'Duplex Board 250 GSM' },
                      { value: 'duplex-board-300gsm', label: 'Duplex Board 300 GSM' },
                      { value: 'kraft-board', label: 'Kraft Board' },
                      { value: 'corrugated-board', label: 'Corrugated Board' },
                    ]}
                  />
                </Form.Item>
                <Form.Item label="GSM" name="gsm" rules={[{ required: true }]} style={{ marginBottom: 0 }}>
                  <InputNumber placeholder="GSM" style={{ ...inputStyle, width: '100%' }} min={0} />
                </Form.Item>
                <div>
                  <div style={{ fontSize: '13px', marginBottom: '6px', color: themeColors.text, fontWeight: 500 }}>Board Size (inch)</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
                    <Form.Item name="boardSizeLength" style={{ marginBottom: 0 }}>
                      <InputNumber placeholder="L" style={{ ...inputStyle, width: '100%' }} min={0} step={0.1} />
                    </Form.Item>
                    <Form.Item name="boardSizeWidth" style={{ marginBottom: 0 }}>
                      <InputNumber placeholder="W" style={{ ...inputStyle, width: '100%' }} min={0} step={0.1} />
                    </Form.Item>
                  </div>
                </div>
                <Form.Item label="UPS" name="noOfUps" rules={[{ required: true }]} style={{ marginBottom: 0 }}>
                  <InputNumber placeholder="Units Per Sheet" style={{ ...inputStyle, width: '100%' }} min={1} />
                </Form.Item>
              </div>

              {/* Row 2: Waste QTY */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                <Form.Item label="Waste QTY" name="wasteQty" rules={[{ required: true }]} initialValue={0} style={{ marginBottom: 0 }}>
                  <InputNumber placeholder="Waste" style={{ ...inputStyle, width: '100%' }} min={0} />
                </Form.Item>
              </div>

              {/* Summary Section */}
              <div style={{ marginTop: '16px', padding: '16px', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)', borderRadius: '8px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: themeColors.text, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Summary</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gap: '8px' }}>
                  <div>
                    <div style={{ fontSize: '11px', marginBottom: '6px', color: themeColors.textSecondary, fontWeight: 600 }}>Running Sheet</div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#8B5CF6' }}>
                      {noOfUps > 0 ? noOfBoardReq : 0}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', marginBottom: '6px', color: themeColors.textSecondary, fontWeight: 600 }}>Single Board Rate</div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#3B82F6' }}>
                      ₹{singleBoardRate.toFixed(4)}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', marginBottom: '6px', color: themeColors.textSecondary, fontWeight: 600 }}>No: of Board Requested</div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#3B82F6' }}>
                      {noOfBoardReq}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', marginBottom: '6px', color: themeColors.textSecondary, fontWeight: 600 }}>Total Board Requested</div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#3B82F6' }}>
                      {totalBoardReq}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', marginBottom: '6px', color: themeColors.textSecondary, fontWeight: 600 }}>Total Board Rate</div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#10B981' }}>
                      ₹{totalBoardRate.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Other Details */}
            <Card className="other-details-card" style={cardStyle} styles={{ body: { padding: '16px' } }}>
              <div style={sectionHeaderStyle}>Other Details</div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <Form.Item label="Plate Rate" name="plateRate" initialValue={0} style={{ marginBottom: 0, flex: '0 0 269px' }}>
                  <InputNumber placeholder="Enter plate rate" style={{ ...inputStyle, width: '100%' }} min={0} prefix="₹" />
                </Form.Item>
                <Form.Item label="Packing Charge" name="packingCharge" rules={[{ required: true }]} initialValue={0} style={{ marginBottom: 0, flex: '0 0 269px' }}>
                  <InputNumber placeholder="Enter packing charge" style={{ ...inputStyle, width: '100%' }} min={0} prefix="₹" />
                </Form.Item>
              </div>
            </Card>

            {/* Workflow Stages Cards - Draggable */}
            {processCards.length > 0 && (
              <Card className="workflow-process-card" style={cardStyle} styles={{ body: { padding: '16px' } }}>
                <div style={sectionHeaderStyle}>Workflow Stages</div>
                <Alert
                  message="These are the workflow stages that will be followed in the Job Order. You can change the order by dragging and repositioning the cards."
                  type="info"
                  showIcon
                  style={{
                    marginTop: '8px',
                    marginBottom: '16px',
                    borderRadius: '8px',
                  }}
                />
                <ProcessCardDragContainer
                  processCards={processCards}
                  totalQty={qty}
                  onReorder={handleReorderCards}
                  onUpdateCard={handleUpdateCard}
                  onRemoveCard={handleRemoveCard}
                />
              </Card>
            )}

            {/* Pricing Summary */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{
                width: '380px',
                background: '#FFFFFF',
                borderRadius: '10px',
                border: `1px solid ${themeColors.border}`,
                padding: '14px 16px',
              }}>
                <div style={{ fontSize: '15px', fontWeight: 600, color: themeColors.text, marginBottom: '12px' }}>
                  Pricing Summary
                </div>

                {/* Summary Rows */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: `1px solid ${themeColors.borderLight}` }}>
                    <span style={{ fontSize: '13px', color: themeColors.textSecondary }}>Total Board Rate</span>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: themeColors.text }}>₹{totalBoardRate.toFixed(2)}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: `1px solid ${themeColors.borderLight}` }}>
                    <span style={{ fontSize: '13px', color: themeColors.textSecondary }}>Total Process Cost</span>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: themeColors.text }}>₹{totalProcessCost.toFixed(2)}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: `1px solid ${themeColors.borderLight}` }}>
                    <span style={{ fontSize: '13px', color: themeColors.textSecondary }}>Plate Rate</span>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: themeColors.text }}>₹{plateRate.toFixed(2)}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: `1px solid ${themeColors.borderLight}` }}>
                    <span style={{ fontSize: '13px', color: themeColors.textSecondary }}>Packing Charge</span>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: themeColors.text }}>₹{packingCharge.toFixed(2)}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${themeColors.border}` }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: themeColors.text }}>Sub Total</span>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: themeColors.text }}>₹{totalRate.toFixed(2)}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: `1px solid ${themeColors.borderLight}` }}>
                    <span style={{ fontSize: '13px', color: themeColors.textSecondary }}>Margin</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Form.Item name="margin" initialValue={0} style={{ marginBottom: 0 }}>
                        <InputNumber
                          placeholder="0"
                          style={{ ...inputStyle, width: '70px', height: '32px' }}
                          size="small"
                          min={0}
                          max={100}
                          suffix="%"
                        />
                      </Form.Item>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: themeColors.text }}>
                        (₹{(totalRate * margin / 100).toFixed(2)})
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: `1px solid ${themeColors.borderLight}` }}>
                    <span style={{ fontSize: '13px', color: themeColors.textSecondary }}>Single Box Rate</span>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: themeColors.text }}>₹{singleBoxRate.toFixed(4)}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', marginTop: '4px' }}>
                    <span style={{ fontSize: '15px', fontWeight: 700, color: themeColors.text }}>Grand Total</span>
                    <span style={{ fontSize: '17px', fontWeight: 800, color: themeColors.text }}>₹{rateWithMargin.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

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
          onClose={() => {
            setPreviewDrawerVisible(false);
            setShowQuotationPreview(false);
          }}
          open={previewDrawerVisible}
          closable={false}
          styles={{
            body: { padding: 0, background: showQuotationPreview ? '#F8FAFC' : 'linear-gradient(135deg, #F0F4F8 0%, #E8EDF2 25%, #F5F0F8 50%, #E8F0F2 75%, #F0F8F4 100%)' },
            wrapper: { width: '900px' },
          }}
        >
          {/* Drawer Header */}
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
              {showQuotationPreview ? 'Quotation Preview' : 'View'}
            </h2>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              {!showQuotationPreview && (
                <Button
                  type="primary"
                  icon={<EyeOutlined />}
                  onClick={() => setShowQuotationPreview(true)}
                  style={{
                    background: '#0F172A',
                    borderColor: '#0F172A',
                    height: '40px',
                    borderRadius: '50px',
                    padding: '0 24px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  View Quotation
                </Button>
              )}
              {showQuotationPreview && (
                <>
                  <Button
                    icon={<DownloadOutlined />}
                    onClick={handleDownloadPDF}
                    style={{
                      height: '40px',
                      borderRadius: '50px',
                      padding: '0 20px',
                      fontWeight: 500,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    Download PDF
                  </Button>
                  <Button
                    icon={<ShareAltOutlined />}
                    onClick={() => {
                      message.success('Share PDF...');
                    }}
                    style={{
                      height: '40px',
                      borderRadius: '50px',
                      padding: '0 20px',
                      fontWeight: 500,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    Share PDF
                  </Button>
                  <Button
                    onClick={() => setShowQuotationPreview(false)}
                    style={{
                      height: '40px',
                      borderRadius: '50px',
                      padding: '0 24px',
                      fontWeight: 600,
                    }}
                  >
                    Back to Workflow
                  </Button>
                </>
              )}
              <Button
                type="text"
                onClick={() => {
                  setPreviewDrawerVisible(false);
                  setShowQuotationPreview(false);
                }}
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
          </div>

          {/* Content - Conditional rendering based on view mode */}
          {!showQuotationPreview ? (
            /* Workflow Stages View */
            <div style={{ padding: '20px', overflowY: 'auto', height: 'calc(100vh - 88px)' }}>
              <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                background: '#FFFFFF',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                padding: '24px'
              }}>
                {/* Products Title */}
                <div style={{ marginBottom: '20px' }}>
                  <h2 style={{
                    margin: 0,
                    fontSize: '24px',
                    fontWeight: 700,
                    color: themeColors.text,
                    letterSpacing: '0.02em'
                  }}>Products</h2>
                </div>

                {/* Products with Workflow Stages */}
                {productLines.map((product, productIndex) => (
                  <div key={product.id} style={{ marginBottom: '16px' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '8px 0',
                      marginBottom: '8px'
                    }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '14px', color: themeColors.text }}>
                          {product.name || product.category || `Product ${productIndex + 1}`}
                        </div>
                        <div style={{ fontSize: '12px', color: themeColors.textSecondary, marginTop: '2px' }}>
                          Quantity: {product.quantity?.toLocaleString() || 0}
                        </div>
                      </div>
                      <Tag color="blue" style={{ fontSize: '11px', padding: '2px 8px' }}>
                        Product {productIndex + 1} of {productLines.length}
                      </Tag>
                    </div>

                    <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${themeColors.border}`, marginBottom: '8px' }}>
                      <thead>
                        <tr style={{ background: '#F8FAFC' }}>
                          <th style={{
                            padding: '8px 12px',
                            textAlign: 'left',
                            fontWeight: 600,
                            fontSize: '11px',
                            color: themeColors.textSecondary,
                            border: `1px solid ${themeColors.border}`
                          }}>Stage</th>
                          <th style={{
                            padding: '8px 12px',
                            textAlign: 'left',
                            fontWeight: 600,
                            fontSize: '11px',
                            color: themeColors.textSecondary,
                            border: `1px solid ${themeColors.border}`
                          }}>Details</th>
                          <th style={{
                            padding: '8px 12px',
                            textAlign: 'right',
                            fontWeight: 600,
                            fontSize: '11px',
                            color: themeColors.textSecondary,
                            border: `1px solid ${themeColors.border}`,
                            width: '120px'
                          }}>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ padding: '8px 12px', fontSize: '12px', fontWeight: 600, color: themeColors.text, border: `1px solid ${themeColors.border}` }}>Board</td>
                          <td style={{ padding: '8px 12px', fontSize: '11px', color: themeColors.textSecondary, border: `1px solid ${themeColors.border}` }}>
                            Art Card 300gsm - 20" × 30"
                          </td>
                          <td style={{ padding: '8px 12px', fontSize: '12px', fontWeight: 600, textAlign: 'right', color: themeColors.text, border: `1px solid ${themeColors.border}` }}>
                            ₹{(Math.random() * 2000 + 1000).toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: '8px 12px', fontSize: '12px', fontWeight: 600, color: themeColors.text, border: `1px solid ${themeColors.border}` }}>Printing</td>
                          <td style={{ padding: '8px 12px', fontSize: '11px', color: themeColors.textSecondary, border: `1px solid ${themeColors.border}` }}>
                            4 Color CMYK - Offset
                          </td>
                          <td style={{ padding: '8px 12px', fontSize: '12px', fontWeight: 600, textAlign: 'right', color: themeColors.text, border: `1px solid ${themeColors.border}` }}>
                            ₹{(Math.random() * 1500 + 500).toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: '8px 12px', fontSize: '12px', fontWeight: 600, color: themeColors.text, border: `1px solid ${themeColors.border}` }}>Lamination</td>
                          <td style={{ padding: '8px 12px', fontSize: '11px', color: themeColors.textSecondary, border: `1px solid ${themeColors.border}` }}>
                            Glossy - Single Side
                          </td>
                          <td style={{ padding: '8px 12px', fontSize: '12px', fontWeight: 600, textAlign: 'right', color: themeColors.text, border: `1px solid ${themeColors.border}` }}>
                            ₹{(Math.random() * 800 + 200).toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: '8px 12px', fontSize: '12px', fontWeight: 600, color: themeColors.text, border: `1px solid ${themeColors.border}` }}>Die Cutting</td>
                          <td style={{ padding: '8px 12px', fontSize: '11px', color: themeColors.textSecondary, border: `1px solid ${themeColors.border}` }}>
                            Custom Shape
                          </td>
                          <td style={{ padding: '8px 12px', fontSize: '12px', fontWeight: 600, textAlign: 'right', color: themeColors.text, border: `1px solid ${themeColors.border}` }}>
                            ₹{(Math.random() * 500 + 150).toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: '8px 12px', fontSize: '12px', fontWeight: 600, color: themeColors.text, border: `1px solid ${themeColors.border}` }}>Packing</td>
                          <td style={{ padding: '8px 12px', fontSize: '11px', color: themeColors.textSecondary, border: `1px solid ${themeColors.border}` }}>
                            Standard Packaging
                          </td>
                          <td style={{ padding: '8px 12px', fontSize: '12px', fontWeight: 600, textAlign: 'right', color: themeColors.text, border: `1px solid ${themeColors.border}` }}>
                            ₹{(Math.random() * 300 + 100).toFixed(2)}
                          </td>
                        </tr>
                        <tr style={{ background: '#FAFAFA' }}>
                          <td colSpan={2} style={{ padding: '10px 12px', fontSize: '13px', fontWeight: 700, textAlign: 'right', color: themeColors.text, border: `1px solid ${themeColors.border}` }}>
                            Product Subtotal
                          </td>
                          <td style={{ padding: '10px 12px', fontSize: '14px', fontWeight: 700, textAlign: 'right', color: '#3B82F6', border: `1px solid ${themeColors.border}` }}>
                            ₹{(Math.random() * 5000 + 3000).toFixed(2)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ))}

                {/* Price Summary */}
                <div style={{ marginTop: '16px', marginBottom: '16px' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${themeColors.border}` }}>
                    <thead>
                      <tr style={{ background: '#F8FAFC' }}>
                        <th colSpan={2} style={{
                          padding: '10px 12px',
                          textAlign: 'left',
                          fontWeight: 600,
                          fontSize: '13px',
                          color: themeColors.text,
                          border: `1px solid ${themeColors.border}`
                        }}>Price Summary</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ padding: '8px 12px', fontSize: '12px', color: themeColors.textSecondary, border: `1px solid ${themeColors.border}` }}>
                          Subtotal
                        </td>
                        <td style={{ padding: '8px 12px', fontSize: '13px', fontWeight: 600, textAlign: 'right', color: themeColors.text, border: `1px solid ${themeColors.border}`, width: '150px' }}>
                          ₹{totalRate.toFixed(2)}
                        </td>
                      </tr>
                      {margin > 0 && (
                        <tr>
                          <td style={{ padding: '8px 12px', fontSize: '12px', color: themeColors.textSecondary, border: `1px solid ${themeColors.border}` }}>
                            Margin ({margin}%)
                          </td>
                          <td style={{ padding: '8px 12px', fontSize: '13px', fontWeight: 600, textAlign: 'right', color: themeColors.text, border: `1px solid ${themeColors.border}` }}>
                            ₹{(totalRate * margin / 100).toFixed(2)}
                          </td>
                        </tr>
                      )}
                      <tr>
                        <td style={{ padding: '8px 12px', fontSize: '12px', color: themeColors.textSecondary, border: `1px solid ${themeColors.border}` }}>
                          GST ({taxRate}%)
                        </td>
                        <td style={{ padding: '8px 12px', fontSize: '13px', fontWeight: 600, textAlign: 'right', color: themeColors.text, border: `1px solid ${themeColors.border}` }}>
                          ₹{tax.toFixed(2)}
                        </td>
                      </tr>
                      <tr style={{ background: `linear-gradient(135deg, ${themeColors.text} 0%, #1E293B 100%)` }}>
                        <td style={{ padding: '12px', fontSize: '14px', fontWeight: 700, color: '#FFFFFF', border: `1px solid ${themeColors.border}` }}>
                          Grand Total
                        </td>
                        <td style={{ padding: '12px', fontSize: '18px', fontWeight: 700, textAlign: 'right', color: '#FFFFFF', border: `1px solid ${themeColors.border}` }}>
                          ₹{grandTotal.toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div style={{ flex: 1 }}></div>

                {/* Footer */}
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
              </div>
            </div>
          ) : (
            /* Quotation Preview - New Design */
            <div className="preview-body" style={{ padding: '24px', overflowY: 'auto', height: 'calc(100vh - 88px)' }}>
              <div style={{ background: '#FFFFFF', border: `1px solid ${themeColors.borderLight}`, borderRadius: '12px', padding: '32px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)' }}>

              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', paddingBottom: '24px', borderBottom: `1px solid ${themeColors.borderLight}` }}>
                {/* Left: Company Info */}
                <div>
                  <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: `linear-gradient(135deg, ${themeColors.primary} 0%, #E65525 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>
                    P
                  </div>
                  <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: themeColors.text, marginBottom: '8px' }}>PRINTING PRESS</h1>
                  <div style={{ fontSize: '11px', color: themeColors.textSecondary, lineHeight: '1.6' }}>
                    <div>Industrial Area, Chennai 600001</div>
                    <div><strong>Phone:</strong> +91 98765 43210</div>
                    <div><strong>Email:</strong> info@printingpress.com</div>
                    <div><strong>GST:</strong> 33AAAAA0000A1Z5</div>
                  </div>
                </div>

                {/* Right: Quotation Details */}
                <div style={{ textAlign: 'right' }}>
                  <div style={{ display: 'inline-block', background: 'rgba(255, 107, 53, 0.1)', padding: '4px 12px', borderRadius: '4px', marginBottom: '8px' }}>
                    <div style={{ fontSize: '10px', fontWeight: 600, color: themeColors.primary, letterSpacing: '0.05em', textTransform: 'uppercase' }}>QUOTATION</div>
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: themeColors.text, marginBottom: '4px' }}>QUO-2026-AUTO</div>
                  <div style={{ fontSize: '11px', color: themeColors.textSecondary }}>
                    <strong>Date:</strong> {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </div>
                </div>
              </div>

              {/* Bill To & Job Details Section */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '24px' }}>
                {/* Bill To */}
                <div>
                  <div style={{ fontSize: '10px', fontWeight: 600, color: themeColors.textSecondary, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>BILL TO</div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: themeColors.text, marginBottom: '8px' }}>{enquiryData?.company || form.getFieldValue('customerName') || 'Green Earth LLC'}</div>
                  <div style={{ fontSize: '11px', color: themeColors.textSecondary, lineHeight: '1.6' }}>
                    {enquiryData?.email && <div><strong>Email:</strong> {enquiryData.email}</div>}
                  </div>
                </div>

                {/* Job Details */}
                <div>
                  <div style={{ fontSize: '10px', fontWeight: 600, color: themeColors.textSecondary, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>JOB DETAILS</div>
                  <div style={{ fontSize: '11px', color: themeColors.textSecondary, lineHeight: '1.6' }}>
                    <div><strong>Job Name:</strong> {form.getFieldValue('jobName') || '-'}</div>
                    <div><strong>Item:</strong> {form.getFieldValue('itemName') || productLines[0]?.name || 'EVELY SLIPS 6pcs BOX'}</div>
                    <div><strong>Quantity:</strong> {qty ? qty.toLocaleString() : '-'} units</div>
                  </div>
                </div>
              </div>

              {/* LINE ITEMS Section */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '10px', fontWeight: 600, color: themeColors.textSecondary, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>LINE ITEMS</div>

                {/* Line Items Table */}
                <div style={{ border: `1px solid ${themeColors.borderLight}`, borderRadius: '8px', overflow: 'hidden' }}>
                  {/* Table Header */}
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr', gap: '16px', padding: '12px 16px', background: '#F8FAFC', borderBottom: `1px solid ${themeColors.borderLight}` }}>
                    <div style={{ fontSize: '10px', fontWeight: 600, color: themeColors.textSecondary, letterSpacing: '0.05em', textTransform: 'uppercase' }}>DESCRIPTION</div>
                    <div style={{ fontSize: '10px', fontWeight: 600, color: themeColors.textSecondary, letterSpacing: '0.05em', textTransform: 'uppercase' }}>DETAILS</div>
                    <div style={{ fontSize: '10px', fontWeight: 600, color: themeColors.textSecondary, letterSpacing: '0.05em', textTransform: 'uppercase', textAlign: 'right' }}>AMOUNT</div>
                  </div>

                  {/* Board Material Row */}
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr', gap: '16px', padding: '16px', borderBottom: `1px solid ${themeColors.borderLight}`, background: '#FFFFFF' }}>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: themeColors.text, marginBottom: '4px' }}>Board Material</div>
                      <div style={{ fontSize: '11px', color: themeColors.textSecondary }}>{form.getFieldValue('board') || 'Board Type'} - {gsm}gsm</div>
                    </div>
                    <div style={{ fontSize: '11px', color: themeColors.textSecondary, lineHeight: '1.6' }}>
                      <div>Size: {size1 || 0} × {size2 || 0} cm</div>
                      <div>Boards Req: {totalBoardReq}</div>
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: themeColors.text, textAlign: 'right' }}>₹{totalBoardRate.toFixed(2)}</div>
                  </div>

                  {/* Process Cards */}
                  {processCards.map((card) => (
                    <div key={card.id} style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr', gap: '16px', padding: '16px', borderBottom: `1px solid ${themeColors.borderLight}`, background: '#FFFFFF' }}>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: themeColors.text }}>{card.type}</div>
                      </div>
                      <div style={{ fontSize: '11px', color: themeColors.textSecondary }}>
                        {(() => {
                          const { data } = card;
                          if ('printingType' in data) return `${data.printingType}`;
                          if ('laminationType' in data) return `${data.laminationType}`;
                          if ('dieType' in data) return `${data.dieType}`;
                          return 'Process';
                        })()}
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: themeColors.text, textAlign: 'right' }}>₹{card.data.totalCost.toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CALCULATION SUMMARY Section */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ width: '320px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 600, color: themeColors.textSecondary, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>CALCULATION SUMMARY</div>

                  <div style={{ border: `1px solid ${themeColors.borderLight}`, borderRadius: '8px', overflow: 'hidden', background: '#FFFFFF' }}>
                    {/* Subtotal */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', borderBottom: `1px solid ${themeColors.borderLight}` }}>
                      <span style={{ fontSize: '12px', color: themeColors.textSecondary }}>Subtotal</span>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: themeColors.text }}>₹{totalRate.toFixed(2)}</span>
                    </div>

                    {/* Single Box Rate */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', borderBottom: `1px solid ${themeColors.borderLight}` }}>
                      <span style={{ fontSize: '12px', color: themeColors.textSecondary }}>Single Box Rate</span>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: themeColors.text }}>₹{singleBoxRate.toFixed(4)}</span>
                    </div>

                    {/* Margin */}
                    {margin > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', borderBottom: `1px solid ${themeColors.borderLight}` }}>
                        <span style={{ fontSize: '12px', color: themeColors.textSecondary }}>Margin ({margin}%)</span>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: themeColors.text }}>₹{(totalRate * margin / 100).toFixed(2)}</span>
                      </div>
                    )}

                    {/* GST */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', borderBottom: `1px solid ${themeColors.borderLight}` }}>
                      <span style={{ fontSize: '12px', color: themeColors.textSecondary }}>GST ({taxRate}%)</span>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: themeColors.text }}>₹{tax.toFixed(2)}</span>
                    </div>

                    {/* Grand Total */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', background: '#F8FAFC' }}>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: themeColors.text }}>Grand Total</span>
                      <span style={{ fontSize: '15px', fontWeight: 700, color: themeColors.text }}>₹{grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              </div>
            </div>
          )}
      </Drawer>
    </div>
  );
};

export default CreateQuotation;
