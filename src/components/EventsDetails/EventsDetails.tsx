import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { Colors, Text, View } from 'react-native-ui-lib';
import { useEventsDetailsQuery } from '../../generated/graphql';
import { ContractInterface } from '../../models';
import { LinesChart } from '../charts';
import PyramidChart from '../PyramidChart';

const Section = (props: { children: string }) => (
  <View marginV-16 marginH-24>
    <Text h3>{props.children}</Text>
    <View
      marginT-8
      style={{
        width: '100%',
        height: 1,
        backgroundColor: Colors.disabled,
        opacity: 0.2,
      }}
    />
  </View>
);

interface EventsDetailsProps {
  contract: ContractInterface;
}

export const EventsDetails: React.FC<EventsDetailsProps> = ({ contract }) => {
  const eventsQuery = useEventsDetailsQuery({
    variables: {
      contract: {
        address: contract.address,
        chainId: contract.chainId,
      },
    },
  });

  const eventsMetrics = eventsQuery.data;

  if (!eventsMetrics) {
    return <Text>Loading...</Text>;
  }

  return (
    <BottomSheetFlatList
      data={[]}
      renderItem={() => <View />}
      ListHeaderComponent={() => (
        <View>
          <Section>Popular events</Section>
          <PyramidChart
            data={eventsMetrics.popularEvents.map((e) => ({
              label: e.name,
              value: e.count,
            }))}
          />
          <Section>All events</Section>
          <LinesChart
            style={{ marginTop: 16 }}
            lines={['Count']}
            data={eventsMetrics.totalEvents.map((e) => ({
              label: e.timestamp,
              values: {
                Count: e.value,
              },
            }))}
          />
        </View>
      )}
    />
  );
};
