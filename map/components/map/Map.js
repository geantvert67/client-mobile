import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Platform} from 'react-native';

import MapView, {MAP_TYPES, Polygon} from 'react-native-maps';

import {useAuth} from '../../utils/auth';
import {formatZone, formatForbiddenZone} from '../../utils/game';

import Geolocation from '@react-native-community/geolocation';
import {useSocket} from '../../utils/socket';
import {acceptGeoloc} from '../../utils/geoloc';

const Map = () => {
  const {user} = useAuth();
  const {socket} = useSocket();
  const [areas, setAreas] = useState([]);
  const [capturedFlags, setCapturedFlags] = useState([]);
  const [teamMarkers, setTeamMarkers] = useState([]);
  const [teamPlayers, setTeamPlayers] = useState([]);
  const [timer, setTimer] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    acceptGeoloc();
    console.log(socket);
    socket.on('getAreas', a => {
      setAreas(a);
    });
    socket.emit('getAreas');
    socket.on('routine', routine => {
      setCapturedFlags(routine.flags);
      setTeamMarkers(routine.markers);
      setTeamPlayers(routine.players);
    });
  }, []);

  setTimeout(() => {
    setTimer(timer + 1);
  }, 1000);

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      pos => {
        setError('');
        socket.emit('routine', [pos.coords.latitude, pos.coords.longitude]);
      },
      e => setError(e.message),
    );
    return () => Geolocation.clearWatch(watchId);
  }, [timer]);

  console.log(capturedFlags);

  return (
    <View>
      <MapView
        provider={null}
        rotateEnabled={true}
        mapType={
          Platform.OS === 'android' ? MAP_TYPES.STANDARD : MAP_TYPES.NONE
        }
        userLocationUpdateInterval={1000}
        followsUserLocation
        showsCompass
        style={{flex: 1}}
        style={styles.map}
        showsUserLocation>
        <Polygon
          coordinates={formatZone(areas)}
          holes={formatForbiddenZone(areas)}
          fillColor="rgba(0, 255, 0, 0.3)"
        />

        {teamPlayers.length > 0 &&
          teamPlayers.map(player => {
            return (
              player.username !== user.username && (
                <MapView.Marker
                  coordinate={player.coordinates}
                  title={player.username}
                />
              )
            );
          })}

        {capturedFlags.length > 0 &&
          capturedFlags.map(flag => {
            return <MapView.Marker coordinate={flag.coordinates} />;
          })}

        {teamMarkers.length > 0 &&
          teamMarkers.map(marker => {
            return <MapView.Marker coordinate={marker.coordinates} />;
          })}
      </MapView>
    </View>
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
