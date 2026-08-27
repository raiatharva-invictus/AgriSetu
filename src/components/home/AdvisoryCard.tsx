import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, Spacing, Shadows } from '@/constants/theme';
import { Badge } from '@/components/ui/Badge';
import { useRouter } from 'expo-router';

export const AdvisoryCard: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Season Advisory</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/tips')}
        activeOpacity={0.85}
      >
        <View style={styles.badgeRow}>
          <Badge label="Pest Warning" variant="warning" />
          <Text style={styles.timeText}>Updated 2h ago</Text>
        </View>

        <Text style={styles.cardTitle}>
          Fall Armyworm Defense for Maize & Cotton Crops
        </Text>
        <Text style={styles.cardDescription}>
          Inspect young crop leaves early morning for yellowing. Apply Neem-based organic spray (5ml/L) to prevent initial pest infestation.
        </Text>

        <View style={styles.actionRow}>
          <Text style={styles.readMoreText}>Read step-by-step guide</Text>
          <Ionicons name="arrow-forward" size={16} color={Colors.primaryLight} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadows.sm,
    borderLeftWidth: 4,
    borderLeftColor: Colors.accent,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  timeText: {
    fontSize: 12,
    color: Colors.textLight,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  cardDescription: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 19,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  readMoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primaryLight,
    marginRight: 4,
  },
});
