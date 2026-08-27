import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Spacing } from '@/constants/theme';
import { useLanguage } from '@/context/LanguageContext';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CaseListItem } from '@/components/cases/CaseListItem';
import { DemoResetButton } from '@/components/common/DemoResetButton';
import { mockCases } from '@/data/mockData';
import { Typography } from '@/components/ui/Typography';

export default function FarmerCasesScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const [casesList] = useState(mockCases);

  const activeCases = casesList.filter(
    (c) => c.status !== 'resolved' && c.status !== 'cancelled'
  );
  const pastCases = casesList.filter(
    (c) => c.status === 'resolved' || c.status === 'cancelled'
  );

  const handleOpenCase = (caseId: string) => {
    router.push({
      pathname: '/case-detail',
      params: { caseId },
    });
  };

  return (
    <ScreenContainer scrollable={true}>
      {/* Top Header */}
      <View style={styles.topBar}>
        <View style={styles.headerTitleGroup}>
          <Typography variant="h1" color={Colors.textOnPrimary}>
            {t('myCasesTitle')}
          </Typography>
          <Typography variant="caption" color="#D1FAE5">
            {t('myCasesSub')}
          </Typography>
        </View>

        <DemoResetButton variant="dark" />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Group 1: ACTIVE CASES */}
        <SectionHeader
          title={t('activeCasesGroup')}
          subtitle="फसल समस्याओं के समाधान की वर्तमान प्रगति"
        />

        {activeCases.length === 0 ? (
          <View style={styles.emptyBox}>
            <Typography variant="body" color={Colors.textMuted} align="center">
              {t('noActiveCases')}
            </Typography>
          </View>
        ) : (
          activeCases.map((item) => (
            <CaseListItem
              key={item.id}
              caseData={item}
              onPress={() => handleOpenCase(item.id)}
            />
          ))
        )}

        {/* Group 2: PAST CASES */}
        <View style={styles.groupSpacer} />
        <SectionHeader
          title={t('pastCasesGroup')}
          subtitle="पूरी हो चुकी समस्याएं व किसान समाधान रिकॉर्ड"
        />

        {pastCases.length === 0 ? (
          <View style={styles.emptyBox}>
            <Typography variant="body" color={Colors.textMuted} align="center">
              {t('noPastCases')}
            </Typography>
          </View>
        ) : (
          pastCases.map((item) => (
            <CaseListItem
              key={item.id}
              caseData={item}
              onPress={() => handleOpenCase(item.id)}
            />
          ))
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitleGroup: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.lg,
  },
  emptyBox: {
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    alignItems: 'center',
    marginVertical: Spacing.xs,
  },
  groupSpacer: {
    marginTop: Spacing.lg,
  },
  bottomSpacer: {
    height: Spacing.xxxl,
  },
});
