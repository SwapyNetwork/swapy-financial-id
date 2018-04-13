/* @flow */

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
  label: string,
  onPress: () => () => {},
};

const Button = ({ label, onPress }: Props) => (
  <View>
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.label}>{ label }</Text>
    </TouchableOpacity>
  </View>
);

export default Button;

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 20,
    borderBottomWidth: 0,
    backgroundColor: '#00aeef',
    alignItems: 'center',
  },
  label: {
    color: 'white',
  },
});

