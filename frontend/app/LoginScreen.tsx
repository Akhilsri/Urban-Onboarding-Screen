import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoginSignup = async () => {
    if (!phoneNumber) {
      Alert.alert('Error', 'Please enter a valid phone number.');
      return;
    }

    const formattedPhoneNumber = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;

    try {
      setLoading(true);

      const response = await axios.post('http://192.168.1.7:3000/api/send-otp', {
        phoneNumber: formattedPhoneNumber,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setLoading(false);

      if (response.data.success) {
        navigation.navigate('OtpVerificationScreen', { phoneNumber: formattedPhoneNumber });
      } else {
        Alert.alert('Error', response.data.msg || 'Failed to send OTP. Please try again.');
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Something went wrong. Please try again.');
      console.log('Error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100} // Adjust this value as needed
    >
      <View style={styles.logoContainer}>
        <Image 
          source={require('../assets/images/Logo and BG.png')}
          style={styles.logo} 
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.countryCode}>+91</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Mobile Number" 
          keyboardType="phone-pad" 
          value={phoneNumber} 
          onChangeText={setPhoneNumber} 
        />
      </View>

      <Text style={styles.infoText}>
        An OTP will be sent to the provided phone number for verification. 
        Standard message and data rates may apply.
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleLoginSignup} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Sending...' : 'Login/Sign Up'}</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 0,
  },
  logo: {
    width: 400,
    height: 420,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '100%',
  },
  countryCode: {
    fontSize: 18,
    marginRight: 5,
  },
  input: {
    flex: 1,
    fontSize: 18,
  },
  infoText: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.6,
  },
  button: {
    backgroundColor: '#283891',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LoginScreen;