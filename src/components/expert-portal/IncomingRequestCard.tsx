import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, Spacing, Shadows } from '@/constants/theme';
import { ExpertConsultationRequest } from '@/types';
import { Typography } from '../ui/Typography';
import { Button } from '../ui/Button';

interface IncomingRequestCardProps {
  request: ExpertConsultationRequest;
  onAccept: (request: ExpertConsultationRequest) => void;
  onDecline: (request: ExpertConsultationRequest) => void;
}

export const IncomingRequestCard: React.FC<IncomingRequestCardProps> = ({
  request,
  onAccept,
  onDecline,
}) => {
  const isUrgent = request.urgency === 'Urgent';

  return (
    <View style={[styles.card, isUrgent && styles.urgentCard]}>
      {/* Top Meta Bar */}
      <View style={styles.headerRow}>
        <View style={styles.cropTag}>
          <Ionicons name="leaf" size={14} color={Colors.primary} />
          <Typography variant="label" color={Colors.primaryDark} style={styles.cropText}>
            {request.cropName}
          </Typography>
        </View>

        <View style={styles.timeTag}>
          <Ionicons name="time-outline" size={14} color={Colors.textSecondary} />
          <Typography variant="caption" color={Colors.textSecondary} style={styles.timeText}>
            {request.requestedTime}
          </Typography>
        </View>
      </View>

      {/* Problem Title & Farmer Details */}
      <Typography variant="h3" color={Colors.textPrimary} style={styles.title}>
        {request.problemTitle}
      </Typography>

      <Typography variant="caption" color={Colors.textSecondary} style={styles.farmerDetail}>
        Farmer: {request.farmerName} • Location: {request.location}
      </Typography>

      {/* Brief Description */}
      <Typography variant="body" color={Colors.textPrimary} style={styles.description}>
        {request.description}
      </Typography>

      {/* Attachments & Fee Badge */}
      <View style={styles.attachmentsRow}>
        <View style={styles.mediaBadges}>
          {request.hasVoiceNote && (
            <View style={styles.mediaTag}>
              <Ionicons name="mic" size={14} color={Colors.accent} />
              <Typography variant="caption" color={Colors.accent} style={styles.mediaText}>
                Voice Attached
              </Typography>
            </View>
          )}

          {request.hasPhoto && (
            <View style={styles.mediaTag}>
              <Ionicons name="camera" size={14} color={Colors.primary} />
              <Typography variant="caption" color={Colors.primary} style={styles.mediaText}>
                Leaf Photo
              </Typography>
            </View>
          )}
        </View>

        <Typography variant="label" color={Colors.success} style={styles.feeText}>
          {request.feeText}
        </Typography>
      </View>

      {/* Accept & Decline Action Buttons */}
      <View style={styles.actionsRow}>
        <Button
          title="अस्वीकार (Decline)"
          onPress={() => onDecline(request)}
          variant="outline"
          size="medium"
          fullWidth={false}
          style={styles.declineBtn}
        />

        <Button
          title="स्वीकार करें (Accept Request)"
          onPress={() => onAccept(request)}
          variant="primary"
          size="medium"
          fullWidth={false}
          icon={<Ionicons name="checkmark-circle" size={18} color={Colors.textInverse} />}
          style={styles.acceptBtn}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    marginBottom: Spacing.lg,
    ...Shadows.card,
  },
  urgentCard: {
    borderColor: Colors.danger,
    borderWidth: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  cropTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryContainer,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: BorderRadius.sm,
  },
  cropText: {
    marginLeft: 4,
  },
  timeTag: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    marginLeft: 4,
  },
  title: {
    marginTop: 2,
    marginBottom: 2,
  },
  farmerDetail: {
    marginBottom: Spacing.sm,
  },
  description: {
    marginBottom: Spacing.md,
    lineHeight: 20,
  },
  attachmentsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.cardBorder,
    marginBottom: Spacing.md,
  },
  mediaBadges: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  mediaTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceSecondary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  mediaText: {
    marginLeft: 4,
    fontWeight: '600',
  },
  feeText: {
    fontWeight: '700',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  declineBtn: {
    flex: 1,
    borderColor: Colors.danger,
  },
  acceptBtn: {
    flex: 1.6,
  },
});
