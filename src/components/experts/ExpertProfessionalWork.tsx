import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, Spacing } from '@/constants/theme';
import { AgriculturalExpert } from '@/types';
import { Typography } from '../ui/Typography';

interface ExpertProfessionalWorkProps {
  expert: AgriculturalExpert;
}

export const ExpertProfessionalWork: React.FC<ExpertProfessionalWorkProps> = ({ expert }) => {
  return (
    <View style={styles.card}>
      <Typography variant="label" color={Colors.textMuted} style={styles.sectionHeader}>
        पेशेवर कार्य व शोध (PROFESSIONAL WORK & RESEARCH)
      </Typography>

      {/* Publications */}
      {expert.publications && expert.publications.length > 0 ? (
        <View style={styles.group}>
          <View style={styles.groupTitleRow}>
            <Ionicons name="book-outline" size={18} color={Colors.primary} />
            <Typography variant="h3" color={Colors.textPrimary} style={styles.groupTitle}>
              शोध प्रकाशन व पुस्तकें (Publications)
            </Typography>
          </View>
          {expert.publications.map((pub, idx) => (
            <View key={idx} style={styles.itemRow}>
              <Ionicons name="document-text-outline" size={14} color={Colors.primary} style={styles.itemIcon} />
              <Typography variant="body" color={Colors.textPrimary} style={styles.itemText}>
                {pub}
              </Typography>
            </View>
          ))}
        </View>
      ) : null}

      {/* Field Projects */}
      {expert.fieldProjects && expert.fieldProjects.length > 0 ? (
        <View style={styles.group}>
          <View style={styles.groupTitleRow}>
            <Ionicons name="map-outline" size={18} color={Colors.primary} />
            <Typography variant="h3" color={Colors.textPrimary} style={styles.groupTitle}>
              मैदानी अनुसंधान परियोजनाएं (Field Projects)
            </Typography>
          </View>
          {expert.fieldProjects.map((proj, idx) => (
            <View key={idx} style={styles.itemRow}>
              <Ionicons name="flask-outline" size={14} color={Colors.accent} style={styles.itemIcon} />
              <Typography variant="body" color={Colors.textPrimary} style={styles.itemText}>
                {proj}
              </Typography>
            </View>
          ))}
        </View>
      ) : null}

      {/* Certifications & Endorsements */}
      {expert.certifications && expert.certifications.length > 0 ? (
        <View style={styles.group}>
          <View style={styles.groupTitleRow}>
            <Ionicons name="ribbon-outline" size={18} color={Colors.primary} />
            <Typography variant="h3" color={Colors.textPrimary} style={styles.groupTitle}>
              सरकारी प्रमाणन व संबद्धता (Certifications & Affiliations)
            </Typography>
          </View>
          {expert.certifications.concat(expert.endorsements || []).map((cert, idx) => (
            <View key={idx} style={styles.itemRow}>
              <Ionicons name="shield-checkmark-outline" size={14} color={Colors.success} style={styles.itemIcon} />
              <Typography variant="body" color={Colors.textPrimary} style={styles.itemText}>
                {cert}
              </Typography>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    marginBottom: Spacing.lg,
  },
  sectionHeader: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: Spacing.md,
  },
  group: {
    marginBottom: Spacing.md,
  },
  groupTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  groupTitle: {
    marginLeft: 6,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.surfaceSecondary,
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    marginTop: 4,
  },
  itemIcon: {
    marginTop: 2,
    marginRight: 6,
  },
  itemText: {
    flex: 1,
    lineHeight: 20,
  },
});
