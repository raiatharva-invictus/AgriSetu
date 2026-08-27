import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors, Spacing } from '@/constants/theme';
import { SeasonalTip } from '@/types';
import { SectionHeader } from '../ui/SectionHeader';
import { TipCard } from '../ui/TipCard';

interface SeasonalTipsSectionProps {
  tips: SeasonalTip[];
  onTipPress: (tip: SeasonalTip) => void;
  onViewAllPress: () => void;
}

export const SeasonalTipsSection: React.FC<SeasonalTipsSectionProps> = ({
  tips,
  onTipPress,
  onViewAllPress,
}) => {
  return (
    <View style={styles.container}>
      <SectionHeader
        title="मौसमी खेती टिप्स (Seasonal Crop Advice)"
        subtitle="फसल चक्र व जैविक खेती के उपाय"
        actionText="और टिप्स"
        onActionPress={onViewAllPress}
      />

      {tips.map((tip) => (
        <TipCard key={tip.id} tip={tip} onPress={onTipPress} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
  },
});
