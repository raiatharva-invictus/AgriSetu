import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { Typography } from '@/components/ui/Typography';
import { Chip } from '@/components/ui/Chip';
import { Colors, Spacing } from '@/constants/theme';
import { mockSeasonalTips } from '@/data/mockData';
import { PracticalTipCard } from '@/components/tips/PracticalTipCard';
import { ExpertBridgeCard } from '@/components/tips/ExpertBridgeCard';

export default function TipsScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<'all' | 'crop' | 'pest' | 'soil' | 'water' | 'seasonal'>('all');

  const categories = [
    { key: 'all', label: 'सभी सलाह (All Tips)' },
    { key: 'pest', label: 'कीट व रोग (Pest & Disease)' },
    { key: 'crop', label: 'फसल (Crop Health)' },
    { key: 'soil', label: 'मृदा (Soil Health)' },
    { key: 'water', label: 'सिंचाई (Water & Irrigation)' },
  ];

  const filteredTips = mockSeasonalTips.filter((tip) => {
    if (activeCategory === 'all') return true;
    return tip.category === activeCategory;
  });

  return (
    <ScreenContainer scrollable={true}>
      {/* Top Banner Header */}
      <View style={styles.topHeader}>
        <Typography variant="hero" color="#FFFFFF">
          उपयोगी सलाह, आपके लिए निःशुल्क
        </Typography>
        <Typography variant="caption" color="#D1FAE5" style={styles.headerSubtitle}>
          Useful practical advice, free for you. Verified by ICAR & agricultural scientists.
        </Typography>
      </View>

      <View style={styles.content}>
        {/* Categories Bar */}
        <View style={styles.categoryBar}>
          {categories.map((cat) => (
            <Chip
              key={cat.key}
              label={cat.label}
              selected={activeCategory === cat.key}
              onPress={() => setActiveCategory(cat.key as any)}
              style={styles.categoryChip}
            />
          ))}
        </View>

        {/* Practical Scannable Tips List */}
        {filteredTips.map((tip) => (
          <PracticalTipCard
            key={tip.id}
            tip={tip}
            onPress={() => router.push('/ask-help')}
          />
        ))}

        {/* Natural Bridge: FREE KNOWLEDGE → HUMAN EXPERTISE */}
        <ExpertBridgeCard
          onFindExpertPress={() => router.push('/expert-match')}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  topHeader: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  headerSubtitle: {
    marginTop: 4,
  },
  content: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
  },
  categoryBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
    marginBottom: Spacing.lg,
  },
  categoryChip: {
    marginBottom: 4,
  },
});
