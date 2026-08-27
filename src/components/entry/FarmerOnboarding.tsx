import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing } from '@/constants/theme';
import { useLanguage } from '@/context/LanguageContext';
import { FarmerProfile } from '@/types';
import { OnboardingHeader } from '../common/OnboardingHeader';
import { ProgressIndicator } from '../common/ProgressIndicator';
import { FormField } from '../common/FormField';
import { CropOption } from '../common/CropOption';
import { PrimaryButton } from '../common/PrimaryButton';
import { Typography } from '../ui/Typography';

interface FarmerOnboardingProps {
  onComplete: (profile: Partial<FarmerProfile>) => void;
  onBack: () => void;
}

export const FarmerOnboarding: React.FC<FarmerOnboardingProps> = ({
  onComplete,
  onBack,
}) => {
  const { t } = useLanguage();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [stateName, setStateName] = useState('Maharashtra');
  const [district, setDistrict] = useState('');
  const [village, setVillage] = useState('');
  const [selectedCrops, setSelectedCrops] = useState<string[]>(['Rice', 'Cotton']);

  const cropList = [
    'Rice (धान)',
    'Cotton (कपास)',
    'Maize (मक्का)',
    'Wheat (गेहूं)',
    'Soybean (सोयाबीन)',
    'Potato (आलू)',
    'Tomato (टमाटर)',
    'Vegetables (सब्जियां)',
    'Fruits (फल)',
    'Other (अन्य)',
  ];

  const toggleCrop = (crop: string) => {
    if (selectedCrops.includes(crop)) {
      setSelectedCrops(selectedCrops.filter((c) => c !== crop));
    } else {
      setSelectedCrops([...selectedCrops, crop]);
    }
  };

  const handleFinish = () => {
    onComplete({
      name: name || 'Rameshwar Patel',
      phoneNumber: phone || '+91 98765 43210',
      state: stateName || 'Maharashtra',
      district: district || 'Nagpur',
      village: village || 'Kalmeshwar',
      primaryCrops: selectedCrops.length > 0 ? selectedCrops : ['Rice', 'Cotton'],
    });
  };

  return (
    <View style={styles.container}>
      {/* Step Progress & Back Header */}
      <View style={styles.topNav}>
        <TouchableOpacity style={styles.backBtn} onPress={() => (step > 1 ? setStep((step - 1) as any) : onBack())}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>

        <View style={styles.progressCol}>
          <ProgressIndicator currentStep={step > 3 ? 3 : step} totalSteps={3} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {/* STEP 1: IDENTITY */}
        {step === 1 && (
          <View>
            <OnboardingHeader
              headline={t('farmerStep1Title')}
              supportingText="Please enter your name and phone number so agronomists can address you directly."
            />

            <FormField
              label={t('fullNameLabel')}
              placeholder="e.g. Rameshwar Patel"
              value={name}
              onChangeText={setName}
              autoFocus
            />

            <FormField
              label={t('phoneNumberLabel')}
              placeholder="e.g. +91 98765 43210"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>
        )}

        {/* STEP 2: LOCATION */}
        {step === 2 && (
          <View>
            <OnboardingHeader
              headline={t('farmerStep2Title')}
              supportingText="Location allows us to provide localized weather advisories and APMC market prices."
            />

            <FormField
              label={t('stateLabel')}
              placeholder="e.g. Maharashtra"
              value={stateName}
              onChangeText={setStateName}
            />

            <FormField
              label={t('districtLabel')}
              placeholder="e.g. Nagpur"
              value={district}
              onChangeText={setDistrict}
            />

            <FormField
              label={t('villageLabel')}
              placeholder="e.g. Kalmeshwar"
              value={village}
              onChangeText={setVillage}
              optional
            />
          </View>
        )}

        {/* STEP 3: CROPS */}
        {step === 3 && (
          <View>
            <OnboardingHeader
              headline={t('farmerStep3Title')}
              supportingText={t('selectCropsSub')}
            />

            <View style={styles.cropsGrid}>
              {cropList.map((crop) => (
                <CropOption
                  key={crop}
                  label={crop}
                  selected={selectedCrops.includes(crop)}
                  onToggle={() => toggleCrop(crop)}
                />
              ))}
            </View>
          </View>
        )}

        {/* FINISH CONFIRMATION */}
        {step === 4 && (
          <View style={styles.finishBox}>
            <View style={styles.successCircle}>
              <Ionicons name="checkmark" size={36} color={Colors.textOnPrimary} />
            </View>

            <OnboardingHeader
              headline={t('farmerFinishTitle')}
              supportingText="Your profile is set up. You can now get advice for your crops."
            />
          </View>
        )}
      </ScrollView>

      {/* Footer Actions */}
      <View style={styles.footer}>
        {step < 3 && (
          <PrimaryButton
            title={t('nextBtn')}
            onPress={() => setStep((step + 1) as any)}
          />
        )}

        {step === 3 && (
          <PrimaryButton
            title={t('nextBtn')}
            onPress={() => setStep(4)}
          />
        )}

        {step === 4 && (
          <PrimaryButton
            title={t('continueToAgriSetu')}
            onPress={handleFinish}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.sm,
  },
  backBtn: {
    marginRight: Spacing.md,
    padding: 4,
  },
  progressCol: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.xl,
    paddingTop: Spacing.md,
  },
  cropsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: Spacing.xs,
  },
  finishBox: {
    alignItems: 'center',
    paddingTop: Spacing.xl,
  },
  successCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  footer: {
    padding: Spacing.lg,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.cardBorder,
  },
});
