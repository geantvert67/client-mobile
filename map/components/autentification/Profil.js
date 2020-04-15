import React, {useState} from 'react';
import {Text, View} from 'native-base';
import {TouchableOpacity} from 'react-native';
import {stylesGame} from '../../css/style';
import {useAuth} from '../../utils/auth';

const Profil = () => {
  const {user, signout} = useAuth();

  return (
    user && (
      <>
        <View style={stylesGame.container}>
          <Text style={stylesGame.gameText}>Mon profil</Text>
          <Text style={stylesGame.submitButtonText}>
            Connecté en tant que {user.username}
          </Text>
          <View>
            <TouchableOpacity
              style={stylesGame.submitButton}
              onPress={() => signout()}>
              <Text style={stylesGame.submitButtonText}> Se déconnecter </Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    )
  );
};

export default Profil;
