import React from 'react';
import { Text, View } from 'react-native';
import Button from '../components/Button/button';

const TermsOfUse = ({ navigation }) => (
  <View>
    <Text> Terms of Use </Text>
    <Button
      label="Accept"
      onPress={() => navigation.navigate('SignUp')}
    />
    <Button
      label="Decline"
      onPress={() => navigation.goBack()}
    />
  </View>
);

export default TermsOfUse;
