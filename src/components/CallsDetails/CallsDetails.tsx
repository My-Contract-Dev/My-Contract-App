import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { Colors, Text, View } from 'react-native-ui-lib';
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

export const CallsDetails: React.FC = () => {
  return (
    <BottomSheetFlatList
      data={[]}
      renderItem={() => <View />}
      ListHeaderComponent={() => (
        <View>
          <Section>Popular methods</Section>
          <PyramidChart
            data={[
              {
                label: 'Transfer',
                value: 726,
              },
              {
                label: 'Approve',
                value: 543,
              },
              {
                label: 'Delete',
                value: 235,
              },
              {
                label: 'Create',
                value: 233,
              },
              {
                label: 'Improve',
                value: 23,
              },
              {
                label: 'TransferOwnership',
                value: 3,
              },
            ]}
          />
          <Section>All calls</Section>
          <LinesChart style={{ marginTop: 16 }} data={[]} />
        </View>
      )}
    />
  );
};
