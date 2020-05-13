import React from 'react';
import {View, Image, TouchableOpacity, Text, Dimensions} from 'react-native';
import {useSocket} from '../../utils/socket';
import {stylesMap, stylesSigninSignup} from '../../css/style';
import {Popup} from '../Toast';
import {usePlayer} from '../../utils/player';

const SelectedItemButtons = ({item, setSelectedItem, setVisible}) => {
  const {socket} = useSocket();
  const {player} = usePlayer();

  const EQUIPEMENTS = ['Sonde', 'Antenne', 'Noyau protecteur'];
  const ITEMS = [
    'Transporteur',
    'Portail de transfert',
    'Tempête',
    'Sentinelle',
    'Oracle',
    'Disloqueur',
    'Intercepteur',
  ];
  const TRAPS = ['Canon à photons', 'Transducteur'];

  const dropItem = () => {
    socket.emit('dropItem', {id: item.id, coordinates: player.coordinates});
    setSelectedItem(null);
    setVisible(false);
    Popup('En cours ...', 'rgba(0,255,0,0.3)');
  };

  const useItem = () => {
    switch (item.name) {
      case 'Disloqueur':
        socket.emit('useDisloqueur', item.id);
        break;
      case 'Canon à photons':
        socket.emit('useCanon', {
          id: item.id,
          coordinates: player.coordinates,
          delay: 10,
        });
        break;
      case 'Transducteur':
        socket.emit('useTransducteur', {
          id: item.id,
          coordinates: player.coordinates,
          delay: 10,
        });
        break;
      case 'Sonde':
        socket.emit('useSonde', item.id);
        break;
      case 'Tempête':
        socket.emit('useTempete', item.id);
        break;
      case 'Intercepteur':
        socket.emit('useIntercepteur', item.id);
        break;
      case 'Transporteur':
        socket.emit('useTransporteur', item.id);
        break;
      case 'Noyau protecteur':
        socket.emit('useNoyau', item.id);
        break;
    }
    setVisible(false);
    setSelectedItem(null);
  };

  const unequipItem = () => {
    switch (item.name) {
      case 'Sonde':
        socket.emit('unequipSonde', item.id);
        break;
      case 'Noyau protecteur':
        socket.emit('unequipNoyau', item.id);
        break;
    }
    setVisible(false);
    setSelectedItem(null);
  };

  const checkDisabled = () => {
    return (
      (player.hasTransporteur && item.name === 'Transporteur') ||
      player.immobilizedUntil
    );
  };

  return item.equiped ? (
    <View
      style={[
        stylesMap.selectedItemButtonsBox,
        {
          height: '150%',
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}>
      <TouchableOpacity
        onPress={() => unequipItem()}
        style={[
          stylesSigninSignup.submitButton,
          {
            backgroundColor: '#EB4646',
            width: 80,
          },
        ]}>
        <Text
          style={[stylesSigninSignup.submitButtonText, {textAlign: 'center'}]}>
          Retirer
        </Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View style={stylesMap.selectedItemButtonsBox}>
      <TouchableOpacity
        onPress={() => useItem()}
        style={[
          stylesSigninSignup.submitButton,
          {width: 80, marginBottom: 10},
          checkDisabled() && {backgroundColor: 'grey'},
        ]}
        disabled={checkDisabled()}>
        <Text
          style={[stylesSigninSignup.submitButtonText, {textAlign: 'center'}]}>
          {EQUIPEMENTS.includes(item.name)
            ? 'Equiper'
            : TRAPS.includes(item.name)
            ? 'Installer'
            : ITEMS.includes(item.name)
            ? 'Utiliser'
            : ''}
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
