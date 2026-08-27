import React from 'react';
import {
  StyleSheet,
  View,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { Colors, BorderRadius, Spacing, TouchTargets } from '@/constants/theme';
import { Typography } from './Typography';

interface InputProps extends RNTextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  containerStyle,
  style,
  placeholderTextColor = Colors.textMuted,
  ...rest
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Typography variant="label" style={styles.label}>
          {label}
        </Typography>
      )}

      <View
        style={[
          styles.inputContainer,
          error ? styles.inputError : null,
        ]}
      >
        {leftIcon && <View style={styles.iconSlot}>{leftIcon}</View>}

        <RNTextInput
          style={[styles.input, style]}
          placeholderTextColor={placeholderTextColor}
          {...rest}
        />

        {rightIcon && <View style={styles.iconSlot}>{rightIcon}</View>}
      </View>

      {error ? (
        <Typography variant="caption" color={Colors.danger} style={styles.helper}>
          {error}
        </Typography>
      ) : helperText ? (
        <Typography variant="caption" color={Colors.textMuted} style={styles.helper}>
          {helperText}
        </Typography>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  label: {
    marginBottom: Spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    borderRadius: BorderRadius.md,
    minHeight: TouchTargets.min,
    paddingHorizontal: Spacing.md,
  },
  inputError: {
    borderColor: Colors.danger,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.textPrimary,
    paddingVertical: Spacing.sm,
  },
  iconSlot: {
    marginHorizontal: Spacing.xs,
  },
  helper: {
    marginTop: Spacing.xs,
  },
});
