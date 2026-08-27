import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, Spacing } from '@/constants/theme';
import { Typography } from '../ui/Typography';

interface TimelineStep {
  title: string;
  subtitle: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

interface CaseTimelineProps {
  steps: TimelineStep[];
}

export const CaseTimeline: React.FC<CaseTimelineProps> = ({ steps }) => {
  return (
    <View style={styles.container}>
      {steps.map((step, idx) => {
        const isLast = idx === steps.length - 1;
        return (
          <View key={step.title} style={styles.stepRow}>
            <View style={styles.leftCol}>
              <View
                style={[
                  styles.nodeCircle,
                  step.isCompleted ? styles.completedNode : step.isCurrent ? styles.currentNode : styles.upcomingNode,
                ]}
              >
                <Ionicons
                  name={step.isCompleted ? 'checkmark' : step.isCurrent ? 'ellipse' : 'ellipse-outline'}
                  size={14}
                  color={step.isCompleted || step.isCurrent ? Colors.textInverse : Colors.textMuted}
                />
              </View>

              {!isLast && (
                <View
                  style={[
                    styles.connectorLine,
                    step.isCompleted ? styles.completedConnector : styles.upcomingConnector,
                  ]}
                />
              )}
            </View>

            <View style={styles.rightCol}>
              <Typography
                variant="bodyBold"
                color={step.isCompleted || step.isCurrent ? Colors.textPrimary : Colors.textMuted}
                style={styles.stepTitle}
              >
                {step.title}
              </Typography>
              <Typography
                variant="caption"
                color={step.isCompleted || step.isCurrent ? Colors.textSecondary : Colors.textMuted}
              >
                {step.subtitle}
              </Typography>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.xs,
  },
  stepRow: {
    flexDirection: 'row',
    minHeight: 52,
  },
  leftCol: {
    alignItems: 'center',
    width: 32,
    marginRight: Spacing.sm,
  },
  nodeCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  completedNode: {
    backgroundColor: Colors.primary,
  },
  currentNode: {
    backgroundColor: Colors.accent,
  },
  upcomingNode: {
    backgroundColor: Colors.surfaceSecondary,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
  },
  connectorLine: {
    width: 2,
    flex: 1,
    marginVertical: -2,
  },
  completedConnector: {
    backgroundColor: Colors.primary,
  },
  upcomingConnector: {
    backgroundColor: Colors.cardBorder,
  },
  rightCol: {
    flex: 1,
    paddingBottom: Spacing.md,
  },
  stepTitle: {
    fontSize: 14,
    marginBottom: 2,
  },
});
