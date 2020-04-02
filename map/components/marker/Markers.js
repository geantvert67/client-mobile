import React from 'react';
import {useAuth} from '../../utils/auth';
import {Marker} from 'react-native-maps';
import {useSocket} from '../../utils/socket';
import Svg, {Image} from 'react-native-svg';
import Logo from '../../img/location-arrow-solid.svg';

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

  /** <Svg>
            <Logo width={120} height={40} fill={'red'} />
          </Svg>
  */
  return (
    players.length > 0 &&
    players.map(p => {
      return (
        p.username !== user.username &&
        p.coordinates.length > 0 && (
          <Marker
            title={p.username}
            image={require('../../img/alien.gif')}
            coordinate={{
              latitude: p.coordinates[0],
              longitude: p.coordinates[1],
            }}></Marker>
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
          image={
            f.capturedUntil
              ? require('../../img/crystal_locked.png')
              : require('../../img/crystal.gif')
          }
          coordinate={{
            latitude: f.coordinates[0],
            longitude: f.coordinates[1],
          }}
          style={{width: 500, height: 500}}
          onPress={() => captureFlag(f.id)}
        />
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
          image={require('../../img/unknown.png')}
          coordinate={{
            latitude: u.coordinates[0],
            longitude: u.coordinates[1],
          }}
        />
      );
    })
  );
};
export default Markers;
