import React from 'react';
import {View, FlatList} from 'react-native';
import {Text} from 'native-base';

import {stylesGame} from '../../css/style';

const GamesList = ({games, handleGame = () => {}}) => {
  console.log(games);
  return (
    <View>
      <FlatList
        keyExtractor={item => item.id}
        data={games}
        renderItem={({item}) => (
          <Text style={stylesGame.item} onPress={() => handleGame(item.id)}>
            <Text style={stylesGame.gameNameText}>
              {item.name} - {}
            </Text>
            <Text style={stylesGame.gameModeText}>{item.gameMode}</Text>
          </Text>
        )}
      />
    </View>
  );
};

export default GamesList;
