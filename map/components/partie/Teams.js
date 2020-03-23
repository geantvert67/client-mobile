import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity} from 'react-native';

import TeamItem from './TeamItem';

import {stylesGame} from '../../css/style';
import {useAuth} from '../../utils/auth';
import {Button} from 'react-native-paper';
import {Actions} from 'react-native-router-flux';
import {Text} from 'native-base';

import {stylesSigninSignup} from '../../css/style';

const Teams = teams => {
  const [gameStarted, setGameStarted] = useState(false);

  const {socket} = useAuth();

  const checkStart = () => {
    socket.on('getConfig', config => {
      setGameStarted(config.launched);
    });
    socket.emit('getConfig');
  };

  useEffect(() => {
    gameStarted || checkStart();
  }, []);

  return (
    teams.data !== undefined && (
      <>
        <View style={stylesGame.container}>
          {teams.data.map(team => {
            return <TeamItem team={team} />;
          })}
          {gameStarted || (
            <Text>
              Le maître du jeu n'a pas encore lancé la partie. Veuillez
              patienter !
            </Text>
          )}
          <TouchableOpacity
            style={stylesSigninSignup.submitButton}
            onPress={() => Actions.Map()}
            disabled={!gameStarted}>
            <Text>Jouer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={stylesSigninSignup.submitButton}
            onPress={() => {
              socket.emit('launchGame');
            }}>
            <Text>Lancer</Text>
          </TouchableOpacity>
        </View>
      </>
    )
  );
};

export default Teams;
