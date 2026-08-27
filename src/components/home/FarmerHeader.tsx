import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing } from '@/constants/theme';
import { useLanguage } from '@/context/LanguageContext';
import { Typography } from '../ui/Typography';
import { IconButton } from '../ui/IconButton';
import { Avatar } from '../ui/Avatar';
import { LanguageModal } from '../ui/LanguageModal';

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
  onNotificationPress,
  onProfilePress,
}) => {
  const { t, currentLanguageInfo } = useLanguage();
  const [langModalVisible, setLangModalVisible] = useState(false);

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

            {/* Language Selector Chip */}
            <TouchableOpacity
              style={styles.langChip}
              onPress={() => setLangModalVisible(true)}
              activeOpacity={0.8}
            >
              <Ionicons name="language" size={10} color={Colors.primaryDark} />
              <Typography variant="caption" color={Colors.primaryDark} style={styles.langText}>
                {currentLanguageInfo.nativeName}
              </Typography>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.rightActions}>
        <IconButton
          icon={<Ionicons name="notifications-outline" size={22} color={Colors.textOnPrimary} />}
          onPress={onNotificationPress}
          variant="ghost"
          accessibilityLabel="Notifications"
        />
      </View>

      {/* Language Modal */}
      <LanguageModal
        visible={langModalVisible}
        onClose={() => setLangModalVisible(false)}
      />
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
  langChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#A7F3D0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: Spacing.sm,
  },
  langText: {
    fontWeight: '700',
    fontSize: 10,
    marginLeft: 2,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
