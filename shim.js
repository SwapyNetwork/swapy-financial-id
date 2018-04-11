if (typeof global !== 'undefined') {
  var self = global.self;
}
if (typeof __dirname === 'undefined') global.__dirname = '/'
if (typeof __filename === 'undefined') global.__filename = ''
if (typeof process === 'undefined') {
  global.process = require('process')
} else {
  const bProcess = require('process')
  for (var p in bProcess) {
    if (!(p in process)) {
      process[p] = bProcess[p]
    }
  }
}

process.browser = false
if (typeof Buffer === 'undefined') global.Buffer = require('buffer').Buffer

// global.location = global.location || { port: 80 }
const isDev = typeof __DEV__ === 'boolean' && __DEV__
process.env['NODE_ENV'] = isDev ? 'development' : 'production'
if (typeof localStorage !== 'undefined') {
  localStorage.debug = isDev ? '*' : ''
}

// If using the crypto shim, uncomment the following line to ensure
// crypto is loaded first, so it can populate global.crypto
require('crypto');
const webcrypto = {}; // require('isomorphic-webcrypto');

webcrypto.getRandomValues = global.crypto.getRandomValues;
global.crypto = webcrypto;

if (window) {
  window = global;
}
require('react-native-browser-polyfill');

// Needed so that 'stream-http' chooses the right default protocol.
global.location = {
  protocol: 'https:',
};

global.navigator.userAgent = 'runscope/0.1';
