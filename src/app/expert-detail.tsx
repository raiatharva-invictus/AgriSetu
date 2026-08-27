import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { Typography } from '@/components/ui/Typography';
import { Colors, Spacing, BorderRadius, Shadows } from '@/constants/theme';
import { mockExperts } from '@/data/mockData';
import { ExpertProfileHeader } from '@/components/experts/ExpertProfileHeader';
import { ExpertProfessionalWork } from '@/components/experts/ExpertProfessionalWork';
import { PrimaryButton } from '@/components/common/PrimaryButton';

export default function ExpertDetailScreen() {
  const router = useRouter();
  const { expertId, caseId } = useLocalSearchParams<{ expertId: string; caseId?: string }>();

  const expert = mockExperts.find((e) => e.id === expertId) || mockExperts[0];

  const handleBookNow = () => {
    router.push({
      pathname: '/expert-match',
      params: { expertId: expert.id, caseId: caseId || '' },
    });
  };

  return (
    <ScreenContainer scrollable={true}>
      {/* Header Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>

        <Typography variant="h2" color={Colors.textPrimary} style={styles.headerTitle}>
          {expert.name} — Expert Profile
        </Typography>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Card */}
        <ExpertProfileHeader expert={expert} />

        {/* Proof of Work & Professional Background */}
        <View style={styles.sectionSpacer} />
        <ExpertProfessionalWork expert={expert} />

        {/* Action Button */}
        <View style={styles.actionCard}>
          <Typography variant="h3" color={Colors.textPrimary}>
            Request Consultation
          </Typography>
          <Typography variant="caption" color={Colors.textSecondary} style={styles.subText}>
            Direct guidance line with ICAR/KVK verified agronomist.
          </Typography>

          <PrimaryButton
            title="Book Consultation"
            onPress={handleBookNow}
            style={styles.bookBtn}
          />
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    marginLeft: Spacing.sm,
  },
  scrollContent: {
    padding: Spacing.lg,
  },
  sectionSpacer: {
    marginTop: Spacing.md,
  },
  actionCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginTop: Spacing.lg,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    ...Shadows.card,
  },
  subText: {
    marginTop: 2,
    marginBottom: Spacing.md,
  },
  bookBtn: {
    height: 48,
  },
  bottomSpacer: {
    height: Spacing.xxxl,
  },
});
