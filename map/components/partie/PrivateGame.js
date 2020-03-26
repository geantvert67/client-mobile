import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import {Text} from 'native-base';
import {stylesGame} from '../../css/style';

const PrivateGame = ({handleGame}) => {
  const [ip, setIp] = useState('');
  const [port, setPort] = useState('');

  return (
    <View>
      <Text style={stylesGame.gameText}>Partie privée</Text>
      <View style={stylesGame.row}>
        <TextInput
          style={stylesGame.input1}
          placeholder="Adresse IP"
          placeholderTextColor="#D2D2D2"
          autoCapitalize="none"
          onChangeText={e => setIp(e)}
        />
        <TextInput
          style={stylesGame.input2}
          placeholder="Port"
          placeholderTextColor="#D2D2D2"
          autoCapitalize="none"
          onChangeText={e => setPort(e)}
        />
      </View>
      <TouchableOpacity
        style={stylesGame.submitButton}
        onPress={() => handleGame(ip, port)}>
        <Text style={stylesGame.submitButtonText}>Jouer</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PrivateGame;
