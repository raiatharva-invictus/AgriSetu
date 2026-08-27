import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, Spacing } from '@/constants/theme';
import { Consultation } from '@/types/case';
import { Typography } from '../ui/Typography';

interface ConsultationSummaryCardProps {
  consultation: Consultation;
}

export const ConsultationSummaryCard: React.FC<ConsultationSummaryCardProps> = ({
  consultation,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.expertRow}>
        <View style={styles.avatarCircle}>
          <Ionicons name="ribbon" size={20} color={Colors.textOnPrimary} />
        </View>

        <View style={styles.expertInfo}>
          <Typography variant="h3" color={Colors.textPrimary}>
            {consultation.expertName}
          </Typography>
          <Typography variant="caption" color={Colors.textMuted}>
            {consultation.expertTitle}
          </Typography>
        </View>
      </View>

      {/* Match Rationale */}
      {consultation.matchRationale && consultation.matchRationale.length > 0 && (
        <View style={styles.rationaleBox}>
          <Typography variant="label" color={Colors.primaryDark} style={styles.rationaleHeader}>
            Why matched:
          </Typography>
          {consultation.matchRationale.map((point) => (
            <Typography key={point} variant="caption" color={Colors.textSecondary} style={styles.pointText}>
              • {point}
            </Typography>
          ))}
        </View>
      )}

      <View style={styles.divider} />

      {/* Terms Row */}
      <View style={styles.termsRow}>
        <View style={styles.termTag}>
          <Ionicons name="time-outline" size={14} color={Colors.textSecondary} />
          <Typography variant="caption" color={Colors.textSecondary} style={styles.termText}>
            {consultation.durationMinutes} mins
          </Typography>
        </View>

        <View style={styles.termTag}>
          <Ionicons name="pricetag-outline" size={14} color={Colors.success} />
          <Typography variant="caption" color={Colors.success} style={styles.termText}>
            {consultation.price}
          </Typography>
        </View>

        <Typography variant="caption" color={Colors.textMuted}>
          {consultation.scheduledAt}
        </Typography>
      </View>

      {/* Advice Notes */}
      {consultation.notes ? (
        <View style={styles.notesBox}>
          <Typography variant="label" color={Colors.textPrimary} style={styles.notesHeader}>
            ADVICE & RECOMMENDATIONS:
          </Typography>
          <Typography variant="body" color={Colors.textPrimary} style={styles.notesText}>
            {consultation.notes}
          </Typography>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    marginBottom: Spacing.md,
  },
  expertRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  expertInfo: {
    flex: 1,
  },
  rationaleBox: {
    backgroundColor: Colors.primaryContainer,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginVertical: Spacing.xs,
  },
  rationaleHeader: {
    marginBottom: 4,
  },
  pointText: {
    lineHeight: 18,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.cardBorder,
    marginVertical: Spacing.md,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  termTag: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  termText: {
    marginLeft: 4,
    fontWeight: '600',
  },
  notesBox: {
    backgroundColor: Colors.surfaceSecondary,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.md,
  },
  notesHeader: {
    fontSize: 12,
    marginBottom: 4,
  },
  notesText: {
    fontSize: 14,
    lineHeight: 20,
  },
});
