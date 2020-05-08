import React from 'react';
import {Text} from 'native-base';
import {stylesGame, stylesMap} from '../../css/style';
import {View} from 'react-native';
import {secondsToDuration} from '../../utils/calcul';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUserAlt} from '@fortawesome/free-solid-svg-icons';

import {usePlayer} from '../../utils/player';
import {useConfig} from '../../utils/config';

const PersonalScore = ({player}) => {
  const {config} = useConfig();

  return (
    <View
      style={[
        stylesGame.item,
        {position: 'absolute', left: 10, right: 10, top: 75},
      ]}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Text style={stylesGame.gameNameText}>
          {' '}
          <FontAwesomeIcon
            icon={faUserAlt}
            size={22}
            style={{color: 'white'}}
          />
          {} {player.username}
        </Text>

        <Text style={stylesMap.score}>
          {' '}
          {config.gameMode === 'TIME'
            ? secondsToDuration(player.score)
            : player.score}
        </Text>
      </View>
    </View>
  );
};

export default PersonalScore;
