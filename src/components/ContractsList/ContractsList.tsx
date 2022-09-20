import GlobalHeader from '../GlobalHeader';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { Button, View } from 'react-native-ui-lib';
import { useCallback, useState } from 'react';
import SuperScroll from '../SuperScroll';
import { Platform, StyleSheet } from 'react-native';
import { ContractListItem } from './ContractListItem';
import { ContractInterface } from '../../models';
import { useContractsList } from '../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, showAddContract, showPaywall } from '../../store';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ContractListProps {
  onContractClick: (contract: ContractInterface) => void;
}

export const ContractsList: React.FC<ContractListProps> = ({
  onContractClick,
}) => {
  const dispatch = useDispatch();
  const safeArea = useSafeAreaInsets();

  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

  const contracts = useContractsList();

  const onBottomSheetChange = useCallback(
    (index: number) => {
      setBottomSheetOpen(index === 1);
    },
    [setBottomSheetOpen]
  );

  const onAddClick = useCallback(() => {
    if (contracts.length >= 5) {
      dispatch(showPaywall('adding more then 5 contracts'));
    } else {
      dispatch(showAddContract());
    }
  }, [dispatch, contracts.length]);

  const addContractVisible = useSelector(
    (state: RootState) => state.addContract.visible
  );
  if (addContractVisible && Platform.OS === 'android') {
    return <View />;
  }

  return (
    <SuperScroll
      bottomSheetProps={{
        onChange: onBottomSheetChange,
        keyboardBlurBehavior: 'restore',
      }}
      bottomSheetChildren={(bsStyle) => (
        <BottomSheetFlatList
          style={bsStyle}
          contentContainerStyle={[
            styles.listContainer,
            {
              paddingBottom:
                safeArea.bottom + (Platform.OS === 'android' ? 40 : 0),
            },
          ]}
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
              <Button
                onPress={onAddClick}
                outline
                label="Add contract"
                size={Button.sizes.large}
              />
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
