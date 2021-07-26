import React, { createContext, useState, useEffect } from "react";
import { search } from "../services/search";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ContextData {
  cards: object | null;
  deck: object | null;
  loading: boolean;
  screen: boolean;
  searchCards({ query, colorOperator }: Search): Promise<void>;
  addCardToDeck(card: any): void;
  logout(): void;
};

interface Search {
  query: { cardName: String, text: String, type: String, colors: String, manaCost: String },
  colorOperator: String
};

const Context = createContext<ContextData>({} as ContextData);

export const ContextProvider: React.FC = ({ children }) => {
  const [cards, setCards] = useState<object | null>(null);
  const [deck, setDeck] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStorageData();
  }, []);

  async function loadStorageData() {
    const storagedDeck = await AsyncStorage.getItem('@RNAuth:deck');

    if (storagedDeck) {
      setDeck([JSON.parse(storagedDeck)]);
      setLoading(false);
    } else {
      setLoading(false)
    }
  }

  async function searchCards({ query, colorOperator }: Search) {
    const response = await search({ query, colorOperator });

    setCards(response.data.data);
  }

  async function addCardToDeck(card: any) {

    if (deck) {
      deck.push(card.card_faces ? card.card_faces[0].image_uris.normal : card.image_uris.normal);
      await AsyncStorage.setItem('@RNAuth:deck', JSON.stringify(deck))
      setDeck(deck)
    } else {
      await AsyncStorage.setItem('@RNAuth:deck', JSON.stringify(card.card_faces ? card.card_faces[0].image_uris.normal : card.image_uris.normal))
      setDeck([card.card_faces ? card.card_faces[0].image_uris.normal : card.image_uris.normal])
    }

  }

  function logout() {
    AsyncStorage.clear().then(() => {
      setDeck(null);
    })
  }

  return (
    <Context.Provider value={{ cards, deck, loading, screen: !!cards, searchCards, addCardToDeck, logout }}>
      {children}
    </Context.Provider>
  )
};

export default Context