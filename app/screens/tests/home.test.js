/* global it, expect, describe, jest */
/* eslint-disable object-curly-newline */
/* eslint-disable global-require */

import * as React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
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
    getTreeData: async () => ({ id: 'test', hash: '1283ashdh1238' }),
  },
  retrieveIdentity: jest.fn()
    .mockImplementation(async () => ({ id: 'test', hash: '1283ashdh1238' })),
  factoryUserData: {},
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

    process.nextTick(async () => { // Ensures componentDidMount was called
      expect(require('../../lib/identity').retrieveIdentity).toHaveBeenCalledTimes(2);
      expect(wrapper.find(Button).at(0).props().label).toEqual('Create new wallet');
      expect(wrapper.find(Button).at(1).props().label).toEqual('Import existing wallet');
    });
  });

  it('renders the ActivityIndicator when is loading', async () => {
    const wrapper = mount(<Home />);

    expect(wrapper.find(ActivityIndicator)).toBeTruthy();
    process.nextTick(async () => { // Ensures componentDidMount was called
      expect(require('../../lib/identity').retrieveIdentity).toHaveBeenCalledTimes(2);
      expect(wrapper.find(Button).at(1).props().label).toEqual('Import existing wallet');
    });
  });
});
