/* global describe, expect, it */

import React from 'react';
import { Text } from 'react-native';
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

    const wrapper = shallow(<ProfileCard {...profile} />);
    expect(wrapper.find(Text).at(0).render().text()).toEqual(profile.name);
    expect(wrapper.find(Text).at(1).render().text()).toEqual(profile.email);
    expect(wrapper.find(Text).at(2).render().text()).toEqual(profile.phone);
    expect(wrapper.find(Text).at(3).render().text()).toEqual(`US$ ${profile.yearlyIncome}`);
  });
});
