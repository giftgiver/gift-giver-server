const { gql } = require('apollo-server');
const log = require('pino')(); //I feel like doing this in every file is dumb, but it's not working otherwise, TODO
const server = require('./server');
const docClient = require('./modules/dynamo/documentClient');

// TODO: find a graceful way to hook these into the service start (also I don think they are working now);

const start = async port => {
  try {
    await docClient.setupAWS();
    await server.listen(port);
    log.info(`Listening on port: ${port}`);
  } catch (error) {
    // TODO: look into error handling pattern within async try/catches (this doesn't feel right)
    // console here because logger might not be init
    log.error(`Error starting server : ${error}`);
    throw new Error(error);
  }
};

module.exports = {
  start
};
