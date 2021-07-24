import React, { useState, useContext } from 'react';
import { styles } from './styles';

import { View, Image, Pressable, FlatList } from 'react-native';

import Context from '../../context/context';

export default function DeckList() {
  const { deck } = useContext(Context);


  type Cards = Object[];
  const cardsToList: Cards = deck as object[];

  const formatData = (data:any, numColumns:number) => {
    if (cardsToList) {
      console.log(cardsToList)
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
        keyExtractor={(item: any) => item.id}
        numColumns={3}
        renderItem={({ item }:any) => {
          if (item.empty) {
            return <View style={styles.voidItem}/>
          }
          return (
            <Pressable style={[styles.card, styles.activeCard]}>
              <Image style={styles.image} source={{
                uri: `${item.card_faces ? item.card_faces[0].image_uris.normal : item.image_uris.normal}`,
              }} />
            </Pressable>
          )
        }}
      />
    </View>
  );
};