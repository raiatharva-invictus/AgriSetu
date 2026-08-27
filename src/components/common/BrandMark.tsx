import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Shadows } from '@/constants/theme';
import { Typography } from '../ui/Typography';

interface BrandMarkProps {
  size?: 'small' | 'medium' | 'large';
}

export const BrandMark: React.FC<BrandMarkProps> = ({ size = 'medium' }) => {
  const iconSize = size === 'large' ? 44 : size === 'medium' ? 32 : 24;
  const badgeSize = size === 'large' ? 80 : size === 'medium' ? 60 : 44;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.badge,
          { width: badgeSize, height: badgeSize, borderRadius: badgeSize / 2 },
        ]}
      >
        <Ionicons name="leaf" size={iconSize} color={Colors.textOnPrimary} />
      </View>

      <Typography
        variant={size === 'large' ? 'hero' : 'h2'}
        color={Colors.textPrimary}
        align="center"
        style={styles.brandName}
      >
        AgriSetu • कृषिसेतु
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  badge: {
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    ...Shadows.subtle,
  },
  brandName: {
    letterSpacing: -0.3,
  },
});
