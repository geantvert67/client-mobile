import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {useConfig} from '../../utils/config';
import InventoryItem from './InventoryItem';
import {usePlayer} from '../../utils/player';

const Inventory = ({selectedItem, setSelectedItem, inventorySize}) => {
  const {config} = useConfig();
  const {player} = usePlayer();

  let emptySlots = [];
  player &&
    (() => {
      for (var i = 0; i < inventorySize - player.inventory.length; i++) {
        emptySlots.push(<InventoryItem setSelectedItem={setSelectedItem} />);
      }
    });
  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        {player &&
          player.inventory.map(item => (
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
