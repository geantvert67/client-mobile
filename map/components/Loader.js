import React from 'react';
import {View, Text} from 'native-base';
import {stylesGame} from '../css/style';

/**
 * Composant Loader :
 * Loader d'attente
 */
const Loader = () => {
  return (
    <View style={stylesGame.container}>
      <Text> Loading ... </Text>
    </View>
  );
};

export default Loader;
