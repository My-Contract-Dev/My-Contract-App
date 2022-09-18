import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ReactNode, useMemo } from 'react';

export const AppApolloProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const client = useMemo(() => {
    return new ApolloClient({
      // uri: 'https://api.mycontract.dev/graphql/',
      uri: 'http://localhost:3000/graphql/',
      cache: new InMemoryCache(),
      defaultOptions: {
        query: {
          pollInterval: 30000,
        },
      },
    });
  }, []);
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
