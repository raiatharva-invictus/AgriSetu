import React from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, Spacing, Shadows } from '@/constants/theme';
import { AgriculturalExpert } from '@/types';
import { Typography } from '../ui/Typography';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';

interface ExpertMatchCardProps {
  expert: AgriculturalExpert;
  onViewProfile: (expert: AgriculturalExpert) => void;
  onBookConsultation: (expert: AgriculturalExpert) => void;
  style?: StyleProp<ViewStyle>;
}

export const ExpertMatchCard: React.FC<ExpertMatchCardProps> = ({
  expert,
  onViewProfile,
  onBookConsultation,
  style,
}) => {
  const isTopMatch = expert.isTopMatch;

  return (
    <View
      style={[
        styles.card,
        isTopMatch ? styles.topMatchCard : styles.regularCard,
        style,
      ]}
    >
      {/* Top Match Subtle Priority Header */}
      {isTopMatch ? (
        <View style={styles.topMatchHeader}>
          <Ionicons name="sparkles" size={16} color={Colors.primary} />
          <Typography variant="label" color={Colors.primaryDark} style={styles.topMatchLabel}>
            सर्वश्रेष्ठ मेल (TOP RECOMMENDED MATCH)
          </Typography>
        </View>
      ) : null}

      <View style={styles.headerRow}>
        <Avatar
          name={expert.name}
          imageUri={expert.avatarUrl}
          size={56}
          isOnline={expert.isOnline}
          showStatusDot={true}
        />

        <View style={styles.mainInfo}>
          <View style={styles.titleRow}>
            <Typography variant="h3" color={Colors.textPrimary} style={styles.nameText}>
              {expert.name}
            </Typography>

            {expert.matchPercentage ? (
              <View style={styles.matchBadge}>
                <Ionicons name="leaf" size={12} color={Colors.primary} />
                <Typography variant="caption" color={Colors.primaryDark} style={styles.matchText}>
                  {expert.matchPercentage}% Match
                </Typography>
              </View>
            ) : null}
          </View>

          <Typography variant="label" color={Colors.primary}>
            {expert.designation}
          </Typography>

          <Typography variant="caption" color={Colors.textSecondary} style={styles.subInfo}>
            {expert.institution} • {expert.experienceYears}+ Yrs Exp
          </Typography>
        </View>
      </View>

      {/* Meta Indicators: Languages & Relevant Case Count */}
      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Ionicons name="briefcase-outline" size={14} color={Colors.textSecondary} />
          <Typography variant="caption" color={Colors.textSecondary} style={styles.metaText}>
            {expert.relevantCaseCount || expert.consultationsCompleted} similar cases solved
          </Typography>
        </View>

        <View style={styles.metaItem}>
          <Ionicons name="language-outline" size={14} color={Colors.textSecondary} />
          <Typography variant="caption" color={Colors.textSecondary} style={styles.metaText}>
            {expert.languages.join(', ')}
          </Typography>
        </View>
      </View>

      {/* CRITICAL SECTION: Why This Expert? Rationale Box */}
      {expert.whyThisExpert && expert.whyThisExpert.length > 0 ? (
        <View style={styles.whyBox}>
          <Typography variant="label" color={Colors.primaryDark} style={styles.whyHeader}>
            यह विशेषज्ञ क्यों उपयुक्त हैं? (Why this expert?)
          </Typography>

          {expert.whyThisExpert.map((point, index) => (
            <View key={index} style={styles.whyBulletRow}>
              <Ionicons name="checkmark-circle" size={14} color={Colors.primary} style={styles.bulletIcon} />
              <Typography variant="caption" color={Colors.textPrimary} style={styles.bulletText}>
                {point}
              </Typography>
            </View>
          ))}
        </View>
      ) : null}

      {/* Pricing & Consultation Status Bar */}
      <View style={styles.priceRow}>
        <View style={styles.feeGroup}>
          <Typography variant="caption" color={Colors.textMuted}>
            सलाह शुल्क (Consultation)
          </Typography>
          <Typography variant="bodyBold" color={Colors.success}>
            {expert.feeText}
          </Typography>
        </View>

        <View style={styles.availabilityGroup}>
          <View
            style={[
              styles.availabilityDot,
              { backgroundColor: expert.isOnline ? Colors.success : Colors.textMuted },
            ]}
          />
          <Typography
            variant="caption"
            color={expert.isOnline ? Colors.success : Colors.textMuted}
            style={styles.availabilityText}
          >
            {expert.isOnline ? 'उपलब्ध (Available Now)' : 'ऑफ़लाइन (Offline)'}
          </Typography>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsGroup}>
        <Button
          title="प्रोफाइल देखें (View Profile)"
          onPress={() => onViewProfile(expert)}
          variant="outline"
          size="medium"
          fullWidth={false}
          style={styles.profileBtn}
        />

        <Button
          title="बातचीत करें (Book Consultation)"
          onPress={() => onBookConsultation(expert)}
          variant={isTopMatch ? 'primary' : 'secondary'}
          size="medium"
          fullWidth={false}
          icon={<Ionicons name="chatbubbles" size={16} color={isTopMatch ? Colors.textInverse : Colors.primaryDark} />}
          style={styles.bookBtn}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadows.card,
  },
  regularCard: {
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
  },
  topMatchCard: {
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: Colors.surface,
  },
  topMatchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryContainer,
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.md,
    alignSelf: 'flex-start',
  },
  topMatchLabel: {
    marginLeft: 4,
    fontSize: 10,
    letterSpacing: 0.5,
  },
  headerRow: {
    flexDirection: 'row',
  },
  mainInfo: {
    marginLeft: Spacing.md,
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameText: {
    flex: 1,
  },
  matchBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryContainer,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primaryLight,
  },
  matchText: {
    fontWeight: '700',
    fontSize: 11,
    marginLeft: 3,
  },
  subInfo: {
    marginTop: 2,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    marginVertical: Spacing.md,
    paddingTop: Spacing.xs,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    marginLeft: 4,
  },
  whyBox: {
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
  whyHeader: {
    fontSize: 12,
    marginBottom: Spacing.xs,
  },
  whyBulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 4,
  },
  bulletIcon: {
    marginTop: 2,
    marginRight: 6,
  },
  bulletText: {
    flex: 1,
    lineHeight: 18,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.cardBorder,
    marginBottom: Spacing.md,
  },
  feeGroup: {
    justifyContent: 'center',
  },
  availabilityGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availabilityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  availabilityText: {
    fontWeight: '600',
  },
  actionsGroup: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  profileBtn: {
    flex: 1,
    height: 48,
  },
  bookBtn: {
    flex: 1.3,
    height: 48,
  },
});
