// @flow

import { StackNavigator } from 'react-navigation';

import Home from '../screens/home';
import NewWallet from '../screens/newWallet';
import ImportWallet from '../screens/importWallet';
import ExchangeAuth from '../screens/exchangeAuth';
import SignUp from '../screens/signUp';
import Profile from '../screens/profile';
import TermsOfUse from '../screens/termsOfUse';
import SeedWords from '../screens/seedWords';
import WalletOption from '../screens/walletOption';

import styles from './styles';

const HomeStack = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: () => ({
      title: 'Home',
    }),
  },
  TermsOfUse: {
    screen: TermsOfUse,
    navigationOptions: () => ({
      title: 'Terms of Use',
    }),
  },
  SeedWords: {
    screen: SeedWords,
    navigationOptions: () => ({
      title: 'Seed Words',
    }),
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: () => ({
      title: 'Register',
    }),
  },
  Profile: {
    screen: Profile,
    navigationOptions: () => ({
      title: 'Profile',
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
}, {
  initialRouteName: 'Home',
  navigationOptions: {
    headerStyle: {
      backgroundColor: styles.colors.primary,
    },
    headerTitleStyle: {
      color: styles.colors.white,
    },
    headerTintColor: styles.colors.white,
  },
});

export default HomeStack;
