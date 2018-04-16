/* @flow */
/* eslint-disable class-methods-use-this */

import * as hdkey from 'ethereumjs-wallet/hdkey';
import * as ethWallet from 'ethereumjs-wallet';
import Storage from 'react-native-sensitive-info';

type EthereumJsWalletHdKey = {
  getPrivateKey: () => string,
  getAddressString: () => string,
  getPrivateKeyString: () => string,
};

type EthereumJsWallet = {
  fromPrivateKey: Promise<EthereumJsWalletHdKey>,
};

class WalletProvider {
  instance: EthereumJsWalletHdKey;

  async newWallet(mnemonic: string) {
    try {
      this.instance = await hdkey
        .fromMasterSeed(mnemonic)
        .getWallet();

      await this.persistKey(this.instance.getPrivateKey());
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async persistKey(privateKey: Buffer): Promise<any> {
    try {
      return await Storage.setItem('privateKey', privateKey.toString('hex'), {});
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async retrieveKey(): Promise<string> {
    try {
      return await Storage.getItem('privateKey', {});
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async initWalletFromStorage(): Promise<boolean> {
    try {
      const privateKey = await this.retrieveKey();
      if (privateKey) {
        this.instance = await ethWallet
          .fromPrivateKey(Buffer.from(privateKey, 'hex'));
        return true;
      } else {
        return false;
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export default new WalletProvider();
