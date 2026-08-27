import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Colors, BorderRadius, Spacing } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { LanguageModal } from '@/components/ui/LanguageModal';
import { Button } from '@/components/ui/Button';

export default function ProfileScreen() {
  const { farmerProfile, userRole, resetOnboarding } = useAuth();
  const [langModalVisible, setLangModalVisible] = useState(false);

  return (
    <ScreenContainer scrollable={true}>
      {/* Top Profile Banner */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarLarge}>
          <Ionicons name="person" size={40} color="#FFFFFF" />
        </View>
        <Text style={styles.farmerName}>{farmerProfile.name}</Text>
        <Text style={styles.farmerLocation}>
          {farmerProfile.village}, {farmerProfile.district}
        </Text>
        <Badge
          label={`Role: ${userRole === 'expert' ? 'Agricultural Scientist' : 'Verified Farmer'}`}
          variant="success"
          style={styles.badgeMargin}
        />
      </View>

      <View style={styles.content}>
        {/* Farm Summary Card */}
        <Card style={styles.summaryCard} variant="elevated">
          <Text style={styles.cardHeaderTitle}>Farm & Crop Overview</Text>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Ionicons name="map-outline" size={20} color={Colors.primary} />
              <Text style={styles.statNumber}>{farmerProfile.landSize || '5.5 Acres'}</Text>
              <Text style={styles.statLabel}>Total Land</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statBox}>
              <MaterialCommunityIcons name="sprout-outline" size={20} color={Colors.primary} />
              <Text style={styles.statNumber}>
                {farmerProfile.primaryCrops.length} Crops
              </Text>
              <Text style={styles.statLabel}>Active Season</Text>
            </View>
          </View>

          <View style={styles.cropsTagsRow}>
            <Text style={styles.cropsLabel}>Primary Crops: </Text>
            <View style={styles.cropPills}>
              {farmerProfile.primaryCrops.map((c) => (
                <View key={c} style={styles.cropPill}>
                  <Text style={styles.cropPillText}>{c}</Text>
                </View>
              ))}
            </View>
          </View>
        </Card>

        {/* Account Options */}
        <View style={styles.menuSection}>
          <Text style={styles.menuGroupTitle}>App Controls & Settings</Text>

          <Card
            style={styles.menuCard}
            variant="outlined"
            onPress={() => setLangModalVisible(true)}
          >
            <View style={styles.menuRow}>
              <View style={styles.menuIconBox}>
                <Ionicons name="language" size={22} color={Colors.primary} />
              </View>
              <View style={styles.menuTextGroup}>
                <Text style={styles.menuTitle}>Change App Language</Text>
                <Text style={styles.menuSubtitle}>
                  {farmerProfile.preferredLanguage} • Switch between English, Hindi, Bengali, Assamese
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
            </View>
          </Card>

          <Card
            style={styles.menuCard}
            variant="outlined"
            onPress={() =>
              Alert.alert('Kisan Helpline', 'Connecting to Kisan Call Centre 1800-180-1551...')
            }
          >
            <View style={styles.menuRow}>
              <View style={styles.menuIconBox}>
                <Ionicons name="call" size={22} color={Colors.primary} />
              </View>
              <View style={styles.menuTextGroup}>
                <Text style={styles.menuTitle}>Kisan Call Centre Helpline</Text>
                <Text style={styles.menuSubtitle}>Free 24/7 Government Toll Free 1800-180-1551</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
            </View>
          </Card>

          <Button
            title="पुनः भूमिका चुनें (Re-run Onboarding / Switch Persona)"
            onPress={resetOnboarding}
            variant="outline"
            size="medium"
            style={styles.resetBtn}
          />
        </View>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>AgriSetu v1.0.0 (Expo Web & Android)</Text>
        </View>
      </View>

      <LanguageModal visible={langModalVisible} onClose={() => setLangModalVisible(false)} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  profileHeader: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxl,
    alignItems: 'center',
  },
  avatarLarge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  farmerName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  farmerLocation: {
    fontSize: 14,
    color: '#C8E6C9',
    marginTop: 2,
  },
  badgeMargin: {
    marginTop: Spacing.sm,
  },
  content: {
    paddingHorizontal: Spacing.lg,
    marginTop: -Spacing.xl,
  },
  summaryCard: {
    padding: Spacing.lg,
  },
  cardHeaderTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: Colors.surfaceSecondary,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.primaryDark,
    marginTop: 2,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: Colors.cardBorder,
  },
  cropsTagsRow: {
    marginTop: Spacing.md,
  },
  cropsLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 6,
  },
  cropPills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cropPill: {
    backgroundColor: Colors.primaryContainer,
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
    marginRight: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  cropPillText: {
    fontSize: 12,
    color: Colors.primaryDark,
    fontWeight: '600',
  },
  menuSection: {
    marginTop: Spacing.xl,
  },
  menuGroupTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  menuCard: {
    marginBottom: Spacing.md,
    padding: Spacing.md,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  menuTextGroup: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  menuSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  resetBtn: {
    marginTop: Spacing.md,
  },
  versionContainer: {
    alignItems: 'center',
    marginVertical: Spacing.xl,
  },
  versionText: {
    fontSize: 12,
    color: Colors.textMuted,
  },
});
