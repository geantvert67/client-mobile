import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Platform} from 'react-native';

import MapView, {MAP_TYPES, Polygon, Marker} from 'react-native-maps';

import {formatZone, formatForbiddenZone} from '../../utils/game';

import Geolocation from '@react-native-community/geolocation';
import {useSocket} from '../../utils/socket';
import {acceptGeoloc} from '../../utils/geoloc';
import Markers from '../marker/Markers';
import mapStyle from '../../css/map';

const Map = () => {
  const {socket} = useSocket();
  const [areas, setAreas] = useState([]);
  const [flags, setFlags] = useState([]);
  const [teamMarkers, setTeamMarkers] = useState([]);
  const [players, setPlayers] = useState([]);
  const [unknowns, setUnknowns] = useState([]);
  const [timer, setTimer] = useState(0);
  const [error, setError] = useState('');
  const [position, setPosition] = useState([]);

  console.log(unknowns);

  useEffect(() => {
    acceptGeoloc();
    socket.on('getAreas', a => {
      setAreas(a);
    });
    socket.emit('getAreas');
    socket.on('routine', routine => {
      setUnknowns(routine.unknowns);
      setFlags(routine.flags);
      setTeamMarkers(routine.markers);
      setPlayers(routine.players);
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
      <View>
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
          onUserLocationChange={e => console.log(e)}>
          {areas.length > 0 && (
            <Polygon
              strokeColor="rgba(0, 255, 0, 0.3)"
              coordinates={formatZone(areas)}
              holes={formatForbiddenZone(areas)}
              fillColor="rgba(0, 255, 0, 0.1)"
            />
          )}
          <Markers players={players} flags={flags} unknowns={unknowns} />
        </MapView>
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
