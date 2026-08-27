import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, Spacing, Shadows, TouchTargets } from '@/constants/theme';
import { Typography } from '../ui/Typography';

interface RoleOptionProps {
  title: string;
  subtitle: string;
  iconName: keyof typeof Ionicons.glyphMap;
  selected: boolean;
  onSelect: () => void;
  accentColor?: string;
}

export const RoleOption: React.FC<RoleOptionProps> = ({
  title,
  subtitle,
  iconName,
  selected,
  onSelect,
  accentColor = Colors.primary,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        selected ? { borderColor: accentColor, borderWidth: 2.5, backgroundColor: Colors.surface } : styles.unselectedCard,
      ]}
      onPress={onSelect}
      activeOpacity={0.85}
    >
      <View style={styles.contentRow}>
        <View
          style={[
            styles.iconCircle,
            { backgroundColor: selected ? accentColor : Colors.surfaceSecondary },
          ]}
        >
          <Ionicons
            name={iconName}
            size={28}
            color={selected ? Colors.textInverse : Colors.textSecondary}
          />
        </View>

        <View style={styles.textColumn}>
          <View style={styles.titleRow}>
            <Typography variant="h2" color={Colors.textPrimary} style={styles.title}>
              {title}
            </Typography>

            <View
              style={[
                styles.radioIndicator,
                selected ? { borderColor: accentColor, backgroundColor: accentColor } : styles.radioUnselected,
              ]}
            >
              {selected && <Ionicons name="checkmark" size={14} color={Colors.textInverse} />}
            </View>
          </View>

          <Typography variant="body" color={Colors.textSecondary} style={styles.subtitle}>
            {subtitle}
          </Typography>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    minHeight: TouchTargets.hero,
    ...Shadows.card,
  },
  unselectedCard: {
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  textColumn: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    flex: 1,
  },
  subtitle: {
    lineHeight: 20,
    fontSize: 14,
  },
  radioIndicator: {
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Spacing.xs,
  },
  radioUnselected: {
    borderWidth: 2,
    borderColor: Colors.cardBorder,
    backgroundColor: 'transparent',
  },
});
