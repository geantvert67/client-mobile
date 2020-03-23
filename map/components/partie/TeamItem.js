import React from 'react';
import {Text} from 'native-base';
import {stylesGame} from '../../css/style';
import {View} from 'react-native';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSquareFull} from '@fortawesome/free-solid-svg-icons';

import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';

const TeamItem = ({team}) => {
  return (
    <Collapse style={stylesGame.item}>
      <CollapseHeader>
        <View>
          <Text style={stylesGame.gameNameText}>
            {' '}
            <FontAwesomeIcon icon={faSquareFull} style={{color: team.color}} />
            {} {team.name}
          </Text>
        </View>
      </CollapseHeader>
      <CollapseBody>
        {team.players.map(player => {
          return <Text style={stylesGame.gameNameText}>{player.username}</Text>;
        })}
      </CollapseBody>
    </Collapse>
  );
};

export default TeamItem;
