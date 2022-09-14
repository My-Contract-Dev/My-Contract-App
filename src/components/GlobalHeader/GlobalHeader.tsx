import { SafeAreaView, StyleSheet, ViewProps } from 'react-native';
import { View } from 'react-native-ui-lib';
import { DateLabel } from '../DateLabel';
import MetricView from '../MetricView';

type GlobalHeaderProps = ViewProps;

export const GlobalHeader: React.FC<GlobalHeaderProps> = ({ ...props }) => {
  return (
    <SafeAreaView {...props}>
      <View style={styles.container}>
        <DateLabel />
        <View style={styles.mainMetric}>
          <MetricView
            compact={false}
            value={2322}
            units="$"
            size="big"
            caption="Total balance"
          />
        </View>
        <View style={styles.subMetrics}>
          <MetricView
            value={1200}
            size="medium"
            caption="Transactions"
            style={styles.metricUnit}
          />
          <MetricView
            value={20100}
            units="$"
            size="medium"
            caption="Transactions value"
            style={styles.metricUnit}
          />
        </View>
        <View style={styles.subMetrics}>
          <MetricView
            value={539}
            size="medium"
            caption="Users"
            style={styles.metricUnit}
          />
          <MetricView
            value={6100000}
            size="medium"
            caption="Gas used"
            style={styles.metricUnit}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginTop: 20,
  },
  mainMetric: {
    marginTop: 20,
  },
  subMetrics: {
    flexDirection: 'row',
    marginTop: 20,
  },
  metricUnit: {
    flex: 1,
  },
});
