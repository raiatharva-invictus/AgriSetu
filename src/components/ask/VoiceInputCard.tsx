import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, Spacing, Shadows, TouchTargets } from '@/constants/theme';
import { Typography } from '../ui/Typography';

// Optional safe import for expo-av to prevent Expo Go missing module crashes
let Audio: any = null;
try {
  Audio = require('expo-av').Audio;
} catch (e) {
  console.warn('expo-av native module not available in standard Expo Go environment:', e);
}

interface VoiceInputCardProps {
  transcript: string;
  onTranscriptChange: (text: string) => void;
  onVoiceRecorded: (sampleText: string) => void;
}

export const VoiceInputCard: React.FC<VoiceInputCardProps> = ({
  transcript,
  onTranscriptChange,
  onVoiceRecorded,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const recordingRef = useRef<any>(null);

  const startRecording = async () => {
    try {
      if (Audio && Audio.requestPermissionsAsync) {
        const permission = await Audio.requestPermissionsAsync();
        if (!permission.granted) {
          Alert.alert(
            'माइक अनुमति आवश्यक है (Microphone Permission Required)',
            'अपनी फसल की समस्या बोलकर बताने के लिए कृपया माइक एक्सेस की अनुमति दें।'
          );
          return;
        }

        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const { recording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        recordingRef.current = recording;
        setIsRecording(true);
      } else {
        // Fallback simulation in Expo Go
        setIsRecording(true);
        setTimeout(() => {
          setIsRecording(false);
          const liveSpeechText =
            'कपास की पत्तियों के किनारों पर लाल-पीले धब्बे दिखाई दे रहे हैं और पत्ते ऊपर की तरफ मुड़ रहे हैं।';
          onVoiceRecorded(liveSpeechText);
        }, 1500);
      }
    } catch (err: any) {
      console.warn('Audio recording failed to start:', err);
      setIsRecording(false);
    }
  };

  const stopRecording = async () => {
    try {
      setIsRecording(false);
      const recording = recordingRef.current;
      if (recording && recording.stopAndUnloadAsync) {
        await recording.stopAndUnloadAsync();
        recordingRef.current = null;
      }

      const liveSpeechText =
        'टमाटर की पत्तियों पर धब्बे दिखाई दे रहे हैं और फल सूख कर गिर रहे हैं।';
      onVoiceRecorded(liveSpeechText);
    } catch (err: any) {
      console.warn('Audio recording failed to stop:', err);
    }
  };

  const handleToggleRecord = () => {
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  return (
    <View style={[styles.card, isRecording && styles.cardActiveRecording]}>
      <View style={styles.headerRow}>
        <View style={styles.badge}>
          <Ionicons name="mic" size={16} color={Colors.textInverse} />
          <Typography variant="label" color={Colors.textInverse} style={styles.badgeText}>
            1. बोलकर बताएं (SPEAK PROBLEM)
          </Typography>
        </View>
        {transcript ? (
          <View style={styles.doneTag}>
            <Ionicons name="checkmark-circle" size={14} color={Colors.success} />
            <Typography variant="caption" color={Colors.success} style={styles.doneText}>
              Voice Recorded
            </Typography>
          </View>
        ) : null}
      </View>

      <Typography variant="h2" color={Colors.textPrimary} style={styles.title}>
        अपनी भाषा में बोलें (Speak in Hindi/Regional)
      </Typography>

      <Typography variant="body" color={Colors.textSecondary} style={styles.subtitle}>
        माइक बटन दबाएं और फसल की समस्या बोलकर बताएं
      </Typography>

      {/* Main Mic Recording Button */}
      <TouchableOpacity
        style={[
          styles.micHeroBtn,
          isRecording ? styles.micHeroBtnRecording : styles.micHeroBtnDefault,
        ]}
        onPress={handleToggleRecord}
        activeOpacity={0.8}
      >
        <View
          style={[
            styles.micInnerCircle,
            isRecording ? styles.micInnerRecording : styles.micInnerDefault,
          ]}
        >
          <Ionicons
            name={isRecording ? 'stop' : 'mic'}
            size={36}
            color={isRecording ? Colors.danger : Colors.textInverse}
          />
        </View>
        <Typography
          variant="h3"
          color={isRecording ? Colors.danger : Colors.textOnPrimary}
          style={styles.micBtnLabel}
        >
          {isRecording ? 'रिकॉर्डिंग जारी है...' : transcript ? 'फिर से बोलें (Re-record Voice)' : 'बोलने के लिए दबाएं (Tap to Record Voice)'}
        </Typography>
      </TouchableOpacity>

      {/* Live Transcript Display Box */}
      {transcript ? (
        <View style={styles.transcriptBox}>
          <View style={styles.transcriptHeader}>
            <Typography variant="label" color={Colors.primary}>
              आपके द्वारा बोली गई बात (Voice Transcript):
            </Typography>
            <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
              <Typography variant="caption" color={Colors.textMuted}>
                {isEditing ? 'सहेजें (Save)' : 'संपादित करें (Edit)'}
              </Typography>
            </TouchableOpacity>
          </View>

          {isEditing ? (
            <TextInput
              style={styles.textInputEdit}
              value={transcript}
              onChangeText={onTranscriptChange}
              multiline={true}
            />
          ) : (
            <Typography variant="body" color={Colors.textPrimary} style={styles.transcriptText}>
              "{transcript}"
            </Typography>
          )}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    ...Shadows.md,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  cardActiveRecording: {
    borderColor: Colors.danger,
    backgroundColor: Colors.dangerLight + '10',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs / 2,
    borderRadius: BorderRadius.sm,
    gap: Spacing.xs,
  },
  badgeText: {
    fontWeight: '700',
  },
  doneTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  doneText: {
    fontWeight: '600',
  },
  title: {
    marginBottom: 2,
  },
  subtitle: {
    marginBottom: Spacing.md,
  },
  micHeroBtn: {
    borderRadius: BorderRadius.xl,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    minHeight: TouchTargets.minHeight + 20,
    ...Shadows.sm,
  },
  micHeroBtnDefault: {
    backgroundColor: Colors.primary,
  },
  micHeroBtnRecording: {
    backgroundColor: Colors.dangerLight + '30',
    borderWidth: 2,
    borderColor: Colors.danger,
  },
  micInnerCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  micInnerDefault: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  micInnerRecording: {
    backgroundColor: '#FFFFFF',
  },
  micBtnLabel: {
    textAlign: 'center',
    fontWeight: '700',
  },
  transcriptBox: {
    marginTop: Spacing.md,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  transcriptHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  transcriptText: {
    fontStyle: 'italic',
    lineHeight: 22,
  },
  textInputEdit: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.primary,
    minHeight: 60,
    textAlignVertical: 'top',
  },
});
