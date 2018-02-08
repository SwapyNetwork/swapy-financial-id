// @flow

import { StackNavigator } from 'react-navigation';
import Index from '../index';

import NewWallet from '../screens/newWallet';
import ImportFunds from '../screens/importFunds';
import ExchangeAuth from '../screens/exchangeAuth';
import Login from '../screens/login';

const HomeStack = StackNavigator({
  Home: {
    screen: Index,
    navigationOptions: () => ({
      title: 'Home',
    }),
  },
  Login: {
    screen: Login,
    navigationOptions: () => ({
      title: 'Login',
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
  ExchangeAuth: {
    screen: ExchangeAuth,
    navigationOptions: () => ({
      title: 'Exchange Auth',
      header: null,
    }),
  },
});

export default HomeStack;