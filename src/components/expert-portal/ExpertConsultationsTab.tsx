import React from 'react';
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, Spacing, Shadows } from '@/constants/theme';
import { mockOngoingConsultations } from '@/data/mockData';
import { Typography } from '../ui/Typography';
import { SectionHeader } from '../ui/SectionHeader';

export const ExpertConsultationsTab: React.FC = () => {
  const handleCall = (farmerName: string, phone: string) => {
    Alert.alert('Call Farmer', `Initiating direct voice call to ${farmerName} (${phone})...`);
  };

  const handleMessage = (farmerName: string) => {
    Alert.alert('Message Farmer', `Opening advice chat with ${farmerName}...`);
  };

  return (
    <View style={styles.container}>
      <SectionHeader
        title="सक्रिय परामर्श व निर्धारित कॉल (Active Consultations)"
        subtitle="किसानों के साथ अनुसूचित बातचीत व स्थिति"
      />

      {mockOngoingConsultations.map((item) => (
        <View key={item.id} style={styles.card}>
          <View style={styles.headerRow}>
            <View style={styles.farmerBadge}>
              <Ionicons name="person" size={16} color={Colors.primary} />
              <Typography variant="bodyBold" color={Colors.textPrimary} style={styles.farmerName}>
                {item.farmerName}
              </Typography>
            </View>

            <View style={styles.statusPill}>
              <Typography variant="caption" color={Colors.primaryDark} style={styles.statusText}>
                {item.status}
              </Typography>
            </View>
          </View>

          <Typography variant="caption" color={Colors.textMuted} style={styles.locationText}>
            📍 {item.location} • {item.cropName}
          </Typography>

          <Typography variant="h3" color={Colors.textPrimary} style={styles.problemTitle}>
            {item.problemTitle}
          </Typography>

          <View style={styles.stageBox}>
            <Ionicons name="time-outline" size={16} color={Colors.harvestAmber} />
            <Typography variant="caption" color={Colors.harvestAmber} style={styles.stageText}>
              {item.stage} ({item.time})
            </Typography>
          </View>

          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={styles.callBtn}
              onPress={() => handleCall(item.farmerName, item.phone)}
              activeOpacity={0.85}
            >
              <Ionicons name="call" size={16} color={Colors.textOnPrimary} />
              <Typography variant="bodyBold" color={Colors.textOnPrimary} style={styles.btnText}>
                Call Farmer
              </Typography>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.msgBtn}
              onPress={() => handleMessage(item.farmerName)}
              activeOpacity={0.8}
            >
              <Ionicons name="chatbubble-ellipses" size={16} color={Colors.primary} />
              <Typography variant="bodyBold" color={Colors.primary} style={styles.btnText}>
                Message
              </Typography>
            </TouchableOpacity>
          </View>
        </View>
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  farmerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  farmerName: {
    marginLeft: 6,
    fontSize: 16,
  },
  statusPill: {
    backgroundColor: Colors.primaryContainer,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: BorderRadius.sm,
  },
  statusText: {
    fontWeight: '700',
    fontSize: 11,
  },
  locationText: {
    marginBottom: Spacing.xs,
  },
  problemTitle: {
    marginBottom: Spacing.sm,
    fontSize: 16,
  },
  stageBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.harvestAmberLight,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
  },
  stageText: {
    marginLeft: 6,
    fontWeight: '600',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  callBtn: {
    flex: 1,
    height: 44,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  msgBtn: {
    flex: 1,
    height: 44,
    backgroundColor: Colors.surfaceSecondary,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    borderRadius: BorderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    marginLeft: 6,
    fontSize: 14,
  },
});
