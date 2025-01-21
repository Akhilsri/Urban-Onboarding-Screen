import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const App = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleSendOtp = async () => {
    if (!phoneNumber) {
      setMessage('Phone number is required');
      return;
    }

    try {
      // Ensure phone number starts with +91 for India
      const formattedPhoneNumber = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;

      // Make the POST request using Axios
      const response = await axios.post('http://192.168.1.9:3000/api/send-otp', 
        {
          phoneNumber: formattedPhoneNumber,  // Send phone number as a string like +91xxxxxxxxxx
        },
        {
          headers: {
            'Content-Type': 'application/json',  // Set content-type as JSON
          }
        }
      );

      // Handle the response
      if (response.data.success) {
        setMessage(response.data.msg);  // Success message from server
      } else {
        setMessage(response.data.msg);  // Error message from server
      }
    } catch (error) {
      // Specific error handling with logging
      setMessage('Something went wrong, please try again');
      console.log('Error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Enter Phone Number</Text>
      
      <TextInput
        style={styles.input}
        placeholder="+91XXXXXXXXXX"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      
      <Button title="Send OTP" onPress={handleSendOtp} />
      
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    width: '100%',
    marginBottom: 20,
    paddingLeft: 10,
  },
  message: {
    marginTop: 20,
    color: 'red',
  },
});

export default App;
