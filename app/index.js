// @flow

import React from 'react';
import { StyleSheet, Button, View } from 'react-native';

const Index = ({ navigation }) => (
  <View style={styles.container}>
    <Button
      onPress={() => navigation.navigate('ImportFunds')}
      title="Import Funds"
      accessibilityLabel="Import funds from another Ethereum wallet"
    />
    <Button
      onPress={() => navigation.navigate('NewWallet')}
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

export default Index;
