/* global it, expect */

import React from 'react';
import renderer from 'react-test-renderer';
import * as jest from 'jest';

import App from './App';

jest.mock('react-native-crypto', () => { // eslint-disable-line
  return { randomBytes: size => size * Math.random() };
});

it('renders without crashing', () => {
  const rendered = renderer.create(<App />).toJSON();
  expect(rendered).toBeTruthy();
});
