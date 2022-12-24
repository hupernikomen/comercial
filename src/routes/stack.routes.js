import React from 'react';

import {Text} from 'react-native'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Edition from '../pages/Edition';
import Home from '../pages/Home';
import Data from '../pages/Data';
import AddProducts from '../pages/AddProducts';

const Stack = createNativeStackNavigator()

export default function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name='Home' component={Home} />
      <Stack.Screen options={{
        
        headerTitle: '',
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: 'transparent',
        },
      }} name='Edition' component={Edition} />

      <Stack.Screen options={{
        headerTitle: '',
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: 'transparent',
        },
      }} name='Data' component={Data} />

      <Stack.Screen
        name="Add"
        component={AddProducts}
        options={{
          headerTitle: '',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: 'transparent',
          },
        }}
      />
    </Stack.Navigator>
  );
}