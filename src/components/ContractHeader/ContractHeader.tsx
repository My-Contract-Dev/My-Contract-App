import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native-ui-lib';
import { ContractInterface } from '../../models';
import EntypoIcons from '@expo/vector-icons/Entypo';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { DateLabel } from '../DateLabel';
import MetricView from '../MetricView';

interface ContractHeaderProps {
  contract: ContractInterface;
  onBack?: () => void;
}

export const ContractHeader: React.FC<ContractHeaderProps> = ({
  contract,
  onBack,
}) => {
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
            units="$"
            value={7628}
            caption="Total balance"
            size="big"
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
