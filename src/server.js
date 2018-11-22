const { ApolloServer } = require('apollo-server');
const typeDefs = require('./graphql/types/typeDefs');
const resolvers = require('./graphql/resolvers/resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: {
    onConnect: async (connectionParams, webSocket, context) => {
      console.log('on connect?');
    },
    onDisconnect: (webSocket, context) => {
      console.log('on disconnect?');
    }
  },
  context: async ({ req }) => {
    console.log('Context Function');
    const token = req.headers.authorization;
    console.log(token);
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
