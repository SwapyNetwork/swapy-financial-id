import React from 'react';
import { Text, View } from 'react-native';
import Button from '../components/Button/button';

const WalletOption = ({ navigation }) => (
  <View>
    <Text> Choose an option </Text>
    <Button
      label="Create new wallet"
      onPress={() => navigation.navigate('NewWallet')}
    />
    <Button
      label="Import wallet"
      onPress={() => navigation.navigate('ImportWallet')}
    />
  </View>
);

export default WalletOption;
