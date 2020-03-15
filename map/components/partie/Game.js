import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import {Text} from 'native-base';
import request from '../../utils/request';
import {getData} from '../../utils/asyncStorage';

const App = () => {
  const [games, setGames] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    request
      .get('/games', {
        headers: {
          Authorization: 'Bearer ' + getData('token'),
        },
      })
      .then(res => {
        setGames(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  console.log(games);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.gameText}>Partie privée</Text>
        <View style={styles.row}>
          <TextInput
            style={styles.input1}
            placeholder="Adresse IP"
            placeholderTextColor="#D2D2D2"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input2}
            placeholder="Port"
            placeholderTextColor="#D2D2D2"
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Jouer</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.gameText}>Parties publiques</Text>
        {loading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text>{error.message}</Text>
        ) : (
          games && (
            <View>
              <FlatList
                keyExtractor={item => item.id}
                data={games}
                renderItem={({item}) => (
                  <Text style={styles.item}>
                    <Text style={styles.gameNameText}>{item.Config.name}</Text>{' '}
                    -{' '}
                    <Text style={styles.gameModeText}>
                      {item.Config.gameMode}
                    </Text>
                  </Text>
                )}
              />
            </View>
          )
        )}
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#26292F',
  },
  input1: {
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 20,
    height: 50,
    backgroundColor: '#1B1E22',
    borderRadius: 5,
    color: '#FFFFFF',
    flex: 0.7,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,

    elevation: 20,
  },
  input2: {
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 20,
    height: 50,
    backgroundColor: '#1B1E22',
    borderRadius: 5,
    color: '#FFFFFF',
    flex: 0.3,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,

    elevation: 20,
  },
  submitButton: {
    backgroundColor: '#68B684',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginBottom: 20,
  },
  submitButtonText: {
    color: '#FFFFFF',
  },
  gameText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 30,
    marginLeft: 15,
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    marginTop: 20,
  },
  item: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    padding: 20,
    backgroundColor: '#1B1E22',
    borderRadius: 5,
    overflow: 'hidden', // Pour que le borderRadius soit visible ...
  },
  gameNameText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  gameModeText: {
    color: '#68B684',
    fontSize: 20,
  },
});
