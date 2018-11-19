const { ApolloServer } = require('apollo-server');
const log = require('./log');

const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./schemas/resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // get the user token from the headers
    const token = req.headers.authorization || '';
    //TODO: remove this
    log.info(token);
    return {};
  },
  formatResponse: response => {
    log.info(response);
    return response;
  }
});

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
module.exports = server;
