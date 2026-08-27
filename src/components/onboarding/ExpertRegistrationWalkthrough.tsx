import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, Spacing } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { OrganizationType } from '@/types';
import { Typography } from '../ui/Typography';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Chip } from '../ui/Chip';

interface ExpertRegistrationWalkthroughProps {
  onComplete: () => void;
  onBackToSplash: () => void;
}

export const ExpertRegistrationWalkthrough: React.FC<ExpertRegistrationWalkthroughProps> = ({
  onComplete,
  onBackToSplash,
}) => {
  const { expertProfile, updateExpertProfile, completeOnboarding } = useAuth();
  const { language } = useLanguage();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [name, setName] = useState(expertProfile.name);
  const [designation, setDesignation] = useState(expertProfile.designation);
  const [institution, setInstitution] = useState(expertProfile.institution);
  const [orgType, setOrgType] = useState<OrganizationType>(expertProfile.organizationType || 'icar_kvk');
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(expertProfile.specialty);
  const [feeText, setFeeText] = useState(expertProfile.feeText);

  const orgOptions: { key: OrganizationType; label: string }[] = [
    { key: 'icar_kvk', label: 'ICAR / KVK Government Scientist' },
    { key: 'private_company', label: 'Private Agribusiness (Syngenta, Bayer, etc.)' },
    { key: 'independent_agronomist', label: 'Independent Soil Doctor & Agronomist' },
    { key: 'krishi_officer', label: 'Krishi Officer / Field Extension Specialist' },
  ];

  const specialtyOptions = [
    'Cotton Diseases',
    'Sap-Sucking Pests',
    'Soybean Pest Shield',
    'Soil Micro-Nutrients',
    'Drip Irrigation',
    'Organic Pest Control',
  ];

  const toggleSpecialty = (spec: string) => {
    if (selectedSpecialties.includes(spec)) {
      setSelectedSpecialties(selectedSpecialties.filter((s) => s !== spec));
    } else {
      setSelectedSpecialties([...selectedSpecialties, spec]);
    }
  };

  const handleFinish = async () => {
    updateExpertProfile({
      name: name || 'Dr. Suresh Deshmukh',
      designation: designation || 'Senior Crop Protection Agronomist',
      institution: institution || 'Syngenta / ICAR Agricultural Advisory',
      organizationType: orgType,
      specialty: selectedSpecialties.length > 0 ? selectedSpecialties : ['Cotton Diseases'],
      feeText: feeText || 'Free Basic Guidance',
    });
    await completeOnboarding(language);
    onComplete();
  };

  return (
    <View style={styles.container}>
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => (step > 1 ? setStep((step - 1) as any) : onBackToSplash())}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Typography variant="h3" color={Colors.textPrimary}>
          कृषि विशेषज्ञ पंजीयन (Expert Setup)
        </Typography>
      </View>

      {/* Progress Dots */}
      <View style={styles.progressRow}>
        <View style={[styles.progressDot, step >= 1 && styles.activeDot]} />
        <View style={[styles.progressDot, step >= 2 && styles.activeDot]} />
        <View style={[styles.progressDot, step >= 3 && styles.activeDot]} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {/* STEP 1: NAME & TITLE */}
        {step === 1 && (
          <View style={styles.stepCard}>
            <View style={styles.stepNumberBadge}>
              <Typography variant="label" color={Colors.textOnPrimary}>
                Step 1 of 3
              </Typography>
            </View>

            <Typography variant="h1" color={Colors.textPrimary} style={styles.stepTitle}>
              आपका नाम व पदनाम (Expert Identity)
            </Typography>

            <Typography variant="body" color={Colors.textSecondary} style={styles.stepSub}>
              किसानों को आपकी आधिकारिक जानकारी दिखाई जाएगी
            </Typography>

            <Input
              label="विशेषज्ञ का पूरा नाम (Full Name):"
              placeholder="उदा. Dr. Suresh Deshmukh या Vikram Joshi"
              value={name}
              onChangeText={setName}
              autoFocus
            />

            <Input
              label="पदनाम (Designation Title):"
              placeholder="उदा. Senior Crop Agronomist"
              value={designation}
              onChangeText={setDesignation}
            />

            <Button
              title="आगे बढ़ें (Next)"
              onPress={() => setStep(2)}
              variant="primary"
              size="large"
              style={styles.nextBtn}
            />
          </View>
        )}

        {/* STEP 2: INSTITUTION TYPE & SPECIALTY */}
        {step === 2 && (
          <View style={styles.stepCard}>
            <View style={styles.stepNumberBadge}>
              <Typography variant="label" color={Colors.textOnPrimary}>
                Step 2 of 3
              </Typography>
            </View>

            <Typography variant="h1" color={Colors.textPrimary} style={styles.stepTitle}>
              संस्थान व संगठन प्रकार (Organization Type)
            </Typography>

            <Typography variant="body" color={Colors.textSecondary} style={styles.stepSub}>
              मुख्य विश्वास मानदंड किसानों द्वारा दिए गए समाधान प्रमाण पर आधारित है
            </Typography>

            <Typography variant="label" style={styles.fieldLabel}>
              संगठन प्रकार (Organization Category):
            </Typography>
            <View style={styles.orgList}>
              {orgOptions.map((opt) => {
                const isSel = orgType === opt.key;
                return (
                  <TouchableOpacity
                    key={opt.key}
                    style={[styles.orgCard, isSel && styles.orgCardSel]}
                    onPress={() => setOrgType(opt.key)}
                  >
                    <Ionicons
                      name={isSel ? 'radio-button-on' : 'radio-button-off'}
                      size={20}
                      color={isSel ? Colors.primary : Colors.textMuted}
                    />
                    <Typography
                      variant="bodyBold"
                      color={isSel ? Colors.primaryDark : Colors.textPrimary}
                      style={styles.orgLabelText}
                    >
                      {opt.label}
                    </Typography>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Input
              label="कंपनी / संस्थान का नाम (Company or Institute Name):"
              placeholder="उदा. Syngenta, Bayer CropScience, or ICAR-CICR"
              value={institution}
              onChangeText={setInstitution}
            />

            <Typography variant="label" style={styles.fieldLabel}>
              विशेषज्ञता के मुख्य विषय (Specialties):
            </Typography>
            <View style={styles.chipsRow}>
              {specialtyOptions.map((spec) => (
                <Chip
                  key={spec}
                  label={spec}
                  selected={selectedSpecialties.includes(spec)}
                  onPress={() => toggleSpecialty(spec)}
                  style={styles.chipItem}
                />
              ))}
            </View>

            <Button
              title="आगे बढ़ें (Next)"
              onPress={() => setStep(3)}
              variant="primary"
              size="large"
              style={styles.nextBtn}
            />
          </View>
        )}

        {/* STEP 3: CONSULTATION & FINISH */}
        {step === 3 && (
          <View style={styles.stepCard}>
            <View style={styles.stepNumberBadge}>
              <Typography variant="label" color={Colors.textOnPrimary}>
                Step 3 of 3
              </Typography>
            </View>

            <Typography variant="h1" color={Colors.textPrimary} style={styles.stepTitle}>
              सलाह शुल्क व उपलब्धता (Consultation Terms)
            </Typography>

            <Typography variant="body" color={Colors.textSecondary} style={styles.stepSub}>
              निःशुल्क या परामर्श शुल्क विवरण चुनें
            </Typography>

            <Input
              label="सलाह शुल्क विवरण (Consultation Fee Text):"
              placeholder="उदा. Free Basic Guidance or ₹199 / 20 mins"
              value={feeText}
              onChangeText={setFeeText}
            />

            <Button
              title="विशेषज्ञ पोर्टल खोलें (Launch Expert Portal)"
              onPress={handleFinish}
              variant="primary"
              size="hero"
              icon={<Ionicons name="briefcase" size={22} color={Colors.textInverse} />}
              style={styles.nextBtn}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
  },
  backBtn: {
    marginRight: Spacing.md,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
  },
  progressDot: {
    width: 32,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.cardBorder,
  },
  activeDot: {
    backgroundColor: Colors.primary,
  },
  scrollContent: {
    padding: Spacing.lg,
  },
  stepCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
  },
  stepNumberBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
    alignSelf: 'flex-start',
    marginBottom: Spacing.md,
  },
  stepTitle: {
    marginBottom: 4,
  },
  stepSub: {
    marginBottom: Spacing.xl,
  },
  fieldLabel: {
    marginBottom: Spacing.xs,
    marginTop: Spacing.sm,
  },
  orgList: {
    gap: Spacing.xs,
    marginBottom: Spacing.md,
  },
  orgCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceSecondary,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
  },
  orgCardSel: {
    backgroundColor: Colors.primaryContainer,
    borderColor: Colors.primary,
  },
  orgLabelText: {
    marginLeft: Spacing.sm,
    flex: 1,
    fontSize: 13,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
    marginBottom: Spacing.md,
  },
  chipItem: {
    marginBottom: 4,
  },
  nextBtn: {
    marginTop: Spacing.lg,
  },
});
