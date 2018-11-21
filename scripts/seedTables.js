const dynamo = require('../src/modules/dynamo/documentClient');

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

const createUsersTable = async () => {
  await dynamo.setupAWS();
  try {
    const createTableResponse = await dynamo
      .getDynamoClient()
      .createTable(userTable)
      .promise();
    console.log('Table creation Successful!');
    return createTableResponse;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

createUsersTable();
