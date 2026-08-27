import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, Spacing, Shadows } from '@/constants/theme';
import { MandiRate } from '@/types';
import { Typography } from '../ui/Typography';
import { SectionHeader } from '../ui/SectionHeader';

interface MandiRatesOverviewProps {
  mandiRates: MandiRate[];
  onViewAllPress: () => void;
}

export const MandiRatesOverview: React.FC<MandiRatesOverviewProps> = ({
  mandiRates,
  onViewAllPress,
}) => {
  return (
    <View style={styles.container}>
      <SectionHeader
        title="मंडी आज का भाव (Mandi Rates Today)"
        subtitle="नागपुर व आस-पास की मंडियां"
        actionText="सभी देखें"
        onActionPress={onViewAllPress}
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
        {mandiRates.map((rate) => {
          const isUp = rate.priceChange >= 0;
          return (
            <View key={rate.id} style={styles.rateCard}>
              <View style={styles.topRow}>
                <Typography variant="bodyBold" color={Colors.textPrimary}>
                  {rate.commodity}
                </Typography>
                <View
                  style={[
                    styles.changeBadge,
                    { backgroundColor: isUp ? Colors.successLight : Colors.dangerLight },
                  ]}
                >
                  <Ionicons
                    name={isUp ? 'trending-up' : 'trending-down'}
                    size={14}
                    color={isUp ? Colors.success : Colors.danger}
                  />
                  <Typography
                    variant="caption"
                    color={isUp ? Colors.success : Colors.danger}
                    style={styles.changeText}
                  >
                    {isUp ? `+₹${rate.priceChange}` : `-₹${Math.abs(rate.priceChange)}`}
                  </Typography>
                </View>
              </View>

              <Typography variant="caption" color={Colors.textSecondary}>
                {rate.mandiName}
              </Typography>

              <View style={styles.priceRow}>
                <Typography variant="h1" color={Colors.primaryDark}>
                  ₹{rate.modalPrice.toLocaleString('en-IN')}
                </Typography>
                <Typography variant="caption" color={Colors.textMuted} style={styles.unitText}>
                  / {rate.unit}
                </Typography>
              </View>

              <Typography variant="caption" color={Colors.textMuted} style={styles.updateText}>
                {rate.lastUpdated}
              </Typography>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
  },
  scroll: {
    marginHorizontal: -Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  rateCard: {
    width: 220,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    marginRight: Spacing.md,
    ...Shadows.subtle,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  changeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  changeText: {
    fontWeight: '700',
    marginLeft: 2,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: Spacing.sm,
  },
  unitText: {
    marginLeft: 4,
  },
  updateText: {
    marginTop: Spacing.xs,
    fontSize: 11,
  },
});
