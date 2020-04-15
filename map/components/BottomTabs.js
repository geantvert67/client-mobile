import React, {useState} from 'react';
import {BottomNavigation, Text} from 'react-native-paper';
import {Actions} from 'react-native-router-flux';
import MyGames from './partie/MyGames';
import Game from './partie/Game';
import Profil from './autentification/Profil';

const BottomTabs = () => {
  const [state, setState] = useState({
    index: 0,
    routes: [
      {key: 'myGames', title: 'Mes parties'},
      {key: 'findGame', title: 'Trouvez une partie'},
      {key: 'profil', title: 'Mon Profil'},
    ],
  });

  const handleIndexChange = ind => {
    console.log(ind);
    setState({index: ind, routes: state.routes});
  };

  const renderScene = e => {
    console.log(e);
    BottomNavigation.SceneMap({
      myGames: MyGames,
      findGame: Game,
      profil: Profil,
    });
  };

  return (
    <BottomNavigation
      navigationState={state}
      onIndexChange={handleIndexChange}
      renderScene={renderScene}
    />
  );
};

export default BottomTabs;
