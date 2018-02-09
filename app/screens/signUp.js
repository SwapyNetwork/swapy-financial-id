import React from 'react';
import { TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native';
import Button from '../components/Button/button';

const fields = [
  { placeholder: 'Full name', stateKey: 'name' },
  { placeholder: 'Email', stateKey: 'email', keyboardType: 'email-address' },
  { placeholder: 'Mobile phone', stateKey: 'mobilePhone', keyboardType: 'phone-pad' },
  { placeholder: 'Username', stateKey: 'userName' },
  { placeholder: 'Password', stateKey: 'password', secureTextEntry: true },
  { placeholder: 'Confirm password', stateKey: 'passwordConfirmation', secureTextEntry: true },
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
  };

  validateFields = () => {
    // @todo validate fields, mostly important: email and password confirmation
    this.props.navigation.navigate('WalletOption');
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="position" style={styles.container}>
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
            secureTextEntry={field.secureTextEntry}
          />
        ))}
        <Button
          label="Sign Up"
          onPress={() => this.validateFields()}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  input: {
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'white',
  },
});

