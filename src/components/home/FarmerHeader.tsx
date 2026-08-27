import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing } from '@/constants/theme';
import { useLanguage } from '@/context/LanguageContext';
import { Typography } from '../ui/Typography';
import { Avatar } from '../ui/Avatar';
import { DemoResetButton } from '../common/DemoResetButton';

interface FarmerHeaderProps {
  farmerName: string;
  location: string;
  language?: string;
  onNotificationPress: () => void;
  onProfilePress: () => void;
}

export const FarmerHeader: React.FC<FarmerHeaderProps> = ({
  farmerName,
  location,
  onProfilePress,
}) => {
  const { t } = useLanguage();

  return (
    <View style={styles.header}>
      <View style={styles.leftRow}>
        <TouchableOpacity onPress={onProfilePress} activeOpacity={0.85}>
          <Avatar name={farmerName} size={46} isOnline={true} showStatusDot={false} />
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <Typography variant="h2" color={Colors.textOnPrimary}>
            {t('greeting')}, {farmerName.split(' ')[0]} 🙏
          </Typography>

          <View style={styles.locationRow}>
            <Ionicons name="location-sharp" size={14} color="#A7F3D0" />
            <Typography variant="caption" color="#D1FAE5" style={styles.locationText}>
              {location}
            </Typography>
          </View>
        </View>
      </View>

      <View style={styles.rightActions}>
        <DemoResetButton variant="dark" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textContainer: {
    marginLeft: Spacing.md,
    flex: 1,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  locationText: {
    marginLeft: 3,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
