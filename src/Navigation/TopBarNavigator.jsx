import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import SearchMovies from '../Screens/MovieSearchScreen';
import SearchTV from '../Screens/TvSearchScreen';

const Tabs = createMaterialTopTabNavigator();

const TopBarNavigator = ({ flag, query }) => {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#030014' },
        tabBarLabelStyle: { color: '#D6C7FF' },
        tabBarIndicatorStyle: { backgroundColor: '#D6C7FF' },
      }}
    >
      <Tabs.Screen name="Movies" component={SearchMovies} initialParams={{ flag, query, type: 'movie' }} />
      <Tabs.Screen name="TV Shows" component={SearchTV} initialParams={{ flag, query, type: 'tv' }} />
    </Tabs.Navigator>
  );
};

export default TopBarNavigator;