/* @flow */

import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { setInterval } from 'core-js';

import Styles from '../config/styles';
import WalletProvider from '../lib/wallet';
import IdentityProvider from '../lib/identity';


type Props = {};
type State = {
  ethBalance: string | void,
  swapyBalance: string | void,
};

export default class Balances extends React.Component<Props, State> {
  state = {
    ethBalance: undefined,
    swapyBalance: undefined,
  };
  
  componentDidMount() {
    this.loadBalances();
    setInterval(() => {
      this.loadBalances();
    }, 10000);
  }

  getSwapyBalance = async (identityAddress: string): Promise<any> => IdentityProvider.instance.getTokenBalance(identityAddress);
  
  getEthBalance = async (walletAddress: string) => IdentityProvider.instance.getWeb3().eth.getBalance(walletAddress);

  async loadBalances() {
    const walletAddress = WalletProvider.instance.getAddressString();
    let ethBalance: string | void = walletAddress ? await this.getEthBalance(WalletProvider.instance.getAddressString()) : undefined;
    ethBalance = ethBalance ?
      Number(IdentityProvider.instance.getWeb3().utils.fromWei(ethBalance)).toFixed(3) :
      ethBalance;

    const identityAddress = IdentityProvider.cachedIdentity ? IdentityProvider.cachedIdentity.address : undefined;
    let swapyBalance: string | void = identityAddress ? await this.getSwapyBalance(identityAddress) : undefined;
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

