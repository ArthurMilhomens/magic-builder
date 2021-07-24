import React, { createContext, useState, useEffect } from "react";
import { search } from "../services/search";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ContextData {
  cards: object | null;
  deck: object | null;
  loading: boolean;
  screen: boolean;
  searchCards({ query, colorOperator}:Search) : Promise<void>;
  addCardToDeck(card:any): void;
};

interface Search {
  query: { cardName: String, text: String, type: String, colors: String, manaCost: String },
  colorOperator: String
};

const Context = createContext<ContextData>({} as ContextData);

export const ContextProvider: React.FC = ({ children }) => {
  const [cards, setCards] = useState<object | null>(null);
  const [deck, setDeck] = useState<object | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storagedDeck = await AsyncStorage.getItem('@RNAuth:deck');

      if (storagedDeck) {
        setDeck([JSON.parse(storagedDeck)]);
        setLoading(false);
      } else {
        setLoading(false)
      }
    }

    loadStorageData();
  });

  async function searchCards({ query, colorOperator }:Search){
    const response = await search({query, colorOperator});

    setCards(response.data.data);
  }

  async function addCardToDeck(card:any) {
    deck === null ? await AsyncStorage.setItem('@RNAuth:deck', JSON.stringify(card)) : await AsyncStorage.mergeItem('@RNAuth:deck', JSON.stringify(card));
    const storagedDeck = await AsyncStorage.getItem('@RNAuth:deck');

    setDeck(storagedDeck ? [JSON.parse(storagedDeck)] : null)
  }

  return (
    <Context.Provider value={{cards, deck, loading, screen: !!cards, searchCards, addCardToDeck}}>
      {children}
    </Context.Provider>
  )
};

export default Context