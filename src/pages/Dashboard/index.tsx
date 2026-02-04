import { useState } from 'react';
import { Row, Col, Card, Table, Progress } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ShoppingCartOutlined, SettingOutlined, DollarOutlined, BarChartOutlined, ArrowUpOutlined, ArrowDownOutlined, PieChartOutlined } from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';
import { typography } from '../../theme/typography';
import { themeColors } from '../../theme/themeConfig';

interface Machine {
  key: string;
  machine: string;
  type: string;
  utilization: number;
  status: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);
  const [hoveredLinePoint, setHoveredLinePoint] = useState<number | null>(null);

  // Top metrics data
  const metrics = [
    {
      title: 'Total Orders',
      value: '12,450',
      change: '+15.8%',
      isPositive: true,
      icon: <ShoppingCartOutlined size={20} />,
    },
    {
      title: 'In Production',
      value: '847',
      change: '+8.3%',
      isPositive: true,
      icon: <SettingOutlined size={20} />,
    },
    {
      title: 'Pending Payments',
      value: '₹24,780',
      change: '-12.5%',
      isPositive: false,
      icon: <DollarOutlined size={20} />,
    },
    {
      title: 'Total Revenue',
      value: '₹3,63,950',
      change: '+24.2%',
      isPositive: true,
      icon: <BarChartOutlined size={20} />,
    },
  ];

  // Order distribution data
  const orderDistribution = [
    { type: 'Business Cards', value: 48475.0, color: '#4F46E5' },
    { type: 'Brochures', value: 28357.5, color: '#06B6D4' },
    { type: 'Flyers', value: 15742.6, color: '#F59E0B' },
  ];

  // Active machines data
  const machines: Machine[] = [
    {
      key: '1',
      machine: 'Offset Press HP',
      type: 'Digital Printing',
      utilization: 85,
      status: 'Running',
    },
    {
      key: '2',
      machine: 'Xerox Versant',
      type: 'Large Format',
      utilization: 60,
      status: 'Running',
    },
    {
      key: '3',
      machine: 'Canon ImagePress',
      type: 'Color Printing',
      utilization: 35,
      status: 'Idle',
    },
    {
      key: '4',
      machine: 'Ricoh Pro C9200',
      type: 'Commercial Printing',
      utilization: 78,
      status: 'Running',
    },
    {
      key: '5',
      machine: 'Konica Minolta',
      type: 'Production Print',
      utilization: 42,
      status: 'Running',
    },
    {
      key: '6',
      machine: 'Epson SureColor',
      type: 'Wide Format',
      utilization: 28,
      status: 'Idle',
    },
  ];

  const machineColumns: ColumnsType<Machine> = [
    {
      title: 'MACHINE',
      dataIndex: 'machine',
      key: 'machine',
      render: (text) => (
        <span style={{
          ...typography.body,
          fontWeight: 600,
          color: themeColors.text,
        }}>
          {text}
        </span>
      ),
    },
    {
      title: 'TYPE',
      dataIndex: 'type',
      key: 'type',
      render: (text) => (
        <span style={{
          ...typography.body,
          color: themeColors.textSecondary,
        }}>
          {text}
        </span>
      ),
    },
    {
      title: 'UTILIZATION',
      dataIndex: 'utilization',
      key: 'utilization',
      render: (value) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Progress
            percent={value}
            size="small"
            strokeColor={value > 70 ? '#4F46E5' : value > 40 ? '#F59E0B' : '#EF4444'}
            showInfo={false}
            style={{ flex: 1, maxWidth: '120px' }}
            strokeLinecap="round"
          />
          <span style={{
            ...typography.bodySmall,
            fontWeight: 600,
            color: themeColors.text,
            minWidth: '38px'
          }}>
            {value}%
          </span>
        </div>
      ),
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span
          style={{
            display: 'inline-block',
            padding: '4px 12px',
            borderRadius: '16px',
            ...typography.bodySmall,
            fontWeight: 500,
            backgroundColor: status === 'Running' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
            color: status === 'Running' ? themeColors.success : themeColors.warning,
            border: `1px solid ${status === 'Running' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)'}`,
          }}
        >
          {status}
        </span>
      ),
    },
  ];

  // Sales data for chart visualization
  const salesData = [3000, 1200, 1500, 2100, 900, 1800, 1000, 1400, 1900, 600, 4200, 1900, 2200, 3000, 1100];

  // Line chart data points (orders over time) - Jan to Dec
  const lineChartData = [
    { x: 0, y: 135, value: 2600, month: 'Jan' },
    { x: 33.33, y: 125, value: 3125, month: 'Feb' },
    { x: 66.66, y: 106.25, value: 3750, month: 'Mar' },
    { x: 100, y: 87.5, value: 4500, month: 'Apr' },
    { x: 133.33, y: 93.75, value: 4250, month: 'May' },
    { x: 166.66, y: 62.5, value: 5500, month: 'Jun' },
    { x: 200, y: 72.5, value: 5125, month: 'Jul' },
    { x: 233.33, y: 52.5, value: 5900, month: 'Aug' },
    { x: 266.66, y: 57.5, value: 5700, month: 'Sep' },
    { x: 300, y: 43.75, value: 6250, month: 'Oct' },
    { x: 333.33, y: 47.5, value: 6100, month: 'Nov' },
    { x: 366.66, y: 31.25, value: 6750, month: 'Dec' },
  ];

  const cardTitleStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    ...typography.h4,
  };

  const iconWrapperStyle = {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    background: themeColors.borderLight,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    color: themeColors.textSecondary,
  };

  return (
    <div className="dashboard-page-container" data-testid="dashboard-page">
      {/* Header */}
      <div className="page-header" style={{ marginBottom: '20px' }}>
        <h1 style={{ ...typography.h1, marginBottom: '4px', color: themeColors.text }}>
          Dashboard
        </h1>
        <p style={{ ...typography.body, color: themeColors.textSecondary, margin: 0 }}>
          Welcome back, {user?.name}! Here's your overview.
        </p>
      </div>

      {/* Top Metrics */}
      <div className="metrics-section" data-testid="metrics-section">
        <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
        {metrics.map((metric, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card
              style={{
                borderRadius: '12px',
                border: '1px solid rgba(226, 232, 240, 0.6)',
                background: 'rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              }}
              styles={{ body: { padding: '20px' } }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ ...typography.label, color: themeColors.textSecondary, marginBottom: '6px' }}>
                    {metric.icon} {metric.title}
                  </div>
                  <div style={{ ...typography.statValue, color: themeColors.text, marginBottom: '6px' }}>
                    {metric.value}
                  </div>
                  <div
                    style={{
                      ...typography.label,
                      color: metric.isPositive ? themeColors.success : themeColors.error,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    {metric.isPositive ? <ArrowUpOutlined size={16} /> : <ArrowDownOutlined size={16} />}
                    <span>{metric.change}</span>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
        </Row>
      </div>

      {/* Sales Overview and Total Orders */}
      <div className="charts-section" data-testid="charts-section">
        <Row className="charts-row-primary" gutter={[16, 16]} style={{ marginBottom: '16px' }}>
        {/* Sales Overview Chart */}
        <Col className="sales-chart-container" xs={24} lg={16}>
          <Card
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={cardTitleStyle}>
                  <div style={iconWrapperStyle}>
                    <BarChartOutlined size={20} />
                  </div>
                  <span>Sales Overview</span>
                </div>
                <button
                  style={{
                    padding: '4px 12px',
                    borderRadius: '6px',
                    border: `1px solid ${themeColors.border}`,
                    background: 'white',
                    cursor: 'pointer',
                    ...typography.label,
                  }}
                >
                  Filter
                </button>
              </div>
            }
            style={{
              borderRadius: '12px',
              border: '1px solid rgba(226, 232, 240, 0.6)',
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            }}
          >
            <div style={{ marginBottom: '16px' }}>
              <div style={{ ...typography.statValue, color: themeColors.text }}>₹92,575</div>
              <div style={{ ...typography.body, color: themeColors.success }}>
                ↗ 15.8% +₹1,435 increased
              </div>
            </div>
            {/* Simple bar chart visualization */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '200px', position: 'relative' }}>
              {salesData.map((value, index) => (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredBarIndex(index)}
                  onMouseLeave={() => setHoveredBarIndex(null)}
                  style={{
                    flex: 1,
                    height: `${(value / 5000) * 100}%`,
                    background: hoveredBarIndex === index
                      ? 'linear-gradient(180deg, #6366F1 0%, #14B8A6 100%)'
                      : 'linear-gradient(180deg, #4F46E5 0%, #06B6D4 100%)',
                    borderRadius: '4px 4px 0 0',
                    minHeight: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    transform: hoveredBarIndex === index ? 'scaleY(1.02)' : 'scaleY(1)',
                    position: 'relative',
                  }}
                >
                  {hoveredBarIndex === index && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '-40px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'rgba(15, 23, 42, 0.9)',
                        color: 'white',
                        padding: '6px 10px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                        zIndex: 1000,
                      }}
                    >
                      ₹{value.toLocaleString()}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '-4px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: 0,
                          height: 0,
                          borderLeft: '4px solid transparent',
                          borderRight: '4px solid transparent',
                          borderTop: '4px solid rgba(15, 23, 42, 0.9)',
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '16px', color: themeColors.textTertiary, ...typography.label }}>
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec</span>
            </div>
          </Card>
        </Col>

        {/* Total Orders */}
        <Col className="orders-chart-container" xs={24} lg={8}>
          <Card
            title={
              <div style={cardTitleStyle}>
                <div style={iconWrapperStyle}>
                  <ShoppingCartOutlined size={20} />
                </div>
                <span>Total Orders</span>
              </div>
            }
            style={{
              borderRadius: '12px',
              border: '1px solid rgba(226, 232, 240, 0.6)',
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            }}
          >
            <div style={{ marginBottom: '16px' }}>
              <div style={{ ...typography.statValue, color: themeColors.text }}>24,473</div>
              <div style={{ ...typography.body, color: themeColors.success }}>
                ↗ 8.3% +749 increased
              </div>
            </div>
            {/* Line chart */}
            <div style={{ marginTop: '16px', marginBottom: '8px' }}>
              <div style={{ position: 'relative', display: 'flex', gap: '8px' }}>
                {/* Y-axis labels */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingTop: '0px', paddingBottom: '0px', height: '200px' }}>
                  {['5K', '4K', '3K', '2K', '1K', '0'].map((label, i) => (
                    <span key={i} style={{ ...typography.labelSmall, color: themeColors.textTertiary }}>
                      {label}
                    </span>
                  ))}
                </div>

                {/* SVG Line Chart */}
                <svg width="100%" height="200" viewBox="0 0 400 200" preserveAspectRatio="none" style={{ display: 'block', flex: 1 }}>
                  {/* Grid lines */}
                  {[0, 1, 2, 3, 4].map((i) => (
                    <line
                      key={i}
                      x1="0"
                      y1={40 * i}
                      x2="400"
                      y2={40 * i}
                      stroke="rgba(226, 232, 240, 0.4)"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}

                  {/* Blue line with gradient fill */}
                  <defs>
                    <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.01" />
                    </linearGradient>

                    {/* Diagonal stripe pattern */}
                    <pattern id="diagonalStripes" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                      <line x1="0" y1="0" x2="0" y2="16" stroke="#4F46E5" strokeWidth="5" opacity="0.15" />
                    </pattern>
                  </defs>

                  {/* Blue area with gradient */}
                  <path
                    d="M 0,135 L 33.33,125 L 66.66,106.25 L 100,87.5 L 133.33,93.75 L 166.66,62.5 L 200,72.5 L 233.33,52.5 L 266.66,57.5 L 300,43.75 L 333.33,47.5 L 366.66,31.25 L 400,200 L 0,200 Z"
                    fill="url(#blueGradient)"
                  />

                  {/* Diagonal stripe overlay */}
                  <path
                    d="M 0,135 L 33.33,125 L 66.66,106.25 L 100,87.5 L 133.33,93.75 L 166.66,62.5 L 200,72.5 L 233.33,52.5 L 266.66,57.5 L 300,43.75 L 333.33,47.5 L 366.66,31.25 L 400,200 L 0,200 Z"
                    fill="url(#diagonalStripes)"
                  />

                  {/* Blue line */}
                  <path
                    d="M 0,135 L 33.33,125 L 66.66,106.25 L 100,87.5 L 133.33,93.75 L 166.66,62.5 L 200,72.5 L 233.33,52.5 L 266.66,57.5 L 300,43.75 L 333.33,47.5 L 366.66,31.25"
                    fill="none"
                    stroke="#4F46E5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                  />

                  {/* Vertical line to axis on hover */}
                  {hoveredLinePoint !== null && (
                    <line
                      x1={lineChartData[hoveredLinePoint].x}
                      y1={lineChartData[hoveredLinePoint].y}
                      x2={lineChartData[hoveredLinePoint].x}
                      y2="200"
                      stroke="#4F46E5"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                      opacity="0.5"
                      style={{ pointerEvents: 'none' }}
                    />
                  )}

                  {/* Data point circles */}
                  {lineChartData.map((point, index) => (
                    <g key={index}>
                      {/* Invisible larger circle for easier hover */}
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r="8"
                        fill="transparent"
                        style={{ cursor: 'pointer' }}
                        onMouseEnter={() => setHoveredLinePoint(index)}
                        onMouseLeave={() => setHoveredLinePoint(null)}
                      />
                      {/* Visible circle */}
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r={hoveredLinePoint === index ? "5" : "3"}
                        fill="#FFFFFF"
                        stroke="#4F46E5"
                        strokeWidth={hoveredLinePoint === index ? "3" : "2"}
                        style={{
                          transition: 'all 0.2s ease',
                          cursor: 'pointer',
                          pointerEvents: 'none',
                        }}
                      />
                      {/* Outer glow circle on hover */}
                      {hoveredLinePoint === index && (
                        <circle
                          cx={point.x}
                          cy={point.y}
                          r="8"
                          fill="none"
                          stroke="#4F46E5"
                          strokeWidth="1"
                          opacity="0.3"
                          style={{ pointerEvents: 'none' }}
                        />
                      )}
                    </g>
                  ))}
                </svg>

                {/* Tooltip for line chart */}
                {hoveredLinePoint !== null && (
                  <div
                    style={{
                      position: 'absolute',
                      left: `calc(22px + (100% - 30px) * ${lineChartData[hoveredLinePoint].x / 400})`,
                      top: `${(lineChartData[hoveredLinePoint].y / 200) * 100}%`,
                      transform: 'translate(-50%, calc(-100% - 20px))',
                      background: 'rgba(15, 23, 42, 0.95)',
                      color: 'white',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                      zIndex: 1000,
                      pointerEvents: 'none',
                    }}
                  >
                    <div style={{ fontSize: '10px', opacity: 0.8, marginBottom: '2px' }}>
                      {lineChartData[hoveredLinePoint].month}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 700 }}>
                      {lineChartData[hoveredLinePoint].value.toLocaleString()} orders
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '-5px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 0,
                        height: 0,
                        borderLeft: '6px solid transparent',
                        borderRight: '6px solid transparent',
                        borderTop: '6px solid rgba(15, 23, 42, 0.95)',
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Month labels - aligned with chart */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                {/* Empty space for y-axis alignment */}
                <div style={{ width: '22px' }} />
                {/* Month labels */}
                <div style={{
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                  ...typography.labelSmall,
                  color: themeColors.textTertiary,
                }}>
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, i) => (
                    <span key={i} style={{ textAlign: i === 0 ? 'left' : i === 11 ? 'right' : 'center' }}>
                      {month}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </Col>
        </Row>

        {/* Order Distribution and Active Machines */}
        <Row className="charts-row-secondary" gutter={[16, 16]}>
        {/* Order Distribution */}
        <Col className="distribution-chart-container" xs={24} lg={8}>
          <Card
            title={
              <div style={cardTitleStyle}>
                <div style={iconWrapperStyle}>
                  <PieChartOutlined size={20} />
                </div>
                <span>Order Distribution</span>
              </div>
            }
            style={{
              borderRadius: '12px',
              border: '1px solid rgba(226, 232, 240, 0.6)',
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            }}
          >
            {/* Donut chart placeholder */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
              <div
                style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  background: `conic-gradient(
                    #4F46E5 0deg 130deg,
                    #06B6D4 130deg 240deg,
                    #F59E0B 240deg 360deg
                  )`,
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    background: 'white',
                  }}
                />
              </div>
            </div>
            {orderDistribution.map((item, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '12px',
                  alignItems: 'center',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '2px',
                      background: item.color,
                    }}
                  />
                  <span style={{ ...typography.body, color: themeColors.textSecondary }}>{item.type}</span>
                </div>
                <span style={{ ...typography.h4, color: themeColors.text }}>
                  ₹{item.value.toLocaleString()}
                </span>
              </div>
            ))}
          </Card>
        </Col>

        {/* Active Machines */}
        <Col className="machines-table-container" xs={24} lg={16}>
          <Card
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={cardTitleStyle}>
                  <div style={iconWrapperStyle}>
                    <SettingOutlined size={20} />
                  </div>
                  <span>Active Machines</span>
                </div>
                <a href="#" style={{ color: themeColors.info, ...typography.body }}>
                  See All
                </a>
              </div>
            }
            style={{
              borderRadius: '12px',
              border: '1px solid rgba(226, 232, 240, 0.6)',
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            }}
            styles={{ body: { padding: '0' } }}
          >
            <Table
              columns={machineColumns}
              dataSource={machines}
              pagination={false}
              size="middle"
              style={{
                background: 'transparent',
              }}
              rowClassName={() => 'custom-table-row'}
            />
          </Card>
        </Col>
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;
