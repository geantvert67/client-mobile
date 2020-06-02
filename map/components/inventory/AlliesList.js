import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {usePlayer} from '../../utils/player';
import {stylesGame, stylesMap} from '../../css/style';

/**
 * Composant AlliesList :
 * Liste des alliés à afficher lors de l'utilisation d'un portail
 *
 * props :
 *   - playerTeam : Equipe du joueur connecté
 *   - setSelectedAllie : Setter du joueur sélectionné lors de la configuration du portail
 */
const AlliesList = ({playerTeam, setSelectedAllie}) => {
  const {player} = usePlayer();

  return playerTeam.players.map(
    (p) =>
      p.username !== player.username && (
        <TouchableOpacity onPress={() => setSelectedAllie(p)}>
          <View
            style={[
              stylesGame.item,
              {flex: 1, flexDirection: 'row', alignItems: 'center'},
            ]}>
            <Text style={{color: 'white'}}>{p.username}</Text>
          </View>
        </TouchableOpacity>
      ),
  );
};

export default AlliesList;
