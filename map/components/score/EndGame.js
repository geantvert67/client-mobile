import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {stylesGame, stylesMap, stylesSigninSignup} from '../../css/style';
import TeamItem from '../partie/TeamItem';
import _ from 'lodash';
import {useConfig} from '../../utils/config';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';
import {Actions} from 'react-native-router-flux';
import {Popup} from '../Toast';
import PersonalScore from './PersonalScore';

const EndGame = ({teams, playerTeam}) => {
  const {config} = useConfig();
  return (
    <View style={stylesSigninSignup.container}>
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            marginLeft: Dimensions.get('window').width * 0.35,
          }}>
          {_.some(config.winners, {id: playerTeam.id}) ? (
            config.winners.length === 1 ? (
              <Text
                style={[
                  stylesMap.titleModal,
                  {fontSize: 30, color: '#68B684'},
                ]}>
                Gagné
              </Text>
            ) : (
              <Text
                style={[
                  stylesMap.titleModal,
                  {fontSize: 30, color: '#D2D2D2'},
                ]}>
                Egalité
              </Text>
            )
          ) : (
            <Text style={[stylesMap.titleModal, {color: 'red'}]}>Défaite</Text>
          )}
        </View>
        <PersonalScore />
        <ScrollView style={[stylesMap.scrollView, {top: 165}]}>
          {_.orderBy(teams, ['score', 'name'], ['desc', 'asc']).map(team => {
            return team.id === playerTeam.id ? (
              <TeamItem
                team={team}
                score={true}
                mode={config.gameMode}
                playerTeam
              />
            ) : (
              <TeamItem team={team} score={true} mode={config.gameMode} />
            );
          })}
        </ScrollView>
        <TouchableOpacity
          style={[
            stylesSigninSignup.submitButton,

            {
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 0,
              marginTop: 100,
            },
          ]}
          onPress={() => Actions.replace('Menu')}>
          <Text style={{color: 'white'}}>Retour au menu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EndGame;
