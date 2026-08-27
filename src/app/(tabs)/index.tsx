import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Spacing } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { FarmerHeader } from '@/components/home/FarmerHeader';
import { HeroVoiceCameraAction } from '@/components/home/HeroVoiceCameraAction';
import { ActiveCaseTracker } from '@/components/home/ActiveCaseTracker';
import { WeatherCropAdvisory } from '@/components/home/WeatherCropAdvisory';
import { MandiRatesOverview } from '@/components/home/MandiRatesOverview';
import { FeaturedExpertsSection } from '@/components/home/FeaturedExpertsSection';
import { SeasonalTipsSection } from '@/components/home/SeasonalTipsSection';
import { LoadingState } from '@/components/ui/LoadingState';
import { LandingSplashScreen } from '@/components/onboarding/LandingSplashScreen';
import { FarmerRegistrationWalkthrough } from '@/components/onboarding/FarmerRegistrationWalkthrough';
import { ExpertRegistrationWalkthrough } from '@/components/onboarding/ExpertRegistrationWalkthrough';
import { ApiService } from '@/services/apiService';
import {
  WeatherAdvisory,
  CropCase,
  MandiRate,
  AgriculturalExpert,
  SeasonalTip,
} from '@/types';

export default function HomeScreen() {
  const router = useRouter();
  const {
    hasCompletedOnboarding,
    userRole,
    farmerProfile,
    selectRole,
    resetOnboarding,
  } = useAuth();

  const [loading, setLoading] = useState(true);
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
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  const handleVoicePress = () => {
    router.push('/ask-help');
  };

  const handleCameraPress = () => {
    router.push('/ask-help');
  };

  const handleExpertCall = (expert: AgriculturalExpert) => {
    Alert.alert(
      'Connecting to Expert',
      `Directly calling ${expert.name} (${expert.designation}). Free agricultural advice line.`
    );
  };

  const handleExpertChat = (expert: AgriculturalExpert) => {
    router.push('/ask-help');
  };

  // ONBOARDING SCREEN STEP 1: Landing Splash & Role Choice
  if (!userRole && !hasCompletedOnboarding) {
    return <LandingSplashScreen onRoleSelected={(role) => selectRole(role)} />;
  }

  // ONBOARDING SCREEN STEP 2: Farmer Registration Walkthrough
  if (userRole === 'farmer' && !hasCompletedOnboarding) {
    return (
      <FarmerRegistrationWalkthrough
        onComplete={() => {}}
        onBackToSplash={resetOnboarding}
      />
    );
  }

  // ONBOARDING SCREEN STEP 2: Expert Registration Walkthrough
  if (userRole === 'expert' && !hasCompletedOnboarding) {
    return (
      <ExpertRegistrationWalkthrough
        onComplete={() => router.push('/expert-portal')}
        onBackToSplash={resetOnboarding}
      />
    );
  }

  if (loading || !weather) {
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
        location={`${farmerProfile.village}, ${farmerProfile.district}`}
        language={farmerProfile.preferredLanguage}
        onNotificationPress={() => Alert.alert('Notifications', 'No new crop alerts today.')}
        onProfilePress={() => router.push('/profile')}
      />

      {/* Primary 2-Second Action Block: Voice & Camera */}
      <HeroVoiceCameraAction
        onVoicePress={handleVoicePress}
        onCameraPress={handleCameraPress}
      />

      {/* Active Crop Query Tracker */}
      <ActiveCaseTracker
        activeCase={activeCase}
        onCasePress={(c) => router.push('/ask-help')}
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
        onExpertCall={handleExpertCall}
        onExpertChat={handleExpertChat}
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
