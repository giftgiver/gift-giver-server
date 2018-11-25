const pino = require('pino');
let logger;

const init = () => {
  return !logger ? pino() : logger;
};

init();

module.exports = {
  init
};
