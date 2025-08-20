import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image, KeyboardAvoidingView, Pressable, Keyboard } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const RenderLoginBox = ({ email, setEmail, password, setPassword, navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View style={styles.loginBox}>
      <Text style={styles.loginTitle}>
        Login
      </Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Icon name="email" size={22} color="#D6C7FF" style={styles.inputIcon} />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#D6C7FF"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Icon name="lock" size={22} color="#D6C7FF" style={styles.inputIcon} />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#D6C7FF"
          style={styles.input}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? 'visibility' : 'visibility-off'}
            size={22}
            color="#D6C7FF"
          />
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <LinearGradient
        colors={['#C084FC', '#A855F7']}
        style={styles.gradientButton}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Tabs')}>
          <Text style={styles.loginButtonText}>
            Login
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const LoginScreen = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1, backgroundColor: '#030014' }} >
      <Pressable onPress={() => Keyboard.dismiss()}>
        <View >
          {/* Header Background */}
          <ImageBackground
            source={require('../assets/BG.png')}
            style={styles.imageBackground}
            resizeMode="stretch"
          >
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Image
                source={require('../assets/Logo.png')}
                style={styles.logo}
                resizeMode='contain'
              />
              <Text style={styles.appTitle}>Movie Filx</Text>
            </View>
          </ImageBackground>

          {/* Login Box */}
          <RenderLoginBox
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            navigation={props.navigation}
          />
        </View>
      </Pressable>
    </KeyboardAvoidingView>

  );
};

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: 300,
    justifyContent: 'flex-start',
  },
  logo: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    marginTop: 70,
  },
  appTitle: {
    marginTop: 80,
    color: '#D6C7FF',
    fontSize: 26,
    fontFamily: 'Montserrat-BoldItalic',
    marginHorizontal: 10,
  },
  loginBox: {
    backgroundColor: '#1C1C59',
    padding: 15,
    borderRadius: 15,
    elevation: 5,
    marginVertical: 50,
    marginHorizontal: 35,
    gap: 10,
  },
  loginTitle: {
    fontSize: 24,
    fontFamily: 'Montserrat-BoldItalic',
    marginBottom: 10,
    textAlign: 'center',
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C2C74',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: 'white',
    paddingVertical: 8,
  },
  gradientButton: {
    borderRadius: 15,
  },
  loginButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontFamily: 'Montserrat-BoldItalic',
    fontSize: 22,
  },
});

export default LoginScreen;
