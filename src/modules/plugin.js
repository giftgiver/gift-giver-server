const fp = require('fastify-plugin');
const config = require('../config');
const auth = require('./auth');

module.exports = fp(async (fastify, opts) => {
  fastify.decorate('authenticate', async (request, reply) => {
    try {
      await auth.validateJwt(request);
    } catch (err) {
      reply.code(403);
      reply.send();
    }
  });
});
