import React, { useEffect } from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = (props) => {
  const navigation = props.navigation; 
  const handleNavigation = async () => {
   let loginToken = await AsyncStorage.getItem('isLoggedIn');
   console.log('Login Token:', loginToken);
   if (loginToken) {
     navigation.replace('Tabs'); 
   } else {
     navigation.replace('Login');
   }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      handleNavigation();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#030014', justifyContent: 'center', alignItems: 'center' }}>
      <ImageBackground
        source={require('../assets/BG.png')}
        style={{ width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require('../assets/Logo.png')}
            resizeMode='contain'
          />
        <Text style={{ marginHorizontal: 8, color: '#D6C7FF', fontSize: 38,  fontFamily: 'Montserrat-Bold' }}>Movie Filx</Text>
      </View>
      </ImageBackground>
    </View>
  );
};

export default SplashScreen;