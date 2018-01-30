/* @flow */
/* eslint-disable global-require */

import React from 'react';
import { StyleSheet, Button, View, Image } from 'react-native';

import Web3 from './app/lib/web3';

const onPress = async () => {
  console.log(await Web3.eth.getAccounts());
};

export default () => (
  <View style={styles.container}>
    <Image
      source={require('./app/assets/logo.png')}
    />

    <Button
      onPress={onPress}
      title="Import Funds"
      accessibilityLabel="Import funds from another Ethereum wallet"
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
