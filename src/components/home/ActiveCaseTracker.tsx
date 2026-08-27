import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';
import { CropCase, VerifiedFarmerResolution } from '@/types';
import { CaseCard } from '../ui/CaseCard';
import { SectionHeader } from '../ui/SectionHeader';
import { Button } from '../ui/Button';
import { PostSolutionApprovalModal } from '../ask/PostSolutionApprovalModal';
import { Typography } from '../ui/Typography';

interface ActiveCaseTrackerProps {
  activeCase: CropCase | null;
  onCasePress: (cropCase: CropCase) => void;
  onViewAllPress: () => void;
}

export const ActiveCaseTracker: React.FC<ActiveCaseTrackerProps> = ({
  activeCase,
  onCasePress,
  onViewAllPress,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isResolved, setIsResolved] = useState(false);

  if (!activeCase) return null;

  const handleApproveResolution = (resolution: VerifiedFarmerResolution) => {
    setIsResolved(true);
    Alert.alert(
      'फसल समाधान स्वीकृत!',
      `धन्यवाद रामेश्वर जी! आपका प्रमाण (Proof of Work) ${resolution.expertName} के पोर्टफोलियो में सफलतापूर्वक जोड़ दिया गया है।`
    );
  };

  return (
    <View style={styles.container}>
      <SectionHeader
        title="आपकी सक्रिय समस्याएं (My Active Query)"
        subtitle="कृषि वैज्ञानिक द्वारा समीक्षा जारी"
        actionText="सभी देखें (View All)"
        onActionPress={onViewAllPress}
      />

      <CaseCard cropCase={activeCase} onPress={onCasePress} />

      {isResolved ? (
        <View style={styles.resolvedBadgeBox}>
          <Ionicons name="shield-checkmark" size={20} color={Colors.success} />
          <Typography variant="bodyBold" color={Colors.success} style={styles.resolvedText}>
            समाधान किसान द्वारा स्वीकृत व पोर्टफोलियो में संलग्न (Proof of Work Approved ✓)
          </Typography>
        </View>
      ) : (
        <Button
          title="समस्या हल हो गई? समाधान स्वीकृत करें (Approve Proof of Work)"
          onPress={() => setModalVisible(true)}
          variant="outline"
          size="medium"
          icon={<Ionicons name="checkmark-circle-outline" size={18} color={Colors.primary} />}
          style={styles.resolveBtn}
        />
      )}

      <PostSolutionApprovalModal
        visible={modalVisible}
        cropName={activeCase.cropName}
        expertName={activeCase.assignedExpertName || 'Dr. Suresh Deshmukh'}
        onClose={() => setModalVisible(false)}
        onApproveResolution={handleApproveResolution}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.md,
  },
  resolveBtn: {
    marginTop: Spacing.sm,
    borderColor: Colors.primary,
  },
  resolvedBadgeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceSecondary,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1.5,
    borderColor: Colors.success,
    marginTop: Spacing.sm,
  },
  resolvedText: {
    marginLeft: Spacing.xs,
    flex: 1,
    fontSize: 13,
  },
});
