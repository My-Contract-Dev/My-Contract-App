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
import * as Sentry from '@sentry/react-native';

import AppNavigation from './src/components/AppNavigation';
import { AppApolloProvider } from './src/providers';
import { persistor, store } from './src/store';
import WithFonts from './src/components/WithFonts';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AddContract from './src/components/AddContract';
import PayWall from './src/components/PayWall';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

Sentry.init({
  dsn: 'https://08a9f9d4dbba45e0a422b3afc7a6704b@o1418233.ingest.sentry.io/6761121',
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
  environment: __DEV__ ? 'development' : 'production',
});

function App() {
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
                  <PayWall />
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

export default Sentry.wrap(gestureHandlerRootHOC(App));
