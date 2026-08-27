import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
  const handleSimulateCamera = () => {
    // Simulate capturing a clear leaf photo
    const sampleLeafPhoto = 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=600';
    onPhotoCaptured(sampleLeafPhoto);
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
        <TouchableOpacity
          style={styles.cameraBox}
          onPress={handleSimulateCamera}
          activeOpacity={0.8}
        >
          <View style={styles.cameraIconCircle}>
            <Ionicons name="camera" size={32} color={Colors.primary} />
          </View>
          <Typography variant="bodyBold" color={Colors.primaryDark}>
            फोटो खींचें / फोटो चुनें (Take Photo)
          </Typography>
          <Typography variant="caption" color={Colors.textSecondary} style={styles.subtext}>
            पत्तियों पर कीड़े, धब्बे या सूखे हिस्से को कैमरे के सामने लाएं
          </Typography>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    marginBottom: Spacing.lg,
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
    backgroundColor: Colors.surfaceSecondary,
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  badgeText: {
    marginLeft: 4,
    fontSize: 11,
  },
  title: {
    marginTop: 2,
    marginBottom: Spacing.md,
  },
  cameraBox: {
    backgroundColor: Colors.primaryContainer,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.primaryLight,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: TouchTargets.hero,
  },
  cameraIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
  subtext: {
    marginTop: 2,
    textAlign: 'center',
  },
  previewContainer: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  previewImage: {
    width: '100%',
    height: 160,
    backgroundColor: Colors.surfaceSecondary,
  },
  overlayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.sm,
    backgroundColor: Colors.surface,
  },
  photoSuccessTag: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagText: {
    marginLeft: 4,
  },
  retakeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.xs,
  },
  retakeText: {
    marginLeft: 2,
  },
});
