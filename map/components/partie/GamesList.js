import React from 'react';
import {View, FlatList} from 'react-native';
import {Text} from 'native-base';

import {stylesGame} from '../../css/style';

const GamesList = ({games, handleGame = () => {}, myGames = false}) => {
  return (
    <View>
      <FlatList
        keyExtractor={item => item.id}
        data={games}
        renderItem={({item}) => (
          <>
            <Text
              style={stylesGame.item}
              onPress={() => handleGame(item.id, item.ip, item.port, item)}>
              <Text>
                <Text style={stylesGame.gameNameText}>
                  {item.name} - {}
                </Text>
                <Text style={stylesGame.gameModeText}>{item.gameMode}</Text>
              </Text>
              <Text style={stylesGame.textSecondary}>
                {myGames &&
                  (item.launched
                    ? '\nPartie en cours'
                    : '\nEn attente de joueurs')}
              </Text>
            </Text>
          </>
        )}
      />
    </View>
  );
};

export default GamesList;
