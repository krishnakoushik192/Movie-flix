import React from 'react';
import { View, Text,Button } from 'react-native';

const LoginScreen = (props) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Hello, World!</Text>
      <Button title="Login" onPress={() => { props.navigation.navigate('Tabs'); }} />
    </View>
  );
};

export default LoginScreen;