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

Container.defaultProps = { children: [] };

export default Container;

const styles = StyleSheet.create({ container: {} });
