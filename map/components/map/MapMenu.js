import React, {useState} from 'react';
import {TouchableOpacity, Text} from 'react-native';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faTimes,
  faSlidersH,
  faTrophy,
  faMapMarker,
} from '@fortawesome/free-solid-svg-icons';
import MarkerNegative from '../../img/markerNegative.svg';
import MarkerPositive from '../../img/markerPositive.svg';

import {View} from 'native-base';
import {stylesMap} from '../../css/style';
import {useSocket} from '../../utils/socket';
import {Popup} from '../Toast';

const MapMenu = ({coordinates, setModal}) => {
  const [open, setOpen] = useState(false);
  const {socket} = useSocket();

  const addMarker = isPositive => {
    socket.emit('createMarker', {
      coordinates,
      isPositive,
    });
    Popup('Transmission en cours...', 'rgba(0, 255, 0, 0.3)');
  };

  return (
    <>
      <View style={stylesMap.menu}>
        {open ? (
          <View>
            <TouchableOpacity
              onPress={() => addMarker(true)}
              style={{position: 'relative', top: -55, right: -3}}>
              <MarkerPositive width="25" height="46.1" fill="green" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => addMarker(false)}
              style={{position: 'relative', top: -40, right: -3}}>
              <MarkerNegative width="25" height="46.1" fill="red" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setModal(true)}
              style={{position: 'relative', top: -25}}>
              <FontAwesomeIcon icon={faTrophy} size={32} color="gold" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setOpen(!open)}>
              <FontAwesomeIcon icon={faTimes} size={32} color="white" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity>
            <FontAwesomeIcon
              color="white"
              onPress={() => setOpen(!open)}
              icon={faSlidersH}
              size={32}
            />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export default MapMenu;
