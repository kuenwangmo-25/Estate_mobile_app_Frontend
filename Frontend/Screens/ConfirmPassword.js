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

const ConfirmPassword = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleConfirm = () => {
    if (password.trim() === '') {
      setError('Please enter the default password');
      setTimeout(() => setError(''), 1000); // Clear the error after 1 second
      return;
    }
    navigation.navigate('Home');
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
          placeholder="Password"
          name="password"
          id="password"
          value={password}
          onChangeText={setPassword}
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
    backgroundColor:'#FFFFFF',
  // This moves the content towards the top
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


  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 25,
    // paddingVertical: 15,
    marginVertical: 15,
    width: '90%',
  },
  input: {
    flex: 1,

    height: 50,
  },
  button: {
    marginTop: 30,
    width: '50%',
    backgroundColor: '#E3963E	rgb(227, 150, 62)',
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 15,
    alignSelf: 'center', // This will center the button horizontally
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'normal',
  },
});

export default ConfirmPassword;
