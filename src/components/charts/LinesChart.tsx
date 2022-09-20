import { useMemo } from 'react';
import { Dimensions, ViewStyle } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { format } from 'date-fns';
import { formatNumber } from '../../utils';

interface LinesChartDataItem {
  label: string;
  values: Record<string, number>;
}

interface LinesChartProps {
  data: LinesChartDataItem[];
  lines: string[];
  style?: Partial<ViewStyle>;
  formatXLabel?: (label: string) => string;
}

export const LinesChart: React.FC<LinesChartProps> = ({
  data,
  style,
  lines,
  formatXLabel,
}) => {
  const labels = useMemo(() => {
    return data.map((item) => item.label);
  }, [data]);
  return (
    <LineChart
      formatYLabel={(value) => formatNumber(Number(value), { compact: true })}
      formatXLabel={
        formatXLabel ??
        ((label) => {
          const t = new Date(label);
          return format(t, 'dd.MM');
        })
      }
      style={style}
      width={Dimensions.get('window').width}
      height={220}
      segments={2}
      data={{
        labels: labels,
        datasets: lines.map((line) => ({
          data: data.map((item) => item.values[line]),
          color: () => 'rgba(255, 92, 0, 1)', // optional
        })),
      }}
      chartConfig={{
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
        backgroundColor: 'white',
        backgroundGradientFrom: 'white',
        backgroundGradientTo: 'white',
        useShadowColorFromDataset: true,
      }}
      bezier
      fromZero
      withDots={false}
    />
  );
};
