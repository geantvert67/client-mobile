import React from 'react';
import {useAuth} from '../../utils/auth';
import {Marker} from 'react-native-maps';
import {useSocket} from '../../utils/socket';
import {Svg} from 'react-native-svg';
import {View, Image} from 'react-native';
import CrystalLocked from '../../img/crystal-locked.svg';
import Crystal from '../../img/crystal.svg';
import Teammate from '../../img/location-arrow-solid.svg';
import {useConfig} from '../../utils/config';
import {inRadius} from '../../utils/calcul';
import {Popup} from '../Toast';

const Markers = ({players, flags, unknowns, playerTeam, position}) => {
  return (
    <>
      <PlayerMarker players={players} />
      <FlagMarker flags={flags} playerTeam={playerTeam} position={position} />
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

const FlagMarker = ({flags, playerTeam, position}) => {
  const {socket} = useSocket();
  const {config} = useConfig();

  const captureFlag = flag => {
    flag.team.id === playerTeam.id
      ? Popup('Crystal déjà capturé', 'rgba(255, 165, 0, 0.5)')
      : flag.capturedUntil
      ? Popup('Crystal vérouillé', 'rgba(255, 165, 0, 0.5)')
      : inRadius(flag.coordinates, position, config.flagActionRadius)
      ? socket.emit('captureFlag', {flagId: flag.id, teamId: playerTeam.id}) &&
        Popup('Capture en cours...', 'rgba(0, 255,255, 0.5)')
      : Popup('Crystal trop éloigné !');
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
          onPress={() => captureFlag(f)}>
          <View>
            {f.capturedUntil &&
            inRadius(f.coordinates, position, config.flagActionRadius) ? (
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
