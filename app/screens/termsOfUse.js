/* @flow */

import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Button, Container, TextBox } from '../components';
import * as termsOfUse from '../assets/termsOfUse.json';

import type { NavigationScreenProp, NavigationRoute } from 'react-navigation'; // eslint-disable-line

type Props = {
  navigation: NavigationScreenProp<NavigationRoute>,
};

const TermsOfUse = (props: Props) => (
  <Container>
    <TextBox bold={false}>
      {termsOfUse.body}
    </TextBox>
    <View style={styles.buttons}>
      <Button
        extraStyle={styles.button}
        label="Decline"
        onPress={() => props.navigation.goBack()}
        buttonStyle="transparent"
      />
      <Button
        extraStyle={styles.button}
        label="Accept"
        onPress={() => props.navigation.navigate('SeedWords')}
      />
    </View>
  </Container>
);

export default TermsOfUse;

const styles = StyleSheet.create({
  buttons: { // eslint-disable-line
    flexDirection: 'row',
  },
  button: { // eslint-disable-line
    flex: 0.5,
  },
});
