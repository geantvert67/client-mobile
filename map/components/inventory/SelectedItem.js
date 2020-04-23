import React from 'react';
import {View, Image} from 'react-native';
import {useConfig} from '../../utils/config';
import {stylesMap} from '../../css/style';
import {getItemIcon} from '../marker/MarkersItem';

const SelectedItem = ({item}) => {
  console.log(item);
  const img = item && getItemIcon(item.name);
  return (
    <View style={stylesMap.inventorySelectedItem}>
      {item && <Image source={img} style={stylesMap.selectedItemImage} />}
    </View>
  );
};

export default SelectedItem;
