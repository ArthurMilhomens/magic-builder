import React, { useContext } from 'react';
import { styles } from './styles';

import { View, Image, Pressable, FlatList } from 'react-native';

import Context from '../../context/context';

export default function DeckList() {
  const { deck } = useContext(Context);

  
  
  type Cards = Object[];
  const cardsToList: Cards = deck as object[];
  
  console.log('data -> ', cardsToList)
  const formatData = (data:any, numColumns:number) => {
    if (cardsToList) {
      const numberOfFullRows = Math.floor(cardsToList.length / numColumns);
  
      let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
      while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
        data.push({ empty: true });
        numberOfElementsLastRow = numberOfElementsLastRow + 1
      }
    }

    return data
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={formatData(cardsToList, 3)}
        // data={cardsToList}
        keyExtractor={(item: any,) => item}
        numColumns={3}
        renderItem={({ item }:any) => {
          if (item.empty) {
            return <View style={styles.voidItem}/>
          }
          return (
            <Pressable style={styles.card}>
              <Image style={styles.image} source={{
                uri: `${item}`,
              }} />
            </Pressable>
          )
        }}
      />
    </View>
  );
};