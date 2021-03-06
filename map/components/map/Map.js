import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Platform, Dimensions} from 'react-native';
import {Text} from 'native-base';
import {stylesMap} from '../../css/style';
import MapView, {MAP_TYPES} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {useSocket} from '../../utils/socket';
import {acceptGeoloc} from '../../utils/geoloc';
import Markers from '../marker/Markers';
import mapStyle from '../../css/map';
import Polygons from './Polygons';
import MapMenu from './MapMenu';
import ModalScore from '../score/ModalScore';
import {useConfig} from '../../utils/config';
import Timer from './Timer';
import ModalInventory from '../inventory/ModalInventory';
import {usePlayer} from '../../utils/player';
import {Actions} from 'react-native-router-flux';
import moment from 'moment';
import Loader from '../Loader';
import TrapIndicator from './TrapIndicator';
import Toast from 'react-native-root-toast';
import {Popup} from '../Toast';
import MapVisitedButtons from './MapVisitedButtons';

/**
 * Composant Map :
 * Affiche l'interface avec la carte
 *
 * props :
 *   - playerTeam : Equipe du joueur
 */
const Map = ({playerTeam, isVisited = false, gameId = null}) => {
  const {socket} = useSocket();
  const {config, setConfig} = useConfig();
  const [areas, setAreas] = useState([]);
  const [flags, setFlags] = useState([]);
  const [teamMarkers, setTeamMarkers] = useState([]);
  const [players, setPlayers] = useState([]);
  const [unknowns, setUnknowns] = useState([]);
  const [items, setItems] = useState([]);
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');
  const [position, setPosition] = useState([]);
  const [modalScore, setModalScore] = useState(false);
  const [modalInventory, setModalInventory] = useState(false);
  const {setPlayer, player} = usePlayer();

  const [coordsFlag, setCoordsFlag] = useState([]);
  const [notif, setNotif] = useState(false);
  const [region, setRegion] = useState({});

  config && config.ended && Actions.replace('Endgame', {playerTeam});

  useEffect(() => {
    acceptGeoloc();
    socket.on('getAreas', a => {
      setAreas(a);
    });

    socket.on('onError', message => {
      Popup(message);
    });
    socket.emit('getAreas');

    socket.on('routine', routine => {
      setUnknowns(routine.unknowns);
      setFlags(routine.flags);
      setTeamMarkers(routine.markers);
      setPlayers(routine.players);
      setItems(routine.items);
      setTeams(routine.teams);
      setPlayer(routine.player);
    });

    socket.on('getConfig', newConfig => {
      setConfig(newConfig);
    });

    const interval = setInterval(() => {
      Geolocation.getCurrentPosition(
        p => {
          const pos = [p.coords.latitude, p.coords.longitude];
          setError('');
          setPosition(pos);
        },
        e => setError(e.message),
      );
    }, 2000);

    return () => interval && clearInterval(interval);
  }, []);

  useEffect(() => {
    coordsFlag.length > 0 &&
      setRegion({
        region: {
          latitude: coordsFlag[0],
          longitude: coordsFlag[1],
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
      }) &&
      setCoordsFlag([]);
  }, [coordsFlag]);

  useEffect(() => {
    region.region && setRegion({});
  }, [region]);

  useEffect(() => {
    const popupPosition =
      config.gameMode === 'SUPREMACY' ? Toast.positions.TOP : 60;
    player &&
      !notif &&
      socket.on('getNotification', notifs => {
        const privateNotif = notifs.filter(
          n => n.type === 'user' && n.ids.some(id => id === player.id),
        );

        privateNotif.length > 0
          ? Popup(
              privateNotif[0].message,
              'rgba(38,41,47, 0.5)',
              popupPosition,
              Toast.durations.LONG,
            )
          : notifs.map(
              n =>
                n.type === 'team' &&
                n.ids.some(id => id === playerTeam.id) &&
                Popup(
                  n.message,
                  'rgba(38,41,47, 0.5)',
                  popupPosition,
                  Toast.durations.LONG,
                ),
            );
      });
    player && setNotif(true);
  }, [player]);

  useEffect(() => {
    if (config && config.launched && position.length > 0) {
      socket.emit('routine', position);
    }
  }, [position, config]);

  return position.length > 0 ? (
    <View
      style={{
        flex: 1,
        width: Dimensions.get('window').width,
        height: '100%',
      }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          width: Dimensions.get('window').width,
          height: '100%',
        }}>
        <MapView
          {...region}
          provider={null}
          initialRegion={{
            latitude: position[0],
            longitude: position[1],
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          rotateEnabled={true}
          mapType={
            Platform.OS === 'android' ? MAP_TYPES.STANDARD : MAP_TYPES.NONE
          }
          customMapStyle={mapStyle}
          userLocationUpdateInterval={1000}
          followsUserLocation
          showsCompass
          style={{flex: 1}}
          style={[
            styles.map,
            {
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              width: '100%',
            },
          ]}
          showsUserLocation={true}
          showsMyLocationButton={true}>
          {areas.length > 0 && <Polygons areas={areas} />}

          <Markers
            players={players}
            flags={flags}
            unknowns={unknowns}
            playerTeam={playerTeam}
            position={position}
            teamMarkers={teamMarkers}
            items={items}
          />
        </MapView>
      </View>
      <MapMenu
        coordinates={position}
        setModalScore={setModalScore}
        setModalInventory={setModalInventory}
      />
      <ModalScore
        visible={modalScore}
        setModal={setModalScore}
        teams={teams}
        playerTeam={playerTeam}
      />
      <ModalInventory
        visible={modalInventory}
        setVisible={setModalInventory}
        setModal={setModalInventory}
        flags={flags}
        playerTeam={playerTeam}
        setCoordsFlag={setCoordsFlag}
      />
      <TrapIndicator />
      {config.gameMode !== 'SUPREMACY' && (
        <Timer duration={config.duration} launchedAt={config.launchedAt} />
      )}
      {!config.launched && config.willLaunchAt && (
        <View style={stylesMap.timerBox}>
          <Text style={{color: 'white'}}> La partie va d??buter le</Text>
          <Text style={{color: 'white'}}>
            {moment(config.willLaunchAt).format('DD/MM/YYYY ?? HH:00')}
          </Text>
        </View>
      )}
      {isVisited && <MapVisitedButtons gameId={gameId} />}
    </View>
  ) : (
    <Loader />
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    //flex: 1,
    width: 400,
    height: 800,
  },
});
