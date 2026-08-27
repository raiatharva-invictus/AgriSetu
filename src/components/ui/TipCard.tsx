import React from 'react';
import { StyleSheet, View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, BorderRadius, Spacing, Shadows } from '@/constants/theme';
import { SeasonalTip } from '@/types';
import { Typography } from './Typography';
import { Chip } from './Chip';

interface TipCardProps {
  tip: SeasonalTip;
  onPress: (tip: SeasonalTip) => void;
  style?: StyleProp<ViewStyle>;
}

export const TipCard: React.FC<TipCardProps> = ({ tip, onPress, style }) => {
  const getCategoryIcon = () => {
    switch (tip.category) {
      case 'pest':
        return <MaterialCommunityIcons name="bug-outline" size={20} color={Colors.accent} />;
      case 'soil':
        return <MaterialCommunityIcons name="molecule" size={20} color={Colors.primary} />;
      case 'irrigation':
        return <Ionicons name="water-outline" size={20} color={Colors.info} />;
      case 'fertilizer':
        return <MaterialCommunityIcons name="sprout" size={20} color={Colors.success} />;
      default:
        return <Ionicons name="leaf-outline" size={20} color={Colors.primary} />;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.card, style]}
      onPress={() => onPress(tip)}
      activeOpacity={0.8}
    >
      <View style={styles.headerRow}>
        <View style={styles.categoryBadge}>
          {getCategoryIcon()}
          <Typography variant="label" color={Colors.textSecondary} style={styles.categoryText}>
            {tip.season} • {tip.cropName || 'General'}
          </Typography>
        </View>
        <Chip label={`${tip.readTimeMinutes} min read`} selected={false} />
      </View>

      {tip.regionalTitle && (
        <Typography variant="h3" color={Colors.primaryDark} style={styles.regionalTitle}>
          {tip.regionalTitle}
        </Typography>
      )}

      <Typography variant="bodyBold" color={Colors.textPrimary} style={styles.title}>
        {tip.title}
      </Typography>

      <Typography variant="body" color={Colors.textSecondary} numberOfLines={2} style={styles.summary}>
        {tip.summary}
      </Typography>

      <View style={styles.footerRow}>
        <Typography variant="caption" color={Colors.textMuted}>
          Source: {tip.authorName}
        </Typography>
        <View style={styles.readMore}>
          <Typography variant="label" color={Colors.primary}>
            Read Tip
          </Typography>
          <Ionicons name="chevron-forward" size={16} color={Colors.primary} />
        </View>
      </View>
    </TouchableOpacity>
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryText: {
    marginLeft: 6,
    textTransform: 'uppercase',
  },
  regionalTitle: {
    marginBottom: 2,
  },
  title: {
    marginBottom: Spacing.xs,
  },
  summary: {
    marginBottom: Spacing.md,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.cardBorder,
  },
  readMore: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
