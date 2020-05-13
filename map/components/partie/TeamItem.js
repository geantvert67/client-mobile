import React from 'react';
import {Text} from 'native-base';
import {stylesGame, stylesMap} from '../../css/style';
import {View} from 'react-native';
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
        <View style={score && {flex: 1, flexDirection: 'row'}}>
          <Text
            style={playerTeam ? stylesMap.teamName : stylesGame.gameNameText}>
            {' '}
            <FontAwesomeIcon
              icon={faSquareFull}
              style={{color: team.color}}
              size={22}
            />
            {} {team.name}
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
              <Text style={stylesGame.gameNameText}>{player.username}</Text>

              <Text style={stylesMap.score}>
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
