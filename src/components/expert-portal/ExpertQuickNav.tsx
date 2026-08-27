import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, Spacing } from '@/constants/theme';
import { Typography } from '../ui/Typography';

export type ExpertNavTab = 'requests' | 'cases' | 'consultations' | 'farmers' | 'profile';

interface ExpertQuickNavProps {
  activeTab: ExpertNavTab;
  onTabChange: (tab: ExpertNavTab) => void;
}

export const ExpertQuickNav: React.FC<ExpertQuickNavProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs: { key: ExpertNavTab; label: string; iconName: keyof typeof Ionicons.glyphMap }[] = [
    { key: 'requests', label: 'अनुरोध (Requests)', iconName: 'mail-unread-outline' },
    { key: 'cases', label: 'मामले (Cases)', iconName: 'folder-open-outline' },
    { key: 'consultations', label: 'परामर्श व कॉल', iconName: 'call-outline' },
    { key: 'farmers', label: 'किसान सूची', iconName: 'people-outline' },
    { key: 'profile', label: 'प्रोफाइल व प्रमाण', iconName: 'person-circle-outline' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isSelected = activeTab === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={[styles.navBtn, isSelected && styles.selectedNavBtn]}
            onPress={() => onTabChange(tab.key)}
            activeOpacity={0.8}
          >
            <Ionicons
              name={tab.iconName}
              size={18}
              color={isSelected ? Colors.textInverse : Colors.textPrimary}
            />
            <Typography
              variant="label"
              color={isSelected ? Colors.textInverse : Colors.textPrimary}
              style={styles.label}
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
    flexWrap: 'wrap',
    gap: Spacing.xs,
    marginBottom: Spacing.lg,
  },
  navBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.xs,
  },
  selectedNavBtn: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  label: {
    marginLeft: 6,
  },
});
