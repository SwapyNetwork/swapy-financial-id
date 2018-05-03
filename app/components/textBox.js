/* @flow */

import * as React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import mainStyles from '../config/styles';

type Props = {
  bold: boolean,
  children?: React.Node,
  extraStyles?: {},
};

const TextBox = (props: Props) => (
  <ScrollView style={[styles.container, props.extraStyles]} >
    <Text style={props.bold ? styles.textBold : styles.text}>
      {props.children}
    </Text>
  </ScrollView>
);

TextBox.defaultProps = {
  children: [],
  extraStyles: {},
};

export default TextBox;

const styles = StyleSheet.create({
  container: {
    maxHeight: '75%',
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
