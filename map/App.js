import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';

import Signin from './components/autentification/Signin';
import Signup from './components/autentification/Signup';
import Game from './components/partie/Game';
import MyGames from './components/partie/MyGames';
import Map from './components/map/Map';
import Teams from './components/partie/Teams';
import {AuthProvider} from './utils/auth';
import {Router, Stack, Scene} from 'react-native-router-flux';
import {SocketProvider} from './utils/socket';
import BackButton from './components/BackButton';
import {ConfigProvider} from './utils/config';
import BottomTab from './components/Menu';

const App = () => {
  console.disableYellowBox = true;
  // Scene hideNavBar={true}
  return (
    <AuthProvider>
      <SocketProvider>
        <ConfigProvider>
          <Router>
            <Stack key="root">
              <Scene
                key="Signin"
                component={Signin}
                title="Connexion"
                navigationBarStyle={styles.header}
                titleStyle={styles.titleColor}
                renderBackButton={() => <BackButton />}
                initial
              />
              <Scene
                key="Signup"
                component={Signup}
                title="Inscription"
                navigationBarStyle={styles.header}
                titleStyle={styles.titleColor}
                renderBackButton={() => <BackButton />}
              />

              <Scene
                key="Menu"
                title="CrystalZ"
                component={BottomTab}
                hideNavBar
              />

              <Scene
                key="Map"
                navigationBarStyle={styles.header}
                titleStyle={styles.titleColor}
                component={Map}
                renderBackButton={() => <BackButton />}
              />
              <Scene
                key="Teams"
                component={Teams}
                title="Equipes"
                navigationBarStyle={styles.header}
                titleStyle={styles.titleColor}
                renderBackButton={() => <BackButton disconnect={true} />}
              />
            </Stack>
          </Router>
        </ConfigProvider>
      </SocketProvider>
    </AuthProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#26292F',
    color: '#FFFFFF',
    borderBottomWidth: 0,
  },
  titleColor: {
    color: '#FFFFFF',
    fontSize: 35,
  },
});
