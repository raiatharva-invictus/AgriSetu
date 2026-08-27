import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, Spacing, Shadows, TouchTargets } from '@/constants/theme';
import { useLanguage } from '@/context/LanguageContext';
import { Typography } from '../ui/Typography';

interface HeroVoiceCameraActionProps {
  onVoicePress: () => void;
  onCameraPress: () => void;
}

export const HeroVoiceCameraAction: React.FC<HeroVoiceCameraActionProps> = ({
  onVoicePress,
  onCameraPress,
}) => {
  const { t } = useLanguage();

  return (
    <View style={styles.card}>
      <Typography variant="label" color={Colors.accentDark} style={styles.eyebrow}>
        {t('cropHelpHeroEyebrow')}
      </Typography>

      <Typography variant="h2" color={Colors.textPrimary} style={styles.mainTitle}>
        {t('cropHelpHeroTitle')}
      </Typography>

      <Typography variant="body" color={Colors.textSecondary} style={styles.subTitle}>
        {t('cropHelpHeroSub')}
      </Typography>

      <View style={styles.actionRow}>
        {/* Voice Button */}
        <TouchableOpacity
          style={styles.voiceButton}
          onPress={onVoicePress}
          activeOpacity={0.85}
        >
          <View style={styles.micCircle}>
            <Ionicons name="mic" size={26} color={Colors.textOnPrimary} />
          </View>
          <Typography variant="bodyBold" color={Colors.textOnPrimary} align="center" style={styles.actionBtnText}>
            {t('speakProblem')}
          </Typography>
        </TouchableOpacity>

        {/* Camera Button */}
        <TouchableOpacity
          style={styles.cameraButton}
          onPress={onCameraPress}
          activeOpacity={0.85}
        >
          <View style={styles.cameraCircle}>
            <Ionicons name="camera" size={26} color={Colors.textPrimary} />
          </View>
          <Typography variant="bodyBold" color={Colors.textPrimary} align="center" style={styles.actionBtnText}>
            {t('takeLeafPhoto')}
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.accentLight,
    borderRadius: BorderRadius.xl,
    padding: Spacing.md + 2,
    borderWidth: 2,
    borderColor: '#FDBA74',
    marginHorizontal: Spacing.lg,
    marginTop: -Spacing.lg,
    ...Shadows.card,
  },
  eyebrow: {
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontSize: 11,
    marginBottom: 2,
  },
  mainTitle: {
    marginBottom: 4,
  },
  subTitle: {
    marginBottom: Spacing.md,
    lineHeight: 20,
  },
  actionRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  voiceButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: TouchTargets.hero,
    ...Shadows.subtle,
  },
  micCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
  cameraButton: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderWidth: 2,
    borderColor: Colors.cardBorder,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: TouchTargets.hero,
  },
  cameraCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
  actionBtnText: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
  },
});
