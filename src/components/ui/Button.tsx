import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import { Colors, BorderRadius, Spacing, TouchTargets } from '@/constants/theme';
import { Typography } from './Typography';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
export type ButtonSize = 'small' | 'medium' | 'large' | 'hero';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  subtitle?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  icon,
  loading = false,
  disabled = false,
  fullWidth = true,
  style,
  textStyle,
  subtitle,
}) => {
  const getContainerStyle = (): ViewStyle => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: Colors.primaryContainer,
          borderWidth: 1,
          borderColor: Colors.cardBorder,
        };
      case 'accent':
        return {
          backgroundColor: Colors.accent,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: Colors.primary,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
        };
      case 'primary':
      default:
        return {
          backgroundColor: Colors.primary,
        };
    }
  };

  const getTextColor = (): string => {
    if (disabled) return Colors.textMuted;
    switch (variant) {
      case 'secondary':
        return Colors.primaryDark;
      case 'accent':
        return Colors.textInverse;
      case 'outline':
        return Colors.primary;
      case 'ghost':
        return Colors.primary;
      case 'primary':
      default:
        return Colors.textOnPrimary;
    }
  };

  const getMinHeight = (): number => {
    switch (size) {
      case 'hero':
        return TouchTargets.hero;
      case 'large':
        return TouchTargets.large;
      case 'small':
        return 40;
      case 'medium':
      default:
        return TouchTargets.min;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.baseContainer,
        getContainerStyle(),
        {
          minHeight: getMinHeight(),
          alignSelf: fullWidth ? 'stretch' : 'flex-start',
        },
        disabled && styles.disabledContainer,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} size="small" />
      ) : (
        <View style={styles.contentRow}>
          {icon && <View style={styles.iconWrapper}>{icon}</View>}
          <View style={styles.textContainer}>
            <Typography
              variant={size === 'hero' ? 'h3' : 'bodyBold'}
              color={getTextColor()}
              style={textStyle}
            >
              {title}
            </Typography>
            {subtitle && (
              <Typography
                variant="caption"
                color={variant === 'primary' ? 'rgba(255, 255, 255, 0.85)' : Colors.textSecondary}
              >
                {subtitle}
              </Typography>
            )}
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseContainer: {
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  disabledContainer: {
    backgroundColor: Colors.surfaceSecondary,
    borderColor: Colors.cardBorder,
    elevation: 0,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    marginRight: Spacing.sm,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
