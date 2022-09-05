import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { useCallback, useEffect, useState } from 'react';
import { Button } from 'react-native';
import { useSelector } from 'react-redux';
import { useEthersProvider } from '../../hooks';
import { RootState } from '../../store';

export const ConnectButton = () => {
  const connector = useWalletConnect();
  const provider = useEthersProvider();
  const isAuthorized = useSelector((state: RootState) => state.auth.authorized);

  const onConnect = useCallback(async () => {
    await connector.connect();
  }, [connector]);

  const onDisconnect = useCallback(async () => {
    await connector.killSession();
  }, [connector]);

  useEffect(() => {
    if (!isAuthorized) {
      // TODO: not working
      provider.getSigner().signMessage('Hello!');
    }
  }, [provider, isAuthorized]);

  if (!connector.connected) {
    return <Button onPress={onConnect} title="Connect" />;
  }
  return <Button onPress={onDisconnect} title="Disconnect" />;
  // return <Text>{connector.accounts[0]}</Text>;
};
