/* @flow */

import { Api } from '@swapynetwork/swapy-identity-api';
import { INFURA_KEY, NETWORK } from 'react-native-dotenv'; //eslint-disable-line
import Storage from 'react-native-sensitive-info';

type SwapyIdentityApi = {
  getTokenBalance: (string) => Promise<string>,
  getWeb3: () => Web3,
};

type Web3 = {
  eth: {
    getBalance: (string) => Promise<string>,
  },
  utils: {
    fromWei: (string) => string,
  },
};

type CachedIdentity = {
  address: string,
};

type Identity = {
  name?: string,
  email?: string,
  mobilePhone?: number,
  username?: string,
  yearlyIncome?: string,
};

type IpfsIdentity = {
  profile_id?: string,
  profile_name?: string,
  profile_email?: string,
  profile_phone?: number,
  usd_yearly_income?: string,
};

class IdentityProvider {
  instance: SwapyIdentityApi;
  cachedIdentity: CachedIdentity = { address: '' };

  constructor(httpProvider: string, network: string) {
    this.instance = new Api(httpProvider, null, network);
  }

  factoryIPFSTree({ name, email, mobilePhone, username, yearlyIncome }: Identity) {
    return [{
      parentLabel: 'root',
      label: 'root_profile',
      childrens: [{
        label: 'profile_name',
        data: name,
      }, {
        label: 'profile_email',
        data: email,
      }, {
        label: 'profile_phone',
        data: mobilePhone,
      }, {
        label: 'profile_id',
        data: username,
      }],
    }, {
      parentLabel: 'root',
      label: 'root_financial',
      childrens: [{
        label: 'usd_yearly_income',
        data: yearlyIncome,
      }],
    }];
  }

  flattenIPFSTree(ipfsResponse: { childrens: [] }, flatUserData: IpfsIdentity = {}): IpfsIdentity {
    ipfsResponse.childrens.forEach((child) => {
      if (child.childrens) this.flattenIPFSTree(child, flatUserData);
      else flatUserData[child.label] = child.data; // eslint-disable-line
    });
    return flatUserData;
  }

  factoryUserData(ipfsResponse: { childrens: [] }): Identity {
    const userData: IpfsIdentity = this.flattenIPFSTree(ipfsResponse);

    return {
      profileId: userData.profile_id,
      name: userData.profile_name,
      email: userData.profile_email,
      phone: userData.profile_phone,
      yearlyIncome: userData.usd_yearly_income,
    };
  }

  async persistIdentityId(identityId: string) {
    try {
      return await Storage.setItem('identityId', identityId, {});
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async retrieveIdentityId(): Promise<string> {
    try {
      return await Storage.getItem('identityId', {});
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export default new IdentityProvider(INFURA_KEY, NETWORK);
