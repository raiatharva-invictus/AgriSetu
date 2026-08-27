import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, Spacing, TouchTargets } from '@/constants/theme';
import { useLanguage } from '@/context/LanguageContext';
import { CaseStatus } from '@/types/case';
import { Typography } from '../ui/Typography';
import { PrimaryButton } from '../common/PrimaryButton';

interface OutcomeSelectorProps {
  currentStatus: CaseStatus;
  onSaveOutcome: (status: 'resolved' | 'partially_resolved' | 'unresolved', feedback?: string) => void;
}

export const OutcomeSelector: React.FC<OutcomeSelectorProps> = ({
  currentStatus,
  onSaveOutcome,
}) => {
  const { t } = useLanguage();
  const [selectedOpt, setSelectedOpt] = useState<'resolved' | 'partially_resolved' | 'unresolved'>(
    currentStatus === 'resolved'
      ? 'resolved'
      : currentStatus === 'partially_resolved'
      ? 'partially_resolved'
      : currentStatus === 'unresolved'
      ? 'unresolved'
      : 'resolved'
  );

  const [feedbackText, setFeedbackText] = useState('');

  const handleSubmit = () => {
    onSaveOutcome(selectedOpt, feedbackText);
  };

  return (
    <View style={styles.container}>
      <Typography variant="h3" color={Colors.textPrimary} style={styles.questionTitle}>
        {t('followUpQuestion')}
      </Typography>

      {/* 3 Outcome Choices */}
      <View style={styles.optionsRow}>
        {/* Solved */}
        <TouchableOpacity
          style={[
            styles.optionBtn,
            selectedOpt === 'resolved' ? styles.solvedSelected : styles.unselectedBtn,
          ]}
          onPress={() => setSelectedOpt('resolved')}
          activeOpacity={0.8}
        >
          <Ionicons
            name="checkmark-circle"
            size={18}
            color={selectedOpt === 'resolved' ? Colors.textInverse : Colors.success}
          />
          <Typography
            variant="bodyBold"
            color={selectedOpt === 'resolved' ? Colors.textInverse : Colors.textPrimary}
            style={styles.optText}
          >
            {t('solvedOpt')}
          </Typography>
        </TouchableOpacity>

        {/* Partially Resolved */}
        <TouchableOpacity
          style={[
            styles.optionBtn,
            selectedOpt === 'partially_resolved' ? styles.partialSelected : styles.unselectedBtn,
          ]}
          onPress={() => setSelectedOpt('partially_resolved')}
          activeOpacity={0.8}
        >
          <Ionicons
            name="contrast"
            size={18}
            color={selectedOpt === 'partially_resolved' ? Colors.textInverse : Colors.harvestAmber}
          />
          <Typography
            variant="bodyBold"
            color={selectedOpt === 'partially_resolved' ? Colors.textInverse : Colors.textPrimary}
            style={styles.optText}
          >
            {t('partiallySolvedOpt')}
          </Typography>
        </TouchableOpacity>

        {/* Still Unresolved */}
        <TouchableOpacity
          style={[
            styles.optionBtn,
            selectedOpt === 'unresolved' ? styles.unresolvedSelected : styles.unselectedBtn,
          ]}
          onPress={() => setSelectedOpt('unresolved')}
          activeOpacity={0.8}
        >
          <Ionicons
            name="alert-circle"
            size={18}
            color={selectedOpt === 'unresolved' ? Colors.textInverse : Colors.danger}
          />
          <Typography
            variant="bodyBold"
            color={selectedOpt === 'unresolved' ? Colors.textInverse : Colors.textPrimary}
            style={styles.optText}
          >
            {t('unresolvedOpt')}
          </Typography>
        </TouchableOpacity>
      </View>

      {/* Feedback Text Input */}
      <TextInput
        style={styles.feedbackInput}
        placeholder={t('feedbackPlaceholder')}
        placeholderTextColor={Colors.textMuted}
        value={feedbackText}
        onChangeText={setFeedbackText}
        multiline
        numberOfLines={2}
      />

      <PrimaryButton
        title={t('submitOutcomeBtn')}
        onPress={handleSubmit}
        style={styles.submitBtn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    marginTop: Spacing.md,
  },
  questionTitle: {
    marginBottom: Spacing.md,
  },
  optionsRow: {
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  optionBtn: {
    minHeight: TouchTargets.standard,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
  },
  unselectedBtn: {
    backgroundColor: Colors.surface,
    borderColor: Colors.cardBorder,
  },
  solvedSelected: {
    backgroundColor: Colors.success,
    borderColor: Colors.success,
  },
  partialSelected: {
    backgroundColor: Colors.harvestAmber,
    borderColor: Colors.harvestAmber,
  },
  unresolvedSelected: {
    backgroundColor: Colors.danger,
    borderColor: Colors.danger,
  },
  optText: {
    marginLeft: Spacing.sm,
    fontSize: 14,
  },
  feedbackInput: {
    minHeight: 60,
    backgroundColor: Colors.surfaceSecondary,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: 14,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  submitBtn: {
    height: 48,
  },
});
