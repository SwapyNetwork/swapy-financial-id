import bip39 from 'react-native-bip39';

export default class Wallet {
  static async generateMnemonic() {
    try {
      const mnemonic = await bip39.generateMnemonic();
      console.warn(mnemonic);
      return mnemonic;
    } catch (e) {
      console.error(e);
      return e;
    }
  }
}
