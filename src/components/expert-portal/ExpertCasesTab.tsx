import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, Spacing, Shadows } from '@/constants/theme';
import { mockCases } from '@/data/mockData';
import { CaseStatusBadge } from '../cases/CaseStatusBadge';
import { Typography } from '../ui/Typography';
import { SectionHeader } from '../ui/SectionHeader';

export const ExpertCasesTab: React.FC = () => {
  const activeCases = mockCases.filter((c) => c.status !== 'resolved' && c.status !== 'cancelled');
  const completedCases = mockCases.filter((c) => c.status === 'resolved' || c.status === 'cancelled');

  const handleOpenExpertCase = (caseItem: any) => {
    Alert.alert(
      `Case Details — ${caseItem.cropName}`,
      `Farmer: ${caseItem.farmerName} (${caseItem.location})\nProblem: ${caseItem.problemTitle}\nStatus: ${caseItem.status}\n\nConsultation Notes: ${caseItem.consultation?.notes || 'None'}`
    );
  };

  return (
    <View style={styles.container}>
      {/* Overview Metrics Bar */}
      <View style={styles.metricsBar}>
        <View style={styles.metricItem}>
          <Typography variant="h2" color={Colors.primary}>
            {activeCases.length}
          </Typography>
          <Typography variant="caption" color={Colors.textMuted}>
            Active Cases
          </Typography>
        </View>

        <View style={styles.divider} />

        <View style={styles.metricItem}>
          <Typography variant="h2" color={Colors.success}>
            {completedCases.length}
          </Typography>
          <Typography variant="caption" color={Colors.textMuted}>
            Completed Cases
          </Typography>
        </View>

        <View style={styles.divider} />

        <View style={styles.metricItem}>
          <Typography variant="h2" color={Colors.harvestAmber}>
            94%
          </Typography>
          <Typography variant="caption" color={Colors.textMuted}>
            Resolution Rate
          </Typography>
        </View>
      </View>

      {/* ACTIVE CASES */}
      <SectionHeader
        title="सक्रिय मामले (Active Cases)"
        subtitle="वर्तमान में आपकी देखरेख में जारी फसल मामले"
      />

      {activeCases.map((c) => (
        <TouchableOpacity
          key={c.id}
          style={styles.caseCard}
          onPress={() => handleOpenExpertCase(c)}
          activeOpacity={0.88}
        >
          <View style={styles.cardHeader}>
            <View style={styles.cropTag}>
              <Ionicons name="leaf" size={13} color={Colors.primary} />
              <Typography variant="label" color={Colors.primaryDark} style={styles.cropText}>
                {c.cropName}
              </Typography>
            </View>

            <CaseStatusBadge status={c.status} />
          </View>

          <Typography variant="h3" color={Colors.textPrimary} style={styles.title}>
            {c.problemTitle}
          </Typography>

          <Typography variant="caption" color={Colors.textMuted} style={styles.farmerLine}>
            Farmer: {c.farmerName} • 📍 {c.location}
          </Typography>

          <Typography variant="body" color={Colors.textSecondary} style={styles.descText} numberOfLines={2}>
            "{c.description}"
          </Typography>

          {c.images && c.images.length > 0 && (
            <View style={styles.photoRow}>
              {c.images.map((img) => (
                <Image key={img.id} source={{ uri: img.uri }} style={styles.thumbPhoto} />
              ))}
            </View>
          )}
        </TouchableOpacity>
      ))}

      {/* COMPLETED CASES */}
      <View style={styles.groupSpacer} />
      <SectionHeader
        title="पूर्ण मामले (Completed Cases)"
        subtitle="किसानों द्वारा स्वीकृत समाधान मामले"
      />

      {completedCases.map((c) => (
        <TouchableOpacity
          key={c.id}
          style={styles.caseCard}
          onPress={() => handleOpenExpertCase(c)}
          activeOpacity={0.88}
        >
          <View style={styles.cardHeader}>
            <View style={styles.cropTag}>
              <Ionicons name="leaf" size={13} color={Colors.primary} />
              <Typography variant="label" color={Colors.primaryDark} style={styles.cropText}>
                {c.cropName}
              </Typography>
            </View>

            <CaseStatusBadge status={c.status} />
          </View>

          <Typography variant="h3" color={Colors.textPrimary} style={styles.title}>
            {c.problemTitle}
          </Typography>

          {c.outcome?.feedback ? (
            <View style={styles.feedbackBox}>
              <Typography variant="caption" color={Colors.success} style={styles.feedbackText}>
                ✓ Farmer Feedback: "{c.outcome.feedback}"
              </Typography>
            </View>
          ) : null}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  metricsBar: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: Spacing.lg,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    ...Shadows.card,
  },
  metricItem: {
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: 36,
    backgroundColor: Colors.cardBorder,
  },
  caseCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    ...Shadows.card,
  },
  cardHeader: {
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
  },
  farmerLine: {
    marginBottom: Spacing.xs,
  },
  descText: {
    lineHeight: 20,
    marginBottom: Spacing.sm,
  },
  photoRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
    marginTop: Spacing.xs,
  },
  thumbPhoto: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.md,
  },
  groupSpacer: {
    marginTop: Spacing.md,
  },
  feedbackBox: {
    backgroundColor: Colors.successContainer,
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.xs,
  },
  feedbackText: {
    fontWeight: '600',
  },
});
