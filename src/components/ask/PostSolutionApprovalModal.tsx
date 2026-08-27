import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, Spacing, Shadows } from '@/constants/theme';
import { VerifiedFarmerResolution } from '@/types';
import { Typography } from '../ui/Typography';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface PostSolutionApprovalModalProps {
  visible: boolean;
  cropName: string;
  expertName: string;
  onClose: () => void;
  onApproveResolution: (resolution: VerifiedFarmerResolution) => void;
}

export const PostSolutionApprovalModal: React.FC<PostSolutionApprovalModalProps> = ({
  visible,
  cropName,
  expertName,
  onClose,
  onApproveResolution,
}) => {
  const [recoveryDays, setRecoveryDays] = useState('4');
  const [feedbackNote, setFeedbackNote] = useState(
    'सलाह के अनुसार नीम तेल का स्प्रे करने पर 4 दिन में कपास के पत्तों का मुड़ना ठीक हो गया।'
  );
  const [isApproved, setIsApproved] = useState(true);

  const handleSubmit = () => {
    const resolution: VerifiedFarmerResolution = {
      id: `res_${Date.now()}`,
      caseTitle: `${cropName} Leaf Curling & Sap Pest Outbreak`,
      cropName,
      farmerName: 'Rameshwar Patel',
      village: 'Kalmeshwar',
      district: 'Nagpur',
      recoveryDays: `${recoveryDays} days`,
      farmerFeedback: feedbackNote,
      approvedAtDate: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      isFarmerApproved: isApproved,
      expertName,
    };

    onApproveResolution(resolution);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <TouchableOpacity activeOpacity={1} style={styles.modalCard}>
          <View style={styles.header}>
            <View style={styles.headerTitleRow}>
              <Ionicons name="checkmark-done-circle" size={28} color={Colors.success} />
              <Typography variant="h2" color={Colors.textPrimary} style={styles.title}>
                समाधान की पुष्टि करें (Confirm Resolution)
              </Typography>
            </View>

            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={Colors.textMuted} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollBody}>
            <Typography variant="body" color={Colors.textSecondary} style={styles.subTitle}>
              क्या <Typography variant="bodyBold" color={Colors.primaryDark}>{expertName}</Typography> की सलाह से आपकी {cropName} की समस्या हल हो गई है?
            </Typography>

            {/* Field 1: Days to recover */}
            <Input
              label="कितने दिनों में फसल में सुधार हुआ? (Recovery Days):"
              placeholder="उदा. 4 दिन"
              value={recoveryDays}
              onChangeText={setRecoveryDays}
              keyboardType="numeric"
            />

            {/* Field 2: Feedback Note */}
            <Input
              label="कृषि विशेषज्ञ के लिए आपकी टिप्पणी (Farmer Review Note):"
              placeholder="फसल में क्या सुधार हुआ लिखें..."
              value={feedbackNote}
              onChangeText={setFeedbackNote}
              multiline
              numberOfLines={3}
            />

            {/* Field 3: Proof of Work Approval Checkbox */}
            <TouchableOpacity
              style={styles.approvalCheckboxRow}
              onPress={() => setIsApproved(!isApproved)}
              activeOpacity={0.8}
            >
              <Ionicons
                name={isApproved ? 'checkbox' : 'square-outline'}
                size={24}
                color={isApproved ? Colors.primary : Colors.textMuted}
              />

              <View style={styles.checkboxTextCol}>
                <Typography variant="bodyBold" color={Colors.textPrimary}>
                  इस समाधान को विशेषज्ञ के सार्वजनिक पोर्टफोलियो में जोड़ें
                </Typography>
                <Typography variant="caption" color={Colors.textSecondary}>
                  (Approve adding this verified case to expert's public portfolio as Proof of Work)
                </Typography>
              </View>
            </TouchableOpacity>

            <Button
              title="समाधान स्वीकृत करें (Approve & Save Proof of Work)"
              onPress={handleSubmit}
              variant="primary"
              size="large"
              icon={<Ionicons name="shield-checkmark" size={20} color={Colors.textInverse} />}
              style={styles.submitBtn}
            />
          </ScrollView>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: Spacing.xl,
    maxHeight: '85%',
    ...Shadows.card,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: Spacing.xs,
  },
  scrollBody: {
    paddingBottom: Spacing.xl,
  },
  subTitle: {
    marginBottom: Spacing.lg,
    lineHeight: 20,
  },
  approvalCheckboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.primaryContainer,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginVertical: Spacing.md,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  checkboxTextCol: {
    marginLeft: Spacing.sm,
    flex: 1,
  },
  submitBtn: {
    marginTop: Spacing.md,
  },
});
