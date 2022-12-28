import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ico from 'react-native-vector-icons/Feather';
import StackRoutes from './stack.routes';
import colors from '../services/colors';

import Config from '../pages/Config';
const Tab = createBottomTabNavigator();

export default function AppRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor:colors.util.gold,
        tabBarStyle: {
          backgroundColor: colors.app.base
        }
      }}
    >
      <Tab.Screen

        name="HomeStack"
        component={StackRoutes}
        options={{
          headerShown: false,
          headerShadowVisible: false,
          tabBarIcon: ({ color, size }) => <Ico name="home" color={color} size={size}
          />,
        }}
      />

      <Tab.Screen

        name="Config"
        component={Config}
        options={{
          headerShown: false,
          headerShadowVisible: false,
          tabBarIcon: ({ color, size }) => <Ico name="settings" color={color} size={size}
          />,
        }}
      />


    </Tab.Navigator>
  );
}
