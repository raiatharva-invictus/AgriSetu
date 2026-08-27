import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, Spacing, Shadows } from '@/constants/theme';
import { Typography } from '../ui/Typography';
import { Avatar } from '../ui/Avatar';

interface ExpertDashboardHeaderProps {
  expertName: string;
  designation: string;
  pendingRequestsCount: number;
  upcomingCallsCount: number;
  farmersHelpedCount: number;
  resolutionRate: string;
}

export const ExpertDashboardHeader: React.FC<ExpertDashboardHeaderProps> = ({
  expertName,
  designation,
  pendingRequestsCount,
  upcomingCallsCount,
  farmersHelpedCount,
  resolutionRate,
}) => {
  return (
    <View style={styles.container}>
      {/* Top Identity & Official Verification Header */}
      <View style={styles.topRow}>
        <Avatar name={expertName} size={56} isOnline={true} showStatusDot={true} />

        <View style={styles.titleCol}>
          <View style={styles.nameBadgeRow}>
            <Typography variant="h2" color={Colors.textInverse} style={styles.expertNameText}>
              {expertName}
            </Typography>

            <View style={styles.verifiedTag}>
              <Ionicons name="shield-checkmark" size={12} color="#0284C7" />
              <Typography variant="caption" color="#0369A1" style={styles.verifiedText}>
                VERIFIED SCIENTIST
              </Typography>
            </View>
          </View>

          <Typography variant="caption" color="#D1FAE5" style={styles.designationText}>
            {designation} • ICAR/KVK Active Mode
          </Typography>
        </View>
      </View>

      {/* 4 Core Management Metric Cards */}
      <View style={styles.metricsGrid}>
        <View style={[styles.metricCard, styles.accentBorder]}>
          <View style={styles.metricIconRow}>
            <Ionicons name="mail-unread" size={18} color={Colors.accent} />
            <Typography variant="hero" color={Colors.accent} style={styles.metricValue}>
              {pendingRequestsCount}
            </Typography>
          </View>
          <Typography variant="label" color={Colors.textPrimary} style={styles.metricLabel}>
            आज के नए अनुरोध
          </Typography>
          <Typography variant="caption" color={Colors.textMuted}>
            New requests
          </Typography>
        </View>

        <View style={styles.metricCard}>
          <View style={styles.metricIconRow}>
            <Ionicons name="call" size={18} color={Colors.harvestAmber} />
            <Typography variant="hero" color={Colors.harvestAmber} style={styles.metricValue}>
              {upcomingCallsCount}
            </Typography>
          </View>
          <Typography variant="label" color={Colors.textPrimary} style={styles.metricLabel}>
            आगामी कॉल
          </Typography>
          <Typography variant="caption" color={Colors.textMuted}>
            Upcoming calls
          </Typography>
        </View>

        <View style={styles.metricCard}>
          <View style={styles.metricIconRow}>
            <Ionicons name="people" size={18} color={Colors.primary} />
            <Typography variant="hero" color={Colors.primary} style={styles.metricValue}>
              {farmersHelpedCount}
            </Typography>
          </View>
          <Typography variant="label" color={Colors.textPrimary} style={styles.metricLabel}>
            किसानों की मदद की
          </Typography>
          <Typography variant="caption" color={Colors.textMuted}>
            Farmers helped
          </Typography>
        </View>

        <View style={styles.metricCard}>
          <View style={styles.metricIconRow}>
            <Ionicons name="checkmark-done-circle" size={18} color={Colors.success} />
            <Typography variant="hero" color={Colors.success} style={styles.metricValue}>
              {resolutionRate}
            </Typography>
          </View>
          <Typography variant="label" color={Colors.textPrimary} style={styles.metricLabel}>
            स्वीकृत समाधान दर
          </Typography>
          <Typography variant="caption" color={Colors.textMuted}>
            Resolution rate
          </Typography>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryDark,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  titleCol: {
    marginLeft: Spacing.md,
    flex: 1,
  },
  nameBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  expertNameText: {
    fontSize: 20,
  },
  verifiedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.icarBadgeBg,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  verifiedText: {
    fontWeight: '700',
    fontSize: 9,
    marginLeft: 3,
  },
  designationText: {
    marginTop: 2,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  metricCard: {
    width: '48%',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    ...Shadows.card,
  },
  accentBorder: {
    borderColor: Colors.accent,
    borderWidth: 2,
  },
  metricIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 26,
  },
  metricLabel: {
    marginTop: 2,
    fontSize: 12,
  },
});
