import {StyleSheet} from 'react-native';

export const stylesSigninSignup = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#26292F',
  },
  input: {
    margin: 15,
    height: 50,
    backgroundColor: '#1B1E22',
    borderRadius: 5,
    color: '#FFFFFF',
    paddingLeft: 20,

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
    alignSelf: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
  },
  btnRegister: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },
  btnRegisterColor: {
    color: '#68B684',
  },
  textRegister: {
    alignSelf: 'center',
    color: '#FFFFFF',
    marginTop: 20,
  },
});

export const stylesGame = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
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
