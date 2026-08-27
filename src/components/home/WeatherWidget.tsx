import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, Spacing, Shadows } from '@/constants/theme';
import { Card } from '@/components/ui/Card';

export const WeatherWidget: React.FC = () => {
  return (
    <Card style={styles.card} variant="elevated">
      <View style={styles.topRow}>
        <View style={styles.tempSection}>
          <Ionicons name="sunny" size={36} color={Colors.accent} />
          <View style={styles.tempTextGroup}>
            <Text style={styles.temperature}>31°C</Text>
            <Text style={styles.condition}>Sunny & Clear</Text>
          </View>
        </View>

        <View style={styles.statsColumn}>
          <View style={styles.statRow}>
            <Ionicons name="water-outline" size={14} color={Colors.info} />
            <Text style={styles.statText}>Humidity: 62%</Text>
          </View>
          <View style={styles.statRow}>
            <Ionicons name="cloud-download-outline" size={14} color={Colors.info} />
            <Text style={styles.statText}>Rain: 10%</Text>
          </View>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.advisoryBanner}>
        <Ionicons name="information-circle" size={18} color={Colors.primaryDark} />
        <Text style={styles.advisoryText}>
          Good condition for watering Wheat & Soybeans today evening.
        </Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    marginTop: -Spacing.md,
    marginHorizontal: Spacing.lg,
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
    ...Shadows.md,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tempSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tempTextGroup: {
    marginLeft: Spacing.md,
  },
  temperature: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  condition: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  statsColumn: {
    alignItems: 'flex-end',
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  statText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 4,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.md,
  },
  advisoryBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceTint,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  advisoryText: {
    flex: 1,
    fontSize: 13,
    color: Colors.primaryDark,
    fontWeight: '600',
    marginLeft: Spacing.sm,
  },
});
