import React from 'react';
import { Text as RNText, TextStyle, StyleProp, StyleSheet } from 'react-native';
import { Colors, TypographyTokens } from '@/constants/theme';

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'subtitle'
  | 'body'
  | 'bodyBold'
  | 'caption'
  | 'label'
  | 'hero';

interface TypographyProps {
  children: React.ReactNode;
  variant?: TypographyVariant;
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body',
  color,
  align = 'left',
  style,
  numberOfLines,
}) => {
  const getStyleForVariant = (): TextStyle => {
    switch (variant) {
      case 'hero':
        return {
          fontSize: TypographyTokens.fontSize.hero,
          lineHeight: TypographyTokens.lineHeight.hero,
          fontWeight: TypographyTokens.fontWeight.heavy,
          color: color || Colors.textPrimary,
        };
      case 'h1':
        return {
          fontSize: TypographyTokens.fontSize.xxl,
          lineHeight: TypographyTokens.lineHeight.xxl,
          fontWeight: TypographyTokens.fontWeight.bold,
          color: color || Colors.textPrimary,
        };
      case 'h2':
        return {
          fontSize: TypographyTokens.fontSize.xl,
          lineHeight: TypographyTokens.lineHeight.xl,
          fontWeight: TypographyTokens.fontWeight.bold,
          color: color || Colors.textPrimary,
        };
      case 'h3':
        return {
          fontSize: TypographyTokens.fontSize.lg,
          lineHeight: TypographyTokens.lineHeight.lg,
          fontWeight: TypographyTokens.fontWeight.semibold,
          color: color || Colors.textPrimary,
        };
      case 'subtitle':
        return {
          fontSize: TypographyTokens.fontSize.md,
          lineHeight: TypographyTokens.lineHeight.md,
          fontWeight: TypographyTokens.fontWeight.medium,
          color: color || Colors.textSecondary,
        };
      case 'bodyBold':
        return {
          fontSize: TypographyTokens.fontSize.md,
          lineHeight: TypographyTokens.lineHeight.md,
          fontWeight: TypographyTokens.fontWeight.bold,
          color: color || Colors.textPrimary,
        };
      case 'caption':
        return {
          fontSize: TypographyTokens.fontSize.xs,
          lineHeight: TypographyTokens.lineHeight.xs,
          fontWeight: TypographyTokens.fontWeight.regular,
          color: color || Colors.textMuted,
        };
      case 'label':
        return {
          fontSize: TypographyTokens.fontSize.sm,
          lineHeight: TypographyTokens.lineHeight.sm,
          fontWeight: TypographyTokens.fontWeight.semibold,
          color: color || Colors.textSecondary,
        };
      case 'body':
      default:
        return {
          fontSize: TypographyTokens.fontSize.md,
          lineHeight: TypographyTokens.lineHeight.md,
          fontWeight: TypographyTokens.fontWeight.regular,
          color: color || Colors.textPrimary,
        };
    }
  };

  return (
    <RNText
      numberOfLines={numberOfLines}
      style={[
        getStyleForVariant(),
        { textAlign: align },
        style,
      ]}
    >
      {children}
    </RNText>
  );
};
