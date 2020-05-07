import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import {stylesMap} from '../../css/style';
import _ from 'lodash';
import {useConfig} from '../../utils/config';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';
import Inventory from './Inventory';
import SelectedItem from './SelectedItem';
import {usePlayer} from '../../utils/player';

const ModalInventory = ({visible, setVisible, setModal, position}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const {config} = useConfig();
  const {player} = usePlayer();

  selectedItem &&
    !_.some(player.inventory, {id: selectedItem.id}) &&
    setSelectedItem(null);

  const modalInventorySize = selectedItem
    ? (Dimensions.get('window').height *
        (75 - Math.ceil(config.inventorySize / 5) * 10)) /
      100
    : (Dimensions.get('window').height *
        (95 - Math.ceil(config.inventorySize / 5) * 10)) /
      100;
  return (
    <View>
      <Modal
        isVisible={visible}
        style={[
          stylesMap.modal,
          {
            marginTop: modalInventorySize,
          },
        ]}
        onBackdropPress={() => setModal(false)}>
        <View style={{flex: 1}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={stylesMap.titleModal}>Inventaire</Text>
            <TouchableOpacity
              style={stylesMap.teamScore}
              onPress={() => setModal(false)}>
              <FontAwesomeIcon
                icon={faChevronDown}
                size={26}
                color="white"
                style={{right: 10}}
              />
            </TouchableOpacity>
          </View>
          {selectedItem && (
            <SelectedItem
              item={selectedItem}
              position={position}
              setSelectedItem={setSelectedItem}
              setVisible={setVisible}
            />
          )}
          <Inventory
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        </View>
      </Modal>
    </View>
  );
};

export default ModalInventory;
