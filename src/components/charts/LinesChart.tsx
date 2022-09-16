import { Dimensions, ViewStyle } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { formatNumber } from '../../utils';

interface LinesChartDataItem {
  label: string;
  values: Record<string, number>;
}

interface LinesChartProps {
  data: LinesChartDataItem[];
  style?: Partial<ViewStyle>;
}

export const LinesChart: React.FC<LinesChartProps> = ({ data, style }) => {
  return (
    <LineChart
      formatYLabel={(value) => formatNumber(Number(value))}
      style={style}
      width={Dimensions.get('window').width}
      height={220}
      segments={2}
      data={{
        labels: ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven'],
        datasets: [
          {
            data: [10, 18, 30, 34, 23, 55, 32, 12],
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
          },
          {
            data: [10, 32, 40, 24, 15, 32, 45, 32],
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
          },
        ],
      }}
      chartConfig={{
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
        backgroundColor: 'white',
        backgroundGradientFrom: 'white',
        backgroundGradientTo: 'white',
      }}
      bezier
      withDots={false}
    />
  );
};
