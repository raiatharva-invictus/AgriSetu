import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing } from '@/constants/theme';
import { Typography } from './Typography';
import { Button } from './Button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Unable to connect',
  message = 'Please check your internet connection or try again.',
  onRetry,
}) => {
  return (
    <View style={styles.container}>
      <Ionicons name="alert-circle" size={42} color={Colors.danger} />
      <Typography variant="h3" color={Colors.danger} style={styles.title}>
        {title}
      </Typography>
      <Typography variant="body" color={Colors.textSecondary} align="center" style={styles.message}>
        {message}
      </Typography>
      {onRetry && (
        <Button
          title="Retry Connection"
          onPress={onRetry}
          variant="outline"
          fullWidth={false}
          style={styles.button}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacing.xl,
    backgroundColor: Colors.dangerLight,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FECACA',
    alignItems: 'center',
    marginVertical: Spacing.md,
  },
  title: {
    marginTop: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  message: {
    marginBottom: Spacing.md,
  },
  button: {
    borderColor: Colors.danger,
  },
});
