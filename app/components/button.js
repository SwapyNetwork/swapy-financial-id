/* @flow */

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import defaultStyles from '../config/styles';

type ButtonStyles = 'primary' | 'inverse' | 'transparent';
type Props = {
  label: string,
  onPress: () => any,
  buttonStyle?: ButtonStyles,
};

const Button = ({ label, onPress, buttonStyle = 'primary' }: Props) => (
  <View>
    <TouchableOpacity style={styles[buttonStyle]} onPress={onPress}>
      <Text style={styles[`${(buttonStyle: ButtonStyles)}Label`]}>{label}</Text>
    </TouchableOpacity>
  </View>
);

Button.defaultProps = { buttonStyle: 'primary' };

export default Button;

const styles = StyleSheet.create({
  primary: {
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 20,
    borderBottomWidth: 0,
    backgroundColor: '#00aeef',
    alignItems: 'center',
  },
  inverse: {
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 20,
    borderBottomWidth: 0,
    backgroundColor: '#00aeef',
    alignItems: 'center',
  },
  transparent: {
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 20,
    borderStyle: 'solid',
    borderWidth: 0.3,
    borderColor: defaultStyles.colors.gray,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  primaryLabel: { color: 'white' },
  inverseLabel: { color: defaultStyles.colors.primary },
  transparentLabel: { color: defaultStyles.colors.gray },
});

