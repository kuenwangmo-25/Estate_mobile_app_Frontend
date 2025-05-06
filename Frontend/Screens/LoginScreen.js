import React, { useState, useContext,useEffect } from 'react';
import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";
import AuthGlobal from '../Context/store/AuthGlobal';
import baseURL from '../assets/common/baseUrl';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const LoginScreen = ({ navigation }) => {

  const context = useContext(AuthGlobal);

  // useEffect(() => {
  //   console.log("Authenticated:", context.stateUser.isAuthenticated);

  
  //   if (context.stateUser.isAuthenticated === true) {
  //     if (navigation) {
  //       navigation.navigate("Home"); // or the screen you want to navigate to
  //     }    }
  // }, [context.stateUser.isAuthenticated,navigation]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [secureText, setSecureText] = useState(true); // Declare state for password visibility

  const { stateUser, dispatch } = useContext(AuthGlobal); // Access context state and dispatch

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Missing Fields',
        text2: 'Please fill in your credentials',
      });
      return;
    }
  
    if (!validateEmail(email)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Email',
        text2: 'Please enter a valid email address',
      });
      return;
    }
  
    try {
      const response = await axios.post(`${baseURL}/login`, {
        email,
        password,
      });
      console.log(response.data.status)
      if (response.data.status === 'success') {

        const token = response.data.token;
        await AsyncStorage.setItem('jwt', token);
        const decoded = jwt_decode(token);
        console.log(decoded)
  
        // Dispatch login success to context
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: decoded, // or response.data.user if available
        });

  
        Toast.show({
          type: 'success',
          text1: 'Login Successful',
          text2: 'Welcome back!',
        });
        navigation.navigate("Home");  // Navigate right after login

  
      } else {
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: 'Invalid credentials',
        });
      }
  
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: error?.response?.data?.message || 'Incorrect email or password',
        
      });
    }
  };
  
  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleSignUp = () => {
    navigation.navigate('Register');
  };

  const toggleSecureText = () => setSecureText(!secureText); // Toggle function

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../assets/Images/logo.png')} style={styles.logo} />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} color="#aaa" style={styles.icon} />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#aaa" style={styles.icon} />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry={secureText} // Bind to secureText state
        />
        <TouchableOpacity onPress={toggleSecureText} style={styles.iconToggle}>
          <Icon
            name={secureText ? 'eye-slash':'eye' }
            size={20}
            color="#aaa"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.signupLink}> Sign Up</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 25,
    marginVertical: 15,
    width: '100%',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
  },
  forgotText: {
    alignSelf: 'flex-end',
    marginTop: 5,
    color: '#097969',
    fontSize: 13,
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    color: '#555',
    fontSize: 12,
  },
  signupLink: {
    color: '#097969',
    fontSize: 13,
    fontWeight: 'bold',
  },
  loginButton: {
    marginTop: 30,
    width: '50%',
    backgroundColor: '#E3963E',
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 15,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'normal',
  },
});

export default LoginScreen;
