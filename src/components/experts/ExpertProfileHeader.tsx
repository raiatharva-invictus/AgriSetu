import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, Spacing } from '@/constants/theme';
import { AgriculturalExpert } from '@/types';
import { Typography } from '../ui/Typography';
import { Avatar } from '../ui/Avatar';
import { Chip } from '../ui/Chip';

interface ExpertProfileHeaderProps {
  expert: AgriculturalExpert;
}

export const ExpertProfileHeader: React.FC<ExpertProfileHeaderProps> = ({ expert }) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarRow}>
        <Avatar
          name={expert.name}
          imageUri={expert.avatarUrl}
          size={72}
          isOnline={expert.isOnline}
          showStatusDot={true}
        />

        <View style={styles.infoCol}>
          <View style={styles.verifyBadge}>
            <Ionicons name="checkmark-circle" size={16} color={Colors.primary} />
            <Typography variant="label" color={Colors.primaryDark} style={styles.verifyText}>
              प्रमाणित कृषि वैज्ञानिक (Verified Scientist)
            </Typography>
          </View>

          <Typography variant="h1" color={Colors.textPrimary} style={styles.nameText}>
            {expert.name}
          </Typography>

          <Typography variant="label" color={Colors.primary} style={styles.titleText}>
            {expert.designation}
          </Typography>

          <Typography variant="caption" color={Colors.textSecondary}>
            {expert.institution} • {expert.experienceYears}+ Yrs Research Exp
          </Typography>
        </View>
      </View>

      {/* Spoken Languages & Online Availability */}
      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Ionicons name="language-outline" size={16} color={Colors.textSecondary} />
          <Typography variant="body" color={Colors.textSecondary} style={styles.metaText}>
            Languages: {expert.languages.join(', ')}
          </Typography>
        </View>

        <View style={styles.metaItem}>
          <View
            style={[
              styles.onlineDot,
              { backgroundColor: expert.isOnline ? Colors.success : Colors.textMuted },
            ]}
          />
          <Typography
            variant="label"
            color={expert.isOnline ? Colors.success : Colors.textMuted}
          >
            {expert.isOnline ? 'आज उपलब्ध (Available Today)' : 'ऑफ़लाइन (Offline)'}
          </Typography>
        </View>
      </View>

      {/* Expertise Chips */}
      <Typography variant="label" color={Colors.textMuted} style={styles.sectionTitle}>
        विशेषज्ञता के क्षेत्र (Areas of Expertise):
      </Typography>
      <View style={styles.chipsRow}>
        {expert.specialty.map((spec) => (
          <Chip key={spec} label={spec} selected={false} style={styles.chipItem} />
        ))}
      </View>

      {/* Professional Bio */}
      {expert.aboutBio ? (
        <View style={styles.bioBox}>
          <Typography variant="label" color={Colors.primaryDark} style={styles.bioTitle}>
            परिचय व अनुसंधान (About & Research Focus):
          </Typography>
          <Typography variant="body" color={Colors.textPrimary} style={styles.bioText}>
            {expert.aboutBio}
          </Typography>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    marginBottom: Spacing.lg,
  },
  avatarRow: {
    flexDirection: 'row',
  },
  infoCol: {
    marginLeft: Spacing.md,
    flex: 1,
  },
  verifyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryContainer,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: BorderRadius.sm,
    alignSelf: 'flex-start',
    marginBottom: Spacing.xs,
  },
  verifyText: {
    fontSize: 11,
    marginLeft: 4,
  },
  nameText: {
    marginBottom: 2,
  },
  titleText: {
    marginBottom: 2,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: Spacing.md,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.cardBorder,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    marginLeft: 4,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  sectionTitle: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: Spacing.xs,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
    marginBottom: Spacing.md,
  },
  chipItem: {
    backgroundColor: Colors.surfaceSecondary,
  },
  bioBox: {
    backgroundColor: Colors.surfaceSecondary,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
  bioTitle: {
    marginBottom: 4,
  },
  bioText: {
    lineHeight: 22,
  },
});
