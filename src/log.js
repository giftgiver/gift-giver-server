const IS_LOCAL = process.env.NODE_ENV === 'localhost' ? true : false;

const log = require('pino')({
  prettyPrint: {
    levelFirst: IS_LOCAL
  }
});

module.exports = log;
