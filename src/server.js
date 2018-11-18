const GQL = require('fastify-gql');
const fastify = require('fastify')({
  logger: true
});

// Log each request
fastify.addHook('onRequest', async request => {
  request.log.info();
});

const schema = `
  type Query {
    add(x: Int, y: Int): Int
  }
`;

const resolvers = {
  Query: {
    add: async (_, { x, y }) => x + y
  }
};

fastify.register(GQL, {
  schema,
  resolvers
});

fastify.register(require('./config').init);
fastify.register(require('./modules/plugin'));
fastify.register(require('./routes/healthCheckRoute'));
fastify.register(require('./routes/graphql/graphQlRoute'));

module.exports = fastify;
