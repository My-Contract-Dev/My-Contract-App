import './global';
import '@ethersproject/shims';
import 'expo-dev-client';
import './src/theme';

import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import WalletConnectProvider from '@walletconnect/react-native-dapp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { PersistGate } from 'redux-persist/integration/react';

import AppNavigation from './src/components/AppNavigation';
import { AppApolloProvider } from './src/providers';
import { persistor, store } from './src/store';
import WithFonts from './src/components/WithFonts';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AddContract from './src/components/AddContract';

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <WalletConnectProvider
              redirectUrl={Linking.createURL('/')}
              storageOptions={{
                asyncStorage: AsyncStorage as never,
              }}
            >
              <WithFonts>
                <AppApolloProvider>
                  <AppNavigation />
                  <AddContract />
                  <Toast />
                </AppApolloProvider>
              </WithFonts>
            </WalletConnectProvider>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}
