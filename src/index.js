const { gql } = require('apollo-server');

const server = require('./server');
const log = require('./log');
const docClient = require('./modules/dynamo/documentClient');

// TODO: find a graceful way to hook these into the service start (also I don think they are working now);

const start = async port => {
  try {
    await log.init();
    await docClient.setupAWS();
    await server.listen(port);
    console.log(`Listening on port: ${port}`);
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
