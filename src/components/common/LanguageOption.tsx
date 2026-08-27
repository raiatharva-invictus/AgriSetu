import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, Spacing, TouchTargets } from '@/constants/theme';
import { LanguageCode, LanguageInfo } from '@/locales';
import { Typography } from '../ui/Typography';

interface LanguageOptionProps {
  languageInfo: LanguageInfo;
  selected: boolean;
  onSelect: (code: LanguageCode) => void;
}

export const LanguageOption: React.FC<LanguageOptionProps> = ({
  languageInfo,
  selected,
  onSelect,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.tile,
        selected ? styles.selectedTile : styles.unselectedTile,
      ]}
      onPress={() => onSelect(languageInfo.code)}
      activeOpacity={0.8}
    >
      <View style={styles.textGroup}>
        <Typography
          variant="h2"
          color={selected ? Colors.textInverse : Colors.textPrimary}
          style={styles.nativeName}
        >
          {languageInfo.nativeName}
        </Typography>

        <Typography
          variant="caption"
          color={selected ? 'rgba(255, 255, 255, 0.85)' : Colors.textSecondary}
        >
          {languageInfo.name}
        </Typography>
      </View>

      <View style={styles.checkCol}>
        {selected && <Ionicons name="checkmark-circle" size={24} color={Colors.textInverse} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tile: {
    minHeight: TouchTargets.standard,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  selectedTile: {
    backgroundColor: Colors.primary,
  },
  unselectedTile: {
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
  },
  textGroup: {
    justifyContent: 'center',
  },
  nativeName: {
    fontSize: 20,
    marginBottom: 2,
  },
  checkCol: {
    width: 28,
    alignItems: 'flex-end',
  },
});
