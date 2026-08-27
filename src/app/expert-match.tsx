import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { Typography } from '@/components/ui/Typography';
import { Chip } from '@/components/ui/Chip';
import { Colors, Spacing } from '@/constants/theme';
import { mockExperts } from '@/data/mockData';
import { AgriculturalExpert } from '@/types';
import { MatchedProblemSummary } from '@/components/experts/MatchedProblemSummary';
import { ExpertMatchCard } from '@/components/experts/ExpertMatchCard';

export default function ExpertMatchScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<'all' | 'online' | 'free'>('all');

  const filterOptions = [
    { key: 'all', label: `सभी विशेषज्ञ (${mockExperts.length})` },
    { key: 'online', label: 'ऑनलाइन उपलब्ध (3)' },
    { key: 'free', label: 'निःशुल्क मार्गदर्शन (4)' },
  ];

  const filteredExperts = mockExperts.filter((exp) => {
    if (activeFilter === 'online') return exp.isOnline;
    return true;
  });

  const handleViewProfile = (expert: AgriculturalExpert) => {
    Alert.alert(
      expert.name,
      `${expert.designation}\n${expert.institution}\n\nSpecialty: ${expert.specialty.join(', ')}\nExperience: ${expert.experienceYears}+ Years`
    );
  };

  const handleBookConsultation = (expert: AgriculturalExpert) => {
    Alert.alert(
      'Connecting with Scientist',
      `You are being connected directly with ${expert.name}.\n\nFree Agricultural Guidance Line: Active`
    );
  };

  return (
    <ScreenContainer scrollable={true}>
      {/* Top Banner Header */}
      <View style={styles.topHeader}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.headerTextGroup}>
          <Typography variant="hero" color="#FFFFFF">
            आपकी समस्या के लिए {filteredExperts.length} कृषि विशेषज्ञ मिले
          </Typography>
          <Typography variant="caption" color="#D1FAE5" style={styles.headerSub}>
            We found experts relevant to your specific Cotton leaf disease query
          </Typography>
        </View>
      </View>

      <View style={styles.content}>
        {/* Compact Submitted Problem Recap */}
        <MatchedProblemSummary
          cropName="Cotton (कपास)"
          symptomSummary="पत्तियों के किनारों पर लाल धब्बे व मुड़ना"
          location="Kalmeshwar, Nagpur"
        />

        {/* Filter Chips */}
        <View style={styles.filtersRow}>
          {filterOptions.map((opt) => (
            <Chip
              key={opt.key}
              label={opt.label}
              selected={activeFilter === opt.key}
              onPress={() => setActiveFilter(opt.key as any)}
              style={styles.filterChip}
            />
          ))}
        </View>

        {/* List of Relevance-Matched Expert Cards */}
        {filteredExperts.map((expert) => (
          <ExpertMatchCard
            key={expert.id}
            expert={expert}
            onViewProfile={handleViewProfile}
            onBookConsultation={handleBookConsultation}
          />
        ))}

        <View style={styles.bottomSpacer} />
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
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  backBtn: {
    marginRight: Spacing.md,
    marginTop: 4,
  },
  headerTextGroup: {
    flex: 1,
  },
  headerSub: {
    marginTop: 4,
  },
  content: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
  },
  filtersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
    marginBottom: Spacing.lg,
  },
  filterChip: {
    marginBottom: 4,
  },
  bottomSpacer: {
    height: Spacing.xxxl,
  },
});
