import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import GlobalHeader from '../GlobalHeader';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { Button, View } from 'react-native-ui-lib';
import { useCallback, useState } from 'react';
import SuperScroll from '../SuperScroll';
import { StyleSheet } from 'react-native';
import { ContractListItem } from './ContractListItem';

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
          contentContainerStyle={styles.listContainer}
          data={contracts}
          ItemSeparatorComponent={() => <View marginB-12 />}
          scrollEnabled={bottomSheetOpen}
          keyExtractor={(c) => [c.address, c.chainId].join('-')}
          renderItem={({ item }) => <ContractListItem contract={item} />}
          ListFooterComponent={() => (
            <View marginT-16 paddingH-24>
              <Button outline label="Add contract" size={Button.sizes.large} />
            </View>
          )}
        />
      )}
    >
      <GlobalHeader />
    </SuperScroll>
  );
};

const styles = StyleSheet.create({
  listContainer: {},
});
