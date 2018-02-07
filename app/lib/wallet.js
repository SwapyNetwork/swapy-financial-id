import bip39 from 'react-native-bip39';

export default class Wallet {
  static async generateMnemonic() {
    try {
      return await bip39.generateMnemonic();
    } catch (e) {
      return e;
    }
  }
}
