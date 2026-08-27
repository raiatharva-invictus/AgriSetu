import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Colors, BorderRadius, Spacing } from '@/constants/theme';
import { Typography } from './Typography';

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  icon?: React.ReactNode;
  variant?: 'default' | 'accent' | 'success' | 'warning';
  style?: StyleProp<ViewStyle>;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  selected = false,
  onPress,
  icon,
  variant = 'default',
  style,
}) => {
  const getBackgroundColor = () => {
    if (selected) {
      switch (variant) {
        case 'accent':
          return Colors.accent;
        case 'success':
          return Colors.success;
        case 'warning':
          return Colors.warning;
        case 'default':
        default:
          return Colors.primary;
      }
    }
    return Colors.surface;
  };

  const getTextColor = () => {
    if (selected) return Colors.textInverse;
    return Colors.textSecondary;
  };

  return (
    <TouchableOpacity
      style={[
        styles.chip,
        { backgroundColor: getBackgroundColor() },
        !selected && styles.unselectedBorder,
        style,
      ]}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.75}
    >
      {icon && <View style={styles.icon}>{icon}</View>}
      <Typography variant="label" color={getTextColor()}>
        {label}
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
  },
  unselectedBorder: {
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  icon: {
    marginRight: Spacing.xs,
  },
});
