import React, { useState, useContext } from 'react';
import { styles } from './styles';

import { View, Image, Pressable, FlatList } from 'react-native';

import Context from '../../context/context';

export default function CardList() {
  const { cards, addCardToDeck, deck } = useContext(Context);
  const [markedCards, setMarkedCards] = useState(['']);

  type Cards = Object[];
  const cardsToList: Cards = cards as object[];
  const deckToList: Cards = deck as object[];

  const formatData = (data:any, numColumns:number) => {
    const numberOfFullRows = Math.floor(cardsToList.length / numColumns);

    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
      data.push({ empty: true });
      numberOfElementsLastRow = numberOfElementsLastRow + 1
    }

    return data
  }

  function add(card:string){
    markedCards.push(card);
    addCardToDeck(card);
    setMarkedCards(markedCards);
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
            <Pressable onPress={() => add(item)} 
            style={[styles.card, ((deckToList && deckToList.includes(`${item.card_faces ? item.card_faces[0].image_uris.normal : item.image_uris.normal}`)) || markedCards.includes(`${item.card_faces ? item.card_faces[0].image_uris.normal : item.image_uris.normal}`)) && styles.activeCard]}>
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