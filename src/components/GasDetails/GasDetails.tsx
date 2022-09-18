import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { Colors, Text, View } from 'react-native-ui-lib';
import { useGasDetailsQuery } from '../../generated/graphql';
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
  });

  const gasDetails = gasQuery.data;

  if (!gasDetails) {
    return <DetailsSkeleton />;
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
