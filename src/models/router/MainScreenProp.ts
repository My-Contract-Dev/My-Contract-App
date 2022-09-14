import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootNavigationProps } from './RootNavigationProps';

export type MainScreenNavigationProp = NativeStackNavigationProp<
  RootNavigationProps,
  'Main'
>;
