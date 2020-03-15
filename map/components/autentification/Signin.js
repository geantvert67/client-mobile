import React, {useState} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {Button, Text} from 'native-base';

import {Actions} from 'react-native-router-flux';

import {useAuth} from '../../utils/auth';

const Signin = () => {
  const {signin} = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    signin({username, password}).catch(err => {
      setUsername('');
      setPassword('');
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
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

      <Text style={styles.textRegister}>Pas encore inscrit ?</Text>

      <Button
        style={styles.btnRegister}
        onPress={() => {
          Actions.Signup();
        }}>
        <Text style={styles.btnRegisterColor}>S'inscrire</Text>
      </Button>
    </View>
  );
};

export default Signin;

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
  btnRegister: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },
  btnRegisterColor: {
    color: '#68B684',
  },
  textRegister: {
    alignSelf: 'center',
    color: '#FFFFFF',
    marginTop: 20,
  },
});
