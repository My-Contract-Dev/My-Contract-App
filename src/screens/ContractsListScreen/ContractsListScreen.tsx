import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { ContractsList } from '../../components/ContractsList';
import ScreenWrapper from '../../components/ScreenWrapper';
import { ContractInterface, MainScreenNavigationProp } from '../../models';

export const ContractsListScreen: React.FC = () => {
  const navigation = useNavigation<MainScreenNavigationProp>();

  const onContractClick = useCallback(
    (contract: ContractInterface) => {
      navigation.navigate('Contract', { contract });
    },
    [navigation]
  );

  return (
    <ScreenWrapper>
      <ContractsList onContractClick={onContractClick} />
    </ScreenWrapper>
  );
};
