import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, BorderRadius, Spacing, Shadows, TouchTargets } from '@/constants/theme';
import { useAuth, UserRole } from '@/context/AuthContext';
import { Typography } from '../ui/Typography';

interface LandingSplashScreenProps {
  onRoleSelected: (role: UserRole) => void;
}

export const LandingSplashScreen: React.FC<LandingSplashScreenProps> = ({
  onRoleSelected,
}) => {
  const { selectRole } = useAuth();

  const handleSelect = (role: UserRole) => {
    selectRole(role);
    onRoleSelected(role);
  };

  return (
    <View style={styles.container}>
      {/* Brand Hero Header */}
      <View style={styles.heroSection}>
        <View style={styles.logoBadge}>
          <Ionicons name="leaf" size={38} color={Colors.textInverse} />
        </View>

        <Typography variant="hero" align="center" color={Colors.textOnPrimary} style={styles.title}>
          AgriSetu • कृषिसेतु
        </Typography>

        <Typography
          variant="subtitle"
          align="center"
          color="rgba(255, 255, 255, 0.9)"
          style={styles.subtitle}
        >
          भारतीय किसानों एवं कृषि वैज्ञानिकों का विश्वसनीय डिजिटल सेतु
        </Typography>

        <Typography
          variant="caption"
          align="center"
          color="#A7F3D0"
          style={styles.tagline}
        >
          Connecting Farmers Directly with Certified KVK Agricultural Scientists
        </Typography>
      </View>

      {/* Role Selection Prompt */}
      <View style={styles.contentSection}>
        <Typography variant="h2" align="center" color={Colors.textPrimary} style={styles.promptTitle}>
          अपनी भूमिका चुनें (Select Your Role)
        </Typography>

        <Typography variant="body" align="center" color={Colors.textSecondary} style={styles.promptSub}>
          अपनी आवश्यकता के अनुसार ऐप का उपयोग शुरू करें
        </Typography>

        {/* Option 1: Farmer Card */}
        <TouchableOpacity
          style={styles.farmerCard}
          onPress={() => handleSelect('farmer')}
          activeOpacity={0.85}
        >
          <View style={styles.roleIconCircleFarmer}>
            <MaterialCommunityIcons name="sprout" size={32} color={Colors.textOnPrimary} />
          </View>

          <View style={styles.roleTextCol}>
            <Typography variant="h2" color={Colors.primaryDark}>
              मैं किसान हूँ (I am a Farmer)
            </Typography>
            <Typography variant="body" color={Colors.textSecondary} style={styles.roleSub}>
              बोलकर या फोटो खींचकर फसल रोग की निःशुल्क सलाह पाएं, मंडी भाव देखें
            </Typography>
            <View style={styles.featuresRow}>
              <View style={styles.featureBadge}>
                <Ionicons name="mic" size={12} color={Colors.primary} />
                <Typography variant="caption" color={Colors.primaryDark} style={styles.featureText}>
                  बोलकर पूछें
                </Typography>
              </View>
              <View style={styles.featureBadge}>
                <Ionicons name="camera" size={12} color={Colors.primary} />
                <Typography variant="caption" color={Colors.primaryDark} style={styles.featureText}>
                  फोटो जांच
                </Typography>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {/* Option 2: Agricultural Expert Card */}
        <TouchableOpacity
          style={styles.expertCard}
          onPress={() => handleSelect('expert')}
          activeOpacity={0.85}
        >
          <View style={styles.roleIconCircleExpert}>
            <Ionicons name="ribbon" size={32} color={Colors.accentDark} />
          </View>

          <View style={styles.roleTextCol}>
            <Typography variant="h2" color={Colors.textPrimary}>
              मैं कृषि वैज्ञानिक हूँ (I am an Expert)
            </Typography>
            <Typography variant="body" color={Colors.textSecondary} style={styles.roleSub}>
              KVK/ICAR वैज्ञानिक के रूप में किसानों के प्रश्नों का समाधान करें
            </Typography>
            <View style={styles.featuresRow}>
              <View style={styles.featureBadgeExpert}>
                <Ionicons name="briefcase" size={12} color={Colors.accentDark} />
                <Typography variant="caption" color={Colors.accentDark} style={styles.featureText}>
                  परामर्श प्रबंधन
                </Typography>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  heroSection: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.hero,
    paddingBottom: Spacing.xxxl,
    alignItems: 'center',
    borderBottomLeftRadius: BorderRadius.round,
    borderBottomRightRadius: BorderRadius.round,
  },
  logoBadge: {
    width: 68,
    height: 68,
    borderRadius: 34,
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
  tagline: {
    marginTop: Spacing.sm,
    fontSize: 12,
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
    width: 56,
    height: 56,
    borderRadius: 28,
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
  },
  featureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryContainer,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  featureText: {
    marginLeft: 3,
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
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.accentLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureBadgeExpert: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.accentLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
});
