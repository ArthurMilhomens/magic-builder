import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#04020e',
    width: '100%',
    overflow: 'scroll',
  },
  input: {
    borderBottomWidth: 1, 
    borderBottomColor: '#62d8ff',
    paddingTop: 5,
    fontSize: 16,
    maxWidth: '70%',
    color: '#e6e6e6'
  },
  label: {
    color: '#e6e6e6',
    fontSize: 20
  },
  line: {
    paddingBottom: 50,
    paddingTop: 50,
    marginLeft: 40,
    maxWidth: '90%',
    borderBottomWidth: 1,
    borderBottomColor: '#91919124'
  },
  colors: {
    flexDirection: 'row',
    margin: 20,
    marginLeft: 0
  },
  image: {
    marginRight: 10,
    width: 45,
    height: 45,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  activeImage: {
    backgroundColor: "#62d8ff",
  },
  button: {
    backgroundColor: 'red',
    width: '20%',
    paddingVertical: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
