import './global';
import '@ethersproject/shims';
import 'expo-dev-client';
import './src/theme';

import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import WalletConnectProvider from '@walletconnect/react-native-dapp';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { store } from './src/store';
import ContractsListScreen from './src/screens/ContractsListScreen';
import WithFonts from './src/components/WithFonts';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <WalletConnectProvider
            redirectUrl={Linking.createURL('/')}
            storageOptions={{
              asyncStorage: AsyncStorage as never,
            }}
          >
            <WithFonts>
              <ContractsListScreen />
            </WithFonts>
          </WalletConnectProvider>
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}
