import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FormContainer from '../Shared/FormContainer';
import Input from '../Shared/Input';
import Toast from 'react-native-toast-message'; // Make sure this is imported at the top
import axios from 'axios';
import baseURL from '../assets/common/baseUrl';

const RegisterScreen = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };
   
  const handleRegister = async () => {
    console.log(email)
    if (email.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Missing Email',
        text2: 'Please enter your email',
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
      const response = await axios.post(`${baseURL}/register`, {
        email : email,
      });
      console.log(response.data)

      if (response.data.status === 'success') {
        Toast.show({
          type: 'success',
          text1: 'OTP Sent',
          text2: 'Please check your email',
        });
        navigation.navigate('OTPConfirm', { email }); // Pass email to OTP screen
      }
    } catch (error) {

      const errorMessage = error?.response?.data?.message;
      console.error(error);

      if (errorMessage === 'User not Registered by the Admin') {
        Toast.show({
          type: 'error',
          text1: 'Access Denied',
          text2: 'You must be registered by an admin to proceed.',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: errorMessage || 'Something went wrong',
        });
      }
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../assets/Images/logo.png')} style={styles.logo} />

      <Text style={styles.infoText}>
        Make sure your email is already registered in the
      </Text>
      <Text style={styles.infoText}>
        Estate admin system
      </Text>

      <FormContainer style={styles.formContainer}>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Input
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text.toLowerCase())}
          keyboardType="email-address"
          icon={<Icon name="envelope" size={20} color="#aaa" />}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </FormContainer>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 200,
    height: 200,
    marginTop: 40,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  infoText: {
    textAlign: 'center',
    marginVertical: 5, // Reduced vertical margin to bring text closer
    fontSize: 14,
    color: '#333',
    marginRight:"10%"
  },
  formContainer: {
    width: '100%',
  },
  // errorText: {
  //   marginBottom: 12,
  //   fontSize: 16,
  //   alignSelf: 'center',
  // },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 25,
    marginVertical: 15,
    width: '90%',
  },
  input: {
    flex: 1,
    height: 50,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 30,

  },
  button: {
    marginTop: 30,
    width: '50%',
    backgroundColor: '#E3963E	rgb(227, 150, 62)', // Change to your desired color
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'normal',
  },
});

export default RegisterScreen;
