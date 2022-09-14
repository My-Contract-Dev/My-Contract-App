import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContractsListScreen from '../screens/ContractsListScreen';
import { RootNavigationProps } from '../models';
import ContractScreen from '../screens/ContractScreen';

const Stack = createNativeStackNavigator<RootNavigationProps>();

const AppNavigation: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Main" component={ContractsListScreen} />
      <Stack.Screen name="Contract" component={ContractScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
