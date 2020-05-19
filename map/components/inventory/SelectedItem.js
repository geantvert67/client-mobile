import React from 'react';
import {View, Image, TouchableOpacity, Text, Dimensions} from 'react-native';
import {useConfig} from '../../utils/config';
import {stylesMap, stylesSigninSignup} from '../../css/style';
import {getItemIcon} from '../marker/MarkersItem';
import SelectedItemButtons from './SelectedItemButtons';
import {DESC_ITEMS} from '../../utils/descriptions';

const SelectedItem = ({
  item,
  setSelectedItem,
  setVisible,
  flags,
  playerTeam,
}) => {
  const img = item && getItemIcon(item.name);
  return (
    <View style={stylesMap.selectedItemBox}>
      <View style={[stylesMap.inventorySelectedItem]}>
        {item && <Image source={img} style={stylesMap.selectedItemImage} />}
      </View>
      {item && (
        <View style={{flex: 1, flewDirection: 'column'}}>
          <View
            style={{
              width: Dimensions.get('window').width * 0.6,
              marginLeft: 10,
            }}>
            <Text style={stylesMap.itemName}> {item.name}</Text>
            <Text style={stylesMap.itemDescription}>
              {DESC_ITEMS[item.name]}
            </Text>
          </View>
          <SelectedItemButtons
            item={item}
            setSelectedItem={setSelectedItem}
            setVisible={setVisible}
            flags={flags}
            playerTeam={playerTeam}
          />
        </View>
      )}
    </View>
  );
};

export default SelectedItem;
