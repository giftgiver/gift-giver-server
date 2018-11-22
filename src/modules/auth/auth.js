const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

const privateKey = fs.readFileSync(
  path.resolve(__dirname, '../../../keys/gift-giver-server.private')
);
const publicKey = fs.readFileSync(
  path.resolve(__dirname, '../../../keys/gift-giver-server.pub')
);

const getSignedJwt = email => {
  const token = jwt.sign({ email: email }, privateKey, { algorithm: 'RS256' });
  return token;
};

const verifyJwt = jwt => {
  const decodedJwt = jwt.verify(jwt, publicKey);
  return decodedJwt;
};

module.exports = { getSignedJwt, verifyJwt };
