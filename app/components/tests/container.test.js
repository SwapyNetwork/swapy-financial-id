/* global describe, expect, it */

import React from 'react';
import { Text } from 'react-native';
import { shallow } from 'enzyme';

import { Container } from '../';

describe('<Container />', async () => {
  it('should render children components', async () => {
    const wrapper = shallow(<Container><Text>test</Text></Container>);

    expect(wrapper.find(Text).render().text()).toEqual('test');
  });
});
