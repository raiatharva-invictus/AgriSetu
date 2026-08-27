import React from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, BorderRadius, Spacing, Shadows } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageCode } from '@/locales';
import { UserRole } from '@/types';
import { Typography } from '../ui/Typography';

interface LandingSplashScreenProps {
  onRoleSelected: (role: UserRole) => void;
}

export const LandingSplashScreen: React.FC<LandingSplashScreenProps> = ({
  onRoleSelected,
}) => {
  const { selectRole } = useAuth();
  const { language, setLanguage, supportedLanguages, t } = useLanguage();

  const handleSelectRole = (role: UserRole) => {
    selectRole(role);
    onRoleSelected(role);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Top Language Bar directly on Landing Page */}
      <View style={styles.topLanguageSection}>
        <View style={styles.langHeaderRow}>
          <Ionicons name="language" size={20} color={Colors.textOnPrimary} />
          <Typography variant="label" color="#A7F3D0" style={styles.langHeaderTitle}>
            भाषा चुनें / SELECT LANGUAGE:
          </Typography>
        </View>

        <View style={styles.langPillsRow}>
          {supportedLanguages.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <TouchableOpacity
                key={lang.code}
                style={[styles.langPill, isSelected && styles.selectedLangPill]}
                onPress={() => setLanguage(lang.code as LanguageCode)}
                activeOpacity={0.8}
              >
                <Typography
                  variant="caption"
                  color={isSelected ? Colors.primaryDark : Colors.textOnPrimary}
                  style={styles.langPillText}
                >
                  {lang.nativeName}
                </Typography>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Brand Hero Header */}
      <View style={styles.heroSection}>
        <View style={styles.logoBadge}>
          <Ionicons name="leaf" size={42} color={Colors.textInverse} />
        </View>

        <Typography variant="hero" align="center" color={Colors.textOnPrimary} style={styles.title}>
          {t('appName')} • कृषिसेतु
        </Typography>

        <Typography
          variant="subtitle"
          align="center"
          color="rgba(255, 255, 255, 0.92)"
          style={styles.subtitle}
        >
          Connecting Farmers Directly with Certified Agronomists & Agricultural Experts
        </Typography>
      </View>

      {/* Role Selection Section */}
      <View style={styles.contentSection}>
        <Typography variant="h2" align="center" color={Colors.textPrimary} style={styles.promptTitle}>
          अपनी भूमिका चुनें (Select Your Role)
        </Typography>

        <Typography variant="body" align="center" color={Colors.textSecondary} style={styles.promptSub}>
          चुनी गई भूमिका पूरे ऐप में लागू रहेगी
        </Typography>

        {/* Option 1: Farmer Card */}
        <TouchableOpacity
          style={styles.farmerCard}
          onPress={() => handleSelectRole('farmer')}
          activeOpacity={0.88}
        >
          <View style={styles.roleIconCircleFarmer}>
            <MaterialCommunityIcons name="sprout" size={34} color={Colors.textOnPrimary} />
          </View>

          <View style={styles.roleTextCol}>
            <Typography variant="h2" color={Colors.primaryDark}>
              मैं किसान हूँ (Farmer)
            </Typography>

            <Typography variant="body" color={Colors.textSecondary} style={styles.roleSub}>
              बोलकर या फोटो खींचकर फसल समस्या का समाधान पाएं, मंडी भाव देखें
            </Typography>

            <View style={styles.featuresRow}>
              <View style={styles.featureBadge}>
                <Ionicons name="mic" size={13} color={Colors.primary} />
                <Typography variant="caption" color={Colors.primaryDark} style={styles.featureText}>
                  {t('speakProblem')}
                </Typography>
              </View>

              <View style={styles.featureBadge}>
                <Ionicons name="camera" size={13} color={Colors.primary} />
                <Typography variant="caption" color={Colors.primaryDark} style={styles.featureText}>
                  {t('takeLeafPhoto')}
                </Typography>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {/* Option 2: Expert Card (Public ICAR & Private Agribusiness) */}
        <TouchableOpacity
          style={styles.expertCard}
          onPress={() => handleSelectRole('expert')}
          activeOpacity={0.88}
        >
          <View style={styles.roleIconCircleExpert}>
            <Ionicons name="ribbon" size={34} color={Colors.accentDark} />
          </View>

          <View style={styles.roleTextCol}>
            <Typography variant="h2" color={Colors.textPrimary}>
              मैं कृषि विशेषज्ञ हूँ (Expert / Agronomist)
            </Typography>

            <Typography variant="body" color={Colors.textSecondary} style={styles.roleSub}>
              सरकारी संस्थान (ICAR/KVK), प्राइवेट कंपनी (Syngenta, Bayer), या स्वतंत्र सलाहकार
            </Typography>

            <View style={styles.featuresRow}>
              <View style={styles.featureBadgeExpert}>
                <Ionicons name="shield-checkmark" size={13} color={Colors.accentDark} />
                <Typography variant="caption" color={Colors.accentDark} style={styles.featureText}>
                  प्रमाणित कार्य रिकॉर्ड (Proof of Work)
                </Typography>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: Spacing.xxl,
  },
  topLanguageSection: {
    backgroundColor: Colors.primaryDark,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
  },
  langHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  langHeaderTitle: {
    marginLeft: 6,
    fontWeight: '700',
    fontSize: 11,
    letterSpacing: 0.5,
  },
  langPillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  langPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  selectedLangPill: {
    backgroundColor: '#A7F3D0',
    borderColor: '#A7F3D0',
  },
  langPillText: {
    fontWeight: '700',
  },
  heroSection: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xxxl,
    alignItems: 'center',
    borderBottomLeftRadius: BorderRadius.round,
    borderBottomRightRadius: BorderRadius.round,
  },
  logoBadge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
    ...Shadows.card,
  },
  title: {
    marginBottom: Spacing.xs,
  },
  subtitle: {
    maxWidth: 320,
    lineHeight: 22,
  },
  contentSection: {
    padding: Spacing.xl,
    marginTop: -Spacing.lg,
  },
  promptTitle: {
    marginBottom: 4,
  },
  promptSub: {
    marginBottom: Spacing.xl,
  },
  farmerCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: Colors.primary,
    marginBottom: Spacing.lg,
    ...Shadows.card,
  },
  roleIconCircleFarmer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roleTextCol: {
    marginLeft: Spacing.md,
    flex: 1,
  },
  roleSub: {
    fontSize: 13,
    lineHeight: 18,
    marginTop: 2,
    marginBottom: Spacing.sm,
  },
  featuresRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
    flexWrap: 'wrap',
  },
  featureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryContainer,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  featureText: {
    marginLeft: 4,
    fontWeight: '600',
  },
  expertCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    flexDirection: 'row',
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    ...Shadows.subtle,
  },
  roleIconCircleExpert: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.accentLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureBadgeExpert: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.accentLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
});
