import React from 'react';
import Styles from '../config/styles';
import { View, StyleSheet, Text } from 'react-native';
import WalletProvider from '../lib/wallet';
import IdentityProvider from '../lib/identity';

const getSwapyBalance = async identityAddress =>
  IdentityProvider
    .instance
    .getTokenBalance(identityAddress);

const getEthBalance = async walletAddress =>
  IdentityProvider.instance.getWeb3().eth.getBalance(walletAddress);

const renderEthBalance = async () => {
  if (WalletProvider.instance.getAddressString()) {
    const ethBalance = IdentityProvider
      .instance
      .getWeb3()
      .utils
      .fromWei(await getEthBalance(WalletProvider.instance.getAddressString()));

    return Number(ethBalance).toFixed(3);
  }
  return undefined;
};

const renderSwapyBalance = async () => {
  if (IdentityProvider.instance.cachedIdentity.address) {
    return (
      <Text style={styles.text}>
        {`${getSwapyBalance(IdentityProvider.instance.cachedIdentity.address)} SWAPY`}
      </Text>
    );
  }
  return undefined;
};

const Balances = () => (
  <View stles={styles.balances}>
    <Text style={styles.text}>
      {`${renderEthBalance()} ETH`}
    </Text>
  </View>
);

export default Balances;

const styles = StyleSheet.create({
  balances: {
  },
  text: {
    marginRight: 15,
    color: Styles.colors.white,
  },
});

