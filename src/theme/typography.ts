// Typography System - Single source of truth for all text styles
// CHANGE TYPOGRAPHY HERE TO UPDATE THE ENTIRE APPLICATION

export const typography = {
  // Font Family
  fontFamily: {
    primary: "'Product Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    mono: "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
  },

  // Display & Hero Text
  display: {
    fontSize: '48px',
    fontWeight: 700,
    lineHeight: '56px',
    letterSpacing: '-0.02em',
  },

  // Heading Styles
  h1: {
    fontSize: '32px',
    fontWeight: 700,
    lineHeight: '40px',
    letterSpacing: '-0.01em',
  },

  h2: {
    fontSize: '24px',
    fontWeight: 600,
    lineHeight: '32px',
    letterSpacing: '-0.01em',
  },

  h3: {
    fontSize: '20px',
    fontWeight: 600,
    lineHeight: '28px',
    letterSpacing: '0',
  },

  h4: {
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '24px',
    letterSpacing: '0',
  },

  // Body Text
  bodyLarge: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '24px',
    letterSpacing: '0',
  },

  body: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '20px',
    letterSpacing: '0',
  },

  bodySmall: {
    fontSize: '13px',
    fontWeight: 400,
    lineHeight: '18px',
    letterSpacing: '0',
  },

  // Labels & Captions
  label: {
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '16px',
    letterSpacing: '0.01em',
  },

  labelSmall: {
    fontSize: '11px',
    fontWeight: 500,
    lineHeight: '16px',
    letterSpacing: '0.02em',
  },

  caption: {
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: '16px',
    letterSpacing: '0',
  },

  // Button Text
  button: {
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: '20px',
    letterSpacing: '0.01em',
  },

  buttonLarge: {
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '24px',
    letterSpacing: '0.01em',
  },

  buttonSmall: {
    fontSize: '13px',
    fontWeight: 600,
    lineHeight: '18px',
    letterSpacing: '0.01em',
  },

  // Stats & Numbers
  statValue: {
    fontSize: '32px',
    fontWeight: 700,
    lineHeight: '40px',
    letterSpacing: '-0.01em',
  },

  statLabel: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '20px',
    letterSpacing: '0',
  },

  // Table Text
  tableHeader: {
    fontSize: '12px',
    fontWeight: 600,
    lineHeight: '16px',
    letterSpacing: '0.05em',
    textTransform: 'uppercase' as const,
  },

  tableCell: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '20px',
    letterSpacing: '0',
  },
};

// Helper function to apply typography style
export const applyTypography = (style: keyof typeof typography) => {
  if (style === 'fontFamily') {
    return typography.fontFamily;
  }
  return typography[style];
};

export type TypographyStyle = keyof typeof typography;
