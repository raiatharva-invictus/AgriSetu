import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, Spacing, Shadows } from '@/constants/theme';
import { Typography } from '../ui/Typography';
import { Button } from '../ui/Button';

export interface ProblemInterpretation {
  cropName: string;
  problemSummary: string;
  symptoms: string[];
  category: string;
  region: string;
  urgency: string;
  voiceNoteAttached: boolean;
  photoAttached: boolean;
}

interface ProblemReviewCardProps {
  interpretation: ProblemInterpretation;
  onConfirm: () => void;
  onEdit: () => void;
}

export const ProblemReviewCard: React.FC<ProblemReviewCardProps> = ({
  interpretation,
  onConfirm,
  onEdit,
}) => {
  return (
    <View style={styles.container}>
      {/* Friendly Interpretation Header Banner */}
      <View style={styles.banner}>
        <Ionicons name="sparkles" size={24} color={Colors.primary} />
        <View style={styles.bannerTextCol}>
          <Typography variant="h2" color={Colors.primaryDark}>
            आपकी समस्या समझ आ गई है
          </Typography>
          <Typography variant="caption" color={Colors.textSecondary}>
            We interpreted your query to match with certified KVK agricultural experts.
          </Typography>
        </View>
      </View>

      {/* Human-Readable Structured Card */}
      <View style={styles.reviewCard}>
        {/* Item 1: Crop */}
        <View style={styles.itemRow}>
          <Typography variant="label" color={Colors.textMuted} style={styles.itemLabel}>
            फसल (Crop)
          </Typography>
          <View style={styles.itemValueRow}>
            <Ionicons name="leaf" size={18} color={Colors.primary} />
            <Typography variant="h3" color={Colors.primaryDark} style={styles.valueText}>
              {interpretation.cropName}
            </Typography>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Item 2: What We Noticed */}
        <View style={styles.itemRow}>
          <Typography variant="label" color={Colors.textMuted} style={styles.itemLabel}>
            क्या देखा गया (What we noticed)
          </Typography>
          <Typography variant="bodyBold" color={Colors.textPrimary} style={styles.valueText}>
            {interpretation.problemSummary}
          </Typography>
        </View>

        <View style={styles.divider} />

        {/* Item 3: Symptoms */}
        <View style={styles.itemRow}>
          <Typography variant="label" color={Colors.textMuted} style={styles.itemLabel}>
            मुख्य लक्षण (Symptoms)
          </Typography>
          <View style={styles.symptomsList}>
            {interpretation.symptoms.map((sym, idx) => (
              <View key={idx} style={styles.symptomChip}>
                <Ionicons name="alert-circle-outline" size={14} color={Colors.accent} />
                <Typography variant="body" color={Colors.textPrimary} style={styles.symptomText}>
                  {sym}
                </Typography>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.divider} />

        {/* Item 4: Area / Department */}
        <View style={styles.itemRow}>
          <Typography variant="label" color={Colors.textMuted} style={styles.itemLabel}>
            विभाग (Category Area)
          </Typography>
          <Typography variant="bodyBold" color={Colors.primary}>
            {interpretation.category}
          </Typography>
        </View>

        <View style={styles.divider} />

        {/* Item 5: Region & Urgency */}
        <View style={styles.twoColRow}>
          <View style={styles.halfCol}>
            <Typography variant="label" color={Colors.textMuted} style={styles.itemLabel}>
              क्षेत्र (Region)
            </Typography>
            <Typography variant="bodyBold" color={Colors.textPrimary}>
              {interpretation.region}
            </Typography>
          </View>

          <View style={styles.halfCol}>
            <Typography variant="label" color={Colors.textMuted} style={styles.itemLabel}>
              प्राथमिकता (Urgency)
            </Typography>
            <Typography variant="bodyBold" color={Colors.accent}>
              {interpretation.urgency}
            </Typography>
          </View>
        </View>
      </View>

      {/* Human Scientist Verification Disclaimer */}
      <View style={styles.humanTrustNotice}>
        <Ionicons name="shield-checkmark" size={20} color={Colors.success} />
        <Typography variant="caption" color={Colors.success} style={styles.noticeText}>
          यह जानकारी सीधे आईसीएआर (ICAR) व कृषि विज्ञान केंद्र के वैज्ञानिकों को भेजी जाएगी।
        </Typography>
      </View>

      {/* Confirmation Actions */}
      <Typography variant="h3" align="center" color={Colors.textPrimary} style={styles.questionTitle}>
        क्या यह जानकारी सही है? (Is this correct?)
      </Typography>

      <View style={styles.actionsGroup}>
        <Button
          title="हाँ, कृषि विशेषज्ञ खोजें (Yes, Find Expert)"
          onPress={onConfirm}
          variant="primary"
          size="hero"
          icon={<Ionicons name="checkmark-circle" size={22} color={Colors.textInverse} />}
          style={styles.confirmBtn}
        />

        <Button
          title="सुधार करें (Edit Information)"
          onPress={onEdit}
          variant="outline"
          size="medium"
          icon={<Ionicons name="create-outline" size={18} color={Colors.primary} />}
          style={styles.editBtn}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.md,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryContainer,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
    marginBottom: Spacing.lg,
  },
  bannerTextCol: {
    marginLeft: Spacing.md,
    flex: 1,
  },
  reviewCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    marginBottom: Spacing.lg,
    ...Shadows.card,
  },
  itemRow: {
    marginVertical: 2,
  },
  itemLabel: {
    textTransform: 'uppercase',
    fontSize: 11,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  itemValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueText: {
    marginLeft: 6,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.cardBorder,
    marginVertical: Spacing.md,
  },
  symptomsList: {
    gap: Spacing.xs,
    marginTop: 2,
  },
  symptomChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.accentLight,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.md,
  },
  symptomText: {
    marginLeft: 6,
    fontSize: 14,
  },
  twoColRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfCol: {
    flex: 1,
  },
  humanTrustNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.successLight,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.xl,
  },
  noticeText: {
    marginLeft: Spacing.sm,
    flex: 1,
    lineHeight: 18,
    fontWeight: '600',
  },
  questionTitle: {
    marginBottom: Spacing.md,
  },
  actionsGroup: {
    gap: Spacing.md,
  },
  confirmBtn: {
    backgroundColor: Colors.primary,
  },
  editBtn: {
    borderColor: Colors.primary,
  },
});
