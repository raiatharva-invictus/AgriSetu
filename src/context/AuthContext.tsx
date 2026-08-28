import React, { createContext, useContext, useState, useEffect } from 'react';
import { FarmerProfile, AgriculturalExpert, UserRole } from '@/types';
import { mockFarmer, mockExperts } from '@/data/mockData';
import { sessionService, UserSession } from '@/services/sessionService';
import { authService } from '@/services/authService';
import { supabase } from '@/lib/supabase';
import { LanguageCode } from '@/locales';

interface AuthContextType {
  isSessionLoading: boolean;
  hasCompletedOnboarding: boolean;
  userRole: UserRole | null;
  farmerProfile: FarmerProfile;
  expertProfile: AgriculturalExpert;
  selectRole: (role: UserRole) => void;
  updateFarmerProfile: (profile: Partial<FarmerProfile>) => void;
  updateExpertProfile: (profile: Partial<AgriculturalExpert>) => void;
  completeOnboarding: (lang: LanguageCode) => Promise<void>;
  resetOnboarding: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Generate RFC4122 v4 compliant UUID
const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSessionLoading, setIsSessionLoading] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  const [farmerProfile, setFarmerProfile] = useState<FarmerProfile>(mockFarmer);
  const [expertProfile, setExpertProfile] = useState<AgriculturalExpert>(mockExperts[0]);

  // Load session from sessionService abstraction on app launch
  useEffect(() => {
    const initSession = async () => {
      try {
        const session = await sessionService.getSession();
        if (session && session.hasCompletedOnboarding) {
          setUserRole(session.role);
          setHasCompletedOnboarding(true);
          if (session.farmerProfile) {
            setFarmerProfile((prev) => ({ ...prev, ...session.farmerProfile }));
          }
          if (session.expertProfile) {
            setExpertProfile((prev) => ({ ...prev, ...session.expertProfile }));
          }
        }
      } catch (err) {
        console.warn('Session init error:', err);
      } finally {
        setIsSessionLoading(false);
      }
    };

    initSession();
  }, []);

  const selectRole = (role: UserRole) => {
    setUserRole(role);
  };

  const updateFarmerProfile = (updated: Partial<FarmerProfile>) => {
    setFarmerProfile((prev) => ({ ...prev, ...updated }));
  };

  const updateExpertProfile = (updated: Partial<AgriculturalExpert>) => {
    setExpertProfile((prev) => ({ ...prev, ...updated }));
  };

  const completeOnboarding = async (lang: LanguageCode) => {
    if (!userRole) return;
    setHasCompletedOnboarding(true);

    const userId = generateUUID();
    const isFarmer = userRole === 'farmer';
    const fullName = isFarmer ? farmerProfile.name : expertProfile.name;
    const phone = isFarmer ? farmerProfile.phoneNumber : undefined;
    const state = isFarmer ? farmerProfile.state : 'Maharashtra';
    const district = isFarmer ? farmerProfile.district : 'Nagpur';
    const village = isFarmer ? farmerProfile.village : expertProfile.institution;

    // LIVE SUPABASE CLOUD DATABASE SYNC
    try {
      let activeUser = await authService.getCurrentUser();
      let realUserId = activeUser?.id;

      if (!realUserId) {
        const cleanPhone = (phone || '9876543210').replace(/\D/g, '');
        const autoEmail = `farmer_${cleanPhone || Date.now()}@agrisetu.app`;
        const autoPass = 'AgriSetuAuth2026!';

        const { data: authData } = await supabase.auth.signUp({
          email: autoEmail,
          password: autoPass,
        });

        if (authData?.user) {
          realUserId = authData.user.id;
        } else {
          const { data: signInData } = await supabase.auth.signInWithPassword({
            email: autoEmail,
            password: autoPass,
          });
          realUserId = signInData?.user?.id;
        }
      }

      const finalUserId = realUserId || userId;

      await authService.createProfile({
        id: finalUserId,
        role: userRole,
        full_name: fullName || 'AgriSetu Farmer',
        phone: phone || '+91 98765 43210',
        preferred_language: lang,
        state: state || 'Maharashtra',
        district: district || 'Nashik',
        village: village || 'Nashik',
      });
      console.log('✓ Live Supabase user profile created successfully:', finalUserId);
    } catch (e: any) {
      console.warn('Live Supabase sync note:', e.message || e);
    }

    const session: UserSession = {
      role: userRole,
      language: lang,
      hasCompletedOnboarding: true,
      createdAt: new Date().toISOString(),
      farmerProfile,
      expertProfile,
    };

    await sessionService.saveSession(session);
  };

  const resetOnboarding = async () => {
    setHasCompletedOnboarding(false);
    setUserRole(null);
    await sessionService.clearSession();
  };

  return (
    <AuthContext.Provider
      value={{
        isSessionLoading,
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
