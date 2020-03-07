import React, {useState, useEffect} from 'react';
import {Container} from 'native-base';
import OpenStreetMapScreen from './OpenStreetMap';
import Geolocation from '@react-native-community/geolocation';
import {View, Text, PermissionsAndroid, Platform} from 'react-native';

const App = () => {
  // Test pour savoir si l'OS du téléphone est android ou IOS pour demander les droits de géolocalisations
  if (Platform.OS === 'android') {
    requestLocationPermission();
  } else if (Platform.OS === 'ios') {
    Geolocation.requestAuthorization();
  }

  // Fonction qui demande les droit de géolocalisation sous android
  async function requestLocationPermission() {
    try {
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
  }

  return (
    <Container>
      <OpenStreetMapScreen />
    </Container>
  );
};

export default App;
