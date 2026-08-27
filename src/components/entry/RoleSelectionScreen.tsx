import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Colors, Spacing } from '@/constants/theme';
import { useLanguage } from '@/context/LanguageContext';
import { UserRole } from '@/types';
import { OnboardingHeader } from '../common/OnboardingHeader';
import { RoleOption } from '../common/RoleOption';
import { PrimaryButton } from '../common/PrimaryButton';

interface RoleSelectionScreenProps {
  onRoleSelect: (role: UserRole) => void;
}

export const RoleSelectionScreen: React.FC<RoleSelectionScreenProps> = ({
  onRoleSelect,
}) => {
  const { t } = useLanguage();
  const [selectedRole, setSelectedRole] = useState<UserRole>('farmer');

  const handleContinue = () => {
    onRoleSelect(selectedRole);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <OnboardingHeader
          headline={t('howWillYouUseTitle')}
          supportingText="Select the experience tailored to your daily agricultural work."
        />

        <View style={styles.optionsGroup}>
          {/* Path A: Farmer */}
          <RoleOption
            title={t('farmerPathTitle')}
            subtitle={t('farmerPathSub')}
            iconName="leaf"
            selected={selectedRole === 'farmer'}
            onSelect={() => setSelectedRole('farmer')}
            accentColor={Colors.primary}
          />

          {/* Path B: Expert */}
          <RoleOption
            title={t('expertPathTitle')}
            subtitle={t('expertPathSub')}
            iconName="ribbon"
            selected={selectedRole === 'expert'}
            onSelect={() => setSelectedRole('expert')}
            accentColor={Colors.accent}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton
          title={t('continueBtn')}
          onPress={handleContinue}
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
