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
import { Colors, BorderRadius, Spacing, Shadows } from '@/constants/theme';
import { VoiceInputCard } from '@/components/ask/VoiceInputCard';
import { CameraInputCard } from '@/components/ask/CameraInputCard';
import { ProgressiveDetailsSection } from '@/components/ask/ProgressiveDetailsSection';
import {
  ProblemReviewCard,
  ProblemInterpretation,
} from '@/components/ask/ProblemReviewCard';
import { caseService } from '@/services/caseService';
import { problemUnderstandingService } from '@/services/problemUnderstandingService';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

import { DemoResetButton } from '@/components/common/DemoResetButton';

export default function AskHelpScreen() {
  const router = useRouter();
  const { farmerProfile } = useAuth();
  const { language } = useLanguage();

  // Multi-step Flow State: 1 = Guided Input, 2 = Interpretation Review, 3 = Expert Matched Success
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [liveDraft, setLiveDraft] = useState<any>(null);

  // Form & Input States
  const [transcript, setTranscript] = useState('');
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [typeText, setTypeText] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('Cotton');
  const [location, setLocation] = useState('Kalmeshwar, Nagpur');
  const [urgency, setUrgency] = useState<'Normal' | 'Urgent'>('Normal');

  // Computed Interpretation State for Screen 2
  const interpretation: ProblemInterpretation = {
    cropName: liveDraft?.crop || selectedCrop,
    problemSummary: liveDraft?.symptoms && liveDraft.symptoms.length > 0
      ? liveDraft.symptoms.join(', ')
      : (transcript || typeText || 'Crop Disease Query'),
    symptoms: liveDraft?.symptoms || [transcript || typeText || 'Crop Symptom Analysis'],
    category: liveDraft?.problemCategory || 'Plant Pathology & Pest Control',
    region: liveDraft?.location || location,
    urgency: (liveDraft?.urgency === 'High' || urgency === 'Urgent') ? 'Urgent' : 'Normal',
    voiceNoteAttached: Boolean(transcript),
    photoAttached: Boolean(photoUrl),
    isLiveProvider: liveDraft?.isLiveProvider ?? true,
    provider: liveDraft?.provider || 'gemini',
    modelUsed: liveDraft?.modelUsed || 'gemini-3.6-flash',
  };

  const handleVoiceRecorded = (text: string) => {
    setTranscript(text);
  };

  const handleProceedToReview = async () => {
    if (!transcript && !photoUrl && !typeText) {
      Alert.alert(
        'Please Provide Info',
        'Please record voice, take a photo, or type your crop problem.'
      );
      return;
    }

    setIsAnalyzing(true);
    try {
      const rawText = transcript || typeText || 'Crop disease query';
      const draft = await problemUnderstandingService.processInput(
        rawText,
        language || 'en',
        location,
        Boolean(photoUrl)
      );
      setLiveDraft(draft);
      setStep(2);
    } catch (err: any) {
      console.warn('AI analysis error:', err);
      setStep(2);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleConfirmAndFindExpert = async () => {
    setIsSubmitting(true);
    const descriptionText = transcript || typeText || 'Crop Disease & Pest Query';

    try {
      // 1. Insert case into Supabase backend with actual live values
      const createdCase = await caseService.createCase({
        farmer_id: farmerProfile?.id || '11111111-1111-1111-1111-111111111111',
        crop: liveDraft?.crop || selectedCrop,
        title: interpretation.problemSummary,
        description: descriptionText,
        problem_category: liveDraft?.problemCategory || 'pest_disease',
        location: liveDraft?.location || location,
        urgency: liveDraft?.urgency || urgency,
        status: 'new',
      });

      if (createdCase && photoUrl) {
        await caseService.addCaseImage(createdCase.id, photoUrl);
      }

      const caseId = createdCase ? createdCase.id : `c-${Date.now()}`;

      // 2. Navigate to Expert Matching screen with structured case params
      router.push({
        pathname: '/expert-match',
        params: {
          caseId,
          crop: liveDraft?.crop || selectedCrop,
          problemCategory: liveDraft?.problemCategory || 'Plant Pathology & Pest Control',
          description: descriptionText,
          location: liveDraft?.location || location,
          urgency: liveDraft?.urgency || urgency,
        },
      });
    } catch (err: any) {
      console.warn('Case creation error:', err);
      // Fallback navigation
      router.push({
        pathname: '/expert-match',
        params: {
          caseId: `c-${Date.now()}`,
          crop: liveDraft?.crop || selectedCrop,
          problemCategory: liveDraft?.problemCategory || 'Plant Pathology',
          description: descriptionText,
          location: location,
          urgency: urgency,
        },
      });
    } finally {
      setIsSubmitting(false);
    }
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
          <View style={{ flex: 1 }}>
            <Typography variant="h2" color="#FFFFFF">
              {step === 1 ? 'अपनी समस्या बताएं' : 'समीक्षा व पुष्टि करें'}
            </Typography>
            <Typography variant="caption" color="rgba(255,255,255,0.85)">
              {step === 1 ? 'Step 1 of 2: Guided Problem Input' : 'Step 2 of 2: AI Interpretation Review'}
            </Typography>
          </View>
          <DemoResetButton variant="dark" />
        </View>
      </View>

      {step === 1 ? (
        <View style={styles.stepContainer}>
          {/* Card 1: Dominant Voice Input */}
          <VoiceInputCard
            transcript={transcript}
            onTranscriptChange={setTranscript}
            onVoiceRecorded={handleVoiceRecorded}
          />

          {/* Card 2: Camera Photo Input */}
          <CameraInputCard
            photoUrl={photoUrl}
            onPhotoCaptured={setPhotoUrl}
            onPhotoCleared={() => setPhotoUrl(null)}
          />

          {/* Card 3: Progressive Details */}
          <ProgressiveDetailsSection
            selectedCrop={selectedCrop}
            onCropChange={setSelectedCrop}
            location={location}
            onLocationChange={setLocation}
            urgency={urgency}
            onUrgencyChange={setUrgency}
          />

          {/* Bottom Primary Action Bar */}
          <View style={styles.bottomBar}>
            <Button
              title={isAnalyzing ? 'Analyzing Input with AI...' : 'आगे बढ़ें (Proceed to Review)'}
              onPress={handleProceedToReview}
              variant="primary"
              size="large"
              loading={isAnalyzing}
              disabled={isAnalyzing}
            />
          </View>
        </View>
      ) : (
        <View style={styles.stepContainer}>
          <ProblemReviewCard
            interpretation={interpretation}
            onConfirm={handleConfirmAndFindExpert}
            onEdit={() => setStep(1)}
          />
        </View>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  topHeader: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
    borderBottomLeftRadius: BorderRadius.xl,
    borderBottomRightRadius: BorderRadius.xl,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  backBtn: {
    padding: Spacing.xs,
  },
  stepContainer: {
    paddingBottom: Spacing.xxl,
  },
  bottomBar: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
  },
});
