const index = require('./src/index');
const meow = require('meow');

const DEFAULT_PORT = 1337;

const cli = meow(
  `
    Usage
			$ server <input>
    Examples
			$ server -p
			server listening on 1337
	`,
  {
    flags: {
      port: {
        type: 'string',
        alias: 'p',
        default: 1337
      }
    }
  }
);

const USER_INPUT = cli.input[0];
const SERVER_PORT = USER_INPUT ? USER_INPUT : DEFAULT_PORT;

/**
 * CLI command to
 */
const start = async () => {
  try {
    await index.start(SERVER_PORT);
  } catch (error) {
    console.error(error);
  }
};

start();
