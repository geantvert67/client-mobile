import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';

import TeamItem from './TeamItem';

import {stylesGame} from '../../css/style';
import {Button} from 'react-native-paper';
import {Actions} from 'react-native-router-flux';
import {Text} from 'native-base';

import {stylesSigninSignup} from '../../css/style';
import {useSocket} from '../../utils/socket';
import {useAuth} from '../../utils/auth';
import {useConfig} from '../../utils/config';

const Teams = () => {
  const [gameStarted, setGameStarted] = useState(null);
  const [teams, setTeams] = useState(null);
  const [playerTeam, setPlayerTeam] = useState(null);
  const {setConfig} = useConfig();
  const {user} = useAuth();

  const {socket} = useSocket();

  const checkStart = () => {
    socket.on('getConfig', config => {
      setGameStarted(config.launched);
      setConfig(config);
    });
    socket.emit('getConfig');
  };

  useEffect(() => {
    gameStarted || checkStart();
    socket.on('getTeams', t => {
      setTeams(t);
    });
  }, []);

  useEffect(() => {
    let team = null;
    teams &&
      teams.map(t =>
        t.players.map(p => p.username === user.username && (team = t)),
      );
    setPlayerTeam(team);
  }, [teams]);

  !gameStarted && socket.emit('getTeams') && socket.emit('addTeamPlayer');

  return teams ? (
    <>
      <View style={stylesGame.container}>
        {teams.map(team => {
          return <TeamItem team={team} />;
        })}
        {gameStarted || (
          <Text style={stylesSigninSignup.submitButtonText}>
            Le maître du jeu n'a pas encore lancé la partie. Veuillez patienter
            !
          </Text>
        )}
        <TouchableOpacity
          style={
            gameStarted
              ? stylesSigninSignup.submitButton
              : stylesSigninSignup.submitButtonDisabled
          }
          onPress={() => Actions.Map({playerTeam})}
          disabled={!gameStarted}>
          <Text>Jouer</Text>
        </TouchableOpacity>
      </View>
    </>
  ) : (
    <Image source={require('../../img/loader.gif')} />
  );
};

export default Teams;
