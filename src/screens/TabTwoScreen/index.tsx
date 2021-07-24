import React from 'react';
import { styles } from './styles';

import { View } from '../../components/Themed';

import DeckList from '../../components/DeckList';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <DeckList />
    </View>
  );
};