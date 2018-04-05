/* @flow */
/* eslint-disable global-require */
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Button } from '../components';

export default class Home extends React.Component {
  static navigationOptions = { header: null };

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/logo.png')}
          style={{ width: 150, height: 150 }}
        />
        <Button
          onPress={() => this.props.navigation.navigate('SeedWords')}
          label="Create account"
          accessibilityLabel="Create account"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});

