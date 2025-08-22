import React from 'react';
import {StyleSheet,View,TouchableOpacity,Text} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import WatchListScreen from '../Screens/WatchListScreen';
import HomeScreen from '../Screens/HomeScreen';
import LinearGradient from 'react-native-linear-gradient';
import SearchScreen from '../Screens/SearchScreen';

const Tab = createBottomTabNavigator();
const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={[styles.tabBarContainer]}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const onPress = () => {
            if (!isFocused) {
              navigation.navigate(route.name);
            }
          };

          const iconName = {
            Home: isFocused ? 'home-variant' : 'home-variant-outline',
            WatchList: isFocused ? 'movie-check' : 'movie-check-outline',
            Search: 'magnify' ,
          }[route.name];
          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              onPress={onPress}
              style={styles.tabItem}
            >
              {isFocused ? (
                <LinearGradient
                  colors={['#C084FC', '#A855F7']}
                  style={styles.activeTab}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <MaterialCommunityIcons name={iconName} size={26} color="#0F0D23" />
                  <Text style={styles.activeLabel}>{route.name}</Text>
                </LinearGradient>
              ) : (
                <View style={styles.inactiveTab}>
                  <MaterialCommunityIcons name={iconName} size={26} color="#A8B5DB" />
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator tabBar={props => <CustomTabBar {...props} />} screenOptions={{ headerShown: false, tabBarStyle:{ backgroundColor: 'transparent'}}}>
        <Tab.Screen name='Home' component={HomeScreen}/>
        <Tab.Screen name='WatchList' component={WatchListScreen}/>
        <Tab.Screen name='Search' component={SearchScreen}/>
    </Tab.Navigator>
  );
};

export default TabNavigator;
const styles = StyleSheet.create({
  tabBarContainer: {
    backgroundColor: 'black',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#1a1a37ff',
    borderRadius: 30,
    margin: 5,
    marginBottom: 25,
    padding: 5,
    // paddingHorizontal: ,
    justifyContent: 'space-between',
    height: 60,
    // alignItems: 'center',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  activeTab: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C084FC',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  activeLabel: {
    color: '#0F0D23',
    // marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 16,
  },
  inactiveTab: {
    padding: 10,
  },
});
