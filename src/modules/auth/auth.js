const {
  ForbiddenError,
  UserInputError,
  AuthenticationError
} = require('apollo-server');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const log = require('pino')();
const _ = require('lodash');
const AUTHED_OPERATION = ['getUser'];

let privateKey;
let publicKey;

const JWT_VERIFY_ERROR = 'JWT Authentication Failed';

const loadkeys = () => {
  try {
    // PRIVATE KEYS TODO: migrate this to like kms? key rotates are neat
    privateKey = fs.readFileSync(
      path.resolve(__dirname, '../../../keys/private.pem')
    );
    publicKey = fs.readFileSync(
      path.resolve(__dirname, '../../../keys/public.pem')
    );
  } catch (error) {
    log.error(error);
    throw new Error(error);
  }
};

// Auth middleware, checks each for auth before performing query.
const context = async ({ req }) => {
  const token = req.headers.authorization || '';
  const authed = isAuthed(req);

  // Let Non-Authed endpoints through
  if (!authed) {
    return req;
  }
  // Return Auth error for authed missing tokens on authed queries
  if (authed && !token) {
    throw new AuthenticationError(JWT_VERIFY_ERROR);
  }

  if (authed && !verifyJwt(token)) {
    throw new AuthenticationError();
  }
  return req;
};

const isAuthed = req => {
  const body = req.body || '';
  const operationName = body.operationName || '';

  if (operationName) {
    return _.includes(AUTHED_OPERATION, operationName);
  } else {
    throw new UserInputError(
      'Missing Operation Name, shorthand queries not supported.'
    );
  }
};

const getSignedJwt = async email => {
  const token = await jwt.sign({ email }, privateKey, {
    algorithm: 'RS256'
  });
  return token;
};

const verifyJwt = async token => {
  const decodedJwt = await jwt.verify(token, publicKey);

  if (!decodedJwt) {
    throw new AuthenticationError(JWT_VERIFY_ERROR);
  } else {
    return decodedJwt;
  }
};

loadkeys();
module.exports = { context, getSignedJwt, verifyJwt };
