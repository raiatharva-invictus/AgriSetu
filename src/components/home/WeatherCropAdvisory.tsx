import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, Spacing, Shadows } from '@/constants/theme';
import { WeatherAdvisory } from '@/types';
import { Typography } from '../ui/Typography';

interface WeatherCropAdvisoryProps {
  weather: WeatherAdvisory;
}

export const WeatherCropAdvisory: React.FC<WeatherCropAdvisoryProps> = ({
  weather,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.weatherHeader}>
          <View style={styles.tempGroup}>
            <Ionicons name="cloudy" size={32} color={Colors.primary} />
            <Typography variant="hero" color={Colors.primaryDark} style={styles.tempText}>
              {weather.temperatureCelsius}°C
            </Typography>
            <View style={styles.conditionCol}>
              <Typography variant="bodyBold" color={Colors.textPrimary}>
                {weather.condition}
              </Typography>
              <Typography variant="caption" color={Colors.textSecondary}>
                {weather.locationName}
              </Typography>
            </View>
          </View>

          <View style={styles.metricsGroup}>
            <View style={styles.metricItem}>
              <Ionicons name="water" size={14} color={Colors.info} />
              <Typography variant="caption" color={Colors.textSecondary} style={styles.metricLabel}>
                नमी (Humidity): {weather.humidityPercent}%
              </Typography>
            </View>
            <View style={styles.metricItem}>
              <Ionicons name="rainy" size={14} color={Colors.info} />
              <Typography variant="caption" color={Colors.textSecondary} style={styles.metricLabel}>
                बारिश (Rain): {weather.rainfallProbabilityPercent}%
              </Typography>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.advisoryBox}>
          <View style={styles.advisoryTitleRow}>
            <Ionicons name="alert-circle-outline" size={18} color={Colors.warning} />
            <Typography variant="label" color={Colors.warning} style={styles.advisoryTitle}>
              आज की खेत सलाह (Field Advisory Today)
            </Typography>
          </View>
          <Typography variant="bodyBold" color={Colors.textPrimary} style={styles.headline}>
            {weather.advisoryHeadline}
          </Typography>
          <Typography variant="body" color={Colors.textSecondary} style={styles.detail}>
            {weather.advisoryDetail}
          </Typography>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    ...Shadows.subtle,
  },
  weatherHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  tempGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tempText: {
    marginHorizontal: Spacing.sm,
  },
  conditionCol: {
    justifyContent: 'center',
  },
  metricsGroup: {
    gap: 4,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricLabel: {
    marginLeft: 4,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.cardBorder,
    marginVertical: Spacing.md,
  },
  advisoryBox: {
    backgroundColor: Colors.warningLight,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderLeftWidth: 4,
    borderLeftColor: Colors.warning,
  },
  advisoryTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  advisoryTitle: {
    marginLeft: 4,
    textTransform: 'uppercase',
  },
  headline: {
    marginBottom: 4,
  },
  detail: {
    fontSize: 13,
    lineHeight: 18,
  },
});
