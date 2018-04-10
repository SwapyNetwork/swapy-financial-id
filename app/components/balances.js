import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { setInterval } from 'core-js';
import Styles from '../config/styles';
import WalletProvider from '../lib/wallet';
import IdentityProvider from '../lib/identity';

const getSwapyBalance = async identityAddress =>
  IdentityProvider
    .instance
    .getTokenBalance(identityAddress);

const getEthBalance = async walletAddress =>
  IdentityProvider.instance.getWeb3().eth.getBalance(walletAddress);

export default class Balances extends React.Component {
  constructor() {
    super();
    this.state = {
      ethBalance: undefined,
      swapyBalance: undefined,
    };
    setInterval(() => {
      this.loadBalances();
    }, 10000);
  }

  async loadBalances() {
    const walletAddress = WalletProvider.instance.getAddressString();
    let ethBalance = walletAddress ? await getEthBalance(WalletProvider.instance.getAddressString()) : undefined;
    ethBalance = ethBalance ?
      Number(IdentityProvider.instance.getWeb3().utils.fromWei(ethBalance)).toFixed(3) :
      ethBalance;

    const identityAddress = IdentityProvider.cachedIdentity ? IdentityProvider.cachedIdentity.address : undefined;
    let swapyBalance = identityAddress ? await getSwapyBalance(identityAddress) : undefined;
    swapyBalance = swapyBalance ?
      Number(IdentityProvider.instance.getWeb3().utils.fromWei(swapyBalance)).toFixed(3) :
      swapyBalance;

    this.setState({
      ethBalance,
      swapyBalance,
    });
  }

  render() {
    return (
      <View stles={styles.balances}>
        <Text style={styles.text}>
          {this.state.ethBalance ? `${this.state.ethBalance} ETH` : undefined}
        </Text>
        <Text style={styles.text}>
          {this.state.swapyBalance ? `${this.state.swapyBalance} SWAPY` : undefined}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  balances: {
  },
  text: {
    marginRight: 15,
    color: Styles.colors.white,
  },
});

