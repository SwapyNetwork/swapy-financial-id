/* @flow */

import React from 'react';
import bip39 from 'react-native-bip39';
import { Text, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';

import { Button, Container, TextBox } from '../components';
import WalletProvider from '../lib/wallet';
import IdentityProvider from '../lib/identity';

import defaultStyles from '../config/styles';

import type { NavigationScreenProp, NavigationResetAction, NavigationRoute } from 'react-navigation'; // eslint-disable-line
type Props = {
  navigation: NavigationScreenProp<NavigationRoute>,
};

type State = {
  mnemonic: string,
};

class SeedWords extends React.Component<Props, State> {
  static async generateMnemonic() {
    try {
      return await bip39.generateMnemonic();
    } catch (e) {
      return e;
    }
  }

  constructor(props: any) {
    super(props);
    this.setSeedWords();
  }

  state = { mnemonic: '' };

  async setSeedWords() {
    const mnemonic = await SeedWords.generateMnemonic();

    await WalletProvider.newWallet(mnemonic);
    this.setState({ mnemonic });
  }

  async setAccount() {
    const privateKey: string = await WalletProvider.retrieveKey();

    IdentityProvider
      .instance
      .addAccountFromPrivateKey(`0x${privateKey}`);

    this.resetNavigation('SignUpStart');
  }

  resetNavigation(targetRoute: string) {
    const resetAction: NavigationResetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: targetRoute }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <Container>
        <Text style={styles.bigText}>
          {'Save these words'}
        </Text>
        <TextBox bold style={{ fontWeight: 'bold' }}>{ this.state.mnemonic }</TextBox>
        <Text style={styles.text}>
          {'These 12 words are the only way to restore your Financial Identity. Save them somewhere safe and secret and don\'t ever lose it!'}
        </Text>
        <Button
          label="I've copied it somewhere safe"
          onPress={() => this.setAccount()}
        />
      </Container>
    );
  }
}

export default SeedWords;

const styles = StyleSheet.create({
  text: {
    paddingTop: '5%',
    paddingLeft: '5%',
    paddingRight: '5%',
    fontSize: 17,
    textAlign: 'center',
    marginBottom: 30,
  },
  bigText: {
    textAlign: 'center',
    paddingTop: '5%',
    paddingLeft: '5%',
    paddingRight: '5%',
    fontSize: 24,
    fontWeight: 'bold',
    color: defaultStyles.colors.primary,
  },
  boldText: {
    paddingTop: '5%',
    paddingLeft: '5%',
    paddingRight: '5%',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
