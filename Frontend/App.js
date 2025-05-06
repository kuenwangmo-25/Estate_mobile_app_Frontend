import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './Navigation/AppNavigator';
import Toast from 'react-native-toast-message';
import Auth from './Context/store/Auth'; // ✅ import Auth provider

const App = () => {
  return (
    <Auth> 
      <NavigationContainer>
        <AppNavigator />
        <Toast />
      </NavigationContainer>
    </Auth>
  );
};

export default App;
