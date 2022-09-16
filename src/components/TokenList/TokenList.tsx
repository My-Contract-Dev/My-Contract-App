import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { BigNumber } from 'ethers';
import { StyleSheet } from 'react-native';
import { TokenListItem } from './TokenListItem';

const TokenList: React.FC = () => {
  const data: unknown[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <BottomSheetFlatList
      contentContainerStyle={styles.container}
      data={data}
      renderItem={() => (
        <TokenListItem
          amount={BigNumber.from(1230)}
          amountInUsd={1323}
          name="Evmos"
          address="0x123"
          color="#DB5A3F"
          symbol="EVM"
          icon="https://www.covalenthq.com/static/images/icons/display-icons/evmos-logo.svg"
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
