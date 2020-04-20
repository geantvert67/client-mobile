import React from 'react';
import Modal from 'react-native-modal';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {stylesGame, stylesMap} from '../../css/style';
import TeamItem from '../partie/TeamItem';
import _ from 'lodash';
import {useConfig} from '../../utils/config';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

const ModalScore = ({visible, setModal, teams, playerTeam}) => {
  const {config} = useConfig();
  return (
    <View>
      <Modal
        isVisible={visible}
        style={stylesMap.modal}
        onBackdropPress={() => setModal(false)}>
        <View style={{flex: 1}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={stylesMap.titleModal}>Classement des équipes</Text>
            <TouchableOpacity
              style={stylesMap.teamScore}
              onPress={() => setModal(false)}>
              <FontAwesomeIcon icon={faTimes} size={26} color="white" />
            </TouchableOpacity>
          </View>
          <ScrollView>
            {_.orderBy(teams, ['score', 'name'], ['desc', 'asc']).map(team => {
              return team.id === playerTeam.id ? (
                <TeamItem
                  team={team}
                  score={true}
                  mode={config.gameMode}
                  playerTeam={true}
                />
              ) : (
                <TeamItem
                  team={team}
                  score={true}
                  mode={config.gameMode}
                  playerTeam={false}
                />
              );
            })}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default ModalScore;
