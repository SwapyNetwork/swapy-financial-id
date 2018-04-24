/* global describe, expect, it, jest */

import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { shallow } from 'enzyme';

import { Button } from '../';

describe('<Button />', async () => {
  it('should call onPress function when pressed', async () => {
    const onPress = jest.fn();
    const wrapper = shallow(<Button onPress={onPress} />);

    wrapper.find(TouchableOpacity).simulate('press');

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('should not call onPress function when not pressed', async () => {
    const onPress = jest.fn();
    shallow(<Button onPress={onPress} />);

    expect(onPress).toHaveBeenCalledTimes(0);
  });

  it('should display the correct label', async () => {
    const label = 'label';
    const wrapper = shallow(<Button label={label} onPress={() => {}} />);

    expect(wrapper.find(Text).render().text()).toEqual(label);
  });
});
