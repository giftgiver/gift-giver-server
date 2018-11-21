const dynamo = require('../src/modules/dynamo/documentClient');

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

const createUsersTable = async () => {
  await dynamo.setupAWS();
  try {
    const createTableResponse = await dynamo
      .getDynamoClient()
      .createTable(userTable)
      .promise();
    console.log(createTableResponse);
    console.log('Table creation Successful!');
    return createTableResponse;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

createUsersTable();
