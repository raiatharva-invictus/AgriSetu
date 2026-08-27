import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, Spacing, Shadows } from '@/constants/theme';
import { useLanguage } from '@/context/LanguageContext';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { Typography } from '@/components/ui/Typography';
import { CaseStatusBadge } from '@/components/cases/CaseStatusBadge';
import { CaseTimeline } from '@/components/cases/CaseTimeline';
import { ConsultationSummaryCard } from '@/components/cases/ConsultationSummaryCard';
import { OutcomeSelector } from '@/components/cases/OutcomeSelector';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { mockCases } from '@/data/mockData';
import { Case, CaseStatus } from '@/types/case';

export default function CaseDetailScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const { caseId } = useLocalSearchParams<{ caseId: string }>();

  // Find target case or fallback to first demo case
  const initialCase = mockCases.find((c) => c.id === caseId) || mockCases[0];
  const [caseData, setCaseData] = useState<Case>(initialCase);

  const handleSaveOutcome = (newStatus: 'resolved' | 'partially_resolved' | 'unresolved', feedback?: string) => {
    const updated: Case = {
      ...caseData,
      status: newStatus,
      outcome: {
        id: `out-${Date.now()}`,
        caseId: caseData.id,
        status: newStatus,
        feedback: feedback || '',
        recordedAt: 'Today',
      },
    };
    setCaseData(updated);

    Alert.alert(
      'Status Updated',
      newStatus === 'resolved'
        ? 'Great news! Your crop recovery outcome has been saved and credited to the expert.'
        : newStatus === 'partially_resolved'
        ? 'Your progress feedback has been recorded.'
        : 'Outcome saved. You can now get another expert opinion if needed.'
    );
  };

  const handleFindAnotherExpert = () => {
    router.push({
      pathname: '/expert-match',
      params: { caseId: caseData.id, cropName: caseData.cropName, problemTitle: caseData.problemTitle },
    });
  };

  // Timeline steps computation
  const isResolved = caseData.status === 'resolved';
  const isPartially = caseData.status === 'partially_resolved';
  const isUnresolved = caseData.status === 'unresolved';

  const timelineSteps = [
    {
      title: 'Problem Reported',
      subtitle: `${caseData.cropName} • ${caseData.createdAt}`,
      isCompleted: true,
      isCurrent: false,
    },
    {
      title: 'Expert Matched',
      subtitle: caseData.assignedExpertName || 'Assigned ICAR Specialist',
      isCompleted: true,
      isCurrent: false,
    },
    {
      title: 'Consultation Completed',
      subtitle: caseData.consultation ? `${caseData.consultation.scheduledAt}` : 'Completed',
      isCompleted: true,
      isCurrent: false,
    },
    {
      title: 'Follow-up & Recovery Check',
      subtitle: isResolved
        ? 'Resolved ✓'
        : isPartially
        ? 'Partially Improved'
        : isUnresolved
        ? 'Needs Second Opinion'
        : 'Ongoing Follow-up',
      isCompleted: isResolved || isPartially,
      isCurrent: !isResolved && !isPartially,
    },
  ];

  return (
    <ScreenContainer scrollable={true}>
      {/* Top Header */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>

        <Typography variant="h2" color={Colors.textPrimary} style={styles.headerTitle}>
          Case #{caseData.id}
        </Typography>

        <CaseStatusBadge status={caseData.status} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* TIMELINE */}
        <View style={styles.sectionCard}>
          <Typography variant="label" color={Colors.primary} style={styles.sectionLabel}>
            {t('timelineTitle')}
          </Typography>
          <CaseTimeline steps={timelineSteps} />
        </View>

        {/* 1. PROBLEM SECTION */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <Typography variant="label" color={Colors.textMuted}>
              {t('problemSectionHeader')}
            </Typography>
            <Typography variant="caption" color={Colors.textMuted}>
              {caseData.createdAt}
            </Typography>
          </View>

          <Typography variant="h2" color={Colors.textPrimary} style={styles.cropTitle}>
            {caseData.cropName} — {caseData.problemTitle}
          </Typography>

          <Typography variant="body" color={Colors.textPrimary} style={styles.descText}>
            "{caseData.description}"
          </Typography>

          {/* Uploaded Crop Image Gallery */}
          {caseData.images && caseData.images.length > 0 && (
            <View style={styles.imageGallery}>
              {caseData.images.map((img) => (
                <Image key={img.id} source={{ uri: img.uri }} style={styles.cropPhoto} />
              ))}
            </View>
          )}
        </View>

        {/* 2. CONSULTATION & EXPERT ADVICE SECTION */}
        {caseData.consultation ? (
          <View style={styles.sectionCard}>
            <Typography variant="label" color={Colors.textMuted} style={styles.sectionLabelMargin}>
              {t('consultationSectionHeader')}
            </Typography>
            <ConsultationSummaryCard consultation={caseData.consultation} />
          </View>
        ) : null}

        {/* 3. OUTCOME FEEDBACK SELECTOR */}
        <OutcomeSelector
          currentStatus={caseData.status}
          onSaveOutcome={handleSaveOutcome}
        />

        {/* 4. UNRESOLVED CASE REASSURANCE & SECOND OPINION ACTION */}
        {isUnresolved && (
          <View style={styles.unresolvedNoticeCard}>
            <View style={styles.noticeIconCircle}>
              <Ionicons name="information-circle" size={28} color={Colors.primary} />
            </View>

            <View style={styles.noticeTextCol}>
              <Typography variant="h3" color={Colors.textPrimary}>
                {t('unresolvedReMatchNotice')}
              </Typography>
              <Typography variant="body" color={Colors.textSecondary} style={styles.noticeSub}>
                Your case details and symptoms are preserved so another scientist can evaluate your crop.
              </Typography>
            </View>

            <PrimaryButton
              title={t('findAnotherExpertBtn')}
              onPress={handleFindAnotherExpert}
              icon={<Ionicons name="people-outline" size={18} color={Colors.textOnPrimary} />}
              style={styles.reMatchBtn}
            />
          </View>
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    flex: 1,
    marginLeft: Spacing.sm,
  },
  scrollContent: {
    padding: Spacing.lg,
  },
  sectionCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    ...Shadows.card,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  sectionLabel: {
    marginBottom: Spacing.sm,
  },
  sectionLabelMargin: {
    marginBottom: Spacing.sm,
  },
  cropTitle: {
    fontSize: 18,
    marginBottom: Spacing.xs,
  },
  descText: {
    lineHeight: 22,
    fontStyle: 'italic',
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  imageGallery: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.xs,
  },
  cropPhoto: {
    width: 120,
    height: 120,
    borderRadius: BorderRadius.md,
  },
  unresolvedNoticeCard: {
    backgroundColor: Colors.primaryContainer,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginTop: Spacing.md,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  noticeIconCircle: {
    marginBottom: Spacing.xs,
  },
  noticeTextCol: {
    marginBottom: Spacing.md,
  },
  noticeSub: {
    fontSize: 13,
    marginTop: 2,
  },
  reMatchBtn: {
    height: 48,
  },
  bottomSpacer: {
    height: Spacing.xxxl,
  },
});
