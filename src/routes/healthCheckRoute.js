'use strict';

const routes = async fastify => {
  fastify.get('/healthcheck', async (request, reply) => {
    reply.code(200);
    return {};
  });
};

module.exports = routes;
