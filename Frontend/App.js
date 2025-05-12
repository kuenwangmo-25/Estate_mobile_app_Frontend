import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './Navigation/AppNavigator';
import Toast from 'react-native-toast-message';
import Auth from './Context/store/Auth'; // ✅ import Auth provider
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase/app';
import * as Notifications from 'expo-notifications';

const firebaseConfig = require ('./assets/common/FCB.json')

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // Use default Firebase app if already initialized
}



const App = () => {
  useEffect(() => {
    // Requesting notification permissions
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === 'granted') {
        console.log('Notification permissions granted');
      } else {
        console.log('Notification permissions denied');
      }
    };

    requestPermissions();

    // Handling incoming notifications
    const notificationReceivedListener = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received in foreground:', notification);
      // You can handle the notification here, e.g., updating UI, logging, etc.
    });

    // Handling notification responses (user taps on notification)
    const notificationResponseListener = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification response:', response);
      // You can handle the action when the user interacts with the notification
    });

    // Clean up listeners when the component unmounts
    return () => {
      notificationReceivedListener.remove();
      notificationResponseListener.remove();
    };
  }, []);
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
