import React, {useState, useEffect} from 'react';
import {Container} from 'native-base';
//import OpenStreetMapScreen from './OpenStreetMap';
import Geolocation from '@react-native-community/geolocation';
//import {View, Text, PermissionsAndroid, Platform} from 'react-native';
import {StyleSheet} from 'react-native';

import Signin from './components/autentification/Signin';
import Signup from './components/autentification/Signup';
import Game from './components/partie/Game';
import Map from './components/map/Map';
import Test from './Test';
import {AuthProvider} from './utils/auth';
import {Router, Stack, Scene} from 'react-native-router-flux';

const App = () => {
  // Test pour savoir si l'OS du téléphone est android ou IOS pour demander les droits de géolocalisations
  //if (Platform.OS === 'android') {
  //  requestLocationPermission();
  //} else if (Platform.OS === 'ios') {
  //  Geolocation.requestAuthorization();
  //}

  // Fonction qui demande les droit de géolocalisation sous android
  /*async function requestLocationPermission() {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Example App',
          message: 'Example App access to your location ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        //alert('You can use the location');
      } else {
        console.log('location permission denied');
        //alert('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }*/

  // Scene hideNavBar={true}
  return (
    <AuthProvider>
      <Router>
        <Stack key="root">
          {/*<Scene key="test" component={Test} title="Test" initial /> */}
          <Scene
            key="Signin"
            component={Signin}
            title="Signin"
            navigationBarStyle={styles.header}
            titleStyle={styles.titleColor}
            initial
          />
          <Scene
            key="Signup"
            component={Signup}
            title="Signup"
            navigationBarStyle={styles.header}
            titleStyle={styles.titleColor}
          />
          <Scene
            key="Game"
            component={Game}
            title="Partie"
            navigationBarStyle={styles.header}
            titleStyle={styles.titleColor}
          />
          <Scene key="map" component={Map} hideNavBar={true} />
        </Stack>
      </Router>
      {/*<Signup />
      {/*<Container>
        {/*<OpenStreetMapScreen />*/}
      {/*<Signin />
      </Container> */}
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
