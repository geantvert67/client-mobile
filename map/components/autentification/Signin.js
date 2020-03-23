import React, {useState} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {Button, Text} from 'native-base';

import {Actions} from 'react-native-router-flux';

import {useAuth} from '../../utils/auth';

import {stylesSigninSignup} from '../../css/style';

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
    <View style={stylesSigninSignup.container}>
      <TextInput
        style={stylesSigninSignup.input}
        placeholder="Nom d'utilisateur"
        placeholderTextColor="#D2D2D2"
        autoCapitalize="none"
        onChangeText={e => setUsername(e)}
      />
      <TextInput
        style={stylesSigninSignup.input}
        secureTextEntry={true}
        placeholder="Mot de passe"
        placeholderTextColor="#D2D2D2"
        autoCapitalize="none"
        onChangeText={e => setPassword(e)}
      />
      <TouchableOpacity
        style={stylesSigninSignup.submitButton}
        onPress={handleSubmit}>
        <Text style={stylesSigninSignup.submitButtonText}>Se connecter</Text>
      </TouchableOpacity>

      <Text style={stylesSigninSignup.textRegister}>Pas encore inscrit ?</Text>

      <Button
        style={stylesSigninSignup.btnRegister}
        onPress={() => {
          Actions.Signup();
        }}>
        <Text style={stylesSigninSignup.btnRegisterColor}>S'inscrire</Text>
      </Button>
    </View>
  );
};

export default Signin;
