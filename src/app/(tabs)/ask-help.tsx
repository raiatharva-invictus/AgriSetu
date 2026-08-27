import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Colors, BorderRadius, Spacing, Shadows } from '@/constants/theme';
import { VoiceInputCard } from '@/components/ask/VoiceInputCard';
import { CameraInputCard } from '@/components/ask/CameraInputCard';
import { ProgressiveDetailsSection } from '@/components/ask/ProgressiveDetailsSection';
import {
  ProblemReviewCard,
  ProblemInterpretation,
} from '@/components/ask/ProblemReviewCard';

export default function AskHelpScreen() {
  const router = useRouter();

  // Multi-step Flow State: 1 = Guided Input, 2 = Interpretation Review, 3 = Expert Matched Success
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form & Input States
  const [transcript, setTranscript] = useState('');
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [typeText, setTypeText] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('Cotton (कपास)');
  const [location, setLocation] = useState('Kalmeshwar, Nagpur');
  const [urgency, setUrgency] = useState<'Normal' | 'Urgent'>('Normal');

  // Computed Interpretation State for Screen 2
  const interpretation: ProblemInterpretation = {
    cropName: selectedCrop,
    problemSummary: transcript
      ? 'पत्तियों के किनारों पर लाल धब्बे व मुड़ना (Red Leaf Edges & Curling)'
      : typeText || 'कीट संक्रमण या पादप रोग (Crop Disease Issue)',
    symptoms: [
      'पत्तियों के किनारों पर लाल धब्बे (Reddish spots on leaf margins)',
      'पत्तियों का ऊपर की ओर मुड़ना (Upward leaf curling)',
      'रस चूसक कीट की संभावना (Possible sap-sucking pest attack)',
    ],
    category: 'पादप रोग व कीट नियंत्रण (Plant Disease & Pest Control)',
    region: location,
    urgency: urgency === 'Urgent' ? 'अति आवश्यक (Urgent)' : 'सामान्य (Normal)',
    voiceNoteAttached: Boolean(transcript),
    photoAttached: Boolean(photoUrl),
  };

  const handleVoiceRecorded = (text: string) => {
    setTranscript(text);
  };

  const handleProceedToReview = () => {
    if (!transcript && !photoUrl && !typeText) {
      Alert.alert(
        'जानकारी दें (Please Provide Info)',
        'कृपया बोलकर बताएं, फोटो खींचें, या अपनी समस्या का विवरण टाइप करें।'
      );
      return;
    }
    setStep(2);
  };

  const handleConfirmAndFindExpert = () => {
    router.push('/expert-match');
  };

  return (
    <ScreenContainer scrollable={true}>
      {/* Top Guided Header */}
      <View style={styles.topHeader}>
        <View style={styles.headerTitleRow}>
          {step > 1 && (
            <TouchableOpacity style={styles.backBtn} onPress={() => setStep((step - 1) as any)}>
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          )}
          <View style={styles.headerTextGroup}>
            <Typography variant="hero" color="#FFFFFF">
              {step === 1
                ? 'आपके खेत में क्या समस्या है?'
                : step === 2
                ? 'आपकी समस्या समझ आ गई है'
                : 'कृषि वैज्ञानिक से संपर्क'}
            </Typography>
            <Typography variant="caption" color="#D1FAE5" style={styles.headerSubtitle}>
              {step === 1
                ? 'What is happening with your farm? Choose voice, camera, or text.'
                : step === 2
                ? 'Review structured crop problem summary before scientist routing.'
                : 'Connected to KVK Senior Agronomist.'}
            </Typography>
          </View>
        </View>

        {/* Step Progress Bar */}
        <View style={styles.progressBarRow}>
          <View style={[styles.progressStep, step >= 1 && styles.progressStepActive]} />
          <View style={[styles.progressStep, step >= 2 && styles.progressStepActive]} />
          <View style={[styles.progressStep, step >= 3 && styles.progressStepActive]} />
        </View>
      </View>

      <View style={styles.content}>
        {/* ================= SCREEN 1: GUIDED MULTI-MODAL INPUT ================= */}
        {step === 1 && (
          <View>
            {/* 1. SPEAK (Visually Dominant Hero) */}
            <VoiceInputCard
              transcript={transcript}
              onTranscriptChange={setTranscript}
              onVoiceRecorded={handleVoiceRecorded}
            />

            {/* 2. TAKE A PHOTO */}
            <CameraInputCard
              photoUrl={photoUrl}
              onPhotoCaptured={(url) => setPhotoUrl(url)}
              onPhotoCleared={() => setPhotoUrl(null)}
            />

            {/* 3. TYPE (Option 3) */}
            <View style={styles.card}>
              <View style={styles.headerRow}>
                <View style={styles.badge}>
                  <Ionicons name="create" size={16} color={Colors.textPrimary} />
                  <Typography variant="label" color={Colors.textPrimary} style={styles.badgeText}>
                    3. टाइप करके लिखें (TYPE QUESTION)
                  </Typography>
                </View>
              </View>

              <Typography variant="h3" color={Colors.textPrimary} style={styles.title}>
                यदि चाहें तो विवरण टाइप करें
              </Typography>

              <Input
                placeholder="उदा. कपास के पत्तों पर पीलापन आ रहा है..."
                value={typeText}
                onChangeText={setTypeText}
                multiline
                numberOfLines={3}
                style={styles.textAreaInput}
              />
            </View>

            {/* Progressive Disclosure Optional Section */}
            <ProgressiveDetailsSection
              selectedCrop={selectedCrop}
              onCropChange={setSelectedCrop}
              location={location}
              onLocationChange={setLocation}
              urgency={urgency}
              onUrgencyChange={setUrgency}
            />

            {/* Primary Action Button */}
            <Button
              title="आगे बढ़ें (Review Problem Summary)"
              onPress={handleProceedToReview}
              variant="primary"
              size="hero"
              icon={<Ionicons name="arrow-forward" size={22} color={Colors.textInverse} />}
              style={styles.proceedBtn}
            />
          </View>
        )}

        {/* ================= SCREEN 2: STRUCTURED INTERPRETATION REVIEW ================= */}
        {step === 2 && (
          <ProblemReviewCard
            interpretation={interpretation}
            onConfirm={handleConfirmAndFindExpert}
            onEdit={() => setStep(1)}
          />
        )}

        {/* ================= SCREEN 3: SUCCESSFUL EXPERT MATCH ================= */}
        {step === 3 && (
          <View style={styles.successContainer}>
            <View style={styles.successIconCircle}>
              <Ionicons name="checkmark-done-circle" size={56} color={Colors.success} />
            </View>

            <Typography variant="h1" align="center" color={Colors.primaryDark}>
              समस्या दर्ज हो गई है! (Query Submitted)
            </Typography>

            <Typography
              variant="body"
              align="center"
              color={Colors.textSecondary}
              style={styles.successSub}
            >
              आपकी समस्या आईसीएआर वैज्ञानिक **डॉ. सुरेश देशमुख** (सीनियर कॉटन रोग विशेषज्ञ) को भेज दी गई है।
            </Typography>

            <View style={styles.matchedExpertBox}>
              <View style={styles.expertRow}>
                <View style={styles.expertAvatarCircle}>
                  <Typography variant="h3" color={Colors.primaryDark}>
                    SD
                  </Typography>
                </View>
                <View style={styles.expertInfo}>
                  <Typography variant="h3" color={Colors.textPrimary}>
                    Dr. Suresh Deshmukh
                  </Typography>
                  <Typography variant="label" color={Colors.primary}>
                    Senior Plant Pathologist, ICAR
                  </Typography>
                  <Typography variant="caption" color={Colors.textSecondary}>
                    Languages: Hindi, Marathi, English • Online Now
                  </Typography>
                </View>
              </View>
            </View>

            <View style={styles.successActions}>
              <Button
                title="विशेषज्ञ को अभी कॉल करें (Call Scientist)"
                onPress={() =>
                  Alert.alert(
                    'Direct Call Initiated',
                    'Connecting to Dr. Deshmukh on free Agri advice line...'
                  )
                }
                variant="primary"
                size="large"
                icon={<Ionicons name="call" size={20} color={Colors.textInverse} />}
              />

              <Button
                title="होम स्क्रीन पर जाएं (Back to Home)"
                onPress={() => router.push('/')}
                variant="outline"
                size="medium"
              />
            </View>
          </View>
        )}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  topHeader: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  backBtn: {
    marginRight: Spacing.md,
    marginTop: 4,
  },
  headerTextGroup: {
    flex: 1,
  },
  headerSubtitle: {
    marginTop: 4,
  },
  progressBarRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
    marginTop: Spacing.md,
  },
  progressStep: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  progressStepActive: {
    backgroundColor: Colors.accent,
  },
  content: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xxxl,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    marginBottom: Spacing.lg,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceSecondary,
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  badgeText: {
    marginLeft: 4,
    fontSize: 11,
  },
  title: {
    marginTop: 2,
    marginBottom: Spacing.md,
  },
  textAreaInput: {
    minHeight: 80,
  },
  proceedBtn: {
    marginTop: Spacing.md,
  },
  successContainer: {
    paddingVertical: Spacing.xl,
    alignItems: 'center',
  },
  successIconCircle: {
    marginBottom: Spacing.md,
  },
  successSub: {
    marginTop: Spacing.xs,
    marginBottom: Spacing.xl,
    maxWidth: 320,
    lineHeight: 22,
  },
  matchedExpertBox: {
    width: '100%',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    marginBottom: Spacing.xl,
    ...Shadows.card,
  },
  expertRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expertAvatarCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  expertInfo: {
    marginLeft: Spacing.md,
    flex: 1,
  },
  successActions: {
    width: '100%',
    gap: Spacing.md,
  },
});
