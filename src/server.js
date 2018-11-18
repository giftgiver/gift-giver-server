const GQL = require('fastify-gql');
const fastify = require('fastify')({
  logger: true
});

// Log each request
fastify.addHook('onRequest', async request => {
  request.log.info();
});

const schema = require('./routes/graphql/schemas/removeSchema');

const resolvers = {
  Query: {
    add: async (_, { x, y }) => x + y,
    remove: async () => 'woohoo!'
  }
};

// Registers POST /graphql route
fastify.register(GQL, {
  schema,
  resolvers
});

fastify.register(require('./config').init);
fastify.register(require('./modules/plugin'));
fastify.register(require('./routes/healthCheckRoute'));

module.exports = fastify;
