import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {useConfig} from '../../utils/config';
import InventoryItem from './InventoryItem';
import {usePlayer} from '../../utils/player';

const Inventory = ({selectedItem, setSelectedItem}) => {
  const {config} = useConfig();
  const {player} = usePlayer();

  let emptySlots = [];
  for (var i = 0; i < config.inventorySize - player.inventory.length; i++) {
    emptySlots.push(<InventoryItem />);
  }
  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        {player.inventory.map(item => (
          <InventoryItem
            item={item}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        ))}
        {emptySlots}
      </View>
    </ScrollView>
  );
};

export default Inventory;
