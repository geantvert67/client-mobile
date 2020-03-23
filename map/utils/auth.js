import React, {useState, useEffect, createContext, useContext} from 'react';
import request from './request';
import {Text} from 'native-base';
import {storeData} from './asyncStorage';
import {Actions} from 'react-native-router-flux';

import io from 'socket.io-client';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const socket = user && io('http://127.0.0.1:8888?username=' + user.username);

  useEffect(() => {
    request
      .get('/user')
      .then(res => {
        setUser(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Text h4>Loading...</Text>;
  }

  const signin = credentials => {
    return request
      .post('/signin', credentials)
      .then(res => {
        storeData('token', res.data.token);
        setUser(res.data.user);
        Actions.Game();
      })
      .catch(e => console.log(e));
  };

  const signup = credentials => {
    return request
      .post('/signup', credentials)
      .then(res => {
        storeData('token', res.data.token);
        setUser(res.data.user);
        Actions.Signin();
      })
      .catch(e => console.log(e));
  };

  return (
    <AuthContext.Provider value={{user, signin, signup, socket}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
