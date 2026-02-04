import type { ThemeConfig } from 'antd';
import { themeColors } from './themeConfig';

export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: themeColors.primary,
    colorSuccess: themeColors.success,
    colorWarning: themeColors.warning,
    colorError: themeColors.error,
    colorInfo: themeColors.info,
    colorBgContainer: themeColors.surface,
    colorBgLayout: themeColors.background,
    colorText: themeColors.text,
    colorTextSecondary: themeColors.textSecondary,
    colorBorder: themeColors.border,
    fontSize: 14,
    borderRadius: 8,
  },
  components: {
    Layout: {
      headerBg: themeColors.surface,
      siderBg: themeColors.sidebarBg,
      bodyBg: themeColors.background,
    },
    Menu: {
      itemBg: 'transparent',
      itemHoverBg: themeColors.sidebarActiveOrange,
      itemSelectedBg: themeColors.sidebarActiveOrange,
      itemSelectedColor: themeColors.primary,
      itemActiveBg: themeColors.sidebarActiveOrange,
      fontSize: 14,
      itemHeight: 44,
      itemMarginInline: 8,
      itemBorderRadius: 8,
    },
    Button: {
      colorPrimaryHover: themeColors.primaryLight,
      colorPrimaryActive: themeColors.primaryDark,
    },
    Card: {
      borderRadiusLG: 12,
    },
  },
};
