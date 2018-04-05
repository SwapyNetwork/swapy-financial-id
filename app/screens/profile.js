import React from 'react';
import { Button, ProfileCard } from '../components';
import { Alert, StyleSheet, View } from 'react-native';

const Profile = ({ navigation }) => (
  <View style={styles.view}>
    <ProfileCard {...navigation.state.params} />
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
