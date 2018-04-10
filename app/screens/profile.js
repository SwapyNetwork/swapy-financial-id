import React from 'react';
import { Alert, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Button, ProfileCard, Balances } from '../components';
import defaultStyles from '../config/styles';

import IdentityProvider from '../lib/identity';
// import WalletProvider from '../lib/wallet';

export default class Profile extends React.Component {
  static navigationOptions = { headerRight: (<Balances />) };

  constructor() {
    super();

    this.state = {
      publishedToBlockchain: false,
      identityAddress: undefined,
      isWaitingEthereum: false,
    };
  }

  async handlePublishToBlockchain(profileId, profileHash) {
    this.setState({ ...this.state, isWaitingEthereum: true });
    try {
      const transaction = await IdentityProvider.instance.createPersonalIdentity(profileId, profileHash);
      if (IdentityProvider.instance.getWeb3().utils.hexToNumber(transaction.status) === 1) {
        IdentityProvider.cachedIdentity.address = await IdentityProvider
          .instance
          .getIdentityById(profileId);

        this.setState({
          ...this.state,
          publishedToBlockchain: true,
          isWaitingEthereum: false,
        });

        Alert.alert(
          'Identity published!',
          `Your financial identity was successfully published to the blockchain at the address ${IdentityProvider.cachedIdentity.address}.`,
          [
            { text: 'OK', onPress: () => {} },
          ],
          { cancelable: false },
        );
      } else {
        Alert.alert(
          'Error!',
          'Sorry. The Ethereum transaction failed. Please check if you have enough Ether or try again.',
          [
            { text: 'OK', onPress: () => {} },
          ],
          { cancelable: false },
        );
      }
    } catch (err) {
      this.setState({
        ...this.state,
        publishedToBlockchain: false,
        isWaitingEthereum: false,
      });

      Alert.alert(
        'Error!',
        `Sorry. The Ethereum transaction failed. Please check if you have enough Ether or try again. \n\nError message:\n${err}`,
        [
          { text: 'OK', onPress: () => {} },
        ],
        { cancelable: false },
      );
    }
  }

  renderButtons() {
    return (
      <View>
        {
          this.state.publishedToBlockchain ? undefined :
          <Button
            label="Publish to Blockchain"
            onPress={
              () => this.handlePublishToBlockchain(
                this.props.navigation.state.params.profileId,
                this.props.navigation.state.params.profileHash,
              )
            }
          />
        }
        <Button
          label="Sell Data"
          onPress={() => Alert.alert(
            'Feature not ready!',
            'Sorry. We\'re still working on this feature!',
            [
              { text: 'OK', onPress: () => {} },
            ],
            { cancelable: false },
          )}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.view}>
        <ProfileCard {...this.props.navigation.state.params} />
        {
          this.state.isWaitingEthereum ?
            <ActivityIndicator size="large" color={defaultStyles.colors.primary} /> :
            this.renderButtons()
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});
