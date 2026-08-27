import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, Spacing, Shadows } from '@/constants/theme';
import { Badge } from '@/components/ui/Badge';

export const MandiPricesWidget: React.FC = () => {
  const mandiRates = [
    {
      id: '1',
      crop: 'Wheat (गेहूं)',
      mandi: 'Nagpur Mandi',
      price: '₹2,450',
      unit: '/ quintal',
      change: '+₹40',
      isUp: true,
    },
    {
      id: '2',
      crop: 'Soybean (सोयाबीन)',
      mandi: 'Latur Mandi',
      price: '₹4,820',
      unit: '/ quintal',
      change: '-₹15',
      isUp: false,
    },
    {
      id: '3',
      crop: 'Cotton (कपास)',
      mandi: 'Amravati Mandi',
      price: '₹7,150',
      unit: '/ quintal',
      change: '+₹110',
      isUp: true,
    },
    {
      id: '4',
      crop: 'Paddy Rice (धान)',
      mandi: 'Bhandara Mandi',
      price: '₹2,180',
      unit: '/ quintal',
      change: '+₹25',
      isUp: true,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.titleGroup}>
          <Ionicons name="trending-up-outline" size={22} color={Colors.primaryLight} />
          <Text style={styles.sectionTitle}>Today's Mandi Rates</Text>
        </View>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.seeAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {mandiRates.map((item) => (
          <View key={item.id} style={styles.rateCard}>
            <View style={styles.topCardRow}>
              <Text style={styles.cropName}>{item.crop}</Text>
              <Badge
                label={item.change}
                variant={item.isUp ? 'success' : 'danger'}
              />
            </View>
            <Text style={styles.mandiName}>{item.mandi}</Text>

            <View style={styles.priceRow}>
              <Text style={styles.priceValue}>{item.price}</Text>
              <Text style={styles.unitText}>{item.unit}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.xl,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginLeft: Spacing.xs,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primaryLight,
  },
  scrollContainer: {
    paddingLeft: Spacing.lg,
    paddingRight: Spacing.md,
  },
  rateCard: {
    width: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginRight: Spacing.md,
    ...Shadows.sm,
  },
  topCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cropName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    flex: 1,
    marginRight: Spacing.xs,
  },
  mandiName: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: Spacing.md,
  },
  priceValue: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.primaryDark,
  },
  unitText: {
    fontSize: 12,
    color: Colors.textLight,
    marginLeft: 4,
  },
});
