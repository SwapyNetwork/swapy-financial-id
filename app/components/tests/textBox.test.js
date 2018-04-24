/* global describe, expect, it */

import React from 'react';
import { Text } from 'react-native';
import { shallow } from 'enzyme';

import { TextBox } from '../';

describe('<TextBox />', async () => {
  it('should render text passed as children', async () => {
    const wrapper = shallow(<TextBox>test</TextBox>);
    expect(wrapper.find(Text).render().text()).toEqual('test');
  });

  it('should be bold when bold prop is true', async () => {
    const wrapper = shallow(<TextBox bold>test</TextBox>);
    expect(wrapper.find(Text).render().text()).toEqual('test');
    expect(wrapper.find(Text).render().prop('style')).toHaveProperty('font-weight', 'bold');
  });

  it('should be normal when bold prop is falsy', async () => {
    const wrapper = shallow(<TextBox>test</TextBox>);
    expect(wrapper.find(Text).render().text()).toEqual('test');
    expect(wrapper.find(Text).render().prop('style')['font-weight']).toBeUndefined();
  });
});
