import React from 'react';
import { Link, Tabs } from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import CursesIcon from '@/constants/custom';
import HomeIcon from '@/constants/home';
import ShopIcon from '@/constants/shopIcon';
import UserIcon from '@/constants/userIcon';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarStyle: {
          backgroundColor: 'white', // Set the background color to white
          borderColor: '#fff'
        },
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="(home)/index"
        options={{
          tabBarIcon: ({ color }) => <HomeIcon width={28} height={28} fill={color} />,
          tabBarLabel: 'Home', // Hides the title
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="courses/index"
        options={{
          tabBarIcon: ({ color }) => <CursesIcon width={28} height={28} fill={color} />,
          tabBarLabel: 'Courses', // Hides the title
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="shop/index"
        options={{
          tabBarIcon: ({ color }) => <ShopIcon width={28} height={28} color={color} />,
          tabBarLabel: 'Shop', // Hides the title
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="account/index"
        options={{
          tabBarIcon: ({ color }) => <UserIcon width={28} height={28} color={color} />,
          tabBarLabel: 'Account', // Hides the title
          headerShown: false
        }}
      />
    </Tabs>
  );
}
