import { useMemo } from 'react';
import { SafeAreaView, StyleSheet, ViewProps } from 'react-native';
import { View } from 'react-native-ui-lib';
import { useSelector } from 'react-redux';
import { useAccountMetricsQuery } from '../../generated/graphql';
import { RootState } from '../../store';
import { DateLabel } from '../DateLabel';
import MetricView from '../MetricView';

type GlobalHeaderProps = ViewProps;

export const GlobalHeader: React.FC<GlobalHeaderProps> = ({ ...props }) => {
  const contracts = useSelector(
    (state: RootState) => state.contractsList.contracts
  );

  const metricsData = useAccountMetricsQuery({
    variables: {
      contracts: contracts.map((c) => ({
        address: c.address,
        chainId: c.chainId,
      })),
    },
    fetchPolicy: 'cache-and-network',
  });

  const metrics = useMemo(() => {
    return metricsData.data?.accountMetricsV2;
  }, [metricsData.data]);

  return (
    <SafeAreaView {...props}>
      <View style={styles.container}>
        <DateLabel />
        <View style={styles.mainMetric}>
          <MetricView
            compact={false}
            value={metrics?.calls}
            size="big"
            caption="Total calls"
            style={styles.metricUnit}
          />
        </View>
        <View style={styles.subMetrics}>
          <MetricView
            compact={false}
            value={metrics?.balanceInUsd}
            units="$"
            size="medium"
            caption="Total balance"
            style={styles.metricUnit}
          />
          <MetricView
            value={metrics?.users}
            size="medium"
            caption="Users"
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
    marginRight: 32,
  },
});
