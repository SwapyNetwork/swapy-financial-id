import React from 'react';
import { Button, ProfileCard, Balances } from '../components';
import { Alert, StyleSheet, View } from 'react-native';

import IdentityProvider from '../lib/identity';
// import WalletProvider from '../lib/wallet';

export default class Profile extends React.Component {
  static navigationOptions = { headerRight: (<Balances />) };

  async handlePublishToBlockchain(profileId, profileHash) {
    let transaction = await IdentityProvider.instance.createPersonalIdentity(profileId, profileHash);
    console.log(transaction);
  }

  render() {
    return (
      <View style={styles.view}>
        <ProfileCard {...this.props.navigation.state.params} />
        <Button
          label="Publish to Blockchain"
          onPress={
            () => this.handlePublishToBlockchain(
              this.props.navigation.state.params.profileId,
              this.props.navigation.state.params.profileHash,
            )
          }
        />
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
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});
