import React, { Component } from 'react';
import bip39 from 'react-native-bip39';
import { Text, StyleSheet } from 'react-native';
import { Button, Container, TextBox } from '../components';
import WalletProvider from '../lib/wallet';
import IdentityProvider from '../lib/identity';

const generateMnemonic = async () => {
  try {
    return await bip39.generateMnemonic();
  } catch (e) {
    return e;
  }
};

class SeedWords extends Component {
  constructor(props) {
    super(props);
    this.state = { mnemonic: '', walletAddress: '' };
    this.setSeedWords();
  }

  async setSeedWords() {
    const mnemonic = await generateMnemonic();
    // Dsiable wallet creation for dev purposes @todo remind to uncoment this.
    await WalletProvider.newWallet(mnemonic);
    this.setState({ mnemonic, walletAddress: WalletProvider.instance.getAddressString() });
  }

  setAccount = async () => {
    const privateKey = await WalletProvider.retrieveKey();

    IdentityProvider
      .instance
      .addAccountFromPrivateKey(`0x${privateKey}`);
    this.props.navigation.navigate('SignUp');
  };

  render() {
    return (
      <Container>
        <Text style={styles.text}>
          {'We\'ve generated your account... These 12 words are the only way to restore your Financial Identity. Save them somewhere safe and secret and don\'t ever lose it!'}
        </Text>
        <TextBox bold style={{ fontWeight: 'bold' }}>{ this.state.mnemonic }</TextBox>
        <Text style={styles.text}>
          {'This is your wallet address:'}
        </Text>
        <Text style={styles.boldText}>
          {this.state.walletAddress}
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
    fontSize: 16,
  },
  boldText: {
    paddingTop: '5%',
    paddingLeft: '5%',
    paddingRight: '5%',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
