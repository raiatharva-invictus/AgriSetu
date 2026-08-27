import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors, Spacing } from '@/constants/theme';
import { AgriculturalExpert } from '@/types';
import { SectionHeader } from '../ui/SectionHeader';
import { ExpertCard } from '../ui/ExpertCard';

interface FeaturedExpertsSectionProps {
  experts: AgriculturalExpert[];
  onExpertCall: (expert: AgriculturalExpert) => void;
  onExpertChat: (expert: AgriculturalExpert) => void;
  onViewAllPress: () => void;
}

export const FeaturedExpertsSection: React.FC<FeaturedExpertsSectionProps> = ({
  experts,
  onExpertCall,
  onExpertChat,
  onViewAllPress,
}) => {
  return (
    <View style={styles.container}>
      <SectionHeader
        title="उपलब्ध कृषि विशेषज्ञ (Available Experts)"
        subtitle="ICAR व कृषि विश्वविद्यालय के प्रमाणित वैज्ञानिक"
        actionText="सभी विशेषज्ञ"
        onActionPress={onViewAllPress}
      />

      {experts.slice(0, 2).map((expert) => (
        <ExpertCard
          key={expert.id}
          expert={expert}
          onCallPress={onExpertCall}
          onChatPress={onExpertChat}
        />
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
