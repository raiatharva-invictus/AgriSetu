import { Platform } from 'react-native';

export interface ThemeColors {
  // Brand Agricultural Palette
  primary: string;         // Foliage Deep Green (#1E5631)
  primaryLight: string;    // Lush Leaf Green (#2D7A46)
  primaryDark: string;     // Forest Dark Green (#12391E)
  primaryContainer: string;// Soft Leaf Tint (#EAF3ED)
  
  // Earth & Terracotta Accents
  accent: string;          // Terracotta Soil Clay (#C85A32)
  accentLight: string;     // Soft Clay Tint (#FDF0EC)
  accentDark: string;      // Deep Rust (#7A3114)
  
  // Sunlight & Status Accents
  warning: string;         // Harvest Amber (#D97706)
  warningLight: string;    // Soft Amber Tint (#FEF3C7)
  success: string;         // Crop Green (#16A34A)
  successLight: string;    // Soft Green Tint (#DCFCE7)
  danger: string;          // Pest Red (#DC2626)
  dangerLight: string;     // Soft Red Tint (#FEE2E2)
  info: string;            // Water Sky Blue (#0284C7)
  infoLight: string;       // Soft Blue Tint (#E0F2FE)
  
  // Backgrounds & Surface
  background: string;      // Natural Warm Sand/Soil (#F7F4EE)
  surface: string;         // Crisp Surface White (#FFFFFF)
  surfaceSecondary: string;// Warm Sand Tint (#EFECE6)
  cardBorder: string;      // Soft Earth Border (#E2DDD3)
  
  // Typography Colors (Sunlight readable)
  textPrimary: string;     // Deep Charcoal (#1F2937)
  textSecondary: string;   // Earth Slate (#4B5563)
  textMuted: string;       // Soft Slate (#71717A)
  textInverse: string;     // Crisp White (#FFFFFF)
  textOnPrimary: string;   // Crisp White (#FFFFFF)

  // Backward-compatibility Aliases
  border: string;
  borderLight: string;
  surfaceTint: string;
  textLight: string;
  text: string;
  backgroundElement: string;
  backgroundSelected: string;
}

const lightPalette: ThemeColors = {
  primary: '#1E5631',
  primaryLight: '#2D7A46',
  primaryDark: '#12391E',
  primaryContainer: '#EAF3ED',
  
  accent: '#C85A32',
  accentLight: '#FDF0EC',
  accentDark: '#7A3114',
  
  warning: '#D97706',
  warningLight: '#FEF3C7',
  success: '#16A34A',
  successLight: '#DCFCE7',
  danger: '#DC2626',
  dangerLight: '#FEE2E2',
  info: '#0284C7',
  infoLight: '#E0F2FE',
  
  background: '#F7F4EE',
  surface: '#FFFFFF',
  surfaceSecondary: '#EFECE6',
  cardBorder: '#E2DDD3',
  
  textPrimary: '#1F2937',
  textSecondary: '#4B5563',
  textMuted: '#71717A',
  textInverse: '#FFFFFF',
  textOnPrimary: '#FFFFFF',

  // Compatibility mapping
  border: '#E2DDD3',
  borderLight: '#EFECE6',
  surfaceTint: '#EAF3ED',
  textLight: '#9CA3AF',
  text: '#1F2937',
  backgroundElement: '#FFFFFF',
  backgroundSelected: '#EAF3ED',
};

const darkPalette: ThemeColors = {
  ...lightPalette,
  background: '#121814',
  surface: '#1A231C',
  surfaceSecondary: '#222E25',
  cardBorder: '#2D3C30',
  textPrimary: '#F9FAFB',
  textSecondary: '#D1D5DB',
  textMuted: '#9CA3AF',
  border: '#2D3C30',
  borderLight: '#222E25',
  surfaceTint: '#1E3324',
};

export const Colors = {
  ...lightPalette,
  light: lightPalette,
  dark: darkPalette,
};

export const TypographyTokens = {
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    hero: 30,
  },
  lineHeight: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 26,
    xl: 28,
    xxl: 32,
    hero: 38,
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
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  hero: 40,
};

export const TouchTargets = {
  min: 48,
  large: 56,
  hero: 64,
};

export const BorderRadius = {
  none: 0,
  sm: 6,
  md: 10,
  lg: 14,
  xl: 18,
  round: 24,
  full: 9999,
};

export const Shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#12391E',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#1F2937',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  subtle: {
    shadowColor: '#12391E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  card: {
    shadowColor: '#1F2937',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  active: {
    shadowColor: '#1E5631',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.14,
    shadowRadius: 8,
    elevation: 5,
  },
};

export const BottomTabHeight = Platform.OS === 'ios' ? 86 : 68;
