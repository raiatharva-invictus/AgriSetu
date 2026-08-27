import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, Spacing, Shadows } from '@/constants/theme';
import { CropCase } from '@/types';
import { Typography } from './Typography';
import { StatusBadge } from './StatusBadge';

interface CaseCardProps {
  cropCase: CropCase;
  onPress: (cropCase: CropCase) => void;
  style?: StyleProp<ViewStyle>;
}

export const CaseCard: React.FC<CaseCardProps> = ({ cropCase, onPress, style }) => {
  return (
    <TouchableOpacity
      style={[styles.card, style]}
      onPress={() => onPress(cropCase)}
      activeOpacity={0.8}
    >
      <View style={styles.headerRow}>
        <View style={styles.cropBadge}>
          <Ionicons name="leaf" size={16} color={Colors.primary} />
          <Typography variant="label" color={Colors.primaryDark} style={styles.cropText}>
            {cropCase.cropName}
          </Typography>
        </View>

        <StatusBadge status={cropCase.status} />
      </View>

      <View style={styles.bodyRow}>
        {cropCase.photoUrl ? (
          <Image source={{ uri: cropCase.photoUrl }} style={styles.photo} />
        ) : (
          <View style={styles.photoPlaceholder}>
            <Ionicons name="camera-outline" size={24} color={Colors.textMuted} />
          </View>
        )}

        <View style={styles.detailsColumn}>
          <Typography variant="bodyBold" color={Colors.textPrimary} numberOfLines={2}>
            {cropCase.title}
          </Typography>

          <View style={styles.metaRow}>
            {cropCase.hasVoiceNote && (
              <View style={styles.iconTag}>
                <Ionicons name="mic" size={14} color={Colors.accent} />
                <Typography variant="caption" color={Colors.accent} style={styles.tagText}>
                  Voice Message
                </Typography>
              </View>
            )}

            <Typography variant="caption" color={Colors.textMuted}>
              {cropCase.createdAt}
            </Typography>
          </View>

          {cropCase.assignedExpertName && (
            <Typography variant="caption" color={Colors.textSecondary} style={styles.expertText}>
              Assigned: {cropCase.assignedExpertName}
            </Typography>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    marginBottom: Spacing.md,
    ...Shadows.subtle,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  cropBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryContainer,
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  cropText: {
    marginLeft: 4,
  },
  bodyRow: {
    flexDirection: 'row',
  },
  photo: {
    width: 64,
    height: 64,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surfaceSecondary,
  },
  photoPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surfaceSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsColumn: {
    flex: 1,
    marginLeft: Spacing.md,
    justifyContent: 'center',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: 4,
  },
  iconTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.accentLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  tagText: {
    marginLeft: 2,
    fontWeight: '600',
  },
  expertText: {
    marginTop: 4,
  },
});
