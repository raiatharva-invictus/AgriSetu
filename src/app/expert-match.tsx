import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { Typography } from '@/components/ui/Typography';
import { Chip } from '@/components/ui/Chip';
import { Colors, Spacing } from '@/constants/theme';
import { mockExperts } from '@/data/mockData';
import { AgriculturalExpert } from '@/types';
import { MatchedProblemSummary } from '@/components/experts/MatchedProblemSummary';
import { ExpertMatchCard } from '@/components/experts/ExpertMatchCard';
import { matchingEngine, StructuredCase } from '@/services/matchingEngine';
import { consultationService } from '@/services/consultationService';
import { caseService } from '@/services/caseService';

export default function ExpertMatchScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    caseId?: string;
    crop?: string;
    problemCategory?: string;
    description?: string;
    location?: string;
    urgency?: string;
  }>();

  const [activeFilter, setActiveFilter] = useState<'all' | 'online' | 'free'>('all');

  // Construct Structured Case for Matching Engine
  const structuredCase: StructuredCase = {
    id: params.caseId || `c-${Date.now()}`,
    farmerId: '11111111-1111-1111-1111-111111111111',
    crop: params.crop || 'Cotton (कपास)',
    problemCategory: params.problemCategory || 'Plant Pathology',
    description: params.description || 'Red Leaf Edges & Curling',
    location: params.location || 'Kalmeshwar, Nagpur',
    urgency: (params.urgency as any) || 'Normal',
    status: 'new',
  };

  // Run Expert Matching Engine
  const rankedResults = matchingEngine.rankExperts(structuredCase, mockExperts);

  const filteredResults = rankedResults.filter((r) => {
    if (activeFilter === 'online') return r.expert.isOnline;
    if (activeFilter === 'free') return r.expert.feeText.toLowerCase().includes('free');
    return true;
  });

  const filterOptions = [
    { key: 'all', label: `सभी मिले विशेषज्ञ (${rankedResults.length})` },
    { key: 'online', label: 'ऑनलाइन उपलब्ध' },
    { key: 'free', label: 'निःशुल्क मार्गदर्शन' },
  ];

  const handleViewProfile = (expert: AgriculturalExpert) => {
    router.push({
      pathname: '/expert-detail',
      params: { expertId: expert.id, caseId: structuredCase.id },
    });
  };

  const handleBookConsultation = async (expert: AgriculturalExpert) => {
    try {
      // 1. Create consultation row in Supabase consultations table
      await consultationService.createConsultation({
        case_id: structuredCase.id,
        farmer_id: structuredCase.farmerId,
        expert_id: expert.id === '1' ? 'e1111111-1111-1111-1111-111111111111' : 'e2222222-2222-2222-2222-222222222222',
        duration_minutes: 20,
        price: expert.feeText.includes('₹') ? 199 : 0,
        status: 'pending',
      });

      // 2. Update case status in Supabase cases table to consultation_pending
      await caseService.updateCaseStatus(
        structuredCase.id,
        'consultation_pending',
        expert.id === '1' ? 'e1111111-1111-1111-1111-111111111111' : 'e2222222-2222-2222-2222-222222222222'
      );
    } catch (e: any) {
      console.warn('Supabase consultation booking note:', e);
    }

    Alert.alert(
      'Consultation Requested!',
      `Your query for ${structuredCase.crop} has been sent to ${expert.name}.\n\nStatus: Pending Scientist Confirmation.`,
      [
        {
          text: 'View My Cases',
          onPress: () => router.push('/cases'),
        },
      ]
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
            आपकी समस्या के लिए {filteredResults.length} कृषि विशेषज्ञ मिले
          </Typography>
          <Typography variant="caption" color="#D1FAE5" style={styles.headerSub}>
            We found experts relevant to your specific {structuredCase.crop} query
          </Typography>
        </View>
      </View>

      <View style={styles.content}>
        {/* Compact Submitted Problem Recap */}
        <MatchedProblemSummary
          cropName={structuredCase.crop}
          symptomSummary={structuredCase.description}
          location={structuredCase.location || 'Kalmeshwar, Nagpur'}
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
        {filteredResults.map(({ expert }) => (
          <ExpertMatchCard
            key={expert.id}
            expert={expert}
            onViewProfile={() => handleViewProfile(expert)}
            onBookConsultation={() => handleBookConsultation(expert)}
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
