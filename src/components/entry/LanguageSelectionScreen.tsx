import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Colors, Spacing } from '@/constants/theme';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageCode } from '@/locales';
import { OnboardingHeader } from '../common/OnboardingHeader';
import { LanguageOption } from '../common/LanguageOption';
import { PrimaryButton } from '../common/PrimaryButton';

interface LanguageSelectionScreenProps {
  onContinue: () => void;
}

export const LanguageSelectionScreen: React.FC<LanguageSelectionScreenProps> = ({
  onContinue,
}) => {
  const { language, setLanguage, supportedLanguages, t } = useLanguage();

  const handleSelectLanguage = (code: LanguageCode) => {
    setLanguage(code);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <OnboardingHeader
          headline={t('chooseLanguageTitle')}
          supportingText={t('chooseLanguageSub')}
        />

        <View style={styles.optionsGroup}>
          {supportedLanguages.map((langInfo) => (
            <LanguageOption
              key={langInfo.code}
              languageInfo={langInfo}
              selected={language === langInfo.code}
              onSelect={handleSelectLanguage}
            />
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton
          title={t('continueBtn')}
          onPress={onContinue}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: Spacing.xl,
    paddingTop: Spacing.hero,
  },
  optionsGroup: {
    marginTop: Spacing.sm,
  },
  footer: {
    padding: Spacing.lg,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.cardBorder,
  },
});
