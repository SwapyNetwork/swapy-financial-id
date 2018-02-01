/* @flow */
/* eslint-disable global-require */

import React from 'react';
import { StyleSheet, Button, View, Image } from 'react-native';
import { INFURA_KEY } from 'react-native-dotenv'; //eslint-disable-line

import './global';
import Web3 from './app/lib/web3';

type Props = {}

export default class App extends React.Component<Props> {
  constructor() {
    super();
    this.web3 = new Web3(INFURA_KEY);
  }

  onPress = async () => {
    const block = await this.web3.instance.eth.getBlock('latest');

    alert(block.hash);
  }

  web3: Web3;

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('./app/assets/logo.png')}
        />
        <Button
          onPress={this.onPress}
          title="Import Funds"
          accessibilityLabel="Import funds from another Ethereum wallet"
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
