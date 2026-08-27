import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors, Spacing } from '@/constants/theme';
import { Typography } from '../ui/Typography';

interface OnboardingHeaderProps {
  headline: string;
  supportingText?: string;
}

export const OnboardingHeader: React.FC<OnboardingHeaderProps> = ({
  headline,
  supportingText,
}) => {
  return (
    <View style={styles.container}>
      <Typography variant="h1" color={Colors.textPrimary} style={styles.headline}>
        {headline}
      </Typography>

      {supportingText ? (
        <Typography variant="body" color={Colors.textSecondary} style={styles.supportingText}>
          {supportingText}
        </Typography>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.xl,
  },
  headline: {
    marginBottom: Spacing.xs,
    letterSpacing: -0.2,
  },
  supportingText: {
    lineHeight: 22,
  },
});
