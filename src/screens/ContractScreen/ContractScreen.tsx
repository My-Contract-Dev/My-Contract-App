import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback } from 'react';
import ContractDetails from '../../components/ContractDetails';
import ContractHeader from '../../components/ContractHeader';
import ScreenWrapper from '../../components/ScreenWrapper';
import SuperScroll from '../../components/SuperScroll';
import { RootNavigationProps } from '../../models';

const ContractScreen: React.FC<
  NativeStackScreenProps<RootNavigationProps, 'Contract'>
> = ({ route, navigation }) => {
  const {
    params: { contract },
  } = route;

  const onBack = useCallback(() => navigation.pop(), [navigation]);

  return (
    <ScreenWrapper>
      <SuperScroll
        bottomSheetChildren={(style) => (
          <ContractDetails style={style} contract={contract} />
        )}
      >
        <ContractHeader onBack={onBack} contract={contract} />
      </SuperScroll>
    </ScreenWrapper>
  );
};

export default ContractScreen;
