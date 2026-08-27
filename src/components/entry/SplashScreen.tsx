import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors, Spacing } from '@/constants/theme';
import { Typography } from '../ui/Typography';
import { BrandMark } from '../common/BrandMark';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 1200);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <BrandMark size="large" />

        <Typography
          variant="body"
          color={Colors.textSecondary}
          align="center"
          style={styles.tagline}
        >
          The right agricultural expertise, when you need it.
        </Typography>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  content: {
    alignItems: 'center',
  },
  tagline: {
    marginTop: Spacing.lg,
    maxWidth: 280,
    fontSize: 16,
    lineHeight: 24,
  },
});
