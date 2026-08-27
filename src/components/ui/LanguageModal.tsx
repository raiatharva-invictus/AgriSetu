import React from 'react';
import {
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, Spacing, Shadows, TouchTargets } from '@/constants/theme';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageCode } from '@/locales';
import { Typography } from './Typography';

interface LanguageModalProps {
  visible: boolean;
  onClose: () => void;
}

export const LanguageModal: React.FC<LanguageModalProps> = ({ visible, onClose }) => {
  const { language, setLanguage, supportedLanguages } = useLanguage();

  const handleSelectLanguage = (code: LanguageCode) => {
    setLanguage(code);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <Ionicons name="language" size={24} color={Colors.primary} />
              <Typography variant="h2" color={Colors.textPrimary} style={styles.title}>
                भाषा चुनें / Select Language
              </Typography>
            </View>

            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={24} color={Colors.textMuted} />
            </TouchableOpacity>
          </View>

          <Typography variant="body" color={Colors.textSecondary} style={styles.subtitle}>
            अपनी पसंदीदा क्षेत्रीय भाषा चुनें (Choose your regional language)
          </Typography>

          <View style={styles.langList}>
            {supportedLanguages.map((lang) => {
              const isSelected = language === lang.code;
              return (
                <TouchableOpacity
                  key={lang.code}
                  style={[
                    styles.langCard,
                    isSelected ? styles.selectedCard : styles.unselectedCard,
                  ]}
                  onPress={() => handleSelectLanguage(lang.code)}
                  activeOpacity={0.8}
                >
                  <View style={styles.langTextCol}>
                    <Typography
                      variant="h2"
                      color={isSelected ? Colors.textInverse : Colors.textPrimary}
                    >
                      {lang.nativeName}
                    </Typography>
                    <Typography
                      variant="caption"
                      color={isSelected ? 'rgba(255, 255, 255, 0.85)' : Colors.textSecondary}
                    >
                      {lang.name}
                    </Typography>
                  </View>

                  {isSelected && (
                    <Ionicons name="checkmark-circle" size={24} color={Colors.textInverse} />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    ...Shadows.card,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: Spacing.sm,
  },
  closeBtn: {
    padding: Spacing.xs,
  },
  subtitle: {
    marginTop: 4,
    marginBottom: Spacing.lg,
  },
  langList: {
    gap: Spacing.md,
  },
  langCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    minHeight: TouchTargets.large,
  },
  selectedCard: {
    backgroundColor: Colors.primary,
  },
  unselectedCard: {
    backgroundColor: Colors.surfaceSecondary,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
  },
  langTextCol: {
    justifyContent: 'center',
  },
});
