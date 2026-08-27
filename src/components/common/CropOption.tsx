import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, Spacing } from '@/constants/theme';
import { Typography } from '../ui/Typography';

interface CropOptionProps {
  label: string;
  selected: boolean;
  onToggle: () => void;
}

export const CropOption: React.FC<CropOptionProps> = ({
  label,
  selected,
  onToggle,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.chip,
        selected ? styles.selectedChip : styles.unselectedChip,
      ]}
      onPress={onToggle}
      activeOpacity={0.8}
    >
      <Typography
        variant="bodyBold"
        color={selected ? Colors.textInverse : Colors.textPrimary}
        style={styles.text}
      >
        {label}
      </Typography>

      <View style={styles.iconCircle}>
        <Ionicons
          name={selected ? 'checkmark' : 'add'}
          size={16}
          color={selected ? Colors.textInverse : Colors.textMuted}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    borderWidth: 1.5,
    marginRight: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  selectedChip: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  unselectedChip: {
    backgroundColor: Colors.surface,
    borderColor: Colors.cardBorder,
  },
  text: {
    fontSize: 14,
    marginRight: Spacing.xs,
  },
  iconCircle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
