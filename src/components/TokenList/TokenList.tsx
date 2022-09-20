import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { BigNumber } from 'ethers';
import { StyleSheet } from 'react-native';
import { SkeletonView } from 'react-native-ui-lib';
import { useAddressAssetsQuery } from '../../generated/graphql';
import { ContractInterface } from '../../models';
import ErrorPlaceholder from '../ErrorPlaceholder';
import { TokenListItem } from './TokenListItem';

interface TokenListProps {
  contract: ContractInterface;
}

const TokenList: React.FC<TokenListProps> = ({ contract }) => {
  const assets = useAddressAssetsQuery({
    variables: {
      address: {
        address: contract.address,
        chainId: contract.chainId,
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  const showSkeleton = assets.loading && assets.data === undefined;

  if (assets.error && !assets.data) {
    return (
      <ErrorPlaceholder
        onRetry={assets.refetch}
        title="Oops, failed to load assets"
      />
    );
  }

  if (showSkeleton) {
    return (
      <BottomSheetFlatList
        data={[0, 1, 2, 3, 4]}
        renderItem={() => (
          <SkeletonView template={SkeletonView.templates.LIST_ITEM} />
        )}
      />
    );
  }

  return (
    <BottomSheetFlatList
      contentContainerStyle={styles.container}
      data={assets.data?.addressAssets.assets ?? []}
      renderItem={(asset) => (
        <TokenListItem
          amount={BigNumber.from(asset.item.balance)}
          decimals={asset.item.decimals}
          amountInUsd={asset.item.inUsd}
          name={asset.item.name}
          address={asset.item.name}
          color="#DB5A3F"
          symbol={asset.item.symbol ?? undefined}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
  },
});

export default TokenList;
