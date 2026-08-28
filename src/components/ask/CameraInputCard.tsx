import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Colors, BorderRadius, Spacing, TouchTargets } from '@/constants/theme';
import { Typography } from '../ui/Typography';

interface CameraInputCardProps {
  photoUrl: string | null;
  onPhotoCaptured: (url: string) => void;
  onPhotoCleared: () => void;
}

export const CameraInputCard: React.FC<CameraInputCardProps> = ({
  photoUrl,
  onPhotoCaptured,
  onPhotoCleared,
}) => {
  const handleLaunchCamera = async () => {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert(
          'कैमरा अनुमति आवश्यक है (Camera Permission Needed)',
          'पौधे की फोटो लेने के लिए कृपया कैमरा एक्सेस की अनुमति दें।'
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        quality: 0.8,
        allowsEditing: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        onPhotoCaptured(result.assets[0].uri);
      }
    } catch (err: any) {
      console.warn('Camera launch error:', err);
      // Fallback gallery selection
      handleLaunchGallery();
    }
  };

  const handleLaunchGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 0.8,
        allowsEditing: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        onPhotoCaptured(result.assets[0].uri);
      }
    } catch (err: any) {
      console.warn('Gallery pick error:', err);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.badge}>
          <Ionicons name="camera" size={16} color={Colors.textPrimary} />
          <Typography variant="label" color={Colors.textPrimary} style={styles.badgeText}>
            2. फसल की फोटो (TAKE LEAF PHOTO)
          </Typography>
        </View>
        <Typography variant="caption" color={Colors.textMuted}>
          ऐच्छिक (Optional)
        </Typography>
      </View>

      <Typography variant="h3" color={Colors.textPrimary} style={styles.title}>
        प्रभावित पत्ते या पौधे की फोटो खींचें
      </Typography>

      {photoUrl ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: photoUrl }} style={styles.previewImage} />
          <View style={styles.overlayRow}>
            <View style={styles.photoSuccessTag}>
              <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
              <Typography variant="label" color={Colors.success} style={styles.tagText}>
                Photo Attached
              </Typography>
            </View>
            <TouchableOpacity style={styles.retakeBtn} onPress={onPhotoCleared}>
              <Ionicons name="refresh" size={16} color={Colors.danger} />
              <Typography variant="caption" color={Colors.danger} style={styles.retakeText}>
                हटाएं (Remove)
              </Typography>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.cameraHeroBtn}
            onPress={handleLaunchCamera}
            activeOpacity={0.8}
          >
            <Ionicons name="camera-outline" size={28} color={Colors.primary} />
            <Typography variant="label" color={Colors.primary} style={styles.btnLabel}>
              कैमरा खोलें (Take Photo)
            </Typography>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.galleryBtn}
            onPress={handleLaunchGallery}
            activeOpacity={0.8}
          >
            <Ionicons name="images-outline" size={22} color={Colors.textSecondary} />
            <Typography variant="caption" color={Colors.textSecondary} style={styles.btnLabel}>
              गैलरी से चुनें (Gallery)
            </Typography>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight + '25',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs / 2,
    borderRadius: BorderRadius.sm,
    gap: Spacing.xs,
  },
  badgeText: {
    fontWeight: '700',
  },
  title: {
    marginBottom: Spacing.md,
  },
  actionRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  cameraHeroBtn: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryLight + '15',
    borderWidth: 1.5,
    borderColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
    minHeight: TouchTargets.standard,
  },
  galleryBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surfaceSecondary,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.xs,
    minHeight: TouchTargets.standard,
  },
  btnLabel: {
    fontWeight: '600',
  },
  previewContainer: {
    position: 'relative',
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    marginTop: Spacing.xs,
  },
  previewImage: {
    width: '100%',
    height: 180,
    borderRadius: BorderRadius.lg,
  },
  overlayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    backgroundColor: 'rgba(0,0,0,0.6)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  photoSuccessTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  tagText: {
    fontWeight: '600',
  },
  retakeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  retakeText: {
    fontWeight: '600',
  },
});
