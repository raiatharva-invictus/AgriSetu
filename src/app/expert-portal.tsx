import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { Typography } from '@/components/ui/Typography';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Colors, Spacing } from '@/constants/theme';
import { mockExpertRequests, mockExperts } from '@/data/mockData';
import { ExpertConsultationRequest } from '@/types';
import { ExpertDashboardHeader } from '@/components/expert-portal/ExpertDashboardHeader';
import { IncomingRequestCard } from '@/components/expert-portal/IncomingRequestCard';
import { ExpertQuickNav, ExpertNavTab } from '@/components/expert-portal/ExpertQuickNav';
import { ExpertConsultationsTab } from '@/components/expert-portal/ExpertConsultationsTab';
import { ExpertFarmersRosterTab } from '@/components/expert-portal/ExpertFarmersRosterTab';
import { ExpertCasesTab } from '@/components/expert-portal/ExpertCasesTab';
import { ExpertProfileHeader } from '@/components/experts/ExpertProfileHeader';
import { ExpertProfessionalWork } from '@/components/experts/ExpertProfessionalWork';
import { DemoResetButton } from '@/components/common/DemoResetButton';

export default function ExpertPortalScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ExpertNavTab | 'cases'>('requests');
  const [requests, setRequests] = useState<ExpertConsultationRequest[]>(mockExpertRequests);

  const expert = mockExperts[0]; // Dr. Suresh Deshmukh

  const handleAcceptRequest = (req: ExpertConsultationRequest) => {
    Alert.alert(
      'Request Accepted',
      `You have accepted ${req.farmerName}'s consultation request for ${req.cropName}.\n\nScheduled Call: ${req.requestedTime}`
    );
    setRequests(requests.filter((r) => r.id !== req.id));
  };

  const handleDeclineRequest = (req: ExpertConsultationRequest) => {
    Alert.alert(
      'Request Declined',
      `Request from ${req.farmerName} declined and re-routed to next available agronomist.`
    );
    setRequests(requests.filter((r) => r.id !== req.id));
  };

  return (
    <ScreenContainer scrollable={true}>
      {/* Top Professional Portal Header Bar with Demo Reset */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.push('/')}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.barTextGroup}>
          <Typography variant="h3" color="#FFFFFF">
            AgriSetu Expert Management Portal
          </Typography>
          <Typography variant="caption" color="#D1FAE5">
            ICAR / KVK Verified Scientist Mode
          </Typography>
        </View>

        {/* Prototype Demo Reset Action */}
        <DemoResetButton variant="dark" />
      </View>

      {/* Overview Dashboard Header & 4 Key Work Metrics */}
      <ExpertDashboardHeader
        expertName={expert.name}
        designation={expert.designation}
        pendingRequestsCount={requests.length}
        upcomingCallsCount={2}
        farmersHelpedCount={expert.consultationsCompleted}
        resolutionRate={expert.improvementRate || '94%'}
      />

      <View style={styles.content}>
        {/* Quick Nav Tabs */}
        <ExpertQuickNav activeTab={activeTab as any} onTabChange={setActiveTab as any} />

        {/* Tab 1: Pending Consultation Requests */}
        {activeTab === 'requests' && (
          <View>
            <SectionHeader
              title={`नए परामर्श अनुरोध (New Requests - ${requests.length})`}
              subtitle="किसानों द्वारा भेजे गए फसल सुरक्षा प्रश्न"
            />

            {requests.length === 0 ? (
              <View style={styles.emptyBox}>
                <Ionicons name="checkmark-done-circle-outline" size={48} color={Colors.primary} />
                <Typography variant="h3" color={Colors.textPrimary} style={styles.emptyTitle}>
                  सभी अनुरोध संसाधित हैं!
                </Typography>
                <Typography variant="body" color={Colors.textSecondary} align="center">
                  All pending consultation requests have been accepted or processed.
                </Typography>
              </View>
            ) : (
              requests.map((req) => (
                <IncomingRequestCard
                  key={req.id}
                  request={req}
                  onAccept={handleAcceptRequest}
                  onDecline={handleDeclineRequest}
                />
              ))
            )}
          </View>
        )}

        {/* Tab 2: Active Consultations & Scheduled Calls */}
        {activeTab === 'consultations' && <ExpertConsultationsTab />}

        {/* Tab 3: Farmers Roster & History */}
        {activeTab === 'farmers' && <ExpertFarmersRosterTab />}

        {/* Tab 4: Expert Cases Suite */}
        {activeTab === 'cases' && <ExpertCasesTab />}

        {/* Tab 5: Scientist Profile & Proof of Work Portfolio */}
        {activeTab === 'profile' && (
          <View>
            <SectionHeader
              title="वैज्ञानिक प्रोफाइल व समाधान प्रमाण (Profile & Proof of Work)"
              subtitle="किसान द्वारा स्वीकृत समाधान रिकॉर्ड व शोध कार्य"
            />
            <ExpertProfileHeader expert={expert} />
            <ExpertProfessionalWork expert={expert} />
          </View>
        )}

        <View style={styles.bottomSpacer} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: Colors.primaryDark,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    marginRight: Spacing.sm,
  },
  barTextGroup: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
  },
  emptyBox: {
    backgroundColor: Colors.surface,
    padding: Spacing.xxl,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    alignItems: 'center',
    marginVertical: Spacing.md,
  },
  emptyTitle: {
    marginTop: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  bottomSpacer: {
    height: Spacing.xxxl,
  },
});
