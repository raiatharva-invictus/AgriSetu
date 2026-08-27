export type CaseStatus = 'pending' | 'under_review' | 'resolved' | 'urgent';

export interface FarmerProfile {
  id: string;
  name: string;
  village: string;
  district: string;
  state: string;
  preferredLanguage: string; // e.g. 'Hindi', 'Marathi', 'Punjabi', 'English'
  primaryCrops: string[];
  landAreaAcres: number;
  landSize?: string;
  phoneNumber?: string;
  avatarUrl?: string;
}

export interface AgriculturalExpert {
  id: string;
  name: string;
  designation: string; // e.g., "Senior Agronomist, KVK Nagpur"
  institution: string; // e.g., "ICAR - Central Institute for Cotton Research"
  specialty: string[]; // e.g., ["Crop Diseases", "Cotton Specialist", "Soil Fertility"]
  experienceYears: number;
  languages: string[];
  rating: number;
  consultationsCompleted: number;
  isOnline: boolean;
  avatarUrl?: string;
  feeText: string; // e.g. "Free Basic Guidance" or "₹199 / 20 mins"
  
  // Relevance fields for Expert Matching Screen
  matchPercentage?: number; // e.g. 98
  relevantCaseCount?: number; // e.g. 34
  isTopMatch?: boolean;
  whyThisExpert?: string[]; // Rationale points e.g. ["Cotton plant disease specialist", "34 similar cases in Nagpur"]

  // Professional Identity fields for Expert Profile Screen
  aboutBio?: string;
  improvementRate?: string; // e.g. "94% reported crop improvement"
  publications?: string[];
  fieldProjects?: string[];
  certifications?: string[];
  endorsements?: string[];
}

export interface ExpertConsultationRequest {
  id: string;
  farmerName: string;
  location: string;
  cropName: string;
  problemTitle: string;
  description: string;
  requestedTime: string;
  feeText: string;
  hasVoiceNote: boolean;
  hasPhoto: boolean;
  status: 'pending' | 'accepted' | 'declined';
  urgency: 'Normal' | 'Urgent';
}

export interface CropCase {
  id: string;
  farmerId: string;
  cropName: string;
  title: string;
  description: string;
  status: CaseStatus;
  hasVoiceNote: boolean;
  hasPhoto: boolean;
  photoUrl?: string;
  assignedExpertName?: string;
  createdAt: string;
  updatedAt: string;
  solutionNote?: string;
}

export interface SeasonalTip {
  id: string;
  category: 'pest' | 'soil' | 'irrigation' | 'fertilizer' | 'harvest' | 'general' | 'crop' | 'water';
  title: string;
  regionalTitle?: string;
  summary: string;
  detailText: string;
  season: string;
  cropName?: string;
  readTimeMinutes: number;
  authorName: string;
  publishedDate: string;
  checkpoints?: string[]; // Quick 30-second checklist items
}

export interface MandiRate {
  id: string;
  commodity: string;
  variety: string;
  mandiName: string;
  district: string;
  modalPrice: number; // in ₹/Quintal
  minPrice: number;
  maxPrice: number;
  priceChange: number; // e.g., +150 or -50
  unit: string; // "Quintal"
  lastUpdated: string;
}

export interface WeatherAdvisory {
  temperatureCelsius: number;
  condition: 'Sunny' | 'Cloudy' | 'Rainy' | 'Humid' | 'Stormy';
  humidityPercent: number;
  rainfallProbabilityPercent: number;
  locationName: string;
  advisoryHeadline: string;
  advisoryDetail: string;
}
