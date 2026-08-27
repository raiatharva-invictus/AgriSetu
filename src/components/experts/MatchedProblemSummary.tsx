import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, Spacing } from '@/constants/theme';
import { Typography } from '../ui/Typography';

interface MatchedProblemSummaryProps {
  cropName: string;
  symptomSummary: string;
  location: string;
}

export const MatchedProblemSummary: React.FC<MatchedProblemSummaryProps> = ({
  cropName,
  symptomSummary,
  location,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.recapTag}>
          <Ionicons name="document-text-outline" size={14} color={Colors.primaryDark} />
          <Typography variant="caption" color={Colors.primaryDark} style={styles.recapTagText}>
            आपकी समस्या (SUBMITTED QUERY RECAP)
          </Typography>
        </View>
      </View>

      <View style={styles.detailsRow}>
        <View style={styles.detailItem}>
          <Typography variant="caption" color={Colors.textMuted}>
            फसल (Crop)
          </Typography>
          <Typography variant="bodyBold" color={Colors.primary}>
            {cropName}
          </Typography>
        </View>

        <View style={styles.verticalDivider} />

        <View style={[styles.detailItem, { flex: 2 }]}>
          <Typography variant="caption" color={Colors.textMuted}>
            लक्षण (Noticed Issue)
          </Typography>
          <Typography variant="bodyBold" color={Colors.textPrimary} numberOfLines={1}>
            {symptomSummary}
          </Typography>
        </View>

        <View style={styles.verticalDivider} />

        <View style={styles.detailItem}>
          <Typography variant="caption" color={Colors.textMuted}>
            स्थान (Location)
          </Typography>
          <Typography variant="bodyBold" color={Colors.textSecondary} numberOfLines={1}>
            {location}
          </Typography>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.primaryContainer,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    marginBottom: Spacing.lg,
  },
  headerRow: {
    marginBottom: Spacing.xs,
  },
  recapTag: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recapTagText: {
    fontWeight: '700',
    fontSize: 10,
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailItem: {
    flex: 1,
  },
  verticalDivider: {
    width: 1,
    height: 24,
    backgroundColor: Colors.cardBorder,
    marginHorizontal: Spacing.xs,
  },
});
