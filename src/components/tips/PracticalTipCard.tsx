import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, Spacing, Shadows } from '@/constants/theme';
import { SeasonalTip } from '@/types';
import { Typography } from '../ui/Typography';
import { Chip } from '../ui/Chip';

interface PracticalTipCardProps {
  tip: SeasonalTip;
  onPress: (tip: SeasonalTip) => void;
  style?: StyleProp<ViewStyle>;
}

export const PracticalTipCard: React.FC<PracticalTipCardProps> = ({ tip, onPress, style }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View style={[styles.card, style]}>
      {/* Category & Read Time Bar */}
      <View style={styles.topBar}>
        <View style={styles.categoryBadge}>
          <Ionicons name="sparkles" size={14} color={Colors.primary} />
          <Typography variant="caption" color={Colors.primaryDark} style={styles.categoryText}>
            {tip.season} • {tip.cropName || 'General Crop'}
          </Typography>
        </View>
        <Chip label={`${tip.readTimeMinutes} min read`} selected={false} />
      </View>

      {/* Regional Hindi Title */}
      {tip.regionalTitle && (
        <Typography variant="h2" color={Colors.primaryDark} style={styles.regionalTitle}>
          {tip.regionalTitle}
        </Typography>
      )}

      {/* Main Practical English Title */}
      <Typography variant="h3" color={Colors.textPrimary} style={styles.title}>
        {tip.title}
      </Typography>

      <Typography variant="body" color={Colors.textSecondary} style={styles.summary}>
        {tip.summary}
      </Typography>

      {/* Quick 30-Second Checkpoints List */}
      {tip.checkpoints && tip.checkpoints.length > 0 ? (
        <View style={styles.checkpointsBox}>
          <Typography variant="label" color={Colors.primaryDark} style={styles.checkHeader}>
            त्वरित जांच सूची (30-Second Checkpoints):
          </Typography>

          {tip.checkpoints.map((point, index) => (
            <View key={index} style={styles.checkItemRow}>
              <Ionicons name="checkbox-outline" size={16} color={Colors.primary} style={styles.checkIcon} />
              <Typography variant="body" color={Colors.textPrimary} style={styles.checkText}>
                {point}
              </Typography>
            </View>
          ))}
        </View>
      ) : null}

      {/* Expand / Detailed Note */}
      {isExpanded ? (
        <View style={styles.expandedDetail}>
          <Typography variant="body" color={Colors.textSecondary} style={styles.detailText}>
            {tip.detailText}
          </Typography>
          <Typography variant="caption" color={Colors.textMuted} style={styles.authorTag}>
            Source: {tip.authorName} • Updated {tip.publishedDate}
          </Typography>
        </View>
      ) : null}

      <View style={styles.cardFooter}>
        <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)} style={styles.readMoreBtn}>
          <Typography variant="label" color={Colors.primary}>
            {isExpanded ? 'कम दिखाएं (Show Less)' : 'पूरा विवरण (Read Full Guide)'}
          </Typography>
          <Ionicons name={isExpanded ? 'chevron-up' : 'chevron-down'} size={16} color={Colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    marginBottom: Spacing.lg,
    ...Shadows.card,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryContainer,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: BorderRadius.sm,
  },
  categoryText: {
    fontWeight: '700',
    fontSize: 11,
    marginLeft: 4,
  },
  regionalTitle: {
    marginTop: 4,
    marginBottom: 2,
  },
  title: {
    marginBottom: Spacing.xs,
  },
  summary: {
    marginBottom: Spacing.md,
    lineHeight: 22,
  },
  checkpointsBox: {
    backgroundColor: Colors.surfaceSecondary,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
    marginBottom: Spacing.md,
  },
  checkHeader: {
    fontSize: 12,
    marginBottom: Spacing.xs,
  },
  checkItemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 4,
  },
  checkIcon: {
    marginTop: 2,
    marginRight: 6,
  },
  checkText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  expandedDetail: {
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.cardBorder,
    marginBottom: Spacing.sm,
  },
  detailText: {
    lineHeight: 22,
    marginBottom: Spacing.xs,
  },
  authorTag: {
    fontStyle: 'italic',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: Spacing.xs,
  },
  readMoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
