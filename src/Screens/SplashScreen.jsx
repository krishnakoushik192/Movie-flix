import React, { useEffect } from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';

const SplashScreen = (props) => {
  const navigation = props.navigation; 
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

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