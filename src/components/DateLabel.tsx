import { useCallback } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { useDispatch } from 'react-redux';
import { showPaywall } from '../store';

export const DateLabel: React.FC = () => {
  const dispatch = useDispatch();

  const onPress = useCallback(() => {
    dispatch(showPaywall());
  }, [dispatch]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
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
