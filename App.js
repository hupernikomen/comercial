import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import { AuthProvider } from './src/contexts/AuthContext';

export default function App() {

  const MyTheme = {
    colors: {
      background: '#f5f4f3',
      card: '#fff',
      text: '#333',
      border: 'rgb(199, 199, 204)',
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}
