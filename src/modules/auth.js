var jwt = require('jsonwebtoken');

const validateJwt = async request => {
  request.log.info(`Validating JWT: ${request.headers.authorization}`);
  if (request.headers.authorization) {
    return {};
  }
  throw new Error(`WT VALIDATION FAILED: ${request.headers.authorization}`);
};

module.exports = {
  validateJwt
};
