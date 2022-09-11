import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import GlobalHeader from '../GlobalHeader';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { Text } from 'react-native-ui-lib';
import { useCallback, useState } from 'react';
import { SuperScroll } from '../SuperScroll';

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
