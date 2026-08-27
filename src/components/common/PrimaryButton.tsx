import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Colors, BorderRadius, Spacing, TouchTargets, Shadows } from '@/constants/theme';
import { Typography } from '../ui/Typography';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  style?: ViewStyle;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  icon,
  disabled = false,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled && styles.disabledButton,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.88}
    >
      {icon}
      <Typography
        variant="bodyBold"
        color={Colors.textOnPrimary}
        align="center"
        style={[styles.text, icon ? styles.textWithIcon : null]}
      >
        {title}
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: TouchTargets.standard,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
    width: '100%',
    ...Shadows.subtle,
  },
  disabledButton: {
    backgroundColor: Colors.cardBorder,
  },
  text: {
    fontSize: 16,
  },
  textWithIcon: {
    marginLeft: Spacing.xs,
  },
});
