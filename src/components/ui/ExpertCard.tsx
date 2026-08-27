import React from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, Spacing, Shadows } from '@/constants/theme';
import { AgriculturalExpert } from '@/types';
import { Typography } from './Typography';
import { Avatar } from './Avatar';
import { Button } from './Button';
import { Chip } from './Chip';

interface ExpertCardProps {
  expert: AgriculturalExpert;
  onCallPress: (expert: AgriculturalExpert) => void;
  onChatPress: (expert: AgriculturalExpert) => void;
  style?: StyleProp<ViewStyle>;
}

export const ExpertCard: React.FC<ExpertCardProps> = ({
  expert,
  onCallPress,
  onChatPress,
  style,
}) => {
  const getOrgTag = () => {
    switch (expert.organizationType) {
      case 'private_company':
        return { label: 'Private Agribusiness Specialist', color: '#1E40AF', bg: '#DBEAFE' };
      case 'independent_agronomist':
        return { label: 'Independent Soil Agronomist', color: '#065F46', bg: '#D1FAE5' };
      case 'icar_kvk':
      default:
        return { label: 'ICAR / KVK Certified Scientist', color: Colors.primaryDark, bg: Colors.primaryContainer };
    }
  };

  const orgTag = getOrgTag();

  return (
    <View style={[styles.card, style]}>
      {/* Top Organization Tag */}
      <View style={[styles.orgTag, { backgroundColor: orgTag.bg }]}>
        <Ionicons name="shield-checkmark" size={12} color={orgTag.color} />
        <Typography variant="caption" color={orgTag.color} style={styles.orgTagText}>
          {orgTag.label}
        </Typography>
      </View>

      <View style={styles.topRow}>
        <Avatar
          name={expert.name}
          imageUri={expert.avatarUrl}
          size={52}
          isOnline={expert.isOnline}
          showStatusDot={true}
        />

        <View style={styles.infoColumn}>
          <View style={styles.nameRow}>
            <Typography variant="h3" color={Colors.textPrimary} style={styles.nameText}>
              {expert.name}
            </Typography>

            {expert.verifiedResolutionsCount ? (
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark-circle" size={13} color={Colors.primary} />
                <Typography variant="caption" color={Colors.primaryDark} style={styles.verifiedBadgeText}>
                  {expert.verifiedResolutionsCount} Solved
                </Typography>
              </View>
            ) : null}
          </View>

          <Typography variant="label" color={Colors.primary}>
            {expert.designation}
          </Typography>
          <Typography variant="caption" color={Colors.textSecondary}>
            {expert.institution} • {expert.experienceYears}+ Yrs Exp
          </Typography>
        </View>
      </View>

      {/* Proof of Work Highlight Banner */}
      {expert.verifiedResolutions && expert.verifiedResolutions.length > 0 && (
        <View style={styles.proofBanner}>
          <Ionicons name="ribbon-outline" size={14} color={Colors.accentDark} />
          <Typography variant="caption" color={Colors.accentDark} style={styles.proofBannerText}>
            किसान द्वारा सत्यापित प्रमाण: "{expert.verifiedResolutions[0].farmerFeedback.slice(0, 55)}..."
          </Typography>
        </View>
      )}

      <View style={styles.specialtyContainer}>
        {expert.specialty.map((spec) => (
          <Chip key={spec} label={spec} selected={false} style={styles.specialtyChip} />
        ))}
      </View>

      <View style={styles.footerRow}>
        <View style={styles.feeBadge}>
          <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
          <Typography variant="label" color={Colors.success} style={styles.feeText}>
            {expert.feeText}
          </Typography>
        </View>

        <View style={styles.actionsGroup}>
          <Button
            title="Call"
            onPress={() => onCallPress(expert)}
            variant="outline"
            size="medium"
            fullWidth={false}
            icon={<Ionicons name="call" size={16} color={Colors.primary} />}
            style={styles.actionBtn}
          />
          <Button
            title="Ask"
            onPress={() => onChatPress(expert)}
            variant="primary"
            size="medium"
            fullWidth={false}
            icon={<Ionicons name="chatbubbles" size={16} color={Colors.textInverse} />}
            style={styles.actionBtn}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    marginBottom: Spacing.md,
    ...Shadows.subtle,
  },
  orgTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: BorderRadius.sm,
    alignSelf: 'flex-start',
    marginBottom: Spacing.xs,
  },
  orgTagText: {
    fontWeight: '700',
    marginLeft: 4,
    fontSize: 10,
  },
  topRow: {
    flexDirection: 'row',
  },
  infoColumn: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameText: {
    flex: 1,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryContainer,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  verifiedBadgeText: {
    fontWeight: '700',
    marginLeft: 3,
    fontSize: 10,
  },
  proofBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.accentLight,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.sm,
  },
  proofBannerText: {
    marginLeft: 6,
    flex: 1,
    fontSize: 11,
    fontStyle: 'italic',
  },
  specialtyContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
    marginVertical: Spacing.sm,
  },
  specialtyChip: {
    backgroundColor: Colors.surfaceSecondary,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.cardBorder,
  },
  feeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  feeText: {
    marginLeft: 4,
  },
  actionsGroup: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  actionBtn: {
    minWidth: 80,
    height: 44,
  },
});
