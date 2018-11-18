const server = require('./server');
const log = require('pino')();

const start = async port => {
  try {
    await server.listen(port);
    log.info(`Apollo Server Started! Listening on port ${port}`);
  } catch (error) {
    log.error(error);
  }
};

module.exports = {
  start
};
