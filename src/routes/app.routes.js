import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Feather from 'react-native-vector-icons/Feather';
import StackRoutes from './stack.routes';

const Tab = createBottomTabNavigator();

export default function AppRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={StackRoutes}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Feather name="home" color={color} size={size} />,
        }}
      />


    </Tab.Navigator>
  );
}
