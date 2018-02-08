import React from 'react';
import { TextInput, ScrollView, StyleSheet } from 'react-native';
import Button from '../components/Button/button';

const fields = [
  { placeholder: 'Full name', stateKey: 'name' },
  { placeholder: 'Email', stateKey: 'email', keyboardType: 'email-address' },
  { placeholder: 'Mobile phone', stateKey: 'mobilePhone', keyboardType: 'phone-pad' },
];

export default class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  onInputChange = (stateKey, text) => {
    const field = {};
    field[stateKey] = text;
    this.setState(field);
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        {fields.map(field => (
          <TextInput
            style={styles.input}
            key={field.stateKey}
            value={this.state[field.stateKey]}
            onChangeText={text => this.onInputChange(field.stateKey, text)}
            placeholder={field.placeholder}
            keyboardType={field.keyboardType}
            autoCapitalize={field.keyboardType === 'email-address' ? 'none' : 'words'}
            autoCorrect={false}
          />
        ))}
        <Button
          label="Sign Up"
          onPress={() => alert('Sign up')}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  input: {
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'white',
  },
});

