import React, { createContext, useContext, useState } from 'react';
import { FarmerProfile, AgriculturalExpert } from '@/types';
import { mockFarmer, mockExperts } from '@/data/mockData';

export type UserRole = 'farmer' | 'expert';

interface AuthContextType {
  hasCompletedOnboarding: boolean;
  userRole: UserRole | null;
  farmerProfile: FarmerProfile;
  expertProfile: AgriculturalExpert;
  selectRole: (role: UserRole) => void;
  updateFarmerProfile: (profile: Partial<FarmerProfile>) => void;
  updateExpertProfile: (profile: Partial<AgriculturalExpert>) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  const [farmerProfile, setFarmerProfile] = useState<FarmerProfile>(mockFarmer);
  const [expertProfile, setExpertProfile] = useState<AgriculturalExpert>(mockExperts[0]);

  const selectRole = (role: UserRole) => {
    setUserRole(role);
  };

  const updateFarmerProfile = (updated: Partial<FarmerProfile>) => {
    setFarmerProfile((prev) => ({ ...prev, ...updated }));
  };

  const updateExpertProfile = (updated: Partial<AgriculturalExpert>) => {
    setExpertProfile((prev) => ({ ...prev, ...updated }));
  };

  const completeOnboarding = () => {
    setHasCompletedOnboarding(true);
  };

  const resetOnboarding = () => {
    setHasCompletedOnboarding(false);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        hasCompletedOnboarding,
        userRole,
        farmerProfile,
        expertProfile,
        selectRole,
        updateFarmerProfile,
        updateExpertProfile,
        completeOnboarding,
        resetOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
