const fs = require('fs');

const stream = fs.createWriteStream('.env');

stream.once('open', () => {
  Object.keys(process.env).forEach((key) => {
    stream.write(`${key}=${process.env[key]}\n`);
  });
  stream.end();
});
