// @flow

import { StackNavigator } from 'react-navigation';
import Index from '../index';

import NewWallet from '../screens/newWallet';
import ImportWallet from '../screens/importWallet';
import ExchangeAuth from '../screens/exchangeAuth';
import SignUp from '../screens/signUp';
import TermsOfUse from '../screens/termsOfUse';
import WalletOption from '../screens/walletOption';

const HomeStack = StackNavigator({
  Home: {
    screen: Index,
    navigationOptions: () => ({
      title: 'Home',
    }),
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: () => ({
      title: 'Sign Up',
    }),
  },
  TermsOfUse: {
    screen: TermsOfUse,
    navigationOptions: () => ({
      title: 'Terms of Use',
    }),
  },
  WalletOption: {
    screen: WalletOption,
    navigationOptions: () => ({
      title: 'Wallet Option',
    }),
  },
  ImportWallet: {
    screen: ImportWallet,
    navigationOptions: () => ({
      title: 'Import wallet',
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
