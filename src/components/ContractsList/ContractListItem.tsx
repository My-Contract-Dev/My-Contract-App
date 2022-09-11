import { StyleSheet, Text, View } from 'react-native';
import { ContractInterface } from '../../models';

interface ContractListItemProps {
  contract: ContractInterface;
}

export const ContractListItem: React.FC<ContractListItemProps> = ({
  contract,
}) => {
  return (
    <View style={styles.container}>
      <Text>{contract.address}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
});
