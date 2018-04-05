/* @flow */

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import mainStyles from '../config/styles';

type Props = {
  name: string,
  email?: string,
  phone?: string,
  yearlyIncome?: number,
};

const ProfileCard = ({ name, email, phone, yearlyIncome }: Props) => (
  <View style={styles.card} >
    <Icons name="user-circle-o" style={styles.avatar} size={130} color={mainStyles.colors.accent} />
    <View style={styles.properties}>
      <View style={styles.property}>
        <Icons style={styles.propertyIcon} name="user-o" size={32} color={mainStyles.colors.accent} />
        <Text style={styles.propertyText}>{name}</Text>
      </View>
      <View style={styles.property}>
        <Icons style={styles.propertyIcon} name="envelope-o" size={32} color={mainStyles.colors.accent} />
        <Text style={styles.propertyText}>{email}</Text>
      </View>
      <View style={styles.property}>
        <Icons style={styles.propertyIcon} name="phone" size={32} color={mainStyles.colors.accent} />
        <Text style={styles.propertyText}>{phone}</Text>
      </View>
      <View style={styles.property}>
        <Icons style={styles.propertyIcon} name="money" size={32} color={mainStyles.colors.accent} />
        <Text style={styles.propertyText}>{yearlyIncome}</Text>
      </View>
    </View>
  </View>
);

export default ProfileCard;
const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  avatar: {
    padding: 10,
    marginTop: 50,
  },
  properties: {
    padding: 10,
    flex: 1,
  },
  property: {
    minHeight: 50,
    minWidth: '100%',
    flexDirection: 'row',
    paddingHorizontal: 30,
  },
  propertyIcon: {
    width: 40,
  },
  propertyText: {
    fontSize: 22,
    marginLeft: 30,
    color: mainStyles.colors.gray,
  },
  emptyProp: {
    margin: 5,
    padding: 2,
    height: 10,
    minWidth: '100%',
    backgroundColor: mainStyles.colors.gray,
  },
});
