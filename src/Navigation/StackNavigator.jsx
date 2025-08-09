import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View, Text } from 'react-native';
import LoginScreen from '../Screens/LoginScreen';
import TabNavigator from './TabNavigator';
import SplashScreen from '../Screens/SplashScreen';

const Stack = createStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Login' component={LoginScreen}/>
        <Stack.Screen name='Splash' component={SplashScreen}/>
        <Stack.Screen name='Tabs' component={TabNavigator}/>
    </Stack.Navigator>
  );
};

export default StackNavigator;