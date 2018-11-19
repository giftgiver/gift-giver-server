const { ApolloServer } = require('apollo-server');
const log = require('./log');

const dynamo = require('./modules/dynamoDBClient');
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./schemas/resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  //Init Dynamo DB and add to dataSources Object
  dataSources: () => {
    return {
      dynamo: dynamo.init()
    };
  },
  // Auth type stuff goes here
  context: ({ req }) => {
    // get the user token from the headers
    const token = req.headers.authorization || '';
    //TODO: remove this, finish auth
    log.info(token);
    return {};
  },
  formatResponse: response => {
    console.log('test?');
    log.info(response);
    return response;
  }
});

module.exports = server;
