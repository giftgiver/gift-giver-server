'use strict';
const fastify = require('../../server');

const routes = async (fastify, options) => {
  fastify.get('/', async function(request, reply) {
    const query = request.body;
    return reply.graphql(query);
  });
};

module.exports = routes;
