/**
 * This script creates a .env file and includes the current process.env keys on it.
 * It's intended to include Travis env variables into React Native
 */

const fs = require('fs');

const stream = fs.createWriteStream('.env');

stream.once('open', () => {
  Object.keys(process.env).forEach((key) => {
    stream.write(`${key}=${process.env[key]}\n`);
  });
  stream.end();
});
