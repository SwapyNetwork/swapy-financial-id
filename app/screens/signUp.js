/* @flow */

import React from 'react';
import { TextInput, StyleSheet, KeyboardAvoidingView, ActivityIndicator, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import defaultStyles from '../config/styles';
import { Button, Balances } from '../components';
import IdentityProvider from '../lib/identity';
import WalletProvider from '../lib/wallet';

import type { NavigationScreenProp, NavigationResetAction, NavigationParams } from 'react-navigation/src/TypeDefinition';

type Props = {
  navigation: NavigationScreenProp,
};

type State = {
  isWaitingEthereum: boolean,
  username: string,
  email: string,
  name: string,
  mobilePhone: number,
  yearlyIncome: string,
};

type Field = {
  placeholder: string,
  stateKey: string,
  keyboardType?: string,
  secureTextEntry?: string,
};

export default class SignUp extends React.Component<Props, State> {
  static navigationOptions = { headerRight: (<Balances />), headerLeft: null };

  fields: Array<Field> = [
    { placeholder: 'Username', stateKey: 'username' },
    { placeholder: 'Full name', stateKey: 'name' },
    { placeholder: 'Email', stateKey: 'email', keyboardType: 'email-address' },
    { placeholder: 'Mobile phone', stateKey: 'mobilePhone', keyboardType: 'phone-pad' },
    { placeholder: 'USD Yearly Income', stateKey: 'yearlyIncome' },
  ];

  state = {
    isWaitingEthereum: false,
    username: '',
    email: '',
    name: '',
    mobilePhone: 0,
    yearlyIncome: '',
  };

  resetNavigation(targetRoute: string, params: NavigationParams) {
    const resetAction: NavigationResetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: targetRoute, params }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  onInputChange(stateKey: string, text: string) {
    const field = {};
    field[stateKey] = text;
    this.setState(field);
  }

  async validateFields() {
    // @todo validate fields, mostly important: email and password confirmation
    try {
      this.setState({ ...this.state, isWaitingEthereum: true });

      const privateKey: string = await WalletProvider.instance.getPrivateKeyString();
      const profileHash: string = await IdentityProvider
        .instance
        .createIpfsProfile(IdentityProvider.factoryIPFSTree({
          username: this.state.username,
          email: this.state.email,
          name: this.state.name,
          mobilePhone: this.state.mobilePhone,
          yearlyIncome: this.state.yearlyIncome,
        }), privateKey);

      const tree = await IdentityProvider.instance.getTreeData(profileHash, true, privateKey);
      const userData = IdentityProvider.factoryUserData(tree);

      IdentityProvider.persistIdentity({ id: userData.username, hash: profileHash });

      this.setState({ ...this.state, isWaitingEthereum: false });
      this.resetNavigation('Profile', {
        profileHash,
        ...userData,
      });
    } catch (err) {
      this.setState({
        ...this.state,
        isWaitingEthereum: false,
      });

      Alert.alert(
        'Error!',
        `Sorry. The IPFS request failed. Please try again. \n\nError message:\n${err}`,
        [
          { text: 'OK', onPress: () => {} },
        ],
        { cancelable: false },
      );
    }
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="position" style={styles.container}>
        {this.fields.map(field => (
          <TextInput
            style={styles.input}
            key={field.stateKey}
            value={this.state[field.stateKey]}
            onChangeText={text => this.onInputChange(field.stateKey, text)}
            placeholder={field.placeholder}
            keyboardType={field.keyboardType}
            autoCapitalize={field.keyboardType === 'email-address' ? 'none' : 'words'}
            autoCorrect={false}
            underlineColorAndroid="transparent"
            secureTextEntry={field.secureTextEntry}
          />
        ))}
        {this.state.isWaitingEthereum ? (
          <ActivityIndicator size="large" color={defaultStyles.colors.primary} />
        ) : (
          <Button
            label="Sign Up"
            onPress={() => this.validateFields()}
          />
        )}
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  input: {
    marginHorizontal: '5%',
    marginTop: 10,
    padding: 10,
    borderRadius: 20,
    borderBottomWidth: 0,
    backgroundColor: 'white',
  },
});
