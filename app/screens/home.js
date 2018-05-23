/* @flow */
/* eslint-disable global-require */

import React from 'react';
import { Image, StyleSheet, View, ActivityIndicator } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import { Button } from '../components';
import defaultStyles from '../config/styles';
import WalletProvider from '../lib/wallet';
import IdentityProvider from '../lib/identity';

import type { NavigationScreenProp, NavigationRoute } from 'react-navigation'; // eslint-disable-line
import type { Identity } from '../lib/identity';

type Props = {
  navigation: NavigationScreenProp<NavigationRoute>,
};

type State = {
  alreadySignedUp: void | boolean,
  identity: {
    id: string,
    hash: string,
  },
};

export default class Home extends React.Component<Props, State> {
  static navigationOptions = { header: null };

  state = {
    alreadySignedUp: undefined,
    identity: {
      id: '',
      hash: '',
    },
  };

  async componentDidMount() {
    try {
      const existsWallet: boolean = await WalletProvider.initWalletFromStorage();
      const identity: { id: string, hash: string } = await IdentityProvider.retrieveIdentity();

      if (existsWallet && identity) {
        this.setState({ alreadySignedUp: true, identity });
      } else {
        this.setState({ ...this.state, alreadySignedUp: false });
      }
    } catch (err) {
      throw new Error(err);
    }

    SplashScreen.hide();
  }

  async navigateToProfile() {
    const privateKey: string = WalletProvider.instance.getPrivateKeyString();
    const tree: { childrens: [] } = await IdentityProvider.instance.getTreeData(this.state.identity.hash, true, privateKey);
    const userData: Identity = IdentityProvider.factoryUserData(tree);

    this.props.navigation.navigate('Profile', {
      profileHash: this.state.identity.hash,
      ...userData,
    });
  }

  renderButton() {
    if (this.state.alreadySignedUp === true) {
      return (<Button
        onPress={() => this.navigateToProfile()}
        label={`Sign in as @${this.state.identity.id}`}
        accessibilityLabel={`Sign in as @${this.state.identity.id}`}
      />);
    }
    return (<Button
      onPress={() => this.props.navigation.navigate('TermsOfUse')}
      label="Create account"
      accessibilityLabel="Create account"
    />);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/logo.png')}
          style={{ width: 150, height: 150 }}
        />
        {
          this.state.alreadySignedUp === undefined ?
            <ActivityIndicator size="large" color={defaultStyles.colors.primary} /> :
            this.renderButton()
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});
