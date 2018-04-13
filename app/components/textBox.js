/* @flow */

import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import mainStyles from '../config/styles';

type Props = {
  bold: boolean,
  children: [],
};

const TextBox = (props: Props) => (
  <ScrollView style={styles.container} >
    <Text style={props.bold ? styles.textBold : styles.text}>
      {props.children}
    </Text>
  </ScrollView>
);

export default TextBox;

const styles = StyleSheet.create({
  container: {
    maxHeight: '70%',
    borderRadius: 10,
    borderStyle: 'solid',
    backgroundColor: mainStyles.colors.white,
    margin: '5%',
  },
  text: {
    padding: '3%',
    height: '100%',
    overflow: 'visible',
  },
  textBold: {
    padding: '3%',
    height: '100%',
    fontSize: 26,
    fontWeight: 'bold',
    overflow: 'visible',
  },
});
