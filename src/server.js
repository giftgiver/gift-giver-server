const {
  ApolloServer,
  ForbiddenError,
  AuthenticationError,
  UserInputError
} = require('apollo-server');
const typeDefs = require('./graphql/types/typeDefs');
const resolvers = require('./graphql/resolvers/resolvers');
const _ = require('lodash');
const log = require('pino')();
const authMiddleware = require('./modules/middleware/authMiddleware');

const AUTHED_ENDPOINTS = ['getUser'];

const isAuthed = req => {
  const body = req.body || '';
  const operationName = body.operationName || '';

  if (operationName) {
    return _.includes(AUTHED_ENDPOINTS, operationName);
  } else {
    throw new UserInputError('Invalid body, check query.');
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: error => {
    log.error(error);
    return error;
  },
  subscriptions: {
    onConnect: async (connectionParams, webSocket, context) => {
      console.log('on connect?');
    },
    onDisconnect: (webSocket, context) => {
      console.log('on disconnect?');
    }
  },
  context: async ({ req }) => {
    const token = req.headers.authorization || '';

    if (isAuthed(req) && !token) {
      throw new AuthenticationError('Missing Auth Header');
    }

    // if(_.hasIn(req, ''))

    // throw new ForbiddenError('Forbidden!');
    // _.hasIn(req, '');

    //auth stuff happens here
    // if (!req || !req.headers) {
    //   return;
    // }
    // const token = req.headers.authorization || '';
    // const checkToken = await userController.findOrCreateUser(token);
    // if (!checkToken.hasOwnProperty('authorized')) {
    //   return { user: checkToken, authorized: true };
    // }
    // return checkToken;
  }
});

module.exports = server;
