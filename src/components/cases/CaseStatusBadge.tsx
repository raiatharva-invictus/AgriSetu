import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors, BorderRadius, Spacing } from '@/constants/theme';
import { useLanguage } from '@/context/LanguageContext';
import { CaseStatus, getCaseStatusLabel } from '@/types/case';
import { Typography } from '../ui/Typography';

interface CaseStatusBadgeProps {
  status: CaseStatus;
}

export const CaseStatusBadge: React.FC<CaseStatusBadgeProps> = ({ status }) => {
  const { language } = useLanguage();
  const label = getCaseStatusLabel(status, language);

  let bg = Colors.primaryContainer;
  let text = Colors.primaryDark;

  if (status === 'resolved') {
    bg = Colors.successLight;
    text = Colors.success;
  } else if (status === 'partially_resolved') {
    bg = Colors.harvestAmberLight;
    text = Colors.harvestAmber;
  } else if (status === 'unresolved') {
    bg = Colors.dangerLight;
    text = Colors.danger;
  } else if (status === 'follow_up') {
    bg = '#E0F2FE';
    text = '#0369A1';
  } else if (status === 'scheduled' || status === 'in_consultation') {
    bg = '#FEF3C7';
    text = '#B45309';
  }

  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <Typography variant="label" color={text} style={styles.text}>
        {label}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: BorderRadius.sm,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
  },
});
