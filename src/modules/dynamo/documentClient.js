const AWS = require('aws-sdk');
const REGION = 'us-east-1';
let dynamo;
let documentClient;

const getDocClient = () => {
  return documentClient;
};

const getDynamoClient = () => {
  return dynamo;
};

// This was only really exported because of unit tests and mocking.
const setupAWS = async () => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'localhost') {
    AWS.config.update({
      region: REGION,
      // TODO: fix config
      endpoint: 'http://localhost:8000'
      // endpoint: config.get('localDynamoEndpoint')
    });
    dynamo = await new AWS.DynamoDB();
    documentClient = await new AWS.DynamoDB.DocumentClient();
  } else {
    // AWS.config.update({
    //   region: REGION
    // });
    // dynamo = await new AWS.DynamoDB();
    // documentClient = await new AWS.DynamoDB.DocumentClient();
    throw new Error('NODE_ENV=localhost not set');
  }
};

const docClient = {
  getDocClient,
  getDynamoClient,
  setupAWS
};

module.exports = docClient;
