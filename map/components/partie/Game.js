import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import {Text} from 'native-base';
import request from '../../utils/request';
import {getData} from '../../utils/asyncStorage';
import {Actions} from 'react-native-router-flux';
import io from 'socket.io-client';
import {useAuth} from '../../utils/auth';

import {stylesGame} from '../../css/style';

const Game = () => {
  const {user, socket} = useAuth();

  const [games, setGames] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  //const socket = io('http://127.0.0.1:8888?username=Toto');

  useEffect(() => {
    setLoading(true);
    request
      .get('/games', {
        headers: {
          Authorization: 'Bearer ' + getData('token'),
        },
      })
      .then(res => {
        setGames(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const redirectTeams = (team, teams) => {
    //Actions.Map();
    //console.log(teams);
    Actions.Teams(teams);
    Alert.alert(
      'Vous êtes connecté à la partie !',
      "Vous faites désormais partie de l'équipe " + team,
    );
  };

  const handleGame = () => {
    let affectedTeam = '';
    socket.on('getTeams', teams => {
      teams.map(team => {
        team.players.map(
          player =>
            player.username === user.username && (affectedTeam = team.name),
        );
      });
      affectedTeam === ''
        ? socket.emit('addTeamPlayer')
        : redirectTeams(affectedTeam, teams);
    });
    socket.emit('getTeams');
  };

  return (
    <View style={stylesGame.container}>
      <View>
        <Text style={stylesGame.gameText}>Partie privée</Text>
        <View style={stylesGame.row}>
          <TextInput
            style={stylesGame.input1}
            placeholder="Adresse IP"
            placeholderTextColor="#D2D2D2"
            autoCapitalize="none"
          />
          <TextInput
            style={stylesGame.input2}
            placeholder="Port"
            placeholderTextColor="#D2D2D2"
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity
          style={stylesGame.submitButton}
          onPress={() => Actions.Map()}>
          <Text style={stylesGame.submitButtonText}>Jouer</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={stylesGame.gameText}>Parties publiques</Text>
        {loading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text>{error.message}</Text>
        ) : (
          games && (
            <View>
              <FlatList
                keyExtractor={item => item.id}
                data={games}
                renderItem={({item}) => (
                  <Text style={stylesGame.item} onPress={handleGame}>
                    <Text style={stylesGame.gameNameText}>
                      {item.Config.name} - {}
                    </Text>
                    <Text style={stylesGame.gameModeText}>
                      {item.Config.gameMode}
                    </Text>
                  </Text>
                )}
              />
            </View>
          )
        )}
      </View>
    </View>
  );
};

export default Game;
