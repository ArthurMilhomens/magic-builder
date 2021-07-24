import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ContextProvider } from './src/context/context';

import useCachedResources from './src/hooks/useCachedResources';
import Navigation from './src/navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ContextProvider>
          <Navigation colorScheme='dark' />
          <StatusBar backgroundColor="#fff" />
        </ContextProvider>
      </SafeAreaProvider>
    );
  }
}
