import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text} from 'native-base';
import GamesList from './GamesList';
import request from '../../utils/request';
import {Popup} from '../Toast';
import {getData} from '../../utils/asyncStorage';

import {stylesGame} from '../../css/style';
import {Actions} from 'react-native-router-flux';

const MyGames = () => {
  const [games, setGames] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    request
      .get(`/user/invitations`, {
        headers: {
          Authorization: 'Bearer ' + getData('token'),
        },
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        Popup('Une erreur est survenue');
      });
  }, []);

  const handleGame = () => {};

  return (
    <>
      {loading ? (
        'Loading...'
      ) : (
        <>
          <View style={stylesGame.container}>
            <View>
              <Text style={stylesGame.gameText}>Mes parties</Text>
              {games && <GamesList games={games} handleGame={handleGame} />}
              <TouchableOpacity
                style={stylesGame.submitButton}
                onPress={() => Actions.Game()}>
                <Text style={stylesGame.submitButtonText}>
                  Trouver une partie
                </Text>
              </TouchableOpacity>
            </View>

            <View>
              <Text style={stylesGame.gameText}>Demandes en attente</Text>
              {games && <GamesList games={games} />}
            </View>

            <View>
              <Text style={stylesGame.gameText}>Demandes refusées</Text>
              {games && <GamesList games={games} />}
            </View>
          </View>
        </>
      )}
    </>
  );
};

export default MyGames;
