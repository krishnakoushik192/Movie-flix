import React from 'react';
import {StyleSheet,View,TouchableOpacity,Text} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BookmarkScreen from '../Screens/BookmarkScreen';
import WatchListScreen from '../Screens/WatchListScreen';
import HomeScreen from '../Screens/HomeScreen';
import LinearGradient from 'react-native-linear-gradient';


const Tab = createBottomTabNavigator();
const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
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
          Home: 'home',
          WatchList: 'playlist-add-check',
          Bookmarks: 'bookmark',
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
              >
                <Icon name={iconName} size={20} color="#000" />
                <Text style={styles.activeLabel}>{route.name}</Text>
              </LinearGradient>
            ) : (
              <View style={styles.inactiveTab}>
                <Icon name={iconName} size={20} color="#94a3b8" />
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator tabBar={props => <CustomTabBar {...props} />} screenOptions={{ headerShown: false }}>
        <Tab.Screen name='Home' component={HomeScreen}/>
        <Tab.Screen name='WatchList' component={WatchListScreen}/>
        <Tab.Screen name='Bookmarks' component={BookmarkScreen}/>
    </Tab.Navigator>
  );
};

export default TabNavigator;
const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#0f0f1c',
    borderRadius: 30,
    margin: 16,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
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
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  activeLabel: {
    color: '#000',
    marginLeft: 8,
    fontWeight: 'bold',
  },
  inactiveTab: {
    padding: 10,
  },
});
