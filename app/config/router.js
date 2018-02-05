// @flow

import { StackNavigator } from 'react-navigation';
import Index from '../index';

import NewWallet from '../screens/newWallet';
import ImportFunds from '../screens/importFunds';

const HomeStack = StackNavigator({
  Home: {
    screen: Index,
    navigationOptions: () => ({
      title: 'Home',
    }),
  },
  ImportFunds: {
    screen: ImportFunds,
    navigationOptions: () => ({
      title: 'Import funds',
    }),
  },
  NewWallet: {
    screen: NewWallet,
    navigationOptions: () => ({
      title: 'Create new wallet',
    }),
  },
});

export default HomeStack;
