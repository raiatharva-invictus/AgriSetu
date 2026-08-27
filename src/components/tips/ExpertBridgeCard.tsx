import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, Spacing, Shadows } from '@/constants/theme';
import { Typography } from '../ui/Typography';
import { Button } from '../ui/Button';

interface ExpertBridgeCardProps {
  onFindExpertPress: () => void;
}

export const ExpertBridgeCard: React.FC<ExpertBridgeCardProps> = ({
  onFindExpertPress,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.iconCircle}>
        <Ionicons name="people" size={32} color={Colors.textInverse} />
      </View>

      <Typography variant="h2" align="center" color={Colors.textOnPrimary} style={styles.title}>
        क्या आपको अभी भी सहायता चाहिए? (Still need help?)
      </Typography>

      <Typography
        variant="body"
        align="center"
        color="rgba(255, 255, 255, 0.9)"
        style={styles.subtitle}
      >
        फसल की गंभीर बीमारी या कीट प्रकोप के लिए ICAR व कृषि विज्ञान केंद्र के विशेषज्ञों से सीधा परामर्श लें।
      </Typography>

      <Button
        title="कृषि विशेषज्ञ से बात करें (Find an Expert)"
        onPress={onFindExpertPress}
        variant="accent"
        size="hero"
        icon={<Ionicons name="call" size={22} color={Colors.textInverse} />}
        style={styles.actionBtn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    alignItems: 'center',
    marginTop: Spacing.xl,
    marginBottom: Spacing.xxxl,
    ...Shadows.card,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  title: {
    marginBottom: Spacing.xs,
  },
  subtitle: {
    marginBottom: Spacing.lg,
    maxWidth: 300,
    lineHeight: 22,
  },
  actionBtn: {
    backgroundColor: Colors.accent,
    width: '100%',
  },
});
