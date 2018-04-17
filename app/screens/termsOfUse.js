/* @flow */

import React from 'react';

import { Button, Container, TextBox } from '../components';
import * as termsOfUse from '../assets/termsOfUse.json';

import type { NavigationScreenProp } from 'react-navigation/src/TypeDefinition';

type Props = {
  navigation: NavigationScreenProp,
};

const TermsOfUse = (props: Props) => (
  <Container>
    <TextBox bold={false}>
      {termsOfUse.body}
    </TextBox>
    <Button
      label="Accept"
      onPress={() => props.navigation.navigate('SeedWords')}
    />
    <Button
      label="Decline"
      onPress={() => props.navigation.goBack()}
    />
  </Container>
);

export default TermsOfUse;
