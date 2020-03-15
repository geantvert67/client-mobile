import React, {useState} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {Text} from 'native-base';

import {useAuth} from '../../utils/auth';

const Signup = () => {
  const {signup} = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [message, setMessage] = useState('');

  const formValid = username && password && password === passwordCheck;

  const handleSubmit = e => {
    e.preventDefault();
    formValid &&
      signup({username, password}).catch(err => {
        setUsername('');
        setPassword('');
        setPasswordCheck('');
        setMessage(err.message);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#D2D2D2"
        autoCapitalize="none"
        onChangeText={e => setUsername(e)}
      />
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Password"
        placeholderTextColor="#D2D2D2"
        autoCapitalize="none"
        onChangeText={e => setPassword(e)}
      />
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Confirm Password"
        placeholderTextColor="#D2D2D2"
        autoCapitalize="none"
        onChangeText={e => setPasswordCheck(e)}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#26292F',
  },
  input: {
    margin: 15,
    height: 50,
    backgroundColor: '#1B1E22',
    borderRadius: 5,
    color: '#FFFFFF',
    paddingLeft: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,

    elevation: 20,
  },
  submitButton: {
    backgroundColor: '#68B684',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
  },
});
