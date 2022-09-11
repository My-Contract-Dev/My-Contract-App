import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import GlobalHeader from '../GlobalHeader';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { Text } from 'react-native-ui-lib';
import { useCallback, useState } from 'react';
import SuperScroll from '../SuperScroll';
import { StyleSheet } from 'react-native';

export const ContractsList: React.FC = () => {
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

  const contracts = useSelector(
    (state: RootState) => state.contractsList.contracts
  );

  const onBottomSheetChange = useCallback(
    (index: number) => {
      setBottomSheetOpen(index === 1);
    },
    [setBottomSheetOpen]
  );

  return (
    <SuperScroll
      bottomSheetProps={{
        onChange: onBottomSheetChange,
      }}
      bottomSheetChildren={(bsStyle) => (
        <BottomSheetFlatList
          style={bsStyle}
          contentContainerStyle={styles.scroll}
          data={contracts}
          scrollEnabled={bottomSheetOpen}
          keyExtractor={(c) => [c.address, c.chainId].join('-')}
          renderItem={({ item }) => <Text>{item.address}</Text>}
        />
      )}
    >
      <GlobalHeader />
    </SuperScroll>
  );
};

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: 'red',
  },
});
