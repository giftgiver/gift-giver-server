const { gql } = require('apollo-server');

const server = require('./server');
const dynamo = require('./modules/dynamo/documentClient');
const log = require('./log');

// TODO: find a graceful way to hook these into the service start (also I don think they are working now);

const init = async () => {
  await log.init();
  await dynamo.setupAWS();
};

const start = async port => {
  try {
    await init();
    await server.listen(port);
    log.getLogger().info(`Server Listening on port: ${port}`);
  } catch (error) {
    // TODO: look into error handling pattern within async try/catches (this doesn't feel right)
    // console here because logger might not be init
    console.error(`Error starting server : ${error}`);
    throw new Error(error);
  }
};

module.exports = {
  start
};
