import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing } from '@/constants/theme';

interface HeaderBarProps {
  location?: string;
  farmerName?: string;
  onNotificationPress?: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  location = 'Nagpur, Maharashtra',
  farmerName = 'Ramesh Patel',
  onNotificationPress,
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.leftContainer}>
        <View style={styles.logoBadge}>
          <Ionicons name="leaf" size={20} color="#FFFFFF" />
        </View>
        <View>
          <Text style={styles.greetingText}>Namaste, {farmerName} 🙏</Text>
          <View style={styles.locationContainer}>
            <Ionicons name="location-sharp" size={14} color="#C8E6C9" />
            <Text style={styles.locationText}>{location}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.notificationButton}
        onPress={onNotificationPress}
        activeOpacity={0.7}
      >
        <Ionicons name="notifications-outline" size={22} color="#FFFFFF" />
        <View style={styles.notificationBadge} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  locationText: {
    fontSize: 13,
    color: '#C8E6C9',
    marginLeft: 4,
    fontWeight: '500',
  },
  notificationButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.accent,
  },
});
