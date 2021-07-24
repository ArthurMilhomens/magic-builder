import React, { useContext } from 'react';
import { styles } from './styles';

import Filter from '../../components/Filter';
import CardList from '../../components/CardList';
import { View } from '../../components/Themed';
import Context from '../../context/context';

export default function TabOneScreen() {
  const { screen } = useContext(Context);
  return (
    <View style={styles.container}>
      {screen ? <CardList /> : <Filter />}
    </View>
  );
};