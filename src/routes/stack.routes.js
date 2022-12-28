import React from 'react';


import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Edition from '../pages/Edition';
import Home from '../pages/Home';
import Data from '../pages/Data';
import AddProducts from '../pages/AddProducts';
import colors from '../services/colors';

const Stack = createNativeStackNavigator()

export default function StackRoutes() {
  return (
    <Stack.Navigator>

      
      <Stack.Screen 
      options={{
        
        title:'',
        headerShadowVisible:false,
        headerTintColor:'#fff',
      

      }}
      name='Home' component={Home} />

      <Stack.Screen options={{
        
        headerTitle: '',
        headerStyle: {
          backgroundColor: 'transparent',
        },
      }} name='Edition' component={Edition} />

      <Stack.Screen options={{
        headerTitle: '',
      }} name='Data' component={Data} />

      <Stack.Screen
        name="Add"
        component={AddProducts}
        options={{
          headerTitle: '',
          headerStyle: {
            backgroundColor: 'transparent',
          },
        }}
      />
    </Stack.Navigator>
  );
}