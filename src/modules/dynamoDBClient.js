const log = require('../log');

const userTable = {
  TableName: 'Users',
  KeySchema: [
    { AttributeName: 'id', KeyType: 'HASH' } //Partition key
  ],
  AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  }
};

let dynamo;

const initDynamoDb = async () => {
  const AWS = require('aws-sdk');
  AWS.config.update({
    region: 'us-east-1',
    endpoint: 'http://localhost:8000'
  });
  dynamo = await new AWS.DynamoDB();
};

const createUsersTable = async () => {
  log.info('Creating Users Table');
  return dynamo.createTable(userTable).promise();
};

const putUser = async (email, hashedPassword) => {
  log.info('Put User');
  const params = {
    Item: {
      email: {
        S: `${email}`
      },
      password: {
        S: `${hashedPassword}`
      }
    },
    ReturnConsumedCapacity: 'TOTAL',
    TableName: 'User'
  };
  try {
    const dynamoResponse = await dynamo.putItem(params);
    return dynamoResponse;
  } catch (error) {
    throw new Error(error);
  }
};

const getUser = async (email, hashedPassword) => {
  log.info('Get User');
  const params = {
    Item: {
      email: {
        S: `${email}`
      },
      password: {
        S: `${hashedPassword}`
      }
    },
    ReturnConsumedCapacity: 'TOTAL',
    TableName: 'User'
  };
  try {
    const dynamoResponse = await dynamo.getItem(params);
    return dynamoResponse;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteTables = async () => {
  log.info('Deleting Tables');
  const tableDeletePromises = [];
  const tables = await dynamo.listTables.promise();

  tables.data.TableNames.map(table =>
    tableDeletePromises.push(dynamo.deleteTable({ TableName: `${table}` }))
  );
  log.info(tableDeletePromises);
};

module.exports = {
  createUserTable,
  putUser,
  getUser
};
