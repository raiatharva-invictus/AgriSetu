import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, Spacing } from '@/constants/theme';
import { Typography } from '../ui/Typography';
import { Chip } from '../ui/Chip';

interface ProgressiveDetailsSectionProps {
  selectedCrop: string;
  onCropChange: (crop: string) => void;
  location: string;
  onLocationChange: (loc: string) => void;
  urgency: 'Normal' | 'Urgent';
  onUrgencyChange: (urgency: 'Normal' | 'Urgent') => void;
}

export const ProgressiveDetailsSection: React.FC<ProgressiveDetailsSectionProps> = ({
  selectedCrop,
  onCropChange,
  location,
  onLocationChange,
  urgency,
  onUrgencyChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const cropOptions = [
    'Cotton (कपास)',
    'Soybean (सोयाबीन)',
    'Wheat (गेहूं)',
    'Gram (चना)',
    'Vegetables (सब्जियां)',
  ];

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.accordionHeader}
        onPress={() => setIsExpanded(!isExpanded)}
        activeOpacity={0.7}
      >
        <View style={styles.headerTitleRow}>
          <Ionicons name="options-outline" size={20} color={Colors.primary} />
          <Typography variant="bodyBold" color={Colors.textPrimary} style={styles.headerText}>
            अतिरिक्त विवरण (Optional Details): {selectedCrop} • {urgency}
          </Typography>
        </View>
        <Ionicons
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={Colors.primary}
        />
      </TouchableOpacity>

      {isExpanded ? (
        <View style={styles.expandedContent}>
          {/* Crop Selector */}
          <Typography variant="label" style={styles.fieldLabel}>
            फसल चुनें (Select Crop):
          </Typography>
          <View style={styles.chipsRow}>
            {cropOptions.map((crop) => (
              <Chip
                key={crop}
                label={crop}
                selected={selectedCrop === crop}
                onPress={() => onCropChange(crop)}
                style={styles.chipItem}
              />
            ))}
          </View>

          {/* Urgency Selector */}
          <Typography variant="label" style={styles.fieldLabel}>
            प्राथमिकता / आपातकाल (Urgency Level):
          </Typography>
          <View style={styles.urgencyRow}>
            <TouchableOpacity
              style={[
                styles.urgencyCard,
                urgency === 'Normal' && styles.urgencyNormalSelected,
              ]}
              onPress={() => onUrgencyChange('Normal')}
            >
              <Typography
                variant="bodyBold"
                color={urgency === 'Normal' ? Colors.textInverse : Colors.textPrimary}
              >
                सामान्य (Normal)
              </Typography>
              <Typography
                variant="caption"
                color={urgency === 'Normal' ? 'rgba(255, 255, 255, 0.85)' : Colors.textSecondary}
              >
                24 घंटे में जवाब
              </Typography>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.urgencyCard,
                urgency === 'Urgent' && styles.urgencyUrgentSelected,
              ]}
              onPress={() => onUrgencyChange('Urgent')}
            >
              <Typography
                variant="bodyBold"
                color={urgency === 'Urgent' ? Colors.textInverse : Colors.danger}
              >
                अति आवश्यक (Urgent)
              </Typography>
              <Typography
                variant="caption"
                color={urgency === 'Urgent' ? 'rgba(255, 255, 255, 0.85)' : Colors.textSecondary}
              >
                त्वरित वैज्ञानिक कॉल
              </Typography>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    marginBottom: Spacing.lg,
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerText: {
    marginLeft: Spacing.sm,
  },
  expandedContent: {
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.cardBorder,
  },
  fieldLabel: {
    marginBottom: Spacing.xs,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
    marginBottom: Spacing.md,
  },
  chipItem: {
    marginBottom: 4,
  },
  urgencyRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  urgencyCard: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    alignItems: 'center',
  },
  urgencyNormalSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  urgencyUrgentSelected: {
    backgroundColor: Colors.danger,
    borderColor: Colors.danger,
  },
});
