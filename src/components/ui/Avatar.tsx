import React from 'react';
import { StyleSheet, View, Image, StyleProp, ViewStyle } from 'react-native';
import { Colors } from '@/constants/theme';
import { Typography } from './Typography';

interface AvatarProps {
  name: string;
  imageUri?: string;
  size?: number;
  isOnline?: boolean;
  showStatusDot?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  imageUri,
  size = 48,
  isOnline = false,
  showStatusDot = false,
  style,
}) => {
  const getInitials = (fullName: string) => {
    const parts = fullName.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return fullName.substring(0, 2).toUpperCase();
  };

  const fontSize = size * 0.38;

  return (
    <View style={[{ width: size, height: size }, style]}>
      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={[
            styles.avatarImage,
            { width: size, height: size, borderRadius: size / 2 },
          ]}
        />
      ) : (
        <View
          style={[
            styles.fallbackContainer,
            { width: size, height: size, borderRadius: size / 2 },
          ]}
        >
          <Typography
            variant="bodyBold"
            color={Colors.primaryDark}
            style={{ fontSize }}
          >
            {getInitials(name)}
          </Typography>
        </View>
      )}

      {showStatusDot && (
        <View
          style={[
            styles.statusDot,
            {
              backgroundColor: isOnline ? Colors.success : Colors.textMuted,
              width: size * 0.28,
              height: size * 0.28,
              borderRadius: (size * 0.28) / 2,
              bottom: 0,
              right: 0,
            },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatarImage: {
    backgroundColor: Colors.surfaceSecondary,
  },
  fallbackContainer: {
    backgroundColor: Colors.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
  },
  statusDot: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: Colors.surface,
  },
});
