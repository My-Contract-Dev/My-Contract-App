import './global';
import 'expo-dev-client';

import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import * as Linking from 'expo-linking';
import WalletConnectProvider from '@walletconnect/react-native-dapp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ConnectButton from './src/components/ConnectButton';

export default function App() {
  return (
    <NavigationContainer>
      <WalletConnectProvider
        redirectUrl={Linking.createURL('/')}
        storageOptions={{
          asyncStorage: AsyncStorage as never,
        }}
      >
        <View style={styles.container}>
          <ConnectButton />
          <StatusBar style="auto" />
        </View>
      </WalletConnectProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
