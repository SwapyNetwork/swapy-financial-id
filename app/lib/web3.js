import Web3 from 'web3';

export default class web3 {
  instance;

  constructor(HttpProvider) {
    this.instance = new Web3(new Web3.providers.HttpProvider(HttpProvider));
  }
}
