import { SafeAreaView, StyleSheet } from 'react-native';
import { ContractsList } from '../../components/ContractsList';

export const ContractsListScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ContractsList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
