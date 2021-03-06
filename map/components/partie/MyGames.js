import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
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
import Loader from '../Loader';

/**
 * Composant MyGames :
 * Affiche la liste des parties d'un joueur ainsi que ses demandes
 */
const MyGames = () => {
  const [invitations, setInvitations] = useState(null);
  const [loading, setLoading] = useState(false);
  const {setSocket} = useSocket();
  const {user} = useAuth();

  useEffect(() => {
    request
      .get('/user/invitations')
      .then(res => {
        setInvitations(res.data);
      })
      .catch(err => {
        Popup('Une erreur est survenue', 'rgba(255, 0,0,0.5)', -70);
      });
    onRefresh();
  }, []);

  const handleGame = (id, ip, port, game) => {
    setSocket(
      io(`http://${ip}:${port}?username=${user.username}&id=${user.id}`),
    );
    Actions.Teams();
  };

  const onRefresh = () => {
    request
      .get('/user/invitations')
      .then(res => {
        setInvitations(res.data);
      })
      .catch(err => {
        Popup('Une erreur est survenue', 'rgba(255, 0,0,0.5)', -70);
      });
  };

  return (
    <>
      {loading || !invitations ? (
        <Loader />
      ) : (
        <>
          <RefreshView refresh={onRefresh} refreshableMod="advanced">
            <View>
              <Text style={stylesGame.gameText}>Mes parties</Text>
              {invitations.filter(i => i.accepted).length > 0 ? (
                <GamesList
                  games={formatGames(invitations.filter(i => i.accepted))}
                  handleGame={handleGame}
                  myGames={true}
                />
              ) : (
                <Text style={stylesGame.textSecondary}>
                  Aucune partie en cours
                </Text>
              )}
            </View>

            <View>
              <Text style={stylesGame.gameText}>Demandes en attente</Text>
              {invitations.filter(i => i.accepted === undefined).length > 0 ? (
                <GamesList
                  games={formatGames(
                    invitations.filter(i => i.accepted === undefined),
                  )}
                />
              ) : (
                <Text style={stylesGame.textSecondary}>
                  Aucune demande en attente
                </Text>
              )}
            </View>

            <View style={stylesGame.up}>
              <Text style={stylesGame.gameText}>Demandes refus??es</Text>
              {invitations.filter(i => i.accepted !== undefined && !i.accepted)
                .length > 0 ? (
                <GamesList
                  games={formatGames(
                    invitations.filter(
                      i => i.accepted !== undefined && !i.accepted,
                    ),
                  )}
                />
              ) : (
                <Text style={stylesGame.textSecondary}>
                  Aucune demande refus??e r??cemment
                </Text>
              )}
            </View>
          </RefreshView>
        </>
      )}
    </>
  );
};

export default MyGames;
