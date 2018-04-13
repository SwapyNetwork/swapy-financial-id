/* @flow */
/* eslint-disable global-require */
import React from 'react';
import { Text, Image, StyleSheet, View, ActivityIndicator } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Button } from '../components';
import defaultStyles from '../config/styles';

import WalletProvider from '../lib/wallet';
import IdentityProvider from '../lib/identity';

export default class Home extends React.Component {
  static navigationOptions = { header: null };

  state = {
    alreadySignedUp: undefined,
    identityId: '',
    identityHash: '',
  };

  async componentDidMount() {
    try {
      const existsWallet = await WalletProvider.initWalletFromStorage();
      const identity = JSON.parse(await IdentityProvider.retrieveIdentityId());

      if(existsWallet && identity) {
        this.setState({ alreadySignedUp: false, identityId: identity.identityId, identityHash: identity.identityHash });
      } else {
        this.setState({ ...this.state, alreadySignedUp: false });
      }
    } catch (err) {
      console.log(err);
    }

    SplashScreen.hide();
  }

  async navigateToProfile() {
    const privateKey = await WalletProvider.instance.getPrivateKeyString();
    const tree = await IdentityProvider.instance.getTreeData(this.state.identityHash, true, privateKey);
    const userData = IdentityProvider.factoryUserData(tree);

    this.props.navigation.navigate('Profile', {
      profileHash: this.state.identityHash,
      ...userData,
    });
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
              (
                this.state.alreadySignedUp === true ?
                  <Button
                    onPress={() => this.navigateToProfile()}
                    label={`Sign in as @${this.state.identityId}`}
                    accessibilityLabel={`Sign in as @${this.state.identityId}`}
                  /> :
                  <Button
                    onPress={() => this.props.navigation.navigate('TermsOfUse')}
                    label="Create account"
                    accessibilityLabel="Create account"
                  />
              )
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

