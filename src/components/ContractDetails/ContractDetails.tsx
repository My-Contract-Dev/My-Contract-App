import { StyleProp, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { TabController, Text, Typography, View } from 'react-native-ui-lib';
import { ContractInterface } from '../../models';
import EventsDetails from '../EventsDetails';
import TokenList from '../TokenList';

interface ContractDetailsProps {
  contract: ContractInterface;
  style?: StyleProp<Animated.AnimateStyle<unknown>>;
}

export const ContractDetails: React.FC<ContractDetailsProps> = ({ style }) => {
  return (
    <Animated.View style={[style, styles.container]}>
      <TabController
        items={[
          { label: 'Overview' },
          { label: 'Assets' },
          { label: 'Calls' },
          { label: 'Events' },
          { label: 'Gas' },
          { label: 'Manage' },
        ]}
      >
        <TabController.TabBar
          enableShadows
          containerStyle={styles.tabContainer}
          height={30}
          labelStyle={{ ...Typography.body, ...Typography.medium }}
          selectedLabelStyle={{ ...Typography.body, ...Typography.bold }}
        />
        <View flex>
          <TabController.TabPage index={0}>
            <Text>Something?</Text>
          </TabController.TabPage>
          <TabController.TabPage index={1} lazy>
            <TokenList />
          </TabController.TabPage>
          <TabController.TabPage index={2} lazy>
            <Text>Third page</Text>
          </TabController.TabPage>
          <TabController.TabPage index={3} lazy>
            <EventsDetails />
          </TabController.TabPage>
        </View>
      </TabController>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    paddingHorizontal: 12,
  },
  container: {
    flex: 1,
  },
});
