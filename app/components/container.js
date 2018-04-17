/* @flow */

import * as React from 'react';
import { View, StyleSheet } from 'react-native';

type Props = {
  children? : React.Node,
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
