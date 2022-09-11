import { FlatList, StyleSheet, View } from 'react-native';
import { ContractListItem } from './ContractListItem';

export const ContractsList: React.FC = () => {
  return (
    <View style={styles.container}>
      <FlatList data={[{}, {}, {}]} renderItem={() => <ContractListItem />} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
