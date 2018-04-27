/* global it, expect, describe, jest */
/* eslint-disable object-curly-newline */
/* eslint-disable global-require */

import * as React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import { Text, ActivityIndicator } from 'react-native';

import Home from '../home';
import { Button } from '../../components';

jest.mock('../../lib/wallet', () => ({
  instance: {
    getPrivateKeyString: () => '0x123456123456123456',
  },
  initWalletFromStorage: jest.fn()
    .mockImplementationOnce(async () => true)
    .mockImplementationOnce(async () => false)
    .mockImplementation(async () => true),
}));

jest.mock('../../lib/identity', () => ({
  instance: {
    getTreeData: async () => ({ id: 'pedrinho', hash: '1283ashdh1238' }),
  },
  retrieveIdentity: jest.fn()
    .mockImplementation(async () => ({ id: 'pedrinho', hash: '1283ashdh1238' })),
  factoryUserData: () => ({
    name: 'pedrinho',
    email: 'pedrinho@paodebatata.com',
    mobilePhone: '123456',
    username: 'littlepeter',
    yearlyIncome: '50002',
  }),
}));

jest.mock('react-native-splash-screen', () => ({
  hide: () => null,
}));

describe('<Home />', async () => {
  it('renders without crashing', () => {
    const rendered = renderer.create(<Home />).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  it('displays "create" and "import" buttons when there\'s no wallet', async () => {
    const wrapper = mount(<Home />);
    process.nextTick(() => { // Ensures componentDidMount was called
      wrapper.update();
      expect(require('../../lib/identity').retrieveIdentity).toHaveBeenCalledTimes(2);
      expect(wrapper.find(Button).at(0).props().label).toEqual('Create new wallet');
      expect(wrapper.find(Button).at(1).props().label).toEqual('Import existing wallet');
    });
  });

  it('renders the ActivityIndicator when is loading', async () => {
    const wrapper = mount(<Home />);
    expect(wrapper.find(ActivityIndicator).exists()).toEqual(true);
    process.nextTick(() => {
      wrapper.update();
      expect(wrapper.find(ActivityIndicator).exists()).toEqual(false);
    });
  });

  it('renders the "sign in" button when there\'s an wallet saved', async () => {
    const wrapper = mount(<Home />);
    const userId = (await require('../../lib/identity').retrieveIdentity()).id;

    process.nextTick(() => {
      wrapper.update();
      expect(wrapper.find(Button).at(0).props().label)
        .toEqual(`Sign in as @${userId}`);
    });
  });

  it('should navigate to TermsOfUse when pressing "create new wallet"', async () => {
    // Reset mock
    require('../../lib/wallet').initWalletFromStorage = jest.fn()
      .mockImplementation(async () => false);

    const navigate = jest.fn();
    // const profileHash = (await require('../../lib/wallet').retrieveIdentity()).hash;

    const wrapper = shallow(<Home navigation={{ navigate }} />);
    process.nextTick(() => {
      wrapper.update();
      wrapper.find(Button).at(0).simulate('press');
      expect(navigate).toBeCalledWith('TermsOfUse');
    });
  });

  it('should navigate to TermsOfUse when pressing "import existing wallet"', async () => {
    // @TODO create import wallet
  });

  it('should navigate to Profile when pressing "sign in"', async () => {
    // Reset mock
    require('../../lib/wallet').initWalletFromStorage = jest.fn()
      .mockImplementation(async () => true);

    const navigate = jest.fn();
    const profileHash = (await require('../../lib/identity').retrieveIdentity()).hash;
    const userData = await require('../../lib/identity').factoryUserData();

    const wrapper = shallow(<Home navigation={{ navigate }} />);
    process.nextTick(() => {
      wrapper.update();
      wrapper.find(Button).simulate('press');
      process.nextTick(() => {
        expect(navigate).toBeCalledWith('Profile', {
          profileHash,
          ...userData,
        });
      });
    });
  });
});
