import React from 'react';
import {Text} from 'native-base';
import {stylesGame, stylesMap} from '../../css/style';
import {View, Dimensions} from 'react-native';
import {secondsToDuration} from '../../utils/calcul';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSquareFull} from '@fortawesome/free-solid-svg-icons';

import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';

const TeamItem = ({team, score = false, mode, playerTeam}) => {
  return (
    <Collapse style={stylesGame.item}>
      <CollapseHeader>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Text>
            {' '}
            <View
              style={[
                stylesMap.inventoryItem,
                {
                  borderRadius: 10,
                  backgroundColor: team.color,
                },
              ]}
            />
          </Text>
          <Text
            style={[
              playerTeam ? stylesMap.teamName : stylesGame.gameNameText,
              {
                marginLeft: 10,
              },
            ]}>
            {' '}
            {team.name}{' '}
          </Text>
          {score && (
            <Text style={playerTeam ? stylesMap.teamScore : stylesMap.score}>
              {mode === 'TIME' ? secondsToDuration(team.score) : team.score}
            </Text>
          )}
        </View>
      </CollapseHeader>
      <CollapseBody>
        {team.players.map(player => {
          console.log(player);
          return (
            <>
              <Text
                style={[
                  stylesGame.gameNameText,
                  {
                    marginLeft: Dimensions.get('window').width * 0.17,
                    fontSize: 16,
                  },
                ]}>
                {player.username}
              </Text>

              <Text style={[stylesMap.score, {fontSize: 16}]}>
                {score &&
                  (mode === 'TIME'
                    ? secondsToDuration(player.statistics.score)
                    : player.statistics.score)}
              </Text>
            </>
          );
        })}
      </CollapseBody>
    </Collapse>
  );
};

export default TeamItem;
