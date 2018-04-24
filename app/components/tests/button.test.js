/* global describe, expect, it, jest */
/* eslint-disable object-curly-newline */
/* eslint-disable global-require */

import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { mount } from 'enzyme';

import { Button } from '../';

describe('<Button />', async () => {
  it('ensures the text output for the balances is correct', async () => {
    const onPress = jest.fn();
    const wrapper = mount(<Button label="test" onPress={onPress} />);

    wrapper.find(TouchableOpacity).simulate('press');

    expect(onPress).toHaveBeenCalledTimes(1);
    //expect(wrapper.find(Text).at(0).text()).toEqual('1.000 ETH');
    //expect(wrapper.find(Text).at(1).text()).toEqual('2.000 SWAPY');
  });

  it('verifies if the component text changes after a change in the SWAPY balance', async () => {
    const wrapper = mount(<Balances />);

    jest.runOnlyPendingTimers();
    process.nextTick(() => {
      expect(wrapper.find(Text).at(0).text()).toEqual('1.000 ETH');
      expect(wrapper.find(Text).at(1).text()).toEqual('5.000 SWAPY');
    });
  });

  it('ensures no SWAPY value is outputted if there is no identity available', async () => {
    require('../../lib/identity').cachedIdentity.address = undefined;

    const wrapper = mount(<Balances />);

    process.nextTick(() => {
      expect(wrapper.find(Text).at(0).text()).toEqual('1.000 ETH');
      expect(wrapper.find(Text).at(1).text()).toEqual('');
    });
  });
});
