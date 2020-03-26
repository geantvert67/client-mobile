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
import {useSocket} from '../../utils/socket';
import PrivateGame from './PrivateGame';

const Game = () => {
  const {user} = useAuth();
  const {socket, setSocket} = useSocket();

  const [games, setGames] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  const handleGame = (ip, port) => {
    setSocket(io(`http://${ip}:${port}?username=${user.username}`));
    Actions.Teams();
  };

  return (
    <View style={stylesGame.container}>
      <PrivateGame handleGame={handleGame} />
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
                  <Text
                    style={stylesGame.item}
                    onPress={() => handleGame(item.ip, item.port)}>
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
