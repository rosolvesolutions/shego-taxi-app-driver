// client/app/(tabs)/_layout.tsx
import React from 'react';
import { createBottomTabNavigator, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import type { RouteProp } from '@react-navigation/native';
import type { ParamListBase } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function TabsLayout() {
  return (
    <Tab.Navigator
      screenOptions={({
        route,
      }: {
        route: RouteProp<ParamListBase, string>;
      }): BottomTabNavigationOptions => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: '#fff' },
        tabBarIcon: ({
          color,
          size,
        }: {
          color: string;
          size: number;
        }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'home') iconName = 'home';
          else if (route.name === 'trips') iconName = 'car';
          else if (route.name === 'wallet') iconName = 'wallet';
          else if (route.name === 'profile') iconName = 'person';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#9E2A45',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="home" getComponent={() => require('../homepage').default} />
      <Tab.Screen name="trips" getComponent={() => require('../driver-trips').default} />
      <Tab.Screen name="wallet" getComponent={() => require('../driver-wallet').default} />
      <Tab.Screen name="profile" getComponent={() => require('../driver-profile').default} />
    </Tab.Navigator>
  );
}
