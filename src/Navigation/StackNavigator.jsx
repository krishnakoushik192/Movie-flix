import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LoginScreen from '../Screens/LoginScreen';
import TabNavigator from './TabNavigator';
import SplashScreen from '../Screens/SplashScreen';
import MovieDetailScreen from '../Screens/MovieDetailScreen';
import TvDetailsScreen from '../Screens/TvDetailScreen';

const Stack = createStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false  }} initialRouteName='Splash' style={{ backgroundColor: '#1a1a37ff' }}>
        <Stack.Screen name='Splash' component={SplashScreen}/>
        <Stack.Screen name='Login' component={LoginScreen}/>
        <Stack.Screen name='Tabs' component={TabNavigator}/>
        <Stack.Screen name='MovieDetail' component={MovieDetailScreen}/>
        <Stack.Screen name='TvDetail' component={TvDetailsScreen}/>
    </Stack.Navigator>
  );
};

export default StackNavigator;