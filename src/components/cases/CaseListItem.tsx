import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, Spacing, Shadows } from '@/constants/theme';
import { Case } from '@/types/case';
import { CaseStatusBadge } from './CaseStatusBadge';
import { Typography } from '../ui/Typography';

interface CaseListItemProps {
  caseData: Case;
  onPress: () => void;
}

export const CaseListItem: React.FC<CaseListItemProps> = ({
  caseData,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.88}
    >
      <View style={styles.topRow}>
        <View style={styles.cropTag}>
          <Ionicons name="leaf" size={13} color={Colors.primary} />
          <Typography variant="label" color={Colors.primaryDark} style={styles.cropText}>
            {caseData.cropName}
          </Typography>
        </View>

        <Typography variant="caption" color={Colors.textMuted}>
          {caseData.createdAt}
        </Typography>
      </View>

      <Typography variant="h3" color={Colors.textPrimary} style={styles.title}>
        {caseData.problemTitle}
      </Typography>

      {caseData.assignedExpertName ? (
        <Typography variant="body" color={Colors.textSecondary} style={styles.expertRow}>
          Consultation with <Typography variant="bodyBold" color={Colors.textPrimary}>{caseData.assignedExpertName}</Typography>
        </Typography>
      ) : null}

      <View style={styles.footerRow}>
        <CaseStatusBadge status={caseData.status} />

        <View style={styles.arrowGroup}>
          <Typography variant="caption" color={Colors.primary} style={styles.viewText}>
            View Details
          </Typography>
          <Ionicons name="chevron-forward" size={16} color={Colors.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    ...Shadows.card,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  cropTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryContainer,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: BorderRadius.sm,
  },
  cropText: {
    marginLeft: 4,
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
    lineHeight: 22,
  },
  expertRow: {
    fontSize: 14,
    marginBottom: Spacing.md,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Spacing.xs,
  },
  arrowGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewText: {
    fontWeight: '700',
    marginRight: 2,
  },
});
