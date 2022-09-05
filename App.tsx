import './global';
// import '@ethersproject/shims';
import 'expo-dev-client';

import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as Linking from 'expo-linking';
import WalletConnectProvider from '@walletconnect/react-native-dapp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import ConnectButton from './src/components/ConnectButton';
import { useCallback, useEffect, useState } from 'react';
import { store } from './src/store';

export default function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  // Handle user state changes
  const onAuthStateChanged = useCallback(
    (user: FirebaseAuthTypes.User | null) => {
      setUser(user);
      if (initializing) setInitializing(false);
    },
    [initializing]
  );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [onAuthStateChanged]);

  const redirectUrl = Linking.createURL('/');

  return (
    <Provider store={store}>
      <NavigationContainer>
        <WalletConnectProvider
          redirectUrl={redirectUrl}
          storageOptions={{
            asyncStorage: AsyncStorage as never,
          }}
        >
          <View style={styles.container}>
            <Text>{user?.email ?? 'Not authorized'}</Text>
            <ConnectButton />
            <StatusBar style="auto" />
          </View>
        </WalletConnectProvider>
      </NavigationContainer>
    </Provider>
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
