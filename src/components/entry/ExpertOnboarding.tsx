import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing } from '@/constants/theme';
import { useLanguage } from '@/context/LanguageContext';
import { AgriculturalExpert } from '@/types';
import { OnboardingHeader } from '../common/OnboardingHeader';
import { ProgressIndicator } from '../common/ProgressIndicator';
import { FormField } from '../common/FormField';
import { CropOption } from '../common/CropOption';
import { PrimaryButton } from '../common/PrimaryButton';

interface ExpertOnboardingProps {
  onComplete: (profile: Partial<AgriculturalExpert>) => void;
  onBack: () => void;
}

export const ExpertOnboarding: React.FC<ExpertOnboardingProps> = ({
  onComplete,
  onBack,
}) => {
  const { t } = useLanguage();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [institution, setInstitution] = useState('');
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([
    'Plant Pathology',
    'Pest Management',
  ]);
  const [yearsExp, setYearsExp] = useState('12');
  const [regions, setRegions] = useState('Central India / Vidarbha');
  const [languages, setLanguages] = useState('Hindi, Marathi, English');
  const [bio, setBio] = useState('');
  const [price, setPrice] = useState('Free Basic Guidance');
  const [duration, setDuration] = useState('20 mins');

  const specialtyList = [
    'Plant Pathology',
    'Soil Science',
    'Pest Management',
    'Rice Cultivation',
    'Cotton Diseases',
    'Horticulture',
    'Irrigation',
    'Agricultural Machinery',
    'Organic Farming',
  ];

  const toggleSpecialty = (spec: string) => {
    if (selectedSpecialties.includes(spec)) {
      setSelectedSpecialties(selectedSpecialties.filter((s) => s !== spec));
    } else {
      setSelectedSpecialties([...selectedSpecialties, spec]);
    }
  };

  const handleFinish = () => {
    onComplete({
      name: name || 'Dr. Suresh Deshmukh',
      designation: title || 'Senior Plant Pathologist',
      institution: institution || 'ICAR - Central Institute for Cotton Research',
      specialty: selectedSpecialties.length > 0 ? selectedSpecialties : ['Plant Pathology'],
      experienceYears: parseInt(yearsExp, 10) || 12,
      languages: languages.split(',').map((l) => l.trim()),
      feeText: price || 'Free Basic Guidance',
      aboutBio: bio || 'Senior Agronomist specializing in field crop disease control and soil health.',
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
          <ProgressIndicator currentStep={step} totalSteps={4} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {/* STEP 1: PROFILE IDENTITY */}
        {step === 1 && (
          <View>
            <OnboardingHeader
              headline={t('expertStep1Title')}
              supportingText="Enter your name and current agricultural role or designation."
            />

            <FormField
              label={t('fullNameLabel')}
              placeholder="e.g. Dr. Suresh Deshmukh or Vikram Joshi"
              value={name}
              onChangeText={setName}
              autoFocus
            />

            <FormField
              label={t('professionalTitleLabel')}
              placeholder="e.g. Senior Plant Pathologist"
              value={title}
              onChangeText={setTitle}
            />

            <FormField
              label="Organization / Company / Institution"
              placeholder="e.g. ICAR-CICR, Syngenta, KVK, or Independent"
              value={institution}
              onChangeText={setInstitution}
            />
          </View>
        )}

        {/* STEP 2: SPECIALTIES */}
        {step === 2 && (
          <View>
            <OnboardingHeader
              headline={t('expertStep2Title')}
              supportingText="Select all domains where you provide verified guidance."
            />

            <View style={styles.cropsGrid}>
              {specialtyList.map((spec) => (
                <CropOption
                  key={spec}
                  label={spec}
                  selected={selectedSpecialties.includes(spec)}
                  onToggle={() => toggleSpecialty(spec)}
                />
              ))}
            </View>
          </View>
        )}

        {/* STEP 3: EXPERIENCE */}
        {step === 3 && (
          <View>
            <OnboardingHeader
              headline={t('expertStep3Title')}
              supportingText="Farmers trust expert credentials backed by real field work."
            />

            <FormField
              label={t('yearsExpLabel')}
              placeholder="e.g. 12"
              value={yearsExp}
              onChangeText={setYearsExp}
              keyboardType="numeric"
            />

            <FormField
              label={t('regionsServedLabel')}
              placeholder="e.g. Nagpur District, Vidarbha"
              value={regions}
              onChangeText={setRegions}
            />

            <FormField
              label="Spoken Languages (comma separated)"
              placeholder="e.g. Hindi, Marathi, English"
              value={languages}
              onChangeText={setLanguages}
            />

            <FormField
              label={t('shortBioLabel')}
              placeholder="Describe your research focus and field experience..."
              value={bio}
              onChangeText={setBio}
              multiline
              numberOfLines={3}
            />
          </View>
        )}

        {/* STEP 4: CONSULTATION TERMS */}
        {step === 4 && (
          <View>
            <OnboardingHeader
              headline={t('expertStep4Title')}
              supportingText="Set your consultation guidance terms and response duration."
            />

            <FormField
              label={t('priceLabel')}
              placeholder="e.g. Free Basic Guidance or ₹199 / 20 mins"
              value={price}
              onChangeText={setPrice}
            />

            <FormField
              label={t('durationLabel')}
              placeholder="e.g. 20 mins call"
              value={duration}
              onChangeText={setDuration}
            />
          </View>
        )}
      </ScrollView>

      {/* Footer Actions */}
      <View style={styles.footer}>
        {step < 4 ? (
          <PrimaryButton
            title={t('nextBtn')}
            onPress={() => setStep((step + 1) as any)}
          />
        ) : (
          <PrimaryButton
            title={t('createProfileBtn')}
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
  footer: {
    padding: Spacing.lg,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.cardBorder,
  },
});
