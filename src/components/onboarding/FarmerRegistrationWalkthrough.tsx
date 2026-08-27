import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, Spacing, TouchTargets } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { Typography } from '../ui/Typography';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Chip } from '../ui/Chip';

interface FarmerRegistrationWalkthroughProps {
  onComplete: () => void;
  onBackToSplash: () => void;
}

export const FarmerRegistrationWalkthrough: React.FC<FarmerRegistrationWalkthroughProps> = ({
  onComplete,
  onBackToSplash,
}) => {
  const { farmerProfile, updateFarmerProfile, completeOnboarding } = useAuth();
  const { language } = useLanguage();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [name, setName] = useState(farmerProfile.name);
  const [village, setVillage] = useState(farmerProfile.village);
  const [district, setDistrict] = useState(farmerProfile.district);
  const [selectedLanguage, setSelectedLanguage] = useState(farmerProfile.preferredLanguage);
  const [selectedCrops, setSelectedCrops] = useState<string[]>(farmerProfile.primaryCrops);

  const cropOptions = [
    'Cotton (कपास)',
    'Soybean (सोयाबीन)',
    'Wheat (गेहूं)',
    'Gram (चना)',
    'Paddy (धान)',
    'Vegetables (सब्जियां)',
  ];

  const languageOptions = ['Hindi / Marathi', 'Hindi', 'English', 'Bengali', 'Assamese'];

  const toggleCrop = (crop: string) => {
    if (selectedCrops.includes(crop)) {
      setSelectedCrops(selectedCrops.filter((c) => c !== crop));
    } else {
      setSelectedCrops([...selectedCrops, crop]);
    }
  };

  const handleFinish = async () => {
    updateFarmerProfile({
      name: name || 'Rameshwar Patel',
      village: village || 'Kalmeshwar',
      district: district || 'Nagpur',
      preferredLanguage: selectedLanguage,
      primaryCrops: selectedCrops.length > 0 ? selectedCrops : ['Cotton (कपास)'],
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
          किसान पंजीकरण (Farmer Profile Setup)
        </Typography>
      </View>

      {/* Progress Dots */}
      <View style={styles.progressRow}>
        <View style={[styles.progressDot, step >= 1 && styles.activeDot]} />
        <View style={[styles.progressDot, step >= 2 && styles.activeDot]} />
        <View style={[styles.progressDot, step >= 3 && styles.activeDot]} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {/* STEP 1: NAME */}
        {step === 1 && (
          <View style={styles.stepCard}>
            <View style={styles.stepNumberBadge}>
              <Typography variant="label" color={Colors.textOnPrimary}>
                चरण 1 / Step 1
              </Typography>
            </View>

            <Typography variant="h1" color={Colors.textPrimary} style={styles.stepTitle}>
              आपका नाम क्या है? (Your Name)
            </Typography>

            <Typography variant="body" color={Colors.textSecondary} style={styles.stepSub}>
              कृषि वैज्ञानिक आपको इसी नाम से पहचानेंगे
            </Typography>

            <Input
              label="किसान का पूरा नाम (Full Name):"
              placeholder="उदा. रामेश्वर पटेल"
              value={name}
              onChangeText={setName}
              autoFocus
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

        {/* STEP 2: LOCATION */}
        {step === 2 && (
          <View style={styles.stepCard}>
            <View style={styles.stepNumberBadge}>
              <Typography variant="label" color={Colors.textOnPrimary}>
                चरण 2 / Step 2
              </Typography>
            </View>

            <Typography variant="h1" color={Colors.textPrimary} style={styles.stepTitle}>
              आपका खेत कहाँ है? (Location & District)
            </Typography>

            <Typography variant="body" color={Colors.textSecondary} style={styles.stepSub}>
              स्थानीय मौसम व मंडी भाव के लिए अपना गाँव व ज़िला बताएं
            </Typography>

            <Input
              label="गाँव / ब्लॉक (Village / Block):"
              placeholder="उदा. कलमेश्वर"
              value={village}
              onChangeText={setVillage}
            />

            <Input
              label="ज़िला व राज्य (District & State):"
              placeholder="उदा. नागपुर, महाराष्ट्र"
              value={district}
              onChangeText={setDistrict}
            />

            <Button
              title="आगे बढ़ें (Next)"
              onPress={() => setStep(3)}
              variant="primary"
              size="large"
              style={styles.nextBtn}
            />
          </View>
        )}

        {/* STEP 3: LANGUAGE & CROPS */}
        {step === 3 && (
          <View style={styles.stepCard}>
            <View style={styles.stepNumberBadge}>
              <Typography variant="label" color={Colors.textOnPrimary}>
                चरण 3 / Step 3
              </Typography>
            </View>

            <Typography variant="h1" color={Colors.textPrimary} style={styles.stepTitle}>
              भाषा और प्रमुख फसलें (Language & Crops)
            </Typography>

            <Typography variant="body" color={Colors.textSecondary} style={styles.stepSub}>
              अपनी मुख्य फसलों का चयन करें
            </Typography>

            <Typography variant="label" style={styles.fieldLabel}>
              पसंदीदा भाषा (Preferred Language):
            </Typography>
            <View style={styles.chipsRow}>
              {languageOptions.map((lang) => (
                <Chip
                  key={lang}
                  label={lang}
                  selected={selectedLanguage === lang}
                  onPress={() => setSelectedLanguage(lang)}
                  style={styles.chipItem}
                />
              ))}
            </View>

            <Typography variant="label" style={styles.fieldLabel}>
              आप कौन सी फसलें उगाते हैं? (Primary Crops):
            </Typography>
            <View style={styles.chipsRow}>
              {cropOptions.map((crop) => (
                <Chip
                  key={crop}
                  label={crop}
                  selected={selectedCrops.includes(crop)}
                  onPress={() => toggleCrop(crop)}
                  style={styles.chipItem}
                />
              ))}
            </View>

            <Button
              title="प्रोफाइल पूरी करें व ऐप शुरू करें (Finish & Launch)"
              onPress={handleFinish}
              variant="primary"
              size="hero"
              icon={<Ionicons name="checkmark-circle" size={22} color={Colors.textInverse} />}
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
