const nconf = require('nconf');
const path = require('path');
const NODE_ENV = process.env.NODE_ENV || 'localhost';
nconf.formats.yaml = require('nconf-yaml');

const init = async () => {
  const env = nconf.get('NODE_ENV');
  const envconfigPath = path.resolve(__dirname, 'conf/' + env + '.yaml');
  const defaultConfigPath = path.resolve(__dirname, 'conf/' + 'default.yaml');

  nconf.add('env', {
    type: 'file',
    file: envconfigPath,
    format: nconf.formats.yaml
  });
  nconf.add('global', {
    type: 'file',
    file: defaultConfigPath,
    format: nconf.formats.yaml
  });
};

const get = () => {
  return nconf.get.apply(nconf, arguments);
};

module.exports = {
  get,
  init
};
