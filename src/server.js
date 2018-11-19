const { ApolloServer } = require('apollo-server');
const log = require('./log');

const dynamo = require('./modules/dynamoDBClient');
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./schemas/resolvers');

dynamo.init();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // Auth type stuff goes here
  context: async ({ req }) => {
    log.info('Context Function');
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
  },
  formatResponse: response => {
    log.info(response);
    return response;
  }
});

module.exports = server;
