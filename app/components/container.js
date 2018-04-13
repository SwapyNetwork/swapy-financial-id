/* @flow */

import React from 'react';
import { View, StyleSheet } from 'react-native';

type Props = {
  children: [],
};

const Container = (props: Props) => (
  <View style={styles.container} >
    {props.children}
  </View>
);

export default Container;

const styles = StyleSheet.create({
  container: {},
});
