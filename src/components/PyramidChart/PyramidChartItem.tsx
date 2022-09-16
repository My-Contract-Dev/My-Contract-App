import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { formatNumber, randomColor } from '../../utils';
import { PyramidDataItem } from './types';

interface PyramidChartItemProps {
  item: PyramidDataItem;
  share: number;
}

export const PyramidChartItem: React.FC<PyramidChartItemProps> = ({
  item,
  share,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text body>{item.label}</Text>
        <View
          style={[
            styles.bar,
            {
              width: `${share * 100}%`,
              // backgroundColor: randomColor(item.label, 30),
            },
          ]}
        />
      </View>
      <View style={styles.value}>
        <Text body medium>
          {formatNumber(item.value, { compact: true })}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
  },
  value: {
    marginLeft: 24,
    alignItems: 'flex-end',
  },
  bar: {
    height: 2,
    marginTop: 8,
    backgroundColor: '#FF5C00',
  },
});
