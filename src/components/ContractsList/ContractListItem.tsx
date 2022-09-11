import { StyleSheet, Text, View } from 'react-native';

export const ContractListItem: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>ContractListItem</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
});
