import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Shadows, TouchTargets } from '@/constants/theme';
import { AgriculturalExpert } from '@/types';
import { Typography } from '../ui/Typography';
import { Button } from '../ui/Button';

interface ExpertConsultationFooterProps {
  expert: AgriculturalExpert;
  onBookPress: () => void;
}

export const ExpertConsultationFooter: React.FC<ExpertConsultationFooterProps> = ({
  expert,
  onBookPress,
}) => {
  return (
    <View style={styles.stickyFooter}>
      <View style={styles.priceCol}>
        <Typography variant="caption" color={Colors.textMuted}>
          सलाह शुल्क (Consultation Fee)
        </Typography>
        <Typography variant="h2" color={Colors.success}>
          {expert.feeText}
        </Typography>
        <Typography variant="caption" color={Colors.textSecondary}>
          20 मिनट की ऑडियो/वीडियो बातचीत
        </Typography>
      </View>

      <Button
        title="परामर्श लें (Book Consultation)"
        onPress={onBookPress}
        variant="primary"
        size="large"
        fullWidth={false}
        icon={<Ionicons name="calendar-outline" size={20} color={Colors.textInverse} />}
        style={styles.bookBtn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  stickyFooter: {
    backgroundColor: Colors.surface,
    borderTopWidth: 1.5,
    borderTopColor: Colors.cardBorder,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Shadows.card,
  },
  priceCol: {
    flex: 1,
    paddingRight: Spacing.md,
  },
  bookBtn: {
    minWidth: 160,
    minHeight: TouchTargets.large,
  },
});
