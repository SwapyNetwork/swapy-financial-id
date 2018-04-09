import { Api } from '@swapynetwork/swapy-identity-api';
import { INFURA_KEY, NETWORK } from 'react-native-dotenv'; //eslint-disable-line

class IdentityProvider {
  instance;
  cachedIdentity = {};

  constructor(httpProvider, network) {
    this.instance = new Api(httpProvider, null, network);
  }
}

export default new IdentityProvider(INFURA_KEY, NETWORK);

