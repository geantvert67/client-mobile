import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {usePlayer} from '../../utils/player';

const AlliesList = ({playerTeam, setSelectedAllie}) => {
  const {player} = usePlayer();
  return playerTeam.players.map(
    p =>
      p.username !== player.username && (
        <TouchableOpacity onPress={() => setSelectedAllie(p)}>
          <Text> {p.username}</Text>
        </TouchableOpacity>
      ),
  );
};

export default AlliesList;
