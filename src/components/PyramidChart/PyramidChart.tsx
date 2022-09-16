import { StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';
import { PyramidChartItem } from './PyramidChartItem';
import { PyramidDataItem } from './types';

interface PyramidChartProps {
  data: PyramidDataItem[];
}

export const PyramidChart: React.FC<PyramidChartProps> = ({ data }) => {
  const maxValue = Math.max(...data.map((item) => item.value));
  return (
    <View style={styles.container}>
      {data.map((item) => (
        <PyramidChartItem
          key={[item.label, item.value].join('-')}
          share={item.value / maxValue}
          item={item}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
