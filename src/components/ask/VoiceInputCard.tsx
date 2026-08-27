import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, Spacing, Shadows, TouchTargets } from '@/constants/theme';
import { Typography } from '../ui/Typography';

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

  const handleToggleRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      // Simulate live recording & speech-to-text conversion after 2 seconds
      setTimeout(() => {
        setIsRecording(false);
        const sampleRecordedText =
          'कपास की पत्तियों के किनारों पर लाल-पीले धब्बे दिखाई दे रहे हैं और पत्ते ऊपर की तरफ मुड़ रहे हैं। क्या यह कीट या बीमारी है? उपचारात्मक उपाय बताएं।';
        onVoiceRecorded(sampleRecordedText);
      }, 2200);
    } else {
      setIsRecording(false);
    }
  };

  return (
    <View style={[styles.card, isRecording && styles.cardActiveRecording]}>
      <View style={styles.headerRow}>
        <View style={styles.badge}>
          <Ionicons name="mic" size={16} color={Colors.textInverse} />
          <Typography variant="label" color={Colors.textInverse} style={styles.badgeText}>
            1. बोलकर बताएं (SPEAK PROBLEM - DOMINANT)
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
          {isRecording ? 'रिकॉर्डिंग जारी है... (Listening)' : transcript ? 'फिर से बोलें (Re-record Voice)' : 'बोलने के लिए दबाएं (Tap to Speak)'}
        </Typography>
      </TouchableOpacity>

      {/* Live Transcript Display Box */}
      {transcript ? (
        <View style={styles.transcriptBox}>
          <View style={styles.transcriptHeader}>
            <View style={styles.transcriptTitleRow}>
              <Ionicons name="volume-high" size={18} color={Colors.primary} />
              <Typography variant="label" color={Colors.primary} style={styles.transcriptLabel}>
                आपके द्वारा बोली गई बात (Voice Transcript):
              </Typography>
            </View>
            <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
              <Typography variant="label" color={Colors.accent}>
                {isEditing ? 'सहेजें (Save)' : 'संशोधन (Edit Text)'}
              </Typography>
            </TouchableOpacity>
          </View>

          {isEditing ? (
            <TextInput
              style={styles.transcriptInput}
              value={transcript}
              onChangeText={onTranscriptChange}
              multiline
              numberOfLines={3}
            />
          ) : (
            <Typography variant="bodyBold" color={Colors.textPrimary} style={styles.transcriptText}>
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
    borderWidth: 2,
    borderColor: Colors.primary,
    marginBottom: Spacing.lg,
    ...Shadows.card,
  },
  cardActiveRecording: {
    borderColor: Colors.danger,
    backgroundColor: Colors.dangerLight,
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
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  badgeText: {
    marginLeft: 4,
    fontSize: 11,
  },
  doneTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.successLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  doneText: {
    fontWeight: '700',
    marginLeft: 3,
  },
  title: {
    marginTop: Spacing.xs,
    marginBottom: 2,
  },
  subtitle: {
    marginBottom: Spacing.lg,
  },
  micHeroBtn: {
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: TouchTargets.hero + 10,
    marginBottom: Spacing.md,
  },
  micHeroBtnDefault: {
    backgroundColor: Colors.primary,
    ...Shadows.active,
  },
  micHeroBtnRecording: {
    backgroundColor: Colors.surface,
    borderWidth: 3,
    borderColor: Colors.danger,
  },
  micInnerCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
  micInnerDefault: {
    backgroundColor: Colors.primaryLight,
  },
  micInnerRecording: {
    backgroundColor: Colors.dangerLight,
  },
  micBtnLabel: {
    textAlign: 'center',
  },
  transcriptBox: {
    backgroundColor: Colors.primaryContainer,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
    marginTop: Spacing.xs,
  },
  transcriptHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  transcriptTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transcriptLabel: {
    marginLeft: 4,
  },
  transcriptText: {
    fontStyle: 'italic',
    lineHeight: 22,
  },
  transcriptInput: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.sm,
    padding: Spacing.sm,
    fontSize: 15,
    color: Colors.textPrimary,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    textAlignVertical: 'top',
  },
});
