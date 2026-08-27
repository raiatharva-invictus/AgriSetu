import React from 'react';
import { StyleSheet, View, TextInput, TextInputProps } from 'react-native';
import { Colors, BorderRadius, Spacing, TouchTargets } from '@/constants/theme';
import { Typography } from '../ui/Typography';

interface FormFieldProps extends TextInputProps {
  label: string;
  optional?: boolean;
  error?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  optional = false,
  error,
  style,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Typography variant="label" color={Colors.textPrimary} style={styles.labelText}>
          {label}
        </Typography>
        {optional && (
          <Typography variant="caption" color={Colors.textMuted}>
            (Optional)
          </Typography>
        )}
      </View>

      <TextInput
        style={[styles.input, error ? styles.inputError : null, style]}
        placeholderTextColor={Colors.textMuted}
        {...props}
      />

      {error ? (
        <Typography variant="caption" color={Colors.danger} style={styles.errorText}>
          {error}
        </Typography>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  labelText: {
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    minHeight: TouchTargets.standard,
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  inputError: {
    borderColor: Colors.danger,
  },
  errorText: {
    marginTop: 4,
  },
});
