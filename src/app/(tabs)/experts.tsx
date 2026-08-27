import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Alert,
} from 'react-native';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { Typography } from '@/components/ui/Typography';
import { Chip } from '@/components/ui/Chip';
import { Colors, Spacing } from '@/constants/theme';
import { mockExperts } from '@/data/mockData';
import { ExpertMatchCard } from '@/components/experts/ExpertMatchCard';
import { AgriculturalExpert } from '@/types';

export default function ExpertsScreen() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Cotton Specialist', 'Soil Health', 'Irrigation', 'Pest Control'];

  const filteredExperts = mockExperts.filter((exp) => {
    if (activeCategory === 'All') return true;
    return exp.specialty.some((s) => s.toLowerCase().includes(activeCategory.toLowerCase()));
  });

  const handleViewProfile = (expert: AgriculturalExpert) => {
    Alert.alert(
      expert.name,
      `${expert.designation}\n${expert.institution}\n\nSpecialties: ${expert.specialty.join(', ')}\nExperience: ${expert.experienceYears}+ Years`
    );
  };

  const handleBookConsultation = (expert: AgriculturalExpert) => {
    Alert.alert(
      'Connecting to Expert',
      `Direct advice call connected with ${expert.name} (${expert.designation}). Free agricultural helpline active.`
    );
  };

  return (
    <ScreenContainer scrollable={true}>
      {/* Header */}
      <View style={styles.topHeader}>
        <Typography variant="hero" color="#FFFFFF">
          प्रमाणित कृषि विशेषज्ञ (Agricultural Experts)
        </Typography>
        <Typography variant="caption" color="#D1FAE5" style={styles.headerSubtitle}>
          Direct connection with certified KVK & ICAR scientists for trusted field advice
        </Typography>
      </View>

      <View style={styles.content}>
        {/* Categories Filter Bar */}
        <View style={styles.categoryBar}>
          {categories.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              selected={activeCategory === cat}
              onPress={() => setActiveCategory(cat)}
              style={styles.categoryChip}
            />
          ))}
        </View>

        {/* Experts List using ExpertMatchCard primitive */}
        <View style={styles.expertsSection}>
          {filteredExperts.map((expert) => (
            <ExpertMatchCard
              key={expert.id}
              expert={expert}
              onViewProfile={handleViewProfile}
              onBookConsultation={handleBookConsultation}
            />
          ))}
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  topHeader: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  headerSubtitle: {
    marginTop: 4,
  },
  content: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
  },
  categoryBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
    marginBottom: Spacing.lg,
  },
  categoryChip: {
    marginBottom: 4,
  },
  expertsSection: {
    marginBottom: Spacing.xl,
  },
});
