import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Colors, BorderRadius, Spacing, TouchTargets } from '@/constants/theme';
import { Typography } from './Typography';

export interface SelectOption {
  value: string;
  label: string;
  sublabel?: string;
  icon?: React.ReactNode;
}

interface SelectProps {
  options: SelectOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  label?: string;
  horizontal?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const Select: React.FC<SelectProps> = ({
  options,
  selectedValue,
  onSelect,
  label,
  horizontal = true,
  style,
}) => {
  const renderOption = (opt: SelectOption) => {
    const isSelected = selectedValue === opt.value;
    return (
      <TouchableOpacity
        key={opt.value}
        style={[
          styles.optionCard,
          isSelected ? styles.selectedCard : styles.unselectedCard,
        ]}
        onPress={() => onSelect(opt.value)}
        activeOpacity={0.7}
      >
        {opt.icon && <View style={styles.iconSlot}>{opt.icon}</View>}
        <View>
          <Typography
            variant="bodyBold"
            color={isSelected ? Colors.textInverse : Colors.textPrimary}
          >
            {opt.label}
          </Typography>
          {opt.sublabel && (
            <Typography
              variant="caption"
              color={isSelected ? 'rgba(255, 255, 255, 0.85)' : Colors.textSecondary}
            >
              {opt.sublabel}
            </Typography>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Typography variant="label" style={styles.label}>
          {label}
        </Typography>
      )}

      {horizontal ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScroll}
        >
          {options.map(renderOption)}
        </ScrollView>
      ) : (
        <View style={styles.verticalGrid}>{options.map(renderOption)}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  label: {
    marginBottom: Spacing.xs,
  },
  horizontalScroll: {
    paddingRight: Spacing.md,
  },
  verticalGrid: {
    gap: Spacing.sm,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: TouchTargets.min,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    marginRight: Spacing.sm,
  },
  selectedCard: {
    backgroundColor: Colors.primary,
  },
  unselectedCard: {
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
  },
  iconSlot: {
    marginRight: Spacing.sm,
  },
});
