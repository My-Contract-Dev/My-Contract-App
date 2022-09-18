import GlobalHeader from '../GlobalHeader';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { Button, View } from 'react-native-ui-lib';
import { useCallback, useState } from 'react';
import SuperScroll from '../SuperScroll';
import { StyleSheet } from 'react-native';
import { ContractListItem } from './ContractListItem';
import { ContractInterface } from '../../models';
import { useContractsList } from '../../hooks';

interface ContractListProps {
  onContractClick: (contract: ContractInterface) => void;
}

export const ContractsList: React.FC<ContractListProps> = ({
  onContractClick,
}) => {
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

  const contracts = useContractsList();

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
          renderItem={({ item }) => (
            <ContractListItem
              onClick={() => onContractClick(item)}
              contract={item}
            />
          )}
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
