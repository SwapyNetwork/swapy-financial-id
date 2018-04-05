// @flow
/* eslint-disable */
import './shim.js'

import React from 'react';
import HomeStack from './app/config/router';
import WalletProvider from './app/lib/wallet';

WalletProvider.initWalletFromStorage();
const App = () => <HomeStack />;

export default App;