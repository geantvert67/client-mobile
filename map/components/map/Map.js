import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Platform, TouchableOpacity} from 'react-native';
import {Text} from 'native-base';

import MapView, {MAP_TYPES} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {useSocket} from '../../utils/socket';
import {acceptGeoloc} from '../../utils/geoloc';
import Markers from '../marker/Markers';
import mapStyle from '../../css/map';
import Polygons from './Polygons';
import MapMenu from './MapMenu';
import ModalScore from '../score/ModalScore';

const Map = ({playerTeam}) => {
  const {socket} = useSocket();
  const [areas, setAreas] = useState([]);
  const [flags, setFlags] = useState([]);
  const [teamMarkers, setTeamMarkers] = useState([]);
  const [players, setPlayers] = useState([]);
  const [unknowns, setUnknowns] = useState([]);
  const [teams, setTeams] = useState([]);
  const [timer, setTimer] = useState(0);
  const [error, setError] = useState('');
  const [position, setPosition] = useState([]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    acceptGeoloc();
    socket.on('getAreas', a => {
      setAreas(a);
    });
    socket.emit('getAreas');
    socket.on('routine', routine => {
      console.log('routine', routine);
      setUnknowns(routine.unknowns);
      setFlags(routine.flags);
      setTeamMarkers(routine.markers);
      setPlayers(routine.players);
      setTeams(routine.teams);
    });
  }, []);

  setTimeout(() => {
    setTimer(timer + 1);
  }, 1000);

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      pos => {
        setError('');
        setPosition([pos.coords.latitude, pos.coords.longitude]);
        socket.emit('routine', [pos.coords.latitude, pos.coords.longitude]);
      },
      e => setError(e.message),
    );
    return () => Geolocation.clearWatch(watchId);
  }, [timer]);

  return (
    position.length > 0 && (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <MapView
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
            style={styles.map}
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
            />
          </MapView>
        </View>
        <MapMenu coordinates={position} setModal={setModal} />
        <ModalScore
          visible={modal}
          setModal={setModal}
          teams={teams}
          playerTeam={playerTeam}
        />
      </View>
    )
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
