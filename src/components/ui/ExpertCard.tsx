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
  return (
    <View style={[styles.card, style]}>
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
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={14} color="#D97706" />
              <Typography variant="caption" color="#92400E" style={styles.ratingText}>
                {expert.rating}
              </Typography>
            </View>
          </View>

          <Typography variant="label" color={Colors.primary}>
            {expert.designation}
          </Typography>
          <Typography variant="caption" color={Colors.textSecondary}>
            {expert.institution} • {expert.experienceYears}+ Yrs Exp
          </Typography>
        </View>
      </View>

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
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  ratingText: {
    fontWeight: '700',
    marginLeft: 2,
  },
  specialtyContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
    marginVertical: Spacing.md,
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
