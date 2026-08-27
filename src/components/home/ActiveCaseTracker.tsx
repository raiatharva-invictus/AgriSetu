import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors, Spacing } from '@/constants/theme';
import { CropCase } from '@/types';
import { CaseCard } from '../ui/CaseCard';
import { SectionHeader } from '../ui/SectionHeader';

interface ActiveCaseTrackerProps {
  activeCase: CropCase | null;
  onCasePress: (cropCase: CropCase) => void;
  onViewAllPress: () => void;
}

export const ActiveCaseTracker: React.FC<ActiveCaseTrackerProps> = ({
  activeCase,
  onCasePress,
  onViewAllPress,
}) => {
  if (!activeCase) return null;

  return (
    <View style={styles.container}>
      <SectionHeader
        title="आपकी सक्रिय समस्याएं (My Active Query)"
        subtitle="कृषि वैज्ञानिक द्वारा समीक्षा जारी"
        actionText="सभी देखें (View All)"
        onActionPress={onViewAllPress}
      />
      <CaseCard cropCase={activeCase} onPress={onCasePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.md,
  },
});
