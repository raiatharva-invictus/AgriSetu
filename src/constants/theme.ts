/**
 * AgriSetu Mobile Design System & Tokens
 * Agricultural, calm, modern, human-centered palette for Indian farmers & experts.
 */

export const Colors = {
  // Brand Palette
  primary: '#1E5631', // Foliage Green
  primaryDark: '#143D21', // Deep Forest Green
  primaryLight: '#2E7D46', // Vibrant Leaf Green
  primaryContainer: '#E8F5E9', // Soft Tint
  
  accent: '#C85A32', // Terracotta Soil
  accentDark: '#9E3E1F',
  accentLight: '#FFF3EE',

  harvestAmber: '#D97706',
  harvestAmberLight: '#FEF3C7',

  // Neutral Soil & Sand Palette
  background: '#F8F6F0', // Warm Sand Soil Background
  surface: '#FFFFFF', // Clean White Surface
  surfaceSecondary: '#F1ECE1', // Warm Muted Surface
  cardBorder: '#E2DBCF', // Natural Soft Border
  border: '#E2DBCF',
  surfaceTint: '#F8FAFC',
  
  // Text Colors
  textPrimary: '#0F172A', // Slate Charcoal (High Contrast)
  textSecondary: '#475569', // Muted Slate
  textMuted: '#64748B',
  textLight: '#94A3B8',
  textInverse: '#FFFFFF',
  textOnPrimary: '#FFFFFF',

  // Status & Utility
  success: '#15803D',
  successLight: '#DCFCE7',
  successContainer: '#DCFCE7',
  warning: '#B45309',
  warningLight: '#FEF3C7',
  warningContainer: '#FEF3C7',
  danger: '#B91C1C',
  dangerLight: '#FEE2E2',
  dangerContainer: '#FEE2E2',
  info: '#0284C7',
  infoLight: '#E0F2FE',

  // Theme Compatibility
  light: '#FFFFFF',
  dark: '#0F172A',

  // System Badges
  icarBadgeBg: '#E0F2FE',
  icarBadgeText: '#0369A1',
};

export const TypographyScale = {
  hero: {
    fontSize: 28,
    fontWeight: '800' as const,
    lineHeight: 36,
  },
  h1: {
    fontSize: 24,
    fontWeight: '700' as const,
    lineHeight: 32,
  },
  h2: {
    fontSize: 20,
    fontWeight: '700' as const,
    lineHeight: 28,
  },
  h3: {
    fontSize: 17,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500' as const,
    lineHeight: 22,
  },
  body: {
    fontSize: 15,
    fontWeight: '400' as const,
    lineHeight: 22,
  },
  bodyBold: {
    fontSize: 15,
    fontWeight: '600' as const,
    lineHeight: 22,
  },
  caption: {
    fontSize: 13,
    fontWeight: '500' as const,
    lineHeight: 18,
  },
  label: {
    fontSize: 12,
    fontWeight: '700' as const,
    letterSpacing: 0.5,
    lineHeight: 16,
  },
};

export const TypographyTokens = {
  fontSize: {
    xs: 13,
    sm: 13,
    md: 15,
    lg: 17,
    xl: 20,
    xxl: 24,
    hero: 28,
  },
  lineHeight: {
    xs: 18,
    sm: 18,
    md: 22,
    lg: 24,
    xl: 28,
    xxl: 32,
    hero: 36,
  },
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    heavy: '800' as const,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
  hero: 64,
};

export const BorderRadius = {
  none: 0,
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  round: 999,
  full: 9999,
};

export const TouchTargets = {
  min: 48,
  minimum: 48,
  standard: 54,
  large: 60,
  hero: 68,
};

export const BottomTabHeight = 64;

export const Shadows = {
  subtle: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  card: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  floating: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  active: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
  },
};
