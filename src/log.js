const pino = require('pino');

let logger;

const init = async () => {
  logger = pino({
    useLevelLabels: true
  });
};

const getLogger = () => {
  return logger;
};

module.exports = {
  init,
  getLogger
};
