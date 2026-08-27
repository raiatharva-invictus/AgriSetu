import React from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import { Colors, BorderRadius, Spacing } from '@/constants/theme';
import { CaseStatus } from '@/types';
import { Typography } from './Typography';

interface StatusBadgeProps {
  status: CaseStatus | 'online' | 'verified' | string;
  label?: string;
  style?: StyleProp<ViewStyle>;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  style,
}) => {
  const getBadgeConfig = () => {
    switch (status) {
      case 'under_review':
        return {
          bg: Colors.warningLight,
          text: Colors.warning,
          defaultLabel: 'जांच जारी (In Review)',
        };
      case 'resolved':
        return {
          bg: Colors.successLight,
          text: Colors.success,
          defaultLabel: 'समाधान तैयार (Resolved)',
        };
      case 'urgent':
        return {
          bg: Colors.dangerLight,
          text: Colors.danger,
          defaultLabel: 'अति आवश्यक (Urgent)',
        };
      case 'pending':
        return {
          bg: Colors.surfaceSecondary,
          text: Colors.textSecondary,
          defaultLabel: 'प्राप्त हुआ (Received)',
        };
      case 'online':
        return {
          bg: Colors.successLight,
          text: Colors.success,
          defaultLabel: 'ऑनलाइन (Online)',
        };
      case 'verified':
        return {
          bg: Colors.infoLight,
          text: Colors.info,
          defaultLabel: 'सत्यापित (Verified)',
        };
      default:
        return {
          bg: Colors.surfaceSecondary,
          text: Colors.textSecondary,
          defaultLabel: label || status,
        };
    }
  };

  const config = getBadgeConfig();

  return (
    <View style={[styles.badge, { backgroundColor: config.bg }, style]}>
      <View style={[styles.dot, { backgroundColor: config.text }]} />
      <Typography variant="caption" color={config.text} style={styles.badgeText}>
        {label || config.defaultLabel}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  badgeText: {
    fontWeight: '600',
  },
});
