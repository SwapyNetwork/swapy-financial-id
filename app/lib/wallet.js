/* eslint-disable class-methods-use-this */

import * as hdkey from 'ethereumjs-wallet/hdkey';
import * as ethWallet from 'ethereumjs-wallet';
import Storage from 'react-native-sensitive-info';

class WalletProvider {
  instance;

  async newWallet(mnemonic) {
    try {
      this.instance = await hdkey
        .fromMasterSeed(mnemonic)
        .getWallet();

      await this.persistKey(await this.instance.getPrivateKey());
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async persistKey(privateKey) {
    try {
      return await Storage.setItem('privateKey', privateKey.toString('hex'), {});
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async retrieveKey() {
    try {
      return await Storage.getItem('privateKey', {});
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async initWalletFromStorage() {
    try {
      const privateKey = await this.retrieveKey();
      if (privateKey) {
        this.instance = await ethWallet
          .fromPrivateKey(Buffer.from(privateKey, 'hex'));
      } else {
        throw new Error('Private key not found');
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export default new WalletProvider();
