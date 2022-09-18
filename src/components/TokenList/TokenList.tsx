import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { BigNumber } from 'ethers';
import { StyleSheet } from 'react-native';
import { useAddressAssetsQuery } from '../../generated/graphql';
import { ContractInterface } from '../../models';
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
  });

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
