import React, { useState, useContext } from 'react';
import { styles } from './styles';

import { Text, View, TextInput, Image, Pressable, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-community/picker';

import Context from '../../context/context';

export default function Filter() {
  const [query, setQuery] = useState({ cardName: '', text: '', type: '', colors: '', manaCost: '' });
  const [colorOperator, setColorOperator] = useState('=');
  const { searchCards } = useContext(Context);
  const [loadingCards, setLoadingCards] = useState(false);

  interface Color {
    color: string
  };

  interface Search {
    query: { cardName: String, text: String, type: String, colors: String, manaCost: String },
    colorOperator: String
  };

  interface Screen {
    screen: false
  }

  function addColorsToSearch({ color }:Color){
    setQuery({...query, colors: query.colors.includes(color) ? query.colors.replace(color, '') : (query.colors.concat(color))})
  }

  function submit(query:Search){
    setLoadingCards(true);

    searchCards(query).finally(() => {
      setLoadingCards(false);
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.line}>
        <Text style={styles.label}>Card Name</Text>
        <TextInput style={styles.input} placeholderTextColor="#919191" placeholder="Ugin, Valkas, Nicol Bolas..." onChangeText={e => setQuery({ ...query, cardName: e })} />
      </View>

      <View style={styles.line}>
        <Text style={styles.label}>Text</Text>
        <TextInput style={styles.input} placeholderTextColor="#919191" placeholder="Draw a card, Flying, Exile..." onChangeText={e => setQuery({ ...query, text: e })} />
      </View>

      <View style={styles.line}>
        <Text style={styles.label}>Type</Text>
        <TextInput style={styles.input} placeholderTextColor="#919191" placeholder="Creature, Dragon, Instant..." onChangeText={e => setQuery({ ...query, type: e })} />
      </View>

      <View style={styles.line}>
        <Text style={styles.label}>Colors</Text>
        <View>
          <View style={styles.colors}>
            <Pressable style={[styles.image, query.colors.includes('W') && styles.activeImage]} onPress={() => addColorsToSearch({color: 'W'})}>
              <Image source={require('../../assets/mana/White.png')}/>
            </Pressable>
            <Pressable style={[styles.image, query.colors.includes('U') && styles.activeImage]} onPress={() => addColorsToSearch({color: 'U'})}>
              <Image source={require('../../assets/mana/blue.png')}/>
            </Pressable>
            <Pressable style={[styles.image, query.colors.includes('B') && styles.activeImage]} onPress={() => addColorsToSearch({color: 'B'})}>
              <Image source={require('../../assets/mana/Black.png')}/>
            </Pressable>
            <Pressable style={[styles.image, query.colors.includes('R') && styles.activeImage]} onPress={() => addColorsToSearch({color: 'R'})}>
              <Image source={require('../../assets/mana/Red.png')}/>
            </Pressable>
            <Pressable style={[styles.image, query.colors.includes('G') && styles.activeImage]} onPress={() => addColorsToSearch({color: 'G'})}>
              <Image source={require('../../assets/mana/Green.png')}/>
            </Pressable>
            <Pressable style={[styles.image, query.colors.includes('C') && styles.activeImage]} onPress={() => addColorsToSearch({color: 'C'})}>
              <Image source={require('../../assets/mana/Colorless.png')}/>
            </Pressable>
          </View>
          <View style={{ height: 50, width: 250, borderBottomWidth: 1, borderBottomColor: '#62d8ff' }}>
            <Picker
              selectedValue={colorOperator}
              style={{ height: 50, width: 250, color: '#e6e6e6' }}
              onValueChange={(itemValue, itemIndex) => setColorOperator(itemValue.toString())}
            >
              <Picker.Item label="Exactly these colors" value="=" />
              <Picker.Item label="Including these colors" value=">=" />
              <Picker.Item label="At most these colors" value="<=" />
            </Picker>
          </View>
        </View>
      </View>

      <View style={styles.line}>
        <Text style={styles.label}>Mana Cost</Text>
        <TextInput style={styles.input} placeholderTextColor="#919191" placeholder='Ex. "{2}{R}{U}" - {U} Blue, {B} Black, {R} Red, {G} Green, {W} White, {C} Colorless' onChangeText={e => setQuery({ ...query, manaCost: e })} />
      </View>

      <Pressable disabled={loadingCards} style={styles.button} onPress={() => submit({query, colorOperator})}>
          {loadingCards ?
            <ActivityIndicator color="white" size={30} /> :
            <Text>
              ENVIAR
            </Text>}
        </Pressable>

    </View>
  );
};