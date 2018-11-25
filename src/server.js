const {
  ApolloServer,
  ForbiddenError,
  AuthenticationError,
  UserInputError
} = require('apollo-server');
const typeDefs = require('./graphql/types/typeDefs');
const resolvers = require('./graphql/resolvers/resolvers');
const _ = require('lodash');
const auth = require('../src/modules/auth/auth');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: error => {
    log.error(error);
    return error;
  },
  context: ({ req }) => auth.context({ req }),
  formatResponse: response => {
    // log.info(response);
    return response;
  }
});

module.exports = server;
