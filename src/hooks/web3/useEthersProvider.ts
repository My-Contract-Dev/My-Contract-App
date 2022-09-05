import { useWalletConnect } from '@walletconnect/react-native-dapp';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { providers } from 'ethers';
import { useEffect, useMemo } from 'react';

export const useEthersProvider = (): providers.Web3Provider => {
  const connector = useWalletConnect();
  const provider = useMemo(() => {
    return new WalletConnectProvider({
      connector,
      rpc: {
        80001:
          'https://polygon-mumbai.g.alchemy.com/v2/yo3ESMJ8Ji2jbOh1v2LcB6CazCTGNyMC',
      },
    });
  }, [connector]);

  useEffect(() => {
    provider.enable().catch(() => undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider.connected]);

  const ethersProvider = useMemo(
    () => new providers.Web3Provider(provider),
    [provider]
  );
  return ethersProvider;
};
