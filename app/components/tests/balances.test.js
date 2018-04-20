/* global describe, expect */
/* eslint-disable object-curly-newline */

import React from 'react';
import { mount } from 'enzyme';
import * as jest from 'jest';

import { Balances } from '../';

jest.mock('../../lib/wallet', () => ({
  instance: {
    getAddressString: () => '0x123456123456123456',
  },
}));

jest.mock('../../lib/identity', () => ({
  instance: {
    getTokenBalance: async () => '3.123123123',
    getWeb3: () => ({
      eth: {
        getBalance: async () => '0.444444',
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

describe('<Balances />', async () => {
  const balances = mount(<Balances />);
  setTimeout(() => {}, 1000);
  console.log(balances.find('Text').at(0).childAt(0))

  expect(balances.text()).toEqual('On');
});
