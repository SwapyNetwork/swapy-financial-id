import { Api } from '@swapynetwork/swapy-identity-api';
import { INFURA_KEY, NETWORK } from 'react-native-dotenv'; //eslint-disable-line

class IdentityProvider {
  instance;

  constructor(httpProvider, network) {
    this.instance = new Api(httpProvider, null, network);
  }
}
console.log(INFURA_KEY, NETWORK)
export default new IdentityProvider(INFURA_KEY, NETWORK);

