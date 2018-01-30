// @flow

import React from 'react';
import { StyleSheet, Button, View } from 'react-native';

const onPress = () => true;

export default () => (
  <View style={styles.container}>
    <Button
      onPress={onPress}
      title="Import Funds"
      accessibilityLabel="Import funds from another Ethereum wallet"
    />
    <Button
      onPress={onPress}
      title="Create New Wallet"
      accessibilityLabel="Create new Ethereum wallet"
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
