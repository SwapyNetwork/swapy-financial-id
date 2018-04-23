/* global describe, expect, it, jest */
/* eslint-disable object-curly-newline */
/* eslint-disable global-require */

import React from 'react';
import { Text } from 'react-native';
import { mount } from 'enzyme';

import { Balances } from '../';

jest.mock('../../lib/wallet', () => ({
  instance: {
    getAddressString: () => '0x123456123456123456',
  },
}));

jest.mock('../../lib/identity', () => ({
  instance: {
    getTokenBalance: jest.fn()
      .mockReturnValueOnce('2.00000')
      .mockReturnValue('5.00000'),
    getWeb3: () => ({
      eth: {
        getBalance: jest.fn(async () => '1.0000000'),
      },
      utils: {
        fromWei: number => number,
      },
    }),
  },
  cachedIdentity: {
    address: '0x1234561234561234232',
  },
}));

jest.useFakeTimers();

describe('<Balances />', async () => {
  it('ensures the text output for the balances is correct', async () => {
    const wrapper = mount(<Balances />);

    process.nextTick(() => {
      expect(require('../../lib/identity').instance.getTokenBalance).toHaveBeenCalledTimes(1);
      expect(wrapper.find(Text).at(0).text()).toEqual('1.000 ETH');
      expect(wrapper.find(Text).at(1).text()).toEqual('2.000 SWAPY');
    });
  });

  it('verifies if the component text changes after a change in the SWAPY balance', async () => {
    const wrapper = mount(<Balances />);

    jest.runOnlyPendingTimers();
    process.nextTick(() => {
      expect(wrapper.find(Text).at(0).text()).toEqual('1.000 ETH');
      expect(wrapper.find(Text).at(1).text()).toEqual('5.000 SWAPY');
    });
  });
});
