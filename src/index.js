const fastify = require('./server');

/**
 * Start Server
 * @param {*} port
 */
const start = async port => {
  try {
    await fastify.listen(port);
    fastify.log.info(`server listening on ${port}`);
  } catch (error) {
    fastify.log.error(error);
    throw new Error(error.toString());
  }
};

/**
 * Stop Server
 * ---Should only be used for testing---
 */
const stop = async () => {
  try {
    return await fastify.close();
  } catch (error) {
    fastify.log.error(error);
  }
};

module.exports = {
  start,
  stop
};
