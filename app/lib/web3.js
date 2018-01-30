/* @flow */

import Web3 from 'web3';
import { INFURA_KEY } from '../../env';

export default new Web3(new Web3.providers.HttpProvider(INFURA_KEY));
