import React from 'react';
import defaultStyles from '../config/styles';
import { TextInput, StyleSheet, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { Button, Balances } from '../components';
import IdentityProvider from '../lib/identity';
import WalletProvider from '../lib/wallet';

const fields = [
  { placeholder: 'Full name', stateKey: 'name' },
  { placeholder: 'Email', stateKey: 'email', keyboardType: 'email-address' },
  { placeholder: 'Mobile phone', stateKey: 'mobilePhone', keyboardType: 'phone-pad' },
  { placeholder: 'Username', stateKey: 'username' },
  { placeholder: 'USD Yearly Income', stateKey: 'yearlyIncome' },
];

export default class SignUp extends React.Component {
  static navigationOptions = { headerRight: (<Balances />) };

  constructor() {
    super();
    this.state = {
      isWaitingEthereum: false,
    };
  }

  onInputChange = (stateKey, text) => {
    const field = {};
    field[stateKey] = text;
    this.setState(field);
  };

  factoryIPFSTree = ({ name, email, mobilePhone, username, yearlyIncome }) => {
    return [{
      parentLabel: 'root',
      label: 'root_profile',
      childrens: [{
        label: 'profile_name',
        data: name,
      }, {
        label: 'profile_email',
        data: email,
      }, {
        label: 'profile_phone',
        data: mobilePhone,
      }, {
        label: 'profile_id',
        data: username,
      }],
    }, {
      parentLabel: 'root',
      label: 'root_financial',
      childrens: [{
        label: 'usd_yearly_income',
        data: yearlyIncome,
      }],
    }];
  };

  flattenIPFSTree = (ipfsResponse, flatUserData = {}) => {
    ipfsResponse.childrens.forEach((child) => {
      if (child.childrens) this.flattenIPFSTree(child, flatUserData);
      else flatUserData[child.label] = child.data; // eslint-disable-line
    });
    return flatUserData;
  };

  factoryUserData = (ipfsResponse) => {
    const userData = this.flattenIPFSTree(ipfsResponse);

    return {
      profileId: userData.profile_id,
      name: userData.profile_name,
      email: userData.profile_email,
      phone: userData.profile_phone,
      yearlyIncome: userData.usd_yearly_income,
    };
  };

  validateFields = async () => {
    // @todo validate fields, mostly important: email and password confirmation
    this.setState({ ...this.state, isWaitingEthereum: true });
    const privateKey = await WalletProvider.instance.getPrivateKeyString();

    const profileHash = await IdentityProvider
      .instance
      .createIpfsProfile(this.factoryIPFSTree(this.state), privateKey);

    const tree = await IdentityProvider.instance.getTreeData(profileHash, true, privateKey);
    const userData = this.factoryUserData(tree);

    IdentityProvider.instance.cachedIdentity.address = await IdentityProvider
      .instance
      .getIdentityById(userData.profileId);

    this.setState({ ...this.state, isWaitingEthereum: false });
    this.props.navigation.navigate('Profile', {
      profileHash,
      ...userData,
    });
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
