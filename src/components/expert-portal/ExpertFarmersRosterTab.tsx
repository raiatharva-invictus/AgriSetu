import React from 'react';
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, Spacing, Shadows } from '@/constants/theme';
import { mockAssignedFarmers } from '@/data/mockData';
import { Typography } from '../ui/Typography';
import { SectionHeader } from '../ui/SectionHeader';

export const ExpertFarmersRosterTab: React.FC = () => {
  const handleFarmerPress = (farmerName: string) => {
    Alert.alert('Farmer Profile & History', `Showing full case history and proof-of-work records for ${farmerName}.`);
  };

  return (
    <View style={styles.container}>
      <SectionHeader
        title="संबद्ध किसान सूची (Farmers Roster)"
        subtitle="आपके द्वारा सहायता दिए गए किसानों का विवरण"
      />

      {mockAssignedFarmers.map((farmer) => (
        <TouchableOpacity
          key={farmer.id}
          style={styles.card}
          onPress={() => handleFarmerPress(farmer.name)}
          activeOpacity={0.88}
        >
          <View style={styles.topRow}>
            <View style={styles.avatarCircle}>
              <Ionicons name="person" size={20} color={Colors.textOnPrimary} />
            </View>

            <View style={styles.infoCol}>
              <Typography variant="h3" color={Colors.textPrimary}>
                {farmer.name}
              </Typography>
              <Typography variant="caption" color={Colors.textMuted}>
                📍 {farmer.village}, {farmer.district}
              </Typography>
            </View>

            <View style={styles.casesBadge}>
              <Typography variant="caption" color={Colors.primaryDark} style={styles.casesText}>
                {farmer.casesHelped} cases solved
              </Typography>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailsRow}>
            <View style={styles.detailCol}>
              <Typography variant="label" color={Colors.textMuted}>
                CROPS GROWN
              </Typography>
              <Typography variant="caption" color={Colors.textPrimary} style={styles.detailVal}>
                {farmer.crops.join(', ')}
              </Typography>
            </View>

            <View style={styles.detailColRight}>
              <Typography variant="label" color={Colors.textMuted}>
                STATUS
              </Typography>
              <Typography variant="caption" color={Colors.success} style={styles.statusVal}>
                ✓ {farmer.status}
              </Typography>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    ...Shadows.card,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  infoCol: {
    flex: 1,
  },
  casesBadge: {
    backgroundColor: Colors.primaryContainer,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  casesText: {
    fontWeight: '700',
    fontSize: 11,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.cardBorder,
    marginVertical: Spacing.md,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailCol: {
    flex: 1,
  },
  detailColRight: {
    alignItems: 'flex-end',
  },
  detailVal: {
    fontWeight: '600',
    marginTop: 2,
  },
  statusVal: {
    fontWeight: '700',
    marginTop: 2,
  },
});
