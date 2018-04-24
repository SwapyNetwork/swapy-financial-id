/* global describe, expect, it, jest */

import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { shallow } from 'enzyme';

import { ProfileCard } from '../';

describe('<ProfileCard />', async () => {
  it('should display correct props', async () => {
    const profile = {
      name: 'pedrinho',
      email: 'pedrinho@debatata.com',
      phone: '123456',
      yearlyIncome: '10',
    };
  
    const wrapper = shallow(<ProfileCard ...profile />);
    expect(wrapper.find(Text).get(0).render().text()).toEqual(profile.name);
  });
});
