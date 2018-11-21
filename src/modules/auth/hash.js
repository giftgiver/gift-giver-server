const bcrypt = require('bcrypt');
const log = require('../../log');

const SALT_ROUNDS = 10;

const hashPassword = async ({ password }) => {
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    return hashedPassword;
  } catch (error) {
    log.getLogger().error(error);
    throw new Error(error);
  }
};

const compareHash = async ({ password, hash }) => {
  try {
    const match = await bcrypt.compare(password, hash);
    return match;
  } catch (error) {
    log.getLogger().error(error);
    throw new Error(error);
  }
};

module.exports = { hashPassword, compareHash };
