import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme(); 

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint, 
        headerShown: false, 
        tabBarButton: HapticTab, 
        tabBarBackground: TabBarBackground, 
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute', 
            backgroundColor: Colors[colorScheme ?? 'light'].background, 
            borderTopWidth: 0,
          },
          android: {
            backgroundColor: Colors[colorScheme ?? 'light'].background, 
            elevation: 4,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Prendre Photo',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="camera" size={28} color={color} /> 
          ),
        }}
      />
      <Tabs.Screen
        name="ScanneQR"
        options={{
          title: 'Scanner QRcode',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="qrcode-scan" size={28} color={color} /> 
          ),
        }}
      />
    </Tabs>
  );
}
