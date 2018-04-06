import React from 'react';
import { Button, ProfileCard } from '../components';
import { Alert, StyleSheet, View } from 'react-native';

import IdentityProvider from '../lib/identity';
import WalletProvider from '../lib/wallet';

const handlePublishToBlockchain = async (profileId, profileHash) => {
  let transaction = await IdentityProvider.instance.createPersonalIdentity(profileId, profileHash);
  console.log(transaction);
};

const Profile = ({ navigation }) => (
  <View style={styles.view}>
    <ProfileCard {...navigation.state.params} />
    <Button
      label="Publish to Blockchain"
      onPress={() => handlePublishToBlockchain(navigation.state.params.profileId, navigation.state.params.profileHash)}
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

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});

export default Profile;
