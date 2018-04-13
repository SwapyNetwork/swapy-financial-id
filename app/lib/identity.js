/* @flow */

import { Api } from '@swapynetwork/swapy-identity-api';
import { INFURA_KEY, NETWORK } from 'react-native-dotenv'; //eslint-disable-line
import Storage from 'react-native-sensitive-info';

class IdentityProvider {
  instance;
  cachedIdentity = {};

  constructor(httpProvider, network) {
    this.instance = new Api(httpProvider, null, network);
  }

  factoryIPFSTree({ name, email, mobilePhone, username, yearlyIncome }) {
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

  flattenIPFSTree(ipfsResponse, flatUserData = {}) {
    ipfsResponse.childrens.forEach((child) => {
      if (child.childrens) this.flattenIPFSTree(child, flatUserData);
      else flatUserData[child.label] = child.data; // eslint-disable-line
    });
    return flatUserData;
  }

  factoryUserData(ipfsResponse) {
    const userData = this.flattenIPFSTree(ipfsResponse);

    return {
      profileId: userData.profile_id,
      name: userData.profile_name,
      email: userData.profile_email,
      phone: userData.profile_phone,
      yearlyIncome: userData.usd_yearly_income,
    };
  }

  async persistIdentityId(identityId) {
    try {
      return await Storage.setItem('identityId', identityId, {});
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async retrieveIdentityId() {
    try {
      return await Storage.getItem('identityId', {});
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export default new IdentityProvider(INFURA_KEY, NETWORK);
