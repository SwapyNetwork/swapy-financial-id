import React from 'react';
import { TextInput, StyleSheet, KeyboardAvoidingView, ActivityIndicator, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import defaultStyles from '../config/styles';
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
  static navigationOptions = { headerRight: (<Balances />), headerLeft: null };

  constructor() {
    super();
    this.state = {
      isWaitingEthereum: false,
    };
  }

  resetNavigation(targetRoute, params) {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: targetRoute, params }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  onInputChange = (stateKey, text) => {
    const field = {};
    field[stateKey] = text;
    this.setState(field);
  };

  validateFields = async () => {
    // @todo validate fields, mostly important: email and password confirmation
    try {
      this.setState({ ...this.state, isWaitingEthereum: true });
      // console.log('FETCH =>')
      // fetch('https://ipfs.infura.io:5001/api/v0/get?arg=%2Fipfs%2FQmS77Xc6tvW54srYXNqvLjw9Zajz2PfZq1t1tdmQqAFyEF&stream-channels=true', {method: 'POST'})
      //   .then(function(response) {
      //     console.log(response)
      //     return response.text()
      //   }).then(function(body) {
      //     console.log(body)
      //   })
      const privateKey = await WalletProvider.instance.getPrivateKeyString();
      const profileHash = await IdentityProvider
        .instance
        .createIpfsProfile(IdentityProvider.factoryIPFSTree(this.state), privateKey);

      const tree = await IdentityProvider.instance.getTreeData(profileHash, true, privateKey);
      const userData = IdentityProvider.factoryUserData(tree);

      IdentityProvider.persistIdentityId(JSON.stringify({ identityId: userData.profileId, identityHash: profileHash }));

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
