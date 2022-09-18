import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native-ui-lib';
import { ContractInterface } from '../../models';
import EntypoIcons from '@expo/vector-icons/Entypo';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { DateLabel } from '../DateLabel';
import MetricView from '../MetricView';
import { useContractMetricsQuery } from '../../generated/graphql';
import { useEffect, useMemo } from 'react';

interface ContractHeaderProps {
  contract: ContractInterface;
  onBack?: () => void;
}

export const ContractHeader: React.FC<ContractHeaderProps> = ({
  contract,
  onBack,
}) => {
  const contractMetrics = useContractMetricsQuery({
    variables: {
      contract: {
        address: contract.address,
        chainId: contract.chainId,
      },
    },
    initialFetchPolicy: 'cache-and-network',
  });

  const metrics = useMemo(
    () => contractMetrics.data?.contractMetrics,
    [contractMetrics.data]
  );

  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={onBack}
        activeOpacity={0.7}
        style={styles.header}
      >
        {onBack && <EntypoIcons name="chevron-left" size={32} />}
        <View style={styles.titleContainer}>
          <Text
            body
            bold
            black
            h3
            style={styles.title}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {contract.name ?? contract.address}
          </Text>
          <Text
            style={styles.subtitle}
            disabled
            body
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {contract.name ? contract.address : 'Contract'}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.container}>
        <DateLabel />
        <View marginT-16>
          <MetricView
            value={metrics?.calls}
            caption="Total calls"
            size="big"
            compact={false}
          />
        </View>

        <View style={styles.subMetrics}>
          <MetricView
            compact={false}
            units="$"
            value={metrics?.balance}
            caption="Total balance"
            size="medium"
            style={styles.metricUnit}
          />
          <MetricView
            value={metrics?.users}
            size="medium"
            caption="Users"
            style={styles.metricUnit}
          />
          <MetricView
            value={metrics?.averageGasUsed}
            size="medium"
            caption="Average gas usage"
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
    marginTop: 24,
    marginBottom: -20,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {},
  subtitle: {},
  metricUnit: {
    marginRight: 32,
  },
  subMetrics: {
    flexDirection: 'row',
    marginTop: 16,
  },
});
