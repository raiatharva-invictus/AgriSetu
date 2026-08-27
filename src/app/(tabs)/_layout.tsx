import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, BottomTabHeight } from '@/constants/theme';
import { Platform } from 'react-native';
import { useAuth } from '@/context/AuthContext';

export default function TabLayout() {
  const { hasCompletedOnboarding, userRole } = useAuth();

  // Hide bottom tabs during onboarding screens (Splash, Language, Role, Setup)
  const showTabs = hasCompletedOnboarding;
  const isExpert = userRole === 'expert';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: isExpert ? Colors.accent : Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle: showTabs
          ? {
              backgroundColor: Colors.surface,
              borderTopWidth: 1.5,
              borderTopColor: Colors.cardBorder,
              height: BottomTabHeight,
              paddingBottom: Platform.OS === 'ios' ? 26 : 10,
              paddingTop: 8,
              elevation: 8,
            }
          : { display: 'none' },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      {/* Tab 1: Home / Dashboard */}
      <Tabs.Screen
        name="index"
        options={{
          title: isExpert ? 'पोर्टल (Portal)' : 'मुख्य (Home)',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? (isExpert ? 'grid' : 'home') : (isExpert ? 'grid-outline' : 'home-outline')}
              size={22}
              color={color}
            />
          ),
        }}
      />

      {/* Tab 2: Cases */}
      <Tabs.Screen
        name="cases"
        options={{
          title: 'मामले (Cases)',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'folder-open' : 'folder-open-outline'}
              size={22}
              color={color}
            />
          ),
        }}
      />

      {/* Tab 3: Ask Help (Farmer) */}
      <Tabs.Screen
        name="ask-help"
        options={{
          title: 'पूछें (Ask)',
          href: isExpert ? null : '/ask-help',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'help-circle' : 'help-circle-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* Tab 4: Experts Roster */}
      <Tabs.Screen
        name="experts"
        options={{
          title: isExpert ? 'किसान (Farmers)' : 'विशेषज्ञ (Experts)',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'people' : 'people-outline'}
              size={22}
              color={color}
            />
          ),
        }}
      />

      {/* Tab 5: Tips (Farmer) */}
      <Tabs.Screen
        name="tips"
        options={{
          title: 'सलाह (Tips)',
          href: isExpert ? null : '/tips',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'sprout' : 'sprout-outline'}
              size={22}
              color={color}
            />
          ),
        }}
      />

      {/* Tab 6: Profile */}
      <Tabs.Screen
        name="profile"
        options={{
          title: isExpert ? 'मेरी प्रोफाइल' : 'प्रोफाइल',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={22}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
