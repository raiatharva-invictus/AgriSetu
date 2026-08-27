import {
  FarmerProfile,
  AgriculturalExpert,
  CropCase,
  SeasonalTip,
  MandiRate,
  WeatherAdvisory,
} from '@/types';
import {
  mockFarmer,
  mockWeatherAdvisory,
  mockActiveCase,
  mockMandiRates,
  mockExperts,
  mockSeasonalTips,
} from '@/data/mockData';

/**
 * Service Abstraction layer for AgriSetu API operations.
 * Prepared for seamless Supabase client insertion.
 */
export const ApiService = {
  async getFarmerProfile(): Promise<FarmerProfile> {
    // Simulated network latency
    await new Promise((res) => setTimeout(res, 50));
    return mockFarmer;
  },

  async getWeatherAdvisory(): Promise<WeatherAdvisory> {
    await new Promise((res) => setTimeout(res, 50));
    return mockWeatherAdvisory;
  },

  async getActiveCropCase(): Promise<CropCase | null> {
    await new Promise((res) => setTimeout(res, 50));
    return mockActiveCase;
  },

  async getMandiRates(): Promise<MandiRate[]> {
    await new Promise((res) => setTimeout(res, 50));
    return mockMandiRates;
  },

  async getFeaturedExperts(): Promise<AgriculturalExpert[]> {
    await new Promise((res) => setTimeout(res, 50));
    return mockExperts;
  },

  async getSeasonalTips(): Promise<SeasonalTip[]> {
    await new Promise((res) => setTimeout(res, 50));
    return mockSeasonalTips;
  },

  async submitVoiceCropQuery(audioUri: string, cropName: string): Promise<CropCase> {
    await new Promise((res) => setTimeout(res, 200));
    return {
      id: `case-${Date.now()}`,
      farmerId: mockFarmer.id,
      cropName,
      title: `Voice query regarding ${cropName}`,
      description: 'Submitted via voice note. Assigned to regional agronomy scientist.',
      status: 'pending',
      hasVoiceNote: true,
      hasPhoto: false,
      createdAt: 'Just now',
      updatedAt: 'Just now',
    };
  },
};
