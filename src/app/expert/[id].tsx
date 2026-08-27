import React from 'react';
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { Typography } from '@/components/ui/Typography';
import { Colors, Spacing } from '@/constants/theme';
import { mockExperts } from '@/data/mockData';
import { ExpertProfileHeader } from '@/components/experts/ExpertProfileHeader';
import { ExpertRelevantExperience } from '@/components/experts/ExpertRelevantExperience';
import { ExpertProfessionalWork } from '@/components/experts/ExpertProfessionalWork';
import { ExpertConsultationFooter } from '@/components/experts/ExpertConsultationFooter';

export default function ExpertProfileScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();

  const expert = mockExperts.find((e) => e.id === id) || mockExperts[0];

  const handleBookConsultation = () => {
    Alert.alert(
      'Consultation Booking',
      `Booking 20-minute audio/video advice call with ${expert.name}.\n\nFree Agricultural Line Connected.`
    );
  };

  return (
    <View style={styles.outerContainer}>
      <ScreenContainer scrollable={true}>
        {/* Navigation Header */}
        <View style={styles.topHeader}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Typography variant="h2" color="#FFFFFF">
            वैज्ञानिक प्रोफाइल (Scientist Profile)
          </Typography>
        </View>

        <View style={styles.content}>
          {/* Identity Header */}
          <ExpertProfileHeader expert={expert} />

          {/* Relevant Experience & Evidence */}
          <ExpertRelevantExperience expert={expert} />

          {/* Professional Research & Work */}
          <ExpertProfessionalWork expert={expert} />

          <View style={styles.bottomSpacer} />
        </View>
      </ScreenContainer>

      {/* Sticky Bottom Consultation Footer */}
      <ExpertConsultationFooter expert={expert} onBookPress={handleBookConsultation} />
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  topHeader: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    marginRight: Spacing.md,
  },
  content: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
  },
  bottomSpacer: {
    height: 40,
  },
});
