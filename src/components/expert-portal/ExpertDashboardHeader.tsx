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
      {/* Top Identity Header */}
      <View style={styles.topRow}>
        <Avatar name={expertName} size={54} isOnline={true} showStatusDot={true} />
        <View style={styles.titleCol}>
          <Typography variant="h2" color="#FFFFFF">
            नमस्कार, {expertName}
          </Typography>
          <Typography variant="caption" color="#D1FAE5">
            {designation} • KVK Portal Active
          </Typography>
        </View>
      </View>

      {/* 4 Core Task Metrics Grid */}
      <View style={styles.metricsGrid}>
        <View style={styles.metricCard}>
          <Typography variant="hero" color={Colors.accent}>
            {pendingRequestsCount}
          </Typography>
          <Typography variant="label" color={Colors.textPrimary} style={styles.metricLabel}>
            आज के नए अनुरोध
          </Typography>
          <Typography variant="caption" color={Colors.textMuted}>
            Today's requests
          </Typography>
        </View>

        <View style={styles.metricCard}>
          <Typography variant="hero" color={Colors.primaryDark}>
            {upcomingCallsCount}
          </Typography>
          <Typography variant="label" color={Colors.textPrimary} style={styles.metricLabel}>
            आगामी कॉल
          </Typography>
          <Typography variant="caption" color={Colors.textMuted}>
            Upcoming calls
          </Typography>
        </View>

        <View style={styles.metricCard}>
          <Typography variant="hero" color={Colors.primary}>
            {farmersHelpedCount}
          </Typography>
          <Typography variant="label" color={Colors.textPrimary} style={styles.metricLabel}>
            किसानों की मदद की
          </Typography>
          <Typography variant="caption" color={Colors.textMuted}>
            Farmers helped
          </Typography>
        </View>

        <View style={styles.metricCard}>
          <Typography variant="hero" color={Colors.success}>
            {resolutionRate}
          </Typography>
          <Typography variant="label" color={Colors.textPrimary} style={styles.metricLabel}>
            रिपोर्ट किया समाधान
          </Typography>
          <Typography variant="caption" color={Colors.textMuted}>
            Reported resolution
          </Typography>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
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
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  metricCard: {
    width: '48%',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    ...Shadows.subtle,
  },
  metricLabel: {
    marginTop: 2,
    textAlign: 'center',
  },
});
