const bcrypt = require('bcrypt');
const log = require('pino').logger;
const SALT_ROUNDS = 10;

const hashPassword = async ({ password }) => {
  try {
    return bcrypt.hash(password, SALT_ROUNDS);
  } catch (error) {
    log.error(`bcrypt error: ${error.message}`);
    throw new Error(error);
  }
};

const compareHash = async ({ password, hash }) => {
  try {
    return bcrypt.compare(password, hash);
  } catch (error) {
    log.error(error);
    throw new Error(error);
  }
};

module.exports = { hashPassword, compareHash };
