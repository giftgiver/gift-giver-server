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
const auth = require('../src/modules/auth/auth');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: error => {
    log.error(error);
    return error;
  },
  context: ({ req }) => auth.context({ req })
});

module.exports = server;
