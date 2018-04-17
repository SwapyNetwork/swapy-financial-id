/* @flow */

import { StackNavigator } from 'react-navigation';

import Home from '../screens/home';
import TermsOfUse from '../screens/termsOfUse';
import SeedWords from '../screens/seedWords';
import SignUp from '../screens/signUp';
import Profile from '../screens/profile';

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
