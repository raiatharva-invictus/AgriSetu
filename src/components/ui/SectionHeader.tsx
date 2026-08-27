import React from 'react';
import { StyleSheet, View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { Colors, Spacing } from '@/constants/theme';
import { Typography } from './Typography';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actionText?: string;
  onActionPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  actionText,
  onActionPress,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.textColumn}>
        <Typography variant="h2" color={Colors.textPrimary}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="caption" color={Colors.textSecondary} style={styles.subtitle}>
            {subtitle}
          </Typography>
        )}
      </View>

      {actionText && onActionPress && (
        <TouchableOpacity
          onPress={onActionPress}
          activeOpacity={0.7}
          style={styles.actionButton}
        >
          <Typography variant="label" color={Colors.primary}>
            {actionText}
          </Typography>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
    marginTop: Spacing.lg,
  },
  textColumn: {
    flex: 1,
    paddingRight: Spacing.sm,
  },
  subtitle: {
    marginTop: 2,
  },
  actionButton: {
    paddingVertical: 2,
    paddingHorizontal: Spacing.xs,
  },
});
