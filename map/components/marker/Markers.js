import React from 'react';
import {useAuth} from '../../utils/auth';
import {Marker} from 'react-native-maps';
import {useSocket} from '../../utils/socket';
import {Svg} from 'react-native-svg';
import {View, Image} from 'react-native';
import CrystalLocked from '../../img/crystal-locked.svg';
import Crystal from '../../img/crystal.svg';
import Teammate from '../../img/location-arrow-solid.svg';

const Markers = ({players, flags, unknowns, playerTeam}) => {
  return (
    <>
      <PlayerMarker players={players} />
      <FlagMarker flags={flags} playerTeam={playerTeam} />
      <UnknownMarker unknowns={unknowns} />
    </>
  );
};

const PlayerMarker = ({players}) => {
  const {user} = useAuth();
  const img = require('../../img/crystal.gif');

  return (
    players.length > 0 &&
    players.map(p => {
      return (
        p.username !== user.username &&
        p.coordinates.length > 0 && (
          <Marker
            title={p.username}
            coordinate={{
              latitude: p.coordinates[0],
              longitude: p.coordinates[1],
            }}>
            <Teammate fill={p.teamColor} />
          </Marker>
        )
      );
    })
  );
};

const FlagMarker = ({flags, playerTeam}) => {
  const {socket} = useSocket();

  const captureFlag = idFlag => {
    socket.emit('captureFlag', {flagId: idFlag, teamId: playerTeam.id});
  };

  return (
    flags.length > 0 &&
    flags.map(f => {
      return (
        <Marker
          title={
            f.team ? `Cristal capturé par ${f.team.name}` : 'Cristal libre'
          }
          coordinate={{
            latitude: f.coordinates[0],
            longitude: f.coordinates[1],
          }}
          onPress={() => captureFlag(f.id)}>
          <View>
            {f.capturedUntil ? (
              <CrystalLocked fill={f.team ? f.team.color : 'grey'} />
            ) : (
              <Crystal fill={f.team ? f.team.color : 'grey'} />
            )}
          </View>
        </Marker>
      );
    })
  );
};

const UnknownMarker = ({unknowns}) => {
  return (
    unknowns.length > 0 &&
    unknowns.map(u => {
      return (
        <Marker
          title="Inconnu"
          coordinate={{
            latitude: u.coordinates[0],
            longitude: u.coordinates[1],
          }}>
          <Image
            source={require('../../img/unknown.png')}
            style={{width: 40, height: 40}}
            resizeMode="contain"
          />
        </Marker>
      );
    })
  );
};
export default Markers;
