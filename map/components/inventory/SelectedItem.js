import React from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import {useConfig} from '../../utils/config';
import {stylesMap, stylesSigninSignup} from '../../css/style';
import {getItemIcon} from '../marker/MarkersItem';
import SelectedItemButtons from './SelectedItemButtons';
import {DESC_ITEMS} from '../../utils/descriptions';

const SelectedItem = ({item, position, setSelectedItem, setVisible}) => {
  const img = item && getItemIcon(item.name);
  return (
    <View style={stylesMap.selectedItemBox}>
      <View style={stylesMap.inventorySelectedItem}>
        {item && <Image source={img} style={stylesMap.selectedItemImage} />}
      </View>
      {item && (
        <>
          <View style={{width: 180, marginLeft: 10}}>
            <Text style={stylesMap.itemName}> {item.name}</Text>
            <Text style={stylesMap.itemDescription}>
              {DESC_ITEMS[item.name]}
            </Text>
          </View>
          <SelectedItemButtons
            item={item}
            coordinates={position}
            setSelectedItem={setSelectedItem}
            setVisible={setVisible}
          />
        </>
      )}
    </View>
  );
};

export default SelectedItem;
