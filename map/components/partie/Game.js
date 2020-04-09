import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {Text} from 'native-base';
import request from '../../utils/request';
import {getData} from '../../utils/asyncStorage';
import {Actions} from 'react-native-router-flux';
import io from 'socket.io-client';
import {useAuth} from '../../utils/auth';

import {stylesGame} from '../../css/style';
import {useSocket} from '../../utils/socket';
import PrivateGame from './PrivateGame';
import {Popup} from '../Toast';
import GamesList from './GamesList';

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

  const handleGame = (ip, port, gameId) => {
    request
      .post(
        `/games/${gameId}/invitations`,
        {userId: user.id},
        {
          headers: {
            Authorization: 'Bearer ' + getData('token'),
          },
        },
      )
      .then(res => {
        Popup('Demande envoyée', 'rgba(0,255,0,0.5)');
      })
      .catch(err => {
        if (err.response.status === 409) Popup('Demande déjà envoyée');
        else Popup('Une erreur est survenue');
      });
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
          games && <GamesList games={games} handleGame={handleGame} />
        )}
      </View>
    </View>
  );
};

export default Game;
