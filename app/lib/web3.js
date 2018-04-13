/* @flow */

import Web3Lib from 'web3';

export default class Web3 {
  instance: Web3Lib;

  constructor(HttpProvider: string) {
    this.instance = new Web3Lib(new Web3Lib.providers.HttpProvider(HttpProvider));
  }
}
