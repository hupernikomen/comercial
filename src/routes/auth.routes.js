import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../pages/Login';

const Stack = createNativeStackNavigator();

export default function AuthRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Login"
        component={Login}
      />
    </Stack.Navigator>
  );
}
