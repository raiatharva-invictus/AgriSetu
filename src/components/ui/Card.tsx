import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { Colors, BorderRadius, Shadows, Spacing } from '@/constants/theme';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  variant?: 'default' | 'outlined' | 'elevated' | 'tinted';
  activeOpacity?: number;
}

export const Card: React.FC<CardProps> = ({
  children,
  onPress,
  style,
  variant = 'elevated',
  activeOpacity = 0.75,
}) => {
  const cardStyle = [
    styles.card,
    variant === 'elevated' && Shadows.md,
    variant === 'outlined' && styles.outlined,
    variant === 'tinted' && styles.tinted,
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        style={cardStyle}
        onPress={onPress}
        activeOpacity={activeOpacity}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginVertical: Spacing.xs,
  },
  outlined: {
    borderWidth: 1,
    borderColor: Colors.border,
    elevation: 0,
    shadowOpacity: 0,
  },
  tinted: {
    backgroundColor: Colors.surfaceTint,
    borderWidth: 1,
    borderColor: '#C8E6C9',
    elevation: 0,
    shadowOpacity: 0,
  },
});
