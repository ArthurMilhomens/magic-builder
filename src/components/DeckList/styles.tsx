import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#04020e',
    width: '100%',
  },
 card: {
   flexGrow: 1,
   margin: 10,
   flexBasis: 0,
   height: Dimensions.get('window').width / 2,
   alignItems: 'center',
   justifyContent: 'center',
   borderRadius: 20,
  },
  image: {
   borderRadius: 20,
   height: '98%',
   width: '97%',
   resizeMode: 'stretch'
 },
 voidItem: {
  flexGrow: 1,
  margin: 10,
  flexBasis: 0,
  height: Dimensions.get('window').width / 2,
  backgroundColor: 'transparent',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 20,
 },
 activeCard: {
  backgroundColor: '#62d8ff',
 }
});
