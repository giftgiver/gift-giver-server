const jwt = require('jsonwebtoken');

// TODO: also: aaa-auth module? push this solution first for demos

// TODO: Get this to work.
// const JWT_SECRET = config.get('jwtSecret');

const JWT_SECRET = 'shhhhhhhhhhh';

const getSignedJwt = id => {
  const token = jwt.sign({ id: id }, JWT_SECRET);
  return token;
};

module.exports = { getSignedJwt };
