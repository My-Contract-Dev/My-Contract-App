import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useEffect } from 'react';
import { Colors, Text, View } from 'react-native-ui-lib';
import { useSelector } from 'react-redux';
import { useGasDetailsQuery } from '../../generated/graphql';
import { ContractInterface } from '../../models';
import { RootState } from '../../store';
import { LinesChart } from '../charts';
import DetailsSkeleton from '../DetailsSkeleton';
import EmptyPlaceholder from '../EmptyPlaceholder';
import ErrorPlaceholder from '../ErrorPlaceholder';
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

interface GasDetailsProps {
  contract: ContractInterface;
}

export const GasDetails: React.FC<GasDetailsProps> = ({ contract }) => {
  const gasQuery = useGasDetailsQuery({
    variables: {
      contract: {
        address: contract.address,
        chainId: contract.chainId,
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  const isRefreshing = useSelector(
    (state: RootState) => state.refreshing.refreshing
  );

  useEffect(() => {
    if (isRefreshing && !gasQuery.loading) {
      gasQuery.refetch();
    }
  }, [isRefreshing, gasQuery, gasQuery.loading]);

  const gasDetails = gasQuery.data;

  if (gasQuery.error && !gasQuery.data) {
    return (
      <ErrorPlaceholder
        onRetry={gasQuery.refetch}
        title="Oops, failed to load assets"
      />
    );
  }

  if (!gasDetails) {
    return <DetailsSkeleton />;
  }

  if (gasDetails.averageGasByDate.length === 0) {
    return <EmptyPlaceholder label="No calls done so far" />;
  }

  return (
    <BottomSheetFlatList
      data={[]}
      renderItem={() => <View />}
      ListHeaderComponent={() => (
        <View>
          <Section>Average gas per call</Section>
          <PyramidChart
            data={gasDetails.averageGas.map((v) => ({
              label: v.name,
              value: v.averageGas,
            }))}
          />
          <Section>Average gas consumption</Section>
          <LinesChart
            style={{ marginTop: 16 }}
            lines={['Gas']}
            data={gasDetails.averageGasByDate.map((e) => ({
              label: e.timestamp,
              values: {
                Gas: e.value,
              },
            }))}
          />
        </View>
      )}
    />
  );
};
