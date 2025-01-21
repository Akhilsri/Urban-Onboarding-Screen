import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen'; // Adjust the import path as needed
import OtpVerificationScreen from './OtpVerificationScreen';
import HomeScreen1 from './HomeScreen1';

const Stack = createStackNavigator();

const App = () => {
  return (
    
      <Stack.Navigator initialRouteName="HomeScreen1" >
        <Stack.Screen name="HomeScreen1" component={HomeScreen1} options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="OtpVerificationScreen" component={OtpVerificationScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
  
  );
};

export default App;
