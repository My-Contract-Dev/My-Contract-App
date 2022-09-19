import { StyleProp, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { TabController, Typography, View } from 'react-native-ui-lib';
import { ContractInterface } from '../../models';
import CallsDetails from '../CallsDetails';
import EventsDetails from '../EventsDetails';
import GasDetails from '../GasDetails';
import TokenList from '../TokenList';

interface ContractDetailsProps {
  contract: ContractInterface;
  style?: StyleProp<Animated.AnimateStyle<unknown>>;
}

export const ContractDetails: React.FC<ContractDetailsProps> = ({
  style,
  contract,
}) => {
  return (
    <Animated.View style={[style, styles.container]}>
      <TabController
        items={[
          { label: 'Assets' },
          { label: 'Calls' },
          { label: 'Events' },
          { label: 'Gas' },
        ]}
      >
        <TabController.TabBar
          enableShadows
          containerStyle={styles.tabContainer}
          height={30}
          labelStyle={{ ...Typography.body, ...Typography.medium }}
          selectedLabelStyle={{
            ...Typography.body,
            ...Typography.bold,
          }}
        />
        <View flex>
          <TabController.TabPage index={0}>
            <TokenList contract={contract} />
          </TabController.TabPage>
          <TabController.TabPage index={1} lazy>
            <CallsDetails contract={contract} />
          </TabController.TabPage>
          <TabController.TabPage index={2} lazy>
            <EventsDetails contract={contract} />
          </TabController.TabPage>
          <TabController.TabPage index={3} lazy>
            <GasDetails contract={contract} />
          </TabController.TabPage>
        </View>
      </TabController>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {},
  container: {
    flex: 1,
  },
});
