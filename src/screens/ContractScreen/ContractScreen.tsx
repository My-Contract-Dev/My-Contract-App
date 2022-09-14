import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native-ui-lib';
import ScreenWrapper from '../../components/ScreenWrapper';
import { RootNavigationProps } from '../../models';

const ContractScreen: React.FC<
  NativeStackScreenProps<RootNavigationProps, 'Contract'>
> = ({ route }) => {
  const {
    params: { contract },
  } = route;

  return (
    <ScreenWrapper>
      <Text>{contract.address}</Text>
    </ScreenWrapper>
  );
};

export default ContractScreen;
