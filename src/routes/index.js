import React, { useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

import { AuthContext } from '../contexts/AuthContext';

export default function Routes() {
  const { isAutenticator, loadingAuth } = useContext(AuthContext);

  // const signed = isAutenticator

  if (loadingAuth) {
    return <ActivityIndicator />;
  }

  return isAutenticator ? <AppRoutes /> : <AuthRoutes />;
}
