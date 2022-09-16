import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native-ui-lib';

export const DateLabel: React.FC = () => {
  return (
    <TouchableOpacity activeOpacity={0.8}>
      <View style={styles.container}>
        <Text primary caption bold>
          Last 7 days
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
});
