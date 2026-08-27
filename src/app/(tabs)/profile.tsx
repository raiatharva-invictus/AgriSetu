import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Colors, BorderRadius, Spacing, Shadows } from '@/constants/theme';

export default function ProfileScreen() {
  const farmerData = {
    name: 'Ramesh Patel',
    phone: '+91 98765 43210',
    village: 'Katol, Nagpur District',
    state: 'Maharashtra',
    landSize: '5.5 Acres',
    mainCrops: ['Wheat (गेहूं)', 'Cotton (कपास)', 'Soybean (सोयाबीन)'],
    language: 'Hindi / हिंदी',
    kisanCreditCard: 'Verified ✓',
  };

  const menuSections = [
    {
      id: 'farm',
      title: 'Farm Details',
      subtitle: 'Land size, crop records & soil test reports',
      icon: <MaterialCommunityIcons name="tractor" size={22} color={Colors.primaryLight} />,
    },
    {
      id: 'language',
      title: 'App Language',
      subtitle: 'Currently set to Hindi / हिंदी',
      icon: <Ionicons name="language" size={22} color={Colors.primaryLight} />,
    },
    {
      id: 'saved',
      title: 'Saved Tips & Advisory',
      subtitle: '4 bookmarks',
      icon: <Ionicons name="bookmark" size={22} color={Colors.primaryLight} />,
    },
    {
      id: 'help',
      title: 'Help & Helpline Support',
      subtitle: 'Kisan Call Centre 1800-180-1551',
      icon: <Ionicons name="call" size={22} color={Colors.primaryLight} />,
    },
  ];

  return (
    <ScreenContainer scrollable={true}>
      {/* Top Profile Banner */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarLarge}>
          <Ionicons name="person" size={40} color="#FFFFFF" />
        </View>
        <Text style={styles.farmerName}>{farmerData.name}</Text>
        <Text style={styles.farmerLocation}>{farmerData.village}, {farmerData.state}</Text>
        <Badge label={`Kisan ID: ${farmerData.kisanCreditCard}`} variant="success" style={styles.badgeMargin} />
      </View>

      <View style={styles.content}>
        {/* Farm Summary Card */}
        <Card style={styles.summaryCard} variant="elevated">
          <Text style={styles.cardHeaderTitle}>Farm Overview</Text>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Ionicons name="map-outline" size={20} color={Colors.primaryLight} />
              <Text style={styles.statNumber}>{farmerData.landSize}</Text>
              <Text style={styles.statLabel}>Total Land</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statBox}>
              <MaterialCommunityIcons name="sprout-outline" size={20} color={Colors.primaryLight} />
              <Text style={styles.statNumber}>{farmerData.mainCrops.length} Crops</Text>
              <Text style={styles.statLabel}>Active Season</Text>
            </View>
          </View>

          <View style={styles.cropsTagsRow}>
            <Text style={styles.cropsLabel}>Primary Crops: </Text>
            <View style={styles.cropPills}>
              {farmerData.mainCrops.map((c) => (
                <View key={c} style={styles.cropPill}>
                  <Text style={styles.cropPillText}>{c}</Text>
                </View>
              ))}
            </View>
          </View>
        </Card>

        {/* Settings Menu List */}
        <View style={styles.menuSection}>
          <Text style={styles.menuGroupTitle}>Account Settings</Text>

          {menuSections.map((item) => (
            <Card key={item.id} style={styles.menuCard} variant="outlined" onPress={() => {}}>
              <View style={styles.menuRow}>
                <View style={styles.menuIconBox}>{item.icon}</View>
                <View style={styles.menuTextGroup}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={Colors.textLight} />
              </View>
            </Card>
          ))}
        </View>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>AgriSetu v1.0.0 (Android Expo)</Text>
        </View>
      </View>
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
    backgroundColor: Colors.surfaceTint,
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
    backgroundColor: '#C8E6C9',
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
    backgroundColor: '#F1F5F9',
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
    marginRight: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  cropPillText: {
    fontSize: 12,
    color: Colors.textPrimary,
    fontWeight: '500',
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
    backgroundColor: Colors.surfaceTint,
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
  versionContainer: {
    alignItems: 'center',
    marginVertical: Spacing.xl,
  },
  versionText: {
    fontSize: 12,
    color: Colors.textLight,
  },
});
