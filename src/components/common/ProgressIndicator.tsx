import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors, Spacing } from '@/constants/theme';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }).map((_, idx) => {
        const stepNum = idx + 1;
        const isActive = stepNum <= currentStep;
        return (
          <View
            key={stepNum}
            style={[
              styles.bar,
              isActive ? styles.activeBar : styles.inactiveBar,
              { flex: 1 },
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: Spacing.xs,
    paddingVertical: Spacing.sm,
  },
  bar: {
    height: 4,
    borderRadius: 2,
  },
  activeBar: {
    backgroundColor: Colors.primary,
  },
  inactiveBar: {
    backgroundColor: Colors.cardBorder,
  },
});
