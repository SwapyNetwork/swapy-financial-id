/* global it, expect, jest */

import * as React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';

jest.mock('react-native-crypto', () => { // eslint-disable-line
  return { randomBytes: size => size * Math.random() };
});

jest.mock('react-native-bip39', () => { // eslint-disable-line
  return { generateMnemonic: async () => Promise.resolve('pão de batata calzone pizza lanches pedrao pedrinho pedro catupiry peperoni comidas') };
});

jest.mock('../shim', () => { // eslint-disable-line
  return {};
});

it('renders without crashing', () => {
  const rendered = renderer.create(<App />).toJSON();
  expect(rendered).toMatchSnapshot();
});
