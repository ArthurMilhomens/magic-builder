import * as React from 'react';
import { styles } from './styles';

import Filter from '../../components/Filter';
import { Text, View } from '../../components/Themed';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Filter />
    </View>
  );
};