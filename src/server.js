const fastify = require('fastify')({
  logger: true
});

fastify.register(require('./config').init);
fastify.addHook('onRequest', async request => {
  request.log.info();
});
// Unauthenticated endpoints
fastify.register(require('./routes/healthCheckRoute'));
module.exports = fastify;
