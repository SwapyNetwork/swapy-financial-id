/* @flow */
/* eslint-disable object-curly-newline */

import { StackNavigator } from 'react-navigation';

import Home from '../screens/home';
import TermsOfUse from '../screens/termsOfUse';
import SeedWords from '../screens/seedWords';
import SignUpStart from '../screens/signUpStart';
import SignUpName from '../screens/signUpName';
import SignUpEmail from '../screens/signUpEmail';
import SignUpPhone from '../screens/signUpPhone';
import SignUpBirthdate from '../screens/signUpBirthdate';
import SignUpBirthplace from '../screens/signUpBirthplace';
import SignUpUsername from '../screens/signUpUsername';
import SignUpYearlyIncome from '../screens/signUpYearlyIncome';
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
      title: 'Important!',
    }),
  },
  SignUpStart: {
    screen: SignUpStart,
    navigationOptions: () => ({
      title: 'Register',
    }),
  },
  SignUpName: {
    screen: SignUpName,
    navigationOptions: () => ({
      title: 'Register 1/7',
    }),
  },
  SignUpEmail: {
    screen: SignUpEmail,
    navigationOptions: () => ({
      title: 'Register 2/7',
    }),
  },
  SignUpPhone: {
    screen: SignUpPhone,
    navigationOptions: () => ({
      title: 'Register 3/7',
    }),
  },
  SignUpBirthdate: {
    screen: SignUpBirthdate,
    navigationOptions: () => ({
      title: 'Register 4/7',
    }),
  },
  SignUpBirthplace: {
    screen: SignUpBirthplace,
    navigationOptions: () => ({
      title: 'Register 5/7',
    }),
  },
  SignUpUsername: {
    screen: SignUpUsername,
    navigationOptions: () => ({
      title: 'Register 6/7',
    }),
  },
  SignUpYearlyIncome: {
    screen: SignUpYearlyIncome,
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
