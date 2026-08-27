import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, BorderRadius, Spacing, Shadows } from '@/constants/theme';
import { useRouter } from 'expo-router';

export const QuickActionsGrid: React.FC = () => {
  const router = useRouter();

  const actions = [
    {
      id: 'ask',
      title: 'Ask for Help',
      subtitle: 'Voice & Camera',
      icon: <Ionicons name="help-buoy" size={28} color="#FFFFFF" />,
      bg: Colors.primaryLight,
      route: '/ask-help',
    },
    {
      id: 'experts',
      title: 'Call Experts',
      subtitle: 'Agronomists & Soil',
      icon: <Ionicons name="people" size={28} color="#FFFFFF" />,
      bg: '#2563EB',
      route: '/experts',
    },
    {
      id: 'tips',
      title: 'Free Tips',
      subtitle: 'Soil & Crops',
      icon: <MaterialCommunityIcons name="sprout" size={28} color="#FFFFFF" />,
      bg: '#059669',
      route: '/tips',
    },
    {
      id: 'profile',
      title: 'My Profile',
      subtitle: 'Farm & Settings',
      icon: <Ionicons name="person" size={28} color="#FFFFFF" />,
      bg: '#7C3AED',
      route: '/profile',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Quick Services</Text>
      <View style={styles.grid}>
        {actions.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => router.push(item.route as any)}
            activeOpacity={0.8}
          >
            <View style={[styles.iconCircle, { backgroundColor: item.bg }]}>
              {item.icon}
            </View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    alignItems: 'center',
    ...Shadows.sm,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 2,
  },
});
