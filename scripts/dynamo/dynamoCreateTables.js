const dynamo = require('../../src/modules/dynamoDBClient');

const createUserTable = async () => {
  await dynamo.init();
  await dynamo.createUsersTable();
  console.log('Users Table Created!');
};

createUserTable();
