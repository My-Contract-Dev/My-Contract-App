import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { ReactNode, useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistCache } from 'apollo3-cache-persist';
import { View } from 'react-native-ui-lib';

const cache = new InMemoryCache();

export const AppApolloProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [client, setClient] = useState<
    ApolloClient<NormalizedCacheObject> | undefined
  >();

  useEffect(() => {
    persistCache({
      cache,
      storage: AsyncStorage,
    }).then(() => {
      setClient(
        new ApolloClient({
          uri: 'https://api.mycontract.dev/graphql/',
          // uri: 'http://localhost:3000/graphql/',
          cache,
          defaultOptions: {
            query: {
              pollInterval: 30000,
            },
          },
        })
      );
    });
  }, []);
  if (!client) {
    return <View />;
  }
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
