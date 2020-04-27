import React from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import {useSocket} from '../../utils/socket';
import {stylesMap, stylesSigninSignup} from '../../css/style';
import {Popup} from '../Toast';

const SelectedItemButtons = ({
  item,
  coordinates,
  setSelectedItem,
  setVisible,
}) => {
  const {socket} = useSocket();

  const dropItem = () => {
    socket.emit('dropItem', {id: item.id, coordinates});
    setSelectedItem(null);
    setVisible(false);
    Popup('En cours ...', 'rgba(0,255,0,0.3)');
  };

  return (
    <View style={stylesMap.selectedItemButtonsBox}>
      <TouchableOpacity
        style={[
          stylesSigninSignup.submitButton,
          {width: 80, marginBottom: 10},
        ]}>
        <Text
          style={[stylesSigninSignup.submitButtonText, {textAlign: 'center'}]}>
          Utiliser
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => dropItem()}
        style={[
          stylesSigninSignup.submitButton,
          {backgroundColor: '#EB4646', width: 80},
        ]}>
        <Text
          style={[stylesSigninSignup.submitButtonText, {textAlign: 'center'}]}>
          Déposer
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectedItemButtons;
