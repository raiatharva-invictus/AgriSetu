import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Spacing } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { FarmerHeader } from '@/components/home/FarmerHeader';
import { HeroVoiceCameraAction } from '@/components/home/HeroVoiceCameraAction';
import { ActiveCaseTracker } from '@/components/home/ActiveCaseTracker';
import { WeatherCropAdvisory } from '@/components/home/WeatherCropAdvisory';
import { MandiRatesOverview } from '@/components/home/MandiRatesOverview';
import { FeaturedExpertsSection } from '@/components/home/FeaturedExpertsSection';
import { SeasonalTipsSection } from '@/components/home/SeasonalTipsSection';
import { LoadingState } from '@/components/ui/LoadingState';

// Entry Sequence Screens
import { SplashScreen } from '@/components/entry/SplashScreen';
import { LanguageSelectionScreen } from '@/components/entry/LanguageSelectionScreen';
import { RoleSelectionScreen } from '@/components/entry/RoleSelectionScreen';
import { FarmerOnboarding } from '@/components/entry/FarmerOnboarding';
import { ExpertOnboarding } from '@/components/entry/ExpertOnboarding';

import { ApiService } from '@/services/apiService';
import {
  WeatherAdvisory,
  CropCase,
  MandiRate,
  AgriculturalExpert,
  SeasonalTip,
  UserRole,
  FarmerProfile,
} from '@/types';

type EntryState = 'splash' | 'language' | 'role' | 'onboarding';

export default function HomeScreen() {
  const router = useRouter();
  const { language } = useLanguage();
  const {
    isSessionLoading,
    hasCompletedOnboarding,
    userRole,
    farmerProfile,
    selectRole,
    updateFarmerProfile,
    updateExpertProfile,
    completeOnboarding,
  } = useAuth();

  const [entryState, setEntryState] = useState<EntryState>('splash');
  const [loadingData, setLoadingData] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [weather, setWeather] = useState<WeatherAdvisory | null>(null);
  const [activeCase, setActiveCase] = useState<CropCase | null>(null);
  const [mandiRates, setMandiRates] = useState<MandiRate[]>([]);
  const [experts, setExperts] = useState<AgriculturalExpert[]>([]);
  const [tips, setTips] = useState<SeasonalTip[]>([]);

  const loadData = async () => {
    try {
      const [wData, cData, mData, eData, tData] = await Promise.all([
        ApiService.getWeatherAdvisory(),
        ApiService.getActiveCropCase(),
        ApiService.getMandiRates(),
        ApiService.getFeaturedExperts(),
        ApiService.getSeasonalTips(),
      ]);

      setWeather(wData);
      setActiveCase(cData);
      setMandiRates(mData);
      setExperts(eData);
      setTips(tData);
    } catch (error) {
      console.error('Failed to load home screen data:', error);
    } finally {
      setLoadingData(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Safe navigation side effect for Expert Role Routing
  useEffect(() => {
    if (!isSessionLoading && hasCompletedOnboarding && userRole === 'expert') {
      router.replace('/expert-portal');
    }
  }, [isSessionLoading, hasCompletedOnboarding, userRole]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  // ENTRY SEQUENCE HANDLERS
  const handleSplashFinish = () => {
    setEntryState('language');
  };

  const handleLanguageContinue = () => {
    setEntryState('role');
  };

  const handleRoleSelect = (role: UserRole) => {
    selectRole(role);
    setEntryState('onboarding');
  };

  const handleFarmerOnboardingComplete = async (profile: Partial<FarmerProfile>) => {
    updateFarmerProfile(profile);
    await completeOnboarding(language);
  };

  const handleExpertOnboardingComplete = async (profile: Partial<AgriculturalExpert>) => {
    updateExpertProfile(profile);
    await completeOnboarding(language);
    router.replace('/expert-portal');
  };

  // 1. Loading Session State
  if (isSessionLoading) {
    return (
      <ScreenContainer>
        <LoadingState message="AgriSetu..." />
      </ScreenContainer>
    );
  }

  // 2. FIRST-TIME UNAUTHENTICATED ENTRY FLOW
  if (!hasCompletedOnboarding) {
    if (entryState === 'splash') {
      return <SplashScreen onFinish={handleSplashFinish} />;
    }

    if (entryState === 'language') {
      return <LanguageSelectionScreen onContinue={handleLanguageContinue} />;
    }

    if (entryState === 'role') {
      return <RoleSelectionScreen onRoleSelect={handleRoleSelect} />;
    }

    if (entryState === 'onboarding') {
      if (userRole === 'expert') {
        return (
          <ExpertOnboarding
            onComplete={handleExpertOnboardingComplete}
            onBack={() => setEntryState('role')}
          />
        );
      }

      return (
        <FarmerOnboarding
          onComplete={handleFarmerOnboardingComplete}
          onBack={() => setEntryState('role')}
        />
      );
    }
  }

  // 3. PERSISTED EXPERT ROLE EXPERIENCE (Safe redirect rendering placeholder)
  if (userRole === 'expert') {
    return (
      <ScreenContainer>
        <LoadingState message="Opening Expert Portal..." />
      </ScreenContainer>
    );
  }

  // 4. PERSISTED FARMER ROLE EXPERIENCE
  if (loadingData || !weather) {
    return (
      <ScreenContainer>
        <LoadingState message="Connecting with Krishi Vigyan Kendra & Mandi..." />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer
      scrollable={true}
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={[Colors.primary]}
          tintColor={Colors.primary}
        />
      }
    >
      {/* Farmer Profile Header */}
      <FarmerHeader
        farmerName={farmerProfile.name}
        location={`${farmerProfile.village || farmerProfile.district}, ${farmerProfile.state}`}
        language={farmerProfile.preferredLanguage}
        onNotificationPress={() => Alert.alert('Notifications', 'No new crop alerts today.')}
        onProfilePress={() => router.push('/profile')}
      />

      {/* Primary 2-Second Action Block: Voice & Camera */}
      <HeroVoiceCameraAction
        onVoicePress={() => router.push('/ask-help')}
        onCameraPress={() => router.push('/ask-help')}
      />

      {/* Active Crop Query Tracker */}
      <ActiveCaseTracker
        activeCase={activeCase}
        onCasePress={() => router.push('/ask-help')}
        onViewAllPress={() => router.push('/ask-help')}
      />

      {/* Weather & Field Crop Advisory */}
      <WeatherCropAdvisory weather={weather} />

      {/* Today's Mandi Market Rates */}
      <MandiRatesOverview
        mandiRates={mandiRates}
        onViewAllPress={() => Alert.alert('Mandi Rates', 'Showing top local crops near Nagpur.')}
      />

      {/* Featured KVK Agricultural Experts */}
      <FeaturedExpertsSection
        experts={experts}
        onExpertCall={(exp) => Alert.alert('Call Expert', `Calling ${exp.name}...`)}
        onExpertChat={() => router.push('/ask-help')}
        onViewAllPress={() => router.push('/experts')}
      />

      {/* Seasonal Farming Tips */}
      <SeasonalTipsSection
        tips={tips}
        onTipPress={() => router.push('/tips')}
        onViewAllPress={() => router.push('/tips')}
      />

      <View style={styles.bottomSpacer} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
  },
  bottomSpacer: {
    height: Spacing.xxxl,
  },
});
