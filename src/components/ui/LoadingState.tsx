import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Colors, Spacing } from '@/constants/theme';
import { Typography } from './Typography';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading agricultural data...',
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.primary} />
      <Typography variant="subtitle" color={Colors.textSecondary} style={styles.message}>
        {message}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 180,
  },
  message: {
    marginTop: Spacing.md,
  },
});
