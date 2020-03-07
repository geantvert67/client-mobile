import React, {Component, useState} from 'react';
import {View, StyleSheet, StatusBar, Image, Dimensions} from 'react-native';
import {
  Button,
  Container,
  Header,
  Left,
  Right,
  Icon,
  Text,
  Radio,
} from 'native-base';
import MapView, {MAP_TYPES, PROVIDER_DEFAULT, UrlTile} from 'react-native-maps';

const {width, height} = Dimensions.get('window');

const OpenStreetMapScreen = () => {
  return (
    <Container>
      <Header>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: 'white'}}>CrystalZ</Text>
        </View>
      </Header>
      <View>
        <MapView
          provider={null}
          rotateEnabled={true}
          mapType={MAP_TYPES.STANDARD}
          userLocationUpdateInterval={1000}
          followsUserLocation
          showsCompass
          style={{flex: 1}}
          style={styles.map}
          showsUserLocation
        />
      </View>
    </Container>
  );
};

/*class OpenStreetMapScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'OpenStreetMap',
    drawerIcon: ({tintColor}) => (
      <Image
        source={require('./img/Openstreetmap_logo.jpg')}
        style={{width: 40, height: 40}}
      />
    ),
  };
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    };
  }

  get mapType() {
    return this.props.provider === PROVIDER_DEFAULT
      ? MAP_TYPES.STANDARD
      : MAP_TYPES.NONE;
  }
  render() {
    return (
      <Container>
        <Header>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: 'white'}}>OpenStreetMap</Text>
          </View>
        </Header>
        <View>
          <MapView
            region={this.state.region}
            provider={null}
            mapType={this.mapType}
            rotateEnabled={false}
            style={{flex: 1}}
            style={styles.map}
            showsUserLocation>
            <UrlTile
              urlTemplate="http://a.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
              maximumZ={19}
            />
          </MapView>
        </View>
      </Container>
    );
  }
}*/

export default OpenStreetMapScreen;

const styles = StyleSheet.create({
  map: {
    width: 400,
    height: 800,
  },
});
