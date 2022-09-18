import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useMemo } from 'react';

import { Colors, Text, View } from 'react-native-ui-lib';
import { useCallsDetailsQuery } from '../../generated/graphql';
import { ContractInterface } from '../../models';
import { LinesChart } from '../charts';
import DetailsSkeleton from '../DetailsSkeleton';
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

interface CallsDetailsProps {
  contract: ContractInterface;
}

export const CallsDetails: React.FC<CallsDetailsProps> = ({ contract }) => {
  const callDetailsQuery = useCallsDetailsQuery({
    variables: {
      contract: {
        address: contract.address,
        chainId: contract.chainId,
      },
    },
  });

  const callDetails = useMemo(
    () => callDetailsQuery.data,
    [callDetailsQuery.data]
  );

  if (!callDetails || callDetailsQuery.loading) {
    return <DetailsSkeleton />;
  }

  return (
    <BottomSheetFlatList
      data={[]}
      renderItem={() => <View />}
      ListHeaderComponent={() => (
        <View>
          <Section>Calls by method</Section>
          <PyramidChart
            data={callDetails.popularCalls.map((c) => ({
              label: c.name,
              value: c.count,
            }))}
          />
          <Section>Total calls</Section>
          <LinesChart
            style={{ marginTop: 16 }}
            lines={['Calls']}
            data={callDetails.totalCalls.map((c) => ({
              label: c.timestamp,
              values: {
                Calls: c.value,
              },
            }))}
          />
        </View>
      )}
    />
  );
};
