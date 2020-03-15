import React from 'react';
import {View, StyleSheet} from 'react-native';

import MapView, {MAP_TYPES} from 'react-native-maps';

const Map = () => {
  return (
    <View>
      <MapView
        provider={null}
        rotateEnabled={true}
        mapType={MAP_TYPES.STANDARD}
        userLocationUpdateInterval={1000}
        followsUserLocation
        showsCompass
        style={styles.map}
        showsUserLocation
      />
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: 400,
    height: 800,
  },
});
