import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, ScrollView, RefreshControl} from 'react-native';
import {Text} from 'native-base';
import GamesList from './GamesList';
import request from '../../utils/request';
import {Popup} from '../Toast';
import io from 'socket.io-client';

import {stylesGame} from '../../css/style';
import {Actions} from 'react-native-router-flux';
import {formatGames} from '../../utils/game';
import {useSocket} from '../../utils/socket';
import {useAuth} from '../../utils/auth';
import RefreshView from '../RefreshView';

const MyGames = () => {
  const [invitations, setInvitations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const {setSocket} = useSocket();
  const {user} = useAuth();

  console.log(invitations);

  useEffect(() => {
    request
      .get('/user/invitations')
      .then(res => {
        setInvitations(res.data);
      })
      .catch(err => {
        console.log('test');
        console.log(err.response);
        Popup('Une erreur est survenue');
      });
  }, []);

  const handleGame = (ip, port, id) => {
    setSocket(io(`http://${ip}:${port}?username=${user.username}`));
    Actions.Teams();
  };

  const onRefresh = () => {
    request
      .get('/user/invitations')
      .then(res => {
        setInvitations(res.data);
      })
      .catch(err => {
        console.log('test');
        console.log(err.response);
        Popup('Une erreur est survenue');
      });
  };

  return (
    <>
      {loading ? (
        'Loading...'
      ) : (
        <>
          <RefreshView refresh={onRefresh}>
            <View>
              <Text style={stylesGame.gameText}>Mes parties</Text>
              {invitations && (
                <GamesList
                  games={formatGames(invitations.filter(i => i.accepted))}
                  handleGame={handleGame}
                />
              )}
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
              {invitations && (
                <GamesList
                  games={formatGames(
                    invitations.filter(i => i.accepted === undefined),
                  )}
                />
              )}
            </View>

            <View>
              <Text style={stylesGame.gameText}>Demandes refusées</Text>
              {invitations && (
                <GamesList
                  games={formatGames(
                    invitations.filter(
                      i => i.accepted !== undefined && !i.accepted,
                    ),
                  )}
                />
              )}
            </View>
          </RefreshView>
        </>
      )}
    </>
  );
};

export default MyGames;
