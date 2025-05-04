import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Import FontAwesome5
import FormContainer from '../Shared/FormContainer';
import Input from '../Shared/Input';
import baseURL from '../assets/common/baseUrl';
import axios from 'axios';


const OTPConfirmScreen = ({ navigation, route }) => {
  const [otp, setOTP] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const email = route.params?.email;

  const handleConfirm = async () => {
    if (otp.trim() === '') {
      setError('Please enter the OTP');
      setTimeout(() => setError(''), 1000);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${baseURL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        navigation.navigate('Home');
      } else {
        setError(data.message || 'OTP verification failed');
        setTimeout(() => setError(''), 2000);
      }
    } catch (err) {
      Alert.alert('Network Error', 'Could not connect to the server.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../assets/Images/logo.png')} style={styles.logo} />

      <FormContainer>
        <Text style={styles.infoText}>
          Make sure your email is already registered in the
        </Text>
        <Text style={styles.infoText}>
          Estate admin system
        </Text>


        {error ? <Text style={styles.errorText}>{error}</Text> : null}


        <Input
          placeholder="Enter OTP"
          name="otp"
          id="otp"
          value={otp}
          onChangeText={setOTP}
          keyboardType="numeric"
          icon={
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="key" size={16} color="#aaa" style={{ marginRight: 5 }} />
            </View>
          }
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
        />


        <View style={styles.button}>
          <TouchableOpacity onPress={handleConfirm}>
            <Text style={styles.buttonText}>Confirm</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 200,
    height: 300,
    marginBottom: -50,
    marginTop: 40,
    resizeMode: 'contain',
  },
  infoText: {
    textAlign: 'center',
    marginVertical: 5, // Reduced vertical margin to bring text closer
    fontSize: 14,
    color: '#333',
    marginRight:"10%"
  },


  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 25,  // Reduced padding horizontally to make the box larger
    marginVertical: 15,
    width: '90%',          // Increased the width to take up the full width of the screen
  
  },
  input: {
    flex: 1,
    height: 50,
  },
  button: {
    width: '50%',
    backgroundColor: '#E3963E	rgb(227, 150, 62)',
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 15,
    alignSelf: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'normal',
  },
});

export default OTPConfirmScreen;
