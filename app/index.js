/* @flow */
/* eslint-disable global-require */
import React from 'react';
import { StyleSheet, Button, View, Image, TouchableOpacity } from 'react-native';
import { INFURA_KEY } from 'react-native-dotenv'; //eslint-disable-line

import '../global';
import Web3 from './lib/web3';
import Wallet from './lib/wallet';

export default class Index extends React.Component {
  constructor() {
    super();
    this.web3 = new Web3(INFURA_KEY);
    this.wallet = new Wallet();
  }

  onPress = async () => {
    const block = await this.web3.instance.eth.getBlock('latest');
    const mnemonic = await this.wallet.generateMnemonic();
    alert(block.hash, mnemonic);
  }

  web3: Web3;

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onPress}>
          <Image
            source={require('./assets/logo.png')}
            style={{ width: 100, height: 100 }}
          />
        </TouchableOpacity>
        <Button
          onPress={() => this.props.navigation.navigate('ImportFunds')}
          title="Import Funds"
          accessibilityLabel="Import funds from another Ethereum wallet"
        />
        <Button
          onPress={() => this.props.navigation.navigate('NewWallet')}
          title="Create Wallet"
          accessibilityLabel="Create new Ethereum Wallet"
        />
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
  },
});
