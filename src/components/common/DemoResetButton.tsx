import React from 'react';
import { StyleSheet, TouchableOpacity, Alert, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, Spacing } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { Typography } from '../ui/Typography';

interface DemoResetButtonProps {
  style?: ViewStyle;
  variant?: 'light' | 'dark';
}

export const DemoResetButton: React.FC<DemoResetButtonProps> = ({
  style,
  variant = 'dark',
}) => {
  const { resetOnboarding } = useAuth();

  const handleReset = () => {
    Alert.alert(
      'Reset Demo State?',
      'This will clear local session storage and restart the app from Splash & Language Selection. Useful for live hackathon presentations.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset & Re-onboard',
          style: 'destructive',
          onPress: async () => {
            await resetOnboarding();
          },
        },
      ]
    );
  };

  const isDark = variant === 'dark';

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isDark ? styles.darkButton : styles.lightButton,
        style,
      ]}
      onPress={handleReset}
      activeOpacity={0.8}
    >
      <Ionicons
        name="refresh-circle-outline"
        size={18}
        color={isDark ? Colors.harvestAmber : Colors.harvestAmber}
      />
      <Typography
        variant="caption"
        color={isDark ? Colors.textInverse : Colors.textPrimary}
        style={styles.text}
      >
        Reset Demo
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: 4,
    borderRadius: BorderRadius.round,
    borderWidth: 1,
  },
  darkButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  lightButton: {
    backgroundColor: Colors.surface,
    borderColor: Colors.cardBorder,
  },
  text: {
    marginLeft: 4,
    fontWeight: '700',
    fontSize: 11,
  },
});
