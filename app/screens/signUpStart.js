/* @flow */

import React from 'react';
import { View, StyleSheet } from 'react-native';

import defaultStyles from '../config/styles';
import { Button } from '../components';

export default class SignUp extends React.Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Button></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.primary,
    flex: 1,
  },
});
