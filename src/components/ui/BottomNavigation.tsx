import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Colors, Spacing, BottomTabHeight } from '@/constants/theme';
import { Typography } from './Typography';

export interface TabItem {
  key: string;
  label: string;
  icon: (focused: boolean) => React.ReactNode;
}

interface BottomNavigationProps {
  tabs: TabItem[];
  activeTab: string;
  onTabPress: (key: string) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  tabs,
  activeTab,
  onTabPress,
}) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const focused = activeTab === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabButton}
            onPress={() => onTabPress(tab.key)}
            activeOpacity={0.7}
          >
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              {tab.icon(focused)}
            </View>
            <Typography
              variant="caption"
              color={focused ? Colors.primary : Colors.textMuted}
              style={[styles.label, focused && styles.activeLabel]}
            >
              {tab.label}
            </Typography>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: BottomTabHeight,
    backgroundColor: Colors.surface,
    borderTopWidth: 1.5,
    borderTopColor: Colors.cardBorder,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: Spacing.xs,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  iconContainer: {
    marginBottom: 2,
  },
  activeIconContainer: {
    transform: [{ scale: 1.1 }],
  },
  label: {
    fontSize: 12,
  },
  activeLabel: {
    fontWeight: '700',
  },
});
