import React from 'react';
import {useAuth} from '../../utils/auth';
import {Marker} from 'react-native-maps';

const Markers = ({players, flags}) => {
  return (
    <>
      <PlayerMarker players={players} />
      <FlagMarker flags={flags} />
    </>
  );
};

const PlayerMarker = ({players}) => {
  const {user} = useAuth();

  return (
    players.length > 0 &&
    players.map(p => {
      return (
        p.username !== user.username && (
          <Marker
            title={p.username}
            coordinate={{
              latitude: p.coordinates[0],
              longitude: p.coordinates[1],
            }}
          />
        )
      );
    })
  );
};

const FlagMarker = ({flags}) => {
  return (
    flags.length > 0 &&
    flags.map(f => {
      console.log(f);
      return (
        <Marker
          title={f.team ? 'Cristal capturé' : 'Cristal libre'}
          coordinate={{
            latitude: f.coordinates[0],
            longitude: f.coordinates[1],
          }}
        />
      );
    })
  );
};

export default Markers;
