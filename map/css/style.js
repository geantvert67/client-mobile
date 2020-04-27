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
  textSecondary: {
    color: '#D2D2D2',
    marginLeft: 15,
    fontStyle: 'italic',
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
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
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
  up: {
    paddingBottom: 50,
  },
});

export const stylesMap = StyleSheet.create({
  menu: {
    position: 'absolute',
    bottom: 10,
    right: 20,
  },

  callout: {
    backgroundColor: '#26292F',
    width: 100,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
    margin: 0,
  },

  modal: {
    backgroundColor: '#26292F',
    marginTop: 500,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
  },

  score: {
    color: 'white',
    position: 'absolute',
    right: 0,
    fontSize: 20,
  },

  teamScore: {
    color: 'gold',
    position: 'absolute',
    right: 0,
    fontSize: 20,
  },

  teamName: {
    color: 'gold',
    fontSize: 20,
  },

  titleModal: {
    color: 'white',
    fontSize: 20,
    position: 'absolute',
    left: 10,
  },

  timerBox: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  timerText: {
    color: 'white',
    fontSize: 20,
  },

  inventoryItem: {
    marginLeft: 27,
    marginTop: 20,
    width: 50,
    height: 50,
    backgroundColor: '#1B1E22',
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },

  inventorySelectedItem: {
    marginLeft: 10,
    marginBottom: 20,
    width: 90,
    height: 90,
    backgroundColor: '#1B1E22',
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },

  selectedItemImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },

  selectedItemBox: {
    alignItems: 'stretch',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 50,
    marginLeft: 10,
    alignContent: 'space-between',
  },

  selectedItemButtonsBox: {
    position: 'absolute',
    right: 25,
  },

  itemName: {
    color: 'white',
    fontWeight: 'bold',
  },

  itemDescription: {
    color: 'white',
    fontStyle: 'italic',
    fontSize: 12,
    marginLeft: 3,
  },
});
