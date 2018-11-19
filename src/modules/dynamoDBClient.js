const log = require('../log');

const userTable = {
  TableName: 'Users',
  KeySchema: [
    { AttributeName: 'email', KeyType: 'HASH' } //Partition key
  ],
  AttributeDefinitions: [{ AttributeName: 'email', AttributeType: 'S' }],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  }
};

let dynamo;
let documentClient;

const init = async () => {
  if (!dynamo) {
    const AWS = require('aws-sdk');
    AWS.config.update({
      region: 'us-east-1',
      endpoint: 'http://localhost:8000'
    });

    dynamo = await new AWS.DynamoDB();
    documentClient = await new AWS.DynamoDB.DocumentClient();
  }
};

const createUsersTable = async () => {
  log.info('Creating Users Table');
  return dynamo.createTable(userTable).promise();
};

const putUser = async ({ email, password }) => {
  log.info('Put User');
  const params = {
    TableName: 'Users',
    Item: {
      email: email,
      password: password
    }
  };
  try {
    const putUserResponse = await documentClient.put(params).promise();
    return putUserResponse;
  } catch (error) {
    throw new Error();
  }
};

const getUser = async ({ email }) => {
  log.info('Get User');
  const params = {
    TableName: 'Users',
    Key: {
      email: email
    }
  };
  try {
    const getUser = await documentClient.get(params).promise();
    return getUser;
  } catch (error) {
    throw new Error(error);
  }
};

const getUsers = async () => {
  log.info('Get Users');
  const params = {
    TableName: 'Users'
  };

  try {
    const users = await documentClient.query(params).promise();
    return users;
  } catch (error) {
    //Todo: look at this pattern this feel wrong...
    throw new Error(error);
  }
};

/**
 * CAREFUL!!For testing
 */
const deleteTables = async () => {
  log.info('Deleting Tables');
  const tableDeletePromises = [];
  const tables = await dynamo.listTables({}).promise();

  //Create an array of table delete promises
  tables.TableNames.map(table =>
    tableDeletePromises.push(
      dynamo.deleteTable({ TableName: `${table}` }).promise()
    )
  );

  const deleteTableResults = await Promise.all(tableDeletePromises);
  return deleteTableResults;
};

module.exports = {
  init,
  createUsersTable,
  deleteTables,
  putUser,
  getUser,
  getUsers
};
