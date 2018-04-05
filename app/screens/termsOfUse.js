import React from 'react';
import { Button, Container, TextBox } from '../components';
import * as termsOfUse from '../assets/termsOfUse.json';

const TermsOfUse = ({ navigation }) => (
  <Container>
    <TextBox>{termsOfUse.body}</TextBox>
    <Button
      label="Accept"
      onPress={() => navigation.navigate('SeedWords')}
    />
    <Button
      label="Decline"
      onPress={() => navigation.goBack()}
    />
  </Container>
);

export default TermsOfUse;
