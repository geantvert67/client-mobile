import React, {useState, useEffect} from 'react';
import {View, TextInput, TouchableOpacity, BackHandler} from 'react-native';
import {Text} from 'native-base';

import {useAuth} from '../../utils/auth';

import {stylesSigninSignup} from '../../css/style';
import {Popup} from '../Toast';
import {Actions} from 'react-native-router-flux';

const Signup = () => {
  const {signup} = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [error, setError] = useState('');

  const formValid = username && password && password === passwordCheck;

  const handleSubmit = e => {
    e.preventDefault();
    formValid
      ? signup({username, password}, setError)
      : Popup('Les mots de passe ne coïncident pas.');
  };

  error !== '' && Popup(error) && setError('');

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
      <TextInput
        style={stylesSigninSignup.input}
        secureTextEntry={true}
        placeholder="Confirmer le mot de passe "
        placeholderTextColor="#D2D2D2"
        autoCapitalize="none"
        onChangeText={e => setPasswordCheck(e)}
      />
      <TouchableOpacity
        style={stylesSigninSignup.submitButton}
        onPress={handleSubmit}>
        <Text style={stylesSigninSignup.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signup;
